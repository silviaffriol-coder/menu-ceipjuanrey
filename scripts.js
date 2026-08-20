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

        // sincronizar selector co tipo actual
        document.getElementById("tipoAdmin").value = tipoActual;

        taps = 0;
    }
});

// PECHAR PANEL
document.getElementById("pecharAdmin").addEventListener("click", () => {
    document.getElementById("panelAdmin").classList.remove("panel-visible");
    document.getElementById("panelAdmin").classList.add("panel-oculto");
});

// TIPO ACTUAL DE MENÚ
let tipoActual = "basal";

// Coleccións
const coleccions = {
    basal: MENUS_BASAL,
    glute: MENUS_SEN_GLUTE,
    musulman: MENUS_MUSULMAN,
    lactosa: MENUS_SEN_LACTOSA,
    marisco: MENUS_SEN_MARISCO
};

// CARGAR MENÚ EXISTENTE AO SELECCIONAR DATA NO PANEL ADMIN
document.getElementById("dataSelect").addEventListener("change", () => {
    cargarMenuAdmin();
});

// Cando se cambia o tipo dentro do panel admin
document.getElementById("tipoAdmin").addEventListener("change", () => {
    tipoActual = document.getElementById("tipoAdmin").value;
    cargarMenuAdmin();
});

// Función que carga o menú no panel admin
function cargarMenuAdmin() {
    const data = document.getElementById("dataSelect").value;
    if (!data) return;

    const coleccion = coleccions[tipoActual];
    const menu = coleccion[data];

    if (menu) {
        document.getElementById("primeiroInput").value = menu.primeiro;
        document.getElementById("segundoInput").value = menu.segundo;
        document.getElementById("sobremesaInput").value = menu.sobremesa;
    } else {
        document.getElementById("primeiroInput").value = "";
        document.getElementById("segundoInput").value = "";
        document.getElementById("sobremesaInput").value = "";
    }
}

// GARDAR MENÚ
document.getElementById("gardarBtn").addEventListener("click", () => {
    const data = document.getElementById("dataSelect").value;
    const primeiro = document.getElementById("primeiroInput").value;
    const segundo = document.getElementById("segundoInput").value;
    const sobremesa = document.getElementById("sobremesaInput").value;

    if (!data) {
        alert("Escolle unha data.");
        return;
    }

    const coleccion = coleccions[tipoActual];

    coleccion[data] = {
        primeiro,
        segundo,
        sobremesa
    };

    alert("Menú gardado!");
});

// ⭐ MOSTRAR MENÚ DO DÍA ACTUAL AO SELECCIONAR TIPO
function mostrarTipo(tipo) {
    tipoActual = tipo;

    const coleccion = coleccions[tipo];

    const hoxe = new Date();
    const ano = hoxe.getFullYear();
    const mes = String(hoxe.getMonth() + 1).padStart(2, "0");
    const dia = String(hoxe.getDate()).padStart(2, "0");
    const dataHoxe = `${ano}-${mes}-${dia}`;

    const menu = coleccion[dataHoxe];

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
