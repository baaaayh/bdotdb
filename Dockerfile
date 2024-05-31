# Node.js 20버전 이미지 사용
FROM node:20-bullseye

# 작업 디렉토리 설정
WORKDIR /app

# 종속성 설치
COPY package*.json ./
RUN npm install -g yarn --force
RUN yarn 

# 소스 복사 및 빌드
COPY . .
RUN yarn build

# 80번 포트 노출 및 애플리케이션 실행
EXPOSE 80
CMD ["yarn", "dev"]