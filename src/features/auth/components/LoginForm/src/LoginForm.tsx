import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../../../../components/cross/Input';
import { Button } from '../../../../../components/cross/Button';
import { Select } from '../../Select/src/Select';
import { ticketService } from '../../../../../services/ticketService';
import { useAuthStore } from '../../../../../store/useAuthStore';

export const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validate = () => {
    const newErrors = { email: '', password: '', role: '' };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = 'El rol es obligatorio';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      const user = await ticketService.login(formData.email, formData.password, formData.role);
      
      // Save user to Zustand store (will persist to sessionStorage)
      setUser(user);

      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'support':
          navigate('/support');
          break;
        case 'client':
          navigate('/client');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : 'Error al iniciar sesión'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    
    // Clear login error when user types
    if (loginError) {
      setLoginError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        onChange={handleChange}
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
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
        disabled={isLoading}
      />

      <Select
        id="role"
        name="role"
        label="Rol"
        value={formData.role}
        onChange={handleChange}
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
