import Footer from "../../Footer/index";
import Formulario from "../../Formulario";
import Header from "../../Header/index";
import estilos from "./CompararPrecos.module.css"

export default function CompararPrecos() {
    return (
        <>
            <Header />
            <main>
                <Formulario/>
                <Formulario/>
            </main>
            <Footer/>
        </>
    )
}