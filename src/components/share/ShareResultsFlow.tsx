import { Fragment, useMemo, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  ShareIcon,
  ClipboardDocumentIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import ShareModal from "../results/ShareModal";

export interface ShareResultsFlowProps {
  score: number;
  archetype: string;
  shareUrl: string;
  onTrack?: (channel: string) => void;
  className?: string;
}

const SHARE_CHANNELS = [
  { id: "web", label: "Partager (Web Share)", icon: DevicePhoneMobileIcon },
  { id: "whatsapp", label: "WhatsApp", icon: ShareIcon },
  { id: "messenger", label: "Messenger", icon: PaperAirplaneIcon },
  { id: "email", label: "Email", icon: EnvelopeIcon },
  { id: "copy", label: "Copier le lien", icon: ClipboardDocumentIcon },
];

export default function ShareResultsFlow({ score, archetype, shareUrl, onTrack, className }: ShareResultsFlowProps) {
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const description = useMemo(() => `Score ${score} / 100 – ${archetype}`, [score, archetype]);

  const handleShare = async (channel: string) => {
    onTrack?.(channel);
    if (channel === "web" && navigator.share) {
      try {
        await navigator.share({
          title: "Lecture numérologique",
          text: description,
          url: shareUrl,
        });
        setSnackbar("Partage envoyé !");
      } catch (error) {
        console.warn("web-share-error", error);
        setSnackbar("Partage annulé.");
      }
      return;
    }

    if (channel === "copy") {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setSnackbar("Lien copié dans le presse-papier.");
      } catch (error) {
        console.warn("copy-error", error);
        setSnackbar("Impossible de copier le lien.");
      }
      return;
    }

    const map: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${description}\n${shareUrl}`)}`,
      messenger: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=Lecture de couple Aa Predictor&body=${encodeURIComponent(`${description}\n${shareUrl}`)}`,
    };

    const target = map[channel];
    if (target) {
      window.open(target, "_blank", "noopener");
      setSnackbar("Partage ouvert dans un nouvel onglet.");
    }
  };

  return (
    <aside className={`space-y-4 rounded-3xl border border-primary/15 bg-white/90 p-6 shadow-lg ${className ?? ""}`}>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Partager l’expérience</p>
        <h3 className="text-lg font-semibold text-slate-900">Diffusez votre lecture</h3>
        <p className="text-sm text-muted">Score {score} / 100 – {archetype}</p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {SHARE_CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <button
              key={channel.id}
              type="button"
              onClick={() => handleShare(channel.id)}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              <Icon className="h-5 w-5" aria-hidden />
              {channel.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => {
            setModalOpen(true);
            onTrack?.("modal");
          }}
          className="sm:col-span-2 flex items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:bg-primary/20"
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
        shareUrl={shareUrl}
        title="Partager votre lecture"
        description={description}
        hasCopied={false}
        onCopy={async () => {
          await navigator.clipboard.writeText(shareUrl);
          setSnackbar("Lien copié dans le presse-papier.");
        }}
      />
    </aside>
  );
}

