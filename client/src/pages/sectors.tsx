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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sectorsData?.map((sector: any) => {
              const IconComponent = sectorIcons[sector.sectorKey as keyof typeof sectorIcons] || Building2;
              const title = getMultilingualContent(sector.title, language);
              const description = getMultilingualContent(sector.description, language);
              
              return (
                <Card key={sector.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                        <IconComponent className="h-10 w-10 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                          %{sector.efficiencyRate} Verimlilik
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed">
                      {description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <TrendingUp className="h-4 w-4" />
                        <span>Kanıtlanmış Sonuçlar</span>
                      </div>
                      <Link href={`/sectors/${sector.sectorKey}`}>
                        <Button className="group-hover:bg-primary/90 transition-colors">
                          Detayları İncele
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
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
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <Link href="/sectors">
              <Button variant="ghost" className="mb-8 text-white hover:bg-white/20 border border-white/30">
                ← Tüm Sektörler
              </Button>
            </Link>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
              <div className="p-6 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                <IconComponent className="h-16 w-16" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <Badge className="bg-white/20 text-white border-white/30 text-lg px-4 py-2">
                    %{sectorData.efficiencyRate} Verimlilik Artışı
                  </Badge>
                  <div className="flex items-center gap-2 text-white/90">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Kanıtlanmış Sonuçlar</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <Settings className="inline-block mr-3 h-8 w-8 text-primary" />
                Çözümlerimiz
              </h2>
              <p className="text-xl text-gray-600">Sektörünüze özel teknoloji çözümleri</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="space-y-4">
                        {solutions.split('\n').filter(line => line.trim()).map((solution: string, index: number) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg mt-1">
                              <CheckCircle className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-gray-700">{solution.replace('•', '').trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                          <Globe className="h-16 w-16 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Entegre Çözümler</h3>
                        <p className="text-gray-600">Mevcut sistemlerinizle uyumlu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {benefits && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <TrendingUp className="inline-block mr-3 h-8 w-8 text-green-600" />
                Faydalar
              </h2>
              <p className="text-xl text-gray-600">Elde edeceğiniz ölçülebilir avantajlar</p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.split('\n').filter(line => line.trim()).map((benefit: string, index: number) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-gray-700 font-medium">{benefit.replace('•', '').trim()}</p>
                    </CardContent>
                  </Card>
                ))}
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
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                <Users className="inline-block mr-3 h-8 w-8 text-blue-600" />
                Başarı Hikayeleri
              </h2>
              <p className="text-xl text-gray-600">Sektörünüzden müşterilerimizin başarı hikayeleri</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-lg text-gray-700 leading-relaxed">
                        {successStories}
                      </div>
                      <div className="mt-6 flex items-center gap-4">
                        <Badge className="bg-blue-600 text-white">
                          %{sectorData.efficiencyRate} Başarı Oranı
                        </Badge>
                        <div className="flex items-center gap-2 text-blue-600">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-medium">Kanıtlanmış Sonuçlar</span>
                        </div>
                      </div>
                    </div>
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
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {title} Sektöründe Dijital Dönüşümünüzü Başlatın
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Sektörel deneyimimiz ve uzmanlığımızla işletmenizi geleceğe hazırlayın. 
              %{sectorData.efficiencyRate} verimlilik artışı garantili çözümler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setIsDemoModalOpen(true)}
                className="bg-white text-primary hover:bg-gray-100 font-semibold text-lg px-8 py-4"
              >
                <Zap className="mr-2 h-5 w-5" />
                Sektörel Demo Talep Et
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 py-4">
                <Link href="/contact">
                  <Users className="mr-2 h-5 w-5" />
                  Uzman Görüşmesi
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">15+ Yıl Deneyim</h4>
                <p className="text-sm opacity-90">Sektörel uzmanlık</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">%{sectorData.efficiencyRate} Başarı Oranı</h4>
                <p className="text-sm opacity-90">Kanıtlanmış sonuçlar</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-semibold mb-2">7/24 Destek</h4>
                <p className="text-sm opacity-90">Kesintisiz hizmet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}