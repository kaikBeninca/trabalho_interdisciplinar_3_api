import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NaoEncontrada from './components/Paginas/NaoEncontrada';
import PesquisarFIPE from './components/Paginas/PesquisarFIPE';
import CompararPrecos from './components/Paginas/CompararPrecos';
import SimularFinanciamento from './components/Paginas/SimularFinanciamento';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PesquisarFIPE/>}/>
        <Route path="/pesquisarFipe" element={<PesquisarFIPE/>}/>
        <Route path="/CompararPrecos" element={<CompararPrecos/>}/>
        <Route path="/simularFinanciamento" element={<SimularFinanciamento/>}/>
        <Route path="*" element={<NaoEncontrada/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;