// ===============================
// CONFIGURAÇÃO DO JOGO
// ===============================

let numeroSecreto;

let tentativas = 0;

let palpites = [];

let melhor = localStorage.getItem("melhor");


if (melhor) {

    document.getElementById("melhor").textContent = melhor;

}


// ===============================
// ELEMENTOS HTML
// ===============================

const campoPalpite =
    document.getElementById("palpite");

const botao =
    document.getElementById("botao");

const tentativasTexto =
    document.getElementById("tentativas");

const melhorTexto =
    document.getElementById("melhor");

const mensagem =
    document.getElementById("mensagem");

const numeroTela =
    document.getElementById("numeroSecreto");

const textoDica =
    document.getElementById("textoDica");

const listaPalpites =
    document.getElementById("listaPalpites");

const novoJogo =
    document.getElementById("novoJogo");

const modal =
    document.getElementById("modal");

const textoVitoria =
    document.getElementById("textoVitoria");

const jogarNovamente =
    document.getElementById("jogarNovamente");

const tema =
    document.getElementById("tema");


// ===============================
// INICIAR JOGO
// ===============================

function iniciarJogo() {

    numeroSecreto =
        Math.floor(Math.random() * 100) + 1;

    tentativas = 0;

    palpites = [];

    tentativasTexto.textContent = "0";

    numeroTela.textContent = "?";

    mensagem.textContent =
        "Digite um número e comece o desafio!";

    textoDica.textContent =
        "O número está entre 1 e 100.";

    campoPalpite.value = "";

    listaPalpites.innerHTML =
        '<span class="vazio">Nenhum palpite ainda</span>';

    modal.classList.add("escondido");

    campoPalpite.focus();

}


// ===============================
// FAZER PALPITE
// ===============================

function fazerPalpite() {

    const palpite =
        Number(campoPalpite.value);


    // Verificar número inválido

    if (
        !Number.isInteger(palpite) ||
        palpite < 1 ||
        palpite > 100
    ) {

        mensagem.textContent =
            "⚠️ Digite um número entre 1 e 100.";

        campoPalpite.classList.add("erro");

        setTimeout(() => {

            campoPalpite.classList.remove("erro");

        }, 400);

        return;

    }


    // Contar tentativa

    tentativas++;

    tentativasTexto.textContent =
        tentativas;


    // Adicionar ao histórico

    palpites.push(palpite);

    adicionarPalpite(palpite);


    // ===============================
    // ACERTO
    // ===============================

    if (palpite === numeroSecreto) {

        numeroTela.textContent =
            numeroSecreto;

        numeroTela.classList.add("acerto");

        mensagem.textContent =
            "🎉 Parabéns! Você acertou!";

        textoDica.textContent =
            "Você encontrou o número secreto!";


        // Verificar recorde

        if (
            melhor === null ||
            tentativas < Number(melhor)
        ) {

            melhor = tentativas;

            localStorage.setItem(
                "melhor",
                melhor
            );

            melhorTexto.textContent =
                melhor;

        }


        textoVitoria.textContent =
            `O número era ${numeroSecreto}. ` +
            `Você acertou em ${tentativas} ` +
            `${tentativas === 1 ? "tentativa" : "tentativas"}!`;


        setTimeout(() => {

            modal.classList.remove("escondido");

        }, 500);


        return;

    }


    // ===============================
    // PALPITE MENOR
    // ===============================

    if (palpite < numeroSecreto) {

        mensagem.textContent =
            "🔼 Tente um número maior.";

    }


    // ===============================
    // PALPITE MAIOR
    // ===============================

    else {

        mensagem.textContent =
            "🔽 Tente um número menor.";

    }


    // ===============================
    // SISTEMA DE DICAS
    // ===============================

    const distancia =
        Math.abs(numeroSecreto - palpite);


    if (distancia <= 5) {

        textoDica.textContent =
            "🔥 Está muito perto!";

    }

    else if (distancia <= 15) {

        textoDica.textContent =
            "👀 Está chegando!";

    }

    else if (palpite < numeroSecreto) {

        textoDica.textContent =
            `O número é maior que ${palpite}.`;

    }

    else {

        textoDica.textContent =
            `O número é menor que ${palpite}.`;

    }


    campoPalpite.select();

}


// ===============================
// ADICIONAR PALPITE NA TELA
// ===============================

function adicionarPalpite(valor) {

    if (palpites.length === 1) {

        listaPalpites.innerHTML = "";

    }


    const elemento =
        document.createElement("span");


    elemento.classList.add("palpite");


    elemento.textContent =
        valor;


    listaPalpites.prepend(elemento);

}


// ===============================
// BOTÃO TENTAR
// ===============================

botao.addEventListener(
    "click",
    fazerPalpite
);


// ===============================
// ENTER NO TECLADO
// ===============================

campoPalpite.addEventListener(
    "keydown",
    function(evento) {

        if (evento.key === "Enter") {

            fazerPalpite();

        }

    }
);


// ===============================
// NOVO JOGO
// ===============================

novoJogo.addEventListener(
    "click",
    iniciarJogo
);


jogarNovamente.addEventListener(
    "click",
    iniciarJogo
);


// ===============================
// TEMA CLARO / ESCURO
// ===============================

tema.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "claro"
        );


        if (
            document.body.classList.contains("claro")
        ) {

            tema.textContent = "🌙";

        }

        else {

            tema.textContent = "☀️";

        }

    }
);


// ===============================
// COMEÇAR O JOGO
// ===============================

iniciarJogo();