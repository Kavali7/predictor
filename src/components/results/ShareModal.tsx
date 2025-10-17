import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ClipboardDocumentCheckIcon, ClipboardDocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/cn';

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
  title?: string;
  description?: string;
  hasCopied: boolean;
  onCopy: () => Promise<void>;
}

const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    href: (url: string, text: string) => `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
  },
  {
    label: 'Messenger',
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: 'X (Twitter)',
    href: (url: string, text: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    label: 'LinkedIn',
    href: (url: string, text: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
  },
];

export default function ShareModal({ open, onClose, shareUrl, title, description, hasCopied, onCopy }: ShareModalProps) {
  const shareText = description ?? 'Découvrez notre lecture de couple Aa Predictor.';
  const mailto = `mailto:?subject=${encodeURIComponent('Lecture de couple Aa Predictor')}&body=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;

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
              <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-3xl border border-primary/20 bg-white/95 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Dialog.Title className="text-lg font-semibold text-slate-900">{title ?? 'Partager cette lecture'}</Dialog.Title>
                    <Dialog.Description className="text-sm text-muted">
                      Diffusez votre expérience en un clic. Vos liens contiennent les bonnes métadonnées pour un aperçu attractif.
                    </Dialog.Description>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:text-primary"
                    aria-label="Fermer la fenêtre de partage"
                  >
                    <XMarkIcon className="h-4 w-4" aria-hidden />
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Lien de partage</p>
                    <p className="mt-1 truncate font-mono text-xs text-slate-500">{shareUrl}</p>
                    <button
                      type="button"
                      onClick={onCopy}
                      className={cn(
                        'mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-primary transition hover:border-primary/40',
                      )}
                    >
                      {hasCopied ? (
                        <>
                          <ClipboardDocumentCheckIcon className="h-4 w-4" aria-hidden />
                          Copié !
                        </>
                      ) : (
                        <>
                          <ClipboardDocumentIcon className="h-4 w-4" aria-hidden />
                          Copier le lien
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Diffuser sur les réseaux</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.label}
                          target="_blank"
                          rel="noopener noreferrer"
                          href={social.href(shareUrl, shareText)}
                          className="rounded-2xl border border-primary/10 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
                        >
                          {social.label}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm text-accent shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent/70">Envoyer par email</p>
                    <p className="mt-1 text-accent/80">Partagez directement cette lecture avec un proche via votre messagerie.</p>
                    <a
                      href={mailto}
                      className="mt-3 inline-flex items-center rounded-full border border-accent/40 bg-white px-4 py-2 text-xs font-semibold text-accent transition hover:-translate-y-0.5 hover:border-accent hover:text-accent/90"
                    >
                      Ouvrir ma messagerie
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
