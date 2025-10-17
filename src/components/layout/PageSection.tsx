import type { PropsWithChildren } from 'react';

interface PageSectionProps extends PropsWithChildren {
  id?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function PageSection({ id, className, children, as: Component = 'section' }: PageSectionProps) {
  const baseClasses = 'space-y-6';
  const merged = className ? `${baseClasses} ${className}` : baseClasses;

  return (
    <Component id={id} className={merged}>
      {children}
    </Component>
  );
}
