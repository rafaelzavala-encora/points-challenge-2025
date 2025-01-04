import { useState, useCallback, useRef } from 'react'
import { TaxBracket, TaxCalculationResult } from '../utils/types'
import { getTaxBrackets } from '../utils/api'

const useTaxBrackets = (income: string, year: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<TaxCalculationResult | null>(null)
  const hasFetched = useRef(false)
  const fetchTaxBrackets = useCallback(async () => {
    if (!income || !year || hasFetched.current) return
    hasFetched.current = true
    setLoading(true)
    setError(null)

    try {
      const { tax_brackets: brackets } = await getTaxBrackets(String(year))
      const numericIncome = parseFloat(String(income))
      if (isNaN(numericIncome)) throw new Error('Invalid income value.')

      let totalTax = 0
      const breakdown: TaxCalculationResult['breakdown'] = []

      brackets.forEach(({ min, max, rate }: TaxBracket) => {
        const taxableIncome =
          Math.min(numericIncome, max ?? numericIncome) - min
        if (taxableIncome > 0) {
          const tax = taxableIncome * rate
          totalTax += tax
          breakdown.push({ range: `${min} - ${max ?? '∞'}`, tax, rate })
        }
      })

      const effectiveRate = (totalTax / numericIncome) * 100
      setResults({ totalTax, breakdown, effectiveRate })
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tax brackets')
    } finally {
      setLoading(false)
    }
  }, [income, year])

  return { loading, error, results, fetchTaxBrackets }
}

export default useTaxBrackets
