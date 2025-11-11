import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Fighter } from "@/types/fighter";
import grannyFighter from "@/assets/granny-fighter.png";
import santaFighter from "@/assets/santa-fighter.png";
import leventeFighter from "@/assets/levente-fighter.png";
import mucsyLaciFighter from "@/assets/mucsy-laci-fighter.png";
import heizlerZalanFighter from "@/assets/heizler-zalan-fighter.png";
import szaboAgostonFighter from "@/assets/szabo-agoston-fighter.png";
import simaiBotondFighter from "@/assets/simai-botond-fighter.png";
import fortniteFighter from "@/assets/fortnite-fighter.png";
import thanosFighter from "@/assets/thanos-fighter.png";
import totaOliverFighter from "@/assets/tota-oliver-fighter.png";
import jakabIstvanFighter from "@/assets/jakab-istvan-fighter.png";

interface CharacterSelectProps {
  onStartBattle: (fighter1: Fighter, fighter2: Fighter) => void;
}

export const fighters: Fighter[] = [
  {
    id: "granny",
    name: "GRANNY",
    image: grannyFighter,
    color: "granny",
    maxHealth: 100,
    strength: 12,
    attackSpeed: 1200,
  },
  {
    id: "santa",
    name: "SANTA",
    image: santaFighter,
    color: "santa",
    maxHealth: 120,
    strength: 15,
    attackSpeed: 1400,
  },
  {
    id: "levente",
    name: "BORBÉLY LEVENTE",
    image: leventeFighter,
    color: "accent",
    maxHealth: 110,
    strength: 14,
    attackSpeed: 1100,
  },
  {
    id: "mucsy-laci",
    name: "MUCSY LACI",
    image: mucsyLaciFighter,
    color: "mucsy-laci",
    maxHealth: 95,
    strength: 18,
    attackSpeed: 900,
  },
  {
    id: "heizler-zalan",
    name: "HEIZLER ZALÁN",
    image: heizlerZalanFighter,
    color: "heizler-zalan",
    maxHealth: 105,
    strength: 16,
    attackSpeed: 1000,
  },
  {
    id: "szabo-agoston",
    name: "SZABÓ ÁGOSTON",
    image: szaboAgostonFighter,
    color: "szabo-agoston",
    maxHealth: 130,
    strength: 20,
    attackSpeed: 1600,
  },
  {
    id: "simai-botond",
    name: "SIMAI BOTOND",
    image: simaiBotondFighter,
    color: "simai-botond",
    maxHealth: 140,
    strength: 10,
    attackSpeed: 1800,
  },
  {
    id: "fortnite",
    name: "FORTNITE GUY",
    image: fortniteFighter,
    color: "fortnite",
    maxHealth: 90,
    strength: 13,
    attackSpeed: 800,
  },
  {
    id: "thanos",
    name: "THANOS",
    image: thanosFighter,
    color: "thanos",
    maxHealth: 200,
    strength: 25,
    attackSpeed: 2000,
  },
  {
    id: "tota-oliver",
    name: "TÓTA OLIVÉR",
    image: totaOliverFighter,
    color: "tota-oliver",
    maxHealth: 85,
    strength: 22,
    attackSpeed: 700,
  },
  {
    id: "jakab-istvan",
    name: "JAKAB ISTVÁN",
    image: jakabIstvanFighter,
    color: "jakab-istvan",
    maxHealth: 115,
    strength: 17,
    attackSpeed: 1300,
  },
];

export const CharacterSelect = ({ onStartBattle }: CharacterSelectProps) => {
  const [selectedFighter1, setSelectedFighter1] = useState<Fighter | null>(null);
  const [selectedFighter2, setSelectedFighter2] = useState<Fighter | null>(null);

  const handleFighterSelect = (fighter: Fighter) => {
    if (!selectedFighter1) {
      setSelectedFighter1(fighter);
    } else if (!selectedFighter2 && fighter.id !== selectedFighter1.id) {
      setSelectedFighter2(fighter);
    } else if (selectedFighter1 && fighter.id === selectedFighter1.id) {
      setSelectedFighter1(null);
      if (selectedFighter2) {
        setSelectedFighter1(selectedFighter2);
        setSelectedFighter2(null);
      }
    } else if (selectedFighter2 && fighter.id === selectedFighter2.id) {
      setSelectedFighter2(null);
    }
  };

  const handleStartBattle = () => {
    if (selectedFighter1 && selectedFighter2) {
      onStartBattle(selectedFighter1, selectedFighter2);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-granny via-accent to-santa bg-clip-text text-transparent">
            SELECT YOUR FIGHTERS
          </h1>
          <p className="text-xl text-muted-foreground font-bold">
            {!selectedFighter1 && "Choose Fighter 1"}
            {selectedFighter1 && !selectedFighter2 && "Choose Fighter 2"}
            {selectedFighter1 && selectedFighter2 && "Ready to Battle!"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {fighters.map((fighter) => {
            const isSelected1 = selectedFighter1?.id === fighter.id;
            const isSelected2 = selectedFighter2?.id === fighter.id;
            const isSelected = isSelected1 || isSelected2;
            const isDisabled = selectedFighter1 && selectedFighter2 && !isSelected;

            return (
              <button
                key={fighter.id}
                onClick={() => handleFighterSelect(fighter)}
                disabled={isDisabled}
                className={`relative group transition-all duration-300 ${
                  isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:scale-105"
                }`}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                    isSelected
                      ? `border-${fighter.color} shadow-2xl shadow-${fighter.color}/60 scale-105`
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div className="aspect-square">
                    <img
                      src={fighter.image}
                      alt={fighter.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-current animate-fade-in">
                      <span className={`text-xl font-black text-${fighter.color}`}>
                        {isSelected1 ? "FIGHTER 1" : "FIGHTER 2"}
                      </span>
                    </div>
                  )}
                  
                  {!isSelected && !isDisabled && (
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
                  )}
                </div>
                
                <h3 className={`text-2xl font-black mt-4 transition-colors duration-300 ${
                  isSelected ? `text-${fighter.color}` : "text-foreground group-hover:text-accent"
                }`}>
                  {fighter.name}
                </h3>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleStartBattle}
            disabled={!selectedFighter1 || !selectedFighter2}
            size="lg"
            className="text-2xl px-12 py-8 bg-gradient-to-r from-granny via-accent to-santa hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 font-black disabled:opacity-40 disabled:cursor-not-allowed"
          >
            START BATTLE!
          </Button>
        </div>
      </div>
    </div>
  );
};
