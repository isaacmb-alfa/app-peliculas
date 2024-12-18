import React from "react"
//funcion para agregar el footer
function FooterComponent() {

    return (
        <>
            <div className="bg-slate-400 border-s-blue-400">
                <h2 className="flex justify-center pb-2 text-xl ">Contactos</h2>
                <div className="flex justify-center ">
                    <div className="w-10 h-10 flex-none  animate-bounce pr-4">
                        <a href=""><img src="./src/assets/facebook-1.svg" alt="logo de facebook" /></a>
                    </div>
                    <div className="w-10 h-10 flex-none  animate-bounce pl-1 pr-1">
                        <a href=""><img src="./src/assets/instagram-1.svg" alt="logo de instagram" /></a>
                    </div>
                    <div className="w-10 h-10 flex-none  animate-bounce pl-4">
                        <a href=""><img src="./src/assets/twitter-1.svg" alt="logo de facebook" /></a>
                    </div>
                </div>
                <div className="flex flex-nowrap  justify-around w-full md:w-auto pb-2">
                    <div>
                        <ul>
                            <h3 className="text-xl  capitalize italic">acerda de Isaac </h3>
                            <li className="pb-2 text-lg">estudiante de master en coding en devf</li>
                            <li className="pb-2 text-lg">github: https://github.com/leoocampo</li>
                            <li className="pb-2 text-lg">Facebook: Isaac Manriquez</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <h2 className="text-xl capitalize italic">desarolladores</h2>
                            <li className="pb-2 text-lg"> Desarrollado por Leonardo Ocampo</li>
                            <li className="pb-2 text-lg"> Desarrollado por Isaac Manriquez</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <h3 className="italic text-2xl">Acerca de Leonardo</h3>
                            <li className="pb-2 text-lg" >estudiante de master en coding en devf</li>
                            <li className="pb-2 text-lg">github: https://github.com/leoocampo</li>
                            <li className="pb-2 text-lg">facebook: Leonardo Ocampo</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )


}



export default FooterComponent;


