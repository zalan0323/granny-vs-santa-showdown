import { useEffect, useState } from "react";

interface HitEffect {
  id: number;
  x: number;
  y: number;
}

interface DamageNumber {
  id: number;
  damage: number;
  x: number;
  y: number;
}

interface BattleEffectsProps {
  showGrannyHit: boolean;
  showSantaHit: boolean;
  lastGrannyDamage?: number;
  lastSantaDamage?: number;
}

export const BattleEffects = ({
  showGrannyHit,
  showSantaHit,
  lastGrannyDamage,
  lastSantaDamage,
}: BattleEffectsProps) => {
  const [hitEffects, setHitEffects] = useState<HitEffect[]>([]);
  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([]);

  useEffect(() => {
    if (showSantaHit) {
      const id = Date.now();
      setHitEffects((prev) => [...prev, { id, x: 60, y: 50 }]);
      if (lastSantaDamage) {
        setDamageNumbers((prev) => [...prev, { id, damage: lastSantaDamage, x: 60, y: 40 }]);
      }
      setTimeout(() => {
        setHitEffects((prev) => prev.filter((e) => e.id !== id));
        setDamageNumbers((prev) => prev.filter((e) => e.id !== id));
      }, 1000);
    }
  }, [showSantaHit, lastSantaDamage]);

  useEffect(() => {
    if (showGrannyHit) {
      const id = Date.now() + 1;
      setHitEffects((prev) => [...prev, { id, x: 40, y: 50 }]);
      if (lastGrannyDamage) {
        setDamageNumbers((prev) => [...prev, { id, damage: lastGrannyDamage, x: 40, y: 40 }]);
      }
      setTimeout(() => {
        setHitEffects((prev) => prev.filter((e) => e.id !== id));
        setDamageNumbers((prev) => prev.filter((e) => e.id !== id));
      }, 1000);
    }
  }, [showGrannyHit, lastGrannyDamage]);

  return (
    <>
      {/* Impact Effects */}
      {hitEffects.map((effect) => (
        <div
          key={effect.id}
          className="absolute pointer-events-none"
          style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
        >
          {/* Star burst */}
          <div className="relative">
            <div className="absolute inset-0 animate-hit-impact">
              <svg width="100" height="100" viewBox="0 0 100 100" className="absolute -left-12 -top-12">
                <path
                  d="M50 0 L61 39 L100 39 L68 61 L79 100 L50 78 L21 100 L32 61 L0 39 L39 39 Z"
                  fill="#fbbf24"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="absolute inset-0 animate-hit-impact" style={{ animationDelay: "0.1s" }}>
              <svg width="80" height="80" viewBox="0 0 100 100" className="absolute -left-10 -top-10">
                <path
                  d="M50 0 L61 39 L100 39 L68 61 L79 100 L50 78 L21 100 L32 61 L0 39 L39 39 Z"
                  fill="#ef4444"
                  stroke="#dc2626"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
          
          {/* POW text */}
          <div className="absolute -left-16 -top-8 text-5xl font-black text-accent animate-hit-impact drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
            POW!
          </div>
        </div>
      ))}

      {/* Damage Numbers */}
      {damageNumbers.map((dmg) => (
        <div
          key={dmg.id}
          className="absolute pointer-events-none"
          style={{ left: `${dmg.x}%`, top: `${dmg.y}%` }}
        >
          <div className="text-5xl font-black text-destructive animate-damage-pop drop-shadow-[0_0_15px_rgba(239,68,68,1)]">
            -{dmg.damage}
          </div>
        </div>
      ))}
    </>
  );
};
