<script lang="ts">
  import MenaceForm from "./lib/MenaceForm.svelte";
  import MenaceList from "./lib/MenaceList.svelte";
  import type { MenaceReport } from "./lib/types";
  import { fly } from 'svelte/transition';
  import { loadReports } from "./services/app-service";

  let isFormVisible = false;

  let menaceReports: MenaceReport[] = [];
  let selectedMenaceReport: MenaceReport;

  (async()=>{
    menaceReports = await loadReports(999);
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
    <h3 class="nes-text is-primary">Menace Monitor</h3>
    <a href="#" class="nes-badge is-splited">
      <span class="is-dark">Ver</span>
      <span class="is-primary">1.0.1</span>
    </a>
    
  </header>

<main>

    {#if isFormVisible}
    <aside transition:fly={{x:200, duration:1000}}>
      <MenaceForm on:submit={reportMenace} on:dismiss={handleDismiss} />
    </aside>
    {/if}
 

  <section class="nes-container is-rounded">
    <MenaceList menaceReports={menaceReports} on:selected-card={handleSelection}/>
  </section>


  {#if !isFormVisible}
    <button id="report-btn" type="button" class="nes-btn is-error" on:click={()=>isFormVisible=!isFormVisible}>Report</button>
  {/if}


</main>

<footer>
  
</footer>



<style>
@import "./node_modules/nes.css/css/nes.css";
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');


main{
  font-family: 'Press Start 2P', cursive;
}


header{
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
    margin-right: 5px;
}

main {
  flex: 1;
}

footer {
  display: flex;
  margin-top: auto;
  justify-content: space-around;
}

#report-btn{
  position: fixed;
  height: 60px;
  right: 20px;
  bottom: 30px;
}


aside{
  z-index: 1;
  bottom: 10px;
  position: fixed;
  margin-left: 10px;
}

</style>

