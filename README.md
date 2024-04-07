# countive

A simple web application to manage personal budget

## Run dev build

```bash
git clone https://github.com/pmasior/countive.git
cd countive/dev
nano .env
docker compose build
docker compose up
```

## Run prod build

```bash
git clone https://github.com/pmasior/countive.git
cd countive/prod
nano .env
docker compose build
docker compose up
```

## Update dependencies

```bash
git clone https://github.com/pmasior/countive.git
cd countive/application
docker run \
  -it --rm \
  -v ./package.json:/app/package.json \
  -v ./package-lock.json:/app/package-lock.json \
  --workdir /app \
  node:18 npm install
```
