import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../shared/layout/AuthLayout';
import Input from '../../shared/ui/Input';
import Button from '../../shared/ui/Button';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-[420px] rounded-card bg-white p-7 shadow-panel sm:p-8">
        <p className="font-display text-[40px] font-bold tracking-tight">Venture</p>
        <h1 className="mt-5 font-display text-3xl font-bold text-venture-ink">Create your account</h1>

        <form className="mt-7 space-y-4" onSubmit={onSubmit}>
          <Input label="Name" placeholder="Full name" name="name" value={form.name} onChange={onChange} required />
          <Input label="Email" placeholder="name@example.com" name="email" value={form.email} onChange={onChange} type="email" required />
          <Input label="Password" placeholder="At least 6 characters" name="password" value={form.password} onChange={onChange} type="password" required />
          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Register
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
