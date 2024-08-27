# Use uma imagem oficial do Node.js como base
FROM node:18

# Defina as variáveis de ambiente durante o build
ARG REACT_APP_API_URL
ARG REACT_APP_API_PORT

# Passe as variáveis de ambiente para o processo de build do React
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_API_PORT=$REACT_APP_API_PORT

# Defina o diretório de trabalho para o front-end
WORKDIR /app

# Copie o arquivo package.json e package-lock.json do front-end
COPY package*.json ./

COPY . .

# Instale as dependências do front-end
RUN npm install

# Compile o código do front-end
RUN npm run build

# Use uma imagem de servidor web para servir os arquivos estáticos
FROM nginx:stable-alpine

# Copie os arquivos buildados para o diretório padrão do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponha a porta 80 do container para servir a aplicação
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
