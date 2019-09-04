#emotion classifier
A project to measure team emotions through text messaging on a communication channel.
First, he uses Discord, but our goal is includes Slack, Facebook Messenger, Whatsapp and anyothers.

# Steps
## 1 Install Application's Base Dependencies
- npm express
- npm nodemon -dev
- npm cors

## 2 Database
We use the NoSQL database, MongoDB. For this we use MongoDB cloud service called Atlas.
    Website: https://www.mongodb.com/cloud/atlas
    Doc: https://docs.atlas.mongodb.com/getting-started/

And to help us in the work of the model, we use the mongoose:
- mongoose npm

## 3 Machine Learning's services
In order classify the text messages sent by team, we use the Google's Machine Learning service, called AutoML Natural Language.
Our goal isn't to teach about this Google's service, so we recommend reading the service's doc:
    Doc: https://cloud.google.com/natural-language/automl/docs/quickstart

After you create and configure the Google project, you will need:
 - Project's ID;
 - Project's Zone;
 - Classifier's ID;
 - Access key

## Discord
To get text messages sent by "Discord", we have create and use Discord bot
    Doc: https://discordapp.com/developers/docs/topics/oauth2#bots



# Classificador de emoções (PT-BR)
Um projeto para medir as emoções da equipe por meio de mensagens de texto em um canal de comunicação.
Primeiro, ele usa o Discord, mas nosso objetivo é usar também: Slack, Facebook Messenger, Whatsapp e qualquer outro.

# Passos
## 1 Instalar as dependências base do aplicativo
- npm express
- npm nodemon -dev
- npm cors

## 2 Banco de dados
Usamos o banco de dados NoSQL, MongoDB. Para isso, usamos o serviço de nuvem MongoDB chamado Atlas.
Website: https://www.mongodb.com/cloud/atlas
Doc: https://docs.atlas.mongodb.com/getting-started/

E para nos ajudar no trabalho com as models, usamos o mongoose:
- mongoose npm

## 3 Serviços de Machine Learning
Para classificar as mensagens de texto enviadas pela equipe, usamos o serviço de aprendizagem de máquina do Google, chamado AutoML Natural Language.
Nosso objetivo não é ensinar sobre o serviço deste Google, por isso recomendamos a leitura da documentação do serviço:
Doc: https://cloud.google.com/natural-language/automl/docs/quickstart

Depois de criar e configurar o projeto do Google, você precisará de:
- ID do projeto;
- Zona do Projeto;
- ID do classificador;
- Chave de acesso

## Discord
Para receber as mensagens de texto enviadas por "Discord", criamos e usamos o Discord bot
Doc: https://discordapp.com/developers/docs/topics/oauth2#bots