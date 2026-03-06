# 📚 Índice de Documentación - Third Wave Retiro

Bienvenido al proyecto **Third Wave Retiro**. Esta es tu guía para navegar toda la documentación.

---

## 🚀 Para Empezar

1. **[INICIO-RAPIDO.md](INICIO-RAPIDO.md)** ⭐
   - Guía de 5 minutos para poner en marcha el proyecto
   - Ideal para comenzar rápidamente

2. **[CHECKLIST.md](CHECKLIST.md)** ✅
   - Lista completa paso a paso
   - Desde configuración hasta despliegue
   - Incluye troubleshooting

---

## 📖 Documentación Técnica

3. **[README.md](README.md)** 📄
   - Documentación completa del proyecto
   - Características, stack tecnológico
   - Instrucciones de instalación y despliegue

4. **[RESUMEN-PROYECTO.md](RESUMEN-PROYECTO.md)** 📊
   - Visión general del proyecto
   - Estructura de archivos
   - Tecnologías utilizadas
   - Campos de base de datos

---

## 🛠️ Herramientas y Comandos

5. **[COMANDOS.md](COMANDOS.md)** 💻
   - Todos los comandos útiles
   - Desarrollo, build, despliegue
   - Debugging y mantenimiento

6. **[check-setup.sh](check-setup.sh)** 🔍
   - Script de verificación
   - Valida configuración antes de iniciar

---

## 🔥 Configuración Firebase

7. **[firestore.rules](firestore.rules)** 🔐
   - Reglas de seguridad de Firestore
   - Listas para copiar/pegar en Firebase Console

8. **[.env.example](.env.example)** ⚙️
   - Template de variables de entorno
   - Copiar a `.env` y completar con credenciales

---

## 📁 Estructura del Código

```
src/
├── pages/
│   ├── Registro.tsx      # Formulario público de registro
│   └── Admin.tsx          # Panel de administración
├── lib/
│   └── firebase.ts        # Configuración de Firebase
├── App.tsx                # Router principal
├── main.tsx               # Entry point
└── index.css              # Estilos Tailwind
```

---

## 🎯 Flujo de Trabajo Recomendado

### Primera Vez
1. Leer **INICIO-RAPIDO.md**
2. Seguir **CHECKLIST.md** paso a paso
3. Consultar **COMANDOS.md** según necesites

### Desarrollo Diario
1. `npm run dev` para iniciar
2. Consultar **COMANDOS.md** para tareas específicas
3. Revisar **README.md** para dudas técnicas

### Antes de Desplegar
1. Verificar **CHECKLIST.md** sección "Antes de producción"
2. Ejecutar `check-setup.sh`
3. Seguir pasos de despliegue en **CHECKLIST.md**

---

## 🆘 ¿Necesitas Ayuda?

**Problema con configuración inicial:**
→ Ver **INICIO-RAPIDO.md** sección "Problemas comunes"

**Error durante desarrollo:**
→ Ver **COMANDOS.md** sección "Solución de Problemas"

**Duda sobre funcionalidad:**
→ Ver **RESUMEN-PROYECTO.md** sección "Características"

**Comando específico:**
→ Ver **COMANDOS.md** con Ctrl+F

---

## 📊 Información Rápida

| Aspecto | Detalle |
|---------|---------|
| **Puerto dev** | 5173 |
| **Contraseña admin** | ThirdWave2024 (cambiar en producción) |
| **Base de datos** | Firebase Firestore |
| **Colección** | `registros` |
| **Hosting** | Vercel |
| **Framework** | React + Vite |

---

## 🎨 Personalización

**Cambiar colores:**
- Editar `tailwind.config.js`
- Ver **RESUMEN-PROYECTO.md** sección "Paleta de Colores"

**Cambiar textos:**
- Editar `src/pages/Registro.tsx`
- Editar `src/pages/Admin.tsx`

**Cambiar contraseña admin:**
- Editar `src/pages/Admin.tsx` línea 21

**Agregar campos al formulario:**
1. Actualizar interface en `Admin.tsx`
2. Agregar campo en `Registro.tsx`
3. Actualizar exportación PDF en `Admin.tsx`

---

## 📞 Contacto

Para soporte técnico o consultas, contactar al equipo de desarrollo.

---

## ✅ Checklist Rápido

- [ ] Leí INICIO-RAPIDO.md
- [ ] Configuré Firebase
- [ ] Creé archivo .env
- [ ] Probé localmente
- [ ] Cambié contraseña admin
- [ ] Desplegué a Vercel
- [ ] Probé en producción

---

**¡Éxito con el proyecto Third Wave Retiro! 🎉**

*Ministerio Alcance Victoria - Third Wave*
