import estilo from './Footer.module.css';
export default function Footer() {
    return (
        <footer className={estilo.footer}>
            <div className={estilo.container}>
                <p>&copy; 2025 PrecifyCar. All rights reserved.</p>
            </div>
        </footer>);
}