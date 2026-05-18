/* =========================
   VOLVER
========================= */
function volverCarrito() {
    window.location.href = "carrito.html";
}

/* =========================
   DETECTAR TARJETA
========================= */
function detectarTarjeta() {

    let num = document.getElementById("tarjeta").value;

    let logoForm = document.getElementById("logo-tarjeta");
    let logoPrev = document.getElementById("prevLogo");

    let src = "";

    if (num.startsWith("4")) {
        src = "images/MP/V.png";
    }

    else if (num.startsWith("5")) {
        src = "images/MP/MS.png";
    }

    if (logoForm) logoForm.src = src;
    if (logoPrev) logoPrev.src = src;
}

/* =========================
   VALIDAR TARJETA
========================= */
function validarTarjeta() {

    let input = document.getElementById("tarjeta");

    input.value = input.value.replace(/\D/g, "");

    if (input.value.length > 16) {
        input.value = input.value.slice(0, 16);
    }

    detectarTarjeta();
    actualizarTarjeta();
}

/* =========================
   FORMATO FECHA
========================= */
function formatearFecha(input) {

    let val = input.value.replace(/\D/g, "");

    if (val.length > 4) {
        val = val.slice(0, 4);
    }

    if (val.length >= 3) {
        input.value = val.slice(0, 2) + "/" + val.slice(2);
    }

    else {
        input.value = val;
    }

    actualizarTarjeta();
}

/* =========================
   CREAR PEDIDO
========================= */
function crearPedido() {

    let numero =
        Math.floor(10000000 + Math.random() * 90000000);

    let codigo = "HL-" + numero;

    localStorage.setItem("pedido", codigo);
}

/* =========================
   TARJETA VISUAL
========================= */
function actualizarTarjeta() {

    let num =
        document.getElementById("tarjeta").value;

    let titular =
        document.getElementById("titular").value;

    let fecha =
        document.getElementById("fecha").value;

    let formato = num
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();

    document.getElementById("prevNumero").textContent =
        formato || "#### #### #### ####";

    document.getElementById("prevTitular").textContent =
        titular || "NOMBRE APELLIDO";

    document.getElementById("prevFecha").textContent =
        fecha || "MM/AA";

    let tarjeta =
        document.getElementById("tarjetaPreview");

    tarjeta.classList.remove(
        "visa",
        "mastercard"
    );

    tarjeta.classList.add("activa");

    setTimeout(() => {
        tarjeta.classList.remove("activa");
    }, 200);

    if (num.startsWith("4")) {

        tarjeta.classList.add("visa");

        document.getElementById("prevLogo").src =
            "images/MP/V.png";
    }

    else if (num.startsWith("5")) {

        tarjeta.classList.add("mastercard");

        document.getElementById("prevLogo").src =
            "images/MP/MS.png";
    }

    else {
        document.getElementById("prevLogo").src = "";
    }

    detectarTarjeta();
}

/* =========================
   GUARDAR TARJETA
========================= */
function guardarTarjeta() {

    let usuario =
        localStorage.getItem("usuarioLogueado");

    if (!usuario) {
        alert("Regístrate primero");
        return;
    }

    let num =
        document.getElementById("tarjeta").value;

    let fecha =
        document.getElementById("fecha").value;

    let titular =
        document.getElementById("titular").value;

    /* VALIDACIONES */

    if (num.length !== 16) {
        alert("La tarjeta debe tener 16 dígitos");
        return;
    }

    if (!fecha.includes("/")) {
        alert("Fecha inválida");
        return;
    }

    if (!titular) {
        alert("Ingresa el titular");
        return;
    }

    /* TIPO TARJETA */

    let tipo =
        num.startsWith("4")
        ? "Visa"
        : num.startsWith("5")
        ? "Mastercard"
        : "Desconocida";

    let ultimos = num.slice(-4);

    /* GUARDAR TARJETA */

    localStorage.setItem(
        "tarjeta",
        JSON.stringify({
            tipo,
            ultimos
        })
    );

    /* CREAR PEDIDO */

    crearPedido();

    /* SNAPSHOT DEL CARRITO */

    let carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];

    localStorage.setItem(
        "ultimoPedidoDetalle",
        JSON.stringify(carrito)
    );

    /* MENSAJE */

    alert("Método de pago agregado correctamente");

    /* VOLVER AL CARRITO */

    window.location.href = "carrito.html";
}

/* =========================
   LIMPIAR
========================= */
function limpiar() {

    document
        .querySelectorAll("input")
        .forEach(i => i.value = "");

    document.getElementById("logo-tarjeta").src = "";
    document.getElementById("prevLogo").src = "";

    document.getElementById("prevNumero").textContent =
        "#### #### #### ####";

    document.getElementById("prevTitular").textContent =
        "NOMBRE APELLIDO";

    document.getElementById("prevFecha").textContent =
        "MM/AA";
}

/* =========================
   DOM READY
========================= */
window.addEventListener("DOMContentLoaded", () => {

    /* CVC */

    let cvc = document.getElementById("cvc");

    if (cvc) {

        cvc.addEventListener("input", function () {

            this.value = this.value
                .replace(/\D/g, "")
                .slice(0, 4);
        });
    }

    /* TARJETA */

    let tarjeta =
        document.getElementById("tarjeta");

    if (tarjeta) {

        tarjeta.addEventListener("input", () => {

            validarTarjeta();
            actualizarTarjeta();
            detectarTarjeta();
        });
    }

    /* FECHA */

    let fecha =
        document.getElementById("fecha");

    if (fecha) {

        fecha.addEventListener("input", function () {

            formatearFecha(this);
            actualizarTarjeta();
        });
    }

    /* TITULAR */

    let titular =
        document.getElementById("titular");

    if (titular) {

        titular.addEventListener("input", function () {

            this.value =
                this.value.toUpperCase();

            actualizarTarjeta();
        });
    }
});
