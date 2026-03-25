import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logoImageSrc = '/Logogram.png';
  const heroImageSrc = '/Group 31.png';
  const googleIconSrc = '/google-icon.svg';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const from = location.state?.from || '/dashboard';

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(form);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#efefef]">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[66%_34%]">
        <aside className="relative hidden bg-venture-navy p-12 text-white lg:flex lg:flex-col">
          <div className="flex items-center gap-3">
            <img src={logoImageSrc} alt="Venture logo" className="h-10 w-10 object-contain" />
            <p className="font-display text-[36.43px] font-semibold tracking-tight">Venture</p>
          </div>

          <div className="mt-12 max-w-xl">
            <p className="font-display text-[34px] font-semibold leading-tight">Sign in to</p>
            <p className="mt-2 text-[24px] font-semibold leading-tight">Lorem Ipsum is simply</p>
            <p className="mt-6 text-[13px] text-zinc-200">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            </p>
          </div>

          <div className="mt-[-150px] flex items-end justify-center">
            <img src={heroImageSrc} alt="Sign in illustration" className="w-full max-w-[580px] object-contain" />
          </div>
        </aside>

        <main className="flex items-center px-5 py-8 sm:px-8 lg:px-10">
          <div className="w-full mt-[80px] max-w-[430px] rounded-2xl bg-transparent p-2 sm:p-4">
            <div className="mb-8 flex items-center gap-3">
              <img src={logoImageSrc} alt="Venture logo" className="h-6 w-6 object-contain" />
              <p className="font-display text-[20px] font-semibold tracking-tight text-venture-ink">Venture</p>
            </div>

            <h1 className="font-display text-[20px] font-semibold leading-tight text-venture-ink">Nice to see you again</h1>

            <form className="mt-8 space-y-4" onSubmit={onSubmit}>
              <label className="flex flex-col gap-2 text-xs font-semibold text-zinc-600">
                <span>Login</span>
                <input
                  placeholder="Email or phone number"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  type="email"
                  required
                  className="h-12 w-full rounded-lg border border-zinc-200 bg-zinc-100 px-4 text-base text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white"
                />
              </label>

              <label className="flex flex-col gap-2 text-xs font-semibold text-zinc-600">
                <span>Password</span>
                <div className="relative">
                  <input
                    placeholder="Enter password"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    type="password"
                    required
                    className="h-12 w-full rounded-lg border border-zinc-200 bg-zinc-100 px-4 pr-12 text-base text-zinc-800 outline-none transition focus:border-zinc-400 focus:bg-white"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M2 12C3.8 7.8 7.4 5 12 5C16.6 5 20.2 7.8 22 12C20.2 16.2 16.6 19 12 19C7.4 19 3.8 16.2 2 12Z" stroke="currentColor" strokeWidth="1.8"/>
                      <circle cx="12" cy="12" r="3" fill="currentColor"/>
                    </svg>
                  </span>
                </div>
              </label>

              <div className="flex items-center justify-between gap-4 pt-1 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-zinc-700">
                  <button
                    type="button"
                    onClick={() => setRememberMe((prev) => !prev)}
                    className={`relative h-5 w-9 rounded-full transition ${rememberMe ? 'bg-zinc-700' : 'bg-zinc-200'}`}
                    aria-label="Toggle remember me"
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${rememberMe ? 'left-4' : 'left-0.5'}`}
                    />
                  </button>
                  <span>Remember me</span>
                </label>
                <button type="button" className="font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </button>
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <button
                type="submit"
                className="mt-1 h-12 w-full rounded-lg bg-venture-navy text-base font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : 'Sign in'}
              </button>
            </form>

            <div className="my-8 h-px bg-zinc-200" />

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-zinc-800 text-sm font-medium text-white transition hover:bg-zinc-700"
            >
              <img src={googleIconSrc} alt="Google" className="h-5 w-5" />
              <span>Or sign in with Google</span>
            </button>

            <p className="mt-6 text-center text-sm text-zinc-600">
              Dont have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign up now
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
