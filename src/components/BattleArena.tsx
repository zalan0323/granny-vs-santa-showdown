import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BattleEffects } from "@/components/BattleEffects";
import grannyFighter from "@/assets/granny-fighter.png";
import santaFighter from "@/assets/santa-fighter.png";

type Fighter = "granny" | "santa";

const BattleArena = () => {
  const [grannyHealth, setGrannyHealth] = useState(100);
  const [santaHealth, setSantaHealth] = useState(100);
  const [isBattling, setIsBattling] = useState(false);
  const [winner, setWinner] = useState<Fighter | null>(null);
  const [grannyPunching, setGrannyPunching] = useState(false);
  const [santaPunching, setSantaPunching] = useState(false);
  const [grannyShaking, setGrannyShaking] = useState(false);
  const [santaShaking, setSantaShaking] = useState(false);
  const [showGrannyHit, setShowGrannyHit] = useState(false);
  const [showSantaHit, setShowSantaHit] = useState(false);
  const [lastGrannyDamage, setLastGrannyDamage] = useState(0);
  const [lastSantaDamage, setLastSantaDamage] = useState(0);

  const startBattle = () => {
    setIsBattling(true);
    setWinner(null);
    setGrannyHealth(100);
    setSantaHealth(100);

    // Simulate battle with random attacks
    const battleInterval = setInterval(() => {
      const attacker = Math.random() > 0.5 ? "granny" : "santa";
      const damage = Math.floor(Math.random() * 15) + 10;

      if (attacker === "granny") {
        // Granny attacks
        setGrannyPunching(true);
        setTimeout(() => {
          setGrannyPunching(false);
          setSantaShaking(true);
          setShowSantaHit(true);
          setLastSantaDamage(damage);
          setTimeout(() => {
            setSantaShaking(false);
            setShowSantaHit(false);
          }, 600);
        }, 300);
        
        setSantaHealth((prev) => {
          const newHealth = Math.max(0, prev - damage);
          if (newHealth === 0) {
            clearInterval(battleInterval);
            setTimeout(() => {
              setWinner("granny");
              setIsBattling(false);
            }, 800);
          }
          return newHealth;
        });
      } else {
        // Santa attacks
        setSantaPunching(true);
        setTimeout(() => {
          setSantaPunching(false);
          setGrannyShaking(true);
          setShowGrannyHit(true);
          setLastGrannyDamage(damage);
          setTimeout(() => {
            setGrannyShaking(false);
            setShowGrannyHit(false);
          }, 600);
        }, 300);
        
        setGrannyHealth((prev) => {
          const newHealth = Math.max(0, prev - damage);
          if (newHealth === 0) {
            clearInterval(battleInterval);
            setTimeout(() => {
              setWinner("santa");
              setIsBattling(false);
            }, 800);
          }
          return newHealth;
        });
      }
    }, 1200);
  };

  const resetBattle = () => {
    setGrannyHealth(100);
    setSantaHealth(100);
    setWinner(null);
    setIsBattling(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Title */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-6xl font-black mb-2 bg-gradient-to-r from-granny via-accent to-santa bg-clip-text text-transparent">
            GRANNY VS SANTA
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
            showGrannyHit={showGrannyHit}
            showSantaHit={showSantaHit}
            lastGrannyDamage={lastGrannyDamage}
            lastSantaDamage={lastSantaDamage}
          />
          
          <div className="relative grid grid-cols-2 gap-8 mb-8">
            {/* Granny */}
            <div className="space-y-4">
              <div className={`relative transition-all duration-300 ${grannyPunching ? 'animate-punch-right' : ''} ${grannyShaking ? 'animate-shake' : ''} ${winner === 'granny' ? 'animate-victory' : ''}`}>
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-granny shadow-lg shadow-granny/50 transition-shadow duration-300">
                  <img
                    src={grannyFighter}
                    alt="Fighting Granny"
                    className={`w-full h-full object-cover transition-all duration-300 ${grannyShaking ? 'brightness-150 contrast-125' : ''}`}
                  />
                </div>
                
                {/* Attack indicator */}
                {grannyPunching && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 animate-float-up">
                    <div className="text-4xl">👊</div>
                  </div>
                )}
                {winner === "granny" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-black text-granny drop-shadow-[0_0_20px_rgba(255,105,180,0.8)] animate-pulse">
                      WINNER!
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold text-granny">GRANNY</h3>
                  <span className="text-2xl font-bold text-foreground">{grannyHealth}%</span>
                </div>
                <Progress value={grannyHealth} className="h-4 bg-muted" />
              </div>
            </div>

            {/* VS Divider */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-5xl font-black shadow-lg shadow-accent/50 border-4 border-accent-foreground/20">
                VS
              </div>
            </div>

            {/* Santa */}
            <div className="space-y-4">
              <div className={`relative transition-all duration-300 ${santaPunching ? 'animate-punch-left' : ''} ${santaShaking ? 'animate-shake' : ''} ${winner === 'santa' ? 'animate-victory' : ''}`}>
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-santa shadow-lg shadow-santa/50 transition-shadow duration-300">
                  <img
                    src={santaFighter}
                    alt="Fighting Santa"
                    className={`w-full h-full object-cover transition-all duration-300 ${santaShaking ? 'brightness-150 contrast-125' : ''}`}
                  />
                </div>
                
                {/* Attack indicator */}
                {santaPunching && (
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 animate-float-up">
                    <div className="text-4xl">👊</div>
                  </div>
                )}
                {winner === "santa" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-black text-santa drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-pulse">
                      WINNER!
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-bold text-santa">SANTA</h3>
                  <span className="text-2xl font-bold text-foreground">{santaHealth}%</span>
                </div>
                <Progress value={santaHealth} className="h-4 bg-muted" />
              </div>
            </div>
          </div>

          {/* Winner Banner */}
          {winner && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div className="bg-background/95 backdrop-blur-md px-12 py-6 rounded-2xl border-4 border-accent shadow-2xl animate-fade-in">
                <p className="text-5xl font-black bg-gradient-to-r from-granny to-santa bg-clip-text text-transparent">
                  {winner === "granny" ? "GRANNY WINS!" : "SANTA WINS!"}
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
            <Button
              onClick={resetBattle}
              size="lg"
              variant="outline"
              className="text-2xl px-12 py-8 font-black border-2 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              RESET
            </Button>
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
