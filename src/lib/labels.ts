import type {
  ActivityStatus,
  ActivityType,
  AreaUnit,
  CropStatus,
  ExpenseCategory,
  FieldStatus,
  HarvestQuality,
  IncomeCategory,
} from "@/types";

export const FARM_TYPES = [
  "Polyculture",
  "Maraîchage",
  "Céréales",
  "Élevage",
  "Arboriculture",
  "Autre",
] as const;

export const AREA_UNITS: { value: AreaUnit; label: string }[] = [
  { value: "hectares", label: "Hectares" },
  { value: "ares", label: "Ares" },
];

export const SOIL_TYPES = [
  "Limoneux",
  "Argileux",
  "Sablonneux",
  "Humifère",
  "Calcaire",
  "Autre",
] as const;

export const CROP_TYPES = [
  "Maïs",
  "Riz",
  "Manioc",
  "Tomates",
  "Laitue",
  "Oignon",
  "Mil",
  "Sorgho",
  "Arachide",
  "Haricot",
  "Piment",
  "Banane plantain",
  "Autre",
] as const;

export const SEED_UNITS = ["kg", "g", "boutures", "sacs", "unités"] as const;

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  semis: "Semis",
  fertilisation: "Fertilisation",
  traitement: "Traitement",
  irrigation: "Irrigation",
  desherbage: "Désherbage",
  entretien: "Entretien",
  recolte: "Récolte",
  autre: "Autre",
};

export const ACTIVITY_STATUS_LABELS: Record<ActivityStatus, string> = {
  planifiee: "Planifiée",
  en_cours: "En cours",
  terminee: "Terminée",
  en_retard: "En retard",
  annulee: "Annulée",
};

export const ACTIVITY_TYPE_OPTIONS: { value: ActivityType; label: string }[] = [
  { value: "semis", label: ACTIVITY_TYPE_LABELS.semis },
  { value: "fertilisation", label: ACTIVITY_TYPE_LABELS.fertilisation },
  { value: "traitement", label: ACTIVITY_TYPE_LABELS.traitement },
  { value: "irrigation", label: ACTIVITY_TYPE_LABELS.irrigation },
  { value: "desherbage", label: ACTIVITY_TYPE_LABELS.desherbage },
  { value: "entretien", label: ACTIVITY_TYPE_LABELS.entretien },
  { value: "recolte", label: ACTIVITY_TYPE_LABELS.recolte },
  { value: "autre", label: ACTIVITY_TYPE_LABELS.autre },
];

export const ACTIVITY_STATUS_OPTIONS: { value: ActivityStatus; label: string }[] = [
  { value: "planifiee", label: ACTIVITY_STATUS_LABELS.planifiee },
  { value: "en_cours", label: ACTIVITY_STATUS_LABELS.en_cours },
  { value: "terminee", label: ACTIVITY_STATUS_LABELS.terminee },
  { value: "en_retard", label: ACTIVITY_STATUS_LABELS.en_retard },
  { value: "annulee", label: ACTIVITY_STATUS_LABELS.annulee },
];

export const CROP_STATUS_LABELS: Record<CropStatus, string> = {
  planifiee: "Planifiée",
  semee: "Semée",
  en_croissance: "En croissance",
  prete_a_recolter: "Prête à récolter",
  recoltee: "Récoltée",
  terminee: "Terminée",
};

export const CROP_STATUS_OPTIONS: { value: CropStatus; label: string }[] = [
  { value: "planifiee", label: CROP_STATUS_LABELS.planifiee },
  { value: "semee", label: CROP_STATUS_LABELS.semee },
  { value: "en_croissance", label: CROP_STATUS_LABELS.en_croissance },
  { value: "prete_a_recolter", label: CROP_STATUS_LABELS.prete_a_recolter },
  { value: "recoltee", label: CROP_STATUS_LABELS.recoltee },
  { value: "terminee", label: CROP_STATUS_LABELS.terminee },
];

export const FIELD_STATUS_LABELS: Record<FieldStatus, string> = {
  active: "Active",
  en_jachere: "En jachère",
  en_preparation: "En préparation",
};

export const FIELD_STATUS_OPTIONS: { value: FieldStatus; label: string }[] = [
  { value: "active", label: FIELD_STATUS_LABELS.active },
  { value: "en_preparation", label: FIELD_STATUS_LABELS.en_preparation },
  { value: "en_jachere", label: FIELD_STATUS_LABELS.en_jachere },
];

export const QUALITY_LABELS: Record<HarvestQuality, string> = {
  excellente: "Excellente",
  bonne: "Bonne",
  moyenne: "Moyenne",
  faible: "Faible",
};

export const QUALITY_OPTIONS: { value: HarvestQuality; label: string }[] = [
  { value: "excellente", label: QUALITY_LABELS.excellente },
  { value: "bonne", label: QUALITY_LABELS.bonne },
  { value: "moyenne", label: QUALITY_LABELS.moyenne },
  { value: "faible", label: QUALITY_LABELS.faible },
];

export const QUALITY_TONES: Record<HarvestQuality, BadgeTone> = {
  excellente: "green",
  bonne: "blue",
  moyenne: "yellow",
  faible: "red",
};

export const HARVEST_UNITS = ["kg", "t", "sac", "botte", "unité"] as const;

export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  semences: "Semences",
  engrais: "Engrais",
  pesticides: "Pesticides",
  main_oeuvre: "Main-d'œuvre",
  transport: "Transport",
  carburant: "Carburant",
  materiel: "Matériel",
  autre: "Autre",
};

export const INCOME_CATEGORY_LABELS: Record<IncomeCategory, string> = {
  ventes: "Ventes",
  recoltes: "Récoltes",
  autre: "Autres revenus",
};

export const EXPENSE_CATEGORY_OPTIONS: { value: ExpenseCategory; label: string }[] = [
  { value: "semences", label: EXPENSE_CATEGORY_LABELS.semences },
  { value: "engrais", label: EXPENSE_CATEGORY_LABELS.engrais },
  { value: "pesticides", label: EXPENSE_CATEGORY_LABELS.pesticides },
  { value: "main_oeuvre", label: EXPENSE_CATEGORY_LABELS.main_oeuvre },
  { value: "transport", label: EXPENSE_CATEGORY_LABELS.transport },
  { value: "carburant", label: EXPENSE_CATEGORY_LABELS.carburant },
  { value: "materiel", label: EXPENSE_CATEGORY_LABELS.materiel },
  { value: "autre", label: EXPENSE_CATEGORY_LABELS.autre },
];

export const INCOME_CATEGORY_OPTIONS: { value: IncomeCategory; label: string }[] = [
  { value: "ventes", label: INCOME_CATEGORY_LABELS.ventes },
  { value: "recoltes", label: INCOME_CATEGORY_LABELS.recoltes },
  { value: "autre", label: INCOME_CATEGORY_LABELS.autre },
];

export type BadgeTone = "green" | "yellow" | "red" | "gray" | "blue";

export const ACTIVITY_STATUS_TONES: Record<ActivityStatus, BadgeTone> = {
  planifiee: "blue",
  en_cours: "yellow",
  terminee: "green",
  en_retard: "red",
  annulee: "gray",
};

export const CROP_STATUS_TONES: Record<CropStatus, BadgeTone> = {
  planifiee: "gray",
  semee: "blue",
  en_croissance: "green",
  prete_a_recolter: "yellow",
  recoltee: "green",
  terminee: "gray",
};
