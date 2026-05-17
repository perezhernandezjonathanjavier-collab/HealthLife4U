let estrellasSeleccionadas = 5;

const lista =
document.getElementById(
    "lista-resenas"
);

let resenas =
JSON.parse(
    localStorage.getItem(
        "resenasHL4U"
    )
) || [

{
    usuario: "Gojo",
    estrellas: 5,
    texto: "La creatina me hizo sentir protagonista de anime 😭🔥"
},

{
    usuario: "Miku",
    estrellas: 5,
    texto: "Entrega rápida y productos GOD."
},

{
    usuario: "Luigi",
    estrellas: 4,
    texto: "Buen servicio pero el repartidor escuchaba reggaetón."
},

{
    usuario: "Javier",
    estrellas: 5,
    texto: "La verdad muy buenos productos, los compraria todos si pudiera 😭🔥"
},

{
    usuario: "Teto",
    estrellas: 2,
    texto: "El camion que reparte me choco mi carro"
},

{
    usuario: "Marioo",
    estrellas: 2,
    texto: "Porque no venden motita?"
},

{
    usuario: "Marcita",
    estrellas: 5,
    texto: "Muy buenos productos 💖"
},

{
    usuario: "Neru",
    estrellas: 1,
    texto: "No compren aqui me han llamado tonta"
},

{
    usuario: "Toad",
    estrellas: 3,
    texto: "Necesito una sección para cuidarme mis pies que ya tienen hongos"
},

{
    usuario: "Sukuna",
    estrellas: 5,
    texto: "Necesito papel higenico estoy en el baño"
},

{
    usuario: "Utahime",
    estrellas: 5,
    texto: "Necesito productos para pelo"
},

{
    usuario: "Lemus",
    estrellas: 5,
    texto: "Me encanta todo de esta pagina"
},

{
    usuario: "Monica",
    estrellas: 4,
    texto: "NECESITAN MÁS PRODUCTOS!"
},

{
    usuario: "Maycol",
    estrellas: 5,
    texto: "Un poquito más y venden pesas tambien"
},

{
    usuario: "Chris",
    estrellas: 5,
    texto: "La proteina esta buenisima, le hecho hasta mi cereal"
}


];

function renderResenas() {

    lista.innerHTML = "";

    let total = 0;

    resenas.forEach(resena => {

        total += resena.estrellas;

        lista.innerHTML += `

        <div class="resena-card">

            <div class="resena-top">

                <div class="resena-user-info">

    <img
    src="images/MiiPerfiles/${resena.usuario}.png"
    class="avatar-resena">

    <div class="resena-user">
        ${resena.usuario}
    </div>

</div>

                <div class="resena-stars">
                    ${"⭐".repeat(resena.estrellas)}
                </div>

            </div>

            <div class="resena-texto">
                ${resena.texto}
            </div>

        </div>
        `;
    });

    localStorage.setItem(
        "resenasHL4U",
        JSON.stringify(resenas)
    );

    document.getElementById(
        "cantidad-resenas"
    ).textContent =
        resenas.length;

    let promedio =
        total / resenas.length;

    document.getElementById(
        "promedio-rating"
    ).textContent =
        promedio.toFixed(1);
}

function seleccionarEstrella(num) {

    estrellasSeleccionadas = num;
}

function agregarResena() {

    let comentario =
    document.getElementById(
        "comentario"
    ).value.trim();

    if (!comentario) return;

    let usuario =
    localStorage.getItem(
        "usuario"
    ) || "Invitado";

    resenas.unshift({

        usuario:
            usuario,

        estrellas:
            estrellasSeleccionadas,

        texto:
            comentario
    });

    document.getElementById(
        "comentario"
    ).value = "";

    renderResenas();
}

renderResenas();

