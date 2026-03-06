# 🎨 Guía Visual - Third Wave Retiro

## 📱 Flujo de Usuario

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    PARTICIPANTE                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  1. Accede a la URL del evento                              │
│     https://third-wave-retiro.vercel.app                    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Ve el formulario de registro                            │
│     ┌─────────────────────────────────────────┐            │
│     │  Third Wave                              │            │
│     │  Retiro - Alcance Victoria              │            │
│     │                                          │            │
│     │  Nombre y Apellido: [____________]       │            │
│     │  Fecha Nacimiento:  [____/____/____]     │            │
│     │  Teléfono:          [____________]       │            │
│     │  Tipo:              [▼ Seleccionar]      │            │
│     │                                          │            │
│     │         [  Registrarme  ]                │            │
│     └─────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Completa los campos                                     │
│     - Nombre: Juan Pérez                                    │
│     - Fecha: 15/03/2005                                     │
│     - Teléfono: (809) 555-1234                              │
│     - Tipo: HighSchool                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Clic en "Registrarme"                                   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Ve confirmación                                         │
│     ✅ ¡Registro exitoso!                                   │
│        Nos vemos en el retiro 🎉                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    [FIN DEL PROCESO]
```

---

## 👨‍💼 Flujo de Administrador

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                   ADMINISTRADOR                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  1. Accede al panel admin                                   │
│     https://third-wave-retiro.vercel.app/admin              │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  2. Ve pantalla de login                                    │
│     ┌─────────────────────────────────────────┐            │
│     │  🔒                                      │            │
│     │  Panel de Administración                │            │
│     │  Ingresa la contraseña                  │            │
│     │                                          │            │
│     │  Contraseña: [____________]              │            │
│     │                                          │            │
│     │         [  Ingresar  ]                   │            │
│     └─────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Ingresa contraseña: ThirdWave2024                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Ve el dashboard                                         │
│     ┌─────────────────────────────────────────┐            │
│     │  Panel de Administración                │            │
│     │  Third Wave - Retiro                    │            │
│     │                                          │            │
│     │  [📊 Total: 45] [NewGen: 12]            │            │
│     │  [HighSchool: 18] [Gang: 10]            │            │
│     │  [Gang Adulto: 5]                       │            │
│     │                                          │            │
│     │  [📥 Exportar PDF]                       │            │
│     │                                          │            │
│     │  ┌────────────────────────────────┐     │            │
│     │  │ # │ Nombre │ Fecha │ Tel │ Tipo│     │            │
│     │  ├────────────────────────────────┤     │            │
│     │  │ 1 │ Juan P │ 15/03 │ 809 │ HS  │     │            │
│     │  │ 2 │ María  │ 20/05 │ 829 │ NG  │     │            │
│     │  │...│        │       │     │     │     │            │
│     │  └────────────────────────────────┘     │            │
│     └─────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Opciones disponibles:                                   │
│     - Ver estadísticas en tiempo real                       │
│     - Revisar tabla de registros                            │
│     - Exportar PDF con todos los datos                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flujo de Datos

```
┌──────────────┐
│ PARTICIPANTE │
└──────┬───────┘
       │ Completa formulario
       ▼
┌──────────────────┐
│  FORMULARIO WEB  │
│  (Registro.tsx)  │
└──────┬───────────┘
       │ Envía datos
       ▼
┌──────────────────┐
│    FIREBASE      │
│   FIRESTORE      │
│  (Base de Datos) │
└──────┬───────────┘
       │ Almacena
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌──────────────┐    ┌──────────────┐
│ NOTIFICACIÓN │    │  DASHBOARD   │
│   (Toast)    │    │  (Admin.tsx) │
└──────────────┘    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  EXPORTAR    │
                    │     PDF      │
                    └──────────────┘
```

---

## 🎨 Paleta de Colores Visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  COLORES PRINCIPALES                                        │
│                                                             │
│  ████████  Azul Oscuro (#1e3a8a)  - Fondo principal        │
│  ████████  Azul Medio  (#1e40af)  - Botones, acentos       │
│                                                             │
│  COLORES POR TIPO                                           │
│                                                             │
│  ████████  Púrpura (#9333ea)  - NewGen                     │
│  ████████  Rosa    (#db2777)  - HighSchool                 │
│  ████████  Naranja (#ea580c)  - Gang                       │
│  ████████  Rojo    (#dc2626)  - Gang Adulto                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Estructura de Archivos Visual

```
third-wave-retiro/
│
├── 📄 DOCUMENTACIÓN (10 archivos)
│   ├── PROYECTO-COMPLETADO.md    ⭐ Empieza aquí
│   ├── INDICE.md                 📚 Navegación
│   ├── INICIO-RAPIDO.md          🚀 5 minutos
│   ├── CHECKLIST.md              ✅ Paso a paso
│   ├── README.md                 📖 Técnica
│   ├── RESUMEN-PROYECTO.md       📊 Overview
│   ├── RESUMEN-EJECUTIVO.md      💼 Ejecutivo
│   ├── COMANDOS.md               💻 Comandos
│   ├── firestore.rules           🔐 Seguridad
│   └── Este archivo              🎨 Visual
│
├── 📁 src/ (CÓDIGO FUENTE)
│   ├── pages/
│   │   ├── Registro.tsx          📝 Formulario público
│   │   └── Admin.tsx             👨‍💼 Panel admin
│   ├── lib/
│   │   └── firebase.ts           🔥 Config Firebase
│   ├── App.tsx                   🔀 Router
│   ├── main.tsx                  🚪 Entry point
│   └── index.css                 🎨 Estilos
│
├── 📁 public/
│   └── manifest.json             📱 Config PWA
│
└── ⚙️ CONFIGURACIÓN
    ├── package.json              📦 Dependencias
    ├── vite.config.ts            🔧 Build
    ├── tailwind.config.js        🎨 Estilos
    ├── tsconfig.json             📘 TypeScript
    ├── .env.example              🔑 Variables
    └── .gitignore                🚫 Ignorar
```

---

## 🖥️ Pantallas del Sistema

### Pantalla 1: Registro Público
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                      🌊 Third Wave 🌊                       │
│                  Retiro - Alcance Victoria                  │
│                                                             │
│  👤 Nombre y Apellido *                                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Juan Pérez                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📅 Fecha de Nacimiento *                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 15/03/2005                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  📞 Teléfono (o del representante) *                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ (809) 555-1234                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  👥 Tipo *                                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ HighSchool                                      ▼   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│              ┌─────────────────────────┐                    │
│              │    Registrarme          │                    │
│              └─────────────────────────┘                    │
│                                                             │
│  ¿Eres administrador? Ir al panel                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Pantalla 2: Login Admin
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                          🔒                                 │
│                                                             │
│              Panel de Administración                        │
│              Ingresa la contraseña                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ••••••••••••••                                      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│              ┌─────────────────────────┐                    │
│              │      Ingresar           │                    │
│              └─────────────────────────┘                    │
│                                                             │
│              Volver al registro                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Pantalla 3: Dashboard Admin
```
┌─────────────────────────────────────────────────────────────┐
│  Panel de Administración                                    │
│  Third Wave - Retiro                    [📥 Exportar PDF]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │  45  │  │  12  │  │  18  │  │  10  │  │   5  │        │
│  │Total │  │NewGen│  │ HS   │  │Gang  │  │GA    │        │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  # │ Nombre y Apellido │ Fecha Nac. │ Teléfono │ Tipo     │
│ ───┼───────────────────┼────────────┼──────────┼────────  │
│  1 │ Juan Pérez        │ 15/03/2005 │ 809-5551 │ HS       │
│  2 │ María González    │ 20/05/2008 │ 829-5552 │ NewGen   │
│  3 │ Pedro Martínez    │ 10/08/2000 │ 849-5553 │ Gang     │
│  4 │ Ana Rodríguez     │ 05/12/1995 │ 809-5554 │ GA       │
│ ...│                   │            │          │          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Design

```
┌─────────────┐  ┌──────────────────┐  ┌────────────────────────┐
│   MÓVIL     │  │     TABLET       │  │       DESKTOP          │
│  < 768px    │  │  768px - 1024px  │  │      > 1024px          │
├─────────────┤  ├──────────────────┤  ├────────────────────────┤
│             │  │                  │  │                        │
│  [Título]   │  │    [Título]      │  │  [Título]  [Botones]   │
│             │  │                  │  │                        │
│  [Campo 1]  │  │  [Campo 1]       │  │  [Campo 1] [Campo 2]   │
│  [Campo 2]  │  │  [Campo 2]       │  │  [Campo 3] [Campo 4]   │
│  [Campo 3]  │  │  [Campo 3]       │  │                        │
│  [Campo 4]  │  │  [Campo 4]       │  │  [Tabla completa]      │
│             │  │                  │  │                        │
│  [Botón]    │  │    [Botón]       │  │                        │
│             │  │                  │  │                        │
│  Stack      │  │  Stack mejorado  │  │  Grid layout           │
│  vertical   │  │  con padding     │  │  multi-columna         │
│             │  │                  │  │                        │
└─────────────┘  └──────────────────┘  └────────────────────────┘
```

---

## 🎯 Próximos Pasos Visuales

```
1. CONFIGURAR FIREBASE
   ┌─────────────────────┐
   │ console.firebase    │
   │ .google.com         │
   └─────────────────────┘
           │
           ▼
   Crear proyecto
           │
           ▼
   Habilitar Firestore
           │
           ▼
   Copiar credenciales

2. CONFIGURAR .ENV
   ┌─────────────────────┐
   │ .env.example        │
   └─────────────────────┘
           │
           ▼
   Copiar a .env
           │
           ▼
   Pegar credenciales

3. PROBAR LOCALMENTE
   ┌─────────────────────┐
   │ npm run dev         │
   └─────────────────────┘
           │
           ▼
   localhost:5173
           │
           ▼
   Probar registro

4. DESPLEGAR
   ┌─────────────────────┐
   │ vercel              │
   └─────────────────────┘
           │
           ▼
   Configurar variables
           │
           ▼
   ¡LISTO! 🎉
```

---

**¡Éxito con el proyecto Third Wave Retiro! 🌊**
