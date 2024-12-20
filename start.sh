#!/bin/bash

# Função para tentar conectar ao banco de dados
wait_for_db() {
    echo "Waiting for database..."
    max_attempts=30
    counter=0
    
    while [ $counter -lt $max_attempts ]; do
        if pg_isready -h escritor-db -p 5432 -U postgres; then
            echo "Database is up - executing command"
            return 0
        fi
        counter=$((counter + 1))
        echo "Database is unavailable - attempt $counter of $max_attempts - sleeping"
        sleep 5
    done
    
    echo "Could not connect to database after $max_attempts attempts"
    return 1
}

# Esperar pelo banco de dados
wait_for_db

# Se o banco de dados não estiver disponível após todas as tentativas, sair
if [ $? -ne 0 ]; then
    echo "Failed to connect to database. Exiting."
    exit 1
fi

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
