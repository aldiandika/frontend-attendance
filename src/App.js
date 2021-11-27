import './App.css';
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import Routing from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routing />
    </ThemeProvider>
  );
}

export default App;
