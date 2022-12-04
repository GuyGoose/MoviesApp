import React, { useContext, useEffect } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { MoviesContext } from "../contexts/moviesContext";
import { useParams } from "react-router-dom";

const HomePage = (props) => {

  //const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)

  const {setSitePageNumber, setSitePageStyle} = useContext(MoviesContext);
  const {pageNumber} = useParams();
  const {  data, error, isLoading, isError }  = useQuery([`pg${pageNumber}`,{pgNum:pageNumber}], getMovies)
  
  useEffect(() => {
  setSitePageNumber(pageNumber);
  }, [pageNumber])

  useEffect(() => {
  setSitePageStyle('movies')
  }, [pageNumber])
  

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true 

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavouritesIcon movie={movie} />
      }}
    />
);


};
export default HomePage;