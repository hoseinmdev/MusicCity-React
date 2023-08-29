import React from "react";
import { Link } from "react-router-dom";

interface Genre {
  title: string;
  imageUrl: string;
  path:string
}
type Genres = Genre[];

const Genres: React.FC<{ genres: Genres; title: string }> = ({
  genres,
  title,
}) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <p>{title}</p>
      <div className="grid grid-cols-2 grid-rows-1 lg:flex lg:flex-wrap w-full items-center justify-start gap-6 ">
        {genres.map((genre) => {
          return (
            <Link key={genre.path} to={genre.path} className="relative cursor-pointer">
              <img className="w-full lg:w-52 rounded-lg" src={genre.imageUrl} />
              <p className="absolute bottom-1 left-3 text-base lg:text-lg">{genre.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Genres;
