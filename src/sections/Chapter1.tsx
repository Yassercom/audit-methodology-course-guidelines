import { useState } from "react";
import {
  Accordion,
  Callout,
  ChapterHeader,
  PageNav,
  Quiz,
  SectionTitle,
  Tabs,
  type QuizQ,
} from "../components/ui";
import { cn } from "../utils/cn";

/* ---------- 1. Définition décortiquée ---------- */
const defParts = [
  { k: "examen méthodique", c: "bg-sky-200", d: "Une démarche structurée et organisée : l'audit suit des phases chronologiques (préparation, réalisation, conclusion, suivi) et utilise des outils (cartographie des risques, FRAP…). Ce n'est pas une vérification improvisée." },
  { k: "indépendant", c: "bg-amber-200", d: "L'auditeur ne subit pas l'influence des audités. L'indépendance est d'ailleurs la première des normes de qualification de l'IIA (Chapitre 2)." },
  { k: "objectif", c: "bg-emerald-200", d: "Les constats reposent sur des faits observés et des preuves d'audit, chiffrés quand c'est possible (voir la rubrique « Constat » de la FRAP)." },
  { k: "opérations, systèmes ou comptes", c: "bg-violet-200", d: "Les trois objets possibles de l'audit : les opérations (actes de gestion), les systèmes (procédures, contrôle interne) et les comptes (états financiers) d'une entité publique." },
  { k: "assurance raisonnable", c: "bg-rose-200", d: "L'audit ne donne pas une garantie absolue : il fournit un niveau de confiance élevé mais non total (contrôles par sondages, limites inhérentes à tout dispositif)." },
  { k: "régularité, sincérité et performance", c: "bg-orange-200", d: "Les trois finalités de l'assurance, qui correspondent aux trois niveaux d'audit : régularité ↔ audit de régularité ; sincérité ↔ audit financier ; performance ↔ audit de performance." },
];

function DefinitionExplorer() {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-lg leading-loose text-slate-800">
        « L'audit est un{" "}
        <Chip i={0} sel={sel} setSel={setSel} />,{" "}
        <Chip i={1} sel={sel} setSel={setSel} label="indépendant" bare />{" "}
        et <Chip i={2} sel={sel} setSel={setSel} label="objectif" bare /> des{" "}
        <Chip i={3} sel={sel} setSel={setSel} /> d'une entité publique, visant à fournir une{" "}
        <Chip i={4} sel={sel} setSel={setSel} /> sur la{" "}
        <Chip i={5} sel={sel} setSel={setSel} label="régularité, la sincérité et la performance" bare />{" "}
        de sa gestion. »
      </p>
      <div className="mt-4 min-h-[5.5rem] rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
        {sel === null ? (
          <span className="text-slate-400">👆 Cliquez sur un mot surligné pour le décortiquer.</span>
        ) : (
          <div className="fade-up">
            <p className="mb-1 font-bold text-ink">{defParts[sel].k}</p>
            <p>{defParts[sel].d}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({
  i,
  sel,
  setSel,
  label,
}: {
  i: number;
  sel: number | null;
  setSel: (n: number) => void;
  label?: string;
  bare?: boolean;
}) {
  return (
    <button
      onClick={() => setSel(i)}
      className={cn(
        "rounded px-1.5 font-semibold text-ink transition",
        defParts[i].c,
        sel === i ? "ring-2 ring-ink" : "hover:brightness-95"
      )}
    >
      {label ?? defParts[i].k}
    </button>
  );
}

/* ---------- 2. Trois niveaux ---------- */
const levels = [
  {
    id: "reg",
    icon: "📜",
    t: "Audit de régularité (ou de conformité)",
    def: "Vérifie le respect strict des lois, règlements, procédures budgétaires et comptables.",
    ex: "Respect du décret des marchés publics.",
    q: "Est-ce conforme ?",
    tone: "border-sky-500 bg-sky-50",
  },
  {
    id: "fin",
    icon: "📊",
    t: "Audit financier (ou certification)",
    def: "Vérifie la sincérité et l'image fidèle des états financiers.",
    ex: "Mission constitutionnelle exercée notamment par la Cour des comptes au Maroc.",
    q: "Les comptes sont-ils sincères et fidèles ?",
    tone: "border-emerald-500 bg-emerald-50",
  },
  {
    id: "perf",
    icon: "🎯",
    t: "Audit de performance",
    def: "Évalue l'action publique selon trois critères clés : Économie, Efficience, Efficacité.",
    ex: "Voir ci-dessous les « 3E ».",
    q: "L'action publique est-elle bien conduite et utile ?",
    tone: "border-amber-500 bg-amber-50",
  },
];

const threeE = [
  {
    id: "eco",
    label: "Économie",
    short: "Moindre coût",
    def: "Acquérir les ressources au moindre coût tout en maintenant la qualité.",
    looks: "Porte sur les INTRANTS (les moyens et leur prix d'acquisition).",
    ex: "Illustration pédagogique : acheter le carburant du parc automobile au meilleur prix à qualité équivalente.",
    color: "bg-sky-600",
  },
  {
    id: "effi",
    label: "Efficience",
    short: "Extrants / Intrants",
    def: "Maximiser les résultats obtenus à partir des moyens utilisés (rapport extrants / intrants).",
    looks: "Compare les EXTRANTS (production) aux INTRANTS (moyens consommés).",
    ex: "Illustration pédagogique : nombre de dossiers traités, ou de kilomètres parcourus, par rapport aux moyens (agents, litres de carburant) utilisés.",
    color: "bg-emerald-600",
  },
  {
    id: "effe",
    label: "Efficacité",
    short: "Objectifs atteints",
    def: "Degré d'atteinte des objectifs fixés par la politique publique.",
    looks: "Compare les RÉSULTATS aux OBJECTIFS fixés.",
    ex: "Illustration pédagogique : taux de réalisation de l'objectif fixé pour un programme communal par rapport à la cible annoncée.",
    color: "bg-amber-600",
  },
];

function ThreeEExplorer() {
  return (
    <Tabs
      tabs={threeE.map((e) => ({
        id: e.id,
        label: e.label,
        content: (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className={cn("rounded-lg px-3 py-1 text-sm font-bold text-white", e.color)}>
                {e.short}
              </span>
              <h4 className="font-serif text-xl font-bold text-ink">{e.label}</h4>
            </div>
            <p className="mt-3 text-slate-800">{e.def}</p>
            <p className="mt-2 text-sm font-semibold text-navy">{e.looks}</p>
            <p className="mt-3 rounded-lg bg-violet-50 p-3 text-sm text-violet-900">{e.ex}</p>
          </div>
        ),
      }))}
    />
  );
}

function ChainDiagram() {
  const boxes = [
    { t: "Intrants", d: "Moyens utilisés (budget, personnel, carburant…)", c: "bg-sky-100 border-sky-400" },
    { t: "Extrants", d: "Production obtenue grâce aux moyens", c: "bg-emerald-100 border-emerald-400" },
    { t: "Résultats", d: "Effets obtenus par rapport aux objectifs de la politique publique", c: "bg-amber-100 border-amber-400" },
  ];
  return (
    <div className="my-4 rounded-2xl border border-slate-200 bg-white p-5">
      <p className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-500">
        Où se situent les 3E ?
      </p>
      <div className="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        {boxes.map((b, i) => (
          <div key={b.t} className="contents">
            <div className={cn("rounded-xl border-2 p-3", b.c)}>
              <p className="font-bold text-ink">{b.t}</p>
              <p className="text-xs text-slate-700">{b.d}</p>
            </div>
            {i < 2 && (
              <div className="flex items-center justify-center text-2xl text-slate-400">→</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-2 text-xs font-semibold md:grid-cols-3">
        <p className="rounded bg-sky-600 p-2 text-center text-white">
          Économie : coût des intrants (au moindre coût, qualité maintenue)
        </p>
        <p className="rounded bg-emerald-600 p-2 text-center text-white">
          Efficience : extrants ÷ intrants
        </p>
        <p className="rounded bg-amber-600 p-2 text-center text-white">
          Efficacité : résultats vs objectifs fixés
        </p>
      </div>
    </div>
  );
}

/* ---------- Classification de situations ---------- */
const scenarios = [
  { t: "Vérifier qu'un marché de travaux a été passé conformément au décret des marchés publics.", a: "reg", why: "Il s'agit de vérifier le respect strict d'un texte : c'est l'exemple même donné par le cours pour l'audit de régularité (ou de conformité)." },
  { t: "Se prononcer sur la sincérité et l'image fidèle des états financiers de l'entité.", a: "fin", why: "La sincérité et l'image fidèle des états financiers relèvent de l'audit financier (certification)." },
  { t: "Vérifier que les procédures budgétaires et comptables ont été strictement respectées.", a: "reg", why: "Le respect des procédures budgétaires et comptables fait partie de la définition de l'audit de régularité." },
  { t: "Examiner si les ressources ont été acquises au moindre coût tout en maintenant la qualité.", a: "eco", why: "Acquérir les ressources au moindre coût à qualité maintenue = Économie (critère de l'audit de performance)." },
  { t: "Comparer la production obtenue aux moyens mobilisés pour l'obtenir (rapport extrants / intrants).", a: "effi", why: "Le rapport extrants / intrants définit l'Efficience." },
  { t: "Mesurer dans quelle mesure les objectifs fixés par la politique publique ont été atteints.", a: "effe", why: "Le degré d'atteinte des objectifs fixés = Efficacité." },
];

const scOptions = [
  { id: "reg", l: "Audit de régularité" },
  { id: "fin", l: "Audit financier" },
  { id: "eco", l: "Performance : Économie" },
  { id: "effi", l: "Performance : Efficience" },
  { id: "effe", l: "Performance : Efficacité" },
];

function Classifier() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const s = scenarios[i];

  const choose = (id: string) => {
    if (pick) return;
    setPick(id);
    if (id === s.a) setScore((x) => x + 1);
  };
  const next = () => {
    if (i + 1 >= scenarios.length) setFinished(true);
    else {
      setI(i + 1);
      setPick(null);
    }
  };
  const reset = () => {
    setI(0);
    setPick(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-ink">🧩 Activité : à quel type d'audit se rattache la situation ?</h3>
        <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">{score} pt</span>
      </div>
      {finished ? (
        <div className="fade-up mt-4 text-center">
          <p className="text-3xl font-bold text-ink">
            {score} / {scenarios.length}
          </p>
          <p className="mt-1 text-slate-600">
            Rappel : les trois <em>niveaux</em> (régularité, financier, performance) sont distincts des trois{" "}
            <em>critères</em> de performance (économie, efficience, efficacité).
          </p>
          <button onClick={reset} className="mt-4 rounded-lg bg-ink px-5 py-2 font-semibold text-white">
            Recommencer
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Situation {i + 1} / {scenarios.length}
          </p>
          <p className="mt-1 rounded-xl bg-slate-50 p-4 text-lg text-slate-800">{s.t}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {scOptions.map((o) => (
              <button
                key={o.id}
                onClick={() => choose(o.id)}
                disabled={!!pick}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-semibold transition",
                  !pick && "border-slate-300 hover:border-ink hover:bg-slate-50",
                  pick && o.id === s.a && "border-emerald-500 bg-emerald-50 text-emerald-900",
                  pick === o.id && o.id !== s.a && "border-rose-400 bg-rose-50 text-rose-900",
                  pick && o.id !== s.a && pick !== o.id && "border-slate-200 text-slate-400"
                )}
              >
                {o.l}
              </button>
            ))}
          </div>
          {pick && (
            <div className="fade-up mt-3 rounded-lg bg-slate-100 p-3 text-sm">
              <strong>{pick === s.a ? "✔ Exact. " : "✘ Non. "}</strong>
              {s.why}
              <div className="mt-2">
                <button onClick={next} className="rounded-lg bg-ink px-4 py-1.5 text-sm font-semibold text-white">
                  {i + 1 >= scenarios.length ? "Voir le score" : "Situation suivante →"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- 3. Inspection / Audit interne / Audit externe ---------- */
const bodies = [
  {
    id: "insp",
    icon: "🔎",
    t: "L'Inspection",
    org: "IGF, IGAT",
    nature: "Contrôle ponctuel, souvent inopiné",
    but: "Recherche d'irrégularités",
    issue: "Sanction disciplinaire ou financière",
    pos: "—",
    tone: "border-rose-500",
    head: "bg-rose-600",
  },
  {
    id: "int",
    icon: "🤝",
    t: "L'Audit interne",
    org: "Placé auprès du dirigeant",
    nature: "Activité permanente",
    but: "Accompagnement et conseil : maîtriser les risques et améliorer les processus",
    issue: "Recommandations et plan d'action",
    pos: "Auprès du dirigeant de l'entité",
    tone: "border-emerald-500",
    head: "bg-emerald-600",
  },
  {
    id: "ext",
    icon: "🏛️",
    t: "L'Audit externe",
    org: "Cour des comptes, Cours régionales des comptes",
    nature: "Contrôle juridictionnel et supérieur des finances publiques",
    but: "Contrôle supérieur des finances publiques",
    issue: "—",
    pos: "Indépendant de l'exécutif",
    tone: "border-sky-600",
    head: "bg-sky-700",
  },
];

const whoAmI = [
  { t: "Je suis un contrôle ponctuel, souvent inopiné.", a: "insp" },
  { t: "Mon rôle est d'accompagner et de conseiller le dirigeant pour maîtriser les risques.", a: "int" },
  { t: "Je suis un contrôle juridictionnel, indépendant de l'exécutif.", a: "ext" },
  { t: "Je recherche des irrégularités, avec possibilité de sanction disciplinaire ou financière.", a: "insp" },
  { t: "Mon activité est permanente et vise à améliorer les processus.", a: "int" },
  { t: "Les Cours régionales des comptes font partie de mes organes.", a: "ext" },
  { t: "L'IGF et l'IGAT relèvent de ma catégorie.", a: "insp" },
];

function WhoAmI() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const score = whoAmI.filter((w, i) => answers[i] === w.a).length;
  const done = Object.keys(answers).length;
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-ink">🎭 Activité : « Qui suis-je ? »</h3>
        <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">
          {score} / {whoAmI.length}
        </span>
      </div>
      <div className="space-y-3">
        {whoAmI.map((w, i) => {
          const a = answers[i];
          return (
            <div key={i} className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-800">{w.t}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {bodies.map((b) => (
                  <button
                    key={b.id}
                    disabled={!!a}
                    onClick={() => setAnswers((x) => ({ ...x, [i]: b.id }))}
                    className={cn(
                      "rounded-lg border px-3 py-1 text-sm font-semibold",
                      !a && "border-slate-300 bg-white hover:border-ink",
                      a && b.id === w.a && "border-emerald-500 bg-emerald-50 text-emerald-900",
                      a === b.id && b.id !== w.a && "border-rose-400 bg-rose-50 text-rose-900",
                      a && a !== b.id && b.id !== w.a && "border-slate-200 bg-white text-slate-300"
                    )}
                  >
                    {b.t}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {done > 0 && (
        <button onClick={() => setAnswers({})} className="mt-3 text-sm font-semibold text-navy underline">
          Recommencer
        </button>
      )}
    </div>
  );
}

const quiz1: QuizQ[] = [
  {
    q: "Parmi ces termes, lequel désigne un critère de l'audit de performance ?",
    options: ["Audit de conformité", "Efficience", "Certification", "Inspection"],
    answer: 1,
    explain: "L'efficience est l'un des trois critères de l'audit de performance (avec l'économie et l'efficacité).",
  },
  {
    q: "Qui exerce notamment, au Maroc, la mission constitutionnelle de certification des états financiers (audit financier) ?",
    options: ["L'IGF", "L'IGAT", "La Cour des comptes", "L'auditeur interne de la commune"],
    answer: 2,
    explain: "Selon le cours, la certification est une mission constitutionnelle exercée notamment par la Cour des comptes.",
  },
  {
    q: "L'efficience se mesure par :",
    options: [
      "Le respect du décret des marchés publics",
      "Le rapport extrants / intrants",
      "Le degré d'atteinte des objectifs fixés",
      "Le moindre coût d'acquisition des ressources",
    ],
    answer: 1,
    explain: "Efficience = maximiser les résultats à partir des moyens utilisés (extrants / intrants). Le degré d'atteinte des objectifs = efficacité ; le moindre coût = économie.",
  },
  {
    q: "Quelle fonction est une activité permanente d'accompagnement et de conseil placée auprès du dirigeant ?",
    options: ["L'inspection", "L'audit interne", "L'audit externe", "Le contrôle juridictionnel"],
    answer: 1,
    explain: "C'est la définition de l'audit interne dans le cours.",
  },
  {
    q: "Quelle affirmation est exacte ?",
    options: [
      "Les « 3E » sont les trois niveaux d'audit : régularité, financier, performance.",
      "Les trois critères économie, efficience et efficacité sont ceux de l'audit de performance.",
      "L'audit de régularité évalue l'efficacité des politiques publiques.",
      "L'inspection est une activité permanente de conseil.",
    ],
    answer: 1,
    explain: "Ne pas confondre : trois niveaux d'audit (régularité, financier, performance) ≠ trois critères de performance (économie, efficience, efficacité).",
  },
];

export default function Chapter1({ go }: { go: (id: string) => void }) {
  return (
    <div className="fade-up">
      <ChapterHeader
        kicker="Chapitre 1"
        title="Fondements et typologie de l'audit dans le secteur public"
        lead="Qu'est-ce que l'audit public ? Quels types d'audit distinguer ? Et en quoi l'inspection, l'audit interne et l'audit externe diffèrent-ils dans l'administration marocaine ?"
      />

      <SectionTitle num="1">Définition de l'audit public</SectionTitle>
      <Callout kind="def" title="Définition (cours)">
        <p>
          L'audit est un <strong>examen méthodique, indépendant et objectif</strong> des opérations,
          des systèmes ou des comptes d'une entité publique, visant à fournir une{" "}
          <strong>assurance raisonnable</strong> sur la <strong>régularité</strong>, la{" "}
          <strong>sincérité</strong> et la <strong>performance</strong> de sa gestion.
        </p>
      </Callout>
      <DefinitionExplorer />

      <SectionTitle num="2">Les trois niveaux d'audit public</SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        {levels.map((l) => (
          <div key={l.id} className={cn("rounded-2xl border-t-4 bg-white p-5 shadow-sm", l.tone)}>
            <p className="text-3xl">{l.icon}</p>
            <h3 className="mt-2 font-serif text-lg font-bold text-ink">{l.t}</h3>
            <p className="mt-2 text-sm text-slate-700">{l.def}</p>
            <p className="mt-2 text-sm italic text-slate-500">Ex. : {l.ex}</p>
            <p className="mt-3 rounded bg-white/70 px-2 py-1 text-xs font-bold text-ink">
              Question clé : {l.q}
            </p>
          </div>
        ))}
      </div>

      <Callout kind="warn" title="Ne pas confondre : niveaux ≠ critères">
        <p>
          Le cours parle des « 3E » à propos de l'audit de performance. Il faut bien distinguer :
        </p>
        <ul className="list-disc pl-5">
          <li>
            les <strong>trois niveaux</strong> d'audit public : régularité (conformité), financier
            (certification), performance ;
          </li>
          <li>
            les <strong>trois critères</strong> de l'audit de performance : Économie, Efficience,
            Efficacité — qui ne concernent que le troisième niveau.
          </li>
        </ul>
      </Callout>

      <h3 className="mb-3 mt-8 font-serif text-xl font-bold text-ink">
        Zoom sur l'audit de performance : Économie, Efficience, Efficacité
      </h3>
      <ChainDiagram />
      <ThreeEExplorer />
      <p className="mt-2 text-xs text-slate-500">
        Les définitions proviennent du cours ; les illustrations sont proposées à titre pédagogique.
      </p>

      <div className="mt-8">
        <Classifier />
      </div>

      <SectionTitle num="3">Distinction essentielle dans l'administration marocaine</SectionTitle>
      <div className="grid gap-4 md:grid-cols-3">
        {bodies.map((b) => (
          <div key={b.id} className={cn("overflow-hidden rounded-2xl border-2 bg-white shadow-sm", b.tone)}>
            <div className={cn("px-4 py-3 text-white", b.head)}>
              <p className="text-2xl">{b.icon}</p>
              <h3 className="font-serif text-xl font-bold">{b.t}</h3>
              <p className="text-sm opacity-90">{b.org}</p>
            </div>
            <dl className="space-y-3 p-4 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-slate-400">Nature</dt>
                <dd className="text-slate-800">{b.nature}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-widest text-slate-400">Finalité</dt>
                <dd className="text-slate-800">{b.but}</dd>
              </div>
              {b.id === "insp" && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-slate-400">Suites possibles</dt>
                  <dd className="text-slate-800">{b.issue}</dd>
                </div>
              )}
              {b.id !== "insp" && (
                <div>
                  <dt className="text-xs font-bold uppercase tracking-widest text-slate-400">Positionnement</dt>
                  <dd className="text-slate-800">{b.pos}</dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>

      <Callout kind="key" title="Moyen mnémotechnique">
        <p>
          <strong>Inspection = « chercher et sanctionner »</strong> ·{" "}
          <strong>Audit interne = « accompagner et conseiller »</strong> ·{" "}
          <strong>Audit externe = « juger et contrôler en toute indépendance de l'exécutif »</strong>.
        </p>
      </Callout>

      <div className="mt-6 space-y-3">
        <Accordion title="Pour aller plus loin : pourquoi cette distinction est-elle essentielle ?">
          <p className="text-sm text-slate-700">
            Un audité n'a pas la même attitude face à un contrôle ponctuel et inopiné pouvant mener à
            une sanction, face à un conseiller permanent placé auprès du dirigeant, ou face à une
            juridiction indépendante de l'exécutif. L'auditeur interne de la Commune de Dar Bouazza
            (atelier) agit dans la logique de l'audit interne : il aide le dirigeant à maîtriser les
            risques et à améliorer les processus, ce qui explique le ton constructif des
            recommandations d'une FRAP.
          </p>
        </Accordion>
      </div>

      <div className="mt-6">
        <WhoAmI />
      </div>

      <h2 className="mb-4 mt-12 font-serif text-2xl font-bold text-ink">Synthèse du chapitre 1</h2>
      <Callout kind="key">
        <ul className="list-disc space-y-1 pl-5">
          <li>Audit = examen méthodique, indépendant, objectif → assurance raisonnable.</li>
          <li>Trois niveaux : régularité (conformité) · financier (certification) · performance.</li>
          <li>Performance = Économie · Efficience · Efficacité.</li>
          <li>Inspection (IGF, IGAT) · Audit interne · Audit externe (Cour des comptes, CRC).</li>
        </ul>
      </Callout>

      <div className="mt-6">
        <Quiz title="Quiz de fin de chapitre 1" questions={quiz1} />
      </div>

      <PageNav
        go={go}
        prev={{ id: "intro", label: "Introduction" }}
        next={{ id: "ch2", label: "Chapitre 2 : Cadre normatif et contrôle interne" }}
      />
    </div>
  );
}
