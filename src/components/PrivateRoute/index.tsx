import { Navigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isUnauthenticated, useSession } from '../../hooks/useSession';

// A sessão mora num cookie httpOnly que o JS não lê: quem diz se há sessão é o
// BFF (GET /bff/session).
export function PrivateRoute() {
  const { t } = useTranslation();
  const { isPending, error } = useSession();

  if (isPending) {
    return (
      <div className="p-10 text-slate-500 font-bold">{t('common.loading')}</div>
    );
  }

  if (isUnauthenticated(error)) {
    return <Navigate to="/login" replace />;
  }

  // BFF fora do ar não é "deslogado": avisar em vez de mandar para o login.
  if (error) {
    return (
      <div className="p-10 text-red-500 font-bold">
        {t('common.serverError')}
      </div>
    );
  }

  return <Outlet />;
}
