import estilo from './Header.module.css';
import Navlinks from '../Header-navlinks/index';
import Headerlogin from '../Header-login/index';

export default function Header(props: any) {
    return (
        <header className={estilo.navbar}>
            
            <div className={estilo.container}>
                <div className={estilo.navbarleft}>
                    <h1 className={estilo.logo}>Dribbble</h1>
                </div>
                <Navlinks/>
                <Headerlogin/>
            </div>
        </header>
    )
}  