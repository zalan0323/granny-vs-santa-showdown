import { useState } from "react";
import { CharacterSelect } from "@/components/CharacterSelect";
import BattleArena from "@/components/BattleArena";
import { Fighter } from "@/types/fighter";

const Index = () => {
  const [selectedFighter1, setSelectedFighter1] = useState<Fighter | null>(null);
  const [selectedFighter2, setSelectedFighter2] = useState<Fighter | null>(null);
  const [showBattle, setShowBattle] = useState(false);

  const handleStartBattle = (fighter1: Fighter, fighter2: Fighter) => {
    setSelectedFighter1(fighter1);
    setSelectedFighter2(fighter2);
    setShowBattle(true);
  };

  const handleBackToSelect = () => {
    setShowBattle(false);
  };

  if (showBattle && selectedFighter1 && selectedFighter2) {
    return (
      <BattleArena
        fighter1={selectedFighter1}
        fighter2={selectedFighter2}
        onBackToSelect={handleBackToSelect}
      />
    );
  }

  return <CharacterSelect onStartBattle={handleStartBattle} />;
};

export default Index;
