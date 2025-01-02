export interface TaxBracket {
  min: number;
  max?: number; // Optional for open-ended ranges
  rate: number;
}

export interface TaxBracketsResponse {
  tax_brackets: TaxBracket[];
}

export interface TaxCalculationResult {
  totalTax: number;
  breakdown: {
    range: string;
    tax: number;
    rate: number;
  }[];
  effectiveRate: number;
}
