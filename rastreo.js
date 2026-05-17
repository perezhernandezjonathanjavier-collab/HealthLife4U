const mensajes = [

    "🚚 El repartidor está luchando contra el tráfico...",

    "☕ Parada táctica para café detectada...",

    "💪 Tu pedido ganó masa muscular en el camino...",

    "📦 Preparando suplementos con amor...",

    "🔥 El repartidor puso reggaetón y aceleró..."
];

/* =========================
   MENSAJES RANDOM
========================= */

const texto =
document.getElementById(
    "estado-random"
);

setInterval(() => {

    let random =
        mensajes[
            Math.floor(
                Math.random()
                * mensajes.length
            )
        ];

    texto.textContent =
        random;

}, 4000);

/* =========================
   AVATAR RANDOM
========================= */

const perfiles = [

    "Javier",
    "Gojo",
    "Geto",
    "Sukuna",
    "Lemus",
    "Marcita",
    "Marlon",
    "Marioo",
    "Luigi",
    "Toad",
    "Maycol",
    "Miku",
    "Monica",
    "Teto",
    "Neru",
    "Chris",
    "Utahime"
];

let avatarGuardado =
    localStorage.getItem(
        "avatarDelivery"
    );

if (!avatarGuardado) {

    avatarGuardado =
        perfiles[
            Math.floor(
                Math.random()
                * perfiles.length
            )
        ];

    localStorage.setItem(
        "avatarDelivery",
        avatarGuardado
    );
}

document.getElementById(
    "avatar-repartidor"
).src =
`images/MiiPerfiles/${avatarGuardado}.png`;

/* =========================
   TIMER DELIVERY
========================= */

let tiempoRestante =
    localStorage.getItem(
        "deliveryTimer"
    );

if (!tiempoRestante) {

    tiempoRestante = 480;

    localStorage.setItem(
        "deliveryTimer",
        tiempoRestante
    );
}

tiempoRestante =
parseInt(tiempoRestante);

const textoTiempo =
document.getElementById(
    "texto-tiempo"
);

const barra =
document.getElementById(
    "barra-progreso"
);

function actualizarDelivery() {

    tiempoRestante--;

    localStorage.setItem(
        "deliveryTimer",
        tiempoRestante
    );

    let minutos =
        Math.floor(
            tiempoRestante / 60
        );

    let dias = 4;

    if (minutos <= 6)
        dias = 3;

    if (minutos <= 4)
        dias = 2;

    if (minutos <= 2)
        dias = 1;

    if (minutos <= 0)
        dias = 0;

    /* =========================
   TEXTO ENTREGA
========================= */

if (dias > 0) {

    textoTiempo.textContent =
    `Faltan ${dias} días`;

} else {

    textoTiempo.textContent =
    "Paquete entregado ✅";

    /* =========================
       GUARDAR ESTADO
    ========================= */

    localStorage.setItem(
        "estadoPedido",
        "entregado"
    );

    document
    .getElementById(
        "timeline-entregado"
    )
    .classList.add(
        "activo"
    );

    const sonido =
    new Audio(
        "sounds/dingdong.mp3"
    );

    sonido.play();

    /* =========================
       REINICIAR DELIVERY
    ========================= */

    localStorage.removeItem(
        "deliveryTimer"
    );

    localStorage.removeItem(
        "avatarDelivery"
    );

    clearInterval(
        intervalo
    );

    setTimeout(() => {

        location.reload();

    }, 2500);

    return;
}



    /* =========================
       BARRA PROGRESO
    ========================= */

    let progreso =
        100 -
        (
            tiempoRestante
            / 480
        ) * 100;

    barra.style.width =
        progreso + "%";

    /* =========================
       TIMELINE
    ========================= */

    if (dias <= 2) {

        document
        .getElementById(
            "timeline-camino"
        )
        .classList.add(
            "activo"
        );
    }
}

actualizarDelivery();

const intervalo =
setInterval(
    actualizarDelivery,
    1000
);

