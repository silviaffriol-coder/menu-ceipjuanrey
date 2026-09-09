// ===============================
// TRIPLE TAP PARA ABRIR PANEL ADMIN
// ===============================

let taps = 0;
let tapTimer = null;

document.addEventListener("DOMContentLoaded", () => {
    const selo = document.querySelector(".selo");
    if (!selo) return;

    // Aseguramos que a imaxe é clicable
    selo.style.cursor = "pointer";

    selo.addEventListener("click", () => {
        taps++;
        clearTimeout(tapTimer);

        // Drupal ás veces mete capas → damos máis tempo
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

   const dataHoxe = new Date().toLocaleDateString("sv-SE");
    const coleccion = coleccions[tipoActual];
    const menu = coleccion[dataHoxe];

    // ⭐ DATA EN FORMATO 09/09/2026
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
        const menu = coleccion[data];

        document.getElementById("adminPrimeiro").value = menu?.primeiro || "";
        document.getElementById("adminSegundo").value = menu?.segundo || "";
        document.getElementById("adminSobremesa").value = menu?.sobremesa || "";
    });
});
