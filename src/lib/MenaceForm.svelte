<script lang="ts">
    import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
    import { fade, fly } from "svelte/transition"
    import { isMenaceReport, type MenaceReport, type MenaceReportPayload } from './types';
    import { createEventDispatcher } from 'svelte';
    import { bubble } from 'svelte/internal';
    import * as AppService from '../services/app-service';


    let date: string = "";
    let description: string = "";
    let files:FileList;
    let grievanceFiled = false;


    const progress = tweened(0.33, {duration: 400, easing: cubicOut});
    const dispatch = createEventDispatcher();

    let menaceReport: MenaceReport;

    function calcMenaceLevel(progress: number): 1 | 2 | 3{
        switch(progress){
            case 0.33: return 1;
            case 0.66: return 2;
            case 1: return 3
            default: return 1
        }
    }
    
    async function submit(){

        let imageSrc: string | undefined;
        
        if(files){
            const {path} = await AppService.uploadFile(files[0]);    
            imageSrc = path;
        }

        const imageLinks = imageSrc ? [imageSrc] : [];

        const menaceReport:MenaceReportPayload = {description, imageLinks, menaceLevel:calcMenaceLevel($progress), date};
        const report = await AppService.createMenaceReport(menaceReport);

        if(!isMenaceReport(report)){
            alert("Unable to Report. Please try again later");
            grievanceFiled = false;
            return;
        }

        dispatch("submit", menaceReport);
        grievanceFiled = true;
  
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

        setTimeout(()=>{
            grievanceFiled = false
        }, 3000);
    }

    function dismiss(){
        dispatch("dismiss")
    }


</script>

<div id="container"  class="nes-container with-title is-centered is-dark is-rounded" >
    <p class="title">Menace Report</p>
{#if grievanceFiled}
    <div in:fade={{duration:500}} style="text-align: center; display:flex; justify-content:center">
        <div>
            <p>&#10071;</p>
            <p>Menacing Reported</p>
        </div>
    </div>
{:else}

 

    <form on:submit|preventDefault={submit}>

        <div class="nes-field is-inline">
            <label in:fly={{x:150, duration:1000}} for="dateInput">Time:</label>
            <input in:fly={{x:150, duration:1100}} id="dateInput" required type="datetime-local" bind:value={date} class="nes-input" />
        </div>

        <div class="nes-field is-inline">
            <label in:fly={{x:150, duration:1000}}  for="descInput">Description:</label>
            <textarea class="nes-textarea"  in:fly={{x:150, duration:1100}}  id="descInput" required minlength="10" maxlength="150" rows="1" placeholder="bit me" bind:value={description} />
        </div>

        <div class="menace-group">
            <div class="menace-meter nes-field is-inline">
                <label in:fly={{x:150, duration:1000}}  for="menaceLevel">Menace Level:</label>
                <progress class="nes-progress is-error" in:fly={{x:150, duration:1100}}  value={$progress} />
                <div class="menace-buttons" in:fly={{x:150, duration:1100}} >

                    <button class="nes-btn" on:click|preventDefault={()=> progress.set(0.33)}>MIN</button>
                    <button class="nes-btn" on:click|preventDefault={()=> progress.set(0.66)}>MED</button>
                    <button class="nes-btn" on:click|preventDefault={()=> progress.set(1)}>MAX</button>
                    <div in:fly={{x:150, duration:1200}}>
                        {#if $progress <.34}
                            <img height="42" width="42" src="./mild_menace-removebg-preview.png" alt="mild menace cat"/>
                        {:else if $progress < .67}
                            <img height="42" width="42" src="./average_menace-removebg-preview.png" alt="mild menace cat"/>
                        {:else}
                            <img height="42" width="42" src="./max_menace-removebg-preview.png" alt="mild menace cat"/>
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        {#if !files}
            <label class="nes-btn" in:fly={{x:150,duration:1100}}>
                <span>Add Picture *optional</span>
                <input accept="image/png, image/jpeg"  bind:files id="file-input" type="file" />
            </label>
        {:else}
            <span class="nes-text is-success">Photo added!!</span>
        {/if}
        
        

        <div>
            <div class="report">
                <button  id="report-btn" in:fly={{x:150, duration:1100}}  class="nes-btn is-success" >Report</button>
                <button on:click|preventDefault={dismiss} in:fly={{x:150,duration:1100}} class="nes-btn is-warning">Dismiss</button>
            </div>
        </div>

    </form>
{/if}
</div>



<style >

    input, textarea{
        margin-bottom: 15px;
    }

    .menace-meter{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    progress{
        width: 100%;
    }

    .menace-group{
        display: flex;
        justify-content: space-around;
    }

    .menace-buttons{
        display: flex;
        justify-content: space-between;
    }


    input:valid , textarea:valid{
        border-radius: "5px";
        border: none;
    }

    p{
        font-size:xx-large
    }

    .report{
        display: flex;
        justify-content: center;

    }

    #container{
        min-height: 300px;
        text-align: center;
        width: 90vw;
    }


    form{
        display: flex;
        flex-direction: column;
    }


</style>