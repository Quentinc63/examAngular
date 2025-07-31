import { Feature } from "./feature";

export interface Produit {
  id: number;
  title: string;
  description: string;
  image: string;
  fullPrice: number; 
  discountPercent: number;
  category: string;
  features: Feature[];
}