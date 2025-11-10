import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BattleEffects } from "@/components/BattleEffects";
import { Fighter } from "@/types/fighter";

interface BattleArenaProps {
  fighter1: Fighter;
  fighter2: Fighter;
  onBackToSelect: () => void;
}

const BattleArena = ({ fighter1, fighter2, onBackToSelect }: BattleArenaProps) => {
  const [fighter1Health, setFighter1Health] = useState(100);
  const [fighter2Health, setFighter2Health] = useState(100);
  const [isBattling, setIsBattling] = useState(false);
  const [winner, setWinner] = useState<Fighter | null>(null);
  const [fighter1Punching, setFighter1Punching] = useState(false);
  const [fighter2Punching, setFighter2Punching] = useState(false);
  const [fighter1Shaking, setFighter1Shaking] = useState(false);
  const [fighter2Shaking, setFighter2Shaking] = useState(false);
  const [showFighter1Hit, setShowFighter1Hit] = useState(false);
  const [showFighter2Hit, setShowFighter2Hit] = useState(false);
  const [lastFighter1Damage, setLastFighter1Damage] = useState(0);
  const [lastFighter2Damage, setLastFighter2Damage] = useState(0);

  const startBattle = () => {
    setIsBattling(true);
    setWinner(null);
    setFighter1Health(100);
    setFighter2Health(100);

    // Simulate battle with random attacks
    const battleInterval = setInterval(() => {
      const attacker = Math.random() > 0.5 ? 1 : 2;
      const damage = Math.floor(Math.random() * 15) + 10;

      if (attacker === 1) {
        // Fighter 1 attacks
        setFighter1Punching(true);
        setTimeout(() => {
          setFighter1Punching(false);
          setFighter2Shaking(true);
          setShowFighter2Hit(true);
          setLastFighter2Damage(damage);
          setTimeout(() => {
            setFighter2Shaking(false);
            setShowFighter2Hit(false);
          }, 600);
        }, 300);
        
        setFighter2Health((prev) => {
          const newHealth = Math.max(0, prev - damage);
          if (newHealth === 0) {
            clearInterval(battleInterval);
            setTimeout(() => {
              setWinner(fighter1);
              setIsBattling(false);
            }, 800);
          }
          return newHealth;
        });
      } else {
        // Fighter 2 attacks
        setFighter2Punching(true);
        setTimeout(() => {
          setFighter2Punching(false);
          setFighter1Shaking(true);
          setShowFighter1Hit(true);
          setLastFighter1Damage(damage);
          setTimeout(() => {
            setFighter1Shaking(false);
            setShowFighter1Hit(false);
          }, 600);
        }, 300);
        
        setFighter1Health((prev) => {
          const newHealth = Math.max(0, prev - damage);
          if (newHealth === 0) {
            clearInterval(battleInterval);
            setTimeout(() => {
              setWinner(fighter2);
              setIsBattling(false);
            }, 800);
          }
          return newHealth;
        });
      }
    }, 1200);
  };

  const resetBattle = () => {
    setFighter1Health(100);
    setFighter2Health(100);
    setWinner(null);
    setIsBattling(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-6xl font-black mb-2 bg-gradient-to-r from-granny via-accent to-santa bg-clip-text text-transparent">
            {fighter1.name} VS {fighter2.name}
          </h1>
          <p className="text-2xl text-muted-foreground font-bold tracking-wider">
            ULTIMATE SHOWDOWN
          </p>
        </div>

        {/* Battle Arena */}
        <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border-4 border-border p-8 mb-6 shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-granny/10 via-transparent to-santa/10 rounded-3xl" />
          
          {/* Battle Effects Overlay */}
          <BattleEffects
            showGrannyHit={showFighter1Hit}
            showSantaHit={showFighter2Hit}
            lastGrannyDamage={lastFighter1Damage}
            lastSantaDamage={lastFighter2Damage}
          />
          
          <div className="relative grid grid-cols-2 gap-8 mb-8">
            {/* Fighter 1 */}
            <div className="space-y-4">
              <div className={`relative transition-all duration-300 ${fighter1Punching ? 'animate-punch-right' : ''} ${fighter1Shaking ? 'animate-shake' : ''} ${winner?.id === fighter1.id ? 'animate-victory' : ''}`}>
                <div className={`aspect-square rounded-2xl overflow-hidden border-4 shadow-lg transition-shadow duration-300`} style={{ borderColor: `hsl(var(--${fighter1.color}))`, boxShadow: `0 10px 40px hsl(var(--${fighter1.color}) / 0.5)` }}>
                  <img
                    src={fighter1.image}
                    alt={fighter1.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${fighter1Shaking ? 'brightness-150 contrast-125' : ''}`}
                  />
                </div>
                
                {/* Attack indicator */}
                {fighter1Punching && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 animate-float-up">
                    <div className="text-4xl">👊</div>
                  </div>
                )}
                {winner?.id === fighter1.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-black drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] animate-pulse" style={{ color: `hsl(var(--${fighter1.color}))` }}>
                      WINNER!
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold" style={{ color: `hsl(var(--${fighter1.color}))` }}>{fighter1.name}</h3>
                  <span className="text-2xl font-bold text-foreground">{fighter1Health}%</span>
                </div>
                <Progress value={fighter1Health} className="h-4 bg-muted" />
              </div>
            </div>

            {/* VS Divider */}
            {!winner && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-5xl font-black shadow-lg shadow-accent/50 border-4 border-accent-foreground/20">
                  VS
                </div>
              </div>
            )}

            {/* Fighter 2 */}
            <div className="space-y-4">
              <div className={`relative transition-all duration-300 ${fighter2Punching ? 'animate-punch-left' : ''} ${fighter2Shaking ? 'animate-shake' : ''} ${winner?.id === fighter2.id ? 'animate-victory' : ''}`}>
                <div className={`aspect-square rounded-2xl overflow-hidden border-4 shadow-lg transition-shadow duration-300`} style={{ borderColor: `hsl(var(--${fighter2.color}))`, boxShadow: `0 10px 40px hsl(var(--${fighter2.color}) / 0.5)` }}>
                  <img
                    src={fighter2.image}
                    alt={fighter2.name}
                    className={`w-full h-full object-cover transition-all duration-300 ${fighter2Shaking ? 'brightness-150 contrast-125' : ''}`}
                  />
                </div>
                
                {/* Attack indicator */}
                {fighter2Punching && (
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 animate-float-up">
                    <div className="text-4xl">👊</div>
                  </div>
                )}
                {winner?.id === fighter2.id && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-black drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] animate-pulse" style={{ color: `hsl(var(--${fighter2.color}))` }}>
                      WINNER!
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold" style={{ color: `hsl(var(--${fighter2.color}))` }}>{fighter2.name}</h3>
                  <span className="text-2xl font-bold text-foreground">{fighter2Health}%</span>
                </div>
                <Progress value={fighter2Health} className="h-4 bg-muted" />
              </div>
            </div>
          </div>

          {/* Winner Banner */}
          {winner && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div className="bg-background/95 backdrop-blur-md px-12 py-6 rounded-2xl border-4 border-accent shadow-2xl animate-fade-in">
                <p className="text-5xl font-black bg-gradient-to-r from-granny to-santa bg-clip-text text-transparent">
                  {winner.name} WINS!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {!isBattling && !winner && (
            <Button
              onClick={startBattle}
              size="lg"
              className="text-2xl px-12 py-8 bg-gradient-to-r from-granny to-santa hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 font-black"
            >
              START BATTLE!
            </Button>
          )}
          {(winner || isBattling) && (
            <>
              <Button
                onClick={resetBattle}
                size="lg"
                variant="outline"
                className="text-2xl px-12 py-8 font-black border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                REMATCH
              </Button>
              <Button
                onClick={onBackToSelect}
                size="lg"
                variant="secondary"
                className="text-2xl px-12 py-8 font-black transition-all duration-300"
              >
                CHANGE FIGHTERS
              </Button>
            </>
          )}
        </div>

        {isBattling && !winner && (
          <div className="text-center mt-6">
            <p className="text-xl text-accent font-bold animate-pulse">
              BATTLE IN PROGRESS...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleArena;
