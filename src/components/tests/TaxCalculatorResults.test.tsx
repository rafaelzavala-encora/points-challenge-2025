import React from 'react';
import { render, screen } from '@testing-library/react';
import TaxCalculatorResults from '../../components/TaxCalculatorResults';
import { TaxCalculationResult } from '../../utils/types';
import '@testing-library/jest-dom';

describe('TaxCalculatorResults Component', () => {
  const mockResults: TaxCalculationResult = {
    totalTax: 12345.678,
    effectiveRate: 25.678,
    breakdown: [
      { range: '0 - 10000', tax: 1000, rate: 0.1 },
      { range: '10001 - 20000', tax: 2000, rate: 0.2 },
      { range: '20001 - ∞', tax: 9345.68, rate: 0.3 },
    ],
  };

  it('renders without crashing', () => {
    render(<TaxCalculatorResults results={mockResults} />);
    expect(screen.getByText(/Tax Results/i)).toBeInTheDocument();
  });

  it('displays total tax correctly', () => {
    render(<TaxCalculatorResults results={mockResults} />);
    expect(screen.getByText(/\$ 12,345\.68/)).toBeInTheDocument();
  });

  it('displays effective tax rate correctly', () => {
    render(<TaxCalculatorResults results={mockResults} />);
    expect(screen.getByText(/25\.68/)).toBeInTheDocument();
  });

  it('renders the correct number of breakdown rows', () => {
    render(<TaxCalculatorResults results={mockResults} />);
    const rows = screen.getAllByRole('row');
    // One header row + three breakdown rows
    expect(rows.length).toBe(4);
  });

  it('renders income range, rate, and tax for each breakdown entry', () => {
    render(<TaxCalculatorResults results={mockResults} />);

    expect(screen.getByText('0 - 10000')).toBeInTheDocument();
    expect(screen.getByText('10.00%')).toBeInTheDocument();
    expect(screen.getByText('$1,000.00')).toBeInTheDocument();

    expect(screen.getByText('10001 - 20000')).toBeInTheDocument();
    expect(screen.getByText('20.00%')).toBeInTheDocument();
    expect(screen.getByText('$2,000.00')).toBeInTheDocument();

    expect(screen.getByText('20001 - ∞')).toBeInTheDocument();
    expect(screen.getByText('30.00%')).toBeInTheDocument();
    expect(screen.getByText('$9,345.68')).toBeInTheDocument();
  });
});
