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
// FORMATO DATA GALEGO
// ===============================

function formatoDataGalego(ano, mes, dia) {
    const meses = [
        "xaneiro","febreiro","marzo","abril","maio","xuño",
        "xullo","agosto","setembro","outubro","novembro","decembro"
    ];

    const mesNome = meses[parseInt(mes, 10) - 1];
    return `${parseInt(dia, 10)} de ${mesNome} de ${ano}`;
}

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

// Tipo actual por defecto
let tipoActual = "basal";

// ===============================
// CAMBIAR MENÚ (BOTÓNS)
// ===============================

function cambiarMenu(tipo) {
    tipoActual = tipo;
    mostrarMenuHoxe();
}

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

    // ⭐ MOSTRAR DATA ACTUAL EN GALEGO
    document.getElementById("dataHoxe").textContent =
        `Menú do día ${formatoDataGalego(ano, mes, dia)}`;

    // ⭐ MOSTRAR PRATOS
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

