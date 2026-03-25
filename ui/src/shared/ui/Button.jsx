import clsx from 'clsx';

const variants = {
  primary: 'bg-black text-white hover:bg-zinc-800',
  outline: 'border border-venture-line bg-white text-venture-ink hover:bg-zinc-50',
  subtle: 'bg-zinc-100 text-venture-ink hover:bg-zinc-200',
  danger: 'bg-red-600 text-white hover:bg-red-700'
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base'
};

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  isLoading = false,
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    className={clsx(
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
      variants[variant],
      sizes[size],
      className
    )}
    disabled={disabled || isLoading}
    {...props}
  >
    {isLoading ? 'Please wait...' : children}
  </button>
);

export default Button;
