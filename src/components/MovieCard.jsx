import React from "react";

// This function component is used to render a movie card. It receives several props including
// poster_path (image path of the movie), original_title (original title of the movie),
// AddtoWatchList (function to add the movie to watchlist), movieObj (object containing movie details),
// handleRemoveFromWatchList (function to remove the movie from watchlist), and wacthList (array of movies in the watchlist)
function MovieCard({
  poster_path, // image path of the movie
  original_title, // original title of the movie
  AddtoWatchList, // function to add the movie to watchlist
  movieObj, // object containing movie details
  handleRemoveFromWatchList, // function to remove the movie from watchlist
  watchList, // array of movies in the watchlist
}) {
  // Function to check if the movie is already in the watchlist
  // This function loops through the watchlist array and checks if the movie id matches with any movie id in the watchlist
  function doesContain(movieObj) {
    for (let i = 0; i < watchList.length; i++) {
      if (watchList[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  // Return the JSX for the movie card
  return (
    // Create a div element for the movie card
    // Set the height, width, background image, border radius, and hover effects
    <div
      className="h-[40vh] w-[200px]  bg-center bg-cover rounded-xl hover:cursor-pointer flex flex-col justify-between     hover:scale-110 duration-300"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {// Check if the movie is already in the watchlist using the doesContain function
      // If the movie is in the watchlist, display a delete button
      // On clicking the delete button, call the handleRemoveFromWatchList function and pass the movie object
      doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchList(movieObj)}
          className="m-4 flex justify-end"
        >
          &#10060; {/* Show a delete icon */}
        </div>
      ) : (
        // If the movie is not in the watchlist, display an add button
        // On clicking the add button, call the AddtoWatchList function and pass the movie object
        <div
          onClick={() => AddtoWatchList(movieObj)}
          className="m-4 flex justify-end"
        >
          &#128151; {/* Show an add icon */}
        </div>
      )}

      {/* Display the original title of the movie */}
      <div className="text-white text-xl w-full p-2 text-center  flex justify-center bg-gray-900/60">
        {original_title}
      </div>
    </div>
  );
}

export default MovieCard;
