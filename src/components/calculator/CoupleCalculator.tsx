import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/outline';
import FloatingLabelField from './FloatingLabelField';
import { PartnerInput, useCoupleResults } from '../../hooks/useCoupleResults';
import { cn } from '../../lib/cn';

const partnerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'Minimum 2 caractères')
    .max(40, 'Maximum 40 caractères')
    .regex(/^[A-Za-zÀ-ÿ' -]+$/, 'Utilisez uniquement des lettres et tirets'),
  lastName: z
    .string()
    .trim()
    .min(2, 'Minimum 2 caractères')
    .max(40, 'Maximum 40 caractères')
    .regex(/^[A-Za-zÀ-ÿ' -]+$/, 'Utilisez uniquement des lettres et tirets'),
  date: z
    .string()
    .min(1, 'Date requise')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Utilisez le format AAAA-MM-JJ'),
});

const calculatorSchema = z.object({
  partnerA: partnerSchema,
  partnerB: partnerSchema,
});

export type CoupleCalculatorValues = z.infer<typeof calculatorSchema>;

const defaultValues: CoupleCalculatorValues = {
  partnerA: { firstName: 'Alice', lastName: 'Durand', date: '1990-07-15' },
  partnerB: { firstName: 'Bob', lastName: 'Martin', date: '1992-03-02' },
};

export default function CoupleCalculator() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lastShared, setLastShared] = useState<{ partnerA: PartnerInput; partnerB: PartnerInput } | null>(null);

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    watch,
    setValue,
    trigger,
  } = useForm<CoupleCalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const partnerA = watch('partnerA');
  const partnerB = watch('partnerB');
  const results = useCoupleResults(partnerA, partnerB);

  const onSubmit = async (values: CoupleCalculatorValues) => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    setLastShared({
      partnerA: values.partnerA,
      partnerB: values.partnerB,
    });
    setDialogOpen(true);
  };

  const swapPartners = async () => {
    const currentA = watch('partnerA');
    const currentB = watch('partnerB');
    setValue('partnerA', currentB, { shouldDirty: true, shouldValidate: true });
    setValue('partnerB', currentA, { shouldDirty: true, shouldValidate: true });
    await trigger();
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)]">
      <form
        className="space-y-6 rounded-2xl border border-slate-200/70 bg-surface px-6 py-8 shadow-sm"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Calculateur rapide</p>
          <h3 className="text-2xl font-semibold text-slate-900">Préparez votre lecture de couple</h3>
          <p className="text-sm leading-relaxed text-muted">
            Saisissez vos informations pour obtenir une interprétation instantanée, ajustée en temps réel grâce à la
            numérologie personnelle et de duo.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <fieldset className="space-y-4 rounded-xl border border-slate-200/80 bg-white/70 p-4 shadow-sm">
            <legend className="px-2 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Partenaire 1
            </legend>
            <FloatingLabelField
              label="Prénom"
              autoComplete="given-name"
              {...register('partnerA.firstName')}
              error={errors.partnerA?.firstName?.message}
            />
            <FloatingLabelField
              label="Nom"
              autoComplete="family-name"
              {...register('partnerA.lastName')}
              error={errors.partnerA?.lastName?.message}
            />
            <FloatingLabelField
              label="Date de naissance"
              type="date"
              max={format(new Date(), 'yyyy-MM-dd')}
              {...register('partnerA.date')}
              error={errors.partnerA?.date?.message}
            />
          </fieldset>

          <fieldset className="space-y-4 rounded-xl border border-slate-200/80 bg-white/70 p-4 shadow-sm">
            <legend className="px-2 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Partenaire 2
            </legend>
            <FloatingLabelField
              label="Prénom"
              autoComplete="given-name"
              {...register('partnerB.firstName')}
              error={errors.partnerB?.firstName?.message}
            />
            <FloatingLabelField
              label="Nom"
              autoComplete="family-name"
              {...register('partnerB.lastName')}
              error={errors.partnerB?.lastName?.message}
            />
            <FloatingLabelField
              label="Date de naissance"
              type="date"
              max={format(new Date(), 'yyyy-MM-dd')}
              {...register('partnerB.date')}
              error={errors.partnerB?.date?.message}
            />
          </fieldset>
        </section>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={swapPartners}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm transition hover:border-primary/30 hover:text-primary/90"
          >
            <ArrowPathIcon className="h-4 w-4" aria-hidden />
            Inverser les partenaires
          </button>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="inline-flex h-2 w-2 rounded-full bg-primary/70" />
            Calcul en direct à chaque frappe
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={cn(
              'inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(91,33,182,0.65)] transition',
              (!isValid || isSubmitting) && 'cursor-not-allowed opacity-70',
              isValid && !isSubmitting && 'hover:-translate-y-0.5 hover:shadow-[0_22px_55px_-20px_rgba(91,33,182,0.75)]',
            )}
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" aria-hidden />
                Calcul en cours...
              </>
            ) : (
              <>
                <SparklesIcon className="h-4 w-4" aria-hidden />
                Comparer nos chiffres
              </>
            )}
          </button>
        </div>

        <TipCallout />
      </form>

      <aside className="space-y-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-white to-secondary/10 p-6 shadow-lg">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Résultats en direct</p>
          <h3 className="text-xl font-semibold text-slate-900">Votre alchimie</h3>
          <p className="text-sm text-muted">
            Les interprétations se mettent à jour en direct selon les informations saisies. Ajustez, partagez, vibrez.
          </p>
        </header>
        <div className="space-y-4" aria-live="polite">
          {results ? (
            <ResultGrid results={results} />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 px-5 py-8 text-center text-sm text-muted">
              Complétez les informations des deux partenaires pour révéler la dynamique inédite de votre duo.
            </div>
          )}
        </div>
        <div className="rounded-xl bg-white/70 p-4 text-xs leading-relaxed text-muted shadow-inner">
          Dernière mise à jour calculée {format(new Date(), 'dd MMMM yyyy')}.
        </div>
      </aside>

      <ShareDialog open={dialogOpen} onClose={() => setDialogOpen(false)} lastShared={lastShared} />
    </div>
  );
}

function TipCallout() {
  return (
    <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-4 text-sm text-secondary">
      <p className="font-semibold">Conseil</p>
      <p className="mt-1 text-secondary/80">
        Invitez votre partenaire à compléter sa partie pour des résultats encore plus précis. Le rapport peut ensuite
        être exporté et partagé en un clic.
      </p>
    </div>
  );
}

interface ResultGridProps {
  results: ReturnType<typeof useCoupleResults>;
}

function ResultGrid({ results }: ResultGridProps) {
  if (!results) return null;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <ResultCard
          title="Partenaire 1"
          badge={`${results.partnerA.number}`}
          tone="primary"
          subtitle={results.partnerA.title}
          description={results.partnerA.summary}
        />
        <ResultCard
          title="Partenaire 2"
          badge={`${results.partnerB.number}`}
          tone="secondary"
          subtitle={results.partnerB.title}
          description={results.partnerB.summary}
        />
      </div>
      <ResultCard
        title="Couple"
        badge={`${results.couple.number}`}
        tone="accent"
        subtitle={`${results.couple.archetype}`}
        description={`${results.couple.dynamic} Score ${results.score} / 100`}
        emphasized
      />
    </div>
  );
}

interface ResultCardProps {
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  tone: 'primary' | 'secondary' | 'accent';
  emphasized?: boolean;
}

function ResultCard({ title, badge, subtitle, description, tone, emphasized }: ResultCardProps) {
  const toneClasses: Record<ResultCardProps['tone'], string> = {
    primary: 'border-primary/30 bg-primary/5 text-primary',
    secondary: 'border-secondary/30 bg-secondary/5 text-secondary',
    accent: 'border-accent/30 bg-accent/5 text-accent',
  };
  return (
    <article
      className={cn(
        'rounded-2xl border px-4 py-4 shadow-sm transition hover:shadow-md',
        toneClasses[tone],
        emphasized && 'sm:col-span-2',
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{title}</p>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-slate-900">{badge}</span>
        <span className="text-sm font-semibold text-slate-800">{subtitle}</span>
      </div>
      <p className="mt-2 text-sm text-slate-700">{description}</p>
    </article>
  );
}

interface ShareDialogProps {
  open: boolean;
  onClose: () => void;
  lastShared: { partnerA: PartnerInput; partnerB: PartnerInput } | null;
}

function ShareDialog({ open, onClose, lastShared }: ShareDialogProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl border border-primary/20 bg-white p-6 shadow-2xl">
                <div className="space-y-4 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <SparklesIcon className="h-6 w-6" aria-hidden />
                  </div>
                  <Dialog.Title className="text-lg font-semibold text-slate-900">Lecture prête à partager</Dialog.Title>
                  <Dialog.Description className="text-sm text-muted">
                    Vous pouvez maintenant exporter, sauvegarder ou envoyer votre lecture pour continuer la discussion
                    avec vos proches.
                  </Dialog.Description>
                  {lastShared && (
                    <dl className="grid grid-cols-2 gap-2 text-xs text-muted">
                      <div>
                        <dt className="font-semibold uppercase tracking-[0.24em] text-slate-500">Partenaire 1</dt>
                        <dd>{lastShared.partnerA.firstName} {lastShared.partnerA.lastName}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold uppercase tracking-[0.24em] text-slate-500">Partenaire 2</dt>
                        <dd>{lastShared.partnerB.firstName} {lastShared.partnerB.lastName}</dd>
                      </div>
                    </dl>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
                  >
                    Continuer l expérience
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
