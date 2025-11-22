import { LoginForm } from '../features/auth/components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-fondo px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <div>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-texto">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa tus credenciales para acceder
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
