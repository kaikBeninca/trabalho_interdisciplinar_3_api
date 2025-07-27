import Footer from '../../Footer/index';
import Header from '../../Header/index';

export default function Default(props: any) {
    return (
        <>
            <Header />
            <main>{props.conteudo}</main>
            <Footer/>
        </>
    )
}