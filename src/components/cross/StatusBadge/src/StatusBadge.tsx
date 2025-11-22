

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    open: 'bg-rechazado/10 text-rechazado',
    in_progress: 'bg-pendiente/10 text-pendiente',
    closed: 'bg-aprobado/10 text-aprobado'
  };
  const labels = {
    open: 'Abierto',
    in_progress: 'En Proceso',
    closed: 'Cerrado'
  };

  const statusKey = status as keyof typeof styles;
  
  return (
    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${styles[statusKey] || 'bg-gray-100 text-gray-800'}`}>
      {labels[statusKey] || status}
    </span>
  );
};
