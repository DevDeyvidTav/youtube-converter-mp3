# 🎵 YouTube MP3 Downloader API

API para conversão de vídeos do YouTube em arquivos MP3, organizados em pastas e armazenados no MinIO.

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework backend
- **yt-dlp** - Para baixar e converter vídeos do YouTube
- **MinIO** - Armazenamento de arquivos S3-like
- **Docker & Docker Compose** - Para gerenciar os serviços

---

## 🛠️ Instalação

### 1️⃣ **Clonar o Repositório**
```sh
git clone https://github.com/DevDeyvidTav/youtube-converter-mp3/
cd youtube-mp3-api
```
2️⃣ Configurar Dependências
```sh
npm install
```
3️⃣ Executar com Docker
```sh
docker-compose up --build
```
Isso iniciará:

A API NestJS rodando em http://localhost:3000
O MinIO para armazenamento de arquivos (http://localhost:9001)
📌 Endpoints da API
🔹 Baixar múltiplos vídeos e armazenar no MinIO

POST /youtube/convert-multiple
📥 Corpo da Requisição (JSON)

```sh
{
  "urls": [
    {
      "link": "https://www.youtube.com/watch?v=sIkIzcYpouA",
      "name": "Minha Musica Favorita"
    },
    {
      "link": "https://www.youtube.com/watch?v=VIDEO_ID_2",
      "name": "Outra Musica Legal"
    }
  ],
  "folderName": "minha-playlist"
}
```
📤 Resposta (JSON)
```json
{
  "success": true,
  "folder": "minha-playlist",
  "files": [
    {
      "name": "Minha Musica Favorita",
      "fileUrl": "http://localhost:9000/youtube-audio/minha-playlist/Minha_Musica_Favorita.mp3"
    },
    {
      "name": "Outra Musica Legal",
      "fileUrl": "http://localhost:9000/youtube-audio/minha-playlist/Outra_Musica_Legal.mp3"
    }
  ]
}
```
⚙️ Configuração do MinIO
Acessar a Interface Web

URL: http://localhost:9001
Usuário: admin
Senha: adminpassword
Verificar os arquivos
```sh
docker exec -it minio mc alias set myminio http://minio:9000 admin adminpassword
docker exec -it minio mc ls myminio/youtube-audio
```
🎯 Estrutura do Projeto
```ruby
Copiar
Editar
📦 youtube-mp3-api
 ┣ 📂 src
 ┃ ┣ 📂 youtube
 ┃ ┃ ┣ 📜 youtube.controller.ts  # Controlador da API
 ┃ ┃ ┣ 📜 youtube.service.ts      # Serviço de conversão
 ┃ ┃ ┗ 📜 youtube.module.ts       # Módulo NestJS
 ┃ ┣ 📂 minio
 ┃ ┃ ┣ 📜 minio.service.ts        # Serviço de upload para MinIO
 ┃ ┃ ┗ 📜 minio.module.ts         # Módulo MinIO
 ┃ ┗ 📜 main.ts                   # Arquivo principal do NestJS
 ┣ 📜 Dockerfile
 ┣ 📜 docker-compose.yml
 ┣ 📜 package.json
 ┗ 📜 README.md
```
🛠️ Desenvolvimento Local
Caso queira rodar localmente sem Docker:

```sh
# Iniciar a API
npm run start
Para instalar o yt-dlp no seu sistema:
```
```sh
pip install yt-dlp
```
📌 Contribuição
```ruby
Fork o repositório
Crie um branch (git checkout -b feature-nova)
Faça um commit (git commit -m 'Adiciona nova feature')
Push no branch (git push origin feature-nova)
Abra um Pull Request
```
📝 Licença
Este projeto é de código aberto sob a licença MIT.

💡 Desenvolvido por Deyvid Tavares 🚀
