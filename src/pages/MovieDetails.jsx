import React, { Component } from 'react'
import { useParams } from 'react-router-dom';
import NavBarComponent from '../components/NavBarComponent';

function MovieDetails () {
    const params = useParams({})
    console.log(params);
    

    const url = `https://api.themoviedb.org/3/movie/${params?.idMovie}?language=en-US`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: import.meta.env.VITE_TOKEN_API
        }
    };

    fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error(err));
 
    return (
      <>
        <NavBarComponent/>
      </>
    )
  }

export default MovieDetails;