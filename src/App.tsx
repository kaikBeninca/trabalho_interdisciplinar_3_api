import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Produtos from './components/Paginas/CompararPrecos';
import NaoEncontrada from './components/Paginas/NaoEncontrada';
import ItemPage from './components/ItemPage/index';
import PesquisarFIPE from './components/Paginas/PesquisarFIPE';
import CompararPrecos from './components/Paginas/CompararPrecos';

function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<PesquisarFIPE/>}/>
        <Route path="/pesquisarFipe" element={<PesquisarFIPE/>}/>
        <Route path="/CompararPrecos" element={<CompararPrecos/>}/>
        <Route path="/produto/:id" element={<ItemPage/>}/>
        <Route path="/produtos" element={<Produtos/>}/>
        <Route path="*" element={<NaoEncontrada/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;