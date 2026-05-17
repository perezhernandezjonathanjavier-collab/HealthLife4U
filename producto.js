/* =========================
   OBTENER PRODUCTO
========================= */

let producto =
    JSON.parse(
        localStorage.getItem(
            "productoActual"
        )
    );

/* seguridad */

if (!producto) {

    window.location.href =
        "index.html";
}

/* =========================
   ELEMENTOS
========================= */

const nombre =
    document.getElementById(
        "nombre-producto"
    );

const precio =
    document.getElementById(
        "precio-producto"
    );

const descripcion =
    document.getElementById(
        "descripcion-producto"
    );

const imagen =
    document.getElementById(
        "imagen-producto"
    );

/* miniaturas */

const mini1 =
    document.getElementById(
        "miniatura1"
    );

const mini2 =
    document.getElementById(
        "miniatura2"
    );

const mini3 =
    document.getElementById(
        "miniatura3"
    );

/* =========================
   CARGAR PRODUCTO
========================= */

nombre.textContent =
    producto.nombre;

precio.textContent =
    "Q" + producto.precio;

descripcion.textContent =
    producto.descripcion;

imagen.src =
    producto.imagen;

/* miniaturas */

mini1.src = producto.imagen;
mini2.src = producto.imagen;
mini3.src = producto.imagen;

/* =========================
   CAMBIAR IMAGEN
========================= */

const miniaturas =
    document.querySelectorAll(
        ".miniatura"
    );

miniaturas.forEach(mini => {

    mini.addEventListener(
        "click",
        function () {

            imagen.src = this.src;

            miniaturas.forEach(m =>
                m.classList.remove(
                    "activa"
                )
            );

            this.classList.add(
                "activa"
            );
        }
    );
});

/* =========================
   AGREGAR AL CARRITO
========================= */

function agregarCarrito() {

    let carrito =
        JSON.parse(
            localStorage.getItem(
                "carrito"
            )
        ) || [];

    /* verificar repetido */

    let existente =
        carrito.find(
            item =>
            item.nombre ===
            producto.nombre
        );

    if (existente) {

        existente.cantidad =
            (existente.cantidad || 1) + 1;
    }

    else {

        carrito.push({

            nombre:
                producto.nombre,

            precio:
                producto.precio,

            descripcion:
                producto.descripcion,

            imagen:
                producto.imagen,

            cantidad:1
        });
    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    /* animacion */

    mostrarToast(
        "🛒 Producto agregado"
    );
}

/* =========================
   COMPRAR DIRECTO
========================= */

function comprarDirecto() {

    agregarCarrito();

    setTimeout(() => {

        window.location.href =
            "carrito.html";

    }, 700);
}

/* =========================
   TOAST
========================= */

function mostrarToast(texto) {

    let toast =
        document.createElement("div");

    toast.classList.add(
        "toast-hl4u"
    );

    toast.innerHTML = texto;

    document.body.appendChild(
        toast
    );

    setTimeout(() => {

        toast.classList.add(
            "mostrar"
        );

    }, 50);

    setTimeout(() => {

        toast.classList.remove(
            "mostrar"
        );

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 2200);
}

