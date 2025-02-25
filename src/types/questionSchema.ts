export interface Question {
  id: number;
  title: string;
  type: "text" | "number" | "dropdown";
  required: boolean;

  textType?: "shortAnswer" | "paragraph";
  characterLimit?: number;
  helperText?: string;

  numberType?: "age" | "salary" | "year" | "percentage";
  minValue?: number;
  maxValue?: number;
  currency?: "rupee" | "dollar";

  options?: string[];
  multiSelect?: boolean;
}
