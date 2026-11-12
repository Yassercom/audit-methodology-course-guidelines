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
import { cn } from "../utils/cn";

/* ---------- IIA ---------- */
const iiaItems = [
  { id: "ind", t: "Indépendance", g: "q", d: "L'auditeur interne agit sans subir d'influence des services audités : sa position auprès du dirigeant protège sa liberté de jugement." },
  { id: "obj", t: "Objectivité", g: "q", d: "Un jugement impartial, fondé sur des faits et des preuves, sans conflit d'intérêts." },
  { id: "comp", t: "Compétence", g: "q", d: "Les connaissances, le savoir-faire et l'expérience nécessaires pour conduire la mission." },
  { id: "plan", t: "Planification", g: "f", d: "Préparer la mission : ordre de mission, prise de connaissance, cartographie des risques, programme de travail (Phase 1 du Chapitre 3)." },
  { id: "acc", t: "Accomplissement de la mission", g: "f", d: "Réaliser les travaux de terrain : collecte des preuves, rédaction des FRAP (Phase 2 du Chapitre 3)." },
  { id: "com", t: "Communication des résultats", g: "f", d: "Restituer les conclusions : réunion de clôture, projet puis rapport définitif (Phase 3 du Chapitre 3)." },
];

function IIASorter() {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [open, setOpen] = useState<string | null>(null);
  const correct = iiaItems.filter((i) => placed[i.id] === i.g).length;
  const done = Object.keys(placed).length;

  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-serif text-xl font-bold text-ink">🗂️ Activité : classer les normes IIA</h3>
        <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">
          {correct} / {iiaItems.length}
        </span>
      </div>
      <p className="mb-3 text-sm text-slate-600">
        Pour chaque notion, indiquez s'il s'agit d'une norme de <strong>qualification</strong> ou de{" "}
        <strong>fonctionnement</strong>.
      </p>
      <div className="space-y-2">
        {iiaItems.map((it) => {
          const p = placed[it.id];
          const ok = p === it.g;
          return (
            <div
              key={it.id}
              className={cn(
                "rounded-xl border p-3 transition",
                !p && "border-slate-200 bg-slate-50",
                p && ok && "border-emerald-400 bg-emerald-50",
                p && !ok && "border-rose-400 bg-rose-50"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setOpen(open === it.id && p ? null : it.id)}
                  className="font-semibold text-ink"
                >
                  {it.t}
                </button>
                <div className="flex gap-2">
                  {[
                    { g: "q", l: "Qualification" },
                    { g: "f", l: "Fonctionnement" },
                  ].map((b) => (
                    <button
                      key={b.g}
                      disabled={!!p}
                      onClick={() => {
                        setPlaced((x) => ({ ...x, [it.id]: b.g }));
                        setOpen(it.id);
                      }}
                      className={cn(
                        "rounded-lg border px-3 py-1 text-xs font-bold",
                        !p && "border-slate-300 bg-white hover:border-ink",
                        p === b.g && ok && "border-emerald-500 bg-emerald-600 text-white",
                        p === b.g && !ok && "border-rose-500 bg-rose-600 text-white",
                        p && p !== b.g && "border-slate-200 bg-white text-slate-300"
                      )}
                    >
                      {b.l}
                    </button>
                  ))}
                </div>
              </div>
              {p && open === it.id && (
                <p className="fade-up mt-2 text-sm text-slate-700">
                  <strong>
                    {ok ? "✔ " : "✘ Correction : "}
                    {it.g === "q" ? "Norme de qualification. " : "Norme de fonctionnement. "}
                  </strong>
                  {it.d}
                </p>
              )}
            </div>
          );
        })}
      </div>
      {done > 0 && (
        <button
          onClick={() => {
            setPlaced({});
            setOpen(null);
          }}
          className="mt-3 text-sm font-semibold text-navy underline"
        >
          Recommencer
        </button>
      )}
    </div>
  );
}

/* ---------- COSO ---------- */
const coso = [
  {
    n: 1,
    id: "env",
    t: "Environnement de contrôle",
    short: "Le socle",
    color: "bg-sky-700",
    soft: "bg-sky-50 border-sky-500",
    def: "Éthique, intégrité, organigramme clair et délégation des pouvoirs.",
    why: "C'est le socle sur lequel reposent les quatre autres composantes : il traduit l'attitude et l'exemplarité de la direction.",
    ex: [
      "Organigramme des services de la commune formalisé, approuvé et connu des agents.",
      "Délégations de signature accordées par écrit par le président du conseil communal, avec périmètre et limites précisés.",
      "Code de conduite / charte d'éthique diffusé et rappelé aux agents.",
    ],
    q: "Qui est responsable de quoi ? Les pouvoirs sont-ils délégués formellement ?",
    red: "Fonctions mal définies, cumul de tâches, absence de délégation formalisée.",
  },
  {
    n: 2,
    id: "risk",
    t: "Évaluation des risques",
    short: "Identifier & analyser",
    color: "bg-amber-600",
    soft: "bg-amber-50 border-amber-500",
    def: "Identification et analyse des facteurs internes et externes pouvant empêcher l'atteinte des objectifs.",
    why: "On ne peut pas contrôler ce qu'on n'a pas identifié : cette composante alimente directement la cartographie des risques (Chapitre 3).",
    ex: [
      "Facteur externe : hausse du prix du carburant ou évolution de la réglementation applicable.",
      "Facteur interne : rotation du personnel, manque de formation des régisseurs.",
      "Recensement des risques par processus (dépenses de carburant, octroi de subventions, marchés…).",
    ],
    q: "La commune a-t-elle identifié ce qui peut l'empêcher d'atteindre ses objectifs ?",
    red: "Aucun registre des risques ; risques découverts uniquement après un incident.",
  },
  {
    n: 3,
    id: "act",
    t: "Activités de contrôle",
    short: "Procédures concrètes",
    color: "bg-emerald-700",
    soft: "bg-emerald-50 border-emerald-500",
    def: "Procédures concrètes : séparation des tâches ordonnateur / comptable, doubles signatures, contrôles informatiques.",
    why: "Ce sont les gestes quotidiens qui préviennent ou détectent l'erreur et la fraude.",
    ex: [
      "Séparation des fonctions d'ordonnateur et de comptable : celui qui engage la dépense n'est pas celui qui la paie.",
      "Commande, réception et enregistrement des fournitures confiés à des agents différents.",
      "Double signature sur les pièces sensibles ; droits d'accès différenciés dans le système d'information.",
    ],
    q: "Une même personne peut-elle, seule, initier, exécuter et enregistrer une opération ?",
    red: "Cumul de fonctions incompatibles, absence de vérification croisée, pas de rapprochement.",
  },
  {
    n: 4,
    id: "info",
    t: "Information et communication",
    short: "Données fiables",
    color: "bg-violet-700",
    soft: "bg-violet-50 border-violet-500",
    def: "Circulation fiable des données financières et opérationnelles.",
    why: "Les décideurs ont besoin d'informations exactes et à temps ; chaque agent doit savoir ce que l'on attend de lui.",
    ex: [
      "Tableau de bord périodique des consommations remis à la direction.",
      "Circuit défini de transmission des pièces justificatives et rapports au service compétent.",
      "Procédure de remontée des anomalies vers la hiérarchie.",
    ],
    q: "L'information est-elle fiable, complète, remontée à temps à ceux qui décident ?",
    red: "Registres incomplets, rapports non transmis, aucune remontée d'information à la direction.",
  },
  {
    n: 5,
    id: "pil",
    t: "Pilotage",
    short: "Surveiller & évaluer",
    color: "bg-rose-700",
    soft: "bg-rose-50 border-rose-500",
    def: "Surveillance continue et évaluation périodique du dispositif.",
    why: "Un dispositif de contrôle interne vieillit : il doit être surveillé et amélioré en permanence.",
    ex: [
      "Suivi régulier des écarts entre consommations prévues et réalisées.",
      "Évaluation périodique du dispositif par l'audit interne.",
      "Suivi de la mise en œuvre des plans d'action (voir Phase 4 du Chapitre 3).",
    ],
    q: "Quelqu'un surveille-t-il le fonctionnement du dispositif et corrige-t-il les écarts ?",
    red: "Écarts non analysés, recommandations antérieures sans suite.",
  },
];

const objectivesCube = [
  { t: "Opérations", d: "Atteindre les objectifs d'activité" },
  { t: "Reporting", d: "Information fiable" },
  { t: "Conformité", d: "Respect des lois et règlements" },
];

function CosoCube() {
  const [sel, setSel] = useState(0);
  const c = coso[sel];
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
          Le « cube » COSO — cliquez sur une composante
        </p>
        <div className="mb-1 grid grid-cols-3 gap-1 pl-0">
          {objectivesCube.map((o) => (
            <div key={o.t} className="rounded-t-lg bg-slate-800 px-1 py-1 text-center">
              <p className="text-xs font-bold text-white">{o.t}</p>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          {[...coso].reverse().map((x) => (
            <button
              key={x.id}
              onClick={() => setSel(x.n - 1)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3 text-left text-white transition",
                x.color,
                sel === x.n - 1 ? "scale-[1.02] shadow-lg ring-4 ring-gold" : "opacity-80 hover:opacity-100"
              )}
            >
              <span className="flex items-center gap-2 font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25 text-sm">
                  {x.n}
                </span>
                {x.t}
              </span>
              <span className="hidden text-xs opacity-90 sm:inline">{x.short}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          Les cinq composantes s'appliquent aux trois catégories d'objectifs : opérations, reporting, conformité.
        </p>
      </div>

      <div key={c.id} className={cn("fade-up rounded-2xl border-l-8 p-5 shadow-sm", c.soft)}>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Composante {c.n} / 5</p>
        <h3 className="font-serif text-2xl font-bold text-ink">{c.t}</h3>
        <Callout kind="def" title="Définition (cours)" className="bg-white/70">
          <p>{c.def}</p>
        </Callout>
        <p className="text-sm text-slate-700">{c.why}</p>
        <h4 className="mt-4 text-sm font-bold uppercase tracking-widest text-violet-700">
          Exemples dans l'administration publique marocaine
        </h4>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-800">
          {c.ex.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <p className="mt-3 rounded-lg bg-white/70 p-3 text-sm">
          <strong className="text-ink">Question de l'auditeur :</strong> {c.q}
        </p>
        <p className="mt-2 rounded-lg bg-white/70 p-3 text-sm">
          <strong className="text-rose-700">Signaux d'alerte :</strong> {c.red}
        </p>
        <p className="mt-3 text-xs text-slate-500">
          Exemples illustratifs proposés pour adapter la notion au contexte communal ; ils ne
          constituent pas des constats réels.
        </p>
      </div>
    </div>
  );
}

/* ---------- Diagnostic COSO ---------- */
const diag = [
  { t: "Dans une direction, personne ne sait qui est autorisé à signer quoi ; il n'existe ni organigramme ni délégation écrite.", a: "env" },
  { t: "Le même agent établit l'ordre de paiement, le valide et l'enregistre dans le système.", a: "act" },
  { t: "La direction n'a jamais cherché à identifier ce qui pourrait empêcher la réalisation de ses objectifs (hausse de prix, départs d'agents…).", a: "risk" },
  { t: "Les états de dépenses arrivent à la direction avec plusieurs mois de retard et sont incomplets.", a: "info" },
  { t: "Le dispositif de contrôle n'a pas été revu ni évalué depuis des années ; aucune surveillance continue.", a: "pil" },
  { t: "Aucune règle d'éthique n'est diffusée et les manquements à l'intégrité ne sont jamais traités.", a: "env" },
];

function CosoDiagnostic() {
  const [ans, setAns] = useState<Record<number, string>>({});
  const score = diag.filter((d, i) => ans[i] === d.a).length;
  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-ink">🩺 Activité : diagnostic COSO</h3>
        <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">
          {score} / {diag.length}
        </span>
      </div>
      <p className="mb-3 text-sm text-slate-600">
        Pour chaque situation (fictive), quelle composante COSO est principalement défaillante ?
      </p>
      <div className="space-y-3">
        {diag.map((d, i) => {
          const a = ans[i];
          return (
            <div key={i} className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-800">{d.t}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {coso.map((c) => (
                  <button
                    key={c.id}
                    disabled={!!a}
                    onClick={() => setAns((x) => ({ ...x, [i]: c.id }))}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-xs font-bold",
                      !a && "border-slate-300 bg-white hover:border-ink",
                      a && c.id === d.a && "border-emerald-500 bg-emerald-50 text-emerald-900",
                      a === c.id && c.id !== d.a && "border-rose-400 bg-rose-50 text-rose-900",
                      a && a !== c.id && c.id !== d.a && "border-slate-200 bg-white text-slate-300"
                    )}
                  >
                    {c.n}. {c.t}
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

const quiz2: QuizQ[] = [
  {
    q: "Les normes de l'IIA s'appliquent principalement à :",
    options: ["L'audit interne", "La Cour des comptes", "L'inspection générale", "La comptabilité publique"],
    answer: 0,
    explain: "Les normes IIA (Institute of Internal Auditors) s'appliquent à l'audit interne.",
  },
  {
    q: "Laquelle de ces notions est une norme de QUALIFICATION de l'IIA ?",
    options: ["Planification", "Communication des résultats", "Objectivité", "Accomplissement de la mission"],
    answer: 2,
    explain: "Qualification : indépendance, objectivité, compétence. Fonctionnement : planification, accomplissement de la mission, communication des résultats.",
  },
  {
    q: "Les normes ISSAI (INTOSAI) sont appliquées par :",
    options: ["Les ISC, dont la Cour des comptes du Maroc", "Les auditeurs internes de communes", "Les commissaires aux comptes uniquement", "Les inspections ministérielles"],
    answer: 0,
    explain: "Les ISSAI sont les normes internationales des Institutions Supérieures de Contrôle des finances publiques (ISC), appliquées par la Cour des comptes du Maroc.",
  },
  {
    q: "La séparation des tâches ordonnateur / comptable relève de quelle composante COSO ?",
    options: ["Environnement de contrôle", "Évaluation des risques", "Activités de contrôle", "Pilotage"],
    answer: 2,
    explain: "C'est un exemple cité par le cours pour les activités de contrôle (avec les doubles signatures et les contrôles informatiques).",
  },
  {
    q: "« Surveillance continue et évaluation périodique du dispositif » : quelle composante ?",
    options: ["Information et communication", "Pilotage", "Évaluation des risques", "Environnement de contrôle"],
    answer: 1,
    explain: "C'est la définition du pilotage, 5e composante COSO.",
  },
  {
    q: "Le contrôle interne fournit :",
    options: ["Une garantie absolue contre la fraude", "Une assurance raisonnable de réalisation des objectifs", "Une sanction disciplinaire", "Une certification des comptes"],
    answer: 1,
    explain: "Selon le cours, le contrôle interne fournit une assurance raisonnable quant à la réalisation des objectifs (opérations, reporting, conformité).",
  },
];

export default function Chapter2({ go }: { go: (id: string) => void }) {
  return (
    <div className="fade-up">
      <ChapterHeader
        kicker="Chapitre 2"
        title="Cadre normatif et contrôle interne (IIA, INTOSAI et COSO)"
        lead="Sur quelles normes s'appuient les auditeurs ? Et comment évaluer un dispositif de contrôle interne à l'aide du référentiel COSO ?"
      />

      <SectionTitle num="1">Les référentiels internationaux</SectionTitle>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border-t-4 border-emerald-600 bg-white p-5 shadow-sm">
          <p className="text-3xl">🏢</p>
          <h3 className="font-serif text-xl font-bold text-ink">Normes IIA</h3>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Institute of Internal Auditors
          </p>
          <p className="mt-2 text-slate-800">
            S'appliquent à l'<strong>audit interne</strong>. Elles se divisent en deux familles :
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl bg-emerald-50 p-3">
              <p className="text-sm font-bold text-emerald-800">Normes de qualification</p>
              <p className="text-sm text-slate-700">Indépendance, objectivité, compétence.</p>
              <p className="mt-1 text-xs text-slate-500">→ Qui est l'auditeur ?</p>
            </div>
            <div className="rounded-xl bg-sky-50 p-3">
              <p className="text-sm font-bold text-sky-800">Normes de fonctionnement</p>
              <p className="text-sm text-slate-700">
                Planification, accomplissement de la mission, communication des résultats.
              </p>
              <p className="mt-1 text-xs text-slate-500">→ Comment conduit-il sa mission ?</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-t-4 border-sky-700 bg-white p-5 shadow-sm">
          <p className="text-3xl">🌍</p>
          <h3 className="font-serif text-xl font-bold text-ink">Normes ISSAI (INTOSAI)</h3>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Normes internationales des ISC
          </p>
          <p className="mt-2 text-slate-800">
            Normes internationales des <strong>Institutions Supérieures de Contrôle des finances
            publiques (ISC)</strong>, appliquées par la <strong>Cour des comptes du Maroc</strong>.
          </p>
          <p className="mt-3 rounded-lg bg-slate-100 p-3 text-xs text-slate-600">
            Le cours présente les ISSAI à ce niveau général. Aucun numéro de norme n'est cité ici : ne
            pas en inventer ; se reporter au référentiel officiel si l'enseignant souhaite approfondir.
          </p>
        </div>
      </div>

      <Callout kind="key" title="Qui applique quoi ?">
        <p>
          <strong>IIA → audit interne</strong> (auditeur placé auprès du dirigeant) ·{" "}
          <strong>ISSAI / INTOSAI → audit externe des ISC</strong>, dont la Cour des comptes du Maroc.
        </p>
      </Callout>

      <div className="mt-4">
        <IIASorter />
      </div>

      <SectionTitle num="2">Le contrôle interne et le référentiel COSO</SectionTitle>
      <Callout kind="def" title="Définition du contrôle interne (cours)">
        <p>
          Le contrôle interne est un <strong>processus</strong> mis en œuvre par les{" "}
          <strong>dirigeants et le personnel</strong> pour fournir une{" "}
          <strong>assurance raisonnable</strong> quant à la réalisation des objectifs :{" "}
          <strong>opérations</strong>, <strong>reporting</strong> et <strong>conformité</strong>.
        </p>
      </Callout>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["⚙️", "Opérations", "Réalisation efficace des activités de l'entité."],
          ["📑", "Reporting", "Fiabilité de l'information financière et opérationnelle."],
          ["⚖️", "Conformité", "Respect des lois, règlements et procédures."],
        ].map(([i, t, d]) => (
          <div key={t} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl">{i}</p>
            <p className="font-bold text-ink">{t}</p>
            <p className="text-sm text-slate-600">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Les trois catégories d'objectifs sont celles du cours ; les précisions sont données à titre
        d'illustration.
      </p>

      <h3 className="mb-3 mt-8 font-serif text-xl font-bold text-ink">
        Les 5 composantes du cube COSO
      </h3>
      <CosoCube />

      <div className="mt-6 space-y-3">
        <Accordion title="Tableau récapitulatif des 5 composantes">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-ink/20 text-xs uppercase tracking-widest text-slate-500">
                  <th className="py-2 pr-3">#</th>
                  <th className="py-2 pr-3">Composante</th>
                  <th className="py-2">Définition du cours</th>
                </tr>
              </thead>
              <tbody>
                {coso.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 align-top">
                    <td className="py-2 pr-3 font-bold">{c.n}</td>
                    <td className="py-2 pr-3 font-semibold text-ink">{c.t}</td>
                    <td className="py-2 text-slate-700">{c.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Accordion>
      </div>

      <div className="mt-6">
        <CosoDiagnostic />
      </div>

      <h2 className="mb-4 mt-12 font-serif text-2xl font-bold text-ink">Synthèse du chapitre 2</h2>
      <Callout kind="key">
        <ul className="list-disc space-y-1 pl-5">
          <li>IIA : audit interne → normes de qualification + normes de fonctionnement.</li>
          <li>ISSAI (INTOSAI) : normes des ISC, appliquées par la Cour des comptes du Maroc.</li>
          <li>Contrôle interne = processus → assurance raisonnable (opérations, reporting, conformité).</li>
          <li>COSO : environnement de contrôle · évaluation des risques · activités de contrôle · information et communication · pilotage.</li>
        </ul>
      </Callout>

      <div className="mt-6">
        <Quiz title="Quiz de fin de chapitre 2" questions={quiz2} />
      </div>

      <PageNav
        go={go}
        prev={{ id: "ch1", label: "Chapitre 1" }}
        next={{ id: "ch3", label: "Chapitre 3 : Démarche d'une mission d'audit" }}
      />
    </div>
  );
}
