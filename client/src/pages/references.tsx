import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DemoModal } from '@/components/demo-modal';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import type { ReferencesContent, PartnerLogo, ReferenceProject } from '@shared/schema';
import {
  Building2,
  Factory,
  Settings,
  Zap,
  ShoppingCart,
  ArrowRight,
  Star,
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';

export default function References() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState('all');

  // Fetch dynamic content
  const { data: referencesContent = [] } = useQuery<ReferencesContent[]>({
    queryKey: ["/api/references-content"],
  });

  const { data: partnerLogos = [] } = useQuery<PartnerLogo[]>({
    queryKey: ["/api/partner-logos"],
  });

  const { data: referenceProjects = [] } = useQuery<ReferenceProject[]>({
    queryKey: ["/api/reference-projects"],
  });

  // Get content by section
  const getContentBySection = (section: string) => {
    return referencesContent.find(content => content.section === section);
  };

  const heroContent = getContentBySection('hero');
  const trustedPartnerContent = getContentBySection('trusted_partner');
  const ctaContent = getContentBySection('cta');

  // Use dynamic projects or fallback to empty array
  const references = referenceProjects.filter(project => project.isActive);

  const sectors = {
    all: { label: 'Tüm Sektörler', icon: Building2 },
    manufacturing: { label: 'Üretim', icon: Factory },
    energy: { label: 'Enerji', icon: Zap },
    retail: { label: 'Perakende', icon: ShoppingCart },
    service: { label: 'Hizmet', icon: Settings },
    construction: { label: 'İnşaat', icon: Building2 },
    logistics: { label: 'Lojistik', icon: Settings }
  };

  const filteredReferences = selectedSector === 'all' 
    ? references 
    : references.filter(ref => ref.sector === selectedSector);

  const stats = [
    { number: '100+', label: 'Başarılı Proje', icon: TrendingUp },
    { number: '%95', label: 'Müşteri Memnuniyeti', icon: Star },
    { number: '15+', label: 'Yıl Deneyim', icon: Calendar },
    { number: '50+', label: 'Farklı Sektör', icon: Users }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {heroContent?.title || t('nav.references', language)}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {heroContent?.content || "Türkiye'nin önde gelen şirketleriyle gerçekleştirdiğimiz başarılı projeler ve elde edilen sonuçlar."}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center border-gray-100">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>



      {/* Client Logos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {trustedPartnerContent?.title || "Güvenilen Çözüm Ortağınız"}
            </h2>
            <p className="text-lg text-gray-600">
              {trustedPartnerContent?.content || "Farklı sektörlerden 100+ şirket Algotrom'u tercih ediyor"}
            </p>
          </div>

          <div className="flex justify-center">
            {partnerLogos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
                {partnerLogos.filter(logo => logo.isActive).map((logo) => (
                  <div key={logo.id} className="flex items-center justify-center h-20 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <img
                      src={logo.logoUrl}
                      alt={logo.companyName}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x60/E5E7EB/9CA3AF?text=LOGO';
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-20 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center text-gray-500">
                  <div className="text-sm font-medium">LOGO ALANI</div>
                  <div className="text-xs">Yakında eklenecek</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {ctaContent?.title || "Siz de Başarı Hikayemizin Parçası Olun"}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {ctaContent?.content || "İşletmenizin dijital dönüşüm yolculuğunda yanınızda olalım. Sizin için de başarılı projeler geliştirelim."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsDemoModalOpen(true)}
            >
              {ctaContent?.buttonText || "Proje Danışmanlığı Al"}
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
              <a href="/contact" className="text-white hover:text-primary">İletişime Geç</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section - only show if we have projects */}
      {references.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Başarılı Projelerimiz</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Çeşitli sektörlerden müşterilerimiz için gerçekleştirdiğimiz başarılı projeleri inceleyin
                </p>
                
                {/* Sector Filter */}
                <div className="max-w-xs mx-auto">
                  <Select value={selectedSector} onValueChange={setSelectedSector}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sektör seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(sectors).map(([key, sector]) => (
                        <SelectItem key={key} value={key}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredReferences.map((ref) => (
                  <Card key={ref.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            {ref.logoUrl ? (
                              <img
                                src={ref.logoUrl}
                                alt={ref.company}
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48/E5E7EB/9CA3AF?text=LOGO';
                                }}
                              />
                            ) : (
                              <Building2 className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{ref.company}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {sectors[ref.sector as keyof typeof sectors]?.label || ref.sector}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-lg font-semibold text-primary mb-2">{ref.project}</h4>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{ref.description}</p>

                      {/* Results */}
                      <div className="space-y-2 mb-4">
                        {ref.results?.slice(0, 3).map((result, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-700">
                            <Star className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                            {result}
                          </div>
                        ))}
                      </div>

                      {/* Project Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {ref.year}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {ref.duration}
                        </div>
                      </div>

                      {/* Testimonial */}
                      {ref.testimonial && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700 italic line-clamp-3">
                            "{ref.testimonial}"
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
