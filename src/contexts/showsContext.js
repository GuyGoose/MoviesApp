import React, { useState } from "react";

export const ShowsContext = React.createContext(null);

const ShowsContextProvider = (props) => {
    const [favouriteShows, setFavouriteShows] = useState( [] )
    const [myReviews, setMyReviews] = useState( {} ) 
    const [pageNumber, setPageNum] = useState([])
    const [style, setStyle] = useState([])

  const setSitePageNumber = (num) => {
    setPageNum(num);
  };

  const setSitePageStyle = (style) => {
    setStyle(style);
  };

  const addToFavouriteShows = (show) => {
    let newFavourites = [...favouriteShows];
    if (!favouriteShows.includes(show.id)) {
      newFavourites.push(show.id);
    }
    setFavouriteShows(newFavourites);
  };

  // We will use this function in a later section
  const removeFromFavourites = (show) => {
    setFavouriteShows( favouriteShows.filter(
      (mId) => mId !== show.id
    ) )
  };

  const addReview = (show, review) => {
    setMyReviews( {...myReviews, [show.id]: review } )
  };

  return (
    <ShowsContext.Provider
      value={{
        favouriteShows,
        addToFavouriteShows,
        removeFromFavourites,
        addReview,
        pageNumber,
        setSitePageNumber,
        style,
        setSitePageStyle
      }}
    >
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsContextProvider;