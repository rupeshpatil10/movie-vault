import React, { useEffect, useState } from "react";
import genreids from "../Utility/genreids";

// This is a functional component called WatchList that takes in two props:
// watchList - an array of movie objects
// setWacthList - a function to update the watchList array
function WatchList({ watchList, setWacthList, handleRemoveFromWatchList }) {
  // State variables to hold the search query and the current genre filter
  const [search, setSearch] = useState("");
  const [genreList, setGenreList] = useState(["All genres"]);
  const [currGenre, setCurrGenre] = useState("All genres");

  // Function to handle changes in the search input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Function to handle changes in the genre filter
  const handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  // Function to sort the watchList array in increasing order of vote_average
  const sortIncreasing = () => {
    const sortedIncrease = watchList.sort((movieObjA, movieObjB) => {
      return movieObjA.vote_average - movieObjB.vote_average;
    });
    setWacthList([...sortedIncrease]);
  };

  // Function to sort the watchList array in decreasing order of vote_average
  const sortDecreasing = () => {
    const sortedDecrease = watchList.sort((movieObjA, movieObjB) => {
      return movieObjB.vote_average - movieObjA.vote_average;
    });
    setWacthList([...sortedDecrease]);
  };

  // useEffect hook to populate the genreList state variable with unique genres from the watchList array
  useEffect(() => {
    let temp = watchList.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All genres", ...temp]);
    console.log(temp);
  }, [watchList]);

  // JSX to render the WatchList component
  return (
    <>
      {/* Render genre filter buttons */}
      <div className="flex justify-center my-4">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currGenre == genre
                  ? "h-[3rem] w-[9rem] rounded-xl items-center text-white font-bold bg-blue-400 flex justify-center mx-4"
                  : "h-[3rem] w-[9rem] rounded-xl items-center text-white font-bold bg-gray-400 flex justify-center mx-4"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>

      {/* Render search input */}
      <div className="flex justify-center my-4">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          placeholder="Search movies"
          className="h-[3rem] w-[18rem] bg-gray-300 outline-none px-4"
        />
      </div>

      {/* Render the watchList table */}
      <div className="overflow-hidden border border-gray-200 m-8">
        <table className="w-full text-gray text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
                {/* Render button to sort the watchList array in increasing order of vote_average */}
                <div onClick={sortIncreasing}>
                  <i className="p-2 fa-solid fa-arrow-up"></i>
                </div>
                <th>Rating</th>
                {/* Render button to sort the watchList array in decreasing order of vote_average */}
                <div onClick={sortDecreasing}>
                  <i className="p-2 fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render rows for each movie object in the watchList array */}
            {watchList
              .filter((movieObj) => {
                // Filter movies based on the current genre filter
                return currGenre == "All genres"
                  ? true
                  : currGenre == genreids[movieObj.genre_ids[0]];
              })
              .filter((movieObj) => {
                // Filter movies based on the search query
                return movieObj.original_title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      {/* Render the movie poster image and name */}
                      <img
                        className="w-[100px]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt={movieObj.original_title}
                      />
                      <div className="mx-10">{movieObj.original_title}</div>
                    </td>
                    {/* Render the movie rating */}
                    <td>{movieObj.vote_average}</td>
                    {/* Render the movie popularity */}
                    <td>{movieObj.popularity}</td>
                    {/* Render the movie genre */}
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    {/* Render delete button */}
                    <td
                      onClick={() => handleRemoveFromWatchList(movieObj)}
                      className="text-red-500 cursor-pointer"
                    >
                      Delete
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
