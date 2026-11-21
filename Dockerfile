# syntax=docker/dockerfile:1
# Imagem da UI: o Vite gera os estáticos e o nginx os serve. O nginx também faz proxy de
# /bff para o BFF na mesma origem (o papel do proxy do Vite em dev), para o cookie de sessão
# funcionar sem CORS. O destino vem da env BFF_URL (padrão: o serviço "bff" do compose).

FROM node:24-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
ENV BFF_URL=http://bff:3000
# A imagem oficial passa os templates pelo envsubst na subida (só as envs definidas).
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
