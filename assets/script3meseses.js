(function() {
  // ---------- CONFIGURAÇÕES ----------
  const START_DATE = new Date(2025, 9, 19); // 19/10/2025
  const STORAGE_KEY = 'plano_3meses_progress_v1';
  const TOTAL_DAYS = 84; // 12 semanas x 7 dias

  // ---------- CRIA PLANO DE 3 MESES ----------
  const PLAN = [];
  let dayCounter = 1;
  for (let m = 1; m <= 3; m++) {
    for (let w = 1; w <= 4; w++) {
      for (let d = 1; d <= 7; d++) {
        const title = `Dia ${dayCounter} — Mês ${m} Semana ${w}`;
        const duration = `${10 + (dayCounter % 5) * 5} min`; // placeholder
        const intensity = `${(dayCounter % 4) + 1}`;
        const notes = `Treino do dia ${dayCounter}. Ajuste conforme sentir.`;
        PLAN.push({ title, duration, intensity, notes });
        dayCounter++;
      }
    }
  }

  // ---------- UTILITÁRIOS ----------
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));

  function normalizeDate(d) {
    const dd = new Date(d);
    dd.setHours(0, 0, 0, 0);
    return dd;
  }

  function getPlanDayIndex(today = new Date()) {
    const t = normalizeDate(today).getTime();
    const s = normalizeDate(START_DATE).getTime();
    let diff = Math.floor((t - s) / (1000 * 60 * 60 * 24)) + 1;
    if (diff < 1) return 1;
    if (diff > TOTAL_DAYS) return TOTAL_DAYS;
    return diff;
  }

  // ---------- LOCALSTORAGE ----------
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveProgress(obj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (e) {}
  }

  // ---------- RENDER ----------
  function renderMonth(monthNumber) {
    const container = qs(`#month${monthNumber} .weeks-grid`);
    if (!container) return;
    container.innerHTML = '';

    const startWeek = (monthNumber - 1) * 4;
    for (let w = 0; w < 4; w++) {
      const weekCard = document.createElement('div');
      weekCard.className = 'week-card card';
      const weekIndex = startWeek + w;

      let html = `<h3>Semana ${w + 1}</h3><div class="days-grid">`;
      const startDay = weekIndex * 7;
      const endDay = startDay + 7;
      const progress = loadProgress();

      for (let i = startDay; i < endDay; i++) {
        const data = PLAN[i];
        const dayKey = 'day-' + (i + 1);
        const checked = progress[dayKey] ? 'checked' : '';
        html += `
          <div class="day day-card">
            <h4>${data.title}</h4>
            <div class="meta">${data.duration} • Intensidade: ${data.intensity}</div>
            <div class="small-note">${data.notes}</div>
            <div class="checkbox-row">
              <label>
                <input type="checkbox" data-day="${i + 1}" ${checked}>
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

  function updateProgressUI() {
    const progress = loadProgress();
    const doneCount = Object.values(progress).filter(Boolean).length;
    const percent = Math.round((doneCount / TOTAL_DAYS) * 100);

    const fill = qs('#progress-fill');
    if (fill) fill.style.width = percent + '%';

    const label = qs('#progress-label');
    if (label) label.textContent = `${doneCount} de ${TOTAL_DAYS} dias concluídos`;

    const summary = qs('#summary');
    if (summary) summary.textContent = `${doneCount} de ${TOTAL_DAYS} dias completos`;
  }

  function renderTodayCard() {
    const el = qs('#today-card');
    if (!el) return;

    const dayIndex = getPlanDayIndex();
    const data = PLAN[dayIndex - 1];
    const week = Math.ceil(dayIndex / 7);
    const month = Math.ceil(week / 4);

    el.innerHTML = `
      <strong>${data.title}</strong>
      <div class="muted small">${data.duration} • Intensidade: ${data.intensity}</div>
      <p class="small-note">${data.notes}</p>
      <div style="margin-top:.6rem">
        <a href="treino.html#month${month}" class="btn-primary">Abrir Treino</a>
      </div>
    `;
  }

  // ---------- EVENTOS ----------
  function bindCheckboxes() {
    document.addEventListener('change', function(e) {
      const tgt = e.target;
      if (tgt && tgt.matches('input[type="checkbox"][data-day]')) {
        const day = tgt.getAttribute('data-day');
        const progress = loadProgress();
        progress['day-' + day] = tgt.checked;
        saveProgress(progress);
        updateProgressUI();
      }
    });
  }

  function bindStartButton() {
    const btn = qs('#btn-start');
    if (!btn) return;
    btn.addEventListener('click', function() {
      const dayIndex = getPlanDayIndex();
      const week = Math.ceil(dayIndex / 7);
      const month = Math.ceil(week / 4);
      window.location.href = `treino.html#month${month}`;
    });
  }

  function highlightCurrentDay() {
    const todayIndex = getPlanDayIndex();
    const el = qs(`input[data-day="${todayIndex}"]`);
    if (el) {
      el.closest('.day-card').classList.add('current-day');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ---------- INICIALIZAÇÃO ----------
  function init() {
    renderMonth(1);
    renderMonth(2);
    renderMonth(3);

    renderTodayCard();
    updateProgressUI();
    bindCheckboxes();
    bindStartButton();
    highlightCurrentDay();

    setInterval(updateProgressUI, 1000); // atualiza progresso periodicamente
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else init();
})();
