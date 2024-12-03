export interface CardTemplate {
  id: string;
  name: string;
  width: number;
  height: number;
  elements: CardElement[];
}

export interface CardElement {
  id: string;
  type: 'text' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  style?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
  };
}