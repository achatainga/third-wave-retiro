# ✅ Checklist de Configuración y Despliegue

## 📋 Pre-requisitos
- [ ] Node.js 18+ instalado
- [ ] Cuenta de Google (para Firebase)
- [ ] Cuenta de Vercel (opcional, para despliegue)

---

## 🔥 Configuración Firebase (15 minutos)

### Paso 1: Crear Proyecto
- [ ] Ir a https://console.firebase.google.com
- [ ] Clic en "Agregar proyecto"
- [ ] Nombre: `third-wave-retiro`
- [ ] Desactivar Google Analytics (opcional)
- [ ] Clic en "Crear proyecto"

### Paso 2: Habilitar Firestore
- [ ] En el menú lateral, ir a "Firestore Database"
- [ ] Clic en "Crear base de datos"
- [ ] Seleccionar "Modo de producción"
- [ ] Ubicación: `us-east1` (o la más cercana)
- [ ] Clic en "Habilitar"

### Paso 3: Configurar Reglas de Seguridad
- [ ] En Firestore, ir a pestaña "Reglas"
- [ ] Copiar contenido de `firestore.rules`
- [ ] Pegar en el editor
- [ ] Clic en "Publicar"

### Paso 4: Obtener Credenciales
- [ ] Ir a "Configuración del proyecto" (ícono engranaje)
- [ ] Scroll hasta "Tus apps"
- [ ] Clic en ícono `</>`  (Web)
- [ ] Nombre de la app: `Third Wave Web`
- [ ] NO marcar "Firebase Hosting"
- [ ] Clic en "Registrar app"
- [ ] Copiar el objeto `firebaseConfig`

---

## ⚙️ Configuración Local (5 minutos)

### Paso 5: Variables de Entorno
- [ ] Copiar archivo: `cp .env.example .env`
- [ ] Abrir `.env` en editor
- [ ] Pegar valores de `firebaseConfig`:
  ```
  VITE_FIREBASE_API_KEY=AIza...
  VITE_FIREBASE_AUTH_DOMAIN=third-wave-retiro.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=third-wave-retiro
  VITE_FIREBASE_STORAGE_BUCKET=third-wave-retiro.appspot.com
  VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
  VITE_FIREBASE_APP_ID=1:123456789:web:abc123
  ```
- [ ] Guardar archivo

### Paso 6: Cambiar Contraseña Admin
- [ ] Abrir `src/pages/Admin.tsx`
- [ ] Línea 21: Cambiar `ThirdWave2024` por tu contraseña
- [ ] Guardar archivo

---

## 🧪 Pruebas Locales (10 minutos)

### Paso 7: Iniciar Servidor
- [ ] Abrir terminal en `C:\code\third-wave-retiro`
- [ ] Ejecutar: `npm run dev`
- [ ] Abrir navegador: http://localhost:5173

### Paso 8: Probar Registro
- [ ] Completar formulario de registro
- [ ] Clic en "Registrarme"
- [ ] Verificar mensaje de éxito
- [ ] Ir a Firebase Console > Firestore
- [ ] Verificar que aparezca el registro en colección `registros`

### Paso 9: Probar Panel Admin
- [ ] Ir a http://localhost:5173/admin
- [ ] Ingresar contraseña configurada
- [ ] Verificar que aparezca el registro
- [ ] Verificar estadísticas (Total: 1)
- [ ] Clic en "Exportar PDF"
- [ ] Verificar que descargue el PDF

### Paso 10: Probar en Móvil
- [ ] Obtener IP local: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)
- [ ] En móvil, abrir: `http://[TU_IP]:5173`
- [ ] Probar registro desde móvil
- [ ] Verificar diseño responsive

---

## 🚀 Despliegue a Vercel (10 minutos)

### Paso 11: Preparar Repositorio Git
- [ ] Ejecutar: `git init`
- [ ] Ejecutar: `git add .`
- [ ] Ejecutar: `git commit -m "Initial commit"`
- [ ] Crear repo en GitHub
- [ ] Ejecutar: `git remote add origin [URL_REPO]`
- [ ] Ejecutar: `git push -u origin main`

### Paso 12: Desplegar en Vercel
- [ ] Ir a https://vercel.com
- [ ] Clic en "Import Project"
- [ ] Seleccionar repositorio de GitHub
- [ ] Framework Preset: Vite
- [ ] Agregar variables de entorno (copiar de `.env`):
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
- [ ] Clic en "Deploy"
- [ ] Esperar 2-3 minutos

### Paso 13: Verificar Despliegue
- [ ] Abrir URL de Vercel
- [ ] Probar registro
- [ ] Probar panel admin
- [ ] Probar exportación PDF
- [ ] Probar desde móvil

---

## 📱 Configuración PWA (Opcional, 15 minutos)

### Paso 14: Crear Iconos
- [ ] Crear icono 512x512px (logo Third Wave)
- [ ] Guardar como `public/icon-512.png`
- [ ] Crear versión 192x192px
- [ ] Guardar como `public/icon-192.png`
- [ ] Rebuild y redeploy

### Paso 15: Probar Instalación
- [ ] Abrir app en móvil (Chrome/Safari)
- [ ] Buscar opción "Agregar a pantalla de inicio"
- [ ] Instalar app
- [ ] Abrir desde icono en pantalla de inicio
- [ ] Verificar que funcione como app nativa

---

## 🎉 Finalización

### Paso 16: Documentar
- [ ] Anotar URL de producción
- [ ] Anotar contraseña admin
- [ ] Compartir URL con equipo
- [ ] Capacitar a administradores

### Paso 17: Monitoreo
- [ ] Verificar registros en Firestore diariamente
- [ ] Exportar PDF de respaldo semanal
- [ ] Revisar errores en Vercel Dashboard

---

## 🆘 Troubleshooting

**Error: Firebase not configured**
- Verificar que `.env` tenga todas las variables
- Verificar que variables estén en Vercel
- Reiniciar servidor de desarrollo

**No aparecen registros en admin**
- Verificar reglas de Firestore
- Abrir consola del navegador (F12)
- Verificar errores en Network tab

**PDF no descarga**
- Probar en otro navegador
- Verificar que haya registros
- Revisar consola de errores

**App no se instala en móvil**
- Verificar que sea HTTPS (Vercel lo hace automático)
- Verificar que existan iconos en `/public`
- Probar en Chrome (mejor soporte PWA)

---

## 📞 Contacto

Para soporte técnico, contactar al equipo de desarrollo.

**¡Éxito con el retiro Third Wave! 🎉**
