/* =========================
   FACTURA HL4U
========================= */

/* =========================
   CARGAR FACTURA
========================= */

window.addEventListener("DOMContentLoaded", () => {

    let lista =
        document.getElementById("lista-productos");

    let totalPago =
        document.getElementById("total-pago");

    let codigoPedido =
        document.getElementById("codigo-pedido");

    /* VALIDAR ELEMENTOS */

    if (!lista || !totalPago || !codigoPedido) {
        console.error(
            "Faltan elementos HTML en confirmacion.html"
        );
        return;
    }

    /* OBTENER PRODUCTOS */

    let carrito =
        JSON.parse(
            localStorage.getItem(
                "ultimoPedidoDetalle"
            )
        ) || [];

    let total = 0;

    lista.innerHTML = "";

    /* SI NO HAY PRODUCTOS */

    if (carrito.length === 0) {

        lista.innerHTML = `
            <p style="
                text-align:center;
                opacity:0.7;
                margin-top:15px;
            ">
                No hay productos en la factura 🥲
            </p>
        `;

        totalPago.textContent = "0.00";

    }

    /* MOSTRAR PRODUCTOS */

    else {

        carrito.forEach(producto => {

            let cantidad =
                producto.cantidad || 1;

            let subtotal =
                producto.precio * cantidad;

            total += subtotal;

            lista.innerHTML += `

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    margin:12px 0;
                    padding-bottom:10px;
                    border-bottom:
                    1px dashed #999;
                    font-size:14px;
                ">

                    <div>

                        <div style="
                            font-weight:bold;
                            margin-bottom:4px;
                        ">
                            ${producto.nombre}
                        </div>

                        <div style="
                            opacity:0.7;
                            font-size:12px;
                        ">
                            Cantidad: ${cantidad}
                        </div>

                    </div>

                    <strong>
                        Q${subtotal.toFixed(2)}
                    </strong>

                </div>
            `;
        });

        totalPago.textContent =
            total.toFixed(2);
    }


    /* ========================= GUARDAR HISTORIAL ========================= */ 
    let historial = JSON.parse( localStorage.getItem( "historialCompras" ) ) || []; 
    /* EVITAR DUPLICADOS */ 
    
    let codigoExistente = localStorage.getItem( "pedido" ); 
    
    let yaExiste = historial.some(pedido => pedido.codigo === codigoExistente ); 
      
      if (!yaExiste) { let datosUsuario = JSON.parse( localStorage.getItem( "datosUsuario" ) ) || {}; 
      
      
      let nuevoPedido = { codigo: codigoExistente, producto: carrito .map(p => p.nombre) .join(", "), precio: "Q" + total.toFixed(2), fecha: new Date() .toLocaleDateString(), 
        zona: datosUsuario.zona || "Zona desconocida", estado: "En bodega" }; historial.push( nuevoPedido ); localStorage.setItem( "historialCompras", 
            
            JSON.stringify( historial ) ); }

    /* CODIGO PEDIDO */

    let codigo =
        localStorage.getItem("pedido");

    codigoPedido.textContent =
        codigo || "HL-ERROR";

});

/* =========================
   VOLVER AL INICIO
========================= */

function volverInicio() {

    window.location.href =
        "index.html";
}

/* =========================
   DESCARGAR PDF
========================= */

function descargarFactura() {

    let elemento =
        document.querySelector(".factura");

    if (!elemento) {
        alert("No se encontró la factura");
        return;
    }

    html2pdf()

        .set({

            margin: 0.5,

            filename:
                "factura-HL4U.pdf",

            image: {
                type: "jpeg",
                quality: 0.98
            },

            html2canvas: {
                scale: 2
            },

            jsPDF: {

                unit: "in",

                format: "letter",

                orientation:
                    "portrait"
            }

        })

        .from(elemento)

        .save();
}
