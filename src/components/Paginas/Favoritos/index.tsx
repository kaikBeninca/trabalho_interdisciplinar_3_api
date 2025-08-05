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
        setFavoritos(RepositorioGeral.favoritos);
        setFavoritosFiltrados(RepositorioGeral.favoritos);
    }, []);

    // Filtra os favoritos quando o termo de busca muda
    useEffect(() => {
        if (termoBusca.trim() === '') {
            setFavoritosFiltrados(favoritos);
        } else {
            const resultado = favoritos.filter(veiculo =>
                veiculo.marca.toLowerCase().includes(termoBusca.toLowerCase()) ||
                veiculo.modelo.toLowerCase().includes(termoBusca.toLowerCase()) ||
                veiculo.ano.toString().includes(termoBusca)
            );
            setFavoritosFiltrados(resultado);
        }
    }, [termoBusca, favoritos]);

    useEffect(() => {
        const estadoSalvo = localStorage.getItem('estadoSelecionado');
        if (estadoSalvo) {
            setEstado(estadoSalvo);
        }
    }, []);

    return (
        <>
            <Header />
            <main>
                <div className={estilos.container}>
                    <div>
                        <input type="text" placeholder="Buscar por marca, modelo ou ano..." className={estilos.inputFav} value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} />

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
};
