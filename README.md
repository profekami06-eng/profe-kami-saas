# 📐 SaaS Educativo "Profe Kami" — Pasto, Colombia
> *"La matemática es un juego"*

Plataforma web responsive y SaaS educativo para la gestión académica, diagnóstico lúdico y seguimiento de estudiantes en San Juan de Pasto, Nariño, Colombia.

---

## 🚀 Pila Tecnológica
- **Frontend:** React 19 + TypeScript + Vite
- **Estilos:** Tailwind CSS v3 con paleta cálida personalizada (Vino Tinto, Rosas Pastel y Crema cálido)
- **Rutas:** React Router DOM v7
- **Iconografía:** Lucide React
- **Backend & Autenticación:** Firebase SDK v13 (Auth, Firestore, Cloud Storage)

---

## 🔒 1. Seguridad Estricta de Super Administrador (`/admin`)
- **Autenticación:** 100% Google Sign-In mediante `signInWithPopup` y `GoogleAuthProvider`.
- **Restricción Forzosa:** Únicamente el correo `profekami06@gmail.com` tiene acceso al panel de Super Administrador.
- **Acción ante intento no autorizado:**
  1. Si un usuario con cualquier otro correo intenta iniciar sesión, el sistema ejecuta de inmediato `signOut(auth)`.
  2. Se revoca cualquier permiso de navegación.
  3. Se despliega un modal de alerta de seguridad (`SecurityAlertModal`) informando la expulsión.
- **Regla en Firestore:** Complementado con la función activa en la consola:
  ```javascript
  function esProfeKami() {
    return request.auth != null && request.auth.token.email == 'profekami06@gmail.com';
  }
  ```

---

## ⚖️ 2. Cumplimiento Legal Colombiano (SIC & Habeas Data)
- **Casillas Independientes Obligatorias:** Conforme a la Circular Única de la SIC, los formularios de matrícula y admisión exigen la aceptación explícita y separada de:
  - **Casilla 1:** Términos y Condiciones del Servicio Educativo (`v1.0-2026-SIC-COT`).
  - **Casilla 2:** Autorización para el Tratamiento de Datos Personales del Acudiente y del Menor (Ley 1581 de 2012 / Decreto 1377 de 2013).
  *(Prohibido unificar en un solo "chulito")*.
- **Derecho de Retracto (Art. 47 Ley 1480 de 2011):** Notificación visible en los formularios garantizando **cinco (5) días hábiles** siguientes a la matrícula o pago en línea para solicitar la devolución del 100% del dinero.
- **Trazabilidad Técnica:** Cada consentimiento se audita registrando:
  - Fecha y hora exacta en zona horaria oficial de Colombia (COT / America/Bogota).
  - Dirección IP pública capturada al momento del consentimiento.
  - Versión del documento legal aceptado.
  - Almacenamiento en colección `audit_consents` de Firestore y backup local.

---

## 🎨 3. Identidad Visual
- **Colores primarios:** Tonos Vino Tinto (`#7a152d`, `#9e1c3b`, `#5c1122`).
- **Acentos:** Rosa pastel (`#ffdce4`, `#ff96b0`) y destellos dorados (`#fbbf24`).
- **Fondos:** Crema cálido (`#faf8f6`), evitando colores fríos dominantes como azul o naranja.
- **Tipografías:** `Outfit` (títulos modernos y lúdicos) y `Plus Jakarta Sans` (cuerpo de texto).

---

## 📁 Estructura del Proyecto
```
sistema-profe-kami/
├── public/
│   └── favicon.svg               # Isotipo oficial K con acento lúdico
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── ProtectedAdminRoute.tsx   # Guardia estricto para /admin
│   │   ├── common/
│   │   │   ├── Navbar.tsx                # Cabecera responsive
│   │   │   ├── Footer.tsx                # Pie institucional y marco legal
│   │   │   └── SecurityAlertModal.tsx    # Modal de expulsión inmediata
│   │   └── legal/
│   │       ├── LegalConsentBox.tsx       # Casillas dobles y retracto SIC
│   │       └── LegalModals.tsx           # Modales de lectura legal
│   ├── config/
│   │   └── firebase.ts                   # Reexportación y wrappers
│   ├── context/
│   │   └── AuthContext.tsx               # Proveedor global de autenticación
│   ├── pages/
│   │   ├── LandingPage.tsx               # Portada lúdica y formulario SIC
│   │   ├── LoginPage.tsx                 # Acceso Google Auth restringido
│   │   └── AdminDashboard.tsx            # Panel del Super Administrador
│   ├── services/
│   │   ├── authService.ts                # Lógica de signIn / signOut estricto
│   │   └── legalAuditService.ts          # Captura de IP y hora de Colombia
│   ├── types/
│   │   ├── auth.ts                       # Tipos de usuario y estados
│   │   └── legal.ts                      # Interfaces de auditoría SIC
│   ├── firebase.ts                       # Exportación oficial app, auth, db, storage
│   ├── index.css                         # Tailwind base, utilidades y scrollbars
│   ├── App.tsx                           # Enrutamiento React Router DOM
│   └── main.tsx                          # Punto de entrada
├── .env.example                          # Plantilla de variables de entorno
├── tailwind.config.js                    # Configuración de paleta Vino / Rosa
└── package.json                          # Dependencias instaladas
```

---

## 🛠️ Comandos de Desarrollo
```bash
# Iniciar servidor de desarrollo local
npm run dev

# Compilar para producción (validación de tipos TypeScript y assets Vite)
npm run build

# Previsualizar el build de producción
npm run preview
```
