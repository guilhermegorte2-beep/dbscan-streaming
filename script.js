// ======================================================
// BANCO DE DADOS
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
    horasPorDia: 7,
    idade: 20,
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
    horasPorDia: 1,
    idade: 40,
    generoFavorito: "comedia",
    fimDeSemana: "nao",
    maratona: "baixa",
    horario: "tarde",
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
    horasPorDia: 5,
    idade: 30,
    generoFavorito: "acao",
    fimDeSemana: "sim",
    maratona: "media",
    horario: "noite",
    perfil: "Cinéfilo Hardcore"
  },

  {
    horasPorDia: 1,
    idade: 50,
    generoFavorito: "drama",
    fimDeSemana: "nao",
    maratona: "baixa",
    horario: "manha",
    perfil: "Usuário Econômico"
  }

];

// ======================================================
// CODIFICAÇÕES
// ======================================================

function codificarGenero(valor) {

  if (valor === "acao") return 0;
  if (valor === "terror") return 1;
  if (valor === "comedia") return 2;
  if (valor === "anime") return 3;
  if (valor === "drama") return 4;

}

function codificarFimDeSemana(valor) {

  if (valor === "nao") return 0;
  if (valor === "sim") return 1;

}

function codificarMaratona(valor) {

  if (valor === "baixa") return 0;
  if (valor === "media") return 1;
  if (valor === "alta") return 2;

}

function codificarHorario(valor) {

  if (valor === "manha") return 0;
  if (valor === "tarde") return 1;
  if (valor === "noite") return 2;
  if (valor === "madrugada") return 3;

}

// ======================================================
// NORMALIZAÇÃO
// ======================================================

function normalizarUsuario(usuario) {

  return [

    usuario.horasPorDia / 10,
    usuario.idade / 100,
    codificarGenero(usuario.generoFavorito) / 4,
    codificarFimDeSemana(usuario.fimDeSemana),
    codificarMaratona(usuario.maratona) / 2,
    codificarHorario(usuario.horario) / 3

  ];

}

// ======================================================
// DISTÂNCIA EUCLIDIANA
// ======================================================

function distancia(a, b) {

  let soma = 0;

  for (let i = 0; i < a.length; i++) {

    soma += Math.pow(a[i] - b[i], 2);

  }

  return Math.sqrt(soma);

}

// ======================================================
// DBSCAN
// ======================================================

function dbscan(dados, eps, minPts) {

  const grupos = [];

  const visitado = new Array(dados.length).fill(false);

  const grupoDoPonto = new Array(dados.length).fill(-1);

  function encontrarVizinhos(indice) {

    const vizinhos = [];

    for (let i = 0; i < dados.length; i++) {

      if (distancia(dados[indice], dados[i]) <= eps) {

        vizinhos.push(i);

      }

    }

    return vizinhos;

  }

  function expandirGrupo(indice, vizinhos, grupoAtual) {

    grupos[grupoAtual].push(indice);

    grupoDoPonto[indice] = grupoAtual;

    for (let i = 0; i < vizinhos.length; i++) {

      const vizinho = vizinhos[i];

      if (!visitado[vizinho]) {

        visitado[vizinho] = true;

        const novosVizinhos = encontrarVizinhos(vizinho);

        if (novosVizinhos.length >= minPts) {

          vizinhos = vizinhos.concat(novosVizinhos);

        }

      }

      if (grupoDoPonto[vizinho] === -1) {

        grupos[grupoAtual].push(vizinho);

        grupoDoPonto[vizinho] = grupoAtual;

      }

    }

  }

  for (let i = 0; i < dados.length; i++) {

    if (visitado[i]) continue;

    visitado[i] = true;

    const vizinhos = encontrarVizinhos(i);

    if (vizinhos.length >= minPts) {

      const grupoAtual = grupos.length;

      grupos.push([]);

      expandirGrupo(i, vizinhos, grupoAtual);

    }

  }

  return { grupos, grupoDoPonto };

}

// ======================================================
// PERFIL MAIS COMUM
// ======================================================

function perfilMaisComum(indices) {

  const contagem = {};

  indices.forEach(i => {

    const perfil = bancoDeDados[i].perfil;

    contagem[perfil] = (contagem[perfil] || 0) + 1;

  });

  let perfilFinal = "";

  let maior = 0;

  for (let perfil in contagem) {

    if (contagem[perfil] > maior) {

      maior = contagem[perfil];

      perfilFinal = perfil;

    }

  }

  return perfilFinal;

}

// ======================================================
// RECOMENDAÇÃO
// ======================================================

function recomendacao(perfil) {

  if (perfil === "Maratonista") {

    return "Recomendar séries longas e lançamentos.";

  }

  if (perfil === "Casual") {

    return "Recomendar filmes curtos e conteúdos leves.";

  }

  if (perfil === "Cinéfilo Hardcore") {

    return "Recomendar conteúdos premium e coleções.";

  }

  if (perfil === "Usuário Econômico") {

    return "Oferecer planos básicos e conteúdo popular.";

  }

  return "Usuário fora do padrão.";

}

// ======================================================
// CLASSIFICAR USUÁRIO
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

  const dadosNormalizados = bancoDeDados.map(normalizarUsuario);

  const usuarioNormalizado = normalizarUsuario(usuario);

  const todosOsDados = [...dadosNormalizados, usuarioNormalizado];

  const resultado = dbscan(todosOsDados, 0.5, 2);

  const indiceNovoUsuario = todosOsDados.length - 1;

  const grupoUsuario = resultado.grupoDoPonto[indiceNovoUsuario];

  let perfil;

  if (grupoUsuario === -1) {

    perfil = "Usuário fora do padrão";

  } else {

    const indicesGrupo = resultado.grupos[grupoUsuario]
      .filter(i => i !== indiceNovoUsuario);

    perfil = perfilMaisComum(indicesGrupo);

  }

  const dica = recomendacao(perfil);

  document.getElementById("resultado").innerHTML = `

    <h2>Resultado da IA</h2>

    <p><strong>Perfil identificado:</strong> ${perfil}</p>

    <p><strong>Recomendação:</strong> ${dica}</p>

    <p><strong>Grupo DBSCAN:</strong>
    ${grupoUsuario === -1 ? "Outlier" : grupoUsuario}</p>

  `;

}