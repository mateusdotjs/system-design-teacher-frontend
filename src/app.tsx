import { Route, Routes, useLocation } from "react-router";
import { AppLayout } from "./components/layout/app-layout";
import { LandingPage } from "./pages/landing-page";
import { ProblemsPage } from "./pages/problems-page";
import { SubmissionsPage } from "./pages/submissions-page";
import EditorPage from "./pages/editor-page";
import { NotFoundPage } from "./pages/not-found-page";

function App() {
  const location = useLocation();
  const isEditor = location.pathname.startsWith("/editor");

  return (
    <AppLayout hideFooter={isEditor}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/editor/:id/:submissionId?" element={<EditorPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
