// incluindo uma biblioteca
const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');


// definindo o ip e porta de onde o codigo ira rodar - definição de endereço - url
const hostname = '127.0.0.1'; // localhost
const port = 3000; // porta




// implementação da regra de negócio
const server = http.createServer((req, res) => {

    var  resposta; // se nao rodar trocar pra let 

    const urlparse = url.parse(req.url, true);
    // Receber informacoes do usuario
    const params = queryString.parse(urlparse.search);

  // criar usuario      -  Atualizar usuario 
    if(urlparse.pathname == '/criar-usuario') {

    // salvar as informacoes (em arquivo)    
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {

      console.log('Salvo!');
      resposta = "usuario criado/atualizado com sucesso";


      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });    


    }   
    // Selecionar usuario
    else if (urlparse.pathname == '/selecionar-usuario') {
      fs.readFile('users/' + params.id + '.txt', function(err, data) {
        resposta = data;
    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(resposta);

      });

    }
  // remover usuario
  else if (urlparse.pathname == '/remover-usuario') {
        fs.unlink('users/' + params.id + '.txt', function (err) {
 
        console.log('usuario deletado!');

        resposta = err ?  "usuario nao encontrado" : "usuario removido";

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);
      });
    };

  });

// execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});