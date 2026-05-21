import { useForm } from 'react-hook-form';

import { useNavigate, Link } from 'react-router-dom';
import { AuthFooter } from '../../components/AuthFooter';
import { useLogin } from '../../hooks/useLogin';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function Login() {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: any) => {
    login(data, {
      onSuccess: (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: response.id,
            name: response.name,
            email: response.email,
          })
        );
        navigate('/dashboard');
      },
      onError: () => {
        alert('E-mail ou senha inválidos.');
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-200">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg min-w-96 w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              Entrar
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Bem-vindo de volta ao Centavo.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">
                E-mail
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 bg-slate-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              disabled={isPending}
              className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50 mt-4"
            >
              {isPending ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Não tem conta?{' '}
            <Link
              to="/register"
              className="text-indigo-600 font-bold hover:underline"
            >
              Criar conta
            </Link>
          </p>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
}
