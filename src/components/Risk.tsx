import { cn } from "../utils/cn";
import { impactLabels, levelLegend, probaLabels, riskLevel } from "../lib/risk";

export function Scale({
  label,
  value,
  onChange,
  labels,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  labels: string[];
}) {
  return (
    <div>
      <p className="mb-1 text-sm font-bold text-ink">
        {label} : <span className="text-gold">{value || "–"}</span>
        {value ? <span className="ml-2 font-normal text-slate-500">({labels[value]})</span> : null}
      </p>
      <div className="grid grid-cols-5 gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={cn(
              "rounded-lg border py-2 text-lg font-bold transition",
              value === n
                ? "border-ink bg-ink text-white shadow"
                : "border-slate-300 bg-white text-slate-600 hover:border-ink"
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RiskGauge({ p, i }: { p: number; i: number }) {
  if (!p || !i)
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-300 p-4 text-center text-slate-400">
        Choisissez une probabilité et un impact pour calculer la criticité.
      </div>
    );
  const score = p * i;
  const lv = riskLevel(score);
  return (
    <div className={cn("rounded-xl p-4 text-center shadow", lv.badge)}>
      <p className="text-sm font-semibold opacity-90">Criticité = Probabilité × Impact</p>
      <p className="text-3xl font-black">
        {p} × {i} = {score}
      </p>
      <p className="text-sm font-bold uppercase tracking-widest">
        Niveau {lv.label.toLowerCase()} (grille indicative)
      </p>
    </div>
  );
}

export function Heatmap({
  marks = [],
  p,
  i,
  onPick,
}: {
  marks?: { n: number | string; p: number; i: number }[];
  p?: number;
  i?: number;
  onPick?: (p: number, i: number) => void;
}) {
  return (
    <div>
      <div className="flex gap-2">
        <div className="flex w-5 items-center justify-center">
          <span className="-rotate-90 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-500">
            Impact →
          </span>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-[auto_repeat(5,1fr)] gap-1">
            {[5, 4, 3, 2, 1].map((iv) => (
              <div key={iv} className="contents">
                <div className="flex w-5 items-center justify-center text-xs font-bold text-slate-500">
                  {iv}
                </div>
                {[1, 2, 3, 4, 5].map((pv) => {
                  const score = pv * iv;
                  const lv = riskLevel(score);
                  const here = marks.filter((m) => m.p === pv && m.i === iv);
                  const selected = p === pv && i === iv;
                  return (
                    <button
                      key={pv}
                      onClick={() => onPick?.(pv, iv)}
                      title={`P${pv} × I${iv} = ${score} (${lv.label})`}
                      className={cn(
                        "relative flex aspect-square min-h-[2.6rem] flex-col items-center justify-center rounded-md text-sm font-bold transition",
                        lv.bg,
                        lv.text,
                        onPick && "hover:scale-105",
                        selected && "ring-4 ring-ink"
                      )}
                    >
                      <span className="text-xs opacity-80">{score}</span>
                      {here.length > 0 && (
                        <span className="flex flex-wrap justify-center gap-0.5">
                          {here.map((m) => (
                            <span
                              key={m.n}
                              className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] text-white"
                            >
                              {m.n}
                            </span>
                          ))}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
            <div />
            {[1, 2, 3, 4, 5].map((pv) => (
              <div key={pv} className="text-center text-xs font-bold text-slate-500">
                {pv}
              </div>
            ))}
          </div>
          <p className="mt-1 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
            Probabilité →
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs font-semibold">
        {levelLegend.map((l) => (
          <span key={l.label} className={cn("rounded-full px-3 py-1", l.badge)}>
            {l.label} ({l.range})
          </span>
        ))}
      </div>
    </div>
  );
}

export { probaLabels, impactLabels };
