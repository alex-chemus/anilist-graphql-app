import { Route, Routes } from "react-router-dom";
import AnimeList from "./AnimeList/AnimeList";
import AnimeCard from "./AnimeCard/AnimeCard";

export default function Anime() {
  return (
    <Routes>
      <Route path="/" element={<AnimeList />} />
      <Route path="/:id" element={<AnimeCard />} />
    </Routes>
  );
}
