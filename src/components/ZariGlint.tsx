import React, { useState, useCallback } from 'react';

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useZariGlint() {
  const [isGlinting, setIsGlinting] = useState(false);

  const triggerGlint = useCallback(() => {
    setIsGlinting(true);
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setIsGlinting(false);
  }, []);

  return { isGlinting, triggerGlint, handleAnimationEnd };
}

// ─── Core Visual Component ────────────────────────────────────────────────────

interface ZariGlintProps {
  isActive: boolean;
  onAnimationEnd?: () => void;
  variant?: 'line' | 'full';
}

export function ZariGlint({ isActive, onAnimationEnd, variant = 'line' }: ZariGlintProps) {
  if (!isActive) return null;

  if (variant === 'full') {
    return (
      <span
        aria-hidden="true"
        className="zari-glint-full"
        onAnimationEnd={onAnimationEnd}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="zari-glint-line"
      onAnimationEnd={onAnimationEnd}
    />
  );
}

// ─── Drop-in CTA Wrapper Component ───────────────────────────────────────────

interface ZariGlintButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'line' | 'full';
}

export function ZariGlintButton({
  children,
  variant = 'line',
  className = '',
  onClick,
  ...props
}: ZariGlintButtonProps) {
  const { isGlinting, triggerGlint, handleAnimationEnd } = useZariGlint();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerGlint();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <ZariGlint
        isActive={isGlinting}
        onAnimationEnd={handleAnimationEnd}
        variant={variant}
      />
      {children}
    </button>
  );
}

