/**
 * Types du domaine CULTIVA.
 * Ces types servent de contrat pour les futurs modules
 * (exploitations, parcelles, cultures, activités, récoltes, finances, météo, notifications).
 */

export type UserRole = "farmer";

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  userType: UserRole;
  /** URL optionnelle de la photo de profil. */
  avatarUrl?: string;
  farmType?: string;
  farmInfo?: string;
  createdAt: string;
}

/** Ligne utilisateur complète en base (inclut le hash du mot de passe côté serveur). */
export interface StoredUser extends User {
  password: string;
}

export interface RegisterInput {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  location: string;
  userType: UserRole;
}

export interface ProfileInput {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  avatarUrl?: string;
  farmType?: string;
  farmInfo?: string;
}

export type AreaUnit = "hectares" | "ares";

export interface Farm {
  id: string;
  name: string;
  location: string;
  area: number;
  areaUnit: AreaUnit;
  type: string;
  description?: string;
  createdAt: string;
}

export interface FarmInput {
  name: string;
  location: string;
  area: number;
  areaUnit: AreaUnit;
  type: string;
  description?: string;
}

export type FieldStatus = "active" | "en_jachere" | "en_preparation";

/** Coordonnées GPS d'une parcelle — prépare l'intégration d'une carte. */
export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Field {
  id: string;
  farmId: string;
  name: string;
  area: number;
  areaUnit: AreaUnit;
  location?: string;
  soilType?: string;
  currentCrop?: string;
  status: FieldStatus;
  /** Position GPS (optionnelle, alimentée par le futur module carte). */
  coordinates?: GeoPoint;
}

export interface FieldInput {
  farmId: string;
  name: string;
  area: number;
  areaUnit: AreaUnit;
  location?: string;
  soilType?: string;
  currentCrop?: string;
  status: FieldStatus;
  coordinates?: GeoPoint;
}

export type CropStatus =
  | "planifiee"
  | "semee"
  | "en_croissance"
  | "prete_a_recolter"
  | "recoltee"
  | "terminee";

export interface Crop {
  id: string;
  fieldId: string;
  /** La culture (ex : "Maïs", "Riz", "Tomates"). */
  cropType: string;
  variety?: string;
  sowingDate: string;
  expectedHarvestDate?: string;
  area: number;
  seedQuantity?: number;
  seedUnit?: string;
  status: CropStatus;
}

export interface CropInput {
  fieldId: string;
  cropType: string;
  variety?: string;
  sowingDate: string;
  expectedHarvestDate?: string;
  area: number;
  seedQuantity?: number;
  seedUnit?: string;
  status: CropStatus;
}

export type ActivityType =
  | "semis"
  | "fertilisation"
  | "traitement"
  | "irrigation"
  | "desherbage"
  | "entretien"
  | "recolte"
  | "autre";

export type ActivityStatus = "planifiee" | "en_cours" | "terminee" | "en_retard" | "annulee";

export interface Activity {
  id: string;
  title: string;
  description?: string;
  date: string;
  fieldId?: string;
  cropId?: string;
  cost: number;
  status: ActivityStatus;
  type: ActivityType;
}

export interface ActivityInput {
  title: string;
  description?: string;
  date: string;
  fieldId?: string;
  cost: number;
  status: ActivityStatus;
  type: ActivityType;
}

export type HarvestQuality = "excellente" | "bonne" | "moyenne" | "faible";

export interface Harvest {
  id: string;
  cropId: string;
  fieldId: string;
  date: string;
  quantity: number;
  unit: string;
  quality: HarvestQuality;
  /** Prix par unité. */
  price: number;
  /** Revenu total = quantité × prix. */
  revenue: number;
}

export interface HarvestInput {
  cropId: string;
  fieldId: string;
  date: string;
  quantity: number;
  unit: string;
  quality: HarvestQuality;
  /** Prix par unité. */
  price: number;
}

export type TransactionType = "revenu" | "depense";

export type ExpenseCategory =
  | "semences"
  | "engrais"
  | "pesticides"
  | "main_oeuvre"
  | "transport"
  | "carburant"
  | "materiel"
  | "autre";

export type IncomeCategory = "ventes" | "recoltes" | "autre";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: ExpenseCategory | IncomeCategory;
  label: string;
  amount: number;
  date: string;
}

export interface TransactionInput {
  type: TransactionType;
  category: ExpenseCategory | IncomeCategory;
  label: string;
  amount: number;
  date: string;
}

export type NotificationType = "tache" | "retard" | "meteo" | "recolte" | "rappel" | "info";

export type WeatherCondition = "ensoleille" | "nuageux" | "pluvieux" | "orageux" | "brumeux";

/** Conditions météo actuelles (mockées pour l'instant, API à brancher). */
export interface WeatherCurrent {
  temperature: number;
  feelsLike: number;
  /** Probabilité de pluie (%). */
  rainChance: number;
  /** Précipitations prévues (mm). */
  precipitation: number;
  humidity: number;
  windSpeed: number;
  condition: "ensoleille" | "nuageux" | "pluvieux" | "orageux" | "brumeux";
}

export interface WeatherForecastDay {
  date: string;
  condition: WeatherCurrent["condition"];
  /** Température minimale. */
  tempMin: number;
  /** Température maximale. */
  tempMax: number;
  rainChance: number;
  precipitation: number;
  windSpeed: number;
}

export interface WeatherData {
  location: string;
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
  /** "demo" tant que l'API réelle n'est pas branchée. */
  source: "demo" | "api";
}

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
}
