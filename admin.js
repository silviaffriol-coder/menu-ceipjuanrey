/* ============================================================
   PANEL DE ADMINISTRACIÓN – CEIP JUAN REY
   Gardar menús por data real en cada colección
   ============================================================ */

/* Cargar menús gardados desde localStorage */
function cargarMenusGardados() {
    const gardado = localStorage.getItem("menusCEIPJuanRey");
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

/* Gardar menús en localStorage */
function gardarMenus(menus) {
    localStorage.setItem("menusCEIPJuanRey", JSON.stringify(menus));
}

/* ============================================================
   CARGAR MENÚ NO PANEL ADMIN AO SELECCIONAR DATA
   ============================================================ */

document.getElementById("adminData").addEventListener("change", () => {
    const data = document.getElementById("adminData").value;
    if (!data) return;

    const menus = cargarMenusGardados();
    const tipo = tipoActual; // o tipo actual seleccionado cos botóns

    const menu = menus[tipo][data];

    document.getElementById("adminPrimeiro").value = menu?.primeiro || "";
    document.getElementById("adminSegundo").value = menu?.segundo || "";
    document.getElementById("adminSobremesa").value = menu?.sobremesa || "";
});

/* ============================================================
   GARDAR MENÚ EDITADO
   ============================================================ */

document.getElementById("gardarMenu").addEventListener("click", () => {

    const data = document.getElementById("adminData").value;
    const primeiro = document.getElementById("adminPrimeiro").value.trim();
    const segundo = document.getElementById("adminSegundo").value.trim();
    const sobremesa = document.getElementById("adminSobremesa").value.trim();

    if (!data || !primeiro || !segundo || !sobremesa) {
        alert("Todos os campos deben estar cubertos.");
        return;
    }

    const menus = cargarMenusGardados();
    const tipo = tipoActual;

    // Crear o menú se non existe
    menus[tipo][data] = {
        primeiro: primeiro,
        segundo: segundo,
        sobremesa: sobremesa
    };

    // Gardar en localStorage
    gardarMenus(menus);

    alert("Menú gardado correctamente ✔");

    // Limpar campos
    document.getElementById("adminPrimeiro").value = "";
    document.getElementById("adminSegundo").value = "";
    document.getElementById("adminSobremesa").value = "";
});

/* ============================================================
   CARGAR MENÚS GARDADOS AO INICIAR
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    const gardado = localStorage.getItem("menusCEIPJuanRey");
    if (gardado) {
        const menusGardados = JSON.parse(gardado);

        // Substituír os menús base polos gardados
        Object.assign(MENUS_BASAL, menusGardados.basal);
        Object.assign(MENUS_SEN_LACTOSA, menusGardados.sen_lactosa);
        Object.assign(MENUS_SEN_GLUTE, menusGardados.sen_glute);
        Object.assign(MENUS_MUSULMAN, menusGardados.musulman);
        Object.assign(MENUS_SEN_MARISCO, menusGardados.sen_marisco);
    }
});
