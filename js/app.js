async function signUp() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const msg = document.getElementById("auth-msg");
  msg.innerText = "Criando conta...";

  // 1. Criar usuário no Auth
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: senha
  });

  if (error) {
    msg.innerText = "Erro no cadastro: " + error.message;
    return;
  }

  const user = data.user;

  if (!user) {
    msg.innerText = "Erro inesperado ao criar usuário.";
    return;
  }

  // 2. Criar perfil
  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      nome: nome
    });

  if (profileError) {
    msg.innerText =
      "Usuário criado, mas erro ao salvar perfil: " + profileError.message;
    return;
  }

  msg.innerText = "Conta criada com sucesso! Agora faça login.";
}

async function signIn() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const msg = document.getElementById("auth-msg");

  msg.innerText = "Entrando...";

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: senha
  });

  if (error) {
    msg.innerText = "Erro no login: " + error.message;
  } else {
    location.reload();
  }
}

async function logout() {
  await supabase.auth.signOut();
  location.reload();
}
