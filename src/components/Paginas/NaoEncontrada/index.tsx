import Footer from '../../Footer/index';
import Header from '../../Header/index';
import estilos from './NaoEncontrada.module.css';

export default function NaoEncontrada() {
    return(
        <>
            <Header/>
            <div className={estilos.container}>
                <h1 className={estilos.error}>Error 404</h1>
                <p className={estilos.mensagem}>Page Not Found</p>
            </div>
            <Footer/>
        </>
    )
}