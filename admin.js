// O panel admin traballa con estes obxectos que veñen de menus.js
const menusBase = {
    basal: MENUS_BASAL,
    lactosa: MENUS_SEN_LACTOSA,
    glute: MENUS_SEN_GLUTE,
    musulman: MENUS_MUSULMAN,
    marisco: MENUS_SEN_MARISCO
};

// Carga menús: base + cambios gardados
function cargarMenus() {
    const gardado = localStorage.getItem("menusCEIPJuanRey");

    if (gardado) {
        const cambios = JSON.parse(gardado);

        return {
            basal: { ...menusBase.basal, ...(cambios.basal || {}) },
            lactosa: { ...menusBase.lactosa, ...(cambios.lactosa || {}) },
            glute: { ...menusBase.glute, ...(cambios.glute || {}) },
            musulman: { ...menusBase.musulman, ...(cambios.musulman || {}) },
            marisco: { ...menusBase.marisco, ...(cambios.marisco || {}) }
        };
    }

    // Se non hai nada gardado, devolvemos só os base
    return {
        basal: { ...menusBase.basal },
        lactosa: { ...menusBase.lactosa },
        glute: { ...menusBase.glute },
        musulman: { ...menusBase.musulman },
        marisco: { ...menusBase.marisco }
    };
}

// Garda un menú para unha DATA concreta
function gardarMenu() {
    const tipo = document.getElementById("tipo").value;      // basal, lactosa, glute, musulman, marisco
    const dataReal = document.getElementById("dataReal").value; // formato YYYY-MM-DD

    const primeiro = document.getElementById("primeiro").value.trim();
    const segundo = document.getElementById("segundo").value.trim();
    const postre = document.getElementById("postre").value.trim();

    if (!dataReal) {
        document.getElementById("mensaxe").textContent =
            "Debes escoller unha data.";
        return;
    }

    if (!primeiro || !segundo || !postre) {
        document.getElementById("mensaxe").textContent =
            "Todos os campos deben estar cubertos.";
        return;
    }

    // Cargamos o estado actual (base + gardado)
    const menusActuais = cargarMenus();

    // Se non existe o tipo, inicializámolo
    if (!menusActuais[tipo]) menusActuais[tipo] = {};

    // Actualizamos o menú desa data
    menusActuais[tipo][dataReal] = {
        primeiro,
        segundo,
        sobremesa: postre
    };

    // Gardamos só os cambios no localStorage
    const gardadoBruto = localStorage.getItem("menusCEIPJuanRey");
    const cambios = gardadoBruto ? JSON.parse(gardadoBruto) : {};

    if (!cambios[tipo]) cambios[tipo] = {};
    cambios[tipo][dataReal] = {
        primeiro,
        segundo,
        sobremesa: postre
    };

    localStorage.setItem("menusCEIPJuanRey", JSON.stringify(cambios));

    document.getElementById("mensaxe").textContent =
        "Menú gardado correctamente ✔";

    document.getElementById("primeiro").value = "";
    document.getElementById("segundo").value = "";
    document.getElementById("postre").value = "";
}

// Cando carga a páxina, non tocamos nada máis
document.addEventListener("DOMContentLoaded", () => {});
