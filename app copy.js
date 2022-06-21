// incluindo uma biblioteca
const http = require('http');
const url = require('url');
const queryString = require('query-string');

// definindo o ip e porta de onde o codigo ira rodar - definição de endereço - url
const hostname = '127.0.0.1'; // localhost
const port = 3000; // porta




// implementação da regra de negócio
const server = http.createServer((req, res) => {

// pegar pergunta na url

const params = queryString.parse(url.parse(req.url, true).search);


// verificar pergunta eescolher uma resposta
    let resposta;

    if (params.pergunta == 'melhor-filme') {
        resposta = "Star Wars"
        // console.log("Star Wars");

    } else  if (params.pergunta == 'melhor-tecnologia') {
        resposta = "NODEJS"
        // console.log("NODEJS");

    } else {
        // console.log(" só vale Sar Wars, mais nada!!! ");
        resposta = "só vale Sar Wars, mais nada!!!"
    };


// retornar a resposta escolhida

res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);
});



// execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
