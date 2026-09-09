// Carga os menús base + cambios gardados polo panel admin
function obterMenus() {
    if (typeof cargarMenus === "function") {
        return cargarMenus(); // admin.js
    }
    return {
        basal: MENUS_BASAL,
        lactosa: MENUS_SEN_LACTOSA,
        glute: MENUS_SEN_GLUTE,
        musulman: MENUS_MUSULMAN,
        marisco: MENUS_SEN_MARISCO
    };
}

// Devolve o tipo de menú seleccionado polo usuario
function tipoSeleccionado() {
    return localStorage.getItem("tipoMenuSeleccionado") || "basal";
}

// Garda o tipo de menú seleccionado
function seleccionarTipo(tipo) {
    localStorage.setItem("tipoMenuSeleccionado", tipo);
    mostrarMenu();
}

// Mostra o menú correspondente á data actual
function mostrarMenu() {
    const menus = obterMenus();
    const tipo = tipoSeleccionado();

    const hoxe = new Date();
    const ano = hoxe.getFullYear();
    const mes = String(hoxe.getMonth() + 1).padStart(2, "0");
    const dia = String(hoxe.getDate()).padStart(2, "0");

    const claveData = `${ano}-${mes}-${dia}`;

    const menuTipo = menus[tipo];

    if (!menuTipo || !menuTipo[claveData]) {
        document.getElementById("primeiro").textContent = "Sen datos";
        document.getElementById("segundo").textContent = "Sen datos";
        document.getElementById("postre").textContent = "Sen datos";
        return;
    }

    const menu = menuTipo[claveData];

    document.getElementById("primeiro").textContent = menu.primeiro;
    document.getElementById("segundo").textContent = menu.segundo;
    document.getElementById("postre").textContent = menu.sobremesa;
}

// Cargar ao iniciar
document.addEventListener("DOMContentLoaded", () => {
    mostrarMenu();
});
