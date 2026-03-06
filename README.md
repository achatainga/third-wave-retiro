# Third Wave Retiro

PWA para registro de participantes del retiro Third Wave - Alcance Victoria.

## 🚀 Características

- ✅ Formulario público de registro
- ✅ Panel de administración protegido
- ✅ Exportación a PDF
- ✅ Base de datos Firebase Firestore
- ✅ Progressive Web App (PWA)
- ✅ Responsive design

## 📋 Requisitos

- Node.js 18+
- Cuenta de Firebase

## 🔧 Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Firebase

1. Crear proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilitar Firestore Database
3. Copiar credenciales del proyecto
4. Crear archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

5. Completar las variables en `.env` con tus credenciales de Firebase

### 3. Configurar Firestore

En Firebase Console:
- Ir a Firestore Database
- Crear colección `registros`
- Configurar reglas de seguridad:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registros/{document} {
      allow read, write: if true; // Cambiar en producción
    }
  }
}
```

## 🏃 Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173)

## 📦 Build

```bash
npm run build
```

## 🌐 Despliegue en Vercel

### Opción 1: Desde la terminal

```bash
npm install -g vercel
vercel
```

### Opción 2: Desde GitHub

1. Push a GitHub
2. Importar en [Vercel](https://vercel.com)
3. Configurar variables de entorno en Vercel:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

## 🔐 Acceso Admin

**URL:** `/admin`  
**Contraseña por defecto:** `ThirdWave2024`

⚠️ **IMPORTANTE:** Cambiar la contraseña en `src/pages/Admin.tsx` línea 21 antes de desplegar a producción.

## 📊 Campos del Formulario

- **Nombre y Apellido** (requerido)
- **Fecha de Nacimiento** (requerido)
- **Teléfono** (requerido)
- **Tipo** (requerido):
  - NewGen
  - HighSchool
  - Gang
  - Gang Adulto

## 🎨 Personalización

### Colores

Editar `tailwind.config.js` para cambiar la paleta de colores.

### Logo/Iconos PWA

Reemplazar archivos en `/public`:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

## 📱 PWA

La app se puede instalar en dispositivos móviles como una app nativa.

## 🛠️ Stack Tecnológico

- **Frontend:** React + TypeScript
- **Routing:** React Router
- **Estilos:** Tailwind CSS
- **Base de datos:** Firebase Firestore
- **PDF:** jsPDF + jsPDF-AutoTable
- **Build:** Vite
- **PWA:** vite-plugin-pwa

## 📄 Licencia

Uso interno - Alcance Victoria
