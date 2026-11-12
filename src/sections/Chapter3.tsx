import { useState } from "react";
import {
  Accordion,
  Callout,
  ChapterHeader,
  PageNav,
  Quiz,
  SectionTitle,
  type QuizQ,
} from "../components/ui";
import { Heatmap, RiskGauge, Scale, impactLabels, probaLabels } from "../components/Risk";
import { riskLevel } from "../lib/risk";
import { cn } from "../utils/cn";

/* ---------- Phases ---------- */
const phases = [
  {
    n: 1,
    icon: "📝",
    t: "Préparation",
    sub: "Planification",
    color: "bg-sky-700",
    soft: "border-sky-600 bg-sky-50",
    steps: [
      { t: "Ordre de mission", d: "Signé par l'autorité compétente : il donne à l'auditeur sa légitimité pour intervenir." },
      { t: "Prise de connaissance de l'entité", d: "Organigramme, budget, textes organiques." },
      { t: "Cartographie des risques", d: "Évaluation de chaque processus selon la formule Criticité = Probabilité (1 à 5) × Impact (1 à 5)." },
      { t: "Référentiel d'audit et programme de travail", d: "Rédaction du référentiel d'audit et du programme de travail." },
    ],
  },
  {
    n: 2,
    icon: "🔍",
    t: "Réalisation",
    sub: "Terrain",
    color: "bg-emerald-700",
    soft: "border-emerald-600 bg-emerald-50",
    steps: [
      { t: "Réunion d'ouverture", d: "Avec les audités." },
      { t: "Collecte des preuves d'audit", d: "Entretiens, observation physique, circularisation, sondages statistiques, rapprochements documentaires." },
      { t: "Rédaction des FRAP", d: "Chaque dysfonctionnement est formalisé en 4 rubriques : Constat, Cause, Conséquence, Recommandation." },
    ],
  },
  {
    n: 3,
    icon: "🤝",
    t: "Conclusion",
    sub: "Restitution",
    color: "bg-amber-600",
    soft: "border-amber-600 bg-amber-50",
    steps: [
      { t: "Réunion de clôture", d: "Validation contradictoire des FRAP avec les audités." },
      { t: "Projet de rapport", d: "Rédaction du projet de rapport d'audit." },
      { t: "Rapport définitif", d: "Rédaction du rapport définitif d'audit." },
    ],
  },
  {
    n: 4,
    icon: "🔄",
    t: "Suivi des recommandations",
    sub: "Mise en œuvre",
    color: "bg-rose-700",
    soft: "border-rose-600 bg-rose-50",
    steps: [
      { t: "Plan d'action de l'audité", d: "Élaboré par l'audité pour mettre en œuvre les recommandations." },
      { t: "Vérification de la mise en œuvre", d: "À 6 mois et à 1 an." },
    ],
  },
];

const evidence = [
  { t: "Entretiens", d: "Questionner les audités et les acteurs du processus." },
  { t: "Observation physique", d: "Constater sur place le fonctionnement réel (ex. : distribution, stockage, caisse)." },
  { t: "Circularisation", d: "Demander une confirmation écrite à un tiers (ex. : fournisseur, banque, bénéficiaire)." },
  { t: "Sondages statistiques", d: "Tester un échantillon représentatif d'opérations plutôt que la totalité." },
  { t: "Rapprochements documentaires", d: "Confronter des documents entre eux (ex. : bons, registres, factures)." },
];

function PhaseExplorer() {
  const [sel, setSel] = useState(0);
  const p = phases[sel];
  return (
    <div>
      <div className="grid gap-2 md:grid-cols-4">
        {phases.map((x, i) => (
          <button
            key={x.n}
            onClick={() => setSel(i)}
            className={cn(
              "relative rounded-xl p-3 text-left text-white transition",
              x.color,
              sel === i ? "scale-[1.03] shadow-lg ring-4 ring-gold" : "opacity-75 hover:opacity-100"
            )}
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Phase {x.n}</span>
            <span className="block text-lg font-bold">
              {x.icon} {x.t}
            </span>
            <span className="text-xs opacity-90">{x.sub}</span>
            {i < 3 && (
              <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-2xl text-slate-400 md:block">
                ›
              </span>
            )}
          </button>
        ))}
      </div>
      <div key={p.n} className={cn("fade-up mt-4 rounded-2xl border-l-8 p-5 shadow-sm", p.soft)}>
        <h3 className="font-serif text-2xl font-bold text-ink">
          Phase {p.n} · {p.t} ({p.sub})
        </h3>
        <ol className="mt-3 space-y-2">
          {p.steps.map((s, i) => (
            <li key={s.t} className="flex gap-3 rounded-lg bg-white/80 p-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                {i + 1}
              </span>
              <span>
                <strong className="text-ink">{s.t}.</strong>{" "}
                <span className="text-sm text-slate-700">{s.d}</span>
              </span>
            </li>
          ))}
        </ol>
        {p.n === 2 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
              Techniques de collecte des preuves
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {evidence.map((e) => (
                <div key={e.t} className="rounded-lg bg-white p-3 text-sm shadow-sm">
                  <p className="font-bold text-emerald-800">{e.t}</p>
                  <p className="text-slate-600">{e.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Les cinq techniques sont celles du cours ; les précisions sont des explications pédagogiques.
            </p>
          </div>
        )}
        {p.n === 4 && (
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-ink">
            <span className="rounded-full bg-ink px-3 py-1 text-white">Plan d'action</span>
            <span className="h-0.5 flex-1 bg-ink/30" />
            <span className="rounded-full bg-rose-700 px-3 py-1 text-white">+ 6 mois</span>
            <span className="h-0.5 flex-1 bg-ink/30" />
            <span className="rounded-full bg-rose-700 px-3 py-1 text-white">+ 1 an</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Classement des activités par phase ---------- */
const acts = [
  { t: "Faire signer l'ordre de mission par l'autorité compétente", a: 1 },
  { t: "Tenir la réunion d'ouverture avec les audités", a: 2 },
  { t: "Valider contradictoirement les FRAP avec les audités", a: 3 },
  { t: "Vérifier la mise en œuvre des recommandations à 6 mois et à 1 an", a: 4 },
  { t: "Réaliser des sondages statistiques et des rapprochements documentaires", a: 2 },
  { t: "Rédiger le référentiel d'audit et le programme de travail", a: 1 },
  { t: "Rédiger le rapport définitif d'audit", a: 3 },
  { t: "Élaborer le plan d'action par l'audité", a: 4 },
];

function PhaseSorter() {
  const [ans, setAns] = useState<Record<number, number>>({});
  const score = acts.filter((a, i) => ans[i] === a.a).length;
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-ink">🧩 Activité : dans quelle phase ?</h3>
        <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">
          {score} / {acts.length}
        </span>
      </div>
      <div className="space-y-2">
        {acts.map((a, i) => {
          const v = ans[i];
          return (
            <div key={i} className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-800">{a.t}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {phases.map((p) => (
                  <button
                    key={p.n}
                    disabled={!!v}
                    onClick={() => setAns((x) => ({ ...x, [i]: p.n }))}
                    className={cn(
                      "rounded-lg border px-3 py-1 text-xs font-bold",
                      !v && "border-slate-300 bg-white hover:border-ink",
                      v && p.n === a.a && "border-emerald-500 bg-emerald-50 text-emerald-900",
                      v === p.n && p.n !== a.a && "border-rose-400 bg-rose-50 text-rose-900",
                      v && v !== p.n && p.n !== a.a && "border-slate-200 bg-white text-slate-300"
                    )}
                  >
                    {p.n}. {p.t}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {Object.keys(ans).length > 0 && (
        <button onClick={() => setAns({})} className="mt-3 text-sm font-semibold text-navy underline">
          Recommencer
        </button>
      )}
    </div>
  );
}

/* ---------- Cartographie des risques ---------- */
interface RiskItem {
  id: number;
  name: string;
  p: number;
  i: number;
}

function RiskMapping() {
  const [items, setItems] = useState<RiskItem[]>([
    { id: 1, name: "Paiement des fournisseurs (exemple fictif)", p: 3, i: 3 },
    { id: 2, name: "Passation des marchés (exemple fictif)", p: 2, i: 5 },
    { id: 3, name: "Archivage des pièces comptables (exemple fictif)", p: 4, i: 2 },
  ]);
  const [name, setName] = useState("");
  const [p, setP] = useState(0);
  const [i, setI] = useState(0);
  const [nextId, setNextId] = useState(4);

  const add = () => {
    if (!p || !i) return;
    setItems((x) => [...x, { id: nextId, name: name.trim() || `Processus ${nextId}`, p, i }]);
    setNextId(nextId + 1);
    setName("");
    setP(0);
    setI(0);
  };
  const sorted = [...items].sort((a, b) => b.p * b.i - a.p * a.i);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h4 className="font-serif text-lg font-bold text-ink">Calculateur de criticité</h4>
        <p className="mb-3 text-sm text-slate-600">
          Cotez un processus : Criticité = Probabilité (1 à 5) × Impact (1 à 5).
        </p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom du processus à coter (ex. : gestion de la caisse)"
          className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-ink"
        />
        <div className="space-y-3">
          <Scale label="Probabilité" value={p} onChange={setP} labels={probaLabels} />
          <Scale label="Impact" value={i} onChange={setI} labels={impactLabels} />
          <RiskGauge p={p} i={i} />
          <button
            onClick={add}
            disabled={!p || !i}
            className="w-full rounded-lg bg-ink py-2 font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-40"
          >
            + Ajouter à la cartographie
          </button>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h4 className="mb-3 font-serif text-lg font-bold text-ink">Matrice des risques</h4>
        <Heatmap
          marks={items.map((x) => ({ n: x.id, p: x.p, i: x.i }))}
          p={p}
          i={i}
          onPick={(pp, ii) => {
            setP(pp);
            setI(ii);
          }}
        />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
        <h4 className="mb-2 font-serif text-lg font-bold text-ink">
          Processus classés par criticité décroissante
        </h4>
        <p className="mb-2 text-sm text-slate-600">
          La cartographie sert à hiérarchiser : les processus les plus critiques sont audités en
          priorité dans le programme de travail.
        </p>
        <div className="space-y-2">
          {sorted.map((x) => {
            const lv = riskLevel(x.p * x.i);
            return (
              <div key={x.id} className="flex items-center gap-3 rounded-lg bg-slate-50 p-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                  {x.id}
                </span>
                <span className="flex-1 text-sm text-slate-800">{x.name}</span>
                <span className="text-sm text-slate-500">
                  {x.p} × {x.i} = <strong>{x.p * x.i}</strong>
                </span>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-bold", lv.badge)}>{lv.label}</span>
                <button
                  onClick={() => setItems((l) => l.filter((y) => y.id !== x.id))}
                  className="text-slate-400 hover:text-rose-600"
                  aria-label="Supprimer"
                >
                  ✕
                </button>
              </div>
            );
          })}
          {sorted.length === 0 && <p className="text-sm text-slate-400">Aucun processus coté.</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------- FRAP ---------- */
const rubriques = [
  {
    id: "constat",
    t: "Constat (Fait)",
    q: "Qu'avons-nous observé ?",
    def: "Ce qui a été observé objectivement et chiffré.",
    tips: ["Des faits, pas des opinions.", "Chiffré : nombre, montant, pourcentage, période.", "Appuyé sur une preuve d'audit."],
    color: "bg-sky-700",
    soft: "border-sky-600 bg-sky-50",
  },
  {
    id: "cause",
    t: "Cause",
    q: "Pourquoi cela s'est-il produit ?",
    def: "L'origine du dysfonctionnement (absence de procédure, manque de formation).",
    tips: ["Remonter à l'origine, pas au symptôme.", "Exemples du cours : absence de procédure, manque de formation."],
    color: "bg-amber-600",
    soft: "border-amber-600 bg-amber-50",
  },
  {
    id: "conseq",
    t: "Conséquence",
    q: "Et alors, quel impact ?",
    def: "L'impact financier, juridique ou opérationnel.",
    tips: ["Distinguer l'impact financier, juridique et opérationnel.", "Quantifier lorsque c'est possible."],
    color: "bg-rose-700",
    soft: "border-rose-600 bg-rose-50",
  },
  {
    id: "reco",
    t: "Recommandation",
    q: "Que faut-il faire ?",
    def: "L'action corrective précise, réaliste et attribuée à un responsable.",
    tips: ["Précise : une action identifiable.", "Réaliste : applicable par l'entité.", "Attribuée à un responsable."],
    color: "bg-emerald-700",
    soft: "border-emerald-600 bg-emerald-50",
  },
];

function FrapRubriques() {
  const [sel, setSel] = useState(0);
  const r = rubriques[sel];
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {rubriques.map((x, i) => (
          <button
            key={x.id}
            onClick={() => setSel(i)}
            className={cn(
              "rounded-xl p-3 text-left text-white transition",
              x.color,
              sel === i ? "scale-[1.03] shadow-lg ring-4 ring-gold" : "opacity-75 hover:opacity-100"
            )}
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Rubrique {i + 1}</span>
            <span className="block font-bold">{x.t}</span>
            <span className="text-xs italic opacity-90">{x.q}</span>
          </button>
        ))}
      </div>
      <div key={r.id} className={cn("fade-up mt-3 rounded-2xl border-l-8 p-4", r.soft)}>
        <p className="font-bold text-ink">{r.def}</p>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700">
          {r.tips.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const frapStatements = [
  { t: "Sur un échantillon de 30 bons de commande, 11 ne portent pas la signature du service réceptionnaire.", a: "constat" },
  { t: "Il n'existe pas de procédure écrite définissant le circuit de validation des bons de commande.", a: "cause" },
  { t: "Risque de paiement de fournitures non reçues et impossibilité de justifier la dépense lors d'un contrôle.", a: "conseq" },
  { t: "Le chef du service des achats doit élaborer et diffuser, sous trois mois, une procédure rendant la signature de réception obligatoire.", a: "reco" },
  { t: "Les agents n'ont reçu aucune formation sur la tenue des documents d'achat.", a: "cause" },
  { t: "Le registre de suivi présente 14 écritures sur 50 sans pièce jointe, soit 28 % de l'échantillon testé.", a: "constat" },
  { t: "Exposition à une irrégularité susceptible d'être relevée lors de contrôles ultérieurs, avec un risque juridique pour l'ordonnateur.", a: "conseq" },
  { t: "Améliorer le contrôle.", a: "bad" },
];

function FrapSorter() {
  const [ans, setAns] = useState<Record<number, string>>({});
  const score = frapStatements.filter((s, i) => ans[i] === s.a).length;
  const opts = [
    ...rubriques.map((r) => ({ id: r.id, l: r.t })),
    { id: "bad", l: "Formulation à reprendre" },
  ];
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-ink">🧩 Activité : à quelle rubrique de la FRAP appartient chaque phrase ?</h3>
        <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">
          {score} / {frapStatements.length}
        </span>
      </div>
      <p className="mb-3 text-xs text-slate-500">Phrases fictives, à vocation pédagogique uniquement.</p>
      <div className="space-y-2">
        {frapStatements.map((s, i) => {
          const v = ans[i];
          return (
            <div key={i} className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-800">« {s.t} »</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {opts.map((o) => (
                  <button
                    key={o.id}
                    disabled={!!v}
                    onClick={() => setAns((x) => ({ ...x, [i]: o.id }))}
                    className={cn(
                      "rounded-lg border px-3 py-1 text-xs font-bold",
                      !v && "border-slate-300 bg-white hover:border-ink",
                      v && o.id === s.a && "border-emerald-500 bg-emerald-50 text-emerald-900",
                      v === o.id && o.id !== s.a && "border-rose-400 bg-rose-50 text-rose-900",
                      v && v !== o.id && o.id !== s.a && "border-slate-200 bg-white text-slate-300"
                    )}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
              {v && s.a === "bad" && (
                <p className="fade-up mt-2 text-sm text-slate-700">
                  « Améliorer le contrôle » est trop vague : une recommandation doit être précise,
                  réaliste et attribuée à un responsable.
                </p>
              )}
            </div>
          );
        })}
      </div>
      {Object.keys(ans).length > 0 && (
        <button onClick={() => setAns({})} className="mt-3 text-sm font-semibold text-navy underline">
          Recommencer
        </button>
      )}
    </div>
  );
}

function FrapExample() {
  const rows = [
    { r: rubriques[0], txt: "Sur un échantillon de 30 bons de commande, 11 (soit environ 37 %) ne portent pas la signature du service réceptionnaire.", bad: "Les achats sont mal gérés." },
    { r: rubriques[1], txt: "Absence de procédure écrite définissant le circuit de validation et manque de formation des agents concernés.", bad: "Les agents ne font pas leur travail." },
    { r: rubriques[2], txt: "Financière et juridique : risque de paiement de fournitures non reçues ; impossibilité de justifier la dépense en cas de contrôle.", bad: "Il y a un problème." },
    { r: rubriques[3], txt: "Élaborer et diffuser une procédure de réception avec signature obligatoire. Responsable : chef du service des achats. Échéance : 3 mois.", bad: "Il faudrait mieux contrôler." },
  ];
  const [showBad, setShowBad] = useState(false);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-serif text-lg font-bold text-ink">Exemple de FRAP (fictif, hors atelier)</h4>
        <button
          onClick={() => setShowBad(!showBad)}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-bold transition",
            showBad ? "bg-rose-600 text-white" : "bg-emerald-600 text-white"
          )}
        >
          {showBad ? "✘ Mauvaise formulation (cliquer pour corriger)" : "✔ Bonne formulation (cliquer pour comparer)"}
        </button>
      </div>
      <div className="space-y-2">
        {rows.map(({ r, txt, bad }) => (
          <div key={r.id} className="grid overflow-hidden rounded-lg border border-slate-200 sm:grid-cols-[10rem_1fr]">
            <div className={cn("px-3 py-2 text-sm font-bold text-white", showBad ? "bg-slate-500" : r.color)}>
              {r.t}
            </div>
            <div className={cn("px-3 py-2 text-sm", showBad ? "bg-rose-50 text-rose-900" : "bg-white text-slate-800")}>
              {showBad ? bad : txt}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const quiz3: QuizQ[] = [
  {
    q: "Combien de phases comporte une mission d'audit, et dans quel ordre ?",
    options: [
      "3 : préparation, réalisation, conclusion",
      "4 : préparation, réalisation, conclusion, suivi des recommandations",
      "4 : réalisation, préparation, conclusion, suivi",
      "5 : y compris la certification",
    ],
    answer: 1,
    explain: "Quatre phases chronologiques : préparation (planification), réalisation (terrain), conclusion (restitution), suivi des recommandations.",
  },
  {
    q: "Quelle est la formule de la criticité d'un risque ?",
    options: ["Probabilité + Impact", "Probabilité × Impact", "Impact ÷ Probabilité", "Probabilité × Coût"],
    answer: 1,
    explain: "Criticité = Probabilité (1 à 5) × Impact (1 à 5), soit un score de 1 à 25.",
  },
  {
    q: "Où se situe la rédaction des FRAP ?",
    options: ["Phase de préparation", "Phase de réalisation (terrain)", "Phase de conclusion", "Phase de suivi"],
    answer: 1,
    explain: "Les FRAP sont rédigées pendant la phase de réalisation ; elles sont ensuite validées de manière contradictoire à la réunion de clôture.",
  },
  {
    q: "Quelles sont les 4 rubriques d'une FRAP ?",
    options: [
      "Objectif, Méthode, Résultat, Conclusion",
      "Constat, Cause, Conséquence, Recommandation",
      "Risque, Contrôle, Preuve, Sanction",
      "Fait, Droit, Preuve, Décision",
    ],
    answer: 1,
    explain: "Constat (fait), Cause, Conséquence, Recommandation.",
  },
  {
    q: "Quand vérifie-t-on la mise en œuvre des recommandations ?",
    options: ["À 1 mois", "À 6 mois et 1 an", "À 2 ans uniquement", "Le jour de la réunion de clôture"],
    answer: 1,
    explain: "L'audité élabore un plan d'action, et la mise en œuvre est vérifiée à 6 mois et à 1 an.",
  },
  {
    q: "Une bonne recommandation est :",
    options: [
      "Générale et ambitieuse",
      "Précise, réaliste et attribuée à un responsable",
      "Chiffrée uniquement",
      "Rédigée sans l'accord de l'audité",
    ],
    answer: 1,
    explain: "Selon le cours : l'action corrective précise, réaliste et attribuée à un responsable.",
  },
];

export default function Chapter3({ go }: { go: (id: string) => void }) {
  return (
    <div className="fade-up">
      <ChapterHeader
        kicker="Chapitre 3"
        title="Démarche pratique d'une mission d'audit et outils"
        lead="Une mission d'audit se déroule toujours en 4 phases chronologiques. Nous suivons chacune d'elles, puis nous approfondissons deux outils : la cartographie des risques et la FRAP."
      />

      <SectionTitle num="1">Les 4 phases chronologiques</SectionTitle>
      <Callout kind="warn" title="Ne pas confondre">
        <p>
          Les <strong>4 phases</strong> d'une mission (préparation → réalisation → conclusion → suivi)
          sont un déroulement dans le temps ; elles n'ont rien à voir avec les trois niveaux d'audit
          (Chapitre 1) ni avec les trois critères Économie / Efficience / Efficacité.
        </p>
      </Callout>
      <PhaseExplorer />
      <div className="mt-6">
        <PhaseSorter />
      </div>

      <SectionTitle num="2" id="cartographie">
        Cartographie et évaluation des risques
      </SectionTitle>
      <Callout kind="def" title="Principe (cours)">
        <p>
          Dans la phase de préparation, chaque processus est évalué selon la formule{" "}
          <strong>Criticité = Probabilité (1 à 5) × Impact (1 à 5)</strong>.
        </p>
      </Callout>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <p className="font-bold text-ink">Probabilité (1 à 5)</p>
          <p className="text-slate-600">Chances que le risque se réalise (ou qu'il soit déjà réalisé).</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <p className="font-bold text-ink">Impact (1 à 5)</p>
          <p className="text-slate-600">Gravité des conséquences financières, juridiques ou opérationnelles.</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <p className="font-bold text-ink">Criticité (1 à 25)</p>
          <p className="text-slate-600">Score qui permet de hiérarchiser les processus à auditer en priorité.</p>
        </div>
      </div>
      <p className="mb-4 mt-2 text-xs text-slate-500">
        Les libellés des niveaux (Faible, Moyen, Élevé, Critique) et leurs seuils sont une grille de
        lecture <strong>indicative</strong> proposée pour l'atelier : le cours fixe uniquement la
        formule.
      </p>
      <RiskMapping />

      <SectionTitle num="3" id="frap">
        Méthodologie de rédaction d'une FRAP
      </SectionTitle>
      <Callout kind="def" title="FRAP (cours)">
        <p>
          <strong>Feuille de Révélation et d'Analyse de Problème</strong> : chaque dysfonctionnement
          constaté est formalisé en <strong>4 rubriques</strong>. Elle est rédigée pendant la phase de
          réalisation (terrain) et validée de façon contradictoire avec les audités lors de la réunion
          de clôture.
        </p>
      </Callout>
      <FrapRubriques />

      <div className="mt-6">
        <FrapExample />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Accordion title="Check-list qualité d'une FRAP" defaultOpen>
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              "Le constat est observé objectivement et chiffré.",
              "La cause explique l'origine (procédure absente, formation insuffisante…).",
              "La conséquence précise l'impact financier, juridique ou opérationnel.",
              "La recommandation est précise, réaliste et attribuée à un responsable.",
              "La FRAP sera validée contradictoirement avec les audités.",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="text-emerald-600">☑</span>
                {x}
              </li>
            ))}
          </ul>
        </Accordion>
        <Accordion title="Enchaînement logique : Constat → Cause → Conséquence → Recommandation">
          <p className="text-sm text-slate-700">
            La recommandation doit s'attaquer à la <strong>cause</strong>, pas seulement au constat :
            si la cause est l'absence de procédure, la recommandation sera d'en élaborer une. La
            conséquence justifie l'urgence et le niveau de priorité de la recommandation (lien avec la
            criticité du risque).
          </p>
        </Accordion>
      </div>

      <div className="mt-6">
        <FrapSorter />
      </div>

      <h2 className="mb-4 mt-12 font-serif text-2xl font-bold text-ink">Synthèse du chapitre 3</h2>
      <Callout kind="key">
        <ul className="list-disc space-y-1 pl-5">
          <li>4 phases : préparation · réalisation · conclusion · suivi des recommandations.</li>
          <li>Criticité = Probabilité (1 à 5) × Impact (1 à 5).</li>
          <li>FRAP = Constat · Cause · Conséquence · Recommandation.</li>
          <li>Validation contradictoire à la clôture ; suivi à 6 mois et 1 an.</li>
        </ul>
      </Callout>

      <div className="mt-6">
        <Quiz title="Quiz de fin de chapitre 3" questions={quiz3} />
      </div>

      <PageNav
        go={go}
        prev={{ id: "ch2", label: "Chapitre 2" }}
        next={{ id: "atelier", label: "Atelier : Commune de Dar Bouazza" }}
      />
    </div>
  );
}
