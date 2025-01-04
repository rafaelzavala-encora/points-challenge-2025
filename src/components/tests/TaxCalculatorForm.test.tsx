import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import TaxCalculatorForm from '@/components/TaxCalculatorForm'
import '@testing-library/jest-dom'

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('TaxCalculatorForm Component', () => {
  const mockPush = jest.fn()
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<TaxCalculatorForm />)
    expect(screen.getByText(/Income Tax Calculator/i)).toBeInTheDocument()
  })

  it('updates income field when input is entered', () => {
    render(<TaxCalculatorForm />)
    const incomeInput = screen.getByLabelText(/Annual Income/i)
    fireEvent.change(incomeInput, { target: { value: '50000' } })
    expect(incomeInput).toHaveValue(50000)
  })

  it('updates year selection when changed', () => {
    render(<TaxCalculatorForm />)

    // Get the select dropdown (combobox) by its aria-label
    const yearSelect = screen.getByRole('combobox', { name: /Year/i })

    // Open the dropdown
    fireEvent.mouseDown(yearSelect)

    // Select the desired option from the dropdown
    const yearOption = screen.getByRole('option', { name: '2021' })
    fireEvent.click(yearOption)

    // Verify the selected value in the combobox
    expect(screen.getByRole('combobox', { name: /Year/i })).toHaveTextContent(
      '2021'
    )
  })

  it('navigates to results page with correct query parameters on submit', () => {
    const pushMock = jest.fn()
    jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
      push: pushMock,
    }))

    render(<TaxCalculatorForm />)

    const incomeInput = screen.getByLabelText(/annual income/i)
    const yearSelect = screen.getByRole('combobox', { name: /year/i })

    // Fill out the form
    fireEvent.change(incomeInput, { target: { value: '50000' } })
    fireEvent.mouseDown(yearSelect)
    const yearOption = screen.getByRole('option', { name: '2021' })
    fireEvent.click(yearOption)

    // Submit the form
    const form = screen.getByRole('form', { name: /tax calculator form/i })
    fireEvent.submit(form)

    // Assert that navigation occurred with the correct query params
    expect(pushMock).toHaveBeenCalledWith('/results?income=50000&year=2021')
  })

  it('disables submit if income is empty', () => {
    render(<TaxCalculatorForm />)
    const button = screen.getByRole('button', { name: /Calculate Tax/i })
    expect(button).toBeEnabled()

    // Clear input and check
    fireEvent.change(screen.getByLabelText(/Annual Income/i), {
      target: { value: '' },
    })
    fireEvent.click(button)

    expect(mockPush).not.toHaveBeenCalled()
  })
})
