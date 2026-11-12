// Grille de lecture INDICATIVE (les seuils ne sont pas fixés par le cours :
// le cours ne donne que la formule Criticité = Probabilité (1 à 5) × Impact (1 à 5)).
export interface RiskLevel {
  label: string;
  bg: string; // fond de cellule
  text: string;
  badge: string;
  range: string;
}

export function riskLevel(score: number): RiskLevel {
  if (score >= 20)
    return { label: "Critique", bg: "bg-red-600", text: "text-white", badge: "bg-red-600 text-white", range: "20 – 25" };
  if (score >= 12)
    return { label: "Élevé", bg: "bg-orange-500", text: "text-white", badge: "bg-orange-500 text-white", range: "12 – 19" };
  if (score >= 6)
    return { label: "Moyen", bg: "bg-amber-300", text: "text-amber-950", badge: "bg-amber-300 text-amber-950", range: "6 – 11" };
  return { label: "Faible", bg: "bg-emerald-400", text: "text-emerald-950", badge: "bg-emerald-400 text-emerald-950", range: "1 – 5" };
}

export const probaLabels = ["", "Très improbable", "Peu probable", "Possible", "Probable", "Quasi certain / déjà avéré"];
export const impactLabels = ["", "Négligeable", "Limité", "Modéré", "Important", "Majeur / critique"];

export const levelLegend = [
  riskLevel(1),
  riskLevel(6),
  riskLevel(12),
  riskLevel(20),
];
