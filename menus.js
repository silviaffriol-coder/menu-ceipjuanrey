/* ---------------------------------------------------
   MENÚS DO COMEDOR – CEIP JUAN REY
   Curso 2026–2027
--------------------------------------------------- */

const menus = {
    basal: {
        luns: ["Repolo con allada", "Polo ao forno", "Iogur"],
        martes: ["Sopa de verduras", "Peixe á prancha", "Froita"],
        mércores: ["Luras á romana", "Tortilla de champiñóns", "Froita"],
        xoves: ["Pasta integral", "Carne guisada", "Froita"],
        venres: ["Pescada Arco da Vella", "Arroz con lentellas", "Froita"]
    },

    lactosa: {
        luns: ["Repolo con allada", "Polo ao forno", "Froita"],
        martes: ["Sopa de verduras", "Peixe á prancha", "Froita"],
        mércores: ["Luras á romana", "Tortilla de champiñóns", "Froita"],
        xoves: ["Pasta integral", "Carne guisada", "Froita"],
        venres: ["Pescada Arco da Vella", "Arroz con lentellas", "Froita"]
    },

    glute: {
        luns: ["Repolo con allada", "Polo ao forno", "Iogur sen glute"],
        martes: ["Sopa de verduras", "Peixe á prancha", "Froita"],
        mércores: ["Luras á prancha", "Tortilla de champiñóns", "Froita"],
        xoves: ["Pasta sen glute", "Carne guisada", "Froita"],
        venres: ["Pescada Arco da Vella", "Arroz con lentellas", "Froita"]
    },

    musulman: {
        luns: ["Repolo con allada", "Polo ao forno", "Froita"],
        martes: ["Sopa de verduras", "Peixe á prancha", "Froita"],
        mércores: ["Luras á prancha", "Tortilla de champiñóns", "Froita"],
        xoves: ["Pasta integral", "Carne guisada", "Froita"],
        venres: ["Pescada Arco da Vella", "Arroz con lentellas", "Froita"]
    }
};

/* ---------------------------------------------------
   DETECTAR DÍA REAL
--------------------------------------------------- */

function obterDia() {
    const dias = ["domingo", "luns", "martes", "mércores", "xoves", "venres", "sábado"];
    const hoxe = new Date().getDay();
    return dias[hoxe];
}

/* ---------------------------------------------------
   MOSTRAR MENÚ SEGUNDO O TIPO
--------------------------------------------------- */

function mostrarMenu(tipo) {
    const dia = obterDia();

    const titulo = document.getElementById("titulo-menu");
    const caixa = document.getElementById("menu-box");

    if (dia === "sábado" || dia === "domingo") {
        titulo.textContent = "Hoxe non hai comedor";
        caixa.innerHTML = "<p>O comedor funciona de luns a venres.</p>";
        return;
    }

    titulo.textContent = `Menú ${tipo.charAt(0).toUpperCase() + tipo.slice(1)} de hoxe`;

    const menuDia = menus[tipo][dia];

    caixa.innerHTML = `
        <p><strong>Primeiro:</strong> ${menuDia[0]}</p>
        <p><strong>Segundo:</strong> ${menuDia[1]}</p>
        <p><strong>Postre:</strong> ${menuDia[2]}</p>
    `;
}

/* ---------------------------------------------------
   CARGA INICIAL
--------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    mostrarMenu("basal");
});
