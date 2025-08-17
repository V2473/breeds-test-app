export interface Breed {
  id: string;
  name: string;
  [propName: string]: unknown; 
  isCat?: boolean; 
  image?: {
    url: string;
  };
}

