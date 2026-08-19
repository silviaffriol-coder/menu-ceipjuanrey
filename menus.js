// -----------------------------
// MENÚ BASAL POR DÍAS REAIS
// -----------------------------

const menuBasalPorDia = {
    "2024-09-09": "Repolo con allada · Polo ao forno con verduras e patacas · Iogur ou froita",
    "2024-09-10": "Sopa de verduras con fideos integrais e garavanzos · Luras á romana con ensalada · Froita",
    "2024-09-11": "Crema de cenoria con pataca · Tortilla de champiñóns e ensalada de espárragos · Froita",
    // 12 NON HAI COMEDOR
    "2024-09-13": "Ensalada Arco da Vella · Arroz con lentellas · Froita",

    "2024-09-16": "Coliflor con allada · Guiso de tenreira con patacas cocidas · Froita",
    "2024-09-17": "Crema de verduras de tempada · Arroz á cubana · Iogur ou froita",
    "2024-09-18": "Ensalada caprese · Potaxe de garavanzos con verduras · Froita",
    "2024-09-19": "Guiso de patacas con verduras · Peituga de polo ao limón con ensalada · Froita",
    "2024-09-20": "Menestra con allada · Pasta integral con bonito e salsa de tomate · Froita",

    "2024-09-23": "Ensalada completa · Raxo de pavo con arroz e pisto · Froita",
    "2024-09-24": "Sopa de polo con fideos integrais · Pescada en salsa verde con patacas · Froita",
    "2024-09-25": "Ensalada de garavanzos · Brócoli con pataca e ovo con allada · Froita",
    "2024-09-26": "Crema de cabaciña · Fideuá de marisco · Froita",
    "2024-09-27": "Salteado de verduras con fabas · Ensaladilla rusa · Iogur ou froita",

    "2024-09-30": "Xudías verdes con patacas · Lombo ao forno con salsa de verduras · Froita",
    "2024-10-01": "Ensalada de tomate, olivas e sardiñas · Tortilla de patacas e cebola con cabaciña · Froita",
    "2024-10-02": "Garavanzos con espinacas · Ensalada de pasta · Iogur ou froita",
    "2024-10-03": "Crema de cabaza · Polo guisado e patacas ao forno con ensalada · Froita",
    "2024-10-04": "Arroz 3 verduras · Salmón á prancha con ensalada con froita de tempada · Froita"
};

// -----------------------------
// MENÚS ESPECIAIS (COMPLETOS)
// -----------------------------

const menusEspeciais = {
    lactosa: {
        titulo: "Menú Sen Lactosa",
        items: [
            "Luns: Verduras ao vapor · Polo á prancha · Froita",
            "Martes: Sopa de verduras · Arroz con cenoria · Froita",
            "Mércores: Peixe ao forno · Tortilla · Froita",
            "Xoves: Pasta integral · Carne guisada · Froita",
            "Venres: Pescada · Arroz con lentellas · Froita"
        ]
    },

    glute: {
        titulo: "Menú Sen Glute",
        items: [
            "Luns: Repolo con allada · Polo ao forno · Froita",
            "Martes: Sopa sen glute · Arroz con cenoria · Froita",
            "Mércores: Peixe á prancha · Tortilla · Froita",
            "Xoves: Pasta sen glute · Carne guisada · Froita",
            "Venres: Pescada · Arroz con lentellas · Froita"
        ]
    },

    musulman: {
        titulo: "Menú Musulmán",
        items: [
            "Luns: Verduras ao vapor · Polo ao forno · Froita",
            "Martes: Sopa de verduras · Arroz con cenoria · Froita",
            "Mércores: Peixe á prancha · Tortilla de verduras · Froita",
            "Xoves: Pasta integral · Carne de vacún · Froita",
            "Venres: Pescada · Arroz con lentellas · Froita"
        ]
    }
};

// -----------------------------
// MOSTRAR MENÚ BASAL DO DÍA
// -----------------------------

function mostrarMenuBasalHoxe() {
    const hoxe = new Date();

    const ano = hoxe.getFullYear();
    const mes = String(hoxe.getMonth() + 1).padStart(2, "0");
    const dia = String(hoxe.getDate()).padStart(2, "0");
    const dataActual = `${ano}-${mes}-${dia}`;

    const diaSemana = hoxe.getDay(); // 0 domingo, 6 sábado

    const titulo = document.getElementById("titulo-menu");
    const box = document.getElementById("menu-box");

    // Fin de semana
    if (diaSemana === 0 || diaSemana === 6) {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = "<p>Fin de semana.</p>";
        return;
    }

    // Festivo 12 de outubro
    if (dataActual === "2024-10-12") {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = "<p>Festivo nacional.</p>";
        return;
    }

    // Antes do 9 de setembro
    if (dataActual < "2024-09-09") {
        titulo.innerText = "O comedor aínda non comezou";
        box.innerHTML = "<p>Inicio o 9 de setembro.</p>";
        return;
    }

    const menu = menuBasalPorDia[dataActual];

    if (!menu) {
        titulo.innerText = "Menú non dispoñible";
        box.innerHTML = "<p>Non hai datos para este día.</p>";
        return;
    }

    titulo.innerText = "Menú Basal de hoxe";
    box.innerHTML = `<p>${menu}</p>`;
}

// -----------------------------
// MOSTRAR MENÚS ESPECIAIS
// -----------------------------

function mostrarMenu(tipo) {
    if (tipo === "basal") {
        mostrarMenuBasalHoxe();
        return;
    }

    const datos = menusEspeciais[tipo];
    const titulo = document.getElementById("titulo-menu");
    const box = document.getElementById("menu-box");

    titulo.innerText = datos.titulo;
    box.innerHTML = datos.items.map(item => `<p>${item}</p>`).join("");

    document.querySelectorAll(".selector").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");
}

// -----------------------------
// INICIO
// -----------------------------

mostrarMenuBasalHoxe();


