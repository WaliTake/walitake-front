export const APP_NAME = 'walitake';
export const APP_TAGLINE = 'Convierte residuos en recursos';
export const APP_DESCRIPTION =
  'Conectamos generadores de residuos con compradores y recicladores. Economía circular para tu negocio.';

export const ROUTES = {
  home: '/',
  explorar: '/explorar',
  residuo: (id: string) => `/residuo/${id}`,
  login: '/auth/login',
  registro: '/auth/registro',
  cuenta: '/cuenta',
  negocio: '/cuenta/negocio',
  nuevoResiduo: '/cuenta/negocio/nuevo-residuo',
} as const;

export const CITIES = [
  'Buenos Aires',
  'Córdoba',
  'Rosario',
  'Mendoza',
  'La Plata',
  'Mar del Plata',
  'Tucumán',
  'Salta',
] as const;

export const UNITS = ['kg', 'tonelada', 'litros', 'piezas', 'metros', 'cajas', 'pallets'] as const;

export const BUSINESS_TYPES = [
  { value: 'restaurante', label: 'Restaurante / Gastronomía' },
  { value: 'fabrica', label: 'Fábrica / Industrial' },
  { value: 'hotel', label: 'Hotel / Alojamiento' },
  { value: 'supermercado', label: 'Supermercado / Comercio' },
  { value: 'hospital', label: 'Hospital / Salud' },
  { value: 'oficina', label: 'Oficina / Corporativo' },
  { value: 'constructora', label: 'Constructora / Obras' },
  { value: 'otro', label: 'Otro' },
] as const;

export const MOCK_CREDENTIALS = {
  email: 'usuario@walitake.com',
  password: 'eco2024',
} as const;

export const LOADING_DELAY = 800;
export const FEATURED_COUNT = 6;
