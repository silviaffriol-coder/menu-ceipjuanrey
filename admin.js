// ============================================================
// ADMINISTRACIÓN DOS MENÚS - CEIP JUAN REY
// ============================================================

const CLAVE_STORAGE = "menusCEIPJuanRey_v2";


// ============================================================
// MENÚS OFICIAIS
// ============================================================

function obterColeccion(tipo) {

    if (tipo === "basal") {
        return typeof MENUS_BASAL !== "undefined"
            ? MENUS_BASAL
            : {};
    }

    if (tipo === "sen_lactosa") {
        return typeof MENUS_SEN_LACTOSA !== "undefined"
            ? MENUS_SEN_LACTOSA
            : {};
    }

    if (tipo === "sen_glute") {
        return typeof MENUS_SEN_GLUTE !== "undefined"
            ? MENUS_SEN_GLUTE
            : {};
    }

    if (tipo === "musulman") {
        return typeof MENUS_MUSULMAN !== "undefined"
            ? MENUS_MUSULMAN
            : {};
    }

    if (tipo === "sen_marisco") {
        return typeof MENUS_SEN_MARISCO !== "undefined"
            ? MENUS_SEN_MARISCO
            : {};
    }

    return {};
}


// ============================================================
// MODIFICACIÓNS GARDADAS NO NAVEGADOR
// ============================================================

let modificacionsGardadas = {
    basal: {},
    sen_lactosa: {},
    sen_glute: {},
    musulman: {},
    sen_marisco: {}
};


function cargarModificacions() {

    try {

        const gardadas =
            localStorage.getItem(CLAVE_STORAGE);

        if (!gardadas) {
            return;
        }

        const datos =
            JSON.parse(gardadas);

        if (datos && typeof datos === "object") {

            modificacionsGardadas = {
                basal: datos.basal || {},
                sen_lactosa: datos.sen_lactosa || {},
                sen_glute: datos.sen_glute || {},
                musulman: datos.musulman || {},
                sen_marisco: datos.sen_marisco || {}
            };
        }

    } catch (erro) {

        console.error(
            "Erro ao cargar os menús gardados:",
            erro
        );
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

    } catch (erro) {

        console.error(
            "Erro ao gardar os menús:",
            erro
        );
    }
}


// ============================================================
// LIMPAR CAMPOS
// ============================================================

function limparCamposAdmin() {

    const primeiro =
        document.getElementById("adminPrimeiro");

    const segundo =
        document.getElementById("adminSegundo");

    const sobremesa =
        document.getElementById("adminSobremesa");


    if (primeiro) {
        primeiro.value = "";
    }

    if (segundo) {
        segundo.value = "";
    }

    if (sobremesa) {
        sobremesa.value = "";
    }
}


// ============================================================
// CARGAR MENÚ NO PANEL
// ============================================================

function cargarMenuAdmin() {

    const tipo =
        document.getElementById("adminTipo");

    const data =
        document.getElementById("adminData");

    const primeiro =
        document.getElementById("adminPrimeiro");

    const segundo =
        document.getElementById("adminSegundo");

    const sobremesa =
        document.getElementById("adminSobremesa");


    if (
        !tipo ||
        !data ||
        !primeiro ||
        !segundo ||
        !sobremesa
    ) {
        return;
    }


    const tipoSeleccionado =
        tipo.value;

    const dataSeleccionada =
        data.value;


    if (!dataSeleccionada) {

        limparCamposAdmin();

        return;
    }


    // --------------------------------------------------------
    // PRIMEIRO: buscar no menú oficial
    // --------------------------------------------------------

    const coleccion =
        obterColeccion(tipoSeleccionado);


    let menu =
        coleccion[dataSeleccionada];


    // --------------------------------------------------------
    // SE NON EXISTE, deixar campos baleiros
    // --------------------------------------------------------

    if (!menu) {

        limparCamposAdmin();

    } else {

        primeiro.value =
            menu.primeiro || "";

        segundo.value =
            menu.segundo || "";

        sobremesa.value =
            menu.sobremesa || "";
    }


    // --------------------------------------------------------
    // APLICAR UNHA MODIFICACIÓN GARDADA, SE EXISTE
    // --------------------------------------------------------

    if (
        modificacionsGardadas[tipoSeleccionado] &&
        modificacionsGardadas[tipoSeleccionado][dataSeleccionada]
    ) {

        const modificacion =
            modificacionsGardadas[tipoSeleccionado][dataSeleccionada];


        if (
            typeof modificacion.primeiro !== "undefined"
        ) {
            primeiro.value =
                modificacion.primeiro;
        }

        if (
            typeof modificacion.segundo !== "undefined"
        ) {
            segundo.value =
                modificacion.segundo;
        }

        if (
            typeof modificacion.sobremesa !== "undefined"
        ) {
            sobremesa.value =
                modificacion.sobremesa;
        }
    }
}


// ============================================================
// GARDAR MENÚ
// ============================================================

function gardarMenuAdmin() {

    const tipo =
        document.getElementById("adminTipo");

    const data =
        document.getElementById("adminData");

    const primeiro =
        document.getElementById("adminPrimeiro");

    const segundo =
        document.getElementById("adminSegundo");

    const sobremesa =
        document.getElementById("adminSobremesa");


    if (
        !tipo ||
        !data ||
        !primeiro ||
        !segundo ||
        !sobremesa
    ) {
        return;
    }


    const tipoSeleccionado =
        tipo.value;

    const dataSeleccionada =
        data.value;


    if (!dataSeleccionada) {

        alert("Selecciona primeiro unha data.");

        return;
    }


    if (!modificacionsGardadas[tipoSeleccionado]) {

        modificacionsGardadas[tipoSeleccionado] = {};
    }


    modificacionsGardadas[tipoSeleccionado][dataSeleccionada] = {

        primeiro:
            primeiro.value,

        segundo:
            segundo.value,

        sobremesa:
            sobremesa.value
    };


    gardarModificacions();


    alert("Menú gardado correctamente.");

    cargarMenuAdmin();
}


// ============================================================
// RESTAURAR MENÚ OFICIAL
// ============================================================

function restaurarMenuAdmin() {

    const tipo =
        document.getElementById("adminTipo");

    const data =
        document.getElementById("adminData");


    if (!tipo || !data) {
        return;
    }


    const tipoSeleccionado =
        tipo.value;

    const dataSeleccionada =
        data.value;


    if (!dataSeleccionada) {

        alert("Selecciona primeiro unha data.");

        return;
    }


    // Eliminar só a modificación desta data
    if (
        modificacionsGardadas[tipoSeleccionado] &&
        modificacionsGardadas[tipoSeleccionado][dataSeleccionada]
    ) {

        delete modificacionsGardadas[
            tipoSeleccionado
        ][dataSeleccionada];

        gardarModificacions();
    }


    // Volver cargar o menú oficial
    cargarMenuAdmin();


    alert("Restaurouse o menú orixinal.");
}


// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarModificacions();


        const tipo =
            document.getElementById("adminTipo");

        const data =
            document.getElementById("adminData");

        const gardar =
            document.getElementById("gardarMenu");

        const restaurar =
            document.getElementById("restaurarMenu");


        // ----------------------------------------------------
        // CAMBIO DE TIPO DE MENÚ
        // ----------------------------------------------------

        if (tipo) {

            tipo.addEventListener(
                "change",
                function () {

                    cargarMenuAdmin();
                }
            );
        }


        // ----------------------------------------------------
        // CAMBIO DE DATA
        // ----------------------------------------------------

        if (data) {

            data.addEventListener(
                "change",
                function () {

                    cargarMenuAdmin();
                }
            );
        }


        // ----------------------------------------------------
        // GARDAR
        // ----------------------------------------------------

        if (gardar) {

            gardar.addEventListener(
                "click",
                function () {

                    gardarMenuAdmin();
                }
            );
        }


        // ----------------------------------------------------
        // RESTAURAR
        // ----------------------------------------------------

        if (restaurar) {

            restaurar.addEventListener(
                "click",
                function () {

                    restaurarMenuAdmin();
                }
            );
        }

    }
);
