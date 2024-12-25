import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
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

        <Main />

      </Container>


  );
  
}

export default App;