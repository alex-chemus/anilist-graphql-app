import { Route, Routes } from "react-router-dom";
import StudiosTable from "./StudiosTable/StudiosTable";

export default function Studios() {
  return (
    <Routes>
      <Route path="/" element={<StudiosTable />} />
    </Routes>
  );
}
