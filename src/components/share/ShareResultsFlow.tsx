import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import {
  ShareIcon,
  ClipboardDocumentIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';
import ShareModal from '../results/ShareModal';
import type { CoupleResults } from '../../hooks/useCoupleResults';
import { createShareLink } from '../../lib/api/numerologyClient';

export interface ShareResultsFlowProps {
  score: number;
  archetype: string;
  shareUrl: string;
  results?: CoupleResults | null;
  onTrack?: (channel: string) => void;
  className?: string;
}

const SHARE_CHANNELS = [
  { id: 'web', label: 'Partager (Web Share)', icon: DevicePhoneMobileIcon },
  { id: 'whatsapp', label: 'WhatsApp', icon: ShareIcon },
  { id: 'messenger', label: 'Messenger', icon: PaperAirplaneIcon },
  { id: 'email', label: 'Email', icon: EnvelopeIcon },
  { id: 'copy', label: 'Copier le lien', icon: ClipboardDocumentIcon },
] as const;

type ShareChannel = (typeof SHARE_CHANNELS)[number]['id'] | 'modal';

export default function ShareResultsFlow({
  score,
  archetype,
  shareUrl,
  results,
  onTrack,
  className,
}: ShareResultsFlowProps) {
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCopied, setModalCopied] = useState(false);
  const [isGeneratingShare, setIsGeneratingShare] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  const [currentShareUrl, setCurrentShareUrl] = useState(shareUrl);
  const shareCacheRef = useRef<Map<ShareChannel, { url: string; slug: string; expiresAt: string }>>(new Map());

  const description = useMemo(() => `Score ${score} / 100 - ${archetype}`, [score, archetype]);

  const resultSignature = useMemo(() => {
    if (!results) return 'no-results';
    return `${results.partnerA.number}-${results.partnerB.number}-${results.couple.number}-${Math.round(results.score)}`;
  }, [results]);

  useEffect(() => {
    shareCacheRef.current.clear();
    setCurrentShareUrl(shareUrl);
    setShareError(null);
  }, [shareUrl, resultSignature]);

  const handleShare = async (channel: ShareChannel) => {
    const urlToShare = await ensureShareUrl(channel);
    onTrack?.(channel);

    if (channel === 'web' && navigator.share) {
      try {
        await navigator.share({
          title: 'Lecture numérologique',
          text: description,
          url: urlToShare,
        });
        setSnackbar('Partage envoyé !');
      } catch (error) {
        console.warn('web-share-error', error);
        setSnackbar('Partage annulé.');
      }
      return;
    }

    if (channel === 'copy') {
      try {
        await navigator.clipboard.writeText(urlToShare);
        setSnackbar('Lien copié dans le presse-papier.');
      } catch (error) {
        console.warn('copy-error', error);
        setSnackbar('Impossible de copier le lien.');
      }
      return;
    }

    const targets: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${description}\n${urlToShare}`)}`,
      messenger: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`,
      email: `mailto:?subject=Lecture de couple Aa Predictor&body=${encodeURIComponent(`${description}\n${urlToShare}`)}`,
    };

    const target = targets[channel];
    if (target) {
      window.open(target, '_blank', 'noopener');
      setSnackbar('Partage ouvert dans un nouvel onglet.');
    }
  };

  return (
    <aside className={`space-y-4 rounded-3xl border border-primary/15 bg-white/90 p-6 shadow-lg ${className ?? ''}`}>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Partager l&apos;expérience</p>
        <h3 className="text-lg font-semibold text-slate-900">Diffusez votre lecture</h3>
        <p className="text-sm text-muted">
          Score {score} / 100 - {archetype}
        </p>
      </header>

      {shareError && <p className="text-xs text-red-500">{shareError}</p>}

      <div className="grid gap-3 sm:grid-cols-2">
        {SHARE_CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => handleShare(channel.id)}
              disabled={isGeneratingShare}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Icon className="h-5 w-5" aria-hidden />
              {channel.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={async () => {
            setModalCopied(false);
            setModalOpen(true);
            onTrack?.('modal');
            await ensureShareUrl('modal');
          }}
          disabled={isGeneratingShare}
          className="sm:col-span-2 flex items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <ShareIcon className="h-5 w-5" />
          Options avancées
        </button>
      </div>

      <Transition
        show={!!snackbar}
        as={Fragment}
        enter="transform transition duration-200"
        enterFrom="translate-y-2 opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-lg">
          {snackbar}
        </div>
      </Transition>

      <ShareModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        shareUrl={currentShareUrl}
        title="Partager votre lecture"
        description={description}
        hasCopied={modalCopied}
        onCopy={async () => {
          const url = await ensureShareUrl('modal');
          try {
            await navigator.clipboard.writeText(url);
            setModalCopied(true);
            setSnackbar('Lien copié dans le presse-papier.');
            window.setTimeout(() => setModalCopied(false), 1500);
          } catch (error) {
            console.warn('copy-error', error);
            setSnackbar('Impossible de copier le lien.');
            setModalCopied(false);
          }
        }}
      />
    </aside>
  );

  async function ensureShareUrl(channel: ShareChannel) {
    if (!results?.raw) {
      setCurrentShareUrl(shareUrl);
      return shareUrl;
    }

    const cached = shareCacheRef.current.get(channel);
    if (cached) {
      setCurrentShareUrl(cached.url);
      setShareError(null);
      return cached.url;
    }

    try {
      setIsGeneratingShare(true);
      const payload = await createShareLink({
        results: results.raw,
        metadata: { channel },
      });
      const cacheValue = { url: payload.url, slug: payload.slug, expiresAt: payload.expiresAt };
      shareCacheRef.current.set(channel, cacheValue);
      setCurrentShareUrl(payload.url);
      setShareError(null);
      return payload.url;
    } catch (error) {
      console.warn('share-link-error', error);
      setShareError('Impossible de générer un permalien. Utilisation du lien par défaut.');
      setCurrentShareUrl(shareUrl);
      return shareUrl;
    } finally {
      setIsGeneratingShare(false);
    }
  }
}
