# Use a imagem base do Node.js
FROM node:18.4.0-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Clone o repositório usando git
RUN apk add --no-cache git && \
    git clone https://github.com/Webck-Tecnologia/bchatwebsit.git .

# Instale as dependências do projeto
RUN yarn install

# Execute o comando de build do Gatsby
RUN yarn run build

# Expõe a porta 2271 para acesso externo
EXPOSE 2271

# Comando para iniciar o servidor Gatsby
CMD ["yarn", "serve", "-H", "0.0.0.0"]
