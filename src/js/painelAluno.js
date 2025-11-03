(function () {
  const treinosEl = document.getElementById('treinos');
  const workoutsDoneEl = document.getElementById('workoutsDone');
  const streakEl = document.getElementById('streak');

  if (treinosEl && workoutsDoneEl && streakEl) {
    treinosEl.innerHTML = '<div class="card">Carregando treinos...</div>';
    setTimeout(() => {
      const data = [
        { titulo: 'A - Peito e Tríceps', detalhes: 'Supino reto, inclinado, tríceps testa' },
        { titulo: 'B - Costas e Bíceps', detalhes: 'Puxada, remada, rosca direta' },
        { titulo: 'C - Pernas e Ombros', detalhes: 'Agachamento, leg press, desenvolvimento' },
      ];
      treinosEl.innerHTML = data.map((t) => `
        <div class="item">
          <div>
            <strong>${t.titulo}</strong>
            <div style="color:#a9acb2">${t.detalhes}</div>
          </div>
          <button class="mark btn btn--primary btn--sm" aria-label="Marcar como feito">Concluir</button>
        </div>`).join('');
      workoutsDoneEl.textContent = String(12);
      streakEl.textContent = String(4);
    }, 700);

    treinosEl.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.classList.contains('mark')) {
        t.textContent = 'Concluído';
        t.classList.remove('btn--primary');
        t.classList.add('btn--secondary');
        t.setAttribute('disabled', 'true');
        const curr = Number(workoutsDoneEl.textContent || '0');
        workoutsDoneEl.textContent = String(curr + 1);
      }
    });
  }
})();


