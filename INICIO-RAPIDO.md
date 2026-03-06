# 🚀 Inicio Rápido - Third Wave Retiro

## Pasos para poner en marcha

### 1️⃣ Configurar Firebase (5 minutos)

1. Ve a https://console.firebase.google.com
2. Crea un nuevo proyecto llamado "third-wave-retiro"
3. Habilita **Firestore Database**:
   - Modo: Producción
   - Ubicación: us-east1 (o la más cercana)
4. Ve a **Configuración del proyecto** > **Tus apps** > **Web**
5. Copia las credenciales

### 2️⃣ Configurar variables de entorno

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env y pega tus credenciales de Firebase
```

### 3️⃣ Configurar reglas de Firestore

En Firebase Console > Firestore Database > Reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /registros/{document} {
      allow create: if true;
      allow read: if true;
    }
  }
}
```

### 4️⃣ Iniciar desarrollo

```bash
npm run dev
```

Abre: http://localhost:5173

### 5️⃣ Probar la app

1. **Registro público:** http://localhost:5173
   - Completa el formulario
   - Verifica que se guarde en Firestore

2. **Panel admin:** http://localhost:5173/admin
   - Contraseña: `ThirdWave2024`
   - Verifica que aparezca el registro
   - Prueba exportar PDF

### 6️⃣ Desplegar a Vercel

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel

# Configurar variables de entorno en Vercel Dashboard
```

## ⚠️ Antes de producción

- [ ] Cambiar contraseña admin en `src/pages/Admin.tsx`
- [ ] Ajustar reglas de Firestore para mayor seguridad
- [ ] Agregar iconos PWA en `/public` (icon-192.png, icon-512.png)
- [ ] Probar en móvil

## 🆘 Problemas comunes

**Error: Firebase not configured**
- Verifica que `.env` tenga todas las variables
- Reinicia el servidor de desarrollo

**No aparecen registros en admin**
- Verifica que Firestore esté habilitado
- Revisa las reglas de seguridad
- Abre la consola del navegador para ver errores

**PDF no descarga**
- Verifica que haya registros
- Prueba en otro navegador

## 📞 Contacto

Para soporte técnico, contacta al equipo de desarrollo.
