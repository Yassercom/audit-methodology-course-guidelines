import { useEffect, useState, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* ---------- Persistance locale ---------- */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

/* ---------- Titres ---------- */
export function ChapterHeader({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-8 border-b-2 border-ink/10 pb-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{kicker}</p>
      <h1 className="mt-2 font-serif text-3xl font-bold leading-tight text-ink md:text-4xl">
        {title}
      </h1>
      {lead && <p className="mt-3 max-w-3xl text-lg text-slate-600">{lead}</p>}
    </div>
  );
}

export function SectionTitle({
  num,
  children,
  id,
}: {
  num?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <h2
      id={id}
      className="mb-4 mt-12 flex scroll-mt-24 items-center gap-3 font-serif text-2xl font-bold text-ink"
    >
      {num && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">
          {num}
        </span>
      )}
      {children}
    </h2>
  );
}

/* ---------- Encadrés ---------- */
const calloutStyles = {
  def: { box: "border-navy bg-sky-50", tag: "text-navy", label: "Définition" },
  warn: { box: "border-amber-500 bg-amber-50", tag: "text-amber-700", label: "Attention" },
  key: { box: "border-emerald-600 bg-emerald-50", tag: "text-emerald-700", label: "À retenir" },
  ex: { box: "border-violet-500 bg-violet-50", tag: "text-violet-700", label: "Exemple" },
  note: { box: "border-slate-400 bg-slate-100", tag: "text-slate-600", label: "Note" },
  teacher: { box: "border-rose-500 bg-rose-50", tag: "text-rose-700", label: "Enseignant" },
} as const;

export function Callout({
  kind = "note",
  title,
  children,
  className,
}: {
  kind?: keyof typeof calloutStyles;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const s = calloutStyles[kind];
  return (
    <div className={cn("my-4 rounded-r-xl border-l-4 p-4", s.box, className)}>
      <p className={cn("mb-1 text-xs font-bold uppercase tracking-widest", s.tag)}>
        {title ?? s.label}
      </p>
      <div className="space-y-2 text-[15px] leading-relaxed text-slate-800">{children}</div>
    </div>
  );
}

/* ---------- Accordéon ---------- */
export function Accordion({
  title,
  children,
  defaultOpen = false,
  tone = "light",
  badge,
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  tone?: "light" | "dark";
  badge?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border shadow-sm",
        tone === "dark" ? "border-ink bg-white" : "border-slate-200 bg-white"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold transition",
          tone === "dark"
            ? "bg-ink text-white hover:bg-navy"
            : "bg-white text-ink hover:bg-slate-50"
        )}
      >
        <span className="flex items-center gap-2">
          {title}
          {badge && (
            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-bold text-gold">
              {badge}
            </span>
          )}
        </span>
        <span className={cn("text-xl transition-transform", open && "rotate-180")}>⌄</span>
      </button>
      {open && <div className="fade-up border-t border-slate-100 p-4">{children}</div>}
    </div>
  );
}

/* ---------- Onglets ---------- */
export function Tabs({
  tabs,
}: {
  tabs: { id: string; label: string; content: ReactNode }[];
}) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              t.id === active
                ? "border-ink bg-ink text-white shadow"
                : "border-slate-300 bg-white text-slate-600 hover:border-ink hover:text-ink"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div key={current.id} className="fade-up mt-4">
        {current.content}
      </div>
    </div>
  );
}

/* ---------- Quiz à choix unique ---------- */
export interface QuizQ {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export function Quiz({ title, questions }: { title: string; questions: QuizQ[] }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const done = answers.filter((a) => a !== null).length;
  const score = answers.filter((a, i) => a === questions[i].answer).length;

  return (
    <div className="rounded-2xl border-2 border-ink/10 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-serif text-xl font-bold text-ink">🧠 {title}</h3>
        <span className="rounded-full bg-ink px-3 py-1 text-sm font-bold text-white">
          {score} / {questions.length}
        </span>
      </div>
      <div className="space-y-6">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          return (
            <div key={qi}>
              <p className="font-semibold text-slate-800">
                {qi + 1}. {q.q}
              </p>
              <div className="mt-2 grid gap-2">
                {q.options.map((o, oi) => {
                  const isChosen = chosen === oi;
                  const isRight = oi === q.answer;
                  return (
                    <button
                      key={oi}
                      disabled={chosen !== null}
                      onClick={() =>
                        setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))
                      }
                      className={cn(
                        "rounded-lg border px-3 py-2 text-left text-sm transition",
                        chosen === null && "border-slate-300 hover:border-ink hover:bg-slate-50",
                        chosen !== null && isRight && "border-emerald-500 bg-emerald-50 text-emerald-900",
                        chosen !== null && isChosen && !isRight && "border-rose-400 bg-rose-50 text-rose-900",
                        chosen !== null && !isChosen && !isRight && "border-slate-200 text-slate-400"
                      )}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {chosen !== null && (
                <p className="fade-up mt-2 rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
                  <strong>{chosen === q.answer ? "✔ Correct. " : "✘ Pas tout à fait. "}</strong>
                  {q.explain}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>
          {done} / {questions.length} question(s) traitée(s)
        </span>
        {done > 0 && (
          <button
            onClick={() => setAnswers(questions.map(() => null))}
            className="font-semibold text-navy underline"
          >
            Recommencer
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- Divers ---------- */
export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700",
        className
      )}
    >
      {children}
    </span>
  );
}

export function PageNav({
  prev,
  next,
  go,
}: {
  prev?: { id: string; label: string };
  next?: { id: string; label: string };
  go: (id: string) => void;
}) {
  return (
    <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-ink/10 pt-6">
      {prev ? (
        <button
          onClick={() => go(prev.id)}
          className="rounded-lg border border-ink/20 bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-slate-50"
        >
          ← {prev.label}
        </button>
      ) : (
        <span />
      )}
      {next && (
        <button
          onClick={() => go(next.id)}
          className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white hover:bg-navy"
        >
          {next.label} →
        </button>
      )}
    </div>
  );
}
