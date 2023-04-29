
Trata-se de uma aplicação em Node.js onde o usuário cadastra um filme, preenche com algumas informações (nome, descrição, nota) e cria tags relacionadas a ele.

O diagrama abaixo é a representação das tabelas e seus campos, que a aplicação possui:
![image](https://user-images.githubusercontent.com/102126245/223179447-78d46776-f6f1-4267-8413-06d3c91b99d0.png)

* Foram adicionados:
- Criptografia de senhas;
- Validação de e-mail;
- Aplicação do cascade para garantir que uma tag será excluída caso o usuário opte por excluir a nota.

## Como rodar

```
npm i
```

```
npm run migrate
```

```
npm run dev
```
---
## 🎨 Veja o [Fron-end](https://github.com/Edna06/rocketmovies) 
---

## Foi utilizado:
- Node.js
- Express
- SQLite
- Knex.js
- Autenticação;
- JWT;
- Middlewares;
- Upload de imagens;
- API Restful;
- Cors;
- Deploy e utilização do render;


## Autor

[@ednamaria](https://www.linkedin.com/in/edna-maria-farias-moreira-51b35176/)
