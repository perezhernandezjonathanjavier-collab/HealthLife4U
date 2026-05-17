

function mostrarSeccion(
    id,
    boton
) {

    document
    .querySelectorAll(
        ".seccion-ajustes"
    )
    .forEach(seccion => {

        seccion.style.display =
            "none";
    });

    document
    .getElementById(id)
    .style.display =
        "block";

    document
    .querySelectorAll(
        ".opcion-ajustes"
    )
    .forEach(btn => {

        btn.classList.remove(
            "activo"
        );
    });

    boton.classList.add(
        "activo"
    );
}
/* =========================
   CAMBIO DE TEMA
========================= */

const selectorTema =
    document.getElementById(
        "selector-tema"
    );

/* CARGAR TEMA */

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

            selectorTema.value =
                "oscuro";
        }
    }
);

/* CAMBIAR TEMA */

selectorTema.addEventListener(
    "change",
    () => {

        if (
            selectorTema.value ===
            "oscuro"
        ) {

            document.body.classList.add(
                "tema-oscuro"
            );

            localStorage.setItem(
                "tema",
                "oscuro"
            );

        } else {

            document.body.classList.remove(
                "tema-oscuro"
            );

            localStorage.setItem(
                "tema",
                "claro"
            );
        }
    }
);

/* =========================
   FUENTE
========================= */

const selectorFuente =
    document.getElementById(
        "selector-fuente"
    );

/* CARGAR FUENTE */

let fuenteGuardada =
    localStorage.getItem(
        "fuente"
    );

if (fuenteGuardada) {

    document.body.style.fontFamily =
        fuenteGuardada;

    selectorFuente.value =
        fuenteGuardada;
}

/* CAMBIAR FUENTE */

selectorFuente.addEventListener(
    "change",
    function() {

        document.body.style.fontFamily =
            this.value;

        localStorage.setItem(
            "fuente",
            this.value
        );
    }
);
/* =========================
   TAMAÑO LETRA
========================= */

const selectorTamano =
    document.getElementById(
        "selector-tamano"
    );

/* CARGAR */

let tamanoGuardado =
    localStorage.getItem(
        "tamanoFuente"
    );

if (tamanoGuardado) {

    document.body.style.fontSize =
        tamanoGuardado;

    selectorTamano.value =
        tamanoGuardado;
}

/* CAMBIAR */

selectorTamano.addEventListener(
    "change",
    function() {

        document.body.style.fontSize =
            this.value;

        localStorage.setItem(
            "tamanoFuente",
            this.value
        );
    }
);
/* =========================
   PEDIDOS PANEL
========================= */

function mostrarPanelPedido(
    panelId,
    boton
) {

    document
    .querySelectorAll(
        ".panel-pedido"
    )
    .forEach(panel => {

        panel.style.display =
            "none";
    });

    document.getElementById(
        panelId
    ).style.display =
        "block";

    document
    .querySelectorAll(
        ".btn-pedido"
    )
    .forEach(btn => {

        btn.classList.remove(
            "activo-pedido"
        );
    });

    boton.classList.add(
        "activo-pedido"
    );
}
/* =========================
   BORRAR METODO PAGO
========================= */

function borrarMetodoPago() {

    localStorage.removeItem(
        "tarjeta"
    );

    document.getElementById(
        "tarjeta-guardada-texto"
    ).textContent =
        "No hay método guardado";

    alert(
        "Método de pago eliminado"
    );
}
/* =========================
   MOSTRAR TARJETA GUARDADA
========================= */

/* =========================
   MOSTRAR TARJETA
========================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        let tarjeta =
            localStorage.getItem(
                "tarjeta"
            );

        if (tarjeta) {

            let ultimos4 =
                tarjeta.slice(-4);

            let tipo =
                "💳 TARJETA";

            if (
                tarjeta.startsWith("4")
            ) {

                tipo =
                    "💙 VISA";
            }

            else if (
                tarjeta.startsWith("5")
            ) {

                tipo =
                    "🟠 MASTERCARD";
            }

            else if (
                tarjeta.startsWith("3")
            ) {

                tipo =
                    "🟣 AMEX";
            }

            document.getElementById(
                "tarjeta-guardada-texto"
            ).textContent =

                `${tipo} •••• ${ultimos4}`;
        }
    }
);
/* =========================
   GUARDAR NOTIFICACIONES
========================= */

const switches = [

    "notif-hl4u",
    "notif-email",
    "notif-sms"

];

/* CARGAR ESTADO */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        switches.forEach(id => {

            let estado =
                localStorage.getItem(id);

            if (
                estado === "true"
            ) {

                document.getElementById(
                    id
                ).checked = true;
            }
        });
    }
);

/* GUARDAR CAMBIOS */

switches.forEach(id => {

    document.addEventListener(
        "change",
        e => {

            if (
                e.target.id === id
            ) {

                localStorage.setItem(
                    id,
                    e.target.checked
                );
            }
        }
    );
});

