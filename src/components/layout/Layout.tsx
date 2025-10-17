import type { PropsWithChildren, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import PromoBannerSlot from './PromoBannerSlot';
import ScrollProgressBar from './ScrollProgressBar';
import type { AdItem } from '../ads/useRotatingBanner';
import AdBanner from '../ads/AdBanner';

export interface LayoutProps extends PropsWithChildren {
  promoContent?: ReactNode;
  ads?: AdItem[];
}

export default function Layout({ children, promoContent, ads }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-slate-900">
      <ScrollProgressBar />
      <PromoBannerSlot fallback={ads ? <AdBanner items={ads} /> : undefined}>
        {promoContent}
      </PromoBannerSlot>
      <Header />
      <main className="mx-auto w-full max-w-6xl px-6 py-12 space-y-16">{children}</main>
      <Footer />
    </div>
  );
}
