import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../shared/layout/AuthLayout';
import Input from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const from = location.state?.from || '/notes';

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
    <AuthLayout>
      <div className="w-full max-w-[420px] rounded-card bg-white p-7 shadow-panel sm:p-8">
        <p className="font-display text-[40px] font-bold tracking-tight">Venture</p>
        <h1 className="mt-5 font-display text-3xl font-bold text-venture-ink">Nice to see you again</h1>

        <form className="mt-7 space-y-4" onSubmit={onSubmit}>
          <Input
            label="Login"
            placeholder="Email or phone number"
            name="email"
            value={form.email}
            onChange={onChange}
            type="email"
            required
          />
          <Input
            label="Password"
            placeholder="Enter password"
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            required
          />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Sign in
          </Button>
        </form>

        <div className="my-6 h-px bg-venture-line" />

        <p className="text-center text-sm text-zinc-600">
          Do not have an account?{' '}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Sign up now
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
