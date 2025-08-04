import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NaoEncontrada from './components/Paginas/NaoEncontrada';
import PesquisarFIPE from './components/Paginas/PesquisarFIPE';
import CompararPrecos from './components/Paginas/CompararPrecos';
import { construindoMarcas, construindoModelos, construindoVeiculos  } from './controller/controller';
import { RepositorioGeral } from './models/RepositorioGeral';
import { Marca } from './models/Marca';
import { Modelo } from './models/Modelo';
import { useEffect } from 'react';

function App() {  
  // construindoVeiculos('cars', '59', '2545', 1996, 1);

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PesquisarFIPE/>}/>
        <Route path="/pesquisarFipe" element={<PesquisarFIPE/>}/>
        <Route path="/CompararPrecos" element={<CompararPrecos/>}/>
        <Route path="*" element={<NaoEncontrada/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;