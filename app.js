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
      if (err) throw err;
      console.log('Salvo!');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });    
    resposta = "usuario criado com sucesso";

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


  // Selecionar usuario




  // remover usuario


});



// execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



// http://localhost:3000/criar-usuario?nome=affonso&idade=39&id=1
// http://localhost:3000/selecionar-usuario?id=1