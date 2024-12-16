import { Route, Routes } from "react-router-dom";
import FilmsList from "./FilmsList/FilmsList";
import FilmCard from "./FilmCard/FilmCard";
import FilmCharacters from "./FilmCharacters/FilmCharacters";

export default function Films() {
  return (
    <Routes>
      <Route path="/" element={<FilmsList />} />
      <Route path="/:filmId" element={<FilmCard />} />
      <Route path="/:filmId/characters" element={<FilmCharacters />} />
    </Routes>
  );
}
