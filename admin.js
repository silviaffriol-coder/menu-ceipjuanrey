// ============================================================
// ADMINISTRACIÓN DOS MENÚS - CEIP JUAN REY
// ============================================================

const CLAVE_STORAGE = "menusCEIPJuanRey_v2";


// ============================================================
// MENÚS OFICIAIS
// ============================================================

function obterColeccion(tipo) {
    switch (tipo) {
        case "basal":
            return typeof MENUS_BASAL !== "undefined" ? MENUS_BASAL : {};

        case "sen_lactosa":
            return typeof MENUS_SEN_LACTOSA !== "undefined" ? MENUS_SEN_LACTOSA : {};

        case "sen_glute":
            return typeof MENUS_SEN_GLUTE !== "undefined" ? MENUS_SEN_GLUTE : {};

        case "musulman":
            return typeof MENUS_MUSULMAN !== "undefined" ? MENUS_MUSULMAN : {};

        case "sen_marisco":
            return typeof MENUS_SEN_MARISCO !== "undefined" ? MENUS_SEN_MARISCO : {};

        default:
            return {};
    }
}


// ============================================================
// MODIFICACIÓNS GARDADAS NO NAVEGADOR
// ============================================================

function crearEstruturaModificacions() {
    return {
        basal: {},
        sen_lactosa: {},
        sen_glute: {},
        musulman: {},
        sen_marisco: {}
    };
}

let modificacionsGardadas = crearEstruturaModificacions();


// ============================================================
// CARGAR MODIFICACIÓNS
// ============================================================

function cargarModificacions() {
    const estrutura = crearEstruturaModificacions();

    try {
        const gardadas = localStorage.getItem(CLAVE_STORAGE);

        if (!gardadas) {
            modificacionsGardadas = estrutura;
            return;
        }

        const datos = JSON.parse(gardadas);

        if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
            modificacionsGardadas = estrutura;
            return;
        }

        for (const tipo of Object.keys(estrutura)) {
            const datosTipo = datos[tipo];

            if (
                datosTipo &&
                typeof datosTipo === "object" &&
                !Array.isArray(datosTipo)
            ) {
                estrutura[tipo] = datosTipo;
            }
        }

        modificacionsGardadas = estrutura;

    } catch (erro) {
        console.error("Erro ao cargar os menús gardados:", erro);
        modificacionsGardadas = estrutura;
    }
}


// ============================================================
// GARDAR MODIFICACIÓNS
// ============================================================

function gardarModificacions() {
    try {
        localStorage.setItem(
            CLAVE_STORAGE,
            JSON.stringify(modificacionsGardadas)
        );

        return true;

    } catch (erro) {
        console.error("Erro ao gardar os menús:", erro);

        alert(
            "Non foi posible gardar os cambios no navegador. " +
            "Comproba o almacenamento dispoñible."
        );

        return false;
    }
}


// ============================================================
// OBTTER MENÚ EFECTIVO
// MENÚ OFICIAL + MODIFICACIÓNS NON BALEIRAS
// ============================================================

function obterMenuEfectivo(tipo, data) {
    const coleccion = obterColeccion(tipo);
    const menuOficial = coleccion[data] || {};

    const modificacion =
        modificacionsGardadas[tipo]?.[data];

    const menu = {
        primeiro: String(menuOficial.primeiro ?? ""),
        segundo: String(menuOficial.segundo ?? ""),
        sobremesa: String(menuOficial.sobremesa ?? "")
    };

    if (!modificacion || typeof modificacion !== "object") {
        return menu;
    }

    const campos = ["primeiro", "segundo", "sobremesa"];

    for (const campo of campos) {
        const valorGardado = String(modificacion[campo] ?? "").trim();

        // Un campo gardado baleiro nunca elimina o prato oficial.
        if (valorGardado !== "") {
            menu[campo] = valorGardado;
        }
    }

    return menu;
}


// ============================================================
// LIMPAR CAMPOS DO PANEL
// ============================================================

function limparCamposAdmin() {
    const primeiro = document.getElementById("adminPrimeiro");
    const segundo = document.getElementById("adminSegundo");
    const sobremesa = document.getElementById("adminSobremesa");

    if (primeiro) primeiro.value = "";
    if (segundo) segundo.value = "";
    if (sobremesa) sobremesa.value = "";
}


// ============================================================
// CARGAR MENÚ NO PANEL DE ADMINISTRACIÓN
// ============================================================

function cargarMenuAdmin() {
    const tipo = document.getElementById("adminTipo");
    const data = document.getElementById("adminData");
    const primeiro = document.getElementById("adminPrimeiro");
    const segundo = document.getElementById("adminSegundo");
    const sobremesa = document.getElementById("adminSobremesa");

    if (!tipo || !data || !primeiro || !segundo || !sobremesa) {
        return;
    }

    const tipoSeleccionado = tipo.value;
    const dataSeleccionada = data.value;

    if (!dataSeleccionada) {
        limparCamposAdmin();
        return;
    }

    const menu = obterMenuEfectivo(
        tipoSeleccionado,
        dataSeleccionada
    );

    primeiro.value = menu.primeiro;
    segundo.value = menu.segundo;
    sobremesa.value = menu.sobremesa;
}


// ============================================================
// GARDAR MENÚ
// ============================================================

function gardarMenuAdmin() {
    const tipo = document.getElementById("adminTipo");
    const data = document.getElementById("adminData");
    const primeiro = document.getElementById("adminPrimeiro");
    const segundo = document.getElementById("adminSegundo");
    const sobremesa = document.getElementById("adminSobremesa");

    if (!tipo || !data || !primeiro || !segundo || !sobremesa) {
        return;
    }

    const tipoSeleccionado = tipo.value;
    const dataSeleccionada = data.value;

    if (!dataSeleccionada) {
        alert("Selecciona primeiro unha data.");
        return;
    }

    if (!modificacionsGardadas[tipoSeleccionado]) {
        modificacionsGardadas[tipoSeleccionado] = {};
    }

    // Gardar os tres campos da data e menú seleccionados.
    modificacionsGardadas[tipoSeleccionado][dataSeleccionada] = {
        primeiro: primeiro.value.trim(),
        segundo: segundo.value.trim(),
        sobremesa: sobremesa.value.trim()
    };

    if (!gardarModificacions()) {
        return;
    }

    // Actualizar os campos coa información efectiva.
    cargarMenuAdmin();

    // Actualizar a páxina pública se coincide co menú e día mostrados.
    if (typeof mostrarMenuHoxe === "function") {
        mostrarMenuHoxe();
    }

    alert("Menú gardado correctamente.");
}


// ============================================================
// RESTAURAR MENÚ OFICIAL
// ============================================================

function restaurarMenuAdmin() {
    const tipo = document.getElementById("adminTipo");
    const data = document.getElementById("adminData");

    if (!tipo || !data) {
        return;
    }

    const tipoSeleccionado = tipo.value;
    const dataSeleccionada = data.value;

    if (!dataSeleccionada) {
        alert("Selecciona primeiro unha data.");
        return;
    }

    const modificacionsTipo = modificacionsGardadas[tipoSeleccionado];

    if (
        modificacionsTipo &&
        Object.prototype.hasOwnProperty.call(
            modificacionsTipo,
            dataSeleccionada
        )
    ) {
        // Conservar unha copia para poder recuperar a modificación
        // se o navegador non permite gardar os cambios.
        const modificacionAnterior = modificacionsTipo[dataSeleccionada];

        delete modificacionsTipo[dataSeleccionada];

        if (!gardarModificacions()) {
            modificacionsTipo[dataSeleccionada] = modificacionAnterior;
            return;
        }
    }

    // Volver cargar o menú oficial desa data.
    cargarMenuAdmin();

    if (typeof mostrarMenuHoxe === "function") {
        mostrarMenuHoxe();
    }

    alert("Restaurouse o menú orixinal.");
}


// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
    cargarModificacions();

    const tipo = document.getElementById("adminTipo");
    const data = document.getElementById("adminData");
    const gardar = document.getElementById("gardarMenu");
    const restaurar = document.getElementById("restaurarMenu");

    if (tipo) {
        tipo.addEventListener("change", cargarMenuAdmin);
    }

    if (data) {
        data.addEventListener("change", cargarMenuAdmin);
    }

    if (gardar) {
        gardar.addEventListener("click", gardarMenuAdmin);
    }

    if (restaurar) {
        restaurar.addEventListener("click", restaurarMenuAdmin);
    }
});
