import { useState } from 'react';

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-texto">
          Correo Electrónico
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className={`block w-full rounded-md border-0 py-1.5 text-texto shadow-sm ring-1 ring-inset ${
              errors.email ? 'ring-rechazado focus:ring-rechazado' : 'ring-gray-300 focus:ring-principal'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {errors.email && <p className="mt-2 text-sm text-rechazado">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-texto">
          Contraseña
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className={`block w-full rounded-md border-0 py-1.5 text-texto shadow-sm ring-1 ring-inset ${
              errors.password ? 'ring-rechazado focus:ring-rechazado' : 'ring-gray-300 focus:ring-principal'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          />
          {errors.password && <p className="mt-2 text-sm text-rechazado">{errors.password}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-texto">
          Rol
        </label>
        <div className="mt-1">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`block w-full rounded-md border-0 py-1.5 text-texto shadow-sm ring-1 ring-inset ${
              errors.role ? 'ring-rechazado focus:ring-rechazado' : 'ring-gray-300 focus:ring-principal'
            } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Administrador</option>
            <option value="client">Cliente</option>
            <option value="support">Soporte</option>
          </select>
          {errors.role && <p className="mt-2 text-sm text-rechazado">{errors.role}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-principal px-3 py-1.5 text-sm font-semibold leading-6 text-secundario shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-principal transition-colors duration-200"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};
