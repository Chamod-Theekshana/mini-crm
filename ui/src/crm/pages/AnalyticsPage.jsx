import { useMemo } from 'react';
import AppShell from '../../shared/layout/AppShell';
import Button from '../../shared/ui/Button';
import Tag from '../../shared/ui/Tag';

const linePoints = [45, 75, 68, 84, 52, 43, 33, 68, 78, 94, 41, 72];

const topCompanies = [
  { name: 'Product Hunt', change: 5, type: 'monthly' },
  { name: 'Google', change: 2, type: 'monthly' },
  { name: 'Wordpress', change: 1, type: 'monthly' },
  { name: 'Tripadvisor', change: -3, type: 'urgent' },
  { name: 'Slack', change: -2, type: 'urgent' },
  { name: 'Zendesk', change: -3, type: 'urgent' }
];

const AnalyticsPage = () => {
  const actions = useMemo(
    () => (
      <>
        <Button variant="outline">January, 2023 - December, 2023</Button>
        <Button variant="outline">Month</Button>
      </>
    ),
    []
  );

  return (
    <AppShell title="Analytics" actions={actions}>
      <section className="grid gap-4 xl:grid-cols-[1fr_2.2fr]">
        <div className="space-y-4">
          <article className="rounded-card border border-venture-line bg-white p-4">
            <p className="text-sm text-zinc-500">Completed Task</p>
            <p className="mt-2 text-5xl font-semibold">21 Task</p>
            <Button variant="outline" size="sm" className="mt-3">
              View All
            </Button>
          </article>
          <article className="rounded-card border border-venture-line bg-white p-4">
            <h3 className="font-display text-2xl font-semibold">Top Companies</h3>
            <div className="mt-4 space-y-3">
              {topCompanies.map((company, index) => (
                <div key={company.name} className="flex items-center justify-between text-sm">
                  <span>
                    {index + 1}. {company.name}
                  </span>
                  <Tag type={company.type}>{Math.abs(company.change)}</Tag>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="rounded-card border border-venture-line bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-3xl font-semibold">Active Projects</h3>
              <p className="mt-1 text-5xl font-semibold">68 Projects</p>
            </div>
            <Tag type="monthly">12%</Tag>
          </div>
          <p className="mt-1 text-sm text-zinc-500">This Month</p>
          <div className="mt-5 grid h-64 grid-cols-12 items-end gap-2 border-b border-dashed border-zinc-300 pb-5">
            {linePoints.map((point, index) => (
              <div key={index} className="relative flex h-full items-end">
                <div className="w-full rounded-t-sm bg-black/90" style={{ height: `${point}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-12 text-xs text-zinc-500">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <span key={month} className="text-center">
                {month}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[2fr_1.2fr]">
        <article className="rounded-card border border-venture-line bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-3xl font-semibold">Active Companies</h3>
              <p className="mt-2 text-5xl font-semibold">341 Companies</p>
            </div>
            <Tag type="monthly">12%</Tag>
          </div>
          <div className="space-y-3">
            {[
              ['Agency', 57],
              ['Development', 38],
              ['Marketing', 25],
              ['Communication', 38],
              ['Web Development', 13],
              ['Travel Agency', 11]
            ].map(([name, value]) => (
              <div key={name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{name}</span>
                  <span>{value}</span>
                </div>
                <div className="h-3 rounded-full bg-zinc-200">
                  <div className="h-full rounded-full bg-black" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-card border border-venture-line bg-white p-4">
          <h3 className="font-display text-2xl font-semibold">Completed Project Target This Week</h3>
          <div className="mt-6 grid grid-cols-7 items-end gap-4">
            {[90, 45, 58, 82, 70, 60, 84].map((height, index) => (
              <div key={index} className="space-y-2 text-center">
                <div className="mx-auto h-40 w-4 rounded-full bg-zinc-200">
                  <div className="w-4 rounded-full bg-black" style={{ height: `${height}%` }} />
                </div>
                <p className="text-xs text-zinc-500">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
};

export default AnalyticsPage;
