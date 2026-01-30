// js/auth.js
import { supabase } from "./supabaseClient.js";

const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app");
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authMessage = document.getElementById("auth-message");
const logoutBtn = document.getElementById("logout-btn");

// ----------------- CADASTRO -----------------
async function signUp(email, password) {
  authMessage.innerText = "Criando conta...";
  authMessage.style.color = "black";

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    authMessage.innerText = "Erro: " + error.message;
    authMessage.style.color = "red";
    return;
  }

  authMessage.innerText = "Conta criada com sucesso! Faça login.";
  authMessage.style.color = "green";
}

// ----------------- LOGIN -----------------
async function signIn(email, password) {
  authMessage.innerText = "Entrando...";
  authMessage.style.color = "black";

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    authMessage.innerText = "Erro: " + error.message;
    authMessage.style.color = "red";
    return;
  }

  authMessage.innerText = "Login realizado!";
  authMessage.style.color = "green";

  showApp();
}

// ----------------- LOGOUT -----------------
async function logout() {
  await supabase.auth.signOut();
  authContainer.style.display = "block";
  appContainer.style.display = "none";
}

logoutBtn.addEventListener("click", logout);

// ----------------- FORMULARIO -----------------
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const mode = document.querySelector('input[name="auth-mode"]:checked').value;

  if (mode === "signup") {
    signUp(email, password);
  } else {
    signIn(email, password);
  }
});

// ----------------- CONTROLE DE SESSÃO -----------------
supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    showApp();
  }
});

function showApp() {
  authContainer.style.display = "none";
  appContainer.style.display = "block";

  // Inicializa mapa
  import("./app.js").then((mod) => mod.initMap());
}
