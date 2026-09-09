// ===============================
// TRIPLE TAP PARA ABRIR PANEL ADMIN
// ===============================

let taps = 0;
let tapTimer = null;

document.querySelector(".selo").addEventListener("click", () => {
    taps++;

    clearTimeout(tapTimer);
    tapTimer = setTimeout(() => taps = 0, 500);

    if (taps === 3) {
        abrirPanelAdmin();
        taps = 0;
    }
});

// ===============================
// ABRIR / PECHAR PANEL ADMIN
// ===============================

function abrirPanelAdmin() {
    document.getElementById("adminPanel").classList.remove("oculto");
}

document.getElementById("pecharAdmin").addEventListener("click", () => {
    document.getElementById("adminPanel").classList.add("oculto");
});

// ===============================
// COLECCIÓNS DE MENÚS
// ===============================

const coleccions = {
    basal: MENUS_BASAL,
    sen_lactosa: MENUS_SEN_LACTOSA,
    sen_glute: MENUS_SEN_GLUTE,
    musulman: MENUS_MUSULMAN,
    sen_marisco: MENUS_SEN_MARISCO
};

// Tipo actual seleccionado polo usuario
let tipoActual = "basal";

// ===============================
// CAMBIO DE TIPO DE MENÚ
// ===============================

document.getElementById("tipoMenu").addEventListener("change", () => {
    tipoActual = document.getElementById("tipoMenu").value;
    mostrarMenuHoxe();
});

// ===============================
// MOSTRAR MENÚ DE HOXE
// ===============================

function mostrarMenuHoxe() {

    const hoxe = new Date();
    const ano = hoxe.getFullYear();
    const mes = String(hoxe.getMonth() + 1).padStart(2, "0");
    const dia = String(hoxe.getDate()).padStart(2, "0");

    const dataHoxe = `${ano}-${mes}-${dia}`;
    const coleccion = coleccions[tipoActual];
    const menu = coleccion[dataHoxe];

    document.getElementById("dataHoxe").textContent = `Menú do día ${dia}/${mes}/${ano}`;

    document.getElementById("primeiro").textContent = menu?.primeiro || "Sen rexistro";
    document.getElementById("segundo").textContent = menu?.segundo || "—";
    document.getElementById("sobremesa").textContent = menu?.sobremesa || "—";
}

// Mostrar ao cargar a páxina
mostrarMenuHoxe();

// ===============================
// CARGAR MENÚ NO PANEL ADMIN
// ===============================

document.getElementById("adminData").addEventListener("change", () => {
    const data = document.getElementById("adminData").value;
    if (!data) return;

    const coleccion = coleccions[tipoActual];
    const menu = coleccion[data];

    document.getElementById("adminPrimeiro").value = menu?.primeiro || "";
    document.getElementById("adminSegundo").value = menu?.segundo || "";
    document.getElementById("adminSobremesa").value = menu?.sobremesa || "";
});
