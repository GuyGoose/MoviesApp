import React, { useState, useEffect, useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";
import { MoviesContext } from "../contexts/moviesContext";
import { useParams } from "react-router-dom";


const UpcomingMoviesPage = (props) => {

  //const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)

  const {setSitePageNumber, setSitePageStyle} = useContext(MoviesContext);
  const {pageNumber} = useParams();
  const {  data, error, isLoading, isError }  = useQuery([`pg${pageNumber}`,{pgNum:pageNumber}], getUpcomingMovies)
  
    useEffect(() => {
    setSitePageNumber(pageNumber);
    }, [pageNumber])
  
    useEffect(() => {
    setSitePageStyle('upcoming')
    }, [pageNumber])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true 

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
);
};
export default UpcomingMoviesPage;