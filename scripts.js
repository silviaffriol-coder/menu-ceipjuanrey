const menus = {
    basal: `
        <h3>Menú basal semanal</h3>
        <table>
            <tr><th>Luns</th><td>Sopa / Polbo / Froita</td></tr>
            <tr><th>Martes</th><td>Macarróns / Tortilla / Iogur</td></tr>
            <tr><th>Mércores</th><td>Crema / Pescada / Froita</td></tr>
            <tr><th>Xoves</th><td>Arroz / Polo / Froita</td></tr>
            <tr><th>Venres</th><td>Verduras / Pizza / Iogur</td></tr>
        </table>
    `,

    lactosa: `
        <h3>Menú sen lactosa</h3>
        <table>
            <tr><th>Luns</th><td>Sopa / Polbo / Froita</td></tr>
            <tr><th>Martes</th><td>Macarróns / Tortilla / Froita</td></tr>
            <tr><th>Mércores</th><td>Crema / Pescada / Froita</td></tr>
            <tr><th>Xoves</th><td>Arroz / Polo / Froita</td></tr>
            <tr><th>Venres</th><td>Verduras / Pizza sen lactosa / Froita</td></tr>
        </table>
    `,

    glute: `
        <h3>Menú sen glute</h3>
        <table>
            <tr><th>Luns</th><td>Sopa / Polbo / Froita</td></tr>
            <tr><th>Martes</th><td>Pasta sen glute / Tortilla / Iogur</td></tr>
            <tr><th>Mércores</th><td>Crema / Pescada / Froita</td></tr>
            <tr><th>Xoves</th><td>Arroz / Polo / Froita</td></tr>
            <tr><th>Venres</th><td>Verduras / Pizza sen glute / Iogur</td></tr>
        </table>
    `,

    musulman: `
        <h3>Menú musulmán</h3>
        <table>
            <tr><th>Luns</th><td>Sopa / Peixe / Froita</td></tr>
            <tr><th>Martes</th><td>Macarróns / Tortilla / Iogur</td></tr>
            <tr><th>Mércores</th><td>Crema / Pescada / Froita</td></tr>
            <tr><th>Xoves</th><td>Arroz / Peixe / Froita</td></tr>
            <tr><th>Venres</th><td>Verduras / Pizza vexetariana / Froita</td></tr>
        </table>
    `
};

function mostrar(tipo) {
    document.getElementById("contido").innerHTML = menus[tipo];
}
