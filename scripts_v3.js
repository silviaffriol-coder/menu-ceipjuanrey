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

        tapTimer = setTimeout(() => {
            taps = 0;
        }, 800);

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

    const panel =
        document.getElementById("adminPanel");

    if (panel) {

        panel.classList.remove("oculto");
    }
}


document.addEventListener("DOMContentLoaded", () => {

    const pechar =
        document.getElementById("pecharAdmin");

    if (pechar) {

        pechar.addEventListener("click", () => {

            const panel =
                document.getElementById("adminPanel");

            if (panel) {

                panel.classList.add("oculto");
            }
        });
    }
});


// ===============================
// COLECCIÓNS DE MENÚS
// ===============================

const coleccions = {

    basal:
        typeof MENUS_BASAL !== "undefined"
            ? MENUS_BASAL
            : {},

    sen_lactosa:
        typeof MENUS_SEN_LACTOSA !== "undefined"
            ? MENUS_SEN_LACTOSA
            : {},

    sen_glute:
        typeof MENUS_SEN_GLUTE !== "undefined"
            ? MENUS_SEN_GLUTE
            : {},

    musulman:
        typeof MENUS_MUSULMAN !== "undefined"
            ? MENUS_MUSULMAN
            : {},

    sen_marisco:
        typeof MENUS_SEN_MARISCO !== "undefined"
            ? MENUS_SEN_MARISCO
            : {}
};


let tipoActual = "basal";


// ===============================
// CAMBIAR MENÚ
// ===============================

function cambiarMenu(tipo) {

    if (!coleccions[tipo]) {
        return;
    }

    tipoActual = tipo;

    mostrarMenuHoxe();
}


// ===============================
// MOSTRAR MENÚ DO DÍA
// ===============================

function mostrarMenuHoxe() {

    const agora = new Date();

    const ano =
        agora.getFullYear();

    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            agora.getDate()
        ).padStart(2, "0");


    const dataHoxe =
        `${ano}-${mes}-${dia}`;


    const coleccion =
        coleccions[tipoActual] || {};

    const menu =
        coleccion[dataHoxe] || {};


    // ===============================
    // DATA
    // ===============================

    const elementoData =
        document.getElementById("dataHoxe");

    if (elementoData) {

        elementoData.textContent =
            `Menú do día ${dia}/${mes}/${ano}`;
    }


    // ===============================
    // PRIMEIRO PRATO
    // ===============================

    const elementoPrimeiro =
        document.getElementById("primeiro");

    if (elementoPrimeiro) {

        elementoPrimeiro.textContent =
            menu.primeiro || "Sen rexistro";
    }


    // ===============================
    // SEGUNDO PRATO
    // ===============================

    const elementoSegundo =
        document.getElementById("segundo");

    if (elementoSegundo) {

        elementoSegundo.textContent =
            menu.segundo || "—";
    }


    // ===============================
    // SOBREMESA
    // ===============================

    const elementoSobremesa =
        document.getElementById("sobremesa");

    if (elementoSobremesa) {

        elementoSobremesa.textContent =
            menu.sobremesa || "—";
    }
}


// ===============================
// MOSTRAR AUTOMATICAMENTE AO ABRIR
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    mostrarMenuHoxe();

});


// ===============================
// CAMBIO AUTOMÁTICO DE DÍA
// ===============================

let dataUltimaComprobada = "";


function obterDataActual() {

    const agora = new Date();

    const ano =
        agora.getFullYear();

    const mes =
        String(
            agora.getMonth() + 1
        ).padStart(2, "0");

    const dia =
        String(
            agora.getDate()
        ).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


document.addEventListener("DOMContentLoaded", () => {

    dataUltimaComprobada =
        obterDataActual();

    setInterval(() => {

        const dataActual =
            obterDataActual();

        if (dataActual !== dataUltimaComprobada) {

            dataUltimaComprobada =
                dataActual;

            mostrarMenuHoxe();
        }

    }, 30000);

});


// ===============================
// CARGAR MENÚ NO PANEL ADMIN
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const adminData =
        document.getElementById("adminData");

    if (!adminData) return;

    adminData.addEventListener("change", () => {

        const data =
            adminData.value;

        if (!data) return;

        const coleccion =
            coleccions[tipoActual] || {};

        const menu =
            coleccion[data] || {};

        const primeiro =
            document.getElementById("adminPrimeiro");

        const segundo =
            document.getElementById("adminSegundo");

        const sobremesa =
            document.getElementById("adminSobremesa");


        if (primeiro) {

            primeiro.value =
                menu.primeiro || "";
        }

        if (segundo) {

            segundo.value =
                menu.segundo || "";
        }

        if (sobremesa) {

            sobremesa.value =
                menu.sobremesa || "";
        }
    });
});
