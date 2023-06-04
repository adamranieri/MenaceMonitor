

<script lang="ts">
    import { fade } from "svelte/transition";
    import MenaceReportCard from "./MenaceReportCard.svelte";
    import type { MenaceReport } from "./types";
    import { createEventDispatcher } from "svelte";

    export let menaceReports:MenaceReport[];

    function selectCard(menaceReport:MenaceReport){
        
    }

</script>

<section>
    <h1>Menace Events</h1>
    <div class="menace-feed">

            {#each menaceReports as report }
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div in:fade={{duration:2000, delay:1000}} class="card" on:click={()=>selectCard(report)}>
                <MenaceReportCard menaceReport={report} />
            </div>

            {/each}

    </div>
</section>



<style>

    .menace-feed{
        display: flex;
        flex-direction: column-reverse;
    }

    .card {
        transition: transform 0.3s;
        margin: 6px;
        cursor: pointer;
    }

    .card:hover {
        transform: scale(1.05);
    }

    section{
        text-align: center;
    }


</style>