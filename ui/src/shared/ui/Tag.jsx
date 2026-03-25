import clsx from 'clsx';

const palette = {
  weekly: 'bg-chip-yellow text-[#9a7c00]',
  monthly: 'bg-chip-green text-[#2d7b43]',
  personal: 'bg-chip-orange text-[#995e24]',
  business: 'bg-chip-violet text-[#7541a9]',
  product: 'bg-chip-blue text-[#2e58c6]',
  badge: 'bg-chip-yellow text-[#9a7c00]',
  internal: 'bg-chip-orange text-[#995e24]',
  marketing: 'bg-chip-yellow text-[#92731b]',
  urgent: 'bg-chip-red text-[#9f2f2f]',
  report: 'bg-chip-green text-[#2d7b43]',
  document: 'bg-chip-blue text-[#2e58c6]',
  event: 'bg-chip-violet text-[#7541a9]',
  active: 'bg-chip-blue text-[#2e58c6]',
  lead: 'bg-chip-orange text-[#995e24]',
  employee: 'bg-chip-violet text-[#7541a9]',
  customers: 'bg-chip-blue text-[#2e58c6]',
  partners: 'bg-chip-yellow text-[#92731b]'
};

const Tag = ({ children, type = 'weekly' }) => {
  return <span className={clsx('chip', palette[type] || palette.weekly)}>{children}</span>;
};

export default Tag;
