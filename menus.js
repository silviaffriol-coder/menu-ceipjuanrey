const menus = {
  basal: {
    titulo: "Menú Basal",
    items: [
      "Luns: Repolo con allada, Polo ao forno, Iogur",
      "Martes: Sopa de verduras, Crema de cenoria, Froita",
      "Mércores: Luras á romana, Tortilla de champiñóns, Froita",
      "Xoves: Pasta integral con salsa suave, Froita",
      "Venres: Pescada Arco da Vella, Arroz con lentellas, Froita"
    ]
  },

  lactosa: {
    titulo: "Menú Sen Lactosa",
    items: [
      "Luns: Verduras ao vapor, Polo á prancha, Froita",
      "Martes: Sopa de verduras, Arroz con cenoria, Froita",
      "Mércores: Peixe ao forno, Tortilla, Froita",
      "Xoves: Pasta integral, Carne guisada, Froita",
      "Venres: Pescada, Arroz con lentellas, Froita"
    ]
  },

  glute: {
    titulo: "Menú Sen Glute",
    items: [
      "Luns: Repolo con allada, Polo ao forno, Froita",
      "Martes: Sopa sen glute, Arroz con cenoria, Froita",
      "Mércores: Peixe á prancha, Tortilla, Froita",
      "Xoves: Pasta sen glute, Carne guisada, Froita",
      "Venres: Pescada, Arroz con lentellas, Froita"
    ]
  },

  musulman: {
    titulo: "Menú Musulmán",
    items: [
      "Luns: Verduras ao vapor, Polo ao forno, Froita",
      "Martes: Sopa de verduras, Arroz con cenoria, Froita",
      "Mércores: Peixe á prancha, Tortilla de verduras, Froita",
      "Xoves: Pasta integral, Carne de vacún, Froita",
      "Venres: Pescada, Arroz con lentellas, Froita"
    ]
  }
};

function mostrarMenu(tipo) {
  document.getElementById("titulo-menu").innerText = menus[tipo].titulo;

  const box = document.getElementById("menu-box");
  box.innerHTML = menus[tipo].items.map(item => `<p>${item}</p>`).join("");

  document.querySelectorAll(".selector").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

mostrarMenu("basal");

