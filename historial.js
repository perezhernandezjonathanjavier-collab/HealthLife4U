/* =========================
    });

    localStorage.setItem(
        "historialCompras",

        JSON.stringify(
            historial
        )
    );

    localStorage.setItem(
        "estadoPedido",
        "cancelado"
    );

    renderHistorial();
}

/* =========================
   RASTREAR
========================= */

function rastrearPedido(codigo) {

    localStorage.setItem(
        "pedido",
        codigo
    );

    window.location.href =
        "rastreo.html";
}

/* =========================
   ACTUALIZAR ENTREGADOS
========================= */

function actualizarEntregados() {

    let estado =
        localStorage.getItem(
            "estadoPedido"
        );

    if (
        estado === "entregado"
    ) {

        historial = historial.map(pedido => {

            if (
                pedido.estado ===
                "En bodega"
            ) {

                pedido.estado =
                    "Entregado";
            }

            return pedido;
        });

        localStorage.setItem(
            "historialCompras",

            JSON.stringify(
                historial
            )
        );
    }
}

actualizarEntregados();
renderHistorial();

