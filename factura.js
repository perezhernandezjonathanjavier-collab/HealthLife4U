document.addEventListener("DOMContentLoaded", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedor = document.getElementById("lista-productos");

    let total = 0;
    contenedor.innerHTML = "";

    carrito.forEach(item => {

        let cantidad = item.cantidad || 1;
        let subtotal = Number(item.precio) * cantidad;

        total += subtotal;

        contenedor.innerHTML += `
            <div class="item-factura">
                <span>${item.nombre} x${cantidad}</span>
                <span>Q ${subtotal.toFixed(2)}</span>
            </div>
        `;
    });

    document.getElementById("total-pago").textContent = total.toFixed(2);

    /* 🔐 SOLO LECTURA DEL PEDIDO */
    let codigo = localStorage.getItem("pedido");
    document.getElementById("codigo-pedido").textContent = codigo || "SIN CODIGO";

    /* 🚨 SOLO GUARDAR SI HAY CODIGO REAL */
    if (codigo) {

        let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

        /* 🔥 EVITA DUPLICADOS EN REFRESH */
        let yaExiste = pedidos.some(p => p.codigo === codigo);

        if (!yaExiste) {
            pedidos.push({
                codigo: codigo,
                total: total.toFixed(2),
                fecha: new Date().toLocaleString()
            });

            localStorage.setItem("pedidos", JSON.stringify(pedidos));
        }
    }

    /* 🧹 LIMPIAR CARRITO */
    localStorage.removeItem("carrito");

});