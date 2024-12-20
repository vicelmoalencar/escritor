#!/bin/bash

# Função para tentar conectar ao banco de dados
wait_for_db() {
    echo "Waiting for database..."
    while ! curl -s http://escritor-db:5432 >/dev/null; do
        echo "Database is unavailable - sleeping"
        sleep 2
    done
    echo "Database is up - executing command"
}

# Esperar pelo banco de dados
wait_for_db

# Iniciar a aplicação com retry
max_retries=5
retry_count=0

while [ $retry_count -lt $max_retries ]; do
    if uvicorn app.main:app --host 0.0.0.0 --port 8000; then
        break
    fi
    
    echo "Application crashed, retrying in 5 seconds..."
    retry_count=$((retry_count + 1))
    sleep 5
done

if [ $retry_count -eq $max_retries ]; then
    echo "Failed to start application after $max_retries attempts"
    exit 1
fi
