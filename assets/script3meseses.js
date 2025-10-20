(function(){
  const START_DATE = new Date(2025, 9, 19); // início do plano
  const STORAGE_KEY = 'plano_3meses_progress_v1';

  // Criar plano completo 12 semanas (3 meses) - placeholders, você poderá editar
  const PLAN = [];
  let dayCounter = 1;
  for(let m=1;m<=3;m++){
    for(let w=1;w<=4;w++){
      for(let d=1;d<=7;d++){
        let title = `Dia ${dayCounter} — Mês ${m} Semana ${w}`;
        let duration = `${10 + (dayCounter%5)*5} min`; // placeholder
        let intensity = `${(dayCounter%4)+1}`;
        let notes = `Treino do dia ${dayCounter}. Ajuste conforme sentir.`;
        PLAN.push({title,duration,intensity,notes});
        dayCounter++;
      }
    }
  }

  // Utilitários
  function qs(s){return document.querySelector(s);}
  function qsa(s){return Array.from(document.querySelectorAll(s));}

  function normalizeDateToMidnight(d){let dd=new Date(d); dd.setHours(0,0,0,0); return dd;}
  function getPlanDayIndex(today=new Date()){
    const t=normalizeDateToMidnight(today).getTime();
    const s=normalizeDateToMidnight(START_DATE).getTime();
    let diff=Math.floor((t-s)/(1000*60*60*24))+1;
    if(diff<1) return 1;
    if(diff>PLAN.length) return PLAN.length;
    return diff;
  }

  // LocalStorage
  function loadProgress(){try{let raw=localStorage.getItem(STORAGE_KEY); return raw?JSON.parse(raw):{};}catch(e){return {};}}
  function saveProgress(obj){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(obj));}catch(e){}}

  // Render
  function renderMonth(monthNumber){
    const container = qs(`#month${monthNumber} .weeks-grid`);
    if(!container) return;
    container.innerHTML='';

    const startWeek = (monthNumber-1)*4;
    for(let w=0; w<4; w++){
      const weekCard = document.createElement('div');
      weekCard.className='week-card card';
      const weekIndex = startWeek + w;

      let html = `<h3>Semana ${w+1}</h3><div class="days-grid">`;
      const startDay = weekIndex*7;
      const endDay = startDay+7;
      const progress = loadProgress();
      for(let i=startDay;i<endDay;i++){
        const data = PLAN[i];
        const dayKey = 'day-'+(i+1);
        const checked = progress[dayKey]?'checked':'';
        html += `
          <div class="day day-card">
            <h4>${data.title}</h4>
            <div class="meta">${data.duration} • Intensidade: ${data.intensity}</div>
            <div class="small-note">${data.notes}</div>
            <div class="checkbox-row">
              <label>
                <input type="checkbox" data-day="${i+1}" ${checked}>
                Concluído
              </label>
            </div>
          </div>
        `;
      }
      html += `</div>`;
      weekCard.innerHTML = html;
      container.appendChild(weekCard);
    }
  }

  function bindCheckboxes(){
    document.addEventListener('change',function(e){
      const tgt=e.target;
      if(tgt && tgt.matches('input[type="checkbox"][data-day]')){
        const day = tgt.getAttribute('data-day');
        const progress = loadProgress();
        progress['day-'+day]=tgt.checked;
        saveProgress(progress);
      }
    });
  }

  function highlightCurrentDay(){
    const todayIndex = getPlanDayIndex();
    const el = qs(`input[data-day="${todayIndex}"]`);
    if(el){
      el.closest('.day-card').classList.add('current-day');
      el.scrollIntoView({behavior:'smooth',block:'center'});
    }
  }

  function init(){
    renderMonth(1);
    renderMonth(2);
    renderMonth(3);
    bindCheckboxes();
    highlightCurrentDay();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',init);
  } else init();

})();
