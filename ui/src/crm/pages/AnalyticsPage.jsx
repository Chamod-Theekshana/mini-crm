import { useMemo } from 'react';
import AppShell from '../../shared/layout/AppShell';
import Button from '../../shared/ui/Button';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const linePoints = [45, 75, 68, 80, 54, 44, 34, 67, 77, 95, 41, 72];
const weeklyBars = [82, 42, 57, 86, 74, 59, 86];

const topCompanies = [
  { name: 'Product Hunt', icon: 'P', color: '#E4572E', change: 5 },
  { name: 'Google', icon: 'G', color: '#4285F4', change: 2 },
  { name: 'Wordpress', icon: 'W', color: '#21759B', change: 1 },
  { name: 'Tripadvisor', icon: 'T', color: '#34A853', change: -3 },
  { name: 'Slack', icon: 'S', color: '#5D3EBC', change: -2 },
  { name: 'Zendesk', icon: 'Z', color: '#17494D', change: -3 }
];

const activeCompanies = [
  ['Agency', 57],
  ['Development', 38],
  ['Marketing', 25],
  ['Marketing', 25],
  ['Communication', 38],
  ['Web Development', 13],
  ['Web Development', 13],
  ['Web Development', 13],
  ['Travel Agency', 11]
];

const toChartCoordinates = (points, width = 760, height = 210, topPad = 10) => {
  const stepX = width / (points.length - 1);
  return points
    .map((point, index) => {
      const x = index * stepX;
      const y = topPad + ((100 - point) / 100) * (height - topPad);
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
};

const AnalyticsPage = () => {
  const chartPolyline = useMemo(() => toChartCoordinates(linePoints), []);

  return (
    <AppShell title="Analytics">
      <section className="mb-4 border-b border-venture-line pb-2">
        <div className="flex items-center gap-8 text-[18px]">
          <p className="font-display text-[18px] font-semibold">Analytics</p>
          <button type="button" className="text-zinc-500">
            $ Sales
          </button>
          <button type="button" className="border-b-2 border-black pb-2 font-medium text-black">
            ↻ Activity
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_2.9fr]">
        <div className="space-y-4">
          <article className="rounded-[8px] border border-venture-line bg-white p-4">
            <p className="text-[20px] font-semibold leading-none">Completed Task</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[28px] font-semibold leading-none">21 Task</p>
              <Button variant="outline" className="h-8 rounded-md border-[#232326] px-3 text-[13px]">
                View All
              </Button>
            </div>
          </article>

          <article className="rounded-[8px] border border-venture-line bg-white p-4">
            <h3 className="text-[20px] font-semibold leading-none">Top Companies</h3>
            <div className="mt-4 space-y-3">
              {topCompanies.map((company, index) => (
                <div key={company.name} className="flex items-center justify-between text-[14px]">
                  <div className="flex items-center gap-3">
                    <span className="w-4">{index + 1}.</span>
                    <span className="grid h-5 w-5 place-items-center rounded-full text-[11px] font-semibold text-white" style={{ backgroundColor: company.color }}>
                      {company.icon}
                    </span>
                    <span>{company.name}</span>
                  </div>
                  <span
                    className={`inline-flex h-6 min-w-[34px] items-center justify-center rounded-full px-2 text-[14px] ${company.change > 0 ? 'bg-[#e7f3eb] text-[#2f8f50]' : 'bg-[#f7e9e9] text-[#bb4b4b]'}`}
                  >
                    {company.change > 0 ? `⌃ ${Math.abs(company.change)}` : `⌄ ${Math.abs(company.change)}`}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>

        <article className="rounded-[8px] border border-venture-line bg-white p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-[20px] font-semibold leading-none">Active Projects</h3>
              <div className="mt-2 flex items-center gap-3">
                <p className="text-[28px] font-semibold leading-none">68 Projects</p>
                <span className="inline-flex h-6 items-center rounded-full bg-[#e7f3eb] px-2 text-[14px] text-[#2f8f50]">↗ 12%</span>
              </div>
              <p className="mt-2 text-[20px] text-zinc-500">This Month</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="h-9 rounded-md border-[#232326] px-4 text-[14px]">
                January, 2023 - December, 2023
              </Button>
              <Button variant="outline" className="h-9 rounded-md border-[#232326] px-4 text-[14px]">
                Month
              </Button>
            </div>
          </div>

          <div className="relative mt-3 h-[300px] rounded-md bg-white">
            <div className="absolute inset-y-3 left-0 z-10 flex flex-col justify-between text-[18px] text-zinc-700">
              <span>100</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="absolute inset-0 left-12">
              <svg viewBox="0 0 760 230" className="h-full w-full">
                <line x1="0" y1="24" x2="760" y2="24" stroke="#d4d4d8" strokeDasharray="4 6" />
                <line x1="0" y1="96" x2="760" y2="96" stroke="#d4d4d8" strokeDasharray="4 6" />
                <line x1="0" y1="168" x2="760" y2="168" stroke="#d4d4d8" strokeDasharray="4 6" />
                <line x1="228" y1="42" x2="228" y2="184" stroke="#8b8b8e" strokeDasharray="4 6" />
                <polyline points={chartPolyline} fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="228" cy="72" r="8" fill="white" stroke="#d4d4d8" strokeWidth="2" />
                <circle cx="228" cy="72" r="3" fill="#111111" />
              </svg>

              <div className="absolute left-[140px] top-[8px] w-[190px] rounded-[8px] border border-venture-line bg-[#f7f7f8] p-3 shadow-sm">
                <p className="text-[13px] text-zinc-600">◷ May 2023</p>
                <div className="mt-2 flex items-center justify-between text-[14px]">
                  <span className="text-zinc-500">Active Projects</span>
                  <span className="font-semibold">51</span>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-12 mt-2 grid grid-cols-12 text-center text-[18px]">
            {months.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[2.3fr_1.6fr]">
        <article className="rounded-[8px] border border-venture-line bg-white p-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-[20px] font-semibold leading-none">Active Companies</h3>
              <div className="mt-2 flex items-center gap-3">
                <p className="text-[28px] font-semibold leading-none">341 Companies</p>
                <span className="inline-flex h-6 items-center rounded-full bg-[#e7f3eb] px-2 text-[14px] text-[#2f8f50]">↗ 12%</span>
              </div>
              <p className="mt-2 text-[20px] text-zinc-500">This Years</p>
            </div>
            <Button variant="outline" className="h-9 rounded-md border-[#232326] px-4 text-[14px]">
              Year
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            {activeCompanies.map(([name, value], index) => (
              <div key={`${name}-${index}`}>
                <div className="mb-1 flex items-center justify-between text-[14px]">
                  <span>{name}</span>
                  <span>{value}</span>
                </div>
                <div className="h-[14px] rounded-full bg-zinc-200">
                  <div className="h-[14px] rounded-full bg-black" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[8px] border border-venture-line bg-white p-4">
          <h3 className="text-[20px] font-semibold leading-none">Completed Project Target This Week</h3>
          <div className="mt-6 grid grid-cols-7 items-end gap-4">
            {weeklyBars.map((height, index) => (
              <div key={months[index]} className="space-y-2 text-center">
                <div className="mx-auto h-[210px] w-4 rounded-full bg-zinc-300">
                  <div className="w-4 rounded-full bg-black" style={{ height: `${height}%` }} />
                </div>
                <p className="text-[18px] text-zinc-700">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </AppShell>
  );
};

export default AnalyticsPage;
