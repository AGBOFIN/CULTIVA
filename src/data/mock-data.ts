/**
 * DONNÉES DE DÉMONSTRATION — CULTIVA.
 *
 * Ces données sont purement fictives et servent à afficher l'application
 * en attendant la mise en place d'un backend. Les dates sont générées
 * relativement à "aujourd'hui" pour que le tableau de bord reste parlant.
 *
 * Ne pas confondre avec des données réelles : elles seront remplacées
 * par une API (services/) lors de l'intégration du backend.
 */
import type {
  Activity,
  AppNotification,
  Crop,
  Farm,
  Field,
  Harvest,
  StoredUser,
  Transaction,
} from "@/types";

const now = new Date();

function at(dayOffset: number, hour: number, minute = 0): string {
  const d = new Date(now);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

const daysAgo = (n: number, hour = 9) => at(-n, hour);
const daysAhead = (n: number, hour = 9) => at(n, hour);
const createdAt = (n: number) => new Date(now.getTime() - n * 86_400_000).toISOString();

export const DEMO_EMAIL = "demo@cultiva.africa";
export const DEMO_PASSWORD = "demo1234";

export const seedUsers: StoredUser[] = [
  {
    id: "user-demo",
    fullName: "Koffi Mensah",
    phone: "+228 90 00 00 00",
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    location: "Agou, Togo",
    userType: "farmer",
    farmType: "Polyculture",
    farmInfo: "12 hectares de maïs, manioc et maraîchage en région montagneuse.",
    createdAt: createdAt(90),
  },
];

export const mockFarms: Farm[] = [
  {
    id: "farm-1",
    name: "Ferme de Koffi",
    location: "Agou, Togo",
    area: 12,
    areaUnit: "hectares",
    type: "Polyculture",
    description: "Maïs, manioc et cultures maraîchères.",
    createdAt: createdAt(85),
  },
  {
    id: "farm-2",
    name: "Plantation familiale",
    location: "Kpalimé, Togo",
    area: 8,
    areaUnit: "hectares",
    type: "Maraîchage",
    description: "Riz, légumes et oignons irrigués.",
    createdAt: createdAt(60),
  },
];

export const mockFields: Field[] = [
  {
    id: "field-1",
    farmId: "farm-1",
    name: "Parcelle A - Maïs",
    area: 3,
    areaUnit: "hectares",
    location: "Versant nord",
    soilType: "Limoneux",
    currentCrop: "Maïs",
    status: "active",
  },
  {
    id: "field-2",
    farmId: "farm-1",
    name: "Parcelle B - Manioc",
    area: 4,
    areaUnit: "hectares",
    location: "Plaine",
    soilType: "Sablonneux",
    currentCrop: "Manioc",
    status: "active",
  },
  {
    id: "field-3",
    farmId: "farm-1",
    name: "Parcelle C - Tomates",
    area: 1.5,
    areaUnit: "hectares",
    location: "Près de la rivière",
    soilType: "Argileux",
    currentCrop: "Tomates",
    status: "active",
  },
  {
    id: "field-4",
    farmId: "farm-2",
    name: "Champ de riz",
    area: 3,
    areaUnit: "hectares",
    location: "Bas-fond",
    soilType: "Argileux",
    currentCrop: "Riz",
    status: "en_preparation",
  },
  {
    id: "field-5",
    farmId: "farm-2",
    name: "Jardin maraîcher",
    area: 2,
    areaUnit: "hectares",
    location: "Derrière la maison",
    soilType: "Limoneux",
    currentCrop: "Oignons",
    status: "active",
  },
];

export const mockCrops: Crop[] = [
  {
    id: "crop-1",
    fieldId: "field-1",
    cropType: "Maïs",
    variety: "Maïs jaune",
    sowingDate: daysAgo(40),
    expectedHarvestDate: daysAhead(50),
    area: 3,
    seedQuantity: 30,
    seedUnit: "kg",
    status: "en_croissance",
  },
  {
    id: "crop-2",
    fieldId: "field-2",
    cropType: "Manioc",
    variety: "Manioc doux",
    sowingDate: daysAgo(200),
    expectedHarvestDate: daysAhead(160),
    area: 4,
    seedQuantity: 200,
    seedUnit: "boutures",
    status: "en_croissance",
  },
  {
    id: "crop-3",
    fieldId: "field-3",
    cropType: "Tomates",
    variety: "Mongal F1",
    sowingDate: daysAgo(20),
    expectedHarvestDate: daysAhead(30),
    area: 1.5,
    seedQuantity: 50,
    seedUnit: "g",
    status: "en_croissance",
  },
  {
    id: "crop-4",
    fieldId: "field-4",
    cropType: "Riz",
    variety: "Riz pluvial",
    sowingDate: daysAhead(7),
    expectedHarvestDate: daysAhead(127),
    area: 3,
    seedQuantity: 60,
    seedUnit: "kg",
    status: "planifiee",
  },
  {
    id: "crop-5",
    fieldId: "field-5",
    cropType: "Laitue",
    variety: "Laitue batavia",
    sowingDate: daysAgo(70),
    expectedHarvestDate: daysAgo(14),
    area: 0.5,
    seedQuantity: 20,
    seedUnit: "g",
    status: "recoltee",
  },
  {
    id: "crop-6",
    fieldId: "field-5",
    cropType: "Oignon",
    variety: "Violet de Galmi",
    sowingDate: daysAgo(10),
    expectedHarvestDate: daysAhead(60),
    area: 1,
    seedQuantity: 10,
    seedUnit: "kg",
    status: "semee",
  },
];

export const mockActivities: Activity[] = [
  {
    id: "act-1",
    title: "Semis du riz",
    description: "Semis en ligne sur le champ de riz.",
    date: daysAhead(7, 8),
    fieldId: "field-4",
    cost: 15000,
    status: "planifiee",
    type: "semis",
  },
  {
    id: "act-2",
    title: "Irrigation des tomates",
    date: at(0, 7, 0),
    fieldId: "field-3",
    cost: 2000,
    status: "planifiee",
    type: "irrigation",
  },
  {
    id: "act-3",
    title: "Fertilisation du maïs",
    description: "Apport d'engrais NPK sur la parcelle A.",
    date: at(0, 16, 0),
    fieldId: "field-1",
    cost: 12000,
    status: "planifiee",
    type: "fertilisation",
  },
  {
    id: "act-4",
    title: "Désherbage du manioc",
    date: daysAhead(3, 9),
    fieldId: "field-2",
    cost: 8000,
    status: "planifiee",
    type: "desherbage",
  },
  {
    id: "act-5",
    title: "Traitement des oignons",
    description: "Traitement fongicide préventif.",
    date: daysAhead(5, 9),
    fieldId: "field-5",
    cost: 10000,
    status: "planifiee",
    type: "traitement",
  },
  {
    id: "act-6",
    title: "Arrosage de la laitue",
    date: daysAgo(1, 8),
    fieldId: "field-5",
    cost: 1500,
    status: "en_retard",
    type: "irrigation",
  },
  {
    id: "act-7",
    title: "Récolte de la laitue",
    date: daysAgo(14, 10),
    fieldId: "field-5",
    cost: 5000,
    status: "terminee",
    type: "recolte",
  },
  {
    id: "act-8",
    title: "Entretien parcelle B",
    date: daysAgo(6, 9),
    fieldId: "field-2",
    cost: 6000,
    status: "terminee",
    type: "entretien",
  },
];

export const mockHarvests: Harvest[] = [
  {
    id: "harv-1",
    cropId: "crop-5",
    fieldId: "field-5",
    date: daysAgo(14, 10),
    quantity: 120,
    unit: "kg",
    quality: "bonne",
    price: 500,
    revenue: 60000,
  },
  {
    id: "harv-2",
    cropId: "crop-2",
    fieldId: "field-2",
    date: daysAgo(30, 9),
    quantity: 800,
    unit: "kg",
    quality: "excellente",
    price: 150,
    revenue: 120000,
  },
  {
    id: "harv-3",
    cropId: "crop-1",
    fieldId: "field-1",
    date: daysAgo(90, 11),
    quantity: 1500,
    unit: "kg",
    quality: "moyenne",
    price: 200,
    revenue: 300000,
  },
];

export const mockTransactions: Transaction[] = [
  { id: "t-1", type: "depense", category: "semences", label: "Achat semences maïs", amount: 45000, date: daysAgo(40) },
  { id: "t-2", type: "depense", category: "engrais", label: "Engrais NPK", amount: 60000, date: daysAgo(25) },
  { id: "t-3", type: "depense", category: "pesticides", label: "Pesticides tomates", amount: 25000, date: daysAgo(15) },
  { id: "t-4", type: "depense", category: "main_oeuvre", label: "Main-d'œuvre désherbage", amount: 8000, date: daysAgo(6) },
  { id: "t-5", type: "depense", category: "carburant", label: "Carburant motoculteur", amount: 15000, date: daysAgo(10) },
  { id: "t-6", type: "depense", category: "transport", label: "Transport récolte", amount: 20000, date: daysAgo(14) },
  { id: "t-7", type: "depense", category: "materiel", label: "Arrosoirs et outils", amount: 18000, date: daysAgo(3) },
  { id: "t-8", type: "depense", category: "autre", label: "Petites fournitures", amount: 5000, date: daysAgo(2) },
  { id: "t-9", type: "revenu", category: "recoltes", label: "Vente laitue", amount: 60000, date: daysAgo(14) },
  { id: "t-10", type: "revenu", category: "recoltes", label: "Vente manioc", amount: 120000, date: daysAgo(30) },
  { id: "t-11", type: "revenu", category: "ventes", label: "Vente maïs (cycle précédent)", amount: 300000, date: daysAgo(90) },
  { id: "t-12", type: "revenu", category: "autre", label: "Subvention coopérative", amount: 50000, date: daysAgo(20) },
];

export const mockNotifications: AppNotification[] = [
  {
    id: "notif-1",
    type: "retard",
    title: "Tâche en retard",
    message: "L'arrosage de la laitue était prévu hier.",
    date: daysAgo(1, 8),
    read: false,
  },
  {
    id: "notif-2",
    type: "rappel",
    title: "Semis du riz",
    message: "Prévu dans 7 jours sur le champ de riz.",
    date: at(0, 8, 0),
    read: false,
  },
  {
    id: "notif-3",
    type: "meteo",
    title: "Pluies attendues",
    message: "Fortes pluies prévues demain — pensez au drainage.",
    date: at(0, 7, 30),
    read: false,
  },
  {
    id: "notif-4",
    type: "recolte",
    title: "Tomates bientôt prêtes",
    message: "Récolte estimée dans environ 30 jours.",
    date: daysAgo(2, 9),
    read: true,
  },
];
