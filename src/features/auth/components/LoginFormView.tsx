import React from 'react';
import { Input } from '../../../components/cross/Input';
import { Button } from '../../../components/cross/Button';
import { Select } from '../../../components/cross/Select/src/Select';

interface LoginFormViewProps {
  formData: {
    email: string;
    password: string;
    role: string;
  };
  errors: {
    email: string;
    password: string;
    role: string;
  };
  isLoading: boolean;
  loginError: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginFormView: React.FC<LoginFormViewProps> = ({
  formData,
  errors,
  isLoading,
  loginError,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {loginError && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{loginError}</p>
        </div>
      )}

      <Input
        id="email"
        name="email"
        type="email"
        label="Correo Electrónico"
        autoComplete="email"
        required
        value={formData.email}
        onChange={onChange}
        error={errors.email}
        placeholder="correo@ejemplo.com"
        disabled={isLoading}
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Contraseña"
        autoComplete="current-password"
        required
        value={formData.password}
        onChange={onChange}
        error={errors.password}
        placeholder="••••••••"
        disabled={isLoading}
      />

      <Select
        id="role"
        name="role"
        label="Rol"
        value={formData.role}
        onChange={onChange}
        error={errors.role}
        placeholder="Selecciona tu rol"
        options={[
          { value: 'admin', label: 'Administrador' },
          { value: 'support', label: 'Soporte' },
          { value: 'client', label: 'Cliente' },
        ]}
        disabled={isLoading}
      />

      <div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
      </div>
    </form>
  );
};
