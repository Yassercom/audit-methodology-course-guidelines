import { useState, type ReactNode } from "react";
import { Accordion, Callout, ChapterHeader, PageNav, Tabs, useLocalStorage } from "../components/ui";
import { Heatmap, RiskGauge, Scale, impactLabels, probaLabels } from "../components/Risk";
import { COSO_LIST, exercises, type Exercise } from "../data/workshop";
import { riskLevel } from "../lib/risk";
import { cn } from "../utils/cn";

interface Work {
  coso: string[];
  dys: string[];
  p: number;
  i: number;
  just: string;
  constat: string;
  cause: string;
  conseq: string;
  reco: string;
}

const emptyWork = (axes: number): Work => ({
  coso: [],
  dys: Array(axes).fill(""),
  p: 0,
  i: 0,
  just: "",
  constat: "",
  cause: "",
  conseq: "",
  reco: "",
});

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-ink focus:ring-2 focus:ring-ink/10"
    />
  );
}

function StepCard({
  n,
  title,
  done,
  children,
}: {
  n: number;
  title: string;
  done: boolean;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="mb-3 flex items-center gap-3 font-serif text-lg font-bold text-ink">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white",
            done ? "bg-emerald-600" : "bg-ink"
          )}
        >
          {done ? "✓" : n}
        </span>
        {title}
      </h4>
      {children}
    </section>
  );
}

/* ---------- Corrigé ---------- */
function Corrige({
  ex,
  work,
  teacher,
  revealed,
  setRevealed,
}: {
  ex: Exercise;
  work: Work;
  teacher: boolean;
  revealed: boolean;
  setRevealed: (v: boolean) => void;
}) {
  const c = ex.corrige;
  const visible = teacher && revealed;
  const score = c.p * c.i;
  const lv = riskLevel(score);
  const mine = work.p && work.i ? work.p * work.i : 0;

  if (!visible) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50 p-5 text-center">
        <p className="text-3xl">🔒</p>
        <p className="font-serif text-lg font-bold text-ink">Corrigé détaillé — masqué</p>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">
          Le corrigé est révélé par l'enseignant, une fois que les étudiants ont proposé leurs
          réponses.
        </p>
        {teacher ? (
          <button
            onClick={() => setRevealed(true)}
            className="mt-3 rounded-lg bg-rose-600 px-5 py-2 font-bold text-white shadow hover:bg-rose-700"
          >
            👁 Révéler le corrigé
          </button>
        ) : (
          <p className="mt-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-rose-700">
            Activez le « Mode enseignant » (en haut de l'écran) pour le révéler
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="fade-up space-y-3">
      <div className="flex items-center justify-between rounded-xl bg-ink px-4 py-3 text-white">
        <p className="font-serif text-lg font-bold">✅ Corrigé détaillé — {ex.title}</p>
        <button
          onClick={() => setRevealed(false)}
          className="rounded-lg bg-white/15 px-3 py-1 text-sm font-semibold hover:bg-white/25"
        >
          Masquer
        </button>
      </div>

      <Accordion title="1. Composantes COSO concernées" defaultOpen>
        <div className="space-y-2">
          {c.coso.map((x) => {
            const label = COSO_LIST.find((l) => l.id === x.id)!;
            return (
              <div
                key={x.id}
                className={cn(
                  "rounded-lg border-l-4 p-3 text-sm",
                  x.direct ? "border-rose-500 bg-rose-50" : "border-slate-400 bg-slate-50"
                )}
              >
                <p className="font-bold text-ink">
                  {label.label}{" "}
                  <span
                    className={cn(
                      "ml-1 rounded-full px-2 py-0.5 text-xs",
                      x.direct ? "bg-rose-600 text-white" : "bg-slate-300 text-slate-700"
                    )}
                  >
                    {x.direct ? "Violation directe" : "Concernée indirectement"}
                  </span>
                  {work.coso.includes(x.id) && (
                    <span className="ml-1 text-xs text-emerald-700">✔ identifiée par l'étudiant</span>
                  )}
                </p>
                <p className="text-slate-700">{x.why}</p>
              </div>
            );
          })}
          <p className="text-xs text-slate-500">
            Selon la profondeur de l'analyse, un rattachement différent est acceptable s'il est
            justifié.
          </p>
        </div>
      </Accordion>

      <Accordion title="2. Dysfonctionnements identifiés">
        <ol className="space-y-2">
          {c.dys.map((d, i) => (
            <li key={d.t} className="rounded-lg bg-slate-50 p-3 text-sm">
              <p className="font-bold text-ink">
                {i + 1}. {d.t}
              </p>
              <p className="text-slate-700">{d.d}</p>
            </li>
          ))}
        </ol>
        <p className="mb-1 mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">
          Tests à prévoir en phase de réalisation
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {c.tests.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Accordion>

      <Accordion title="3. Criticité du risque (Probabilité × Impact)">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className={cn("rounded-xl p-4 text-center shadow", lv.badge)}>
              <p className="text-sm font-semibold">Proposition de corrigé</p>
              <p className="text-3xl font-black">
                {c.p} × {c.i} = {score}
              </p>
              <p className="text-sm font-bold uppercase tracking-widest">
                Niveau {lv.label.toLowerCase()}
              </p>
            </div>
            {mine > 0 && (
              <p className="mt-2 rounded-lg bg-slate-100 p-3 text-sm">
                <strong>Cotation de l'étudiant :</strong> {work.p} × {work.i} = {mine} (
                {riskLevel(mine).label.toLowerCase()}).{" "}
                {mine === score
                  ? "Identique au corrigé 👏"
                  : "À comparer et à discuter : l'essentiel est la justification."}
              </p>
            )}
            <p className="mt-2 text-sm text-slate-600">{c.alt}</p>
          </div>
          <Heatmap marks={[{ n: "✔", p: c.p, i: c.i }]} />
        </div>
        <div className="mt-3 space-y-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          {c.calculs.map((x) => (
            <p key={x}>🧮 {x}</p>
          ))}
        </div>
      </Accordion>

      <Accordion title="4. Justification de la cotation">
        <div className="space-y-2 text-sm text-slate-800">
          <p className="rounded-lg bg-sky-50 p-3">{c.justP}</p>
          <p className="rounded-lg bg-amber-50 p-3">{c.justI}</p>
        </div>
      </Accordion>

      <Accordion title="5. FRAP complète (Constat · Cause · Conséquence · Recommandation)">
        <div className="overflow-hidden rounded-xl border-2 border-ink/20">
          <div className="bg-ink px-4 py-2 text-sm font-bold text-white">
            FRAP — {ex.title.replace(/^FRAP \d — /, "")} · Commune de Dar Bouazza (cas pédagogique) ·
            Criticité {score} ({lv.label})
          </div>
          <FrapRow label="Constat" color="bg-sky-700">
            <p>{c.frap.constat}</p>
          </FrapRow>
          <FrapRow label="Cause" color="bg-amber-600">
            <ul className="list-disc space-y-1 pl-5">
              {c.frap.cause.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </FrapRow>
          <FrapRow label="Conséquence" color="bg-rose-700">
            <ul className="list-disc space-y-1 pl-5">
              {c.frap.conseq.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </FrapRow>
          <FrapRow label="Recommandation" color="bg-emerald-700">
            <ol className="space-y-2">
              {c.frap.reco.map((r, i) => (
                <li key={r.a} className="rounded-lg bg-white/70 p-2">
                  <p>
                    <strong>R{i + 1}.</strong> {r.a}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    <strong>Responsable :</strong> {r.r} · <strong>Échéance :</strong> {r.d}
                  </p>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-slate-500">
              Responsables proposés à titre d'exemple : à adapter à l'organigramme réel.
            </p>
          </FrapRow>
        </div>
      </Accordion>
    </div>
  );
}

function FrapRow({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <div className="grid border-t border-slate-200 sm:grid-cols-[9rem_1fr]">
      <div className={cn("px-4 py-3 text-sm font-bold text-white", color)}>{label}</div>
      <div className="bg-white px-4 py-3 text-sm text-slate-800">{children}</div>
    </div>
  );
}

/* ---------- Exercice ---------- */
function ExerciseView({
  ex,
  teacher,
  revealed,
  setRevealed,
}: {
  ex: Exercise;
  teacher: boolean;
  revealed: boolean;
  setRevealed: (v: boolean) => void;
}) {
  const [work, setWork] = useLocalStorage<Work>(`audit-work-${ex.id}`, emptyWork(ex.axes.length));
  const up = (patch: Partial<Work>) => setWork({ ...work, ...patch });

  const steps = [
    work.coso.length > 0,
    work.dys.some((d) => d.trim()),
    work.p > 0 && work.i > 0,
    work.just.trim().length > 0,
    [work.constat, work.cause, work.conseq, work.reco].every((x) => x.trim()),
  ];
  const doneCount = steps.filter(Boolean).length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl bg-gradient-to-r from-ink to-navy p-5 text-white shadow">
        <p className="text-xs font-bold uppercase tracking-widest text-gold">Exercice indépendant</p>
        <h3 className="font-serif text-2xl font-bold">
          {ex.icon} {ex.title}
        </h3>
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-xs font-semibold text-sky-100">
            <span>Progression de l'étudiant</span>
            <span>{doneCount} / 5 étapes</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gold transition-all"
              style={{ width: `${(doneCount / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border-l-8 border-violet-500 bg-violet-50 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-700">
          Observation relevée sur le terrain (données du cas)
        </p>
        <p className="mt-2 text-slate-800">{ex.observation}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {ex.facts.map((f) => (
            <div key={f.l} className="rounded-xl bg-white p-3 text-center shadow-sm">
              <p className="text-xl font-black text-ink">{f.v}</p>
              <p className="text-xs text-slate-500">{f.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {ex.derived.map((f) => (
            <div key={f.l} className="flex items-center gap-3 rounded-xl border border-dashed border-violet-300 bg-white/60 p-2">
              <span className="text-lg font-black text-violet-700">{f.v}</span>
              <span className="text-xs text-slate-600">{f.l}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Les encadrés en pointillés sont des indicateurs calculés à partir des données du cas.
        </p>
      </div>

      <StepCard n={1} title="Identifier les composantes COSO concernées" done={steps[0]}>
        <p className="mb-2 text-sm text-slate-600">
          Cochez toutes les composantes dont les principes sont violés ou affectés.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {COSO_LIST.map((c, idx) => {
            const on = work.coso.includes(c.id);
            return (
              <label
                key={c.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm font-semibold transition",
                  on ? "border-ink bg-ink text-white" : "border-slate-300 bg-white text-slate-700 hover:border-ink"
                )}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() =>
                    up({ coso: on ? work.coso.filter((x) => x !== c.id) : [...work.coso, c.id] })
                  }
                  className="h-4 w-4 accent-amber-500"
                />
                {idx + 1}. {c.label}
              </label>
            );
          })}
        </div>
      </StepCard>

      <StepCard n={2} title="Identifier les dysfonctionnements" done={steps[1]}>
        <div className="space-y-3">
          {ex.axes.map((a, idx) => (
            <div key={a.t}>
              <p className="text-sm font-bold text-ink">{a.t}</p>
              <p className="mb-1 text-xs italic text-slate-500">💡 {a.hint}</p>
              <TextArea
                value={work.dys[idx] ?? ""}
                onChange={(v) => up({ dys: work.dys.map((d, k) => (k === idx ? v : d)) })}
                placeholder="Décrivez le dysfonctionnement…"
                rows={2}
              />
            </div>
          ))}
        </div>
      </StepCard>

      <StepCard n={3} title="Calculer la criticité du risque (Probabilité × Impact)" done={steps[2]}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Scale label="Probabilité" value={work.p} onChange={(p) => up({ p })} labels={probaLabels} />
            <Scale label="Impact" value={work.i} onChange={(i) => up({ i })} labels={impactLabels} />
            <RiskGauge p={work.p} i={work.i} />
          </div>
          <Heatmap
            marks={work.p && work.i ? [{ n: "●", p: work.p, i: work.i }] : []}
            p={work.p}
            i={work.i}
            onPick={(p, i) => up({ p, i })}
          />
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Formule du cours : Criticité = Probabilité (1 à 5) × Impact (1 à 5). Les libellés de
          niveaux sont indicatifs.
        </p>
      </StepCard>

      <StepCard n={4} title="Justifier la cotation" done={steps[3]}>
        <TextArea
          value={work.just}
          onChange={(v) => up({ just: v })}
          placeholder="Pourquoi cette probabilité ? Pourquoi cet impact ? Appuyez-vous sur les données chiffrées du cas."
          rows={4}
        />
      </StepCard>

      <StepCard n={5} title="Rédiger la FRAP complète" done={steps[4]}>
        <div className="space-y-3">
          {[
            { k: "constat" as const, l: "Constat (Fait)", c: "text-sky-700", ph: "Ce qui a été observé, objectivement et chiffré…" },
            { k: "cause" as const, l: "Cause", c: "text-amber-700", ph: "L'origine du dysfonctionnement…" },
            { k: "conseq" as const, l: "Conséquence", c: "text-rose-700", ph: "Impact financier, juridique ou opérationnel…" },
            { k: "reco" as const, l: "Recommandation", c: "text-emerald-700", ph: "Action corrective précise, réaliste, attribuée à un responsable (avec échéance)…" },
          ].map((f) => (
            <div key={f.k}>
              <p className={cn("text-sm font-bold", f.c)}>{f.l}</p>
              <TextArea value={work[f.k]} onChange={(v) => up({ [f.k]: v })} placeholder={f.ph} rows={3} />
            </div>
          ))}
        </div>
      </StepCard>

      <div className="flex justify-end">
        <button
          onClick={() => {
            if (confirm("Effacer toutes les réponses de cet exercice ?")) setWork(emptyWork(ex.axes.length));
          }}
          className="text-sm font-semibold text-slate-500 underline hover:text-rose-600"
        >
          Réinitialiser mes réponses
        </button>
      </div>

      <Corrige ex={ex} work={work} teacher={teacher} revealed={revealed} setRevealed={setRevealed} />
    </div>
  );
}

export default function Workshop({
  go,
  teacher,
}: {
  go: (id: string) => void;
  teacher: boolean;
}) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  return (
    <div className="fade-up">
      <ChapterHeader
        kicker="Atelier pratique"
        title="Audit de la gestion des subventions et des carburants — Commune Urbaine de Dar Bouazza"
        lead="Mettez en œuvre la démarche : identifier les principes COSO violés, coter les risques (Probabilité × Impact) et rédiger deux fiches FRAP complètes."
      />

      <Callout kind="warn" title="Cas pédagogique">
        <p>
          Les données de la Commune de Dar Bouazza constituent un{" "}
          <strong>cas pédagogique fourni pour cet exercice</strong>. Elles ne doivent{" "}
          <strong>pas être présentées comme des faits officiellement constatés</strong> sur la
          commune réelle.
        </p>
      </Callout>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-ink">Contexte</h2>
        <p className="mt-2 text-slate-700">
          Vous êtes chargé d'une <strong>mission d'audit interne</strong> au sein de la Commune de
          Dar Bouazza (<strong>budget annuel : 85 millions de MAD</strong>). Deux observations ont
          été relevées sur le terrain.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div className="rounded-xl bg-amber-50 p-3 text-sm">
            <p className="font-bold text-amber-800">⛽ Observation 1 · Carburant</p>
            <p className="text-slate-700">
              Régisseur cumulant commande, distribution et suivi ; aucun contrôle du kilométrage ;
              consommation + 38 % (+ 420 000 MAD) sans augmentation du parc.
            </p>
          </div>
          <div className="rounded-xl bg-sky-50 p-3 text-sm">
            <p className="font-bold text-sky-800">🤲 Observation 2 · Subventions</p>
            <p className="text-slate-700">
              15 associations pour 1,2 million MAD ; 9 sans rapport moral ou financier de l'exercice
              précédent, en violation de la convention de partenariat.
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
          <p className="font-bold text-ink">Travail demandé (pour chacun des deux exercices)</p>
          <ol className="mt-1 list-decimal space-y-0.5 pl-5">
            <li>Identifier les composantes COSO concernées.</li>
            <li>Identifier les dysfonctionnements.</li>
            <li>Calculer la criticité du risque (Probabilité × Impact).</li>
            <li>Justifier la cotation.</li>
            <li>Rédiger une FRAP complète : Constat, Cause, Conséquence, Recommandation.</li>
          </ol>
        </div>
      </div>

      <Callout kind="teacher" title="Conseils d'animation">
        <p>
          Les deux exercices sont indépendants : ils peuvent être confiés à deux groupes distincts.
          Les réponses des étudiants sont conservées localement dans le navigateur. Le corrigé reste
          verrouillé tant que le « Mode enseignant » n'est pas activé, puis doit être explicitement
          révélé pour chaque exercice.
        </p>
      </Callout>

      <div className="mt-6">
        <Tabs
          tabs={exercises.map((ex) => ({
            id: ex.id,
            label: ex.tab,
            content: (
              <ExerciseView
                ex={ex}
                teacher={teacher}
                revealed={!!revealed[ex.id]}
                setRevealed={(v) => setRevealed((r) => ({ ...r, [ex.id]: v }))}
              />
            ),
          }))}
        />
      </div>

      <PageNav go={go} prev={{ id: "ch3", label: "Chapitre 3" }} next={{ id: "intro", label: "Retour à l'introduction" }} />
    </div>
  );
}
