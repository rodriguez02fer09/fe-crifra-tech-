import { LoginHeader } from '../features/auth/components/LoginHeader';
import { AnimatedBackground } from '../components/layout';
import { LoginForm } from '../features/auth/wrapper-components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-2xl">
        <LoginHeader 
          title="Iniciar Sesión" 
          description="Ingresa tus credenciales para acceder" 
        />
        <LoginForm />
      </div>
    </div>
  );
};



