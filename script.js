var palavra = ["alegria", "tristeza", "raiva", "sono", "felicidade", "hostilidade", "medo", "empatia", "afeto", "confiança", "surpresa", "confuso", "cachorro", "gato", "pardau", "avestruz", "elefante", "girafa", "tucano", "baleia", "flamingo", "jaguar", "lagarto", "queixada", "saveiro", "gol", "ranger", "golf", "civic", "corolla", "hillux", "fiorino", "parati", "jetta", "alagoinhas", "esplanada", "joinville", "blumenau", "pelotas", "farroupilha", "queimados", "paracambi", "guarulhos", "sorocaba", "betim", "contagem", "caruaru", "garanhuns", "itabaianhinha", "laranjeiras", "engenharia", "medicina", "direito", "fisioterapia", "contabilidade", "pedagogia", "marketing", "gastronomia", "facebook", "instagram", "twitter", "linkedin", "youtube", "discord", "tiktok", "tumbler", "snapchat"];

var menuSection = document.querySelector('.menu-section');
var gameSection = document.querySelector('.game-section');
var newWordSection = document.querySelector('.new-word-section');
var palavraSecreta = palavra[Math.floor(Math.random() * palavra.length)];
var letrasErradas = [];
var letrasCorretas = [];

var actualPage = menuSection;

function goToGamePage() {
    actualPage.classList.add('hide');
    gameSection.classList.remove('hide');

    actualPage = gameSection;
}

function goToNewWordPage() {
    actualPage.classList.add('hide');
    newWordSection.classList.remove('hide');

    actualPage = newWordSection;
}

function returnToMenu() {
    actualPage.classList.add('hide');
    menuSection.classList.remove('hide');

    actualPage = menuSection;
}

document.addEventListener("keydown", (evento) => {
  var codigo = evento.keyCode; // 65 - 90 (intervalo)
  if (isLetra(codigo)) {
    const letra = evento.key;
    if (letrasErradas.includes(letra)) {
      mostrarAvisoLetraRepetida();
    } else {
      if (palavraSecreta.includes(letra)) {
        letrasCorretas.push(letra);
      } else {
        letrasErradas.push(letra);
      }
    }
    atualizarJogo();
  }
});

function atualizarJogo() {
  mostrarLetrasErradas();
  mostrarLetrasCertas();
  desenharForca();
  checarJogo();
}

function mostrarLetrasErradas() {
  var div = document.querySelector(".letras-erradas-container");
  div.innerHTML = "<h3>Letras erradas</h3>";
  letrasErradas.forEach((letra) => {
    div.innerHTML += `<span>${letra}</span>`;
  });
}

function mostrarLetrasCertas() {
  var container = document.querySelector(".palavra-secreta-container");
  container.innerHTML = "";
  palavraSecreta.split("").forEach((letra) => {
    if (letrasCorretas.includes(letra)) {
      container.innerHTML += `<span>${letra}</span>`;
    } else {
      container.innerHTML += `<span>_</span>`;
    }
  });
}

function checarJogo() {
  let mensagem = "";
  const container = document.querySelector(".palavra-secreta-container");
  const partesCorpo = document.querySelectorAll(".forca-parte");

  if (letrasErradas.length === partesCorpo.length) {
    mensagem = "Fim de jogo! Você perdeu!";
  }

  if (palavraSecreta === container.innerText) {
    mensagem = "Parabéns! Você ganhou!";
  }

  if (mensagem) {
    document.querySelector("#mensagem").innerHTML = mensagem;
    document.querySelector(".popup-container").style.display = "flex";
  }
}

function desenharForca() {
  const partesCorpo = document.querySelectorAll(".forca-parte");
  for (let i = 0; i < letrasErradas.length; i++) {
    partesCorpo[i].style.display = "block";
  }
}

function mostrarAvisoLetraRepetida() {
  const aviso = document.querySelector(".aviso-palavra-repetida");
  aviso.classList.add("show");
  setTimeout(() => {
    aviso.classList.remove("show");
  }, 1000);
}

function isLetra(codigo) {
  return codigo >= 65 && codigo <= 90;
}

function reiniciarJogo() {
  window.location.reload();
}

function adcionarPalavra() {
  var palavraInput = document.getElementById("palavraInput")
  novaPalavra = palavraInput.value.toLowerCase();

  palavraInput.value = " "
  palavra.push(novaPalavra)
}


