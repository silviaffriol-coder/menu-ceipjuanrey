// ============================================================
// ADMINISTRACIÓN DO COMEDOR – CEIP JUAN REY
// ============================================================

const CLAVE_STORAGE = "menusCEIPJuanRey_v2";


// ============================================================
// CARGAR MENÚS GARDADOS EN LOCALSTORAGE
// ============================================================

function cargarMenusGardados() {

    try {

        const gardados =
            localStorage.getItem(CLAVE_STORAGE);

        if (!gardados) return;

        const datos =
            JSON.parse(gardados);

        if (!datos || typeof datos !== "object") {
            return;
        }

        if (datos.basal) {
            Object.assign(MENUS_BASAL, datos.basal);
        }

        if (datos.sen_lactosa) {
            Object.assign(
                MENUS_SEN_LACTOSA,
                datos.sen_lactosa
            );
        }

        if (datos.sen_glute) {
            Object.assign(
                MENUS_SEN_GLUTE,
                datos.sen_glute
            );
        }

        if (datos.musulman) {
            Object.assign(
                MENUS_MUSULMAN,
                datos.musulman
            );
        }

        if (datos.sen_marisco) {
            Object.assign(
                MENUS_SEN_MARISCO,
                datos.sen_marisco
            );
        }

    } catch (erro) {

        console.error(
            "Erro ao cargar os menús gardados:",
            erro
        );
    }
}


// ============================================================
// GARDAR MENÚS EN LOCALSTORAGE
// ============================================================

function gardarMenusLocalStorage() {

    const datos = {

        basal: MENUS_BASAL,

        sen_lactosa:
            MENUS_SEN_LACTOSA,

        sen_glute:
            MENUS_SEN_GLUTE,

        musulman:
            MENUS_MUSULMAN,

        sen_marisco:
            MENUS_SEN_MARISCO
    };

    localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify(datos)
    );
}


// ============================================================
// CARGAR UN MENÚ NO PANEL
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


    if (!tipo || !data) return;

    if (!data.value) {

        if (primeiro) primeiro.value = "";
        if (segundo) segundo.value = "";
        if (sobremesa) sobremesa.value = "";

        return;
    }


    // Sincronizamos o tipo co resto da aplicación
    tipoActual = tipo.value;


    const coleccion =
        coleccions[tipo.value] || {};

    const menu =
        coleccion[data.value] || {};


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

        // Primeiro cargamos as modificacións gardadas
        cargarMenusGardados();


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

                    if (!tipo || !data) return;

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


                    let coleccion;


                    if (
                        tipoSeleccionado ===
                        "basal"
                    ) {

                        coleccion =
                            MENUS_BASAL;

                    } else if (
                        tipoSeleccionado ===
                        "sen_lactosa"
                    ) {

                        coleccion =
                            MENUS_SEN_LACTOSA;

                    } else if (
                        tipoSeleccionado ===
                        "sen_glute"
                    ) {

                        coleccion =
                            MENUS_SEN_GLUTE;

                    } else if (
                        tipoSeleccionado ===
                        "musulman"
                    ) {

                        coleccion =
                            MENUS_MUSULMAN;

                    } else if (
                        tipoSeleccionado ===
                        "sen_marisco"
                    ) {

                        coleccion =
                            MENUS_SEN_MARISCO;
                    }


                    if (!coleccion) return;


                    coleccion[dataSeleccionada] = {

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


                    // Gardar permanentemente
                    gardarMenusLocalStorage();


                    // Actualizar tipo actual
                    tipoActual =
                        tipoSeleccionado;


                    // Actualizar menú público
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

                    if (!tipo || !data) return;

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


                    let coleccionOriginal;


                    if (
                        tipoSeleccionado ===
                        "basal"
                    ) {

                        coleccionOriginal =
                            MENUS_BASAL;

                    } else if (
                        tipoSeleccionado ===
                        "sen_lactosa"
                    ) {

                        coleccionOriginal =
                            MENUS_SEN_LACTOSA;

                    } else if (
                        tipoSeleccionado ===
                        "sen_glute"
                    ) {

                        coleccionOriginal =
                            MENUS_SEN_GLUTE;

                    } else if (
                        tipoSeleccionado ===
                        "musulman"
                    ) {

                        coleccionOriginal =
                            MENUS_MUSULMAN;

                    } else if (
                        tipoSeleccionado ===
                        "sen_marisco"
                    ) {

                        coleccionOriginal =
                            MENUS_SEN_MARISCO;
                    }


                    if (!coleccionOriginal) return;


                    // Eliminamos o menú gardado
                    // para esa data
                    delete coleccionOriginal[
                        dataSeleccionada
                    ];


                    // Eliminamos os datos gardados
                    // de localStorage e reconstruímos
                    // a partir dos menús orixinais

                    localStorage.removeItem(
                        CLAVE_STORAGE
                    );


                    // Volvemos cargar a páxina
                    // para recuperar os datos orixinais

                    location.reload();
                }
            );
        }

    }
);
