/* ============================================================
   PANEL DE ADMINISTRACIÓN – CEIP JUAN REY
   Selección de tipo de menú + data
   ============================================================ */

const CHAVE_MENUS = "menusCEIPJuanRey_v2";


/* ============================================================
   OBTENER A COLECCIÓN ORIXINAL
   ============================================================ */

function obterColeccionOrixinal(tipo) {

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

    return {};
}


/* ============================================================
   CARGAR MODIFICACIÓNS GARDADAS
   ============================================================ */

function cargarMenusGardados() {

    const gardado =
        localStorage.getItem(CHAVE_MENUS);

    if (gardado) {
        return JSON.parse(gardado);
    }

    return {};
}


/* ============================================================
   GARDAR MODIFICACIÓNS
   ============================================================ */

function gardarMenus(menus) {

    localStorage.setItem(
        CHAVE_MENUS,
        JSON.stringify(menus)
    );
}


/* ============================================================
   CARGAR MENÚ SEGUNDO TIPO + DATA
   ============================================================ */

function cargarMenuAdmin() {

    const adminTipo =
        document.getElementById("adminTipo");

    const adminData =
        document.getElementById("adminData");


    if (!adminTipo || !adminData) {
        return;
    }


    const tipo =
        adminTipo.value;

    const data =
        adminData.value;


    if (!tipo || !data) {
        return;
    }


    const orixinal =
        obterColeccionOrixinal(tipo);

    const gardados =
        cargarMenusGardados();

    const modificacion =
        gardados[tipo]?.[data];

    const menu =
        modificacion || orixinal[data] || {};


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

}


/* ============================================================
   CAMBIAR TIPO DE MENÚ
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const adminTipo =
        document.getElementById("adminTipo");

    const adminData =
        document.getElementById("adminData");


    /* --------------------------------------------------------
       CAMBIO DE TIPO
       -------------------------------------------------------- */

    if (adminTipo) {

        adminTipo.addEventListener(
            "change",
            () => {

                /*
                   Sincronizamos o selector do panel
                   coa aplicación principal.
                */

                tipoActual =
                    adminTipo.value;


                cargarMenuAdmin();

            }
        );

    }


    /* --------------------------------------------------------
       CAMBIO DE DATA
       -------------------------------------------------------- */

    if (adminData) {

        adminData.addEventListener(
            "change",
            () => {

                /*
                   Mantemos tipoActual sincronizado
                   co tipo seleccionado no panel.
                */

                if (adminTipo) {

                    tipoActual =
                        adminTipo.value;

                }


                cargarMenuAdmin();

            }
        );

    }

});


/* ============================================================
   GARDAR MENÚ EDITADO
   ============================================================ */

document.getElementById("gardarMenu").addEventListener(
    "click",
    () => {

        const adminTipo =
            document.getElementById("adminTipo");

        const adminData =
            document.getElementById("adminData");


        if (!adminTipo || !adminData) {
            return;
        }


        const tipo =
            adminTipo.value;

        const data =
            adminData.value;


        const primeiro =
            document
                .getElementById("adminPrimeiro")
                .value
                .trim();

        const segundo =
            document
                .getElementById("adminSegundo")
                .value
                .trim();

        const sobremesa =
            document
                .getElementById("adminSobremesa")
                .value
                .trim();


        if (
            !tipo ||
            !data ||
            !primeiro ||
            !segundo ||
            !sobremesa
        ) {

            alert(
                "Todos os campos deben estar cubertos."
            );

            return;
        }


        const menus =
            cargarMenusGardados();


        if (!menus[tipo]) {

            menus[tipo] = {};

        }


        menus[tipo][data] = {

            primeiro:
                primeiro,

            segundo:
                segundo,

            sobremesa:
                sobremesa

        };


        gardarMenus(menus);


        /* ----------------------------------------------------
           ACTUALIZAR COLECCIÓN ORIXINAL EN MEMORIA
           ---------------------------------------------------- */

        const orixinal =
            obterColeccionOrixinal(tipo);


        orixinal[data] = {

            primeiro:
                primeiro,

            segundo:
                segundo,

            sobremesa:
                sobremesa

        };


        /* ----------------------------------------------------
           ACTUALIZAR COLECCIÓN DA APLICACIÓN
           ---------------------------------------------------- */

        if (
            typeof coleccions !== "undefined" &&
            coleccions[tipo]
        ) {

            coleccions[tipo][data] = {

                primeiro:
                    primeiro,

                segundo:
                    segundo,

                sobremesa:
                    sobremesa

            };

        }


        alert(
            "Menú gardado correctamente ✔"
        );

    }
);


/* ============================================================
   RESTAURAR MENÚ ORIXINAL
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const botonRestaurar =
        document.getElementById("restaurarMenu");


    if (!botonRestaurar) {
        return;
    }


    botonRestaurar.addEventListener(
        "click",
        () => {

            const adminTipo =
                document.getElementById("adminTipo");

            const adminData =
                document.getElementById("adminData");


            if (!adminTipo || !adminData) {
                return;
            }


            const tipo =
                adminTipo.value;

            const data =
                adminData.value;


            if (!tipo || !data) {

                alert(
                    "Primeiro selecciona o tipo de menú e a data."
                );

                return;
            }


            const orixinal =
                obterColeccionOrixinal(tipo);

            const menuOriginal =
                orixinal[data];


            if (!menuOriginal) {

                alert(
                    "Non existe un menú orixinal para esta data."
                );

                return;
            }


            const menus =
                cargarMenusGardados();


            if (menus[tipo]) {

                delete menus[tipo][data];

            }


            gardarMenus(menus);


            /* ------------------------------------------------
               VOLVER CARGAR O MENÚ ORIXINAL
               ------------------------------------------------ */

            document
                .getElementById("adminPrimeiro")
                .value =
                menuOriginal.primeiro || "";


            document
                .getElementById("adminSegundo")
                .value =
                menuOriginal.segundo || "";


            document
                .getElementById("adminSobremesa")
                .value =
                menuOriginal.sobremesa || "";


            /* ------------------------------------------------
               ACTUALIZAR COLECCIÓN EN MEMORIA
               ------------------------------------------------ */

            if (
                typeof coleccions !== "undefined" &&
                coleccions[tipo]
            ) {

                coleccions[tipo][data] =
                    menuOriginal;

            }


            alert(
                "Menú orixinal restaurado correctamente ✔"
            );

        }
    );

});


/* ============================================================
   APLICAR MODIFICACIÓNS GARDADAS AO INICIAR
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const menus =
        cargarMenusGardados();


    if (!menus) {
        return;
    }


    if (menus.basal) {

        Object.assign(
            MENUS_BASAL,
            menus.basal
        );

    }


    if (menus.sen_lactosa) {

        Object.assign(
            MENUS_SEN_LACTOSA,
            menus.sen_lactosa
        );

    }


    if (menus.sen_glute) {

        Object.assign(
            MENUS_SEN_GLUTE,
            menus.sen_glute
        );

    }


    if (menus.musulman) {

        Object.assign(
            MENUS_MUSULMAN,
            menus.musulman
        );

    }


    if (menus.sen_marisco) {

        Object.assign(
            MENUS_SEN_MARISCO,
            menus.sen_marisco
        );

    }

});


/* ============================================================
   PECHAR PANEL
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const pechar =
        document.getElementById("pecharAdmin");


    if (pechar) {

        pechar.addEventListener(
            "click",
            () => {

                const panel =
                    document.getElementById("adminPanel");


                if (panel) {

                    panel.classList.add("oculto");

                }

            }
        );

    }

});
