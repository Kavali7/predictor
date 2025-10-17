import { forwardRef, useId } from 'react';
import { cn } from '../../lib/cn';

export interface FloatingLabelFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const FloatingLabelField = forwardRef<HTMLInputElement, FloatingLabelFieldProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="space-y-1.5">
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            placeholder=" "
            aria-describedby={describedBy}
            aria-invalid={error ? 'true' : 'false'}
            className={cn(
              'peer w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm ring-offset-0 transition focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15',
              error && 'border-red-300 text-red-800 focus:border-red-400 focus:ring-red-100',
              props.disabled && 'cursor-not-allowed bg-slate-100 text-slate-400',
              className,
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute left-4 top-3 origin-[0] truncate text-xs font-semibold uppercase tracking-[0.24em] text-muted transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[0.75rem] peer-placeholder-shown:uppercase peer-placeholder-shown:tracking-[0.2em] peer-placeholder-shown:text-slate-400 peer-focus:-translate-y-3 peer-focus:scale-90 peer-focus:text-primary"
          >
            {label}
          </label>
        </div>
        {helperText && (
          <p id={helperId} className="text-xs text-muted">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} className="text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FloatingLabelField.displayName = 'FloatingLabelField';

export default FloatingLabelField;
