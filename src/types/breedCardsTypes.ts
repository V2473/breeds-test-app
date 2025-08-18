export interface Breed {
  id: string;
  name: string;
  intelligence?: number;
  [propName: string]: unknown;
  isCat?: boolean;
  image?: {
    url: string;
  };
}
