import { useNavigate, useParams } from "react-router-dom";
import useFilm from "./api/useFilm";
import { Skeleton } from "@/shared/ui/skeleton";
import { Card, CardTitle } from "@/shared/ui/card";
import { UserRound } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "@/shared/ui/button";

const referenceButtons: {
  title: string;
  icon: ReactNode;
}[] = [
  {
    title: "Characters",
    icon: <UserRound size={42} />,
  },
];

export default function FilmCard() {
  const { filmId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useFilm(filmId ?? "");

  if (isLoading) return <Skeleton />;

  return (
    <Card className="m-auto w-3/4 p-10">
      <CardTitle className="mb-5">{data?.title}</CardTitle>
      <div className="mb-7">{data?.openingCrawl}</div>
      {referenceButtons.map(({ title, icon }) => (
        <Button
          key={title}
          variant="outline"
          onClick={() => navigate("./characters")}
        >
          {icon}
          <span>{title}</span>
        </Button>
      ))}
    </Card>
  );
}
