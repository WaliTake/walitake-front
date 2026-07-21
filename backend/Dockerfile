FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expone el puerto 8000
EXPOSE 8000

# Asegura que exista el directorio data si no se mapea uno externo
RUN mkdir -p /app/data

# Corre Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
