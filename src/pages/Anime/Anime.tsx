import { Route, Routes } from "react-router-dom";
import AnimeCard from "./AnimeCard/AnimeCard";
import AnimeTable from "./AnimeTable/AnimeTable";

export default function Anime() {
  return (
    <Routes>
      <Route path="/" element={<AnimeTable />} />
      <Route path="/:id" element={<AnimeCard />} />
    </Routes>
  );
}
