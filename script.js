// ======================================================
// BASE DE DADOS DOS ESPECTADORES
// ======================================================

const bancoDeDados = [

  {
    horasPorDia: 8,
    idade: 22,
    generoFavorito: "anime",
    fimDeSemana: "sim",
    maratona: "alta",
    horario: "madrugada",
    perfil: "Maratonista"
  },

  {
    horasPorDia: 2,
    idade: 35,
    generoFavorito: "drama",
    fimDeSemana: "sim",
    maratona: "baixa",
    horario: "noite",
    perfil: "Casual"
  },

  {
    horasPorDia: 6,
    idade: 28,
    generoFavorito: "acao",
    fimDeSemana: "sim",
    maratona: "alta",
    horario: "noite",
    perfil: "Cinéfilo Hardcore"
  },

  {
    horasPorDia: 1,
    idade: 45,
    generoFavorito: "comedia",
    fimDeSemana: "nao",
    maratona: "baixa",
    horario: "tarde",
    perfil: "Usuário Econômico"
  }

];

// ======================================================
// TESTE INICIAL
// ======================================================

function classificarUsuario() {

  const usuario = {

    horasPorDia: Number(document.getElementById("horasPorDia").value),

    idade: Number(document.getElementById("idade").value),

    generoFavorito: document.getElementById("generoFavorito").value,

    fimDeSemana: document.getElementById("fimDeSemana").value,

    maratona: document.getElementById("maratona").value,

    horario: document.getElementById("horario").value
  };

  console.log(usuario);

  document.getElementById("resultado").innerHTML = `
  
    <h2>Usuário capturado com sucesso</h2>

    <p><strong>Horas por dia:</strong> ${usuario.horasPorDia}</p>

    <p><strong>Idade:</strong> ${usuario.idade}</p>

    <p><strong>Gênero favorito:</strong> ${usuario.generoFavorito}</p>

    <p><strong>Maratona:</strong> ${usuario.maratona}</p>

  `;
}