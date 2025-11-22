import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../store/useAuthStore';
import { useLogin } from '../../../hooks/useLogin';
import { LoginFormView } from '../../../components/LoginFormView';

export const LoginForm = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const { login, loading, error: loginError } = useLogin();

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
    
    if (!validate()) {
      return;
    }

    try {
      const user = await login(formData.email, formData.password, formData.role);
      
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
      console.error('Login error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <LoginFormView
      formData={formData}
      errors={errors}
      isLoading={loading}
      loginError={loginError || ''}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};
