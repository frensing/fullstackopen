export interface Entry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NewEntry = Omit<Entry, "id">;

export enum Visibility {
  Poor = "poor",
  Ok = "ok",
  Good = "good",
  Great = "great",
}

export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}
