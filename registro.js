/* =========================
   VOLVER
========================= */

function volverInicio() {

    window.location.href =
        "index.html";
}

/* =========================
   CREAR USUARIO
========================= */

function crearUsuario() {

    let usuario =
        document.getElementById(
            "usuario"
        ).value.trim();

    let email =
        document.getElementById(
            "email"
        ).value.trim();

    let password =
        document.getElementById(
            "password"
        ).value.trim();

    let direccion =
        document.getElementById(
            "direccion"
        ).value.trim();

    let zona =
        document.getElementById(
            "zona"
        ).value;

    let telefono =
        document.getElementById(
            "telefono"
        ).value.trim();

    let error =
        document.getElementById(
            "error-email"
        );

    /* =========================
       VALIDAR VACÍOS
    ========================= */

    if (

        usuario === "" ||
        email === "" ||
        password === "" ||
        direccion === "" ||
        zona === "" ||
        telefono === ""

    ) {

        error.textContent =
            "Completa todos los campos";

        return;
    }

    /* =========================
       VALIDAR CORREO
    ========================= */

    if (

        !email.endsWith("@gmail.com")
        &&
        !email.endsWith("@hotmail.com")
        &&
        !email.endsWith("@outlook.com")

    ) {

        error.textContent =
            "Correo inválido";

        return;
    }

    /* =========================
       VALIDAR TELÉFONO
    ========================= */

    if (

        telefono.length !== 8
        ||
        isNaN(telefono)

    ) {

        error.textContent =
            "El teléfono debe tener 8 números";

        return;
    }

    error.textContent = "";

    /* =========================
       DATOS USUARIO
    ========================= */

    let datosUsuario = {

        usuario:
            usuario,

        email:
            email,

        password:
            password,

        direccion:
            direccion,

        zona:
            zona,

        telefono:
            telefono
    };

    /* =========================
       GUARDAR USUARIO
    ========================= */

    localStorage.setItem(

        "datosUsuario",

        JSON.stringify(
            datosUsuario
        )
    );

    /* =========================
       GUARDAR SESIÓN
    ========================= */

    localStorage.setItem(
        "usuarioLogueado",
        usuario
    );

    /* DEBUG */

    console.log(
        localStorage.getItem(
            "usuarioLogueado"
        )
    );

    /* =========================
       REDIRECCIÓN
    ========================= */

    window.location.href =
        "index.html";
}

/* =========================
   BORRAR DATOS
========================= */

function borrarDatos() {

    document.getElementById(
        "usuario"
    ).value = "";

    document.getElementById(
        "email"
    ).value = "";

    document.getElementById(
        "password"
    ).value = "";

    document.getElementById(
        "direccion"
    ).value = "";

    document.getElementById(
        "zona"
    ).value = "";

    document.getElementById(
        "telefono"
    ).value = "";

    document.getElementById(
        "error-email"
    ).textContent = "";
}

