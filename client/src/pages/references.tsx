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
      description: 'E-Flow BPM ile üretim süreçlerinin dijitalleştirilmesi ve kalite kontrol sistemlerinin entegrasyonu.',
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



      {/* Client Logos Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Güvenilen Çözüm Ortağınız</h2>
            <p className="text-lg text-gray-600">
              Farklı sektörlerden 100+ şirket Algotrom'u tercih ediyor
            </p>
          </div>

          <div className="flex justify-center">
            <div className="flex items-center justify-center h-20 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <div className="text-sm font-medium">LOGO ALANI</div>
                <div className="text-xs">Yakında eklenecek</div>
              </div>
            </div>
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
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary bg-transparent">
              <a href="/contact" className="text-white hover:text-primary">İletişime Geç</a>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
