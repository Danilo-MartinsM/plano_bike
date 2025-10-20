/* script.js
 - Contém os dados do plano (baseado no PDF enviado)
 - Lida com cálculo do dia atual, progresso e armazenamento via localStorage
 - Código organizado e comentado para facilitar alterações futuras
*/

(function () {
  // ---------- CONFIGURAÇÕES ----------
  // START_DATE: ano, mês (0-indexed), dia -> 19/10/2025
  const START_DATE = new Date(2025, 9, 19);
  // TOTAL_DAYS: estamos carregando apenas as 2 semanas do PDF (14 dias)
  const TOTAL_DAYS = 14;
  // Versão do storage para evitar conflitos se a estrutura mudar futuramente
  const STORAGE_KEY = 'plano_bici_progress_v1';

  // ---------- DADOS DO PLANO (1..14) ----------
  // Cada item: { title, duration, intensity, notes }
  const PLAN = [
    // Semana 1
    { title: 'Dia 1 — Segunda', duration: '10 min', intensity: '1–2', notes: '10 min contínuos. Foco em terminar.' },
    { title: 'Dia 2 — Terça', duration: '12 min', intensity: '1–2', notes: '12 min contínuos. Beba água durante a sessão.' },
    { title: 'Dia 3 — Quarta', duration: '10 min', intensity: '1–2', notes: '10 min contínuos. Diminua o ritmo se cansar.' },
    { title: 'Dia 4 — Quinta', duration: '12 min', intensity: '1–2', notes: '12 min contínuos. Autoavaliação: foi fácil?' },
    { title: 'Dia 5 — Sexta', duration: '15 min', intensity: '3', notes: '15 min contínuos. Sessão mais longa da semana.' },
    { title: 'Dia 6 — Sábado', duration: '10 min', intensity: '1–2', notes: 'Recuperação ativa.' },
    { title: 'Dia 7 — Domingo (Descanso)', duration: '-', intensity: '-', notes: 'Descanso - recupere-se bem.' },

    // Semana 2
    { title: 'Dia 8 — Segunda', duration: '15 min', intensity: '3', notes: 'Introduza nível 1 de resistência.' },
    { title: 'Dia 9 — Terça', duration: '18 min', intensity: '3', notes: 'Pode dividir: 9 min + 1 min pausa + 9 min.' },
    { title: 'Dia 10 — Quarta', duration: '15 min', intensity: '3', notes: 'Ritmo constante e relaxado.' },
    { title: 'Dia 11 — Quinta', duration: '20 min', intensity: '4', notes: 'Aumente para resistência 2 se confortável.' },
    { title: 'Dia 12 — Sexta', duration: '25 min', intensity: '3', notes: 'Foque no tempo; reduza carga se necessário.' },
    { title: 'Dia 13 — Sábado', duration: '15 min', intensity: '3', notes: 'Movimento leve e contínuo.' },
    { title: 'Dia 14 — Domingo (Descanso)', duration: '-', intensity: '-', notes: 'Descanso - aproveite a recuperação.' }
  ];

  // Dicas rápidas exibidas na página inicial
  const TIPS = [
    'Hidrate-se: meta ~3L/dia. Leve sua garrafa.',
    'Evite bebidas açucaradas antes e depois do treino.',
    'Inclua proteína e fibras nas refeições principais.',
    'Ajuste o assento: perna quase esticada com leve flexão no joelho.',
    'Se conseguir conversar durante o esforço, a intensidade está adequada.'
  ];

  // ---------- UTILITÁRIOS DOM ----------
  function qs(selector) { return document.querySelector(selector); }
  function qsa(selector) { return Array.from(document.querySelectorAll(selector)); }

  // ---------- DATAS E CÁLCULOS ----------
  // Normaliza a data para meia-noite local (evita problemas de timezone ao comparar dias)
  function normalizeDateToLocalMidnight(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  // Retorna o índice do dia do plano com base na data atual
  // Usa 1..TOTAL_DAYS (se antes do início retorna 1; se depois do fim retorna TOTAL_DAYS)
  function getPlanDayIndex(today = new Date()) {
    const t = normalizeDateToLocalMidnight(today).getTime();
    const s = normalizeDateToLocalMidnight(START_DATE).getTime();
    const diffMs = t - s;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // diferença em dias inteiros
    const dayIndex = diffDays + 1; // se diffDays === 0 -> dia 1
    if (dayIndex < 1) return 1;
    if (dayIndex > TOTAL_DAYS) return TOTAL_DAYS;
    return dayIndex;
  }

  // ---------- LOCALSTORAGE (progresso) ----------
  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch (err) {
      console.warn('Erro ao carregar progresso do localStorage', err);
      return {};
    }
  }

  function saveProgress(progressObj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressObj));
    } catch (err) {
      console.warn('Erro ao salvar progresso no localStorage', err);
    }
  }

  // ---------- RENDERIZAÇÃO E UI ----------
  // Atualiza barra e textos de progresso (index)
  function updateProgressUI() {
    const progress = loadProgress();
    const doneCount = Object.values(progress).filter(Boolean).length;
    const total = PLAN.length;
    const percent = Math.round((doneCount / total) * 100);

    const fill = qs('#progress-fill');
    if (fill) fill.style.width = percent + '%';

    const label = qs('#progress-label');
    if (label) label.textContent = `${doneCount} de ${total} dias concluídos`;

    const summary = qs('#summary');
    if (summary) summary.textContent = `${doneCount} de ${total} dias completos`;
  }

  // Renderiza lista de dicas na index
  function renderTips() {
    const ul = qs('#tip-list');
    if (!ul) return;
    ul.innerHTML = '';
    TIPS.forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      ul.appendChild(li);
    });
  }

  // Render do cartão "Seu dia atual"
  function renderTodayCard() {
    const el = qs('#today-card');
    if (!el) return;
    const dayIndex = getPlanDayIndex(new Date());
    const item = PLAN[dayIndex - 1];
    // link para a semana adequada (semana1.html ou semana2.html)
    const weekPage = dayIndex <= 7 ? 'semana1.html' : 'semana2.html';
    el.innerHTML = `
      <strong>${item.title}</strong>
      <div class="muted small">${item.duration} • Intensidade: ${item.intensity}</div>
      <p class="small-note">${item.notes}</p>
      <div style="margin-top:.6rem">
        <a href="${weekPage}" class="btn-primary">Abrir o dia</a>
      </div>
    `;
  }

  // Renderiza os cards de uma semana (1 ou 2)
  function renderWeek(weekNumber) {
    const container = qs(weekNumber === 1 ? '#week1-days' : '#week2-days');
    if (!container) return;

    container.innerHTML = '';
    const startIndex = weekNumber === 1 ? 0 : 7;
    const endIndex = startIndex + 7;
    const progress = loadProgress();

    for (let i = startIndex; i < endIndex; i++) {
      const idx = i + 1; // dia 1..14
      const data = PLAN[i];
      const card = document.createElement('div');
      card.className = 'day';
      card.innerHTML = `
        <h4>${data.title}</h4>
        <div class="meta">${data.duration} • Intensidade: ${data.intensity}</div>
        <div class="small-note">${data.notes}</div>
        <div class="checkbox-row">
          <label>
            <input type="checkbox" data-day="${idx}" ${progress['day-' + idx] ? 'checked' : ''}>
            Marcar como concluído
          </label>
          <div class="muted">Dia ${idx}</div>
        </div>
      `;
      container.appendChild(card);
    }
  }

  // ---------- BINDINGS (eventos) ----------
  // Manipula mudança de estado das checkboxes (delegation)
  function bindCheckboxes() {
    document.addEventListener('change', function (e) {
      const tgt = e.target;
      if (tgt && tgt.matches('input[type="checkbox"][data-day]')) {
        const day = tgt.getAttribute('data-day');
        const key = 'day-' + day;
        const progress = loadProgress();
        progress[key] = tgt.checked;
        saveProgress(progress);
        updateProgressUI();
      }
    });
  }

  // Botão "Começar" na index: leva ao dia atual
  function bindStartButton() {
    const btn = qs('#btn-start');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const dayIndex = getPlanDayIndex(new Date());
      const target = dayIndex <= 7 ? 'semana1.html' : 'semana2.html';
      window.location.href = target;
    });
  }

  // ---------- INICIALIZAÇÃO ----------
  function init() {
    // renderizações iniciais (estas funções verificam se os elementos existem)
    renderTips();
    renderTodayCard();
    updateProgressUI();

    // render de semanas (somente se os containers existirem nessa página)
    if (qs('#week1-days')) renderWeek(1);
    if (qs('#week2-days')) renderWeek(2);

    // vincula eventos
    bindCheckboxes();
    bindStartButton();

    // atualiza progress periodicamente (útil se o usuário alterar em outra aba)
    setInterval(updateProgressUI, 1000);
  }

  // roda quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(); 
