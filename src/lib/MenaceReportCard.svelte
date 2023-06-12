<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import type { MenaceReport } from "./types";
    export let menaceReport:MenaceReport;
    let showImage: boolean = false;

</script>


    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <section class="nes-container is-rounded is-dark"  on:click={()=>showImage=!showImage} transition:slide={{duration:300}} >

        <p>{`${new Date(menaceReport.date).toLocaleDateString()} ${new Date(menaceReport.date).toLocaleTimeString()}`}</p>
        <p class="nes-text is-primary" >{menaceReport.description}</p>
        {#if  menaceReport.menaceLevel === 1}
            <p class="nes-text is-error">Menace Level: <img class="image-inline" src="./mild_menace-removebg-preview.png" alt="mild menace cat"/></p>
        {:else if  menaceReport.menaceLevel === 2 }
            <p class="nes-text is-error">Menace Level: <img class="image-inline" src="./average_menace-removebg-preview.png" alt="mild menace cat"/></p>
        {:else}
            <p class="nes-text is-error">Menace Level: <img class="image-inline" src="./max_menace-removebg-preview.png" alt="mild menace cat"/></p>
        {/if}

        {#if menaceReport.imageLinks[0] && showImage === false}
            <p class="nes-text is-warning">Press for image</p>
        {/if}

        {#if showImage && menaceReport.imageLinks[0]}
            <img id="uploadedPic" transition:fade={{duration:300}} src={`${menaceReport.imageLinks[0]}`} alt="of menace">
        {:else if !menaceReport.imageLinks[0]}
            <p style="font-size: xx-small;" class="nes-text is-warning">No photo associated with this Menace Report</p>
        {/if}

        
    </section>

<style>

@import "./node_modules/nes.css/css/nes.css";
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

    section{
        border-radius: 12px;
        background-color: beige;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        word-wrap: break-word;
    }

    #uploadedPic{
        width: 85%;
        height: auto;
        padding: 10px;
    }

    .image-inline {
      display: inline-block;
      vertical-align: middle;
      height: 46px;
      width: 46px;
    }
    

</style>