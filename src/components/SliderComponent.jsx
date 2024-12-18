import { useEffect, useState } from 'react';

function SliderComponent({ movies, handleSelectChange }) {
    const [moviesData, setMoviesData] = useState([]);
    const [restarSlider, setRestarSlider] = useState('');

    useEffect(() => {
        setMoviesData(movies);
    }, [movies]);

    useEffect(() => {
        const firstElement = document.querySelector(".slider-childs");
        if (firstElement) {
            firstElement.setAttribute("data-active", "");
        }
    }, [moviesData]);

    useEffect(() => {
        if (handleSelectChange) {
            resetActiveElement();
        }
    }, [handleSelectChange]);
    useEffect(() => {
        const intervalId =
            setInterval(() => { nextElement(); }, 5000);
        // Cleanup function to clear the interval 
        return () => clearInterval(intervalId);
    }, [moviesData]); // Dependencia para reiniciar el intervalo cuando cambie moviesData

    const moviesAll = moviesData.length ? moviesData : 'Loading...';

    function nextElement() {
        const slider = document.querySelector("#slider");
        if (!slider) return;

        const childsSlider = [...slider.querySelectorAll("figure")];
        const lengthImages = childsSlider.length;
        const currentImage = getCurrentImage();
        if (!currentImage) return;

        let currentActiveIndex = parseInt(currentImage.dataset.idSlider, 10);
        currentActiveIndex++;

        childsSlider.forEach((child, index) => {
            child.dataset.idSlider = index;
        });

        if (currentActiveIndex >= lengthImages) {
            currentActiveIndex = 0;
        }

        const newActiveElement = childsSlider[currentActiveIndex];
        if (!newActiveElement) return;

        removeActiveElement();
        addNewActiveElement(newActiveElement);
    }

    function prevElement() {
        const slider = document.querySelector("#slider");
        if (!slider) return;

        const childsSlider = [...slider.querySelectorAll("figure")];
        const lengthImages = childsSlider.length;
        const currentImage = getCurrentImage();
        if (!currentImage) return;

        let currentActiveIndex = parseInt(currentImage.dataset.idSlider, 10);
        currentActiveIndex--;

        childsSlider.forEach((child, index) => {
            child.dataset.idSlider = index;
        });

        if (currentActiveIndex < 0) {
            currentActiveIndex = lengthImages - 1;
        }

        const newActiveElement = childsSlider[currentActiveIndex];
        if (!newActiveElement) return;

        removeActiveElement();
        addNewActiveElement(newActiveElement);
    }

    function getCurrentImage() {
        const slider = document.querySelector("#slider");
        return slider?.querySelector("[data-active]");
    }

    function removeActiveElement() {
        const currentImage = getCurrentImage();
        if (currentImage) {
            currentImage.removeAttribute("data-active");
        }
    }

    function addNewActiveElement(element) {
        if (element) {
            element.setAttribute("data-active", "");
        }
    }

    function resetActiveElement() {
        const childsSlider = [...document.querySelectorAll(".slider-childs")];
        childsSlider.forEach(child => {
            child.removeAttribute("data-active");
        });
        const firstElement = document.querySelector(".slider-childs[data-id-slider='0']");
        if (firstElement) {
            firstElement.setAttribute("data-active", "");

        }
    }

    const image = (movie) => {
        const imageUrl = `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`;
        return movie.backdrop_path ? imageUrl : null;
    }

    return (
        <>
            <section className="w-full mt-2 mx-auto max-w-[1460px] 2xl:max-w-[68rem] overflow-hidden text-white rounded-lg slider" id="slider">
                {Array.isArray(moviesAll) ? moviesAll.map((movie, index) => {
                    const imageUrl = image(movie);
                    return imageUrl ?  ( <figure key={index} className="relative w-full h-full aspect-video slider-childs" data-id-slider={index}>
                        <img src={imageUrl} className="w-full h-full block object-cover" alt={movie.title} />
                        <div className="absolute inset-0 w-[90%] mx-auto h-max mt-auto space-y-4 py-8 hidden md:block">
                            <h2 className="text-5xl font-bold">{movie.title}</h2>
                            <p className='text-2xl'>{movie.overview || 'No disponible en este idioma'}</p>
                        </div>
                    </figure>) : null
                }) : <p>{moviesAll}</p>}
                <button onClick={prevElement} className="slider-prev bg-white rounded-full ml-4" data-button="prev">
                    <img src="src/assets/prev.svg" className="w-8 aspect-square md:w-12" alt="previous" />
                </button>
                <button onClick={nextElement} className="slider-next bg-white rounded-full mr-4" data-button="next">
                    <img src="src/assets/next.svg" className="w-8 aspect-square md:w-12" alt="next" />
                </button>
            </section>
        </>
    );
}

export default SliderComponent;
