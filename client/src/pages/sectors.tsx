import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DemoModal } from '@/components/demo-modal';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import {
  Factory,
  Settings,
  Zap,
  ShoppingCart,
  Building2,
  Truck,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
  Globe,
  BarChart3
} from 'lucide-react';

// Helper function to get multilingual content
const getMultilingualContent = (content: any, language: string) => {
  if (typeof content === 'string') return content;
  return content?.[language] || content?.tr || '';
};

export default function Sectors() {
  const params = useParams();
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // Get sector key from URL params
  const sectorKey = params.sectorKey || '';

  // Fetch all sectors from API
  const { data: sectorsData, isLoading: sectorsLoading } = useQuery({
    queryKey: ['/api/sectors'],
    staleTime: 5 * 60 * 1000,
  });

  // Fetch specific sector if we have a sector key
  const { data: sectorData, isLoading: sectorLoading } = useQuery({
    queryKey: ['/api/sectors', sectorKey],
    enabled: !!sectorKey,
    staleTime: 5 * 60 * 1000,
  });

  // Static sector mapping for icons
  const sectorIcons = {
    banking: Building2,
    manufacturing: Factory,
    service: Settings,
    energy: Zap,
    retail: ShoppingCart,
    logistics: Truck,
  };

  const isLoading = sectorsLoading || (sectorKey && sectorLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Show sector list if no specific sector is selected
  if (!sectorKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <section className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Sektörel Çözümlerimiz
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her sektörün kendine özgü ihtiyaçları için tasarlanmış dijital dönüşüm çözümleri
            </p>
          </section>

          {/* Sectors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectorsData?.map((sector: any) => {
              const IconComponent = sectorIcons[sector.slug as keyof typeof sectorIcons] || Building2;
              const title = getMultilingualContent(sector.title, language);
              const description = getMultilingualContent(sector.description, language);
              
              return (
                <Card key={sector.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                        <Badge variant="secondary" className="mt-1">
                          {sector.slug}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {description}
                    </p>
                    <Link href={`/sectors/${sector.slug}`}>
                      <Button className="w-full group-hover:bg-primary/90 transition-colors">
                        Detayları İncele
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Show specific sector details
  if (!sectorData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Sektör bulunamadı</p>
          <Link href="/sectors">
            <Button className="mt-4">Sektörlere Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = sectorIcons[sectorKey as keyof typeof sectorIcons] || Building2;
  const title = getMultilingualContent(sectorData.title, language);
  const description = getMultilingualContent(sectorData.description, language);
  const solutions = getMultilingualContent(sectorData.solutions, language);
  const benefits = getMultilingualContent(sectorData.benefits, language);
  const successStories = getMultilingualContent(sectorData.successStories, language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Link href="/sectors">
              <Button variant="ghost" className="mb-6 text-white hover:bg-white/20">
                ← Tüm Sektörler
              </Button>
            </Link>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/20 rounded-xl">
                <IconComponent className="h-12 w-12" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold">{title}</h1>
            </div>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      {solutions && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Çözümlerimiz</h2>
              <p className="text-xl text-gray-600">Sektörünüze özel çözümler</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: solutions.replace(/\n/g, '<br>') }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {benefits && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Faydalar</h2>
              <p className="text-xl text-gray-600">Elde edeceğiniz avantajlar</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: benefits.replace(/\n/g, '<br>') }} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Stories Section */}
      {successStories && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Başarı Hikayeleri</h2>
              <p className="text-xl text-gray-600">Sektörünüzden müşterilerimizin başarı hikayeleri</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="border-gray-100">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: successStories.replace(/\n/g, '<br>') }} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Integrations Section */}
      {sectorData.integrations && sectorData.integrations.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Entegrasyonlar</h2>
              <p className="text-xl text-gray-600">Mevcut sistemlerinizle uyumlu çözümler</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectorData.integrations.map((integration: any, index: number) => (
                <Card key={index} className="border-gray-100">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {getMultilingualContent(integration.name, language)}
                    </h4>
                    <p className="text-gray-600">
                      {getMultilingualContent(integration.description, language)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {title} Sektöründe Dijital Dönüşümünüzü Başlatın
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Sektörel deneyimimiz ve uzmanlığımızla işletmenizi geleceğe hazırlayın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Sektörel Demo Talep Et
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">Uzman Görüşmesi</Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}