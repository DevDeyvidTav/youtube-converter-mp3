# Usa uma imagem Node.js otimizada para build
FROM node:20-alpine as builder

WORKDIR /app

# Instala dependências do sistema operacional
RUN apk add --no-cache \
  bash \
  curl \
  ffmpeg \
  python3 \
  py3-pip \
  yt-dlp \
  git \
  build-base

# Confirma se o yt-dlp foi instalado corretamente
RUN yt-dlp --version

# Instala o NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install --production
RUN npm install --save-dev @types/node

# Copia o restante do código
COPY . .

# Compila a aplicação NestJS
RUN nest build

# Usa uma imagem menor para rodar a aplicação
FROM node:20-alpine

WORKDIR /app

# 🔴 Instala novamente as dependências do sistema operacional no container final
RUN apk add --no-cache \
  bash \
  curl \
  ffmpeg \
  python3 \
  py3-pip \
  yt-dlp

# Copia os arquivos do builder para o container final
COPY --from=builder /app /app

# Instala apenas as dependências de produção
RUN npm install --production

# Expor a porta da API
EXPOSE 3000

CMD ["node", "dist/main.js"]
