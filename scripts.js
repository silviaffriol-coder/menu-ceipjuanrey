// Mostrar menú do día actual
function cargarMenu() {
    const hoxe = new Date();
    const ano = hoxe.getFullYear();
    const mes = String(hoxe.getMonth() + 1).padStart(2, "0");
    const dia = String(hoxe.getDate()).padStart(2, "0");

    const clave = `menu_${ano}-${mes}-${dia}`;

    document.getElementById("diaTitulo").textContent = `${dia}/${mes}/${ano}`;

    const datos = JSON.parse(localStorage.getItem(clave));

    if (datos) {
        document.getElementById("primeiroMostrado").textContent = datos.primeiro;
        document.getElementById("segundoMostrado").textContent = datos.segundo;
        document.getElementById("sobremesaMostrado").textContent = datos.sobremesa;
    } else {
        document.getElementById("primeiroMostrado").textContent = "—";
        document.getElementById("segundoMostrado").textContent = "—";
        document.getElementById("sobremesaMostrado").textContent = "—";
    }
}

cargarMenu();


// Triple tap no selo para abrir panel admin
let taps = 0;
let lastTapTime = 0;

const selo = document.getElementById("selo");
const panel = document.getElementById("panelAdmin");

selo.addEventListener("click", () => {
    const now = Date.now();

    if (now - lastTapTime < 500) {
        taps++;
    } else {
        taps = 1;
    }

    lastTapTime = now;

    if (taps === 3) {
        panel.classList.remove("panel-oculto");
        panel.classList.add("panel-visible");
    }
});

// Pechar panel
document.getElementById("pecharAdmin").addEventListener("click", () => {
    panel.classList.remove("panel-visible");
    panel.classList.add("panel-oculto");
});

// Cargar menú da data seleccionada
document.getElementById("dataSelect").addEventListener("change", () => {
    const data = document.getElementById("dataSelect").value;

    if (!data) return;

    const datos = JSON.parse(localStorage.getItem(`menu_${data}`));

    if (datos) {
        document.getElementById("primeiroInput").value = datos.primeiro;
        document.getElementById("segundoInput").value = datos.segundo;
        document.getElementById("sobremesaInput").value = datos.sobremesa;
    } else {
        document.getElementById("primeiroInput").value = "";
        document.getElementById("segundoInput").value = "";
        document.getElementById("sobremesaInput").value = "";
    }
});

// Gardar menú dunha data concreta
document.getElementById("gardarBtn").addEventListener("click", () => {
    const data = document.getElementById("dataSelect").value;

    if (!data) {
        alert("Escolle unha data.");
        return;
    }

    const primeiro = document.getElementById("primeiroInput").value;
    const segundo = document.getElementById("segundoInput").value;
    const sobremesa = document.getElementById("sobremesaInput").value;

    const menu = { primeiro, segundo, sobremesa };

    localStorage.setItem(`menu_${data}`, JSON.stringify(menu));

    alert("Menú gardado!");
});
