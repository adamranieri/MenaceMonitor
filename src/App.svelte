<script lang="ts">
  import { quintOut } from "svelte/easing";
  import MenaceForm from "./lib/MenaceForm.svelte";
  import MenaceList from "./lib/MenaceList.svelte";
  import MenaceReportCard from "./lib/MenaceReportCard.svelte";
  import type { MenaceReport } from "./lib/types";
  import { crossfade, fly } from 'svelte/transition';

  let isFormVisible = false;

  let menaceReports: MenaceReport[] = [
    {id:"101", description:"Marie woke me up at 5 AM", menaceLevel:2, timestamp: 0},
    {id:"202", description:"Marie scratched at door while in a meeting", menaceLevel:1, timestamp: 0},
    {id:"303", description:"Marie bit my toes", menaceLevel:3, timestamp:0},
    {id:"404", description:"Marie pounced me awake", menaceLevel:2, timestamp:0},
    {id:"505", description:"Marie Ran into the door LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL", menaceLevel:1, timestamp:0},
    {id:"606", description:"Marie ate my tuna fish", menaceLevel:3, timestamp:0},
    {id:"707", description:"Marie pounced me awake", menaceLevel:2, timestamp:0},
    {id:"808", description:"Marie Ran into the door", menaceLevel:1, timestamp:0},
    {id:"909", description:"Marie ate my tuna fish", menaceLevel:3, timestamp:0}
  ]
  let selectedMenaceReport: MenaceReport;

  function reportMenace(event){
    const report: MenaceReport = event.detail;
    menaceReports = [...menaceReports, report]
  }

  function handleSelection(event){
    const report:MenaceReport = event.detail;
    if(selectedMenaceReport){
      menaceReports = [...menaceReports, selectedMenaceReport];
    }
    menaceReports = menaceReports.filter(r => r.id !== report.id);
    selectedMenaceReport = report;
  }

  function handleDismiss(){
    console.log("HANDLER")
    isFormVisible = false;
  }

</script>

  <header>
    <h3>Menace Monitor</h3>
  </header>

<main>

    {#if isFormVisible}
    <aside transition:fly={{x:200, duration:1000}}>
      <MenaceForm on:submit={reportMenace} on:dismiss={handleDismiss} />
    </aside>
    {/if}
 

  <section>
    <MenaceList menaceReports={menaceReports} on:selected-card={handleSelection}/>
  </section>


  {#if !isFormVisible}
    <button id="report-btn" on:click={()=>isFormVisible=!isFormVisible}>Report &#10071;</button>
  {/if}


</main>

<footer>
  <h3>Menace Monitor</h3>
</footer>



<style>

header{
   background-color: brown;
}

main {
  flex: 1;
}

footer {
  margin-top: auto;
  background-color: brown;
}

#report-btn{
  position: fixed;
  border-radius: 15px;
  scale: 1.1;
  height: 60px;
  right: 25px;
  bottom: 100px;
  background-color:firebrick;
  color: cornsilk;
}


aside{
  z-index: 1;
  bottom: 10px;
  position: fixed;
}


</style>

