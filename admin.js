// ============================================================
// ADMINISTRACIÓN DO COMEDOR – CEIP JUAN REY
// ============================================================

const CLAVE_STORAGE = "menusCEIPJuanRey_v2";


// ============================================================
// MODIFICACIÓNS GARDADAS
// ============================================================

let modificacionsGardadas = {
    basal: {},
    sen_lactosa: {},
    sen_glute: {},
    musulman: {},
    sen_marisco: {}
};


// ============================================================
// OBTER COLECCIÓN
// ============================================================

function obterColeccion(tipo) {

    switch (tipo) {

        case "basal":
            return MENUS_BASAL;

        case "sen_lactosa":
            return MENUS_SEN_LACTOSA;

        case "sen_glute":
            return MENUS_SEN_GLUTE;

        case "musulman":
            return MENUS_MUSULMAN;

        case "sen_marisco":
            return MENUS_SEN_MARISCO;

        default:
            return null;
    }
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

            if (
                !datos[tipo] ||
                typeof datos[tipo] !== "object"
            ) {
                return;
            }

            const coleccion =
                obterColeccion(tipo);

            if (!coleccion) {
                return;
            }

            Object.keys(datos[tipo]).forEach((data) => {

                const menu =
                    datos[tipo][data];

                if (
                    !menu ||
                    typeof menu !== "object"
                ) {
                    return;
                }

                modificacionsGardadas[tipo][data] = {

                    primeiro:
                        menu.primeiro || "",

                    segundo:
                        menu.segundo || "",

                    sobremesa:
                        menu.sobremesa || ""
                };

                coleccion[data] = {

                    primeiro:
                        menu.primeiro || "",

                    segundo:
                        menu.segundo || "",

                    sobremesa:
                        menu.sobremesa || ""
                };

            });

        });

    } catch (erro) {

        console.error(
            "Erro ao cargar modificacións:",
            erro
        );
    }
}


// ============================================================
// GARDAR MODIFICACIÓNS
// ============================================================

function gardarMenusLocalStorage() {

    localStorage.setItem(
        CLAVE_STORAGE,
        JSON.stringify(
            modificacionsGardadas
        )
    );
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


    if (!tipo || !data) {
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


    tipoActual =
        tipoSeleccionado;


    const coleccion =
        obterColeccion(tipoSeleccionado);


    if (!coleccion) {

        console.error(
            "Non se atopou a colección:",
            tipoSeleccionado
        );

        limparCamposAdmin();

        return;
    }


    const menu =
        coleccion[dataSeleccionada];


    console.log(
        "Cargando menú:",
        tipoSeleccionado,
        dataSeleccionada,
        menu
    );


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
// INICIALIZACIÓN
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // ----------------------------------------------
        // Cargar modificacións gardadas
        // ----------------------------------------------

        cargarMenusGardados();


        // ----------------------------------------------
        // Referencias
        // ----------------------------------------------

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


        // ----------------------------------------------
        // Tipo de menú
        // ----------------------------------------------

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


        // ----------------------------------------------
        // Data
        // ----------------------------------------------

        if (data) {

            data.addEventListener(
                "change",
                () => {

                    cargarMenuAdmin();
                }
            );
        }


        // ----------------------------------------------
        // Gardar
        // ----------------------------------------------

        if (gardar) {

            gardar.addEventListener(
                "click",
                () => {

                    const tipoSeleccionado =
                        tipo
                            ? tipo.value
                            : "";

                    const dataSeleccionada =
                        data
                            ? data.value
                            : "";


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


                    coleccion[dataSeleccionada] = {

                        primeiro:
                            modificacion.primeiro,

                        segundo:
                            modificacion.segundo,

                        sobremesa:
                            modificacion.sobremesa
                    };


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


                    gardarMenusLocalStorage();


                    alert(
                        "Menú gardado correctamente."
                    );


                    // Se é basal, actualizamos
                    // inmediatamente o menú público

                    tipoActual = "basal";

                    if (
                        typeof mostrarMenuHoxe ===
                        "function"
                    ) {

                        mostrarMenuHoxe();
                    }

                }
            );
        }


        // ----------------------------------------------
        // Restaurar menú orixinal
        // ----------------------------------------------

        if (restaurar) {

            restaurar.addEventListener(
                "click",
                () => {

                    const tipoSeleccionado =
                        tipo
                            ? tipo.value
                            : "";

                    const dataSeleccionada =
                        data
                            ? data.value
                            : "";


                    if (!dataSeleccionada) {

                        alert(
                            "Selecciona unha data."
                        );

                        return;
                    }


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


                    delete modificacionsGardadas[
                        tipoSeleccionado
                    ][
                        dataSeleccionada
                    ];


                    gardarMenusLocalStorage();


                    location.reload();

                }
            );
        }

    }
);
