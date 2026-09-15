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
// COMPARAR DOUS MENÚS
// ============================================================

function menusIguais(menu1, menu2) {

    if (!menu1 || !menu2) {
        return false;
    }

    return (
        (menu1.primeiro || "") === (menu2.primeiro || "") &&
        (menu1.segundo || "") === (menu2.segundo || "") &&
        (menu1.sobremesa || "") === (menu2.sobremesa || "")
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
// CARGAR MODIFICACIÓNS GARDADAS EN LOCALSTORAGE
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


        // --------------------------------------------------------
        // IMPORTANTE:
        // Só recuperamos modificacións que realmente existan
        // no almacenamento.
        //
        // Non substituímos os MENUS_* completos.
        // --------------------------------------------------------

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


                // Gardamos a modificación
                modificacionsGardadas[tipo][data] = {

                    primeiro:
                        modificacion.primeiro || "",

                    segundo:
                        modificacion.segundo || "",

                    sobremesa:
                        modificacion.sobremesa || ""
                };


                // Aplicamos a modificación ao menú actual
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
// GARDAR SÓ AS MODIFICACIÓNS EN LOCALSTORAGE
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


    if (!tipo || !data) {
        return;
    }


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

    tipoActual =
        tipo.value;


    const coleccion =
        obterColeccion(tipo.value);


    if (!coleccion) {
        return;
    }


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


        // ----------------------------------------------------
        // Primeiro cargamos as modificacións gardadas
        // ----------------------------------------------------

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


                    // ------------------------------------------------
                    // Creamos a modificación da data seleccionada
                    // ------------------------------------------------

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


                    // Actualizamos o menú en memoria

                    coleccion[dataSeleccionada] = {

                        primeiro:
                            modificacion.primeiro,

                        segundo:
                            modificacion.segundo,

                        sobremesa:
                            modificacion.sobremesa
                    };


                    // Gardamos SÓ esta modificación

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


                    // Gardar permanentemente

                    gardarMenusLocalStorage();


                    // Actualizar tipo actual

                    tipoActual =
                        tipoSeleccionado;


                    // ====================================================
                    // CORRECCIÓN:
                    // Se modificamos BASAL, recargamos a pantalla principal
                    // para que o cambio apareza inmediatamente.
                    // ====================================================

                    if (tipoSeleccionado === "basal") {

                        alert(
                            "Menú gardado correctamente."
                        );

                        location.reload();

                        return;
                    }


                    // Para os demais tipos mantemos o funcionamento actual

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
                    // Comprobamos se existe unha modificación
                    // específica para esta data e este tipo
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
                    // Eliminamos SÓ esta modificación
                    // ------------------------------------------------

                    delete modificacionsGardadas[
                        tipoSeleccionado
                    ][
                        dataSeleccionada
                    ];


                    // ------------------------------------------------
                    // Gardamos de novo só as modificacións restantes
                    // ------------------------------------------------

                    gardarMenusLocalStorage();


                    // ------------------------------------------------
                    // Recargamos a páxina.
                    //
                    // Ao recargar:
                    // - MENUS_* volve cargar desde menus_v2.js
                    // - aplícanse só as modificacións que quedan
                    // - a data restaurada recupera o menú orixinal
                    // ------------------------------------------------

                    location.reload();

                }
            );
        }

    }
);
