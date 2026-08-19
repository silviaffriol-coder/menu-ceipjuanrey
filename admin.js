function cargarMenus() {
    const gardado = localStorage.getItem("menusCEIPJuanRey");
    if (gardado) {
        return JSON.parse(gardado);
    } else {
        return menus;
    }
}

function gardarMenu() {
    const dia = document.getElementById("dia").value;
    const tipo = document.getElementById("tipo").value;

    const primeiro = document.getElementById("primeiro").value.trim();
    const segundo = document.getElementById("segundo").value.trim();
    const postre = document.getElementById("postre").value.trim();

    if (!primeiro || !segundo || !postre) {
        document.getElementById("mensaxe").textContent =
            "Todos os campos deben estar cubertos.";
        return;
    }

    const menusActuais = cargarMenus();

    menusActuais[tipo][dia] = [primeiro, segundo, postre];

    localStorage.setItem("menusCEIPJuanRey", JSON.stringify(menusActuais));

    document.getElementById("mensaxe").textContent =
        "Menú gardado correctamente ✔";

    document.getElementById("primeiro").value = "";
    document.getElementById("segundo").value = "";
    document.getElementById("postre").value = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const gardado = localStorage.getItem("menusCEIPJuanRey");
    if (gardado) {
        const menusGardados = JSON.parse(gardado);
        Object.assign(menus, menusGardados);
    }
});
