// ===============================
// TRIPLE TAP PARA ABRIR PANEL ADMIN
// ===============================

let taps = 0;
let tapTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    const selo = document.querySelector(".selo");
    if (!selo) return;

    selo.style.cursor = "pointer";

    selo.addEventListener("click", () => {
        taps++;
        clearTimeout(tapTimer);

        tapTimer = setTimeout(() => taps = 0, 800);

        if (taps === 3) {
            abrirPanelAdmin();
            taps = 0;
        }
    });
});

// ===============================
// ABRIR / PECHAR PANEL ADMIN
// ===============================

function abrirPanelAdmin() {
    const panel = document.getElementById("adminPanel");
    if (panel) panel.classList.remove("oculto");
}

document.addEventListener("DOMContentLoaded", () => {
    const pechar = document.getElementById("pecharAdmin");
    if (pechar) {
        pechar.addEventListener("click", () => {
            document.getElementById("adminPanel").classList.add("oculto");
        });
    }
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

    // ⭐ DATA LOCAL REAL SEN ERROS DE UTC
    const agora = new Date();
    const local = new Date(agora.getTime() - agora.getTimezoneOffset() * 60000);
    const dataHoxe = local.toISOString().split("T")[0];

    const coleccion = coleccions[tipoActual];
    const menu = coleccion[dataHoxe];

    // ⭐ DATA EN FORMATO 09/09/2026
    const [ano, mes, dia] = dataHoxe.split("-");

    document.getElementById("dataHoxe").textContent =
        `Menú do día ${dia}/${mes}/${ano}`;

    // ⭐ PRATOS
    document.getElementById("primeiro").textContent = menu?.primeiro || "Sen rexistro";
    document.getElementById("segundo").textContent = menu?.segundo || "—";
    document.getElementById("sobremesa").textContent = menu?.sobremesa || "—";
}

// Mostrar ao cargar
document.addEventListener("DOMContentLoaded", mostrarMenuHoxe);

// ===============================
// CARGAR MENÚ NO PANEL ADMIN
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    const adminData = document.getElementById("adminData");
    if (!adminData) return;

    adminData.addEventListener("change", () => {
        const data = adminData.value;
        if (!data) return;

        const coleccion = coleccions[tipoActual];
        const menu = coleccion[data] || {};

        document.getElementById("adminPrimeiro").value = menu.primeiro || "";
        document.getElementById("adminSegundo").value = menu.segundo || "";
        document.getElementById("adminSobremesa").value = menu.sobremesa || "";
    });
});
