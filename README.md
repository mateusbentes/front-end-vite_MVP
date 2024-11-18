# Meu Front-End

Front-end do MVP **Bloco de Notas**

O objetivo aqui é criar um aplicativo web de bloco de notas que consulte, adicione, edite e delete as notas.

---
## Como executar

É necessário instalar o nodejs npm. No Ubuntu pode ser instalar através dos comandos:

```
$ sudo apt update
$ sudo apt install nodejs npm
```

No diretório raiz do projeto digite:

```
$ npm install
```

para instalar dependências do projeto, e

```
$ npm run build
```

para compilar o projeto para produção. Para rodar como ambiente de desenvolvimento digite o comando:

```
$ npm run dev
```

Para rodar a simulação de um servidor com express (opcional, apenas use se não utilizar o backend) para Node.js digite o comando, ele cria o arquivo notas.json:

```
$ node server.js
```

Lembre-se que quando rodar o server.js o arquivo notas.json deve ter permissão de ecrita, então deve ser interrompido o processo e ser colocada a permisão como:

```
$ chmod 666 notas.json
```

e depois rodar de novo o servidor:

```
$ node server.js
```

Abra [http://localhost:3000](http://localhost:3000) para ver no seu navegador.

Link do Figma: https://www.figma.com/proto/cNQuLQHLDOdu3XN9OzXqc4?node-id=0-1&t=vy18oWF0I0KV0xZQ-6