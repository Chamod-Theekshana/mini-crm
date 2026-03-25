import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/pages/LoginPage';
import RegisterPage from './auth/pages/RegisterPage';
import NotesListPage from './notes/pages/NotesListPage';
import NoteFormPage from './notes/pages/NoteFormPage';
import ProtectedRoute from './shared/routing/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/notes" element={<NotesListPage />} />
        <Route path="/notes/new" element={<NoteFormPage mode="create" />} />
        <Route path="/notes/:id/edit" element={<NoteFormPage mode="edit" />} />
      </Route>

      <Route path="*" element={<Navigate to="/notes" replace />} />
    </Routes>
  );
}

export default App;
