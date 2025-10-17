import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import type { CoupleResults } from '../../hooks/useCoupleResults';
import { generatePdfSummary } from '../../lib/share/generatePdfSummary';
import { cn } from '../../lib/cn';

interface DownloadSummaryButtonProps {
  results: CoupleResults;
  filename?: string;
  className?: string;
}

export default function DownloadSummaryButton({ results, filename = 'lecture-numerologie.pdf', className }: DownloadSummaryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      await generatePdfSummary(results, { filename });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
    >
      <ArrowDownTrayIcon className="h-4 w-4" aria-hidden />
      {isLoading ? 'Préparation...' : 'Télécharger en PDF'}
    </button>
  );
}
