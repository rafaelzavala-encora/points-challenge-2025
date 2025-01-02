import { Box } from '@mui/material';
import TaxCalculatorForm from '../components/TaxCalculatorForm';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <TaxCalculatorForm />
    </Box>
  );
}
