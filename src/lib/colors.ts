export const colors = {
  primary: '#0ea5e9',
  secondary: '#a855f7',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  light: '#f3f4f6',
  dark: '#1f2937',
};

export const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-secondary-500 text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-blue-500 text-white',
  };
  return colorMap[color] || 'bg-gray-500 text-white';
};
