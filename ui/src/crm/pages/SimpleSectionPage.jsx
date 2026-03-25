import AppShell from '../../shared/layout/AppShell';

const SimpleSectionPage = ({ title, description }) => {
  return (
    <AppShell title={title}>
      <section className="rounded-card border border-venture-line bg-white p-8">
        <h2 className="font-display text-3xl font-semibold">{title}</h2>
        <p className="mt-2 max-w-2xl text-zinc-600">{description}</p>
      </section>
    </AppShell>
  );
};

export default SimpleSectionPage;
