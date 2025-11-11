// === Mostrar formularios ===
function mostrarLogin() {
  const login = document.getElementById("login");
  const registro = document.getElementById("registro");
  registro.style.display = "none";
  login.style.display = (login.style.display === "none" || login.style.display === "") ? "block" : "none";
}

function mostrarRegistro() {
  const login = document.getElementById("login");
  const registro = document.getElementById("registro");
  login.style.display = "none";
  registro.style.display = (registro.style.display === "none" || registro.style.display === "") ? "block" : "none";
}

// === Guardar usuarios en localStorage ===
document.getElementById("formRegistro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificar si ya existe
  if (usuarios.find(u => u.email === email)) {
    alert("⚠️ Ya existe una cuenta con este correo. Inicia sesión.");
    mostrarLogin();
    return;
  }

  usuarios.push({ nombre, email, password });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("✅ Registro exitoso, ahora puedes iniciar sesión.");
  mostrarLogin();
});

// === Login ===
document.getElementById("formLogin").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("emailLogin").value.trim();
  const password = document.getElementById("passwordLogin").value.trim();

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    localStorage.setItem("sesion", JSON.stringify(usuario));
    window.location.href = "menu.html";
  } else {
    if (usuarios.find(u => u.email === email)) {
      alert("❌ Contraseña incorrecta.");
    } else {
      alert("❌ No existe una cuenta con ese correo. Regístrate primero.");
      mostrarRegistro();
    }
  }
});

// === Mostrar formulario inicial ===
window.onload = () => {
  mostrarRegistro(); // Puedes cambiar a mostrarLogin() si prefieres
};
