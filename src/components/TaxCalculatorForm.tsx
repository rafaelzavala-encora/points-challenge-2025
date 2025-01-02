import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';

const TaxCalculatorForm = () => {
  const [income, setIncome] = useState('');
  const [year, setYear] = useState('2022');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/results?income=${income}&year=${year}`);
  };

  return (
    <Box component="form" aria-label="Tax Calculator Form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Income Tax Calculator
      </Typography>
      <TextField
        label="Annual Income"
        type="number"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        fullWidth
        required
      />
      <Select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        fullWidth
        displayEmpty
        inputProps={{ 'aria-label': 'Year'}}
        required
      >
        <MenuItem value="2019">2019</MenuItem>
        <MenuItem value="2020">2020</MenuItem>
        <MenuItem value="2021">2021</MenuItem>
        <MenuItem value="2022">2022</MenuItem>
      </Select>
      <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
        Calculate Tax
      </Button>
    </Box>
  );
};

export default TaxCalculatorForm;
