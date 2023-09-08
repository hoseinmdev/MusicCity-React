import React from "react";
import { Link } from "react-router-dom";

interface Genre {
  title: string;
  imageUrl: string;
  path: string;
}
type Genres = Genre[];

const Genres: React.FC<{ genres: Genres; title: string }> = ({
  genres,
  title,
}) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-4">
      <p>{title}</p>
      <div className="grid w-full grid-cols-2 grid-rows-1 items-center justify-start gap-6 lg:flex lg:flex-wrap ">
        {genres.map((genre) => {
          return (
            <Link
              key={genre.path}
              to={genre.path}
              className="relative lg:cursor-pointer"
            >
              <img className="w-full rounded-lg lg:w-52" src={genre.imageUrl} />
              <p className="absolute bottom-1 left-3 text-base lg:text-lg text-white">
                {genre.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Genres;
