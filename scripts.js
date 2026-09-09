// TRIPLE TAP NO SELLO
let taps = 0;
let timeout;

document.getElementById("selo").addEventListener("click", () => {
    taps++;
    clearTimeout(timeout);

    timeout = setTimeout(() => { taps = 0; }, 500);

    if (taps === 3) {
        document.getElementById("panelAdmin").classList.remove("panel-oculto");
        document.getElementById("panelAdmin").classList.add("panel-visible");
        taps = 0;
    }
});

// PECHAR PANEL
document.getElementById("pecharAdmin").addEventListener("click", () => {
    document.getElementById("panelAdmin").classList.remove("panel-visible");
    document.getElementById("panelAdmin").classList.add("panel-oculto");
});

// CARGAR MENÚ DO DÍA
function mostrarMenu() {
    const menus = obterMenus();
    const tipo = localStorage.getItem("tipoMenuSeleccionado") || "basal";

    const hoxe = new Date();
    const ano = hoxe.getFullYear();
    const mes = String(hoxe.getMonth() + 1).padStart(2, "0");
    const dia = String(hoxe.getDate()).padStart(2, "0");
    const claveData = `${ano}-${mes}-${dia}`;

    const menu = menus[tipo][claveData];

    if (!menu) {
        document.getElementById("primeiroPrato").textContent = "Sen menú rexistrado";
        document.getElementById("segundoPrato").textContent = "—";
        document.getElementById("sobremesaPrato").textContent = "—";
        return;
    }

    document.getElementById("primeiroPrato").textContent = menu.primeiro;
    document.getElementById("segundoPrato").textContent = menu.segundo;
    document.getElementById("sobremesaPrato").textContent = menu.sobremesa;
}

document.addEventListener("DOMContentLoaded", mostrarMenu);
