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

        if (primeiro) {
            primeiro.value = "";
        }

        if (segundo) {
            segundo.value = "";
        }

        if (sobremesa) {
            sobremesa.value = "";
        }

        return;
    }


    // Sincronizamos o tipo coa aplicación
    tipoActual = tipo.value;


    const coleccion =
        obterColeccion(tipo.value);


    if (!coleccion) return;


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

        // Cargamos primeiro as modificacións gardadas
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


                    const gardados =
                        localStorage.getItem(
                            CLAVE_STORAGE
                        );


                    if (!gardados) {

                        alert(
                            "Non hai modificacións gardadas para restaurar."
                        );

                        return;
                    }


                    try {

                        const datos =
                            JSON.parse(gardados);


                        // Eliminamos SÓ a data seleccionada
                        // do tipo de menú seleccionado

                        if (
                            datos[tipoSeleccionado] &&
                            datos[tipoSeleccionado][
                                dataSeleccionada
                            ]
                        ) {

                            delete datos[
                                tipoSeleccionado
                            ][
                                dataSeleccionada
                            ];

                        } else {

                            alert(
                                "Non hai unha modificación gardada para esta data."
                            );

                            return;
                        }


                        // Gardamos de novo as modificacións
                        // dos demais menús e datas

                        localStorage.setItem(
                            CLAVE_STORAGE,
                            JSON.stringify(datos)
                        );


                        // Volvemos cargar os menús orixinais
                        // antes de aplicar as modificacións
                        // que aínda quedan gardadas

                        location.reload();

                    } catch (erro) {

                        console.error(
                            "Erro ao restaurar o menú:",
                            erro
                        );

                        alert(
                            "Produciuse un erro ao restaurar o menú."
                        );
                    }
                }
            );
        }

    }
);
