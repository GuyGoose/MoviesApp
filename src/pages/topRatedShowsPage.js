import React, { useContext } from "react";
import { getTopRatedShows } from "../api/tmdb-api";
import PageTemplate from '../components/templateShowList';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { ShowsContext } from "../contexts/showsContext";
import { useParams } from "react-router-dom";

const TopRatedShowsPage = (props) => {

  //const {  data, error, isLoading, isError }  = useQuery('topratedshows', getTopRatedShows)

  const {setSitePageNumber, setSitePageStyle} = useContext(ShowsContext);
  const {pageNumber} = useParams();
  const {  data, error, isLoading, isError }  = useQuery([`pg${pageNumber}`,{pgNum:pageNumber}], getTopRatedShows)
  setSitePageNumber(pageNumber);
  setSitePageStyle('toprated')

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data.results;


  // Redundant, but necessary to avoid app crashing.
  const favourites = shows.filter(m => m.favourite)
  localStorage.setItem('favourites', JSON.stringify(favourites))
  const addToFavourites = (movieId) => true 

  return (
    <PageTemplate
      title="Top Rated TV Shows"
      shows={shows}
      action={(show) => {
        return <AddToFavouritesIcon movie={show} />
      }}
    />
);
};
export default TopRatedShowsPage;