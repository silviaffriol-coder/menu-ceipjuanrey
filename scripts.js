/* ---------------------------------------------------
   SCRIPTS PRINCIPAIS – CEIP JUAN REY
   Panel oculto + interaccións da app
--------------------------------------------------- */

/* ---------------------------------------------------
   XESTO SECRETO: 3 TOQUES NO SELO
--------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    // Detectar o selo do colexio
    const selo = document.getElementById("selo-colexio");

    if (selo) {
        let contadorToques = 0;

        selo.addEventListener("click", () => {
            contadorToques++;

            // Se toca 3 veces → entrar en admin.html
            if (contadorToques === 3) {
                window.location.href = "admin.html";
            }

            // Reiniciar contador despois de 1 segundo
            setTimeout(() => {
                contadorToques = 0;
            }, 1000);
        });
    }
});

/* ---------------------------------------------------
   CAMBIO DE MENÚ (xa o fai menus.js)
--------------------------------------------------- */

/* Aquí non vai nada porque menus.js xa controla
   a carga automática do menú segundo o día real.
   scripts.js só se encarga do panel oculto. */
