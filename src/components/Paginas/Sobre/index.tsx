import { useEffect } from "react";
import Footer from "../../Footer";
import Header from "../../Header";
import estilos from "./Sobre.module.css";

export default function Sobre() {
    useEffect(() => {
            document.title = 'PrecifyCar';
    }, []);
    return (
        <>
            <Header />
            <main>
                <div className={estilos.texto}>
                    <h2>Propósito</h2>
                    <h3>🚗 Projeto FIPE React + TypeScript</h3>
                    <p>
                        Este projeto tem como propósito desenvolver uma aplicação web para pesquisa de preços de veículos com base na API da Tabela FIPE, bem como cálculo do seu IPVA.
                    </p>
                    <p>A proposta surgiu como Trabalho Final Interdisciplinar das disciplinas:</p>
                    <ul>
                        <li>Arquitetura de Software</li>
                        <li>Desenvolvimento Front-End II</li>
                        <li>Programação Orientada a Objetos II</li>
                    </ul>
                    <h3>🎯 Objetivos da Aplicação</h3>
                    <p>A aplicação foi projetada para oferecer três funcionalidades principais:</p>
                    <ul>
                        <li>Pesquisar Veículos</li>
                            <li className={estilos.itensInternos}>Filtrar veículos pela API da FIPE com base em tipo, marca, modelo e ano.</li>
                        <li>Adicionar aos Favoritos</li>
                            <li className={estilos.itensInternos}>Possibilidade de adicionar aos favoritos a fim de demonstrar herança, polimorfismo e uso de interface.</li>
                        <li>Calcular IPVA</li>
                            <li className={estilos.itensInternos}>Calcular o valor do IPVA com base no estado selecionado e no valor do veículo, utilizando um JSON com alíquotas estaduais.</li>
                    </ul>
                    <h3>🛠️ Estrutura do Projeto</h3>
                    <p>
                        A arquitetura do projeto foi baseada em Programação Orientada a Objetos, usando classes abstratas, herança, polimorfismo e princípios SOLID/GRASP.
                    </p>
                    <h3>📚 Tecnologias Utilizadas</h3>
                    <ul className={estilos.listaSemPrevia}>
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>Programação Orientada a Objetos</li>
                    </ul>
                    <h3>🔗 Links</h3>
                    <ul className={estilos.listaSemPrevia}>
                        <li>API FIPE (https://parallelum.com.br/fipe/api/v1/carros/marcas)</li>
                        <li>GitHub (https://github.com/kaikBeninca/trabalho_interdisciplinar_3_api)</li>
                        <li>Vercel</li>
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    )
}