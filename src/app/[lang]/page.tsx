import { getDictionary } from '@/content';
import { resolveLocale } from '@/lib/site';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { HeroSection } from '@/components/sections/HeroSection';
import { MediaHighlightSection } from '@/components/sections/MediaHighlightSection';
import { OverlapUnder } from '@/components/sections/OverlapUnder';
import { ServicesSection } from '@/components/sections/ServicesSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveLocale(lang);
  const dict = getDictionary(locale);

  return (
    <>
      <HeroSection dict={dict} />
      <AboutSection dict={dict} />
      {/* Atendimento fica por baixo e Na mídia sobe sobre ela; da mídia ao contato a cor de fundo se transforma com a rolagem */}
      <div id="atendimento" className="overlap-stack">
        <OverlapUnder>
          <ServicesSection dict={dict} />
        </OverlapUnder>
        <div className="overlap-over">
          <MediaHighlightSection dict={dict} />
        </div>
        <ContactSection dict={dict} />
      </div>
    </>
  );
}
