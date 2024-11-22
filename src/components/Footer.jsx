import React from "react";
import { FaSquareGithub } from "react-icons/fa6";
import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__description">
                    <p>
                        paGon es una proyecto desarrollado desde 2023 en el marco del
                        programa de Análisis y Desarrollo de Software del SENA.
                    </p>
                </div>
                <div className="footer__links">
                    <a href="https://github.com/Ftuberquia/App-pagon"
                        target="_blank"
                        rel="noopener noreferrer"
                    ><FaSquareGithub className="footer__link" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
