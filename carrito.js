/* =========================
   VOLVER
========================= */
function volverInicio() {

    window.location.href =
        "index.html";
}

/* =========================
   OBTENER CARRITO
========================= */

let carrito =
    JSON.parse(
        localStorage.getItem(
            "carrito"
        )
    ) || [];

/* =========================
   MOSTRAR CARRITO
========================= */

function mostrarCarrito() {

    let contenedor =
        document.getElementById(
            "lista-carrito"
        );

    let total = 0;

    contenedor.innerHTML = "";

    /* carrito vacío */

    if (carrito.length === 0) {

        contenedor.innerHTML = `

            <div style="
                text-align:center;
                color:white;
                padding:40px;
                opacity:0.8;
            ">

                <h2>
                    🥲 Tu carrito está vacío
                </h2>

                <p>
                    Agrega productos para continuar
                </p>

            </div>
        `;

        document.getElementById(
            "total"
        ).textContent = "Q0.00";

        return;
    }

    /* productos */

    carrito.forEach((producto, index) => {

        let cantidad =
            producto.cantidad || 1;

        let subtotal =
            producto.precio * cantidad;

        total += subtotal;

        let item =
            document.createElement("div");

        item.classList.add(
            "item-carrito"
        );

        item.innerHTML = `

            <img
                src="${producto.imagen}"
                class="img-carrito"
            >

            <div class="info-producto">

                <p class="nombre">
                    ${producto.nombre}
                </p>

                <p class="descripcion">
                    ${producto.descripcion}
                </p>

                <div class="cantidad">

                    <button
                        onclick="cambiarCantidad(${index}, -1)">
                        -
                    </button>

                    <span>
                        ${cantidad}
                    </span>

                    <button
                        onclick="cambiarCantidad(${index}, 1)">
                        +
                    </button>

                </div>

            </div>

            <div class="lado-derecho">

                <p class="precio">
                    Q${subtotal.toFixed(2)}
                </p>

                <button
                    onclick="eliminarProducto(${index})">
                    ❌
                </button>

            </div>
        `;

        contenedor.appendChild(item);
    });

    document.getElementById(
        "total"
    ).textContent =
        "Q" + total.toFixed(2);
}

/* =========================
   MOSTRAR MÉTODO PAGO
========================= */

function mostrarMetodoPago() {

    let data =
        JSON.parse(
            localStorage.getItem(
                "tarjeta"
            )
        );

    let metodo =
        document.getElementById(
            "metodo-pago"
        );

    if (data) {

        metodo.textContent =
            `${data.tipo} •••• ${data.ultimos}`;
    }

    else {

        metodo.textContent =
            "No agregado";
    }
}

/* =========================
   CAMBIAR CANTIDAD
========================= */

function cambiarCantidad(index, cambio) {

    if (!carrito[index].cantidad) {

        carrito[index].cantidad = 1;
    }

    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {

        carrito.splice(index, 1);
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}

/* =========================
   ELIMINAR PRODUCTO
========================= */

function eliminarProducto(index) {

    carrito.splice(index, 1);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}

/* =========================
   VACIAR CARRITO
========================= */

function vaciarCarrito() {

    carrito = [];

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();
}

/* =========================
   IR A PAGO
========================= */

function irPago() {

    let usuario =
        localStorage.getItem(
            "usuario"
        );

    if (!usuario) {

        alert(
            "Debes registrarte primero"
        );

        window.location.href =
            "registro.html";

        return;
    }

    window.location.href =
        "pago.html";
}

/* =========================
   FINALIZAR COMPRA
========================= */

function finalizarCompra() {

    let usuario =
        localStorage.getItem(
            "usuario"
        );

    let tarjeta =
        localStorage.getItem(
            "tarjeta"
        );

    /* validaciones */

    if (!usuario) {

        alert(
            "Debes registrarte primero"
        );

        window.location.href =
            "registro.html";

        return;
    }

    if (!tarjeta) {

        alert(
            "Debes agregar un método de pago"
        );

        window.location.href =
            "pago.html";

        return;
    }

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío"
        );

        return;
    }

    /* snapshot carrito */

    localStorage.setItem(
        "ultimoPedidoDetalle",
        JSON.stringify(carrito)
    );

    /* LIMPIAR CARRITO */

    carrito = [];

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    /* loader */

    let loader =
        document.createElement("div");

    loader.style.position =
        "fixed";

    loader.style.top = "0";

    loader.style.left = "0";

    loader.style.width =
        "100%";

    loader.style.height =
        "100%";

    loader.style.background =
        "rgba(0,0,0,0.96)";

    loader.style.display =
        "flex";

    loader.style.flexDirection =
        "column";

    loader.style.justifyContent =
        "center";

    loader.style.alignItems =
        "center";

    loader.style.color =
        "white";

    loader.style.fontFamily =
        "Arial";

    loader.style.zIndex =
        "999999";

    loader.innerHTML = `

        <div style="font-size:80px;">
            💳
        </div>

        <h1 style="margin:15px 0;">
            Procesando pago...
        </h1>

        <p style="opacity:0.7;">
            Verificando con el banco
        </p>

        <div style="
            width:220px;
            height:6px;
            background:#222;
            border-radius:20px;
            margin-top:20px;
            overflow:hidden;
        ">

            <div style="
                width:100%;
                height:100%;
                background:
                linear-gradient(
                    90deg,
                    #00ff9d,
                    #00c3ff
                );
                animation:carga 1.2s linear infinite;
            ">
            </div>

        </div>
    `;

    document.body.appendChild(
        loader
    );

    /* audio */

    let audio =
        document.getElementById(
            "sound-success"
        );

    /* approved */

    setTimeout(() => {

        loader.innerHTML = `

            <div style="font-size:100px;">
                ✅
            </div>

            <h1 style="
                color:#00ff9d;
                margin:10px 0;
            ">
                PAYMENT APPROVED
            </h1>

            <p style="opacity:0.7;">
                Transacción completada
            </p>
        `;

        /* reproducir sonido */

        if (audio) {

            audio.play();

            /* esperar que termine */

            audio.onended = () => {

                window.location.href =
                    "confirmacion.html";
            };
        }

        /* fallback */

        else {

            setTimeout(() => {

                window.location.href =
                    "confirmacion.html";

            }, 2500);
        }

    }, 1800);
}

/* =========================
   CARGAR TODO
========================= */

document.addEventListener(
    "DOMContentLoaded",

    function () {

        mostrarCarrito();

        mostrarMetodoPago();
    }
);

/* =========================
   ANIMACION
========================= */

const style =
    document.createElement(
        "style"
    );

style.innerHTML = `

@keyframes carga {

    0% {

        transform:
            translateX(-100%);
    }

    100% {

        transform:
            translateX(100%);
    }
}
`;

document.head.appendChild(
    style
);
