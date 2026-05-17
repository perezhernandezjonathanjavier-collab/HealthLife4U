/* =========================
   CARGAR TEMA GLOBAL
========================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        let tema =
            localStorage.getItem(
                "tema"
            );

        if (tema === "oscuro") {

            document.body.classList.add(
                "tema-oscuro"
            );
        }
    }
);

/* =========================
   ESPERAR HTML
========================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        /* MOSTRAR USUARIO */

        let usuario =
            localStorage.getItem(
                "usuarioLogueado"
            );

        if (usuario) {

            document.getElementById(
                "btn-usuario"
            ).textContent =
                usuario;
        }

        /* BOTON USUARIO */

        document.getElementById(
            "btn-usuario"
        ).addEventListener(
            "click",
            function(e) {

                e.stopPropagation();

                let usuario =
                    localStorage.getItem(
                        "usuarioLogueado"
                    );

                if (usuario) {

                    toggleMenuUsuario();

                } else {

                    window.location.href =
                        "registro.html";
                }
            }
        );
    }
);

/* =========================
   TOGGLE MENU
========================= */

function toggleMenuUsuario() {

    let menu =
        document.getElementById(
            "menu-usuario"
        );

    if (
        menu.style.display === "block"
    ) {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";
    }
}

/* =========================
   CLICK AFUERA
========================= */

document.addEventListener(
    "click",
    function(e) {

        let menu =
            document.getElementById(
                "menu-usuario"
            );

        let boton =
            document.getElementById(
                "btn-usuario"
            );

        if (
            menu
            &&
            boton
            &&
            !menu.contains(e.target)
            &&
            !boton.contains(e.target)
        ) {

            menu.style.display =
                "none";
        }
    }
);

/* =========================
   CERRAR SESION
========================= */

function cerrarSesion() {

    localStorage.removeItem(
        "usuarioLogueado"
    );

    localStorage.removeItem(
        "carrito"
    );

    location.reload();
}

/* =========================
   AJUSTES
========================= */

function abrirAjustes() {

    alert(
        "Próximamente ajustes 😭🔥"
    );
}

/* =========================
   HISTORIAL
========================= */

function abrirHistorial() {

    alert(
        "Próximamente historial 😭🔥"
    );
}
/* =========================
   CARRITO
========================= */

let carrito =
    JSON.parse(
        localStorage.getItem(
            "carrito"
        )
    ) || [];

function agregarAlCarrito(
    nombre,
    precio,
    imagen,
    descripcion
) {

    carrito.push({

        nombre,
        precio,
        imagen,
        descripcion
    });

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    actualizarContador();
}

function actualizarContador() {

    let contador =
        document.getElementById(
            "contador-carrito"
        );

    if (contador) {

        contador.textContent =
            carrito.length;
    }
}

function irCarrito() {

    window.location.href =
        "carrito.html";
}

/* =========================
   BOTON SUBIR
========================= */

const btnTop =
    document.getElementById(
        "btn-top"
    );

window.onscroll =
    function () {

        if (
            document.documentElement
            .scrollTop > 200
        ) {

            btnTop.style.display =
                "block";

        } else {

            btnTop.style.display =
                "none";
        }
    };

btnTop.addEventListener(
    "click",
    function () {

        window.scrollTo({

            top: 0,

            behavior:
                "smooth"
        });
    }
);

/* =========================
   CONTADOR INICIAL
========================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        actualizarContador();
    }
);
/* =========================
   MODO OSCURO
========================= */

const tema =
    localStorage.getItem(
        "tema"
    );

if (tema === "oscuro") {

    document.body.classList.add(
        "modo-oscuro"
    );
}
/* =========================
   CARGAR FUENTE
========================= */

const fuente =
    localStorage.getItem(
        "fuente"
    );

if (fuente) {

    document.body.style.fontFamily =
        fuente;
}

/* =========================
   CARGAR TAMAÑO
========================= */

const tamanoFuente =
    localStorage.getItem(
        "tamanoFuente"
    );

if (tamanoFuente) {

    document.body.style.fontSize =
        tamanoFuente;
}
