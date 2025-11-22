interface LoginHeaderProps {
  title: string;
  description: string;
}

export const LoginHeader = ({ title, description }: LoginHeaderProps) => {
  return (
    <div>
      <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-texto">
        {title}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
};
