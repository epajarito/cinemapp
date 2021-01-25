# Cinemapp

Cinemapp es un administrador de peliculas y horarios.

## Instalación

Usar composer para instalar dependencias de Laravel

```bash
composer install
```

## Crear archivo .env
```bash
cp .env.example .env
```

## Ejecutar el siguiente comando para generar secret key el paquete de JWT
```bash
php artisan jwt:secret
```
## Generar enlace simbolico
```bash
php artisan storage:link
```
## Configurar base de datos (en este caso usa Mysql)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=cinemapp
DB_USERNAME=tu-usuario
DB_PASSWORD=tu-contraseña
```

## Ejecutar migraciones
```bash
php artisan migrate --seed #se genera tablas con datos ficticios
```
## Instalación de dependencias para el frontend
```bash
yarn install 
o
npm install
```
## Compilación de assets
```bash
yarn dev
o
npm run dev
```

## Levantar proyecto en local
```bash
php artisan serve --port=8081
```
acceder con las siguientes credenciales
```bash
email: admin@admin.com
password: password
```
