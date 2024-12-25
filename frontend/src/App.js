import './App.css';
import Header from './components/Header/Header';
import { Container } from '@mui/material'; 

function App() {

  return (
    
      <Container 

      style={{

        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',

      }}> 

        <Header />

      </Container>


  );
  
}

export default App;