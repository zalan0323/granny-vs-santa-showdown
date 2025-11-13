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
  const [fighter1Health, setFighter1Health] = useState(fighter1.maxHealth);
  const [fighter2Health, setFighter2Health] = useState(fighter2.maxHealth);
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
  
  // Boost system states
  const [fighter1Boosts, setFighter1Boosts] = useState(3);
  const [fighter2Boosts, setFighter2Boosts] = useState(3);
  const [fighter1DoubleNextHit, setFighter1DoubleNextHit] = useState(false);
  const [fighter2DoubleNextHit, setFighter2DoubleNextHit] = useState(false);
  const [fighter1PowerMode, setFighter1PowerMode] = useState(false);
  const [fighter2PowerMode, setFighter2PowerMode] = useState(false);
  
  // Current stats tracking (for special abilities)
  const [fighter1CurrentStrength, setFighter1CurrentStrength] = useState(fighter1.strength);
  const [fighter2CurrentStrength, setFighter2CurrentStrength] = useState(fighter2.strength);
  const [fighter1CurrentSpeed, setFighter1CurrentSpeed] = useState(fighter1.attackSpeed);
  const [fighter2CurrentSpeed, setFighter2CurrentSpeed] = useState(fighter2.attackSpeed);

  const useFighter1Boost = (boostType: 'double' | 'heal' | 'power' | 'lucky') => {
    if (!isBattling) return;
    
    const cost = boostType === 'lucky' ? 3 : 1;
    if (fighter1Boosts < cost) return;
    
    setFighter1Boosts(prev => prev - cost);
    
    if (boostType === 'double') {
      setFighter1DoubleNextHit(true);
    } else if (boostType === 'heal') {
      setFighter1Health(prev => Math.min(fighter1.maxHealth, prev + 15));
    } else if (boostType === 'power') {
      setFighter1PowerMode(true);
      setTimeout(() => setFighter1PowerMode(false), 5000);
    } else if (boostType === 'lucky') {
      const luckyRoll = Math.random();
      if (luckyRoll < 1/300) {
        setFighter1Health(prev => Math.min(fighter1.maxHealth, prev + 1000));
      }
    }
  };

  const useFighter2Boost = (boostType: 'double' | 'heal' | 'power' | 'lucky') => {
    if (!isBattling) return;
    
    const cost = boostType === 'lucky' ? 3 : 1;
    if (fighter2Boosts < cost) return;
    
    setFighter2Boosts(prev => prev - cost);
    
    if (boostType === 'double') {
      setFighter2DoubleNextHit(true);
    } else if (boostType === 'heal') {
      setFighter2Health(prev => Math.min(fighter2.maxHealth, prev + 15));
    } else if (boostType === 'power') {
      setFighter2PowerMode(true);
      setTimeout(() => setFighter2PowerMode(false), 5000);
    } else if (boostType === 'lucky') {
      const luckyRoll = Math.random();
      if (luckyRoll < 1/300) {
        setFighter2Health(prev => Math.min(fighter2.maxHealth, prev + 1000));
      }
    }
  };

  const startBattle = () => {
    setIsBattling(true);
    setWinner(null);
    setFighter1Health(fighter1.maxHealth);
    setFighter2Health(fighter2.maxHealth);
    setFighter1Boosts(3);
    setFighter2Boosts(3);
    setFighter1DoubleNextHit(false);
    setFighter2DoubleNextHit(false);
    setFighter1PowerMode(false);
    setFighter2PowerMode(false);
    setFighter1CurrentStrength(fighter1.strength);
    setFighter2CurrentStrength(fighter2.strength);
    setFighter1CurrentSpeed(fighter1.attackSpeed);
    setFighter2CurrentSpeed(fighter2.attackSpeed);
    
    // Special ability timers
    // Heizler Zalán: +2 speed every 3 seconds
    if (fighter1.id === 'heizler-zalan') {
      const speedInterval = setInterval(() => {
        setFighter1CurrentSpeed(prev => Math.max(100, prev - 100)); // Lower attackSpeed = faster
      }, 3000);
      setTimeout(() => clearInterval(speedInterval), 300000); // Clear after 5 minutes
    }
    if (fighter2.id === 'heizler-zalan') {
      const speedInterval = setInterval(() => {
        setFighter2CurrentSpeed(prev => Math.max(100, prev - 100));
      }, 3000);
      setTimeout(() => clearInterval(speedInterval), 300000);
    }
    /*
    // custom: adjust attack (strength & speed) based on current health percent
    if (fighter1.id === 'custom') {
      const customAdjustInterval = setInterval(() => {
        const pct = (fighter1Health / fighter1.maxHealth) * 100;
        if (pct <= 25) {
          // Rage mode: big damage, much faster
          setFighter1CurrentStrength(Math.floor(fighter1.strength * 1.5));
          setFighter1CurrentSpeed(prev => Math.max(100, prev - 200));
        } else if (pct <= 50) {
          // Hurt but still dangerous: moderate damage up, slightly faster
          setFighter1CurrentStrength(Math.floor(fighter1.strength * 1.25));
          setFighter1CurrentSpeed(prev => Math.max(100, prev - 100));
        } else {
          // Normal
          setFighter1CurrentStrength(fighter1.strength);
          setFighter1CurrentSpeed(fighter1.attackSpeed);
        }
      }, 1000);
      setTimeout(() => clearInterval(customAdjustInterval), 300000);
    }
    
    if (fighter2.id === 'custom') {
      const customAdjustInterval = setInterval(() => {
        const pct = (fighter2Health / fighter2.maxHealth) * 100;
        if (pct <= 25) {
          setFighter2CurrentStrength(Math.floor(fighter2.strength * 1.5));
          setFighter2CurrentSpeed(prev => Math.max(100, prev - 200));
        } else if (pct <= 50) {
          setFighter2CurrentStrength(Math.floor(fighter2.strength * 1.25));
          setFighter2CurrentSpeed(prev => Math.max(100, prev - 100));
        } else {
          setFighter2CurrentStrength(fighter2.strength);
          setFighter2CurrentSpeed(fighter2.attackSpeed);
        }
      }, 1000);
      setTimeout(() => clearInterval(customAdjustInterval), 300000);
    }
    */
    

    // albrecht: +10 HP every 10 seconds
    if (fighter1.id === 'albrecht-laszlo') {
      const dementiaInterval = setInterval(() => {
        setFighter1Health(prev => Math.min(fighter1.maxHealth, prev + 10));
      }, 10000);
      setTimeout(() => clearInterval(dementiaInterval), 300000);
    }
    if (fighter2.id === 'albrecht-laszlo') {
      const dementiaInterval = setInterval(() => {
        setFighter2Health(prev => Math.min(fighter2.maxHealth, prev + 10));
      }, 10000);
      setTimeout(() => clearInterval(dementiaInterval), 300000);
    }


    // custome: +1 HP every 1 seconds
    if (fighter1.id === 'custom') {
      const dementiaInterval = setInterval(() => {
        setFighter1Health(prev => Math.min(fighter1.maxHealth, prev + 1));
      }, 1000);
      setTimeout(() => clearInterval(dementiaInterval), 300000);
    }
    if (fighter2.id === 'custom') {
      const dementiaInterval = setInterval(() => {
        setFighter2Health(prev => Math.min(fighter2.maxHealth, prev + 1));
      }, 1000);
      setTimeout(() => clearInterval(dementiaInterval), 300000);
    }

    // fortnite: -10 HP every 10 seconds
    if (fighter1.id === 'fortnite') {
      const dementiaInterval = setInterval(() => {
        setFighter2Health(prev => Math.min(fighter2.maxHealth, prev - 10));
      }, 10000);
      setTimeout(() => clearInterval(dementiaInterval), 300000);
    }
    if (fighter2.id === 'fortnite') {
      const dementiaInterval = setInterval(() => {
        setFighter1Health(prev => Math.min(fighter1.maxHealth, prev - 10));
      }, 10000);
      setTimeout(() => clearInterval(dementiaInterval), 300000);
    }

    // Teki's special ability: +10 damage and -200 speed if health is below 50%
    if (fighter1.id === 'teki-teknos' && fighter1Health < fighter1.maxHealth / 2) {
      setFighter1CurrentStrength(prev => prev + 10);
      setFighter1CurrentSpeed(prev => Math.max(100, prev - 200));
    }
    if (fighter2.id === 'teki-teknos' && fighter2Health < fighter2.maxHealth / 2) {
      setFighter2CurrentStrength(prev => prev + 10);
      setFighter2CurrentSpeed(prev => Math.max(100, prev - 200));
    }




    // Simulate battle with random attacks
    const battleInterval = setInterval(() => {
      const attacker = Math.random() > 0.5 ? 1 : 2;
      
      if (attacker === 1) {
        let baseDamage = fighter1CurrentStrength;
        let attackDelay = fighter1CurrentSpeed;
        
        // Apply power mode (slower but stronger)
        if (fighter1PowerMode) {
          baseDamage = Math.floor(baseDamage * 1.5);
          attackDelay = Math.floor(attackDelay * 1.3);
        }
        
        // Gyurik Pál: 50% damage vs Gréta & Eszter
        if (fighter1.id === 'gyurik-pal' && (fighter2.id === 'pal-greta' || fighter2.id === 'fazekas-eszter')) {
          baseDamage = Math.floor(baseDamage * 0.5);
        }
        
        // Albrecht László: Strong vs Ágoston
        if (fighter1.id === 'albrecht-laszlo' && fighter2.id === 'szabo-agoston') {
          baseDamage = Math.floor(baseDamage * 1.5);
        }
        
        let damage = Math.floor(Math.random() * baseDamage * 0.5) + baseDamage;
        
        // Apply double damage boost
        if (fighter1DoubleNextHit) {
          damage *= 2;
          setFighter1DoubleNextHit(false);
        }

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
        let baseDamage = fighter2CurrentStrength;
        let attackDelay = fighter2CurrentSpeed;
        
        // Apply power mode (slower but stronger)
        if (fighter2PowerMode) {
          baseDamage = Math.floor(baseDamage * 1.5);
          attackDelay = Math.floor(attackDelay * 1.3);
        }
        
        // Gyurik Pál: 50% damage vs Gréta & Eszter
        if (fighter2.id === 'gyurik-pal' && (fighter1.id === 'pal-greta' || fighter1.id === 'fazekas-eszter')) {
          baseDamage = Math.floor(baseDamage * 0.5);
        }
        
        // Albrecht László: Strong vs Ágoston
        if (fighter2.id === 'albrecht-laszlo' && fighter1.id === 'szabo-agoston') {
          baseDamage = Math.floor(baseDamage * 1.5);
        }
        
        let damage = Math.floor(Math.random() * baseDamage * 0.5) + baseDamage;
        
        // Apply double damage boost
        if (fighter2DoubleNextHit) {
          damage *= 2;
          setFighter2DoubleNextHit(false);
        }

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
    }, Math.min(fighter1.attackSpeed, fighter2.attackSpeed));
  };

  const resetBattle = () => {
    setFighter1Health(fighter1.maxHealth);
    setFighter2Health(fighter2.maxHealth);
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
                  <span className="text-2xl font-bold text-foreground">{fighter1Health}/{fighter1.maxHealth}</span>
                </div>
                <Progress value={(fighter1Health / fighter1.maxHealth) * 100} className="h-4 bg-muted" />
                
                {/* Current stats display during battle */}
                {isBattling && !winner && (
                  <div className="text-xs text-muted-foreground flex gap-2 justify-center">
                    <span>💪 {Math.floor(fighter1CurrentStrength)}</span>
                    <span>⚡ {Math.floor(1000 / fighter1CurrentSpeed * 100) / 100}x</span>
                  </div>
                )}
                
                {/* Boost buttons for Fighter 1 */}
                {isBattling && !winner && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <Button
                        onClick={() => useFighter1Boost('double')}
                        disabled={fighter1Boosts < 1}
                        size="sm"
                        className="flex-1 text-xs"
                        style={{ opacity: fighter1DoubleNextHit ? 1 : 0.7 }}
                      >
                        ⚡ 2x
                      </Button>
                      <Button
                        onClick={() => useFighter1Boost('heal')}
                        disabled={fighter1Boosts < 1}
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        💚 +15
                      </Button>
                      <Button
                        onClick={() => useFighter1Boost('power')}
                        disabled={fighter1Boosts < 1}
                        size="sm"
                        className="flex-1 text-xs"
                        style={{ opacity: fighter1PowerMode ? 1 : 0.7 }}
                      >
                        💪 PWR
                      </Button>
                    </div>
                    <Button
                      onClick={() => useFighter1Boost('lucky')}
                      disabled={fighter1Boosts < 3}
                      size="sm"
                      className="w-full text-xs"
                      variant="secondary"
                    >
                      🍀 LUCKY (3) 1/300
                    </Button>
                  </div>
                )}
                <div className="text-center text-sm font-bold" style={{ color: `hsl(var(--${fighter1.color}))` }}>
                  Boosts: {fighter1Boosts}
                </div>
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
                  <span className="text-2xl font-bold text-foreground">{fighter2Health}/{fighter2.maxHealth}</span>
                </div>
                <Progress value={(fighter2Health / fighter2.maxHealth) * 100} className="h-4 bg-muted" />
                
                {/* Current stats display during battle */}
                {isBattling && !winner && (
                  <div className="text-xs text-muted-foreground flex gap-2 justify-center">
                    <span>💪 {Math.floor(fighter2CurrentStrength)}</span>
                    <span>⚡ {Math.floor(1000 / fighter2CurrentSpeed * 100) / 100}x</span>
                  </div>
                )}
                
                {/* Boost buttons for Fighter 2 */}
                {isBattling && !winner && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      <Button
                        onClick={() => useFighter2Boost('double')}
                        disabled={fighter2Boosts < 1}
                        size="sm"
                        className="flex-1 text-xs"
                        style={{ opacity: fighter2DoubleNextHit ? 1 : 0.7 }}
                      >
                        ⚡ 2x
                      </Button>
                      <Button
                        onClick={() => useFighter2Boost('heal')}
                        disabled={fighter2Boosts < 1}
                        size="sm"
                        className="flex-1 text-xs"
                      >
                        💚 +15
                      </Button>
                      <Button
                        onClick={() => useFighter2Boost('power')}
                        disabled={fighter2Boosts < 1}
                        size="sm"
                        className="flex-1 text-xs"
                        style={{ opacity: fighter2PowerMode ? 1 : 0.7 }}
                      >
                        💪 PWR
                      </Button>
                    </div>
                    <Button
                      onClick={() => useFighter2Boost('lucky')}
                      disabled={fighter2Boosts < 3}
                      size="sm"
                      className="w-full text-xs"
                      variant="secondary"
                    >
                      🍀 LUCKY (3) 1/300
                    </Button>
                  </div>
                )}
                <div className="text-center text-sm font-bold" style={{ color: `hsl(var(--${fighter2.color}))` }}>
                  Boosts: {fighter2Boosts}
                </div>
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
