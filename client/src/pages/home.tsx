import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DemoModal } from '@/components/demo-modal';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import {
  ChartGantt,
  FileText,
  Plug,
  TrendingUp,
  Smartphone,
  Shield,
  ArrowRight,
  Calendar,
  Star,
  Users,
  Award,
  Target,
  Building,
  Heart
} from 'lucide-react';
import type { HomepageStatistic } from '@shared/schema';

// Icon mapping for dynamic statistics
const iconMap = {
  TrendingUp,
  Star,
  Calendar,
  Users,
  Award,
  Target,
  Building,
  Heart
};

export default function Home() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const { data: statistics = [], isLoading: isStatsLoading } = useQuery<HomepageStatistic[]>({
    queryKey: ['/api/homepage-statistics'],
  });

  const solutions = [
    {
      icon: ChartGantt,
      title: 'E-Flow BPM',
      description: 'İş süreçlerinizi modelleyin, otomatikleştirin ve optimize edin. Kurumsal süreç yönetimi için kapsamlı çözüm.',
      href: '/solutions/eflow-bpm'
    },
    {
      icon: FileText,
      title: 'E-Flow DMS',
      description: 'Kurumsal belgelerinizi dijital ortamda güvenle saklayın, organize edin ve paylaşın.',
      href: '/solutions/document-management'
    },
    {
      icon: Plug,
      title: 'Entegrasyon Çözümleri',
      description: 'Mevcut sistemlerinizi sorunsuz entegre edin. WhatsApp, LOGO ve diğer platformlar.',
      href: '/solutions/integration'
    },
    {
      icon: TrendingUp,
      title: 'İş Zekası & Raporlama',
      description: 'Verilerinizi analiz edin, öngörüler geliştirin ve stratejik kararlar alın.',
      href: '/solutions/business-intelligence'
    },
    {
      icon: Smartphone,
      title: 'Mobil Çözümler',
      description: 'İş süreçlerinize her yerden erişim. Mobil uygulamalar ve responsive tasarımlar.',
      href: '/solutions/mobile'
    },
    {
      icon: Shield,
      title: 'Güvenlik & Uyumluluk',
      description: 'KVKK, ISO 27001 uyumlu güvenlik çözümleri ile verilerinizi koruyun.',
      href: '/solutions/security'
    }
  ];

  // Using dynamic statistics from database
  const stats = statistics.map(stat => {
    const IconComponent = iconMap[stat.icon as keyof typeof iconMap] || TrendingUp;
    return {
      number: stat.value,
      label: stat.label,
      icon: IconComponent
    };
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Süreçlerinizi <span className="text-primary">Dijitalleştirin</span>, 
                Geleceğe Hazır Olun
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {t('hero.subtitle', language)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/solutions">
                    {t('hero.exploreButton', language)}
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  {t('nav.demoRequest', language)}
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Modern digital workspace" 
                className="rounded-2xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Çözümlerimiz</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İşletmenizin ihtiyaçlarına özel tasarlanmış, kanıtlanmış dijital çözümler
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="hover-lift group border-gray-100">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{solution.title}</h3>
                    <p className="text-gray-600 mb-6">{solution.description}</p>
                    <Link 
                      href={solution.href}
                      className="text-primary font-semibold hover:text-blue-700 transition-colors inline-flex items-center"
                    >
                      Detayları İncele <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Summary */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                alt="Professional team collaboration" 
                className="rounded-2xl shadow-lg" 
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">{t('nav.about', language)}</h2>
              <p className="text-lg text-gray-600 mb-6">
                15 yılı aşkın deneyimimizle, işletmelerin dijital dönüşüm yolculuğunda güvenilir teknoloji partneri olarak yer alıyoruz. 
                Türkiye'nin önde gelen şirketlerine özel çözümler geliştiriyor, iş süreçlerini optimize ediyoruz.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Müşteri memnuniyetini ön planda tutarak, kaliteli yazılım çözümleri ve sürekli destek hizmeti sunuyoruz. 
                Vizyonumuz, Türk işletmelerini küresel rekabette öne çıkarmaktır.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {!isStatsLoading && stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <IconComponent className="w-6 h-6 text-primary mr-2" />
                        <div className="text-3xl font-bold text-primary">{stat.number}</div>
                      </div>
                      <div className="text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <Button asChild variant="outline">
                <Link href="/about">
                  {t('common.learnMore', language)} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>





      {/* Contact CTA */}
      <section className="py-20 gradient-cta text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Çözümlerimizle Tanışmak İster Misiniz?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Uzmanlarımızla görüşerek işletmeniz için en uygun çözümü belirleyin. 
            Ücretsiz demo ve danışmanlık hizmeti alın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsDemoModalOpen(true)}
            >
              <Calendar className="w-5 h-5 mr-2" />
              {t('nav.demoRequest', language)}
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">
                İletişime Geç
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
