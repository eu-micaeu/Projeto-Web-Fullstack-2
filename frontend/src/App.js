import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
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

        <Footer />

      </Container>


  );
  
}

export default App;