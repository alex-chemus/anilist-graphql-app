import { Route, Routes } from "react-router-dom";
import CharactersTable from "./CharactersTable/CharactersTable";
import CharacterCard from "./CharacterCard/CharacterCard";

export default function Characters() {
  return (
    <Routes>
      <Route path="/" element={<CharactersTable />} />
      <Route path="/:id" element={<CharacterCard />} />
    </Routes>
  );
}
