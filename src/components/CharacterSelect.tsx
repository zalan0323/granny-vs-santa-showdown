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
import kovacsDavidFighter from "@/assets/kovacs-david-fighter.png";
import palGretaFighter from "@/assets/pal-greta-fighter.png";
import fazekasEszterFighter from "@/assets/fazekas-eszter-fighter.png";
import customFighter from "@/assets/custom-fighter.png";
import koFighter from "@/assets/ko-fighter.png";
import nadlerBalazsFighter from "@/assets/nadler-balazs-fighter.png";
import nadlerSomogyiLauraFighter from "@/assets/nadler-somogyi-laura-fighter.png";
import tekiTeknosFighter from "@/assets/teki-teknos-fighter.png";
import kenvoFighter from "@/assets/kenvo-fighter.png";
import bataBotondFighter from "@/assets/bata-botond-fighter.png";
import bennetFighter from "@/assets/bennet-fighter.png";
import budaiImreFighter from "@/assets/budai-imre-fighter.png";
import sulyokCsanadFighter from "@/assets/sulyok-csanad-fighter.png";
import csonnoBalintFighter from "@/assets/csonno-balint-fighter.png";
import kovariDaniellaFighter from "@/assets/kovari-daniella-fighter.png";
import nemeczLeventeFighter from "@/assets/nemecz-levente-fighter.png";
import rampasekAttilaFighter from "@/assets/rampasek-attila-fighter.png";
import barathBarnabasFighter from "@/assets/barath-barnabas-fighter.png";
import kobanLaciFighter from "@/assets/koban-laci-fighter.png";
import pinterZsomborFighter from "@/assets/pinter-zsombor-fighter.png";
import koronczaiFighter from "@/assets/koronczai-fighter.png";
import bocskayTanaranoFighter from "@/assets/bocskay-tanarano-fighter.png";
import gyurikPalFighter from "@/assets/gyurik-pal-fighter.png";
import csehBalazsFighter from "@/assets/cseh-balazs-fighter.png";
import albrechtLaszloFighter from "@/assets/albrecht-laszlo-fighter.png";
import beryBaloghFighter from "@/assets/bery-balogh-fighter.png";
import keresztesKornelFighter from "@/assets/keresztes-kornel-fighter.png";
import szaboZoardFighter from "@/assets/szabo-zoard-fighter.png";
import zsonyiFighter from "@/assets/zsonyi-fighter.png";
import papszicsuFighter from "@/assets/papszicsu-fighter.png";
import kreinSebastyenFighter from "@/assets/krein-sebastyen-fighter.png";
import lubrinczGergoFighter from "@/assets/lubrincz-gergo-fighter.png";

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
    maxHealth: 100,
    strength: 30,
    attackSpeed: 1150,
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
    strength: 18,
    attackSpeed: 800,
    specialStats: "+2 speed every 3 seconds",
  },
  {
    id: "szabo-agoston",
    name: "SZABÓ ÁGOSTON",
    image: szaboAgostonFighter,
    color: "szabo-agoston",
    maxHealth: 100,
    strength: 26,
    attackSpeed: 1000,
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
    maxHealth: 180,
    strength: 25,
    attackSpeed: 2000,
  },
  {
    id: "tota-oliver",
    name: "TÓTA OLIVÉR",
    image: totaOliverFighter,
    color: "tota-oliver",
    maxHealth: 90,
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
  {
    id: "kovacs-david",
    name: "KOVÁCS DÁVID",
    image: kovacsDavidFighter,
    color: "kovacs-david",
    maxHealth: 150,
    strength: 25,
    attackSpeed: 1950,
  },
  {
    id: "pal-greta",
    name: "PÁL GRÉTA",
    image: palGretaFighter,
    color: "pal-greta",
    maxHealth: 95,
    strength: 21,
    attackSpeed: 850,
  },
  {
    id: "fazekas-eszter",
    name: "FAZEKAS ESZTER",
    image: fazekasEszterFighter,
    color: "fazekas-eszter",
    maxHealth: 100,
    strength: 19,
    attackSpeed: 950,
  },
  {
    id: "custom",
    name: "CUSTOM FIGHTER",
    image: customFighter,
    color: "custom",
    maxHealth: 100,
    strength: 15,
    attackSpeed: 1000,
  },
  {
    id: "ko",
    name: "KO",
    image: koFighter,
    color: "ko",
    maxHealth: 160,
    strength: 12,
    attackSpeed: 2400,
  },
  {
    id: "nadler-balazs",
    name: "NÁDLER BALÁZS",
    image: nadlerBalazsFighter,
    color: "nadler-balazs",
    maxHealth: 105,
    strength: 16,
    attackSpeed: 1200,
  },
  {
    id: "nadler-somogyi-laura",
    name: "NÁDLER-SOMOGYI LAURA",
    image: nadlerSomogyiLauraFighter,
    color: "nadler-somogyi-laura",
    maxHealth: 95,
    strength: 18,
    attackSpeed: 900,
  },
  {
    id: "teki-teknos",
    name: "TEKI A TEKNŐS",
    image: tekiTeknosFighter,
    color: "teki-teknos",
    maxHealth: 150,
    strength: 10,
    attackSpeed: 2200,
  },
  {
    id: "kenvo",
    name: "KENVO",
    image: kenvoFighter,
    color: "kenvo",
    maxHealth: 110,
    strength: 17,
    attackSpeed: 1000,
  },
  {
    id: "bata-botond",
    name: "BATA BOTOND",
    image: bataBotondFighter,
    color: "bata-botond",
    maxHealth: 100,
    strength: 15,
    attackSpeed: 1100,
  },
  {
    id: "bennet",
    name: "BENNET",
    image: bennetFighter,
    color: "bennet",
    maxHealth: 70,
    strength: 8,
    attackSpeed: 600,
  },
  {
    id: "budai-imre",
    name: "BUDAI IMRE",
    image: budaiImreFighter,
    color: "budai-imre",
    maxHealth: 135,
    strength: 19,
    attackSpeed: 1700,
  },
  {
    id: "sulyok-csanad",
    name: "SULYOK CSANÁD",
    image: sulyokCsanadFighter,
    color: "sulyok-csanad",
    maxHealth: 70,
    strength: 8,
    attackSpeed: 1600,
  },
  {
    id: "csonno-balint",
    name: "CSONNÓ BÁLINT",
    image: csonnoBalintFighter,
    color: "csonno-balint",
    maxHealth: 75,
    strength: 14,
    attackSpeed: 1100,
  },
  {
    id: "kovari-daniella",
    name: "KÖVÁRI DANIELLA",
    image: kovariDaniellaFighter,
    color: "kovari-daniella",
    maxHealth: 80,
    strength: 29,
    attackSpeed: 1200,
  },
  {
    id: "nemecz-levente",
    name: "NEMECZ LEVENTE",
    image: nemeczLeventeFighter,
    color: "nemecz-levente",
    maxHealth: 220,
    strength: 8,
    attackSpeed: 1700,
  },
  {
    id: "rampasek-attila",
    name: "RAMPASEK ATTILA",
    image: rampasekAttilaFighter,
    color: "rampasek-attila",
    maxHealth: 70,
    strength: 16,
    attackSpeed: 1050,
  },
  {
    id: "barath-barnabas",
    name: "BARÁTH BARNABÁS",
    image: barathBarnabasFighter,
    color: "barath-barnabas",
    maxHealth: 100,
    strength: 14,
    attackSpeed: 1000,
  },
  {
    id: "koban-laci",
    name: "KOBÁN LACI",
    image: kobanLaciFighter,
    color: "koban-laci",
    maxHealth: 25,
    strength: 50,
    attackSpeed: 200,
  },
  {
    id: "pinter-zsombor",
    name: "PINTÉR ZSOMBOR",
    image: pinterZsomborFighter,
    color: "pinter-zsombor",
    maxHealth: 100,
    strength: 15,
    attackSpeed: 1100,
  },
  {
    id: "koronczai",
    name: "KORONCZAI",
    image: koronczaiFighter,
    color: "koronczai",
    maxHealth: 110,
    strength: 30,
    attackSpeed: 1500,
  },
  {
    id: "bocskay-tanarano",
    name: "BOCSKAY TANÁRNŐ",
    image: bocskayTanaranoFighter,
    color: "bocskay-tanarano",
    maxHealth: 60,
    strength: 55,
    attackSpeed: 1600,
  },
  {
    id: "gyurik-pal",
    name: "GYURIK PÁL",
    image: gyurikPalFighter,
    color: "gyurik-pal",
    maxHealth: 110,
    strength: 18,
    attackSpeed: 1100,
    specialStats: "50% damage vs Gréta & Eszter",
  },
  {
    id: "cseh-balazs",
    name: "CSEH BALÁZS",
    image: csehBalazsFighter,
    color: "cseh-balazs",
    maxHealth: 105,
    strength: 16,
    attackSpeed: 1000,
  },
  {
    id: "albrecht-laszlo",
    name: "ALBRECHT LÁSZLÓ",
    image: albrechtLaszloFighter,
    color: "albrecht-laszlo",
    maxHealth: 150,
    strength: 22,
    attackSpeed: 1700,
    specialStats: "Dementia: +10 HP/10s | Strong vs Ágoston",
  },
  {
    id: "bery-balogh",
    name: "BÉRY BALOGH",
    image: beryBaloghFighter,
    color: "bery-balogh",
    maxHealth: 120,
    strength: 35,
    attackSpeed: 1300,
  },
  {
    id: "keresztes-kornel",
    name: "KERESZTES KORNÉL",
    image: keresztesKornelFighter,
    color: "keresztes-kornel",
    maxHealth: 90,
    strength: 14,
    attackSpeed: 700,
  },
  {
    id: "szabo-zoard",
    name: "SZABÓ ZOÁRD",
    image: szaboZoardFighter,
    color: "szabo-zoard",
    maxHealth: 100,
    strength: 15,
    attackSpeed: 1100,
  },
  {
    id: "zsonyi",
    name: "ZSONYI",
    image: zsonyiFighter,
    color: "zsonyi",
    maxHealth: 105,
    strength: 16,
    attackSpeed: 1050,
  },
  {
    id: "papszicsu",
    name: "PAPSZICSU",
    image: papszicsuFighter,
    color: "papszicsu",
    maxHealth: 95,
    strength: 18,
    attackSpeed: 950,
  },
  {
    id: "krein-sebastyen",
    name: "KREIN SEBESTYÉN",
    image: kreinSebastyenFighter,
    color: "krein-sebastyen",
    maxHealth: 110,
    strength: 17,
    attackSpeed: 1150,
  },
  {
    id: "lubrincz-gergo",
    name: "LUBRINCZ GERGŐ",
    image: lubrinczGergoFighter,
    color: "lubrincz-gergo",
    maxHealth: 100,
    strength: 15,
    attackSpeed: 1000,
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
                    <>
                      <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-current animate-fade-in">
                        <span className={`text-xl font-black text-${fighter.color}`}>
                          {isSelected1 ? "FIGHTER 1" : "FIGHTER 2"}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm p-3 border-t-2 border-current animate-fade-in">
                        <div className="space-y-1 text-xs font-bold">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">HP:</span>
                            <span className={`text-${fighter.color}`}>{fighter.maxHealth}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">STR:</span>
                            <span className={`text-${fighter.color}`}>{fighter.strength}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">SPD:</span>
                            <span className={`text-${fighter.color}`}>{(2000 - fighter.attackSpeed) / 10}</span>
                          </div>
                        </div>
                      </div>
                    </>
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
