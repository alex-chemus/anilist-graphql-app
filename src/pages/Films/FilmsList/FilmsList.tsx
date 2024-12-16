import { Skeleton } from "@/shared/ui/skeleton";
import useAllFilms from "./api/useAllFilms";
import { Card } from "@/shared/ui/card";
import { useNavigate } from "react-router-dom";

export default function FilmsList() {
  const { data, isLoading } = useAllFilms();

  const navigate = useNavigate();

  if (isLoading) return <Skeleton />;

  return (
    <div className="m-auto flex w-2/3 flex-col gap-3">
      {data?.films?.map((film) => (
        <Card
          key={film?.episodeID}
          className="group cursor-pointer p-5"
          onClick={() => navigate(`./${film?.episodeID}`)}
        >
          <div className="text-lg font-medium transition-none group-hover:text-indigo-500">
            {film?.title}
          </div>
          <div className="flex justify-start gap-7">
            <div className="text-sm">{film?.director}</div>
            <div className="text-sm">{film?.releaseDate}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
