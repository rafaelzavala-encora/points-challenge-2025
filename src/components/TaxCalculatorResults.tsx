import React from 'react'
import numeral from 'numeral'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material'
import { TaxCalculationResult } from '../utils/types'

interface ResultsProps {
  results: TaxCalculationResult
}

const TaxCalculatorResults = ({ results }: ResultsProps) => (
  <Paper sx={{ p: 4 }}>
    <Typography variant="h4" gutterBottom>
      Tax Results
    </Typography>
    <Typography variant="h6">
      Total Tax: {numeral(results.totalTax).format('$ 0,0.00')}
    </Typography>
    <Typography variant="h6" sx={{ mb: 3 }}>
      Effective Tax Rate: {Number(results.effectiveRate).toFixed(2)}%
    </Typography>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Income Range</TableCell>
            <TableCell>Rate (%)</TableCell>
            <TableCell align="right">Tax ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.breakdown.map((b, idx) => (
            <TableRow key={idx}>
              <TableCell>{b.range}</TableCell>
              <TableCell>{Number(b.rate * 100).toFixed(2)}%</TableCell>
              <TableCell align="right">
                {numeral(b.tax).format('$0,0.00')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
)

export default TaxCalculatorResults
