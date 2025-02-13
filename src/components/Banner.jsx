import React from "react";

function Banner() {
  return (
    <div
      className="h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end "
      style={{
        backgroundImage:
          "url(https://dubeat.com/wp-content/uploads/2014/11/interstellar.jpg)",
      }}
    >
     <div className="text-white text-2xl w-full text-center bg-blue-900/60 p-4">
        Interstellar
      </div>
    </div>
  );
}

export default Banner;
