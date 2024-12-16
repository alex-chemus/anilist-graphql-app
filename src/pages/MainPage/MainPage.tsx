import { Navigate, Route, Routes } from "react-router-dom";
import NavSidebar from "./components/NavSidebar";
import CharactersTable from "../Characters/CharactersTable/CharactersTable";
import Films from "../Films/Films";
import Characters from "../Characters/Characters";

export default function MainPage() {
  return (
    <main className="flex h-screen">
      <NavSidebar />
      <section className="flex-grow p-12">
        <Routes>
          <Route path="/" element={<Navigate to="films" />} />
          <Route path="films/*" element={<Films />} />
          <Route path="characters/*" element={<Characters />} />
        </Routes>
      </section>
    </main>
  );
}
