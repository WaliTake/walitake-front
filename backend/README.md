# EcoResiduos Backend API

Backend construido con Python, FastAPI y SQLite para la plataforma EcoResiduos.

## Requisitos

- Python 3.10+
- (Recomendado) Entorno virtual (`venv`)

## Instalación

1. Crear y activar el entorno virtual:
   ```bash
   python -m venv .venv
   
   # En Windows:
   .venv\Scripts\activate
   # En macOS/Linux:
   source .venv/bin/activate
   ```

2. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

## Base de Datos (SQLite)

Para poblar la base de datos con los datos mock iniciales (categorías, usuarios, negocios y residuos):

```bash
python seed.py
```

Esto generará el archivo `eco.db` en la carpeta `backend/`.

## Ejecutar el servidor

Para iniciar la API en modo desarrollo:

```bash
uvicorn main:app --reload
```

El servidor estará disponible en [http://127.0.0.1:8000](http://127.0.0.1:8000).

Puedes ver la documentación interactiva (Swagger UI) en:
[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Estructura

- `main.py`: Punto de entrada de FastAPI y rutas (endpoints).
- `database.py`: Configuración de SQLAlchemy y SQLite.
- `models.py`: Modelos ORM de base de datos.
- `schemas.py`: Modelos Pydantic para validación de datos (Input/Output).
- `seed.py`: Script para inicializar datos.
