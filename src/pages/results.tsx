import { useEffect } from 'react'
import { CircularProgress, Typography, Alert, Box, Button } from '@mui/material'
import TaxCalculatorResults from '../components/TaxCalculatorResults'
import { useRouter } from 'next/router'
import useTaxBrackets from '@/hooks/useTaxBrackets'

const ResultsPage = () => {
  const router = useRouter()
  const { query } = router
  const income = typeof query.income === 'string' ? query.income : ''
  const year = typeof query.year === 'string' ? query.year : ''
  const { loading, error, results, fetchTaxBrackets } = useTaxBrackets(
    income,
    year
  )

  useEffect(() => {
    if (router.isReady && income && year) {
      fetchTaxBrackets()
    }
  }, [router.isReady, income, year, fetchTaxBrackets])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
        <Typography>Loading tax information...</Typography>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Alert severity="error">Error: {error}</Alert>
        <Typography>
          Please try again later, or check your internet connection.
        </Typography>
      </div>
    )
  }

  if (!results) {
    return <Typography>Unable to calculate tax results.</Typography>
  }

  return (
    <Box>
      <TaxCalculatorResults results={results} /> :
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
        onClick={() => router.push('/')}
      >
        Go Back
      </Button>
    </Box>
  )
}

export default ResultsPage
