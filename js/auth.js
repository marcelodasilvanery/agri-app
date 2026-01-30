// js/auth.js
import { supabase } from "./supabaseClient.js";
import { initMap } from "./app.js";

// ELEMENTOS DO HTML
const authContainer = document.getElementById("auth-container");
const appContainer = document.getElementById("app");
const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authMessage = document.getElementById("auth-message");
const logoutBtn = document.getElementById("logout-btn");

// ----------------- FUNÇÃO DE CADASTRO -----------------
async function signUp(email, password) {
  authMessage.innerText = "Criando conta...";
  authMessage.style.color = "black";

  const { data, error } = await supabase.auth.signUp(
    { email, password },
    { redirectTo: window.location.href } // mantém fluxo seguro
  );

  if (error) {
    authMessage.innerText = "Erro: " + error.message;
    authMessage.style.color = "red";
    return;
  }

  // Mensagem clara sobre confirmação de email
  authMessage.innerText =
    "Conta criada com sucesso! Verifique seu email e confirme antes de logar.";
  authMessage.style.color = "green";
}

// ----------------- FUNÇÃO DE LOGIN -----------------
async function signIn(email, password) {
  authMessage.innerText = "Entrando...";
  authMessage.style.color = "black";

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    // Detecta possível falta de confirmação de email
    if (error.message.includes("Invalid login credentials")) {
      authMessage.innerText =
        "Não foi possível logar: confirme seu email antes de acessar o sistema.";
    } else {
      authMessage.innerText = "Erro no login: " + error.message;
    }
    authMessage.style.color = "red";
    return;
  }

  authMessage.innerText = "Login realizado!";
  authMessage.style.color = "green";

  showApp();
}

// ----------------- FUNÇÃO DE LOGOUT -----------------
async fu
