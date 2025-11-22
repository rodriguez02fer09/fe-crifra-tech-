import { useState } from 'react';
import { Input } from '../../../../../components/cross/Input';
import { Button } from '../../../../../components/cross/Button';
import { Select } from '../../Select/src/Select';

export const LoginForm = () => {
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
      newErrors.role = 'Debes seleccionar un rol';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', formData);
      alert('Login exitoso (simulado)');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const roleOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'client', label: 'Cliente' },
    { value: 'support', label: 'Soporte' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
      />

      <Select
        id="role"
        name="role"
        label="Rol"
        value={formData.role}
        onChange={handleChange}
        options={roleOptions}
        placeholder="Selecciona un rol"
        error={errors.role}
      />

      <div>
        <Button type="submit">
          Iniciar Sesión
        </Button>
      </div>
    </form>
  );
};
