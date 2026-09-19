// ============================================================
// ADMINISTRACIÓN DO COMEDOR – CEIP JUAN REY
// ============================================================

const CLAVE_STORAGE = "menusCEIPJuanRey_v2";


// ============================================================
// MODIFICACIÓNS REALIZADAS DESDE O PANEL
// ============================================================

let modificacionsGardadas = {
    basal: {},
    sen_lactosa: {},
    sen_glute: {},
    musulman: {},
    sen_marisco: {}
};


// ============================================================
// OBTENER COLECCIÓN SEGUNDO O TIPO
// ============================================================

function obterColeccion(tipo) {

    if (tipo === "basal") {
        return MENUS_BASAL;
    }

    if (tipo === "sen_lactosa") {
        return MENUS_SEN_LACTOSA;
    }

    if (tipo === "sen_glute") {
        return MENUS_SEN_GLUTE;
    }

    if (tipo === "musulman") {
        return MENUS_MUSULMAN;
    }

    if (tipo === "sen_marisco") {
        return MENUS_SEN_MARISCO;
    }

    return null;
}


// ============================================================
// CARGAR MODIFICACIÓNS GARDADAS
// ============================================================

function cargarMenusGardados() {

    try {

        const gardados =
            localStorage.getItem(CLAVE_STORAGE);

        if (!gardados) {
            return;
        }

        const datos =
            JSON.parse(gardados);

        if (!datos || typeof datos !== "object") {
            return;
        }

        const tipos = [
            "basal",
            "sen_lactosa",
            "sen_glute",
            "musulman",
            "sen_marisco"
        ];

        tipos.forEach((tipo) => {

            const gardadosTipo =
                datos[tipo];

            if (
                !gardadosTipo ||
                typeof gardadosTipo !== "object"
            ) {
                return;
            }

            const coleccion =
                obterColeccion(tipo);

            if (!coleccion) {
                return;
            }

            Object.keys(gardadosTipo).forEach((data) => {

                const modificacion =
                    gardadosTipo[data];

                if (
                    !modificacion ||
                    typeof modificacion !== "object"
                ) {
                    return;
                }

                modificacionsGardadas[tipo][data] = {

                    primeiro:
                        modificacion.primeiro || "",

                    segundo:
                        modificacion.segundo || "",

                    sobremesa:
                        modificacion.sobremesa || ""
                };

                coleccion[data] = {

                    primeiro:
                        modificacion.primeiro || "",

                    segundo:
                        modificacion.segundo || "",

                    sobremesa:
                        modificacion.sobremesa || ""
                };

            });

        });

    } catch (erro) {

        console.error(
            "Erro ao cargar os menús gardados:",
            erro
        );
    }
}


// ============================================================
// GARDAR MODIFICACIÓNS EN LOCALSTORAGE
// ============================================================

function gardarMenusLocalStorage() {

    const datos = {

        basal:
            modificacionsGardadas.basal,

        sen_lactosa:
            modificacionsGardadas.sen_lactosa,

        sen_glute:
            modificacionsGardadas.sen_glute,

        musulman:
            modificacionsGardadas.musulman,

        sen_marisco:
            modificacionsGardadas.sen_marisco
    };

    localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify(datos)
    );
}


// ============================================================
// LIMPAR CAMPOS DO PANEL
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
// CARGAR MENÚ NO PANEL ADMIN
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

    if (!tipo || !data) {
        return;
    }

    if (!data.value) {

        limparCamposAdmin();

        return;
    }

    // Mantemos sincronizado o tipo actual
    tipoActual = tipo.value;

    const coleccion =
        obterColeccion(tipo.value);

    if (!coleccion) {

        limparCamposAdmin();

        return;
    }

    const dataSeleccionada =
        data.value;

    const menu =
        coleccion[dataSeleccionada];

    // Se non existe menú para esa data,
    // deixamos os campos baleiros.
    if (!menu) {

        limparCamposAdmin();

        return;
    }

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
}


// ============================================================
// INICIALIZACIÓN DO PANEL ADMIN
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // ----------------------------------------------------
        // Primeiro recuperamos as modificacións gardadas
        // ----------------------------------------------------

        cargarMenusGardados();


        // ----------------------------------------------------
        // O menú público comeza sempre en BASAL
        // ----------------------------------------------------

        tipoActual = "basal";


        if (
            typeof mostrarMenuHoxe ===
            "function"
        ) {

            mostrarMenuHoxe();
        }


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

        const gardar =
            document.getElementById("gardarMenu");

        const restaurar =
            document.getElementById("restaurarMenu");


        // ====================================================
        // CAMBIAR TIPO DE MENÚ
        // ====================================================

        if (tipo) {

            tipo.addEventListener(
                "change",
                () => {

                    tipoActual =
                        tipo.value;

                    cargarMenuAdmin();
                }
            );
        }


        // ====================================================
        // CAMBIAR DATA
        // ====================================================

        if (data) {

            data.addEventListener(
                "change",
                () => {

                    tipoActual =
                        tipo
                            ? tipo.value
                            : "basal";

                    cargarMenuAdmin();
                }
            );
        }


        // ====================================================
        // GARDAR MENÚ
        // ====================================================

        if (gardar) {

            gardar.addEventListener(
                "click",
                () => {

                    if (!tipo || !data) {
                        return;
                    }

                    const tipoSeleccionado =
                        tipo.value;

                    const dataSeleccionada =
                        data.value;


                    if (!dataSeleccionada) {

                        alert(
                            "Selecciona unha data."
                        );

                        return;
                    }


                    const coleccion =
                        obterColeccion(
                            tipoSeleccionado
                        );


                    if (!coleccion) {

                        alert(
                            "Tipo de menú non válido."
                        );

                        return;
                    }


                    const modificacion = {

                        primeiro:
                            primeiro
                                ? primeiro.value
                                : "",

                        segundo:
                            segundo
                                ? segundo.value
                                : "",

                        sobremesa:
                            sobremesa
                                ? sobremesa.value
                                : ""
                    };


                    // ------------------------------------------------
                    // Actualizamos o menú en memoria
                    // ------------------------------------------------

                    coleccion[dataSeleccionada] = {

                        primeiro:
                            modificacion.primeiro,

                        segundo:
                            modificacion.segundo,

                        sobremesa:
                            modificacion.sobremesa
                    };


                    // ------------------------------------------------
                    // Gardamos a modificación específica
                    // ------------------------------------------------

                    modificacionsGardadas[
                        tipoSeleccionado
                    ][
                        dataSeleccionada
                    ] = {

                        primeiro:
                            modificacion.primeiro,

                        segundo:
                            modificacion.segundo,

                        sobremesa:
                            modificacion.sobremesa
                    };


                    // ------------------------------------------------
                    // Gardamos en LocalStorage
                    // ------------------------------------------------

                    gardarMenusLocalStorage();


                    // ------------------------------------------------
                    // O menú público segue sendo BASAL
                    // ------------------------------------------------

                    tipoActual = "basal";


                    if (
                        typeof mostrarMenuHoxe ===
                        "function"
                    ) {

                        mostrarMenuHoxe();
                    }


                    alert(
                        "Menú gardado correctamente."
                    );
                }
            );
        }


        // ====================================================
        // RESTAURAR MENÚ ORIXINAL
        // ====================================================

        if (restaurar) {

            restaurar.addEventListener(
                "click",
                () => {

                    if (!tipo || !data) {
                        return;
                    }


                    const tipoSeleccionado =
                        tipo.value;

                    const dataSeleccionada =
                        data.value;


                    if (!dataSeleccionada) {

                        alert(
                            "Selecciona unha data."
                        );

                        return;
                    }


                    // ------------------------------------------------
                    // Comprobamos se existe modificación gardada
                    // ------------------------------------------------

                    if (
                        !modificacionsGardadas[
                            tipoSeleccionado
                        ] ||
                        !modificacionsGardadas[
                            tipoSeleccionado
                        ][
                            dataSeleccionada
                        ]
                    ) {

                        alert(
                            "Non hai unha modificación gardada para esta data."
                        );

                        return;
                    }


                    // ------------------------------------------------
                    // Eliminamos só esta modificación
                    // ------------------------------------------------

                    delete modificacionsGardadas[
                        tipoSeleccionado
                    ][
                        dataSeleccionada
                    ];


                    // ------------------------------------------------
                    // Gardamos as modificacións restantes
                    // ------------------------------------------------

                    gardarMenusLocalStorage();


                    // ------------------------------------------------
                    // Recargamos para recuperar o menú orixinal
                    // ------------------------------------------------

                    location.reload();

                }
            );
        }

    }
);
