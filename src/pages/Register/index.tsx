import { useForm } from 'react-hook-form';
import { useCreateUser } from '../../hooks/useCreateUser';
import { useNavigate } from 'react-router-dom';
import { AuthFooter } from '../../components/AuthFooter';
import { useTranslation } from 'react-i18next';

export function Register() {
  const { t } = useTranslation();
  const { mutate: createUser, isPending } = useCreateUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    createUser(data, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-200">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter">
              {t('register.title')}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {t('register.subtitle')}
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">
                {t('register.name')}
              </label>
              <input
                {...register('name', { required: true })}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 bg-slate-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">
                  {t('register.email')}
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">
                  {t('register.phone')}
                </label>
                <input
                  {...register('phone')}
                  placeholder={t('register.phonePlaceholder')}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1 ml-1">
                {t('register.password')}
              </label>
              <input
                type="password"
                {...register('password', {
                  required: true,
                  minLength: 8,
                  validate: (value) =>
                    (/[A-Z]/.test(value) && /[0-9]/.test(value)) ||
                    t('register.passwordWeak'),
                })}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-indigo-600 bg-slate-50"
              />
              {errors.password && (
                <span className="text-[10px] text-red-500 font-bold ml-1">
                  {t('register.passwordRule')}
                </span>
              )}
            </div>

            <button
              disabled={isPending}
              className="w-full bg-slate-900 text-white p-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 disabled:opacity-50 mt-4"
            >
              {isPending ? t('register.submitting') : t('register.submit')}
            </button>
          </form>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
}
