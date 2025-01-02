import React from 'react';
import { render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import { useRouter } from 'next/router';
import ResultsPage from '../results';
import useTaxBrackets from '@/hooks/useTaxBrackets';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

// Mock useTaxBrackets
jest.mock('../../hooks/useTaxBrackets', () => jest.fn());

describe('ResultsPage Component', () => {
  const mockPush = jest.fn();
  const mockFetchTaxBrackets = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { income: '75000', year: '2022' },
      push: mockPush,
      isReady: true,
    });

    (useTaxBrackets as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      results: null,
      fetchTaxBrackets: mockFetchTaxBrackets,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetchTaxBrackets on initial render', async () => {
    render(<ResultsPage />);
    await waitFor(() => expect(mockFetchTaxBrackets).toHaveBeenCalledTimes(1));
  });

  it('renders loading state correctly', () => {
    (useTaxBrackets as jest.Mock).mockReturnValueOnce({
      loading: true,
      error: null,
      results: null,
      fetchTaxBrackets: mockFetchTaxBrackets,
    });

    render(<ResultsPage />);
    expect(screen.getByText(/Loading tax information/i)).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    (useTaxBrackets as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: 'Failed to fetch tax brackets',
      results: null,
      fetchTaxBrackets: mockFetchTaxBrackets,
    });

    render(<ResultsPage />);
    expect(screen.getByText(/Error: Failed to fetch tax brackets/i)).toBeInTheDocument();
    expect(screen.getByText(/Please try again later/i)).toBeInTheDocument();
  });

  it('does not display "Go Back" button when there is an error', () => {
    (useTaxBrackets as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: 'Something went wrong',
      results: null,
      fetchTaxBrackets: mockFetchTaxBrackets,
    });

    render(<ResultsPage />);

    // Ensure the "Go Back" button is not rendered when there's an error
    const goBackButton = screen.queryByRole('button', { name: /Go Back/i });
    expect(goBackButton).toBeNull(); // The button should not be rendered
  });

  it('renders results state correctly', () => {
    const mockResults = {
      totalTax: 15000,
      effectiveRate: 20,
      breakdown: [
        { range: '0 - 9875', rate: 0.1, tax: 987.5 },
        { range: '9876 - 40125', rate: 0.12, tax: 3630 },
        { range: '40126 - ∞', rate: 0.22, tax: 10182.5 },
      ],
    };
  
    (useTaxBrackets as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: null,
      results: mockResults,
      fetchTaxBrackets: mockFetchTaxBrackets,
    });
  
    render(<ResultsPage />);
  
    // Assertions for rendered content
    expect(screen.getByText(/Tax Results/i)).toBeInTheDocument();
    
    // Use a regex to handle potential spacing issues or if the dollar sign and the number are split
    expect(screen.getByText(/\$ ?15,000/)).toBeInTheDocument();
    
    // Check for effective tax rate
    expect(screen.getByText(/20(\.00)?%/)).toBeInTheDocument(); // Allow for precision issues
  });
  
  it('navigates back to the home page when "Go Back" button is clicked and results are available', async () => {
    // Mock the results to simulate no error
    const mockResults = {
      totalTax: 5000,
      effectiveRate: 10,
      breakdown: [{ range: '0 - 9875', rate: 0.1, tax: 987.5 }],
    };

    (useTaxBrackets as jest.Mock).mockReturnValueOnce({
      loading: false,
      error: null,
      results: mockResults,
      fetchTaxBrackets: mockFetchTaxBrackets,
    });

    render(<ResultsPage />);
    const button = screen.getByRole('button', { name: /Go Back/i });
    userEvent.click(button);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });
});
