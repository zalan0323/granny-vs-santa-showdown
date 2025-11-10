export type FighterType = "granny" | "santa" | "levente";

export interface Fighter {
  id: FighterType;
  name: string;
  image: string;
  color: string;
}
