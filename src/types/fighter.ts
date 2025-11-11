export type FighterType = 
  | "granny" 
  | "santa" 
  | "levente" 
  | "mucsy-laci" 
  | "heizler-zalan" 
  | "szabo-agoston" 
  | "simai-botond" 
  | "fortnite" 
  | "thanos" 
  | "tota-oliver" 
  | "jakab-istvan";

export interface Fighter {
  id: FighterType;
  name: string;
  image: string;
  color: string;
  maxHealth: number;
  strength: number;
  attackSpeed: number;
}
