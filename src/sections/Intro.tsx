import { Callout, useLocalStorage } from "../components/ui";

const objectives = [
  {
    n: 1,
    t: "Distinguer",
    d: "l'audit interne, l'audit externe et l'inspection administrative dans le secteur public marocain.",
    ch: "ch1",
    chLabel: "Chapitre 1",
  },
  {
    n: 2,
    t: "Maîtriser",
    d: "le cadre normatif international (IIA et ISSAI / INTOSAI).",
    ch: "ch2",
    chLabel: "Chapitre 2",
  },
  {
    n: 3,
    t: "Évaluer",
    d: "un dispositif de contrôle interne selon le référentiel COSO.",
    ch: "ch2",
    chLabel: "Chapitre 2",
  },
  {
    n: 4,
    t: "Conduire",
    d: "une mission d'audit (planification, cartographie des risques, tests) et rédiger une FRAP (Feuille de Révélation et d'Analyse de Problème).",
    ch: "ch3",
    chLabel: "Chapitre 3 + Atelier",
  },
];

const flow = [
  { id: "ch1", icon: "📘", t: "Chapitre 1", d: "Fondements et typologie de l'audit dans le secteur public", mode: "Cours + classification de situations + quiz" },
  { id: "ch2", icon: "⚖️", t: "Chapitre 2", d: "Cadre normatif et contrôle interne (IIA, INTOSAI, COSO)", mode: "Cours + cube COSO interactif + quiz" },
  { id: "ch3", icon: "🧭", t: "Chapitre 3", d: "Démarche pratique d'une mission d'audit et outils", mode: "4 phases + matrice des risques + atelier FRAP" },
  { id: "atelier", icon: "🛠️", t: "Atelier pratique", d: "Commune Urbaine de Dar Bouazza : 2 exercices FRAP indépendants", mode: "Travail individuel ou en binômes + corrigé révélé par l'enseignant" },
];

export default function Intro({ go }: { go: (id: string) => void }) {
  const [etab, setEtab] = useLocalStorage("audit-etab", "");

  return (
    <div className="fade-up">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink via-navy to-[#1d5a8a] p-8 text-white shadow-xl md:p-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">
          Module 1 · Semestre 1
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl">
          Méthodologie d'Audit
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-sky-100">
          Du cadre conceptuel de l'audit public à la rédaction d'une FRAP : un support de cours
          interactif pour l'enseignant et les étudiants.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Master</p>
            <p className="mt-1 text-lg font-semibold">
              Gouvernance Publique et Techniques d'Audit
            </p>
            <p className="text-sm text-sky-100">Semestre 1 (S1)</p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-widest text-gold">Établissement</p>
            <input
              value={etab}
              onChange={(e) => setEtab(e.target.value)}
              placeholder="À renseigner par l'enseignant…"
              className="mt-1 w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-sky-200/70 outline-none focus:border-gold"
              aria-label="Nom de l'établissement"
            />
            <p className="mt-1 text-xs text-sky-200">
              Champ modifiable (non précisé dans le cours fourni).
            </p>
          </div>
        </div>
      </div>

      <h2 className="mb-2 mt-12 font-serif text-2xl font-bold text-ink">Objectifs pédagogiques</h2>
      <p className="mb-4 text-slate-600">
        À l'issue de ce module, l'étudiant doit être capable de :
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {objectives.map((o) => (
          <button
            key={o.n}
            onClick={() => go(o.ch)}
            className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-gold hover:shadow-md"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-lg font-bold text-white">
              {o.n}
            </span>
            <span>
              <span className="font-bold text-ink">{o.t}</span>{" "}
              <span className="text-slate-700">{o.d}</span>
              <span className="mt-2 block text-xs font-semibold text-navy opacity-70 group-hover:opacity-100">
                → Travaillé dans : {o.chLabel}
              </span>
            </span>
          </button>
        ))}
      </div>

      <h2 className="mb-4 mt-12 font-serif text-2xl font-bold text-ink">
        Déroulement de la séance
      </h2>
      <ol className="relative space-y-4 border-l-2 border-gold/50 pl-6">
        {flow.map((f, i) => (
          <li key={f.id} className="relative">
            <span className="absolute -left-[2.15rem] flex h-8 w-8 items-center justify-center rounded-full bg-ink text-sm font-bold text-white ring-4 ring-[#f4f1ea]">
              {i + 1}
            </span>
            <button
              onClick={() => go(f.id)}
              className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-ink"
            >
              <p className="font-bold text-ink">
                {f.icon} {f.t}
              </p>
              <p className="text-slate-700">{f.d}</p>
              <p className="mt-1 text-sm text-slate-500">Mode : {f.mode}</p>
            </button>
          </li>
        ))}
      </ol>

      <Callout kind="key" title="Mode d'emploi du support">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Le menu latéral permet de naviguer librement entre l'introduction, les trois chapitres
            et l'atelier.
          </li>
          <li>
            Les interactions (classification, quiz, matrice des risques…) <strong>prolongent</strong>{" "}
            les explications du cours : elles ne les remplacent pas.
          </li>
          <li>
            Le bouton <strong>« Mode enseignant »</strong> (en haut) déverrouille la révélation des
            corrigés de l'atelier.
          </li>
        </ul>
      </Callout>

      <div className="mt-8 text-center">
        <button
          onClick={() => go("ch1")}
          className="rounded-xl bg-ink px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:bg-navy"
        >
          Commencer le Chapitre 1 →
        </button>
      </div>
    </div>
  );
}
