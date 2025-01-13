import { Navigate, Route, Routes } from "react-router-dom";
import NavSidebar from "./components/NavSidebar";
import Anime from "../Anime/Anime";
import { Suspense } from "react";
import { PageSkeleton } from "@/shared/ui/skeleton";
import Characters from "../Characters/Characters";
import Studios from "../Studios/Studios";

export default function MainPage() {
  return (
    <main className="flex min-h-screen">
      <NavSidebar />
      <section className="flex-grow p-12">
        <Routes>
          <Route path="/" element={<Navigate to="anime" />} />

          <Route
            path="anime/*"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Anime />
              </Suspense>
            }
          />

          <Route
            path="characters/*"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Characters />
              </Suspense>
            }
          />

          <Route
            path="studios/*"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Studios />
              </Suspense>
            }
          />
        </Routes>
      </section>
    </main>
  );
}
