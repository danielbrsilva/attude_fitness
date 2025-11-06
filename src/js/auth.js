// Simple auth using localStorage
// Contas padrão SEED (pré-cadastradas para testes):
// - Admin: admin@attude.com / 123456 (role: admin)
// - Instrutor: instrutor@attude.com / 123456 (role: instrutor)
// - Instrutor: coach@attude.com / 123456 (role: instrutor)
// - Aluno: aluno@attude.com / 123456 (role: aluno)
// - Aluno: maria@attude.com / 123456 (role: aluno)
(function () {
  const USERS_KEY = 'attude_users';
  const SESSION_KEY = 'attude_session';

  /** Reinicia e popula os usuários padrão a cada carregamento conforme solicitado */
  const DEFAULT_USERS = [
    { name: 'Administrador', email: 'admin@attude.com', password: '666666', role: 'admin' },
    { name: 'Instrutor Daniel', email: 'instrutor@attude.com', password: '123456', role: 'instrutor' },
    { name: 'Instrutor Paulo', email: 'paulo@attude.com', password: '123456', role: 'instrutor' },
    { name: 'Instrutor Lins', email: 'lins@attude.com', password: '123456', role: 'instrutor' },
    { name: 'Aluno Padrão', email: 'aluno@attude.com', password: '123456', role: 'aluno' },
    { name: 'Felipe Neto', email: 'felipe@attude.com', password: '666666666', role: 'aluno' },
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));

  function readUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
  }
  function writeUsers(users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
  function setSession(email, role) { localStorage.setItem(SESSION_KEY, JSON.stringify({ email, role, ts: Date.now() })); }
  function getSession() { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; } }
  function emailValid(email) { return /.+@.+\..+/.test(email); }

  // Login handler
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = /** @type {HTMLInputElement} */(document.getElementById('loginEmail')).value.trim();
      const password = /** @type {HTMLInputElement} */(document.getElementById('loginPassword')).value;
      const errorEl = document.getElementById('loginError');
      if (errorEl) errorEl.textContent = '';

      if (!emailValid(email)) { if (errorEl) errorEl.textContent = 'Email inválido.'; return; }
      if (!password) { if (errorEl) errorEl.textContent = 'Informe a senha.'; return; }

      const users = readUsers();
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) { if (errorEl) errorEl.textContent = 'Credenciais inválidas.'; return; }
      setSession(user.email, user.role || 'aluno');
      // Redireciona por papel
      if (user.role === 'admin') window.location.href = 'painel-admin.html';
      else if (user.role === 'instrutor') window.location.href = 'painel-instrutor.html';
      else window.location.href = 'painel-aluno.html';
    });
  }

  // Register handler
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = /** @type {HTMLInputElement} */(document.getElementById('registerName')).value.trim();
      const email = /** @type {HTMLInputElement} */(document.getElementById('registerEmail')).value.trim();
      const password = /** @type {HTMLInputElement} */(document.getElementById('registerPassword')).value;
      const errorEl = document.getElementById('registerError');
      if (errorEl) errorEl.textContent = '';

      if (name.length < 2) { if (errorEl) errorEl.textContent = 'Nome muito curto.'; return; }
      if (!emailValid(email)) { if (errorEl) errorEl.textContent = 'Email inválido.'; return; }
      if (password.length < 6) { if (errorEl) errorEl.textContent = 'Senha deve ter ao menos 6 caracteres.'; return; }

      const users = readUsers();
      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        if (errorEl) errorEl.textContent = 'Email já cadastrado.'; return;
      }
      users.push({ name, email, password, role: 'aluno' });
      writeUsers(users);
      setSession(email, 'aluno');
      window.location.href = 'painel-aluno.html';
    });
  }

  // Contact form (simple demo)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const success = document.getElementById('contactSuccess');
      if (success) success.textContent = 'Mensagem enviada! Em breve entraremos em contato.';
      contactForm.reset();
    });
  }

  // Fill name in painel if present
  const sess = getSession();
  const nameEl = document.getElementById('studentName');
  if (sess && nameEl) {
    const users = readUsers();
    const u = users.find((x) => x.email === sess.email);
    if (u && u.name) nameEl.textContent = u.name;
  }
})();


