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
                    <p className={estilos.paragrafo}>Este projeto é uma aplicação web para pesquisa de preços de veículos com base na API da Tabela FIPE, incluindo o cálculo do IPVA e funcionalidades de favoritos.</p>
                    <p className={estilos.paragrafo}>🔍 Desenvolvido como Trabalho Final Interdisciplinar das disciplinas:</p>
                    <ul>
                        <li>Arquitetura de Software</li>
                        <li>Desenvolvimento Front-End II</li>
                        <li>Programação Orientada a Objetos II</li>
                    </ul>
                    <h3>📄 Páginas da Aplicação</h3>
                    <ul>
                        <li className={estilos.paginas}>Home</li>
                            <p className={estilos.resumo}>Página inicial com um resumo geral do projeto.</p>
                        <li className={estilos.paginas}>Pesquisar FIPE</li>
                            <p className={estilos.resumo}>Formulário para pesquisa de veículos com os seguintes critérios:</p>
                            <li className={estilos.itensInternos}>Tipo de veículo</li>
                            <li className={estilos.itensInternos}>Marca</li>
                            <li className={estilos.itensInternos}>Modelo</li>
                            <li className={estilos.itensInternos}>Versão</li>
                            <li className={estilos.itensInternos}>Ano</li>
                            <li className={estilos.itensInternos}>Combustível</li>
                            <li className={estilos.itensInternos}>Estado (para cálculo do IPVA)</li>

                            <p className={estilos.resumo}>Após o preenchimento, um card do veículo é exibido com os dados:</p>
                            <li className={estilos.itensInternos}>Código FIPE </li>
                            <li className={estilos.itensInternos}>Marca</li>
                            <li className={estilos.itensInternos}>Modelo</li>
                            <li className={estilos.itensInternos}>Preço (valor FIPE)</li>
                            <li className={estilos.itensInternos}>Tipo de veículo </li>
                            <li className={estilos.itensInternos}>Combustível</li>
                            <li className={estilos.itensInternos}>Valor do IPVA (calculado com base no estado)</li>

                            <p className={estilos.resumo}>✅ O card também inclui um botão para adicionar aos favoritos.</p>
                        <li className={estilos.paginas}>Favoritos</li>
                            <p className={estilos.resumo}>Exibe todos os veículos adicionados aos favoritos, com:</p>
                            <li className={estilos.itensInternos}>Filtro por marca, modelo e tipo de veículo, basta digitar no input</li>
                            <li className={estilos.itensInternos}>Opção de remover o veículo dos favoritos</li>
                    </ul>
                    <h3>🎯 Objetivos</h3>
                    <ul className={estilos.listaSemPrevia}>
                        <li>Permitir a pesquisa de veículos através de requisições à API FIPE</li>
                        <li>Demonstrar herança, polimorfismo e uso de interfaces via POO</li>
                        <li>Usar conceitos de arquitetura para planejamento e estruturação do trabalho, com utilização de Diagrama de Classes</li>
                        <li>Reutilização de componentes criados no React</li>
                        <li>Calcular o valor do IPVA por estado, utilizando um arquivo JSON com as alíquotas</li>
                    </ul>
                    <h3>🛠️ Estrutura do Projeto</h3>
                    <ul className={estilos.listaSemPrevia}>
                        <li>Arquitetura baseada em Programação Orientada a Objetos (POO)</li>
                        <li>Uso de classes abstratas, herança, polimorfismo e interfaces</li>
                        <li>plicação dos princípios SOLID e GRASP</li>
                        <li>Utilização do padrão de projeto MVC</li>
                    </ul>
                    <h3>📚 Tecnologias Utilizadas</h3>
                    <ul className={estilos.listaSemPrevia}>
                        <li>⚛️ React</li>
                        <li>🟦 TypeScript</li>
                        <li>💡 Programação Orientada a Objetos</li>
                        <li>🧮 Consumo de API REST</li>
                    </ul>
                    <h3>🔗 Links</h3>
                    <ul className={estilos.listaSemPrevia}>
                        <li><a href="https://parallelum.com.br/fipe/api/v1/carros/marcas">📊 API FIPE Pública</a></li>
                        <li><a href="https://github.com/kaikBeninca/trabalho_interdisciplinar_3_api">💻 Repositório GitHub</a></li>
                        <li><a href="https://trabalho-interdisciplinar-3-api.vercel.app">🌐 Vercel</a></li>
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    )
}