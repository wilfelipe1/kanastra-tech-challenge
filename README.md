# kanastra-tech-challenge

## Pré-requisitos
Antes de iniciar, você precisará ter instalado em sua máquina as seguintes ferramentas:
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

Certifique-se de que o Docker e o Docker Compose estão corretamente instalados executando os comandos:
```bash
docker --version
docker-compose --version
```

### Rodando a aplicação
Para iniciar a aplicação, siga estas etapas:

Clone o repositório:
```bash
git clone https://github.com/wilfelipe1/kanastra-tech-challenge.git
cd kanastra-tech-challenge
```

### Inicie os serviços:
```bash
docker-compose up
```
Esse comando irá construir (caso seja necessário) e iniciar todos os serviços definidos no arquivo docker-compose.yml. Se desejar rodar em background, você pode adicionar a flag -d:
```bash
docker-compose up -d
```
### Acessando a aplicação
A aplicação estará disponível em [http://localhost:8000](http://localhost:8000).

## Funcionamento
### Visão Geral
![Animação](https://github.com/wilfelipe1/kanastra-tech-challenge/assets/111328615/d2e680cf-40c7-4f66-b87a-e14de5d29a4c)
A aplicação é projetada para ser simples de usar, ela permite aos usuários interagir com as features de upload, listagem e download de arquivos.

### Feature de Upload
A funcionalidade de upload permite aos usuários enviar arquivos diretamente para um bucket S3. Optei por utilizar o Amazon S3 devido à sua alta escalabilidade, confiabilidade e velocidade. O S3 nos permite gerenciar grandes volumes de dados sem comprometer o desempenho da aplicação, o que acredito ser uma excelete opção para casos de arquivo com grande volume de dados.

### Listagem de arquivos
No backend, implementei uma funcionalidade para listar os arquivos importados, a listagem é feita por meio de uma API que consulta em uma tabela do Postgres para recuperar metadados dos arquivos, como nome, tamanho e data de modificação, oferecendo uma visão detalhada e atualizada do conteúdo armazenado.

### Download do arquivo
Para o download de arquivos, o backend gera uma URL assinada temporariamente pelo S3, proporcionando um método seguro e direto para o usuário baixar o arquivo necessário.

### Envio de boletos (E-mails)
![emails](https://github.com/wilfelipe1/kanastra-tech-challenge/assets/111328615/3ff6ee95-1c1c-4d86-84e3-c22e481ba6dc)
Para o envio de boletos por e-mail, implementei um sistema de processamento assíncrono utilizando o Celery. Essa abordagem permite que a aplicação não seja bloqueada enquanto os e-mails estão sendo preparados e enviados, o que melhora a escalabilidade e a performance do sistema.

A validação dos envios pode ser testada acessando o endpoint: [http://localhost:5000](http://localhost:5000)

#### Diagrama
![Diagrama sem nome drawio (3)](https://github.com/wilfelipe1/kanastra-tech-challenge/assets/111328615/9960cd6b-1176-469c-b5ed-f17e875f21dc)


## Testes Automatizados
### Frontend

Para o frontend, utilizamos o Jest para os testes automatizados. Os testes podem ser executados com o seguinte comando:

```bash
yarn test
```
Esses testes garantem que os componentes do frontend funcionem conforme esperado e ajudam a identificar problemas antes do deploy.

<img width="461" alt="frontend-test" src="https://github.com/wilfelipe1/kanastra-tech-challenge/assets/111328615/0c8722aa-3dde-46e4-9938-39a2ca471245">

### Backend
No backend, os testes são realizados utilizando o framework de testes do Django. Para executar os testes, use o comando:

```bash
python manage.py test
```
Estes testes ajudam a garantir que as APIs e outras funcionalidades do backend operem corretamente e sem erros, proporcionando uma base sólida para a aplicação.
