import { useEffect, useState } from "react";


function MovieCardComponent({name, description, image, id}) {
    const [posterPathImageUrl, setPosterPathImageUrl] = useState('');
    // Imagen para la pagina de descipcion.
    /*https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/*/

    useEffect(() => {
        setPosterPathImageUrl(`https://image.tmdb.org/t/p/w500/${image}`)
    }, [image])

    const imageCard = posterPathImageUrl ? posterPathImageUrl : "Loadin...";
    const imageDefault = 'src/assets/default.png';
    const descriptionCard = description ? description.toString().slice(0, 150) + ' -leer mas...' : "Loadin...";
    const nameCard = name ? name : "Loadin...";
    const idCard = id ? id : "Loadin...";
    const link = name ? name.toString().slice(0, 14) + "..." : "Loadin...";

    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: '22rem' }}>
                <a href="#">
                    <img className="p-3 rounded-2xl" src={image ? imageCard : imageDefault} alt={"foto de "+ nameCard} />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{nameCard}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{descriptionCard}</p>
                    <a href={idCard} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {link}
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    )

}

export default MovieCardComponent