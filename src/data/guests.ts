// Estructura de datos para los invitados
export interface GuestInfo {
  code: string;
  name: string;
  female: boolean;
}

// Lista de invitados con sus códigos únicos
export const guestsData: Record<string, GuestInfo> = {
  "A001": {
    code: "A001",
    name: "Claudia Ardila",
    female: true,
  },
  "A002": {
    code: "A002", 
    name: "Juliet Buitrago",
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
