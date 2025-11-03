(function () {
  const alunosEl = document.getElementById('listaAlunos');
  const treinosEl = document.getElementById('listaTreinos');

  if (alunosEl) {
    alunosEl.innerHTML = '<div class="card">Carregando alunos...</div>';
    setTimeout(() => {
      const alunos = [
        { nome: 'Ana Souza', progresso: '8/12 treinos' },
        { nome: 'Bruno Lima', progresso: '5/12 treinos' },
        { nome: 'Carlos Silva', progresso: '12/12 treinos' },
      ];
      alunosEl.innerHTML = alunos.map((a) => `
        <div class="item">
          <div>
            <strong>${a.nome}</strong>
            <div style="color:#a9acb2">${a.progresso}</div>
          </div>
          <button class="btn btn--secondary btn--sm">Ver</button>
        </div>`).join('');
    }, 600);
  }

  if (treinosEl) {
    treinosEl.innerHTML = '<div class="card">Carregando treinos...</div>';
    setTimeout(() => {
      const treinos = [
        { aluno: 'Ana Souza', treino: 'A - Peito/Tríceps' },
        { aluno: 'Bruno Lima', treino: 'B - Costas/Bíceps' },
        { aluno: 'Carlos Silva', treino: 'C - Pernas/Ombros' },
      ];
      treinosEl.innerHTML = treinos.map((t) => `
        <div class="item">
          <div>
            <strong>${t.aluno}</strong>
            <div style="color:#a9acb2">${t.treino}</div>
          </div>
          <button class="btn btn--primary btn--sm">Editar</button>
        </div>`).join('');
    }, 800);
  }
})();


