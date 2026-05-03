function buscarProductos() {

    let texto = document.getElementById("buscador").value.toLowerCase().trim();
    let productos = document.querySelectorAll(".tarjeta-producto");
    let contenedor = document.getElementById("resultados-busqueda");

    contenedor.innerHTML = "";

    if (texto === "") {
        contenedor.style.display = "none";
        document.body.classList.remove("busqueda-activa");
        return;
    }

    document.body.classList.add("busqueda-activa");
    contenedor.style.display = "block";

    let encontrados = 0;

    productos.forEach(p => {

        let nombre = p.querySelector(".nombre-producto").textContent.toLowerCase();

        if (nombre.includes(texto)) {

            encontrados++;

            contenedor.innerHTML += `
                <div class="resultado-item" onclick="irAProducto(this)">
                    ${p.querySelector(".nombre-producto").textContent}
                </div>
            `;
        }
    });

    if (encontrados === 0) {
        contenedor.innerHTML = `<div class="resultado-item">No hay resultados</div>`;
    }
}


// 📍 ir al producto real
function irAProducto(el) {

    let texto = el.textContent.toLowerCase().trim();
    let productos = document.querySelectorAll(".tarjeta-producto");

    productos.forEach(p => {

        let nombre = p.querySelector(".nombre-producto").textContent.toLowerCase();

        if (nombre === texto) {

            p.style.visibility = "visible";

            p.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            // ✨ efecto visual highlight
            p.style.transform = "scale(1.05)";
            p.style.boxShadow = "0 0 20px rgba(0,255,150,0.4)";

            setTimeout(() => {
                p.style.transform = "";
                p.style.boxShadow = "";
            }, 800);
        }
    });

    // cerrar lista
    document.getElementById("resultados-busqueda").style.display = "none";
    document.body.classList.remove("busqueda-activa");

    // restaurar productos
    productos.forEach(p => {
        p.style.visibility = "visible";
        p.style.opacity = "1";
    });
}
