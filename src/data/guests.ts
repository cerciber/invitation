// Estructura de datos para los invitados
export interface GuestInfo {
  name: string;
  female: boolean;
  plural: boolean;
}

// Lista de invitados con sus códigos únicos
export const guestsData: Record<string, GuestInfo> = {
  "0870792885": {
    name: "Ray y acompañante",
    female: false,
    plural: true,
  },
  "9494385858": {
    name: "Hola Mami Julieth",
    female: true,
    plural: false,
  },
  "3108265414": {
    name: "Hola Mami Claudia",
    female: true,
    plural: false,
  },
  "9381912250": {
    name: "Hola papi Pablo",
    female: false,
    plural: false,
  },
  "3177033015": {
    name: "Hola hermanito Pablo",
    female: false,
    plural: false,
  },
  "0394384343": {
    name: "Lina, Sergio y Paula",
    female: false,
    plural: true,
  },
  "0993737434": {
    name: "Senaida y José",
    female: false,
    plural: true,
  },
  "3168678710": {
    name: "Angela",
    female: true,
    plural: false,
  },
  "5675675675": {
    name: "Jeimi y Oscar",
    female: false,
    plural: true,
  },
  "5343654534": {
    name: "Sandra y Cristian",
    female: false,
    plural: true,
  },
  "2345345334": {
    name: "Abuelitos",
    female: false,
    plural: true,
  },
  "19283647872":{
    name: "Diego y Leidy",
    female: false,
    plural: true,
  },
  "928347374273":{
    name: "Tio Joselito",
    female: false,
    plural: false,
  },
  "9384736465733":{
    name: "Santi y tio Jarlen",
    female: false,
    plural: true,
  },
  "7682938489485":{
    name: "Lina y acompañante",
    female: false,
    plural: true,
  },
  "039483743654":{
    name: "Adolfo y Ligia",
    female: false,
    plural: true,
  },
  "845938458334":{
    name: "Eliana y Edward",
    female: false,
    plural: true,
  },
  "0439394374364": {
    name: "Jaiver",
    female: false,
    plural: false,
  },
  "7593943848348": {
    name: "Andrés",
    female: false,
    plural: false,
  },
  "3000394374734":{
    name: "Cielo",
    female: true,
    plural: false,
  },
  "032949238483": {
    name: "Marcela y acompañante",
    female: false,
    plural: true,
  },
  "023942394973": {
    name: "Lizeth",
    female: true,
    plural: false,
  },
  "09394384723748": {
    name: "Clau y Diego",
    female: false,
    plural: true,
  },
  "0394384374364": {
    name: "Vivi y Javier",
    female: false,
    plural: true,
  },
  "039384337464": {
    name: "Jenni y Camila",
    female: true,
    plural: true,
  },
  "828347234734": {
    name: "Ines",
    female: true,
    plural: false,
  },
  "023942934834": {
    name: "Michel y Edgar",
    female: false,
    plural: true,
  },
  "875734737473": {
    name: "Walther y Caro",
    female: false,
    plural: true,
  },
  "3748587363222": {
    name: "Milena y Andrés",
    female: false,
    plural: true,
  },
  "44433287363222": {
    name: "Wilson y Sandra",
    female: false,
    plural: true,
  },
  "8666655234734": {
    name: "Danny",
    female: true,
    plural: false,
  },
  "563526392732": {
    name: "Nubia y mamá de Nubia",
    female: true,
    plural: true,
  },
  "786746333848348": {
    name: "Jhon y Tatiana",
    female: false,
    plural: true,
  },
  "75943743834348": {
    name: "Kevin",
    female: false,
    plural: false,
  },
  "06633322934834": {
    name: "Janeth y Joseito",
    female: false,
    plural: true,
  },
  "066975742934834": {
    name: "Darly y Carlos mono",
    female: false,
    plural: true,
  },
  "7654543342934834": {
    name: "Carlos y Jhoan",
    female: false,
    plural: true,
  },
  "76364343342934834": {
    name: "Cami, Mile, Mery y Faider",
    female: false,
    plural: true,
  },
  "74332233342934834": {
    name: "Roberto y Manuel",
    female: false,
    plural: true,
  },
  "743322332222233334": {
    name: "Lore y acompañante",
    female: false,
    plural: true,
  },
  "443332222234734": {
    name: "Laura",
    female: true,
    plural: false,
  },
  "777744433234734": {
    name: "Linda",
    female: true,
    plural: false,
  },
  "35554215234734": {
    name: "Liz",
    female: true,
    plural: false,
  },
  "443332666655234": {
    name: "Silvi",
    female: true,
    plural: false,
  },
  "777555466655234": {
    name: "Jaime",
    female: false,
    plural: false,
  },
  "889935466655234": {
    name: "Manyo",
    female: false,
    plural: false,
  },
  "47392736223232": {
    name: "Frank",
    female: false,
    plural: false,
  },
  "6443434334223232": {
    name: "Bibiana",
    female: true,
    plural: false,
  },
  "543394344334223232": {
    name: "Diana",
    female: true,
    plural: false,
  },
  "4343434344223232": {
    name: "Oriana (Seño)",
    female: true,
    plural: false,
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
