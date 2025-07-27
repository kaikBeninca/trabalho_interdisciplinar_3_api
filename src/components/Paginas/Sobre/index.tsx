import Footer from '../../Footer/index';
import Header from '../../Header/index';
import estilos from './Sobre.module.css';

export default function Sobre() {
    return (
        <>
            <Header/>
                <div className={estilos.texto}>
                    <h2>Sobre</h2>
                    <p>
                        Este projeto faz parte do meu Trabalho Final Interdisciplinar do curso de Tecnologia em Sistemas para Internet. A proposta foi desenvolvida unindo conhecimentos das disciplinas de Arquitetura de Software, Programação Orientada a Objetos II e Desenvolvimento Front-end II, resultando em uma aplicação web moderna e funcional.
                    </p>
                    <p>
                        A aplicação foi construída utilizando o framework React com TypeScript, seguindo os princípios do SOLID e aplicando conceitos de GRASP para garantir um sistema bem estruturado, coeso e com baixa acoplabilidade. O projeto também implementa polimorfismo e herança para representar diferentes tipos de veículos (carros, motos e caminhões), permitindo especializações futuras como cálculos distintos de IPVA ou regras de financiamento personalizadas por categoria.
                    </p>
                    <p>
                        O consumo da API pública da Tabela FIPE foi essencial para garantir a veracidade e atualidade dos dados, possibilitando que cada marca e modelo consultado reflita o que de fato está disponível no mercado nacional.
                    </p>
                    <ul>
                        <li>React e TypeScript para construção da interface</li>
                        <li>React Router DOM para navegação entre páginas</li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <p>
                        Mais do que escrever linhas de código, temos como missão criar soluções que realmente façam a diferença na vida das pessoas. Estamos em constante evolução, aprendendo com a comunidade, explorando novas ferramentas e tecnologias, e compartilhando conhecimento sempre que possível.
                    </p>
                    <p>
                        Se você também valoriza inovação, usabilidade e performance, está no lugar certo. Essa é a essência do que fazemos. Essa é a nossa cara. Esse é o nosso front-end com React.
                    </p>
                </div>
            
            <Footer/>
        </>
    )
}