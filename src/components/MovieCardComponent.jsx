import { useEffect, useState } from "react";
import imageDefault from "../assets/default.png"
import { NavLink } from "react-router-dom";



function MovieCardComponent({ name, description, image, id }) {
    const [posterPathImageUrl, setPosterPathImageUrl] = useState('');
    // Imagen para la pagina de descipcion.
    /*https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/*/

    const slugify = str =>
        str
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .replace(/\s+/g, '-')

    useEffect(() => {
        setPosterPathImageUrl(`https://image.tmdb.org/t/p/w500/${image}`)
    }, [image])

    const imageCard = posterPathImageUrl ? posterPathImageUrl : "Loadin...";
    const navlink = <NavLink to={`/${slugify(name)}/${id}`}>{'Leer mas...'}</NavLink>
    // console.log(navlink);

    const descriptionCard = description ? (
        <>
            {description.toString().slice(0, 150)}...{navlink}
        </>) : "Loadin...";
    const nameCard = name ? name : "Loadin...";
    const link = name ? name.toString().slice(0, 14) + "..." : "Loadin...";
    const linkFrendly = slugify(name)




    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: '22rem' }}>
                <a href={`/${slugify(name)}/${id}`}>
                    <img className="p-3 rounded-2xl" src={image ? imageCard : imageDefault} alt={"foto de " + nameCard} />
                </a>
                <div className="p-5">
                    <a href={`/${slugify(name)}/${id}`}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{nameCard}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{descriptionCard}</p>
                    <NavLink className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={`/${linkFrendly}/${id}`}>{link}
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </NavLink>
                </div>
            </div>
        </>
    )

}

export default MovieCardComponent