import axios from 'axios'
import { TaxBracketsResponse } from './types'

const API_BASE = 'http://localhost:5001'

export const getTaxBrackets = async (
  year: string
): Promise<TaxBracketsResponse> => {
  const response = await axios.get<TaxBracketsResponse>(
    `${API_BASE}/tax-calculator/tax-year/${year}`
  )
  return response.data
}
