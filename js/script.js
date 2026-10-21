/* ==========================================================
   ÍNDICE
   1. Referências aos elementos
   2. Ano automático
   3. Saudação dinâmica
   4. Menu hambúrguer
   5. Modo claro/escuro
   ========================================================== */


/* ========== 1. REFERÊNCIAS AOS ELEMENTOS ========== */
const elAno       = document.getElementById("ano");
const elSaudacao  = document.getElementById("saudacao");
const btnMenu     = document.getElementById("btn-menu");
const menu        = document.getElementById("menu");
const btnTema     = document.getElementById("btn-tema");


/* ========== 2. ANO AUTOMÁTICO ========== */
function atualizarAno() {
  elAno.textContent = new Date().getFullYear();
}


/* ========== 3. SAUDAÇÃO DINÂMICA ========== */
function atualizarSaudacao() {
  const hora = new Date().getHours();

  if (hora >= 5 && hora < 12)       elSaudacao.textContent = "Bom dia!";
  else if (hora >= 12 && hora < 18) elSaudacao.textContent = "Boa tarde!";
  else                              elSaudacao.textContent = "Boa noite!";
}


/* ========== 4. MENU HAMBÚRGUER ========== */
function alternarMenu(abrir) {
  menu.classList.toggle("aberto", abrir);
  btnMenu.setAttribute("aria-expanded", String(abrir));
  btnMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
}

function iniciarMenu() {
  btnMenu.addEventListener("click", () => {
    alternarMenu(!menu.classList.contains("aberto"));
  });

  // Fecha ao clicar em um link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => alternarMenu(false));
  });

  // Fecha com a tecla Esc (navegação por teclado)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("aberto")) {
      alternarMenu(false);
      btnMenu.focus();
    }
  });
}


/* ========== 5. MODO CLARO / ESCURO ========== */
function aplicarTema(tema) {
  if (tema === "escuro") {
    document.documentElement.setAttribute("data-tema", "escuro");
  } else {
    document.documentElement.removeAttribute("data-tema");
  }
  btnTema.setAttribute("aria-pressed", String(tema === "escuro"));
}

function iniciarTema() {
  // Guarda apenas a preferência de tema (nenhum dado pessoal)
  let salvo = null;
  try { salvo = localStorage.getItem("tema"); } catch (e) {}
  aplicarTema(salvo === "escuro" ? "escuro" : "claro");

  btnTema.addEventListener("click", () => {
    const novo = document.documentElement.hasAttribute("data-tema") ? "claro" : "escuro";
    aplicarTema(novo);
    try { localStorage.setItem("tema", novo); } catch (e) {}
  });
}


/* ========== INICIALIZAÇÃO ========== */
atualizarAno();
atualizarSaudacao();
iniciarMenu();
iniciarTema();
