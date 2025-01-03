import React from "react";
import logoFacebook from "../assets/facebook-1.svg";
import logoInstagram from "../assets/instagram-1.svg";
import logoTwitter from "../assets/twitter-1.svg";

// Función para agregar el footer
function FooterComponent() {
    return (
        <>
            <footer className="bg-white border-b-2 border-gray-800 dark:bg-gray-900 text-slate-300">
                <h2 className="flex justify-center pb-2 text-xl">Contactos</h2>
                <div className="flex justify-center">
                    <div className="w-10 h-10 flex-none pr-4">
                        <a href=""><img src={logoFacebook} alt="logo de facebook" /></a>
                    </div>
                    <div className="w-10 h-10 flex-none pl-1 pr-1">
                        <a href=""><img src={logoInstagram} alt="logo de instagram" /></a>
                    </div>
                    <div className="w-10 h-10 flex-none pl-4">
                        <a href=""><img src={logoTwitter} alt="logo de twitter" /></a>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:justify-around w-full pb-2 items-center">
                    <div className="mb-4 md:mb-0">
                        <ul>
                            <h3 className="text-xl capitalize italic">Acerca de Isaac</h3>
                            <li className="pb-2 text-lg">Estudiante de master en coding en devf</li>
                            <li className="pb-2 text-lg">github: <a href="https://github.com/isaacmb-alfa" target="_blank" rel="noopener noreferrer">/github/isaac-alfa</a></li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <ul>
                            <h2 className="text-xl capitalize italic">Desarrolladores</h2>
                            <li className="pb-2 text-lg">Desarrollado por Isaac Manriquez</li>
                            <li className="pb-2 text-lg">Desarrollado por Leonardo Ocampo</li>
                        </ul>
                    </div>
                    <div className="mb-4 md:mb-0">
                        <ul>
                            <h3 className="italic text-2xl">Acerca de Leonardo</h3>
                            <li className="pb-2 text-lg">Estudiante de master en coding en devf</li>
                            <li className="pb-2 text-lg">github: <a href="https://github.com/leoocampo" target="_blank" rel="noopener noreferrer">https://github.com/leoocampo</a></li>
                            <li className="pb-2 text-lg">facebook: Leonardo Ocampo</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default FooterComponent;
