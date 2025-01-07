import { Route, Routes } from "react-router-dom";
import CharactersList from "./CharactersList/CharactersList";
import CharacterCard from "./CharacterCard/CharacterCard";

export default function Characters() {
  return (
    <Routes>
      <Route path="/" element={<CharactersList />} />
      <Route path="/:id" element={<CharacterCard />} />
    </Routes>
  );
}
