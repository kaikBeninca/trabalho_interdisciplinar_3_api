import { use, useEffect } from "react";
import Footer from "../../Footer/index";
import Formulario from "../../Formulario";
import Header from "../../Header/index";

export default function PesquisarFIPE() {
    return (
        <>
            <Header />
            <main>
                <Formulario />
            </main>
            <Footer />
        </>
    )
}