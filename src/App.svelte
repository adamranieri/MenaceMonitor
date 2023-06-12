<script lang="ts">
  import { quintOut } from "svelte/easing";
  import MenaceForm from "./lib/MenaceForm.svelte";
  import MenaceList from "./lib/MenaceList.svelte";
  import MenaceReportCard from "./lib/MenaceReportCard.svelte";
  import type { MenaceReport } from "./lib/types";
  import { crossfade, fly } from 'svelte/transition';
    import { loadReports } from "./services/app-service";

  let isFormVisible = false;

  let menaceReports: MenaceReport[] = [];
  let selectedMenaceReport: MenaceReport;

  (async()=>{
    menaceReports = await loadReports(999);
    console.log(menaceReports);
  })()

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

