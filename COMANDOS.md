# 🛠️ Comandos Útiles - Third Wave Retiro

## 📦 Instalación y Setup

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Verificar configuración
bash check-setup.sh
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
# http://localhost:5173

# Iniciar con puerto específico
npm run dev -- --port 3000

# Iniciar y abrir automáticamente
npm run dev -- --open
```

## 🔨 Build y Preview

```bash
# Compilar para producción
npm run build

# Preview del build
npm run preview

# Limpiar y rebuild
rm -rf dist && npm run build
```

## 🚀 Despliegue

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login en Vercel
vercel login

# Desplegar (primera vez)
vercel

# Desplegar a producción
vercel --prod

# Ver logs de producción
vercel logs
```

## 🔍 Debugging

```bash
# Ver errores de TypeScript
npx tsc --noEmit

# Ver errores de ESLint (si está configurado)
npx eslint src/

# Limpiar caché de Vite
rm -rf node_modules/.vite
```

## 🗄️ Firebase

```bash
# Instalar Firebase CLI (opcional)
npm install -g firebase-tools

# Login en Firebase
firebase login

# Ver proyectos
firebase projects:list

# Desplegar reglas de Firestore
firebase deploy --only firestore:rules
```

## 📊 Análisis

```bash
# Ver tamaño del bundle
npm run build
ls -lh dist/assets/

# Analizar dependencias
npx vite-bundle-visualizer
```

## 🧹 Mantenimiento

```bash
# Actualizar dependencias
npm update

# Ver dependencias desactualizadas
npm outdated

# Auditar seguridad
npm audit

# Arreglar vulnerabilidades
npm audit fix
```

## 🔐 Seguridad

```bash
# Verificar que .env no esté en git
git status

# Ver archivos ignorados
cat .gitignore

# Remover .env de git (si se subió por error)
git rm --cached .env
git commit -m "Remove .env from git"
```

## 📱 Testing en Dispositivos

```bash
# Obtener IP local (Windows)
ipconfig

# Obtener IP local (Mac/Linux)
ifconfig | grep "inet "

# Iniciar servidor accesible en red local
npm run dev -- --host

# Acceder desde móvil
# http://[TU_IP]:5173
```

## 🎨 Personalización

```bash
# Cambiar colores en Tailwind
# Editar: tailwind.config.js

# Cambiar nombre de la app
# Editar: package.json, index.html, manifest.json

# Cambiar contraseña admin
# Editar: src/pages/Admin.tsx línea 21
```

## 📄 Exportación de Datos

```bash
# Exportar desde Firebase Console
# 1. Ir a Firestore Database
# 2. Seleccionar colección "registros"
# 3. Clic en "..." > "Export collection"

# O usar Firebase CLI
firebase firestore:export gs://[BUCKET]/backups
```

## 🔄 Git Workflow

```bash
# Inicializar repositorio
git init
git add .
git commit -m "Initial commit"

# Conectar con GitHub
git remote add origin [URL]
git push -u origin main

# Crear rama de desarrollo
git checkout -b develop

# Merge a main
git checkout main
git merge develop
git push
```

## 🆘 Solución de Problemas

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Limpiar caché de npm
npm cache clean --force

# Verificar versión de Node
node --version  # Debe ser 18+

# Verificar versión de npm
npm --version

# Reiniciar servidor con caché limpio
rm -rf node_modules/.vite && npm run dev
```

## 📊 Monitoreo en Producción

```bash
# Ver logs de Vercel
vercel logs [URL_PROYECTO]

# Ver analytics de Firebase
# Firebase Console > Analytics

# Ver uso de Firestore
# Firebase Console > Firestore > Usage
```

## 🎯 Comandos Rápidos

```bash
# Setup completo desde cero
npm install && cp .env.example .env && npm run dev

# Build y deploy
npm run build && vercel --prod

# Backup de registros (manual)
# Ir a Firebase Console > Exportar colección
```

---

## 📚 Recursos Útiles

- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com
- **Firebase Docs:** https://firebase.google.com/docs
- **Vercel Docs:** https://vercel.com/docs

---

**Tip:** Guarda este archivo como referencia rápida durante el desarrollo.
