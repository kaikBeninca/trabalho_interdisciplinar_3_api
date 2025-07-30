import { useEffect, useState } from "react";
import Footer from "../../Footer/index";
import Formulario from "../../Formulario";
import Header from "../../Header/index";
import { repositorioVeiculo } from "../../../RepositorioVeiculo";
import { carregarVeiculosDaAPI } from "../../../services/fipeService";
import { Veiculo } from "../../../modelos/Veiculo";

export default function PesquisarFIPE() {
    const [dadosFormulario, setDadosFormulario] = useState({});
    const [resultados, setResultados] = useState<Veiculo[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregar() {
            await carregarVeiculosDaAPI();
            setCarregando(false);
        }
        carregar();
    }, []);

    function handleSubmit(dados: any) {
        setDadosFormulario(dados);
        const criterio = dados.criterio || ""; // adapte conforme seu formulário
        const resultado = repositorioVeiculo.pesquisarPorCriterio(criterio);
        setResultados(resultado);
    }

    return (
        <>
            <Header/>
            <main>
                <Formulario onSubmit={handleSubmit}/>
                {carregando ? (
                    <p>Carregando dados da FIPE...</p>
                ) : (
                    <section>
                        <h2>Resultados da Pesquisa</h2>
                        <ul>
                            {resultados.map((v, i) => (
                                <li key={i}>
                                    {v.marca} - {v.modelo} - {v.ano} - R$ {v.valor}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
            <Footer/>
        </>
    )
}