import clsx from 'clsx';

const Input = ({ label, error, className, ...props }) => {
  return (
    <label className="flex w-full flex-col gap-2 text-sm font-medium text-zinc-700">
      {label ? <span>{label}</span> : null}
      <input
        className={clsx(
          'h-11 w-full rounded-lg border border-venture-line bg-zinc-100 px-3 text-sm text-venture-ink outline-none transition focus:border-zinc-500 focus:bg-white',
          error ? 'border-red-400 focus:border-red-500' : '',
          className
        )}
        {...props}
      />
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
};

export default Input;
