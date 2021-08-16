
# WA Project

Este projeto é uma API REST que foi feita como avaliação para teste de entrevista a pedido da [WA Project](https://www.waproject.com.br).
O projeto executa todas as funções requeridas. Foi desenvolvido para rodar em `container` então com uma configuração adicional ela pode ser entregue em um orquestrador de container como swarm ou kubernetes. Há uma versão de demonstração que foi entregue em ambiente da Heroku: https://wa-project-demo.herokuapp.com/


## Installation

Para instalar o projeto em sua máquina local você precisa ter **Docker Compose**

```bash
  git clone git@github.com:diegoBSousa/wa-project.git
  cd wa-project
  copy .env.example .env
  docker-compose up -d
```
    
## Author

- [Github](https://github.com/diegobsousa)
- [Linkedin](https://www.linkedin.com/in/diegobritosousa/)

  
## Roadmap

- Deve ser usada linguagem Javascript e princípios REST.

- Criar Entidade `Laboratório` com atributos `nome`, `endereço`, `status`

- Criar Entidade `Exame` com atributos `nome`, `tipo`, `status`

- Criar Relacionamento de `muitos para muitos` entre Laboratório e Entidade, de modo que um exame possa estar vinculado a mais de um laboratório, e vice versa.

- Para apagar um registro deve ser usado `softdelete`, ou seja, deve apenas ser registrarda a data de deleção, mas o registro mantido no banco de dados.

- Devem ser criadas rotas para `importação`, `atualização` e `deleção` em *lote* tanto para *laboratório* quanto para *exame*.

- Deve ser criado filtro por nome nas rotas de listagem de laboratório e exame.

- A listagem de laboratório deve trazer consigo uma lista de exames disponíveis naquele laboratório.

- A listagem de exame deve trazer consigo uma lista de laboratórios onde o mesmo está disponível.

  
## API Reference

- Os parâmetros que não são especificados para irem na `URL` devem ser enviados em formado **JSON**.

#### Registra Usuário

```http
  POST /user/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`    | `string` | **Required**. nome do usuário |
| `password`| `string` | **Required**. senha de autenticação |
| `email`   | `string` | **Required**. email que será usado para logar |

#### Faz Login
 e recebe um Bearer Token que será utilizado para autorizar acesso aos outros endpoints nas outras requisições abaixo.

```http
  POST /login/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`   | `string` | **Required**. email que será usado para logar |
| `password`| `string` | **Required**. senha de autenticação |

#### Cria Laboratório

```http
  POST /laboratory/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nome`    | `string` | **Required**. Nome do laboratório |
| `endereco_linha_1`      | `string` | **Required**. Primeira linha do endereço do laboratório |
| `endereco_linha_2`      | `string` | Segunda linha do endereço do laboratório |
| `endereco_linha_3`      | `string` | Terceira linha do endereço do laboratório |
| `status`      | `string` | status pode ser `ativo` ou `inativo` |

#### Listar Laboratório

```http
  GET /laboratory/?nome=asf
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nome`      | `string` | Serve para filtrar por nome, é insensível à caixa. |

#### Atualiza Laboratório

```http
  PUT /laboratory/${id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o laboratório a ser atualizado|
| `nome`    | `string` | Nome do laboratório |
| `endereco_linha_1`      | `string` | **Required**. Primeira linha do endereço do laboratório |
| `endereco_linha_2`      | `string` | Segunda linha do endereço do laboratório |
| `endereco_linha_3`      | `string` | Terceira linha do endereço do laboratório |
| `status`      | `string` | status pode ser `ativo` ou `inativo` |


#### Apaga Laboratório

```http
  DELETE /laboratory/${id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o laboratório a ser apagado|

#### Cria Exame

```http
  POST /exam/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nome`    | `string` | **Required**. Nome do laboratório |
| `tipo`      | `string` | **Required**. Pode ser `analise_clinica` ou `imagem` |
| `status`      | `string` | status pode ser `ativo` ou `inativo` |

#### Listar Exames

```http
  GET /exam/?nome=asf
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nome`      | `string` | Serve para filtrar por nome, é insensível à caixa. |

#### Atualiza Exame

```http
  PUT /exam/${id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o exame a ser atualizado|
| `nome`    | `string` | Nome do laboratório |
| `tipo`      | `string` | Pode ser `analise_clinica` ou `imagem` |
| `status`      | `string` | status pode ser `ativo` ou `inativo` |


#### Apaga Exame

```http
  DELETE /exam/${id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o exame a ser apagado|


#### Cria Associação Entre Exame e Laboratório

```http
  POST /association/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `laboratory_uuid`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o laboratório a ser associado|
| `exam_uuid`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o exame a ser associado|

#### Apaga Associação Entre Exame e Laboratório

```http
  DELETE /association/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `laboratory_uuid`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o laboratório a ser desassociado|
| `exam_uuid`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o exame a ser desassociado|

#### Importa Exames em Lote

```http
  POST /batch/exam/
```
- Deve ser enviado um arquivo `CSV` dentro de um formulário `multipart/form-data`
- O campo do formulário que contém o arquivo deve se chamar `file`
- o arquivo csv deve ter as seguintes colunas abaixo:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nome`    | `string` | **Required**. Nome do exame |
| `tipo`      | `string` | **Required**. Pode ser `analise_clinica` ou `imagem` |
| `status`      | `string` | Pode ser `ativo` ou `inativo`, se não for enviado a sua posição na coluna deve ficar vazia em espaços|


#### Atualiza Exames em Lote

```http
  PUT /batch/exam/
```
- Deve ser enviado um arquivo `CSV` dentro de um formulário `multipart/form-data`
- O campo do formulário que contém o arquivo deve se chamar `file`
- o arquivo csv deve ter as seguintes colunas abaixo:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o exame a ser atualizado|
| `nome`    | `string` | Nome do exame, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `tipo`      | `string` | Pode ser `analise_clinica` ou `imagem`, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `status`      | `string` | Pode ser `ativo` ou `inativo`, se não for enviado a sua posição na coluna deve ficar vazia em espaços|

#### Apaga Exames em Lote

```http
  DELETE /batch/exam/
```
- Deve ser enviado um arquivo `CSV` dentro de um formulário `multipart/form-data`
- O campo do formulário que contém o arquivo deve se chamar `file`
- o arquivo csv deve ter as seguintes colunas abaixo:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o exame a ser apagado|
| `nome`    | `string` | Nome do exame, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `tipo`      | `string` | Pode ser `analise_clinica` ou `imagem`, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `status`      | `string` | Pode ser `ativo` ou `inativo`, se não for enviado a sua posição na coluna deve ficar vazia em espaços|

#### Importa Laboratórios em Lote

```http
  POST /batch/laboratory/
```
- Deve ser enviado um arquivo `CSV` dentro de um formulário `multipart/form-data`
- O campo do formulário que contém o arquivo deve se chamar `file`
- o arquivo csv deve ter as seguintes colunas abaixo:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `nome`    | `string` | **Required**. Nome do laboratório |
| `endereco_linha_1`      | `string` | **Required**. Primeira linha do endereço do laboratório |
| `endereco_linha_2`      | `string` | Segunda linha do endereço do laboratório |
| `endereco_linha_3`      | `string` | Terceira linha do endereço do laboratório |
| `status`      | `string` | Pode ser `ativo` ou `inativo` |

#### Atualiza Laboratórios em Lote

```http
  PUT /batch/laboratory/
```
- Deve ser enviado um arquivo `CSV` dentro de um formulário `multipart/form-data`
- O campo do formulário que contém o arquivo deve se chamar `file`
- o arquivo csv deve ter as seguintes colunas abaixo:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o exame a ser atualizado|
| `nome`    | `string` | Nome do laboratório, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `endereco_linha_1`      | `string` | Primeira linha do endereço do laboratório, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `endereco_linha_2`      | `string` | Segunda linha do endereço do laboratório, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `endereco_linha_3`      | `string` | Terceira linha do endereço do laboratório, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `status`      | `string` | Pode ser `ativo` ou `inativo`, se não for enviado a sua posição na coluna deve ficar vazia em espaços|

#### Apaga Laboratórios em Lote

```http
  DELETE /batch/laboratory/
```
- Deve ser enviado um arquivo `CSV` dentro de um formulário `multipart/form-data`
- O campo do formulário que contém o arquivo deve se chamar `file`
- o arquivo csv deve ter as seguintes colunas abaixo:
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `uuid`      | `string` | **Required**. Do tipo UUIDv4, serve para identificar o exame a ser atualizado|
| `nome`    | `string` | Nome do laboratório, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `endereco_linha_1`      | `string` | Primeira linha do endereço do laboratório, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `endereco_linha_2`      | `string` | Segunda linha do endereço do laboratório, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `endereco_linha_3`      | `string` | Terceira linha do endereço do laboratório, se não for enviado a sua posição na coluna deve ficar vazia em espaços|
| `status`      | `string` | Pode ser `ativo` ou `inativo`, se não for enviado a sua posição na coluna deve ficar vazia em espaços|

## Appendix

### Todo - coisas que ainda farei para refinar o código conforme for surgindo tempo
- Refinar a parte de envio em lote, dar tratamento aos espaços entre as vírgulas.
- Aplicar paginação nos retornos da API.
- Criar um passo adicional na esteira do GitHub para fazer o build da aplicação e a aplicação chegar pronta para entrega no Heroku
- Implementar os testes unitários

  