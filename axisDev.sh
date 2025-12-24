#!/bin/bash

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo -e "${BLUE}========================================"
echo -e "   AXIS - MODO DESENVOLVIMENTO"
echo -e "========================================${NC}"
echo -e "${YELLOW}Diretório do projeto: ${PROJECT_DIR}${NC}\n"

echo -e "${YELLOW}[1/5] Parando containers desnecessários (backend, frontend, nginx)...${NC}"
docker-compose stop backend frontend nginx 2>/dev/null || true
echo -e "${GREEN}✓ Containers parados${NC}"

echo -e "\n${YELLOW}[2/5] Verificando PostgreSQL...${NC}"
if docker ps | grep -q axis_db; then
    echo -e "${GREEN}✓ PostgreSQL rodando (axis_db)${NC}"
else
    echo -e "${YELLOW}   Iniciando PostgreSQL...${NC}"
    docker-compose up -d db
    echo -e "${YELLOW}   Aguardando PostgreSQL inicializar (15s)...${NC}"
    sleep 15
    echo -e "${GREEN}✓ PostgreSQL iniciado${NC}"
fi

echo -e "\n${YELLOW}[3/5] Limpando processos nativos antigos...${NC}"
pkill -f "spring-boot:run" 2>/dev/null || true
pkill -f "next-server" 2>/dev/null || true
pkill -f "next dev" 2>/dev/null || true
sleep 2
echo -e "${GREEN}✓ Processos limpos${NC}"

mkdir -p "$PROJECT_DIR/logs"

echo -e "\n${YELLOW}[4/5] Iniciando Backend (Spring Boot - Maven)...${NC}"
cd "$PROJECT_DIR"
echo -e "${YELLOW}   Diretório: $PROJECT_DIR${NC}"
echo -e "${YELLOW}   Comando: mvn spring-boot:run -Dspring-boot.run.profiles=dev${NC}"
echo -e "${YELLOW}   Log: $PROJECT_DIR/logs/backend-dev.log${NC}"

nohup mvn spring-boot:run -Dspring-boot.run.profiles=dev > logs/backend-dev.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$PROJECT_DIR/logs/backend-dev.pid"

echo -e "${GREEN}✓ Backend iniciado (PID: $BACKEND_PID)${NC}"
echo -e "${GREEN}   URL: http://localhost:8080${NC}"
echo -e "${GREEN}   Swagger: http://localhost:8080/swagger-ui.html${NC}"

echo -e "${YELLOW}   Aguardando backend inicializar (20s)...${NC}"
sleep 20

echo -e "\n${YELLOW}[5/5] Iniciando Frontend (Next.js)...${NC}"
cd "$PROJECT_DIR/axios-frontend"
echo -e "${YELLOW}   Diretório: $PROJECT_DIR/axios-frontend${NC}"
echo -e "${YELLOW}   Comando: npm run dev${NC}"
echo -e "${YELLOW}   Log: $PROJECT_DIR/logs/frontend-dev.log${NC}"

nohup npm run dev > ../logs/frontend-dev.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > "$PROJECT_DIR/logs/frontend-dev.pid"

echo -e "${GREEN}✓ Frontend iniciado (PID: $FRONTEND_PID)${NC}"
echo -e "${GREEN}   URL: http://localhost:3000${NC}"

echo -e "\n${GREEN}========================================"
echo -e "   AXIS - DESENVOLVIMENTO ATIVO"
echo -e "========================================${NC}"
echo -e "${GREEN}✓ PostgreSQL:  Docker (axis_db)${NC}"
echo -e "${GREEN}✓ Backend:     Nativo (PID: $BACKEND_PID)${NC}"
echo -e "${GREEN}✓ Frontend:    Nativo (PID: $FRONTEND_PID)${NC}"
echo -e "${GREEN}✗ Nginx:       Desativado${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${BLUE}Acesse o sistema:${NC}"
echo -e "${BLUE}  Frontend:  http://localhost:3000${NC}"
echo -e "${BLUE}  Backend:   http://localhost:8080${NC}"
echo -e "${BLUE}  Swagger:   http://localhost:8080/swagger-ui.html${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}Hot Reload:${NC}"
echo -e "${YELLOW}  Backend:  Altere arquivos .java (recompila auto)${NC}"
echo -e "${YELLOW}  Frontend: Altere arquivos .tsx/.ts (atualiza auto)${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${RED}Para parar: ./stopAxisDev.sh${NC}"
echo -e "${YELLOW}Ver logs:${NC}"
echo -e "${YELLOW}  tail -f logs/backend-dev.log${NC}"
echo -e "${YELLOW}  tail -f logs/frontend-dev.log${NC}"
