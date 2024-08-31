# Documentación de la API

## Endpoints

### 1. Crear un Producto

**URL Normal:** `localhost:4000/productos`

**Método:** `POST`

**Descripción:** Endpoint para crear un nuevo producto.

**Parámetros de solicitud:**

```json
{
    "nombre": "Pastel del día del Niño",
    "categoriaId": 3,
    "ocasion": "Dia del Niño",
    "precio": "35",
    "imagen1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMWE2PHElNz94NDwzwIywmsDbv2_VKp82xA&s",
    "imagen2": null,
    "imagen3": null,
    "detalles": "Pastel delicioso de chocolate",
    "relleno_id": 2,
    "masa_id": 1,
    "sabor_galleta_id": null,
    "cobertura_id": 1,
    "tipo_chocolate_id": null
}

```
**Respuestas:**

- 200 OK: Producto creado con éxito.
- 400 Bad Request: Error en los datos proporcionados.

### 2. Leer Productos
**Método:** `GET`

- **Todos los Productos**

    **URL:** `localhost:4000/productos`
  
- **Todos los Productos con Límite**

   **URL:** `localhost:4000/productos/{limite}`


- **Todos los Productos de Cierta Categoría**

    **URL:** `localhost:4000/productos/categoria/{categoria_id}`
    
- **Todos los Productos de Cierta Categoría con Límite**

   **URL:** `localhost:4000/productos/categoria/{categoria_id}/{limite}`

- **Todos los Productos de Cierta Ocasión**

    **URL:** `localhost:4000/productos/ocasion/{ocasion_id}`
    
- **Todos los Productos de Cierta Ocasión con Límite**

   **URL:** `localhost:4000/productos/ocasion/{ocasion_id}/{limite}`

- **Producto por ID**

    **URL:** `localhost:4000/productos/{id}`

------------------
### Editar Productos

**URL:** `localhost:4000/productos/{id}`

**Método:** `PUT`

**Descripción:** Endpoint para modificar un producto.

**Parámetros de solicitud:**

```json

{
    "nombre": "Pastel del día del Niño",
    "CategoriaID": 1,
    "OcasionID": 2,
    "precio": 40.00,
    "imagen1": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMWE2PHElNz94NDwzwIywmsDbv2_VKp82xA&s",
    "imagen2": null,
    "imagen3": null,
    "RellenoID": 2,
    "MasaID": 2,
    "Sabor_GalletaID": null,
    "coberturaID": 1,
    "Tipo_ChocolateID": null
}

```
