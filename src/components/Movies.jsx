import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({ AddtoWatchList, handleRemoveFromWatchList, watchList }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setpageNo] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=63b6fcda19a8e5a0bd42b1a78bc55d8f&language=en-US&page=${pageNo}%27`
      )
      .then(function (res) {
        setMovies(res.data.results);
        console.log(res.data.results);
      });
  }, [pageNo]);

  function increment() {
    setpageNo(pageNo + 1);
  }
  console.log(pageNo);
  function decrement() {
    if (pageNo == 1) {
      setpageNo(pageNo);
    } else {
      setpageNo(pageNo - 1);
    }
  }
  console.log(pageNo);
  return (
    <div className="p-5 ">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around m-10 gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              poster_path={movieObj.poster_path}
              original_title={movieObj.original_title}
              AddtoWatchList={AddtoWatchList}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchList={watchList}
            />
          );
        })}
      </div>
      <Pagination increment={increment} pageNo={pageNo} decrement={decrement} />
    </div>
  );
}

export default Movies;
