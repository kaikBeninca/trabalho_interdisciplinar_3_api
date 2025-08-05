import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NaoEncontrada from './components/Paginas/NaoEncontrada';
import PesquisarFIPE from './components/Paginas/PesquisarFIPE';
import Sobre from './components/Paginas/Sobre';
import Favoritos from './components/Paginas/Favoritos';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sobre/>}/>
        <Route path="/pesquisarFipe" element={<PesquisarFIPE/>}/>
        <Route path="/favoritos" element={<Favoritos/>}/>
        <Route path="*" element={<NaoEncontrada/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;