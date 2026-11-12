import { useCallback, useEffect, useState } from "react";
import Intro from "./sections/Intro";
import Chapter1 from "./sections/Chapter1";
import Chapter2 from "./sections/Chapter2";
import Chapter3 from "./sections/Chapter3";
import Workshop from "./sections/Workshop";
import { useLocalStorage } from "./components/ui";
import { cn } from "./utils/cn";

const NAV = [
  { id: "intro", icon: "🏁", label: "Introduction", sub: "Objectifs et déroulement" },
  { id: "ch1", icon: "📘", label: "Chapitre 1", sub: "Fondements et typologie de l'audit" },
  { id: "ch2", icon: "⚖️", label: "Chapitre 2", sub: "Cadre normatif et contrôle interne" },
  { id: "ch3", icon: "🧭", label: "Chapitre 3", sub: "Démarche d'une mission d'audit" },
  { id: "atelier", icon: "🛠️", label: "Atelier pratique", sub: "Commune de Dar Bouazza" },
];

function readHash() {
  const h = window.location.hash.replace("#", "");
  return NAV.some((n) => n.id === h) ? h : "intro";
}

export default function App() {
  const [page, setPage] = useState(readHash);
  const [menu, setMenu] = useState(false);
  const [teacher, setTeacher] = useLocalStorage("audit-teacher", false);

  const go = useCallback((id: string) => {
    setPage(id);
    setMenu(false);
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onHash = () => setPage(readHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const idx = NAV.findIndex((n) => n.id === page);

  return (
    <div className="min-h-screen lg:flex">
      {/* Barre latérale */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 shrink-0 transform overflow-y-auto bg-ink p-5 text-white shadow-2xl transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none",
          menu ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={() => go("intro")}
          className="mb-6 block text-left"
          aria-label="Retour à l'introduction"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Module 1 · S1</p>
          <p className="font-serif text-2xl font-bold leading-tight">Méthodologie d'Audit</p>
          <p className="mt-1 text-xs text-sky-200">Master Gouvernance Publique et Techniques d'Audit</p>
        </button>
        <nav className="space-y-1.5">
          {NAV.map((n, i) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition",
                page === n.id ? "bg-white text-ink shadow-lg" : "text-sky-100 hover:bg-white/10"
              )}
            >
              <span className="text-xl">{n.icon}</span>
              <span>
                <span className="block text-sm font-bold">{n.label}</span>
                <span className={cn("block text-xs", page === n.id ? "text-slate-500" : "text-sky-300")}>
                  {n.sub}
                </span>
              </span>
              <span
                className={cn(
                  "ml-auto text-[10px] font-bold",
                  page === n.id ? "text-gold" : "text-sky-400"
                )}
              >
                {i < 4 ? i : "★"}
              </span>
            </button>
          ))}
        </nav>

        <div className="mt-8 rounded-xl bg-white/10 p-3 text-xs text-sky-100">
          <p className="mb-1 font-bold uppercase tracking-widest text-gold">Rappel</p>
          <p>
            <strong>3 niveaux</strong> : régularité · financier · performance.
          </p>
          <p>
            <strong>3 critères de performance</strong> : économie · efficience · efficacité.
          </p>
          <p>
            <strong>4 phases</strong> : préparation · réalisation · conclusion · suivi.
          </p>
          <p>
            <strong>5 composantes COSO</strong>.
          </p>
          <p>
            <strong>FRAP</strong> : constat · cause · conséquence · recommandation.
          </p>
        </div>
      </aside>

      {menu && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMenu(false)}
          aria-hidden
        />
      )}

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-ink/10 bg-[#f4f1ea]/90 px-4 py-3 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenu(true)}
              className="rounded-lg border border-ink/20 bg-white px-3 py-1.5 text-lg lg:hidden"
              aria-label="Ouvrir le menu"
            >
              ☰
            </button>
            <div className="hidden items-center gap-1 sm:flex">
              {NAV.map((n, i) => (
                <span
                  key={n.id}
                  className={cn(
                    "h-2 w-8 rounded-full transition",
                    i <= idx ? "bg-gold" : "bg-ink/15"
                  )}
                />
              ))}
            </div>
            <p className="text-sm font-semibold text-ink">{NAV[idx].label}</p>
          </div>
          <button
            onClick={() => setTeacher(!teacher)}
            aria-pressed={teacher}
            className={cn(
              "flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-bold transition",
              teacher
                ? "border-rose-600 bg-rose-600 text-white shadow"
                : "border-ink/30 bg-white text-ink hover:border-ink"
            )}
          >
            {teacher ? "🔓 Mode enseignant : activé" : "🔒 Mode enseignant"}
          </button>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
          {page === "intro" && <Intro go={go} />}
          {page === "ch1" && <Chapter1 go={go} />}
          {page === "ch2" && <Chapter2 go={go} />}
          {page === "ch3" && <Chapter3 go={go} />}
          {page === "atelier" && <Workshop go={go} teacher={teacher} />}
          <footer className="mt-16 border-t border-ink/10 pt-4 text-center text-xs text-slate-500">
            Module 1 : Méthodologie d'Audit — Master Gouvernance Publique et Techniques d'Audit (S1).
            Support pédagogique construit à partir du cours fourni.
          </footer>
        </main>
      </div>
    </div>
  );
}
