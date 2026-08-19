// -------------------------------------------
// MENÚ BASAL POR MESES E DÍAS (CURSO COMPLETO)
// -------------------------------------------

const menusBasal = {
    // ---------------- SEPTEMBRO ----------------
    "2024-09": {
        "09": "Repolo con allada · Polo ao forno con verduras e patacas · Iogur ou froita",
        "10": "Sopa de verduras con fideos integrais e garavanzos · Luras á romana · Froita",
        "11": "Crema de cenoria con pataca · Tortilla de champiñóns · Froita",
        "13": "Ensalada Arco da Vella · Arroz con lentellas · Froita",

        "16": "Coliflor con allada · Guiso de tenreira · Froita",
        "17": "Crema de verduras · Arroz á cubana · Iogur ou froita",
        "18": "Ensalada caprese · Potaxe de garavanzos · Froita",
        "19": "Guiso de patacas · Peituga de polo ao limón · Froita",
        "20": "Menestra · Pasta integral con bonito · Froita",

        "23": "Ensalada completa · Raxo de pavo con arroz · Froita",
        "24": "Sopa de polo · Pescada en salsa verde · Froita",
        "25": "Ensalada de garavanzos · Brócoli con pataca e ovo · Froita",
        "26": "Crema de cabaciña · Fideuá de marisco · Froita",
        "27": "Salteado de verduras · Ensaladilla rusa · Iogur ou froita",

        "30": "Xudías verdes · Lombo ao forno · Froita"
    },

    // ---------------- OUTUBRO ----------------
    "2024-10": {
        "01": "Ensalada de tomate, olivas e sardiñas · Tortilla de patacas · Froita",
        "02": "Garavanzos con espinacas · Ensalada de pasta · Iogur ou froita",
        "03": "Crema de cabaza · Polo guisado · Froita",
        "04": "Arroz 3 verduras · Salmón á prancha · Froita"
        // 12 festivo → NON HAI COMEDOR
    },

    // ---------------- NOVEMBRO ----------------
    "2024-11": {
        // Engadir aquí cando teñas o PDF
    },

    // ---------------- DECEMBRO ----------------
    "2024-12": {},

    // ---------------- XANEIRO ----------------
    "2025-01": {},

    // ---------------- FEBREIRO ----------------
    "2025-02": {},

    // ---------------- MARZO ----------------
    "2025-03": {},

    // ---------------- ABRIL ----------------
    "2025-04": {},

    // ---------------- MAIO ----------------
    "2025-05": {},

    // ---------------- XUÑO ----------------
    "2025-06": {}
};


// -------------------------------------------
// MENÚS ESPECIAIS (COMPLETOS)
// -------------------------------------------

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


// -------------------------------------------
// FESTIVOS OFICIAIS + VACACIÓNS + FIN DE CURSO
// -------------------------------------------

// Festivos nacionais + autonómicos
const festivos = [
    "2024-10-12", // Hispanidade
    "2024-11-01", // Todos os Santos
    "2024-12-06", // Constitución
    "2024-12-08", // Inmaculada
    "2024-12-07", // Día do Ensino
    "2025-01-01", // Aninovo
    "2025-01-06", // Reis
    "2025-05-01", // Día do Traballo
    "2025-05-17", // Letras Galegas
];

// Vacacións de Nadal
const vacacionsNadal = {
    inicio: "2024-12-22",
    fin: "2025-01-07"
};

// Entroido
const entroido = [
    "2025-02-08",
    "2025-02-09",
    "2025-02-10"
];

// Semana Santa
const vacacionsSemanaSanta = {
    inicio: "2025-03-22",
    fin: "2025-03-29"
};

// Fin de curso
const finCurso = "2025-06-21";


// -------------------------------------------
// MOSTRAR MENÚ BASAL DO DÍA AUTOMÁTICO
// -------------------------------------------

function mostrarMenuBasalHoxe() {
    const hoxe = new Date();

    const ano = hoxe.getFullYear();
    const mes = String(hoxe.getMonth() + 1).padStart(2, "0");
    const dia = String(hoxe.getDate()).padStart(2, "0");

    const claveMes = `${ano}-${mes}`;
    const claveDia = `${ano}-${mes}-${dia}`;

    const titulo = document.getElementById("titulo-menu");
    const box = document.getElementById("menu-box");

    // Crear data real en texto
    const diasSemana = ["Domingo","Luns","Martes","Mércores","Xoves","Venres","Sábado"];
    const mesesTexto = ["xaneiro","febreiro","marzo","abril","maio","xuño","xullo","agosto","setembro","outubro","novembro","decembro"];
    const textoData = `${diasSemana[hoxe.getDay()]}, ${dia} de ${mesesTexto[hoxe.getMonth()]}`;

    // Fin de semana
    if (hoxe.getDay() === 0 || hoxe.getDay() === 6) {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = `<p>${textoData}</p><p>Fin de semana.</p>`;
        return;
    }

    // Festivos nacionais/autonómicos
    if (festivos.includes(claveDia)) {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = `<p>${textoData}</p><p>Festivo oficial.</p>`;
        return;
    }

    // Entroido
    if (entroido.includes(claveDia)) {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = `<p>${textoData}</p><p>Entroido.</p>`;
        return;
    }

    // Vacacións de Nadal
    if (claveDia >= vacacionsNadal.inicio && claveDia <= vacacionsNadal.fin) {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = `<p>${textoData}</p><p>Vacacións de Nadal.</p>`;
        return;
    }

    // Semana Santa
    if (claveDia >= vacacionsSemanaSanta.inicio && claveDia <= vacacionsSemanaSanta.fin) {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = `<p>${textoData}</p><p>Vacacións de Semana Santa.</p>`;
        return;
    }

    // Fin de curso
    if (claveDia > finCurso) {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = `<p>${textoData}</p><p>Fin de curso.</p>`;
        return;
    }

    // Antes do 9 de setembro
    if (claveMes === "2024-09" && dia < "09") {
        titulo.innerText = "O comedor aínda non comezou";
        box.innerHTML = `<p>${textoData}</p><p>Inicio o 9 de setembro.</p>`;
        return;
    }

    // Mes sen menú cargado (ex: agosto)
    if (!menusBasal[claveMes]) {
        titulo.innerText = "Hoxe non hai comedor";
        box.innerHTML = `<p>${textoData}</p><p>Non hai comedor este mes.</p>`;
        return;
    }

    const menuMes = menusBasal[claveMes];
    const menuDia = menuMes[dia];

    if (!menuDia) {
        titulo.innerText = "Menú non dispoñible";
        box.innerHTML = `<p>${textoData}</p><p>Non hai datos para este día.</p>`;
        return;
    }

    // Día lectivo con menú
    titulo.innerText = "Menú Basal de hoxe";
    box.innerHTML = `<p>${textoData}</p><p>${menuDia}</p>`;
}


// -------------------------------------------
// MOSTRAR MENÚS ESPECIAIS
// -------------------------------------------

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


// -------------------------------------------
// INICIO AUTOMÁTICO
// -------------------------------------------

mostrarMenuBasalHoxe();
