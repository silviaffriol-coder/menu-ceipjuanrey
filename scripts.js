
function detectarDia() {
    const hoxe = new Date();
    const dias = ["domingo","luns","martes","mércores","xoves","venres","sábado"];
    return dias[hoxe.getDay()];
}

function detectarMes() {
    const hoxe = new Date();
    const mesNumero = hoxe.getMonth(); // 8=setembro, 9=outubro
    if (mesNumero === 8) return "setembro";
    if (mesNumero === 9) return "outubro";
    return "setembro";
}

function mostrar(tipo) {
    const dia = detectarDia();
    const mes = detectarMes();

    if (dia === "sábado" || dia === "domingo") {
        document.getElementById("contido").innerHTML =
            "<h2>Hoxe non hai comedor</h2>";
        return;
    }

    const menu = menus[tipo][mes][dia];
    document.getElementById("contido").innerHTML = `
        <h2>${tipo.toUpperCase()} – ${dia.toUpperCase()}</h2>
        <p>${menu}</p>
    `;
}

mostrar("basal");
