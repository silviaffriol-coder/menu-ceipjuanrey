/* ============================================================
   PANEL DE ADMINISTRACIÓN – CEIP JUAN REY
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
   CARGAR UN MENÚ NO PANEL
   ============================================================ */

document.getElementById("adminData").addEventListener("change", () => {

    const data =
        document.getElementById("adminData").value;

    if (!data) return;

    const tipo = tipoActual;

    const orixinal =
        obterColeccionOrixinal(tipo);

    const gardados =
        cargarMenusGardados();

    const modificacion =
        gardados[tipo]?.[data];

    const menu =
        modificacion || orixinal[data] || {};

    document.getElementById("adminPrimeiro").value =
        menu.primeiro || "";

    document.getElementById("adminSegundo").value =
        menu.segundo || "";

    document.getElementById("adminSobremesa").value =
        menu.sobremesa || "";

});


/* ============================================================
   GARDAR MENÚ EDITADO
   ============================================================ */

document.getElementById("gardarMenu").addEventListener("click", () => {

    const data =
        document.getElementById("adminData").value;

    const primeiro =
        document.getElementById("adminPrimeiro").value.trim();

    const segundo =
        document.getElementById("adminSegundo").value.trim();

    const sobremesa =
        document.getElementById("adminSobremesa").value.trim();


    if (!data || !primeiro || !segundo || !sobremesa) {

        alert("Todos os campos deben estar cubertos.");

        return;
    }


    const menus =
        cargarMenusGardados();

    const tipo =
        tipoActual;


    if (!menus[tipo]) {
        menus[tipo] = {};
    }


    menus[tipo][data] = {

        primeiro: primeiro,

        segundo: segundo,

        sobremesa: sobremesa

    };


    gardarMenus(menus);


    /*
       Actualizamos o menú que está na pantalla.
    */

    if (typeof coleccions !== "undefined") {

        coleccions[tipo][data] = {

            primeiro: primeiro,

            segundo: segundo,

            sobremesa: sobremesa

        };

    }


    mostrarMenuHoxe();


    alert("Menú gardado correctamente ✔");

});


/* ============================================================
   RESTAURAR MENÚ ORIXINAL
   ============================================================ */

const botonRestaurar =
    document.getElementById("restaurarMenu");


if (botonRestaurar) {

    botonRestaurar.addEventListener("click", () => {

        const data =
            document.getElementById("adminData").value;

        if (!data) {

            alert("Primeiro selecciona unha data.");

            return;
        }


        const tipo =
            tipoActual;

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


        /*
           Eliminamos a modificación gardada.
        */

        const menus =
            cargarMenusGardados();

        if (menus[tipo]) {

            delete menus[tipo][data];

        }


        gardarMenus(menus);


        /*
           Poñemos novamente o menú orixinal.
        */

        document.getElementById("adminPrimeiro").value =
            menuOriginal.primeiro || "";

        document.getElementById("adminSegundo").value =
            menuOriginal.segundo || "";

        document.getElementById("adminSobremesa").value =
            menuOriginal.sobremesa || "";


        if (typeof coleccions !== "undefined") {

            coleccions[tipo][data] = menuOriginal;

        }


        mostrarMenuHoxe();


        alert(
            "Menú orixinal restaurado correctamente ✔"
        );

    });

}


/* ============================================================
   APLICAR MODIFICACIÓNS AO INICIAR
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const menus =
        cargarMenusGardados();


    if (!menus) return;


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

        pechar.addEventListener("click", () => {

            const panel =
                document.getElementById("adminPanel");


            if (panel) {

                panel.classList.add("oculto");

            }

        });

    }

});
