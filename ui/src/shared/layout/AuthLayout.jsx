const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <aside className="hidden bg-venture-navy p-12 text-white lg:flex lg:flex-col">
          <div className="font-display text-5xl font-bold tracking-tight">Venture</div>
          <div className="mt-auto max-w-sm text-zinc-200">
            <p className="text-sm uppercase tracking-[0.2em]">CRM Workspace</p>
            <p className="mt-3 text-2xl font-semibold">Run your notes, tasks, and team progress with a focused dashboard.</p>
          </div>
        </aside>
        <main className="flex items-center justify-center px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
};

export default AuthLayout;
