import React, { useState, useEffect } from 'react';
import { Veiculo } from '../../../models/Veiculo';
import { RepositorioGeral } from '../../../models/RepositorioGeral';
import Header from '../../Header';
import ListagemItens from '../../ListagemItens';
import Footer from '../../Footer';
import estilos from './Favoritos.module.css';
import estadosAliquota from '../../../dados/IPVA.json';

export default function Favorito() {
    const [estado, setEstado] = useState("default");
    const [favoritos, setFavoritos] = useState<Veiculo[]>([]);
    const [termoBusca, setTermoBusca] = useState('');
    const [favoritosFiltrados, setFavoritosFiltrados] = useState<Veiculo[]>([]);

    // Carrega os favoritos inicialmente
    useEffect(() => {
        document.title = 'PrecifyCar';
        const favoritosAtuais = RepositorioGeral.favoritos;
        setFavoritos(favoritosAtuais);
        setFavoritosFiltrados(favoritosAtuais);
    }, []);

    // Carrega o estado selecionado salvo
    useEffect(() => {
        const estadoSalvo = localStorage.getItem('estadoSelecionado');
        if (estadoSalvo) {
            setEstado(estadoSalvo);
        }
    }, []);

    // Filtra automaticamente conforme o usuário digita
    useEffect(() => {
        if (termoBusca.trim() === '') {
            setFavoritosFiltrados(favoritos);
        } else {
            const resultados = favoritos.flatMap((veiculo: Veiculo) =>
                veiculo.pesquisarPorCriterio(termoBusca, [veiculo])
            );
            setFavoritosFiltrados(resultados);
        }
    }, [termoBusca, favoritos]);

    return (
        <>
            <Header />
            <main>
                <div className={estilos.container}>
                    <div>
                        <input
                            type="text"
                            placeholder="Buscar por marca, modelo ou tipo..."
                            className={estilos.inputFav}
                            value={termoBusca}
                            onChange={(e) => setTermoBusca(e.target.value)}
                        />

                        <div className={estilos.itens}>
                            <ListagemItens
                                vetor={favoritosFiltrados}
                                estado={estado}
                                estadosAliquota={estadosAliquota}
                            />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}