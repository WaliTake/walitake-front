# walitake 🌱

**Marketplace de residuos** – conecta generadores (restaurantes, hoteles, fábricas) con compradores y recicladores. Economía circular para Bolivia.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** con paleta de colores personalizada
- **lucide-react** para iconos
- **react-hot-toast** para notificaciones
- Datos 100% mock (sin backend ni BD)

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en desarrollo
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000)

## Credenciales de demo

| Campo | Valor |
|-------|-------|
| Email | `usuario@walitake.com` |
| Contraseña | `eco2024` |

> También hay un botón **"Usar credenciales de demo"** en la página de login.

## Estructura de carpetas

```
src/
├── app/              # Páginas (App Router)
│   ├── page.tsx      # Home
│   ├── explorar/     # Listado con filtros
│   ├── residuo/[id]/ # Detalle
│   ├── auth/         # Login + Registro
│   └── cuenta/       # Perfil + Negocio + Residuos
├── components/
│   ├── layout/       # Header, Footer, MobileNav
│   ├── home/         # HeroBanner, CategoryGrid, etc.
│   ├── listings/     # ListingCard, ListingGrid, etc.
│   ├── detail/       # ImageGallery, ContactSeller, BusinessCard
│   ├── account/      # ProfileForm, BusinessSetup, etc.
│   └── ui/           # Button, Badge, Modal, Skeleton, etc.
├── hooks/            # useAuth, useMockData
└── lib/
    ├── data/         # Mock data (categories, listings, users, businesses)
    ├── types/        # TypeScript interfaces
    ├── utils/        # delay()
    └── constants.ts  # Rutas, ciudades, unidades
```

## Deploy en Vercel

```bash
vercel --prod
```

No requiere variables de entorno. Deploy directo desde el repositorio.

## Paleta de colores

| Token | Valor | Uso |
|-------|-------|-----|
| primary | `#2E7D32` | Botones, encabezados |
| primary-light | `#4CAF50` | Hover |
| primary-dark | `#1B5E20` | Activo |
| accent | `#81C784` | Badges, iconos |
| surface | `#F1F8E9` | Fondo de tarjetas |
