#!/bin/bash

echo "🔍 Verificando configuración de Third Wave Retiro..."
echo ""

# Verificar .env
if [ ! -f .env ]; then
    echo "❌ Archivo .env no encontrado"
    echo "   Copia .env.example a .env y configura tus credenciales"
    exit 1
else
    echo "✅ Archivo .env encontrado"
fi

# Verificar variables de Firebase
if grep -q "tu_api_key_aqui" .env 2>/dev/null; then
    echo "⚠️  Variables de Firebase no configuradas en .env"
    echo "   Edita .env con tus credenciales reales"
    exit 1
else
    echo "✅ Variables de Firebase configuradas"
fi

# Verificar node_modules
if [ ! -d node_modules ]; then
    echo "⚠️  Dependencias no instaladas"
    echo "   Ejecuta: npm install"
    exit 1
else
    echo "✅ Dependencias instaladas"
fi

echo ""
echo "✅ Todo listo para desarrollo"
echo ""
echo "Comandos disponibles:"
echo "  npm run dev      - Iniciar servidor de desarrollo"
echo "  npm run build    - Compilar para producción"
echo "  vercel           - Desplegar a Vercel"
echo ""
