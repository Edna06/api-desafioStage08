
Trata-se de uma aplicação em Node.js onde o usuário cadastra um filme, preenche com algumas informações (nome, descrição, nota) e cria tags relacionadas a ele.

O diagrama abaixo é a representação das tabelas e seus campos, que a aplicação possui:
![image](https://user-images.githubusercontent.com/102126245/223179447-78d46776-f6f1-4267-8413-06d3c91b99d0.png)

* Foram adicionados:
- Criptografia de senhas;
- Validação de e-mail;
- Aplicação do cascade para garantir que uma tag será excluída caso o usuário opte por excluir a nota.
