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

<div id="container"  >
{#if grievanceFiled}
    <div in:fade={{duration:500}} style="text-align: center; display:flex; justify-content:center">
        <div>
            <p>&#10071;</p>
            <p>Menacing Reported</p>
        </div>
    </div>
{:else}

 

    <form on:submit|preventDefault={submit}>

        <div style="padding-top: 5px">
            <label in:fly={{x:150, duration:1000}} for="dateInput">Time of Menacing:</label>
            <input in:fly={{x:150, duration:1100}}  id="dateInput" required type="datetime-local" bind:value={date}>
        </div>

        <div class="desc-group">
            <label in:fly={{x:150, duration:1000}}  for="descInput">Description of Menace Event</label>
            <textarea  in:fly={{x:150, duration:1100}}  id="descInput" required minlength="10" maxlength="50" rows="5" bind:value={description} />
        </div>

        <div class="menace-group">
            <div class="menace-meter">
                <label in:fly={{x:150, duration:1000}}  for="menaceLevel">Menace Level</label>
                <progress in:fly={{x:150, duration:1100}}  value={$progress} class="progress-bar"/>
                <div class="menace-buttons" in:fly={{x:150, duration:1100}} >
                    <button class="menace-button" on:click|preventDefault={()=> progress.set(0.33)}>&#128572;</button>
                    <button class="menace-button" on:click|preventDefault={()=> progress.set(0.66)}>&#128574;</button>
                    <button class="menace-button" on:click|preventDefault={()=> progress.set(1)}>&#128576;</button>
                    <div in:fly={{x:150, duration:1200}}>
                        {#if $progress <.34}
                            <p style="margin: 0%;">&#128572;</p>
                        {:else if $progress < .67}
                            <p style="margin: 0%;">&#128574;</p>
                        {:else}
                            <p style="margin: 0%;">&#128576;</p>
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        <div class="file-input">
            <label for="file-input" >Picture *optional </label>
            <input accept="image/png, image/jpeg" bind:files id="file-input" type="file" />
        </div>



        <div class="report">
            <div>
                <button  id="report-btn" in:fly={{x:150, duration:1100}} >Report</button>
                <button on:click|preventDefault={dismiss} in:fly={{x:150,duration:1100}}>Dismiss</button>
            </div>
        </div>



    </form>
{/if}
</div>



<style >

    input, textarea{
        margin-bottom: 15px;
    }

    .desc-group{
        display: flex;
        flex-direction: column;
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

    .menace-button{
        height: fit-content;
        padding-right: 24px;
        padding-left: 24px;
    }

    .menace-buttons{
        display: flex;
        justify-content: space-between;
    }


    input:valid , textarea:valid{
        border-radius: "5px";
        border: none;
        outline: 2px solid rgb(164, 255, 164);
        background-color: rgb(231, 253, 231);
    }

    input:focus, textarea:focus{
        background-color: lightblue;
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
        background-color: wheat;
        width: 95vw;

    }

    #report-btn{
        background-color: aqua;
    }

    #report-btn:hover{
        background-color: aquamarine;
    }
    form{
        display: flex;
        flex-direction: column;
    }

    /* .file-input{
        margin-top: ;

    } */





</style>