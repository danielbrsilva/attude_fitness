(function () {
  const usuariosEl = document.getElementById('usuariosLista');
  const planosEl = document.getElementById('planosLista');

  function readUsers() {
    try { return JSON.parse(localStorage.getItem('attude_users') || '[]'); } catch { return []; }
  }
  function writeUsers(users) { localStorage.setItem('attude_users', JSON.stringify(users)); }

  function renderUsers() {
    if (!usuariosEl) return;
    const users = readUsers();
    if (!users.length) {
      usuariosEl.innerHTML = '<div class="card">Nenhum usuário cadastrado.</div>';
      return;
    }
    usuariosEl.innerHTML = users.map((u) => `
      <div class="item">
        <div>
          <strong>${u.name || u.email}</strong>
          <div style=\"color:#a9acb2\">${u.email} • ${u.role || 'aluno'}</div>
        </div>
        <button class="btn btn--danger btn--sm delete-user" data-email="${u.email}">Excluir</button>
      </div>`).join('');
  }

  if (usuariosEl) {
    usuariosEl.innerHTML = '<div class="card">Carregando usuários...</div>';
    setTimeout(renderUsers, 300);
    usuariosEl.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.classList.contains('delete-user')) {
        const email = t.getAttribute('data-email');
        if (!email) return;
        const users = readUsers().filter((u) => u.email !== email);
        writeUsers(users);
        renderUsers();
      }
    });
  }

  if (planosEl) {
    planosEl.innerHTML = '<div class="card">Carregando planos...</div>';
    setTimeout(() => {
      const planos = [
        { nome: 'Básico', preco: 'R$ 59' },
        { nome: 'Intermediário', preco: 'R$ 89' },
        { nome: 'Premium', preco: 'R$ 129' },
      ];
      planosEl.innerHTML = planos.map((p) => `
        <div class="item">
          <div>
            <strong>${p.nome}</strong>
            <div style=\"color:#a9acb2\">${p.preco}/mês</div>
          </div>
          <button class="btn btn--secondary btn--sm">Editar</button>
        </div>`).join('');
    }, 400);
  }
})();


