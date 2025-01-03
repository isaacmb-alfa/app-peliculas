import { useEffect, useState, useRef } from 'react';
import prev from '../assets/prev.svg'
import next from '../assets/next.svg'

function SliderComponent({ movies, handleSelectChange }) {
    const [moviesData, setMoviesData] = useState([]);
    const [isHovering, setIsHovering] = useState(false); // State for hover detection
    const intervalIdRef = useRef(null); // Ref to store interval ID
    const currentActiveIndexRef = useRef(0); // Ref para el índice actual del slider

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

    // Improved interval logic with hover handling
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!isHovering) { // Pause animation on hover
                nextElement();
            }
        }, 5000);
        intervalIdRef.current = intervalId; // Store interval ID in useRef

        return () => clearInterval(intervalIdRef.current); // Cleanup function
    }, [moviesData, isHovering]);

    const moviesAll = moviesData.length ? moviesData : 'Loading...';

    function nextElement() {
        const slider = document.querySelector("#slider");
        if (!slider) return;

        const childsSlider = [...slider.querySelectorAll("figure")];
        const lengthImages = childsSlider.length;

        removeActiveElement();

        currentActiveIndexRef.current = (currentActiveIndexRef.current + 1) % lengthImages; // Cálculo con módulo
        addNewActiveElement(childsSlider[currentActiveIndexRef.current]);
    }

    function prevElement() {
        const slider = document.querySelector("#slider");
        if (!slider) return;

        const childsSlider = [...slider.querySelectorAll("figure")];
        const lengthImages = childsSlider.length;

        removeActiveElement();

        currentActiveIndexRef.current = (currentActiveIndexRef.current - 1 + lengthImages) % lengthImages; // Cálculo con módulo para negativos
        addNewActiveElement(childsSlider[currentActiveIndexRef.current]);
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
        currentActiveIndexRef.current = 0; // Resetea el índice al principio
        const firstElement = document.querySelector(".slider-childs[data-id-slider='0']");
        if (firstElement) {
            firstElement.setAttribute("data-active", "");

        }
    }

    const image = (movie) => {
        const imageUrl = `https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`;
        return movie.backdrop_path ? imageUrl : null;
    }

    // Handle slider hover for animation control
    const handleSliderHover = (event) => {
        setIsHovering(event.type === 'mouseenter'); // Set hover state based on event type
    };

    // Reset animation timer on click of next/prev buttons
    const handleButtonClick = (direction) => { // Recibe la dirección (next o prev)
        clearInterval(intervalIdRef.current);
        if (direction === 'next') {
            nextElement();
        } else {
            prevElement();
        }
        intervalIdRef.current = setInterval(() => { if (!isHovering) nextElement() }, 5000);
    };
    // console.log(isHovering, intervalIdRef, currentActiveIndexRef);
    

    return (
        <>
            <section
                className="w-full mt-2 mx-auto max-w-[1460px] 2xl:max-w-[68rem] overflow-hidden text-white rounded-lg slider"
                id="slider"
                onMouseEnter={handleSliderHover} // Se añade el evento onMouseEnter
                onMouseLeave={handleSliderHover} // Se añade el evento onMouseLeave
            >
                {Array.isArray(moviesAll) ? (
                    moviesAll.map((movie, index) => {
                        const imageUrl = image(movie);
                        return imageUrl ? (
                            <figure
                                key={index}
                                className="relative w-full h-full aspect-video slider-childs"
                                data-id-slider={index}
                            >
                                <img
                                    src={imageUrl}
                                    className="w-full h-full block object-cover"
                                    alt={movie.title}
                                />
                                <div className="absolute inset-0 w-[90%] mx-auto h-max mt-auto space-y-4 py-8 hidden md:block">
                                    <h2 className="text-5xl font-bold">{movie.title}</h2>
                                    <p className="text-2xl">{movie.overview || "No disponible en este idioma"}</p>
                                </div>
                            </figure>
                        ) : null;
                    })
                ) : (
                    <p>{moviesAll}</p>
                )}
                <button
                    onClick={() => handleButtonClick('prev')} // Pasa 'prev'
                    className="slider-prev bg-white rounded-full ml-4"
                    data-button="prev"
                >
                    <img src={prev} className="w-8 aspect-square md:w-12" alt="previous" />
                </button>
                <button
                    onClick={() => handleButtonClick('next')} // Pasa 'next'
                    className="slider-next bg-white rounded-full mr-4"
                    data-button="next"
                >
                    <img src={next} className="w-8 aspect-square md:w-12" alt="next" />
                </button>
            </section>
        </>
    );
}

export default SliderComponent;
