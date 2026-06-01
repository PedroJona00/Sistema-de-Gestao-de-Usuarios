// ── Simula ping à API para mostrar status ──
async function checkApi() {
  const statusEl = document.getElementById("status-txt");
  const countEl = document.getElementById("count-users");
  const badgeEl = document.getElementById("status-badge");
  try {
    const result = await fetch("http://localhost:3000/usuario", {
      signal: AbortSignal.timeout(2000),
    });
    if (result.ok) {
        const data = await result.json();
        statusEl.textContent = "Online";
        badgeEl.textContent = "Sistema online";
        statusEl.style.color = "var(--accent)";
        badgeEl.style.color = "var(--accent)";
        countEl.textContent = data.length;
        renderRows(data);
    } 
  } catch {
    statusEl.textContent = "Offline";
    badgeEl.textContent = "Sistema offline";
    badgeEl.className = "hero-badge red";
    statusEl.className = "stat-value red";
    countEl.textContent = "—";
  }
}

function renderRows(users) {
  const container = document.getElementById("user-rows");
  console.log("Renderizando usuários:", users);
  if (!users.length) {
    container.innerHTML = `<div style="padding:2rem 1.5rem;font-family:var(--mono);font-size:0.8rem;color:var(--text-muted)">// Nenhum usuário cadastrado.</div>`;
    return;
  }
  container.innerHTML = users
    .map(
      (u) => `
        <div class="user-row">
          <span class="user-id">#${u.id ?? u.id_usuario}</span>
          <span class="user-name">${u.nome ?? u.nome_usuario}</span>
          <span class="user-email">${u.email ?? u.email_usuario}</span>
          <span class="user-pwd">••••••••</span>
          <div class="user-actions">
            <button class="btn btn-ghost btn-sm" onclick="editarUsuario(${u.id ?? u.id_usuario})">Editar</button>
            <button class="btn btn-danger btn-sm" onclick="deletarUsuario(${u.id ?? u.id_usuario})">✕</button>
          </div>
        </div>
      `,
    )
    .join("");
}

async function cadastrarUsuario() {
  const nome = document.getElementById("inp-nome").value.trim();
  const senha = document.getElementById("inp-senha").value.trim();
  const email = document.getElementById("inp-email").value.trim();
  if (!nome || !senha || !email) return alert("Preencha todos os campos.");
  try {
    const result = await fetch("http://localhost:3000/usuario/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome_usuario: nome, senha_usuario: senha, email_usuario: email }),
    });
    if (result.ok) {
      document.getElementById("inp-nome").value = "";
      document.getElementById("inp-senha").value = "";
      document.getElementById("inp-email").value = "";
      const msg = document.getElementById("msg-cadastro");
      msg.style.display = "block";
      setTimeout(() => (msg.style.display = "none"), 3000);
      checkApi();
    }
  } catch {
    alert(
      "Não foi possível conectar ao servidor. Verifique se o backend está rodando.",
    );
  }
}

async function deletarUsuario(id) {
  if (!confirm(`Tem certeza que deseja excluir o usuário #${id}?`)) return;
  try {
    const result = await fetch(`http://localhost:3000/usuario/deletar/${id}`, {
      method: "DELETE",
    });
    checkApi();
  } catch {
    alert("Erro ao conectar ao servidor.");
  }
}

async function editarUsuario(id) {
  const campo = prompt(
    "O que deseja alterar?\n1 - Nome\n2 - Senha\n3 - E-mail",
  );
  const mapa = { 1: "nome_usuario", 2: "senha_usuario", 3: "email_usuario" };
  const key = mapa[campo];
  if (!key) return;
  const valor = prompt(`Novo valor para ${key}:`);
  if (!valor) return;
  try {
    const result = await fetch(`http://localhost:3000/usuario/editar/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: valor }),
    });
    checkApi();
  } catch {
    alert("Erro ao conectar ao servidor.");
  }
}

// Inicia
checkApi();
