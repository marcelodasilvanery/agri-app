document.addEventListener("DOMContentLoaded", async () => {
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  const authContainer = document.getElementById("auth-container");
  const appContainer = document.getElementById("app-container");

  if (session) {
    authContainer.style.display = "none";
    appContainer.style.display = "block";

    console.log("Usuário logado:", session.user.email);

    // FUTURO:
    // initMap();
  } else {
    authContainer.style.display = "block";
    appContainer.style.display = "none";

    console.log("Usuário não autenticado");
  }
});
