// js/auth.js
import { supabase } from "./supabaseClient.js";

// ELEMENTOS DA TELA
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const messageBox = document.getElementById("auth-message");

// CADASTRO
async function signUp(email, password) {
  messageBox.innerText = "Criando conta...";
  messageBox.style.color = "black";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    messageBox.innerText = error.message;
    messageBox.style.color = "red";
    return;
  }

  messageBox.innerText =
    "Conta criada com sucesso! Verifique seu e-mail se necessário.";
  messageBox.style.color = "green";
}

// LOGIN
async function signIn(email, password) {
  messageBox.innerText = "Entrando...";
  messageBox.style.color = "black";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    messageBox.innerText = error.message;
    messageBox.style.color = "red";
    return;
  }

  messageBox.innerText = "Login realizado!";
  messageBox.style.color = "green";

  // Esconde login e mostra app
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// EVENTO DO FORMULÁRIO
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const mode = document.querySelector(
    'input[name="auth-mode"]:checked'
  ).value;

  if (mode === "signup") {
    signUp(email, password);
  } else {
    signIn(email, password);
  }
});

// AUTO LOGIN
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("app").style.display = "block";
  }
});
