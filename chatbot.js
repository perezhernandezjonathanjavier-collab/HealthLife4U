let estado = "inicio";

/* ======================
   UI BASE
====================== */

function toggleChat() {
    let chat = document.getElementById("chatBox");
    chat.classList.toggle("activo");
}

/* ======================
   MENSAJES
====================== */

function escribirBot(texto) {

    let chat = document.getElementById("chatMensajes");

    chat.innerHTML += `
        <p class="bot">🤖 ${texto}</p>
    `;

    chat.scrollTop = chat.scrollHeight;
}

function escribirConTyping(texto) {

    let chat = document.getElementById("chatMensajes");

    let typing = document.createElement("p");

    typing.className = "bot typing";
    typing.textContent = "🤖 escribiendo...";

    chat.appendChild(typing);

    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {

        typing.remove();

        let msg = document.createElement("p");

        msg.className = "bot";
        msg.textContent = "🤖 " + texto;

        chat.appendChild(msg);

        chat.scrollTop = chat.scrollHeight;

    }, 800);
}

/* ======================
   OPCIONES
====================== */

function limpiarOpciones() {

    document.getElementById(
        "chatOpciones"
    ).innerHTML = "";
}

function volverMenu() {

    estado = "inicio";

    document.getElementById("chatMensajes").innerHTML = `
        <p class="bot">🤖 Hola 👋 ¿en qué te ayudo?</p>
    `;

    document.getElementById("chatOpciones").innerHTML = `

        <button onclick="opcion('pedido')">
            Acerca de mi pedido
        </button>

        <button onclick="opcion('rastrear')">
            📍 Rastrear mi pedido
        </button>

        <button onclick="opcion('problema')">
            Problemas con mi pedido
        </button>

        <button onclick="opcion('cancelar')">
            ❌ Cancelar mi pedido
        </button>

        <button onclick="opcion('resenas')">
            ⭐ Reseñas de usuarios
        </button>

        <button onclick="opcion('pago')">
            Métodos de pago
        </button>

        <button onclick="opcion('otros')">
            Otros
        </button>
    `;
}

/* ======================
   MENU PRINCIPAL
====================== */

function opcion(tipo) {

    estado = tipo;

    limpiarOpciones();

    if (tipo === "pedido") {

        escribirConTyping(
            "Por favor ingresa tu número de pedido:"
        );

        mostrarInput("pedido");
    }

    if (tipo === "rastrear") {

        escribirConTyping(
            "Abriendo rastreo de pedido 📍"
        );

        setTimeout(() => {

            window.location.href =
                "rastreo.html";

        }, 1200);
    }

    if (tipo === "problema") {

        escribirConTyping(
            "Selecciona tu problema:"
        );

        document.getElementById("chatOpciones").innerHTML = `

            <button onclick="subProblema('danado')">
                Pedido dañado/incompleto
            </button>

            <button onclick="subProblema('cancelado')">
                Pedido cancelado
            </button>

            <button onclick="subProblema('no_recibido')">
                No recibí / incorrecto
            </button>
        `;
    }

    if (tipo === "cancelar") {

        escribirConTyping(
            "Ingresa tu código de pedido:"
        );

        mostrarInput("cancelarPedido");
    }

    if (tipo === "resenas") {

        escribirConTyping(
            "Abriendo reseñas de usuarios ⭐"
        );

        setTimeout(() => {

            window.location.href =
                "resenas.html";

        }, 1200);
    }

    if (tipo === "pago") {

        escribirConTyping(
            "Aceptamos Visa y Mastercard 💳"
        );

        setTimeout(() => {

            volverMenu();

        }, 1500);
    }

    if (tipo === "otros") {

        escribirConTyping(
            "Contáctanos: 📞 5268-0000 ✉️ HL4U@GMAIL.COM"
        );

        setTimeout(() => {

            volverMenu();

        }, 1500);
    }
}

/* ======================
   SUB PROBLEMAS
====================== */

function subProblema(tipo) {

    estado = tipo;

    limpiarOpciones();

    const flujos = {

        danado: () => {

            escribirConTyping(
                "Ingresa número de orden y productos faltantes:"
            );

            mostrarInput("danado");
        },

        cancelado: () => {

            escribirConTyping(
                "Ingresa tu número de orden:"
            );

            mostrarInput("cancelado");
        },

        no_recibido: () => {

            document.getElementById("chatOpciones").innerHTML = `

                <button onclick="subProblema('no_llego')">
                    No recibí mi pedido
                </button>

                <button onclick="subProblema('incorrecto')">
                    Pedido incorrecto
                </button>
            `;
        },

        no_llego: () => {

            escribirConTyping(
                "Ingresa tu número de orden:"
            );

            mostrarInput("no_llego");
        },

        incorrecto: () => {

            escribirConTyping(
                "Ingresa número de orden y pedido recibido:"
            );

            mostrarInput("incorrecto");
        }
    };

    if (flujos[tipo]) {
        flujos[tipo]();
    }
}

/* ======================
   INPUT
====================== */

function mostrarInput(tipo) {

    document.getElementById("chatOpciones").innerHTML = `

        <input
        id="inputUser"
        placeholder="Escribe aquí..." />

        <button onclick="procesar('${tipo}')">
            Enviar
        </button>

        <button
        onclick="volverMenu()"
        style="margin-top:10px;">

            🔄 Volver al inicio

        </button>
    `;
}

/* ======================
   PROCESAR RESPUESTAS
====================== */

function procesar(tipo) {

    let valor =
        document.getElementById("inputUser")
        .value
        .trim();

    if (!valor) return;

    if (tipo === "pedido") {

        let codigoGuardado =
            localStorage.getItem("pedido");

        if (valor === codigoGuardado) {

            let estadoPedido =
                localStorage.getItem(
                    "estadoPedido"
                );

            if (estadoPedido === "bodega") {

                escribirConTyping(
                    "Tu pedido está en bodega 📦. Tiempo estimado: 4 días 🚚"
                );

            } else if (
                estadoPedido === "cancelado"
            ) {

                escribirConTyping(
                    "Tu pedido fue cancelado ❌"
                );

            } else {

                escribirConTyping(
                    "Tu pedido ya fue entregado ✅"
                );
            }

        } else {

            escribirConTyping(
                "Código no válido ❌"
            );
        }
    }

    if (tipo === "danado") {

        escribirConTyping(
            "Reporte enviado. Nos contactaremos 📧"
        );
    }

    if (tipo === "cancelado") {

        escribirConTyping(
            "Te enviaremos un correo 📩"
        );
    }

    if (tipo === "no_llego") {

        escribirConTyping(
            "Reenviaremos tu pedido sin costo 🚚"
        );

        document.getElementById("chatOpciones").innerHTML = `

            <button onclick="escribirBot('Proceso de devolución iniciado (3-5 días)')">
                Devolución
            </button>

            <button onclick="escribirBot('Te contactaremos directamente 📞')">
                Hablar con agente
            </button>
        `;

        return;
    }

    if (tipo === "incorrecto") {

        escribirConTyping(
            "Enviaremos el pedido correcto sin costo 🙌"
        );
    }

    if (tipo === "cancelarPedido") {

        let codigoGuardado =
            localStorage.getItem("pedido");

        if (valor === codigoGuardado) {

            localStorage.setItem(
                "estadoPedido",
                "cancelado"
            );

            escribirConTyping(
                "Tu pedido fue cancelado ❌"
            );

        } else {

            escribirConTyping(
                "Código inválido ❌"
            );
        }
    }

    setTimeout(() => {

        volverMenu();

    }, 2200);
}
