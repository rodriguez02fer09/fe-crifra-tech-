import { useState } from 'react';
import { useAuthStore } from '../../../../store/useAuthStore';

import { ticketService } from '../../../../services/ticketService'; 
import { Button } from '../../../../components/cross/Button';
import { Input } from '../../../../components/cross/Input';
import { Select } from '../../../../components/cross/Select';
import { Toast } from '../../../../components/ui/Toast';
import { useTicketStore } from '../../../../store/useTicketStore';

export const CreateTicketForm = () => {
  const user = useAuthStore((state) => state.user);
  const addTicket = useTicketStore((state) => state.addTicket);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '' as 'baja' | 'media' | 'alta' | '',
    category: '' as 'tecnico' | 'pagos' | 'consultas' | '',
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' } | null>(null);

  const validate = () => {
    const newErrors = { title: '', description: '', priority: '', category: '' };
    let isValid = true;

    if (!formData.title) {
      newErrors.title = 'El título es obligatorio';
      isValid = false;
    } else if (formData.title.length < 5) {
      newErrors.title = 'El título debe tener al menos 5 caracteres';
      isValid = false;
    }

    if (!formData.description) {
      newErrors.description = 'La descripción es obligatoria';
      isValid = false;
    } else if (formData.description.length < 20) {
      newErrors.description = 'La descripción debe tener al menos 20 caracteres';
      isValid = false;
    }

    if (!formData.priority) {
      newErrors.priority = 'Debe seleccionar la prioridad';
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = 'Debe seleccionar la categoría';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      setToast({ message: '⚠️ Por favor, complete todos los campos requeridos correctamente.', type: 'warning' });
      return;
    }

    if (!user) return;

    setIsLoading(true);

    try {
      const newTicket = await ticketService.createTicket({
        title: formData.title,
        description: formData.description,
        priority: formData.priority as 'baja' | 'media' | 'alta',
        category: formData.category as 'tecnico' | 'pagos' | 'consultas',
        userId: user.id,
      });

      addTicket(newTicket);
      setToast({ message: '✅ Solicitud creada exitosamente.', type: 'success' });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        priority: '',
        category: '',
      });
    } catch (error) {
      console.log(error);
      setToast({ message: '❌ Error al crear la solicitud.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <h2 className="mb-4 text-lg font-medium text-texto">Nueva Solicitud</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="title"
          name="title"
          label="Título"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          placeholder="Resumen del problema"
          disabled={isLoading}
        />

        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:border-principal focus:outline-none focus:ring-1 focus:ring-principal sm:text-sm ${
              errors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            value={formData.description}
            onChange={handleChange}
            placeholder="Detalle su solicitud..."
            disabled={isLoading}
          />
          {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            id="priority"
            name="priority"
            label="Prioridad"
            value={formData.priority}
            onChange={handleChange}
            error={errors.priority}
            options={[
              { value: 'baja', label: 'Baja' },
              { value: 'media', label: 'Media' },
              { value: 'alta', label: 'Alta' },
            ]}
            placeholder="Seleccione prioridad"
            disabled={isLoading}
          />

          <Select
            id="category"
            name="category"
            label="Categoría"
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
            options={[
              { value: 'tecnico', label: 'Soporte Técnico' },
              { value: 'pagos', label: 'Pagos y Facturación' },
              { value: 'consultas', label: 'Consultas Generales' },
            ]}
            placeholder="Seleccione categoría"
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Enviando...' : 'Crear Solicitud'}
          </Button>
        </div>
      </form>
    </div>
  );
};
