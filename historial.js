/* =========================
   HISTORIAL
========================= */

let historial =

    JSON.parse(
        localStorage.getItem(
            "historialCompras"
        )
    ) || [];

/* =========================
   RENDER HISTORIAL
========================= */

function renderHistorial() {

    let grid =
        document.getElementById(
            "historialGrid"
        );

    grid.innerHTML = "";

    /* =========================
       VACIO
    ========================= */

    if (historial.length === 0) {

        grid.innerHTML = `

            <div class="vacio">

                <h2>
                    📦 No hay pedidos aún
                </h2>

                <p style="
                    margin-top:15px;
                    opacity:0.7;
                ">
                    Tus compras aparecerán aquí
                </p>

            </div>
        `;

        return;
    }

    /* =========================
       PEDIDOS
    ========================= */

    historial
    .slice()
    .reverse()
    .forEach((pedido, index) => {

        let claseEstado =
            "estado-bodega";

        if (
            pedido.estado ===
            "Entregado"
        ) {

            claseEstado =
                "estado-entregado";
        }

        if (
            pedido.estado ===
            "Cancelado"
        ) {

            claseEstado =
                "estado-cancelado";
        }

        grid.innerHTML += `

            <div class="tarjeta-pedido">

                <h3>
                    ${pedido.codigo}
                </h3>

                <div class="info-pedido">
                    📦 ${pedido.producto}
                </div>

                <div class="info-pedido">
                    💵 ${pedido.precio}
                </div>

                <div class="info-pedido">
                    📅 ${pedido.fecha}
                </div>

                <div class="info-pedido">
                    📍 ${pedido.zona}
                </div>

                <div class="
                    estado
                    ${claseEstado}
                ">
                    ${pedido.estado}
                </div>

                <div class="botones-pedido">

                    <button
                    class="
                        btn-pedido
                        btn-rastrear
                    "
                    onclick="
                        rastrearPedido(
                            '${pedido.codigo}'
                        )
                    ">

                        🚚 Rastrear

                    </button>

                    <button
                    class="
                        btn-pedido
                        btn-cancelar
                    "
                    onclick="
                        cancelarPedido(${index})
                    ">

                        ❌ Cancelar

                    </button>

                </div>

            </div>
        `;
    });
}

/* =========================
   CANCELAR PEDIDO
========================= */

function cancelarPedido(index) {

    historial[index].estado =
        "Cancelado";

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

/* =========================
   INICIO
========================= */

actualizarEntregados();

renderHistorial();

