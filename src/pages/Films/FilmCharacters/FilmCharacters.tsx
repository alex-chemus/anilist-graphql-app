import { useParams } from "react-router-dom";

export default function FilmCharacters() {
  const { filmId } = useParams();

  return <div>{filmId} characters</div>;
}
