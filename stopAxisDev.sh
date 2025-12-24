#!/bin/bash

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo -e "${BLUE}========================================"
echo -e "   Parando AXIS - MODO DEV"
echo -e "========================================${NC}\n"

if [ -f "$PROJECT_DIR/logs/backend-dev.pid" ]; then
    BACKEND_PID=$(cat "$PROJECT_DIR/logs/backend-dev.pid")
    echo -e "${YELLOW}[1/3] Parando Backend (PID: $BACKEND_PID)...${NC}"
    kill $BACKEND_PID 2>/dev/null && echo -e "${GREEN}✓ Backend parado${NC}" || echo -e "${RED}✗ Backend já estava parado${NC}"
    rm -f "$PROJECT_DIR/logs/backend-dev.pid"
else
    echo -e "${YELLOW}[1/3] Backend não estava rodando (PID não encontrado)${NC}"
fi

if [ -f "$PROJECT_DIR/logs/frontend-dev.pid" ]; then
    FRONTEND_PID=$(cat "$PROJECT_DIR/logs/frontend-dev.pid")
    echo -e "\n${YELLOW}[2/3] Parando Frontend (PID: $FRONTEND_PID)...${NC}"
    kill $FRONTEND_PID 2>/dev/null && echo -e "${GREEN}✓ Frontend parado${NC}" || echo -e "${RED}✗ Frontend já estava parado${NC}"
    rm -f "$PROJECT_DIR/logs/frontend-dev.pid"
else
    echo -e "\n${YELLOW}[2/3] Frontend não estava rodando (PID não encontrado)${NC}"
fi

echo -e "\n${YELLOW}[3/3] Limpando processos remanescentes...${NC}"
pkill -f "spring-boot:run" 2>/dev/null && echo -e "${GREEN}✓ Processos Spring Boot limpos${NC}" || echo -e "${YELLOW}  (Nenhum processo Spring Boot encontrado)${NC}"
pkill -f "next-server" 2>/dev/null && echo -e "${GREEN}✓ Processos Next.js limpos${NC}" || echo -e "${YELLOW}  (Nenhum processo Next.js encontrado)${NC}"
pkill -f "next dev" 2>/dev/null || true

echo -e "\n${GREEN}========================================"
echo -e "   AXIS - MODO DEV PARADO"
echo -e "========================================${NC}"
echo -e "${GREEN}✓ Backend:     Parado${NC}"
echo -e "${GREEN}✓ Frontend:    Parado${NC}"
echo -e "${BLUE}✓ PostgreSQL:  Mantido rodando (axis_db)${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${YELLOW}Para iniciar novamente: ./axisDev.sh${NC}"
echo -e "${RED}Para parar PostgreSQL: docker-compose stop db${NC}"
