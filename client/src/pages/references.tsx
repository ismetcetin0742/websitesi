import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DemoModal } from '@/components/demo-modal';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
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

  const references = [
    {
      id: 1,
      company: 'ABC Otomotiv San. A.Ş.',
      sector: 'manufacturing',
      logo: 'https://via.placeholder.com/120x60/1E40AF/ffffff?text=ABC',
      project: 'Üretim Süreç Yönetimi',
      description: 'e-Flow BPM ile üretim süreçlerinin dijitalleştirilmesi ve kalite kontrol sistemlerinin entegrasyonu.',
      results: [
        '%40 üretim verimliliği artışı',
        '%60 kalite kontrol süresinde azalma',
        '%30 operasyonel maliyet tasarrufu'
      ],
      duration: '8 ay',
      year: '2023',
      testimonial: 'Algotrom ile çalışmak üretim süreçlerimizi tamamen dönüştürdü. Artık tüm üretim hattımızı gerçek zamanlı izleyebiliyor ve hızlı aksiyonlar alabiliyor.'
    },
    {
      id: 2,
      company: 'XYZ Enerji A.Ş.',
      sector: 'energy',
      logo: 'https://via.placeholder.com/120x60/1E40AF/ffffff?text=XYZ',
      project: 'Akıllı Şebeke Yönetimi',
      description: 'SCADA entegrasyonu ve enerji dağıtım ağının optimize edilmesi için geliştirilmiş çözüm.',
      results: [
        '%25 enerji kaybında azalma',
        '%50 arıza tespit süresinde iyileşme',
        '%35 operasyonel verimlilik artışı'
      ],
      duration: '12 ay',
      year: '2023',
      testimonial: 'Enerji dağıtım ağımızın dijitalleşmesi ile hem müşteri memnuniyeti hem de operasyonel verimliliğimiz önemli ölçüde arttı.'
    },
    {
      id: 3,
      company: 'DEF Perakende Mağazacılık',
      sector: 'retail',
      logo: 'https://via.placeholder.com/120x60/1E40AF/ffffff?text=DEF',
      project: 'Omnichannel E-ticaret Platformu',
      description: 'Online ve offline satış kanallarının entegrasyonu ve müşteri deneyimi optimizasyonu.',
      results: [
        '%60 online satış artışı',
        '%45 müşteri memnuniyeti iyileşmesi',
        '%50 stok devir hızı artışı'
      ],
      duration: '6 ay',
      year: '2022',
      testimonial: 'Omnichannel platformumuz sayesinde müşterilerimize tutarlı bir deneyim sunabiliyoruz. Satışlarımız da bu dönemde rekor kırdı.'
    },
    {
      id: 4,
      company: 'GHI Hizmet A.Ş.',
      sector: 'service',
      logo: 'https://via.placeholder.com/120x60/1E40AF/ffffff?text=GHI',
      project: 'Müşteri Hizmetleri Platformu',
      description: 'CRM entegrasyonu ve müşteri hizmetleri süreçlerinin otomatikleştirilmesi.',
      results: [
        '%70 müşteri memnuniyeti artışı',
        '%50 çözüm süresinde azalma',
        '%40 operasyonel verimlilik iyileşmesi'
      ],
      duration: '4 ay',
      year: '2022',
      testimonial: 'Müşteri hizmetleri süreçlerimiz artık çok daha hızlı ve etkili. Müşteri geri bildirimlerinde büyük iyileşme gözlemliyoruz.'
    },
    {
      id: 5,
      company: 'JKL İnşaat ve Gayrimenkul',
      sector: 'construction',
      logo: 'https://via.placeholder.com/120x60/1E40AF/ffffff?text=JKL',
      project: 'Proje Yönetim Sistemi',
      description: 'İnşaat projelerinin planlama, takip ve raporlama süreçlerinin dijitalleştirilmesi.',
      results: [
        '%30 proje teslim süresinde iyileşme',
        '%45 kaynak kullanım verimliliği',
        '%55 dokümantasyon süresinde azalma'
      ],
      duration: '10 ay',
      year: '2023',
      testimonial: 'Projelerimizi artık çok daha sistematik yönetebiliyoruz. Hem zaman hem de maliyet tasarrufu sağladık.'
    },
    {
      id: 6,
      company: 'MNO Lojistik A.Ş.',
      sector: 'logistics',
      logo: 'https://via.placeholder.com/120x60/1E40AF/ffffff?text=MNO',
      project: 'Filo Yönetim Sistemi',
      description: 'Araç takip sistemi ve rota optimizasyonu için geliştirilmiş entegre çözüm.',
      results: [
        '%35 yakıt tasarrufu',
        '%50 teslimat süresinde iyileşme',
        '%40 müşteri memnuniyeti artışı'
      ],
      duration: '5 ay',
      year: '2022',
      testimonial: 'Filo yönetimimiz artık çok daha verimli. Rota optimizasyonu sayesinde hem maliyet hem zaman tasarrufu sağlıyoruz.'
    }
  ];

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
              {t('nav.references', language)}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Türkiye'nin önde gelen şirketleriyle gerçekleştirdiğimiz başarılı projeler ve elde edilen sonuçlar.
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

      {/* References Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Başarı Hikayeleri</h2>
              <p className="text-lg text-gray-600">
                Müşterilerimizin dijital dönüşüm yolculuğundaki başarı hikayeleri
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-48">
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

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredReferences.map((reference) => (
              <Card key={reference.id} className="hover-lift border-gray-100">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <img 
                        src={reference.logo} 
                        alt={reference.company}
                        className="w-16 h-8 object-contain mr-4"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{reference.company}</h3>
                        <Badge variant="secondary">{sectors[reference.sector as keyof typeof sectors]?.label}</Badge>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{reference.year}</span>
                  </div>

                  <h4 className="text-xl font-semibold text-primary mb-3">{reference.project}</h4>
                  <p className="text-gray-700 mb-6">{reference.description}</p>

                  <div className="space-y-3 mb-6">
                    <h5 className="font-semibold text-gray-900">Elde Edilen Sonuçlar:</h5>
                    {reference.results.map((result, index) => (
                      <div key={index} className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-gray-700 italic">"{reference.testimonial}"</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Proje Süresi: <span className="font-medium">{reference.duration}</span>
                    </span>
                    <Button variant="outline" size="sm">
                      Detayları Gör <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Güvenilen Çözüm Ortağınız</h2>
            <p className="text-lg text-gray-600">
              Farklı sektörlerden 100+ şirket Algotrom'u tercih ediyor
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="flex items-center justify-center h-16 grayscale hover:grayscale-0 transition-all cursor-pointer">
                <div className="bg-gray-200 h-12 w-24 rounded flex items-center justify-center text-xs text-gray-500">
                  CLIENT LOGO
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Siz de Başarı Hikayemizin Parçası Olun
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            İşletmenizin dijital dönüşüm yolculuğunda yanınızda olalım. 
            Sizin için de başarılı projeler geliştirelim.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Proje Danışmanlığı Al
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="/contact">İletişime Geç</a>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
