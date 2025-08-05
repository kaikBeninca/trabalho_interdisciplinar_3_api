import { use, useEffect, useState } from "react";
import Footer from "../../Footer/index";
import Formulario from "../../Formulario";
import Header from "../../Header/index";

export default function PesquisarFIPE(props: any) {
    useEffect(() => {
            document.title = 'PrecifyCar';
    }, []);
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