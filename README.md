# cakes-by-naty 🍰

**Cakes by Naty** es una tienda de postres en línea donde los usuarios pueden explorar, personalizar y pedir deliciosos postres. Este proyecto incluye tres partes principales:

* Una tienda en línea para los clientes.
* Una interfaz administrativa para la gestión de productos, pedidos y usuarios.
* Funcionalidades específicas como la personalización de postres.

## Tecnologías utilizadas
* **Frontend**: Next.js, Tailwind CSS
* **Backend**: Express.js
* **Base de datos**: PostgreSQL
* **Contenedores**: Docker & Docker Compose
* **Otros**: Storybook para componentes, Triggers SQL para actualizaciones automáticas

## Estructura del proyecto
```csharp
cakes-by-naty/
├── api/                 # Backend con Express.js  
├── frontend/            # Aplicación frontend en Next.js  
├── db/                  # Configuración y scripts de base de datos  
├── docker-compose.yml   # Configuración de Docker Compose  
└── README.md            # Este archivo  
```

## 🚀 Cómo levantar la aplicación con Docker Compose
1. Prerrequisitos
   - Tener instalado Docker Desktop
2. Clonar el repositorio
   ```bash
    git clone https://github.com/tuusuario/cakes-by-naty.git
    cd cakes-by-naty
    ```
3. Configurar las variables de entorno
   Crear un archivo `.env` en la raíz proyecto con las siguientes variables:
   ```env
   POSTGRES_USER=tu_usuario
   POSTGRES_PASSWORD=tu_contraseña
   POSTGRES_DB=cakes_db
   DATABASE_URL=postgres://tu_usuario:tu_contraseña@db:5432/cakes_db
   PORT=4000
   ```
4. 📂 Estructura de Docker Compose
   Crear un archivo `docker-compose.yml`
```yaml
   services:
  app:
    build:
      context: ./frontend
    restart: always
    ports:
      - 3000:3000
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: npm run dev
    depends_on:
      - server

  db:
    build:
      context: ./database
    restart: always
    ports:
      - 5432:5432
    command: postgres -c config_file=/etc/postgresql.conf
    environment:
      POSTGRES_PASSWORD: tu_contraseña
      POSTGRES_USER: tu_usuario
      POSTGRES_DB: cakes_db
    volumes:
      - ./database/db-definition.sql:/docker-entrypoint-initdb.d/db-definition.sql
      - ./database/db-definition.sql:/database/db-definition.sql
      - ./database/db-definition:/database/db-definition/
      - ./database/postgresql.conf:/etc/postgresql.conf


  server:
    build:
      context: ./server
    restart: always
    ports:
      - 4000:4000
    volumes:
      - ./server:/app
      - /app/node_modules
    command: npm run dev
    depends_on:
      - db

  adminer:
    image: adminer
    restart: always
    ports:
      - 9000:8080

volumes:
  appvolume:
  ```
6. Construir y levantar los contenedores
      ```bash
    docker-compose up --build
    ```
   Esto levantará:
    * Frontend: Disponible en http://localhost:3000
    * Backend/API: Disponible en http://localhost:4000
    * Base de datos PostgreSQL: En el puerto 5432
7. Acceder a la aplicación
   Una vez que los servicios estén activos:
     * Dirigirse a [http://localhost:4000/api-docs](http://localhost:3000/) para acceder a la página principal.
     * Dirigirse a [http://localhost:4000/api-docs](http://localhost:4000/api-docs) para acceder a la documentación de la API
     
8. Apagar los contenedores
   ```bash
   docker-compose stop
   ```

