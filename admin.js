/* ============================================================
PANEL DE ADMINISTRACIÓN – CEIP JUAN REY
============================================================ */

/*
Gardamos as modificacións nunha nova memoria.
Así ignoramos os datos antigos que quedaron gardados
no navegador e conservamos os menús orixinais.
*/
const CHAVE_MENUS = "menusCEIPJuanRey_v2";

/* ============================================================
CARGAR MENÚS
============================================================ */

function cargarMenusGardados() {

const gardado = localStorage.getItem(CHAVE_MENUS);

if (gardado) {
    return JSON.parse(gardado);
}

return {
    basal: MENUS_BASAL,
    sen_lactosa: MENUS_SEN_LACTOSA,
    sen_glute: MENUS_SEN_GLUTE,
    musulman: MENUS_MUSULMAN,
    sen_marisco: MENUS_SEN_MARISCO
};

}

/* ============================================================
GARDAR MENÚS
============================================================ */

function gardarMenus(menus) {

localStorage.setItem(
    CHAVE_MENUS,
    JSON.stringify(menus)
);

}

/* ============================================================
CARGAR MENÚ AO ESCOLLER DATA
============================================================ */

document.getElementById("adminData").addEventListener("change", () => {

const data =
    document.getElementById("adminData").value;

if (!data) return;

const menus = cargarMenusGardados();

const tipo = tipoActual;

const menu =
    menus[tipo]?.[data] || {};

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


const menus = cargarMenusGardados();

const tipo = tipoActual;


menus[tipo][data] = {

    primeiro: primeiro,

    segundo: segundo,

    sobremesa: sobremesa

};


gardarMenus(menus);


/*
   Actualizamos tamén o menú que se está mostrando
   neste momento.
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
BOTÓN RESTAURAR MENÚ ORIXINAL
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


    const tipo = tipoActual;


    let menuOriginal = null;


    if (tipo === "basal") {

        menuOriginal = MENUS_BASAL[data];

    } else if (tipo === "sen_lactosa") {

        menuOriginal = MENUS_SEN_LACTOSA[data];

    } else if (tipo === "sen_glute") {

        menuOriginal = MENUS_SEN_GLUTE[data];

    } else if (tipo === "musulman") {

        menuOriginal = MENUS_MUSULMAN[data];

    } else if (tipo === "sen_marisco") {

        menuOriginal = MENUS_SEN_MARISCO[data];

    }


    if (!menuOriginal) {

        alert(
            "Non existe un menú orixinal para esta data."
        );

        return;
    }


    /*
       Poñemos novamente os datos orixinais
       nos campos do panel.
    */

    document.getElementById("adminPrimeiro").value =
        menuOriginal.primeiro || "";

    document.getElementById("adminSegundo").value =
        menuOriginal.segundo || "";

    document.getElementById("adminSobremesa").value =
        menuOriginal.sobremesa || "";


    /*
       Eliminamos a modificación gardada
       para esa data.
    */

    const menus = cargarMenusGardados();

    if (menus[tipo]) {

        delete menus[tipo][data];

    }


    gardarMenus(menus);


    /*
       Volvemos ao menú orixinal na aplicación.
    */

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
