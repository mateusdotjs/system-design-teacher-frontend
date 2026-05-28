import { Route, Routes, useLocation } from "react-router";
import { AppLayout } from "./components/layout/app-layout";
import { LandingPage } from "./pages/landing-page";
import { ProblemsPage } from "./pages/problems-page";
import { SubmissionsPage } from "./pages/submissions-page";
import EditorPage from "./pages/editor-page";
import ProtectedRoute from "./components/protected-route";
import { NotFoundPage } from "./pages/not-found-page";

function App() {
  const location = useLocation();
  const isEditor = location.pathname.startsWith("/editor");

  return (
    <AppLayout hideFooter={isEditor}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <ProblemsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor/:id/:submissionId?"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <SubmissionsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
