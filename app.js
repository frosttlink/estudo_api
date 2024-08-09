import express from "express";

const server = express();

server.use(express.json());

server.post("/treino/leituraLivro", (req, resp) => {
  let livroNome = req.body.livroNome;
  let paginas = Number(req.body.paginas);
  let tempoPagina = Number(req.body.tempoPagina);

  let calc = ((tempoPagina * paginas) / 3600).toFixed(2);
  if (
    !livroNome ||
    isNaN(paginas) ||
    isNaN(tempoPagina) ||
    !paginas ||
    !tempoPagina
  ) {
    resp.status(400).send({
      erro: "String",
    });
  } else {
    resp.send({
      livroNome: livroNome,
      totalEmHoras: Number(calc),
    });
  }
});

server.get("/treino/combinacoesCores", (req, resp) => {
  let cor1 = req.query.cor1;
  let cor2 = req.query.cor2;

  if (
    (cor1 != "vermelho" && cor1 != "azul" && cor1 != "amarelo") ||
    (cor2 != "vermelho" && cor2 != "azul" && cor2 != "amarelo")
  ) {
    resp.status(400).send({
      erro: "String",
    });
  }

  if (cor1 == "vermelho" && cor2 == "azul") {
    resp.send({
      corResultante: "roxo",
    });
  }
});

server.post("/treino/cinema/validacao", (req, resp) => {
  let idadePessoa1 = req.body.idadePessoa1;
  let idadePessoa2 = req.body.idadePessoa2;
  let classificacao = req.body.classificacao;
  let podemAssistir = false;

  if (classificacao == "Livre") {
    podemAssistir = true;
  } else if (classificacao == 12 && idadePessoa1 >= 12 && idadePessoa2 >= 12) {
    podemAssistir = true;
  } else if (classificacao == 14 && idadePessoa1 >= 14 && idadePessoa2 >= 14) {
    podemAssistir = true;
  } else if (classificacao == 16 && idadePessoa1 >= 16 && idadePessoa2 >= 16) {
    podemAssistir = true;
  } else if (classificacao == 18 && idadePessoa1 >= 18 && idadePessoa2 >= 18) {
    podemAssistir = true;
  }
  resp.send({
    podemAssistir: podemAssistir,
  });

  if (isNaN(idadePessoa1) && isNaN(idadePessoa2) && !classificacao) {
    resp.status(400).send({
      erro: "String",
    });
  }
});

server.get("/treino/tabuada/:numero", (req, resp) => {
  let n1 = req.params.numero;

  let tabuada = [];

  for (let i = 0; i <= 10; i++) {
    tabuada[i] = i * n1;
  }

  resp.send({
    numeroInformado: Number(n1),
    tabuada: tabuada,
  });
});

server.post("/treino/ordenacao", (req, resp) => {
  let numeros = req.body.numeros;
  let temOrdemdecre = true;
  let temOrdemcres = true;

  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] < numeros[i + 1]) {
      temOrdemdecre = false;
    } else if (numeros[i] > numeros[i + 1]) {
      temOrdemcres = false;
    }
  }


  if (temOrdemdecre == false && temOrdemcres == false) {
    resp.send({
      numeros: numeros,
      ordem: "esta desodernado",
    });
  } else if (temOrdemdecre == true) {
    resp.send({
      numeros: numeros,
      ordem: "esta decrescente",
    });
  } else if(temOrdemcres == true) {
    resp.send({
      numeros: numeros,
      ordem: "esta crescente",
    });
  }

});

server.listen(5050, () => console.log("Subiu na porta 5050"));
