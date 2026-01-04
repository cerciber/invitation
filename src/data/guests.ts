// Estructura de datos para los invitados
export interface GuestInfo {
  name: string;
  female: boolean;
}

// Lista de invitados con sus códigos únicos
export const guestsData: Record<string, GuestInfo> = {
  "0870792885": {
    name: "Ray y acompañante",
    female: true,
  },
};

// Función para obtener información del invitado por código
export function getGuestByCode(code: string): GuestInfo | null {
  const normalizedCode = code?.toUpperCase().trim();
  return guestsData[normalizedCode] || null;
}

// Función para obtener nombre por defecto si no hay código válido
export function getDefaultGuestName(): string {
  return "NOMBRE_INVITADO";
}
