import { useMemo } from 'react';
import AppShell from '../../shared/layout/AppShell';
import Button from '../../shared/ui/Button';
import Tag from '../../shared/ui/Tag';

const people = [
  { name: 'Robert Fox', email: 'robertfox@example.com', phone: '(671) 555-0110', category: 'employee', location: 'Austin', gender: 'Male' },
  { name: 'Cody Fisher', email: 'codyfisher@example.com', phone: '(505) 555-0125', category: 'customers', location: 'Orange', gender: 'Male' },
  { name: 'Albert Flores', email: 'albertflores@example.com', phone: '(704) 555-0127', category: 'customers', location: 'Pembroke', gender: 'Female' },
  { name: 'Arlene McCoy', email: 'arleneccoy@example.com', phone: '(219) 555-0114', category: 'partners', location: 'Toledo', gender: 'Female' }
];

const companies = [
  { name: 'Product Hunt', industry: 'Web Design', location: 'New York City', status: 'active' },
  { name: 'Google', industry: 'Search Engine', location: 'New York City', status: 'active' },
  { name: 'Wordpress', industry: 'Web Development', location: 'New York City', status: 'active' },
  { name: 'Tripadvisor', industry: 'Travel Reviews', location: 'Chicago', status: 'lead' },
  { name: 'Slack', industry: 'Communication', location: 'Seattle', status: 'lead' }
];

const bars = [80, 46, 88, 62, 77, 41, 64, 50, 72, 56, 84, 65];

const DashboardPage = () => {
  const actions = useMemo(
    () => (
      <>
        <Button variant="outline">Sort By</Button>
        <Button variant="outline">Filter</Button>
      </>
    ),
    []
  );

  return (
    <AppShell title="Dashboard" actions={actions}>
      <section className="grid gap-4 lg:grid-cols-4">
        <StatCard label="Email Sent" value="1,251 Mail" />
        <StatCard label="Active Company" value="43 Company" />
        <StatCard label="Total Contact" value="162 Contact" />
        <StatCard label="Ongoing Task" value="5 Task" />
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.1fr_2fr]">
        <div className="rounded-card border border-venture-line bg-white p-4">
          <h3 className="font-display text-xl font-semibold">Upcoming Agenda</h3>
          <div className="mt-3 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-lg border border-venture-line p-3">
                <p className="text-xs text-red-500">11:00 - 12:00 Feb {item}, 2019</p>
                <p className="mt-1 font-semibold">Meeting with Client</p>
                <p className="text-xs text-zinc-500">This monthly progress agenda</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-venture-line bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold">Average Email Open Rate</h3>
              <p className="mt-1 text-4xl font-semibold">64,23%</p>
            </div>
            <Tag type="monthly">+12%</Tag>
          </div>
          <div className="mt-4 flex h-44 items-end gap-3">
            {bars.map((height, index) => (
              <div key={index} className="flex-1 rounded-t-md bg-zinc-200" style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="mt-2 grid grid-cols-12 text-xs text-zinc-500">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <span key={month} className="text-center">
                {month}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-card border border-venture-line bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold">People</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Sort By
            </Button>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Phone</th>
                <th className="py-2">Category</th>
                <th className="py-2">Location</th>
                <th className="py-2">Gender</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {people.map((person) => (
                <tr key={person.email} className="border-t border-venture-line">
                  <td className="py-3 font-medium">{person.name}</td>
                  <td className="py-3 underline decoration-zinc-300 decoration-1">{person.email}</td>
                  <td className="py-3 text-zinc-600">{person.phone}</td>
                  <td className="py-3">
                    <Tag type={person.category}>{person.category}</Tag>
                  </td>
                  <td className="py-3 text-zinc-600">{person.location}</td>
                  <td className="py-3 text-zinc-600">{person.gender}</td>
                  <td className="py-3">
                    <Button variant="outline" size="sm">
                      Call
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-card border border-venture-line bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold">Companies</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Sort By
              </Button>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            {companies.map((company) => (
              <div key={company.name} className="grid grid-cols-4 rounded-lg border border-venture-line px-4 py-3 text-sm">
                <span className="font-medium">{company.name}</span>
                <span className="text-zinc-600">{company.industry}</span>
                <span className="text-zinc-600">{company.location}</span>
                <span>
                  <Tag type={company.status}>{company.status}</Tag>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-venture-line bg-white p-4">
          <h3 className="font-display text-xl font-semibold">Company Categories</h3>
          <div className="mx-auto mt-5 h-44 w-44 rounded-full border-[22px] border-zinc-200 border-r-black border-b-zinc-500 border-l-zinc-400" />
          <p className="mt-3 text-center text-sm font-semibold">341 Companies</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li>Agency</li>
            <li>Marketing</li>
            <li>Communication</li>
            <li>Web Development</li>
            <li>Travel</li>
          </ul>
        </div>
      </section>
    </AppShell>
  );
};

const StatCard = ({ label, value }) => (
  <article className="rounded-card border border-venture-line bg-white px-4 py-4">
    <p className="text-sm text-zinc-500">{label}</p>
    <p className="mt-2 font-display text-4xl font-semibold leading-none tracking-tight text-venture-ink">{value}</p>
  </article>
);

export default DashboardPage;
