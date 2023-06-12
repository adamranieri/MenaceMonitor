<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import type { MenaceReport } from "./types";
    export let menaceReport:MenaceReport;
    let showImage: boolean = false;

</script>


    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <section on:click={()=>showImage=!showImage} transition:slide={{duration:300}}>

        <p>{`${new Date(menaceReport.date).toLocaleDateString()} ${new Date(menaceReport.date).toLocaleTimeString()}`}</p>
        <p>{menaceReport.description}</p>
        {#if  menaceReport.menaceLevel === 1}
            <p>Menace Level: &#128572;</p>
        {:else if  menaceReport.menaceLevel === 2 }
            <p>Menace Level: &#128574;</p>
        {:else}
            <p>Menace Level: &#128576;</p>
        {/if}

        {#if menaceReport.imageLinks[0] && showImage === false}
            <p>Press for image</p>
        {/if}

        {#if showImage && menaceReport.imageLinks[0]}
            <img transition:fade={{duration:300}} src={`${menaceReport.imageLinks[0]}`} alt="of menace">
        {:else if !menaceReport.imageLinks[0]}
            <p>No photo associated with this Menace Report</p>
        {/if}

        
    </section>

<style>

    section{
        border-radius: 12px;
        background-color: beige;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        word-wrap: break-word;
    }

    img{
        width: 85%;
        height: auto;
        padding: 10px;
    }
    

</style>