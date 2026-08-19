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

    MENUS_BASAL[data] = {
        primeiro,
        segundo,
        sobremesa
    };

    alert("Menú gardado!");
});

// MOSTRAR MENÚ DOS BOTÓNS (sempre o día actual)
function mostrarTipo(tipo) {
    const coleccion = {
        basal: MENUS_BASAL,
        glute: MENUS_SEN_GLUTE,
        musulman: MENUS_MUSULMAN
    }[tipo];

    const hoxe = new Date();
    const ano = hoxe.getFullYear();
    const mes = String(hoxe.getMonth() + 1).padStart(2, "0");
    const dia = String(hoxe.getDate()).padStart(2, "0");
    const dataHoxe = `${ano}-${mes}-${dia}`;

    const menu = coleccion[dataHoxe];

    if (!menu) {
        document.getElementById("contido").textContent =
            "Sen menú rexistrado para hoxe.";
        return;
    }

    document.getElementById("contido").innerHTML = `
        <p><strong>Primeiro:</strong> ${menu.primeiro}</p>
        <p><strong>Segundo:</strong> ${menu.segundo}</p>
        <p><strong>Sobremesa:</strong> ${menu.sobremesa}</p>
    `;
}
