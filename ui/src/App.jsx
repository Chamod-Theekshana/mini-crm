import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './auth/pages/LoginPage';
import RegisterPage from './auth/pages/RegisterPage';
import NotesListPage from './notes/pages/NotesListPage';
import NoteFormPage from './notes/pages/NoteFormPage';
import ProtectedRoute from './shared/routing/ProtectedRoute';
import DashboardPage from './crm/pages/DashboardPage';
import AnalyticsPage from './crm/pages/AnalyticsPage';
import NotificationsPage from './crm/pages/NotificationsPage';
import TasksPage from './crm/pages/TasksPage';
import SimpleSectionPage from './crm/pages/SimpleSectionPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/emails" element={<SimpleSectionPage title="Emails" description="Email campaign workspace is ready for integration with your provider APIs." />} />
        <Route path="/calendars" element={<SimpleSectionPage title="Calendars" description="Calendar scheduling board is ready for your meetings and campaign timelines." />} />
        <Route path="/contacts" element={<SimpleSectionPage title="Contacts" description="Contacts module can be connected to backend contact resources next." />} />
        <Route path="/companies" element={<SimpleSectionPage title="Companies" description="Companies module can be connected to backend company resources next." />} />
        <Route path="/integrations" element={<SimpleSectionPage title="Integrations" description="Manage CRM integrations, webhooks, and external app access in one place." />} />
        <Route path="/settings" element={<SimpleSectionPage title="Settings" description="Workspace profile, team permissions, and preferences can be configured here." />} />
        <Route path="/notes" element={<NotesListPage />} />
        <Route path="/notes/new" element={<NoteFormPage mode="create" />} />
        <Route path="/notes/:id/edit" element={<NoteFormPage mode="edit" />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
