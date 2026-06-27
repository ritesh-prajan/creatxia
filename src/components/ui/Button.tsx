import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  let baseStyles = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-300 rounded-none focus:outline-none tracking-wide';
  
  let variantStyles = '';
  if (variant === 'primary') {
    variantStyles = 'bg-orange-accent text-white hover:bg-navy hover:text-white border border-transparent';
  } else if (variant === 'outline') {
    variantStyles = 'border border-orange-accent text-orange-accent hover:bg-orange-accent hover:text-white bg-transparent';
  } else if (variant === 'ghost') {
    variantStyles = 'text-white hover:text-orange-accent hover:bg-white/10 bg-transparent';
  }

  let sizeStyles = '';
  if (size === 'sm') {
    sizeStyles = 'px-4 py-2 text-xs uppercase';
  } else if (size === 'md') {
    sizeStyles = 'px-6 py-3.5 text-sm uppercase';
  } else if (size === 'lg') {
    sizeStyles = 'px-10 py-5 text-base uppercase';
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
