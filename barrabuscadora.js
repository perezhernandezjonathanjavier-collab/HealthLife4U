/* =========================================
   CREAR OVERLAY
========================================= */

const overlay = document.createElement("div");

overlay.className = "busqueda-overlay";

document.body.appendChild(overlay);

/* =========================================
   BUSCAR PRODUCTOS
========================================= */

function buscarProductos() {

    let texto =
        document.getElementById("buscador")
        .value
        .toLowerCase()
        .trim();

    let productos =
        document.querySelectorAll(".tarjeta-producto");

    let contenedor =
        document.getElementById("resultados-busqueda");

    contenedor.innerHTML = "";

    /* vacío */

    if (texto === "") {

        contenedor.style.display = "none";

        overlay.classList.remove("activo");

        return;
    }

    overlay.classList.add("activo");

    let encontrados = 0;

    productos.forEach((p, index) => {

        let nombreEl =
            p.querySelector(".nombre-producto");

        let descripcionEl =
            p.querySelector(".descripcion-producto");

        let imagenEl =
            p.querySelector(".foto-producto");

        if (!nombreEl) return;

        let nombre =
            nombreEl.textContent
            .toLowerCase();

        if (nombre.includes(texto)) {

            encontrados++;

            contenedor.innerHTML += `

                <div
                    class="resultado-item"
                    onclick="irAProducto(${index})"
                >

                    <img
                        src="${imagenEl?.src || ''}"
                    >

                    <div class="resultado-info">

                        <h4>
                            ${nombreEl.textContent}
                        </h4>

                        <p>
                            ${descripcionEl?.textContent || ''}
                        </p>

                    </div>

                </div>
            `;
        }
    });

    contenedor.style.display = "block";

    /* sin resultados */

    if (encontrados === 0) {

        contenedor.innerHTML = `

            <div class="resultado-item">

                <div class="resultado-info">

                    <h4>
                        No hay resultados
                    </h4>

                </div>

            </div>
        `;
    }
}

/* =========================================
   IR AL PRODUCTO
========================================= */

function irAProducto(index) {

    let productos =
        document.querySelectorAll(".tarjeta-producto");

    let productoHTML = productos[index];

    if (!productoHTML) return;

    let nombre =
        productoHTML.querySelector(".nombre-producto")
        ?.textContent || "";

    let descripcion =
        productoHTML.querySelector(".descripcion-producto")
        ?.textContent || "";

    let precioTexto =
        productoHTML.querySelector(".precio-producto")
        ?.textContent || "0";

    let imagen =
        productoHTML.querySelector("img")
        ?.src || "";

    /* limpiar precio */

    let precio = parseFloat(
        precioTexto.replace(/[^\d.]/g, "")
    );

    /* crear producto */

    let producto = {

        nombre: nombre,

        descripcion: descripcion,

        precio: precio,

        imagen: imagen
    };

    /* guardar */

    localStorage.setItem(
        "productoActual",
        JSON.stringify(producto)
    );

    /* abrir página */

    window.location.href =
        "producto.html";
}

/* =========================================
   CERRAR
========================================= */

function cerrarBusqueda() {

    document.getElementById(
        "resultados-busqueda"
    ).style.display = "none";

    document.getElementById(
        "buscador"
    ).value = "";

    overlay.classList.remove(
        "activo"
    );
}

/* =========================================
   CLICK OVERLAY
========================================= */

overlay.addEventListener(
    "click",
    cerrarBusqueda
);