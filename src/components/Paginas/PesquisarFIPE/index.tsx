import { use, useEffect, useState } from "react";
import Footer from "../../Footer/index";
import Formulario from "../../Formulario";
import Header from "../../Header/index";

export default function PesquisarFIPE(props: any) {
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