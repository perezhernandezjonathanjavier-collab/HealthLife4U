function cerrarSesion() {

    // 🧹 limpiar usuario actual
    localStorage.removeItem("usuario");
    localStorage.removeItem("carrito");
    localStorage.removeItem("pedido");
    localStorage.removeItem("tarjeta");

    // 🧾 limpiar snapshot de factura (IMPORTANTE)
    localStorage.removeItem("ultimoPedidoDetalle");

    // (opcional: si quieres reset total historial por usuario)
    // localStorage.removeItem("pedidos");

    // 🔁 volver al inicio
    window.location.href = "index.html";
}
