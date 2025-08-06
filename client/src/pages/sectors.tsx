import { useState } from 'react';
import { Link, useParams } from 'wouter';
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

export default function Sectors() {
  const params = useParams();
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const sectors = {
    'manufacturing': {
      icon: Factory,
      title: 'Üretim',
      subtitle: 'Üretim Sektörü Çözümleri',
      description: 'Üretim süreçlerinizi dijitalleştirin, kalite kontrolünü artırın ve operasyonel verimliliği maksimize edin.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      challenges: [
        'Üretim süreçlerinin izlenmesi ve kontrolü',
        'Kalite yönetimi ve standardizasyon',
        'Makine bakım ve arıza yönetimi',
        'Stok ve envanter optimizasyonu'
      ],
      solutions: [
        'Üretim planlama ve kontrol sistemleri',
        'Kalite yönetim sistemleri (QMS)',
        'Bakım yönetim sistemleri (CMMS)',
        'MES (Manufacturing Execution System)',
        'IoT sensör entegrasyonu',
        'Gerçek zamanlı üretim izleme'
      ],
      benefits: [
        'Üretim verimliliğinde %86 artış',
        'Kalite hatalarında %70 azalma',
        'Makine duruş sürelerinde %45 düşüş',
        'Operasyonel maliyetlerde %25 tasarruf'
      ],
      caseStudies: [
        {
          company: 'ABC Otomotiv',
          challenge: 'Üretim hattında kalite kontrol süreçlerinin dijitalleştirilmesi',
          solution: 'QMS ve IoT entegrasyonu ile gerçek zamanlı kalite izleme',
          result: '%60 kalite artışı ve %40 maliyet tasarrufu'
        }
      ]
    },
    'service': {
      icon: Settings,
      title: 'Hizmet',
      subtitle: 'Hizmet Sektörü Çözümleri',
      description: 'Müşteri deneyimini iyileştirin, hizmet kalitesini artırın ve operasyonel süreçleri optimize edin.',
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      challenges: [
        'Müşteri deneyimi yönetimi',
        'Hizmet kalitesinin standardizasyonu',
        'Kaynakların etkin kullanımı',
        'Müşteri memnuniyeti ölçümü'
      ],
      solutions: [
        'CRM ve müşteri deneyimi platformları',
        'Servis yönetim sistemleri',
        'Randevu ve kaynak planlama',
        'Müşteri geri bildirim sistemleri',
        'SLA yönetimi',
        'Mobil saha hizmetleri uygulamaları'
      ],
      benefits: [
        'Müşteri memnuniyetinde %50 artış',
        'Hizmet süresinde %40 kısalma',
        'Operasyonel verimlilikte %86 iyileşme',
        'Müşteri kaybında %60 azalma'
      ],
      caseStudies: [
        {
          company: 'XYZ Danışmanlık',
          challenge: 'Müşteri deneyimi ve proje yönetimi süreçlerinin iyileştirilmesi',
          solution: 'CRM entegrasyonu ve proje yönetim platformu',
          result: '%45 müşteri memnuniyeti artışı'
        }
      ]
    },
    'energy': {
      icon: Zap,
      title: 'Enerji',
      subtitle: 'Enerji Sektörü Çözümleri',
      description: 'Enerji üretim ve dağıtım süreçlerini optimize edin, verimliliği artırın ve sürdürülebilirlik hedeflerinize ulaşın.',
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      challenges: [
        'Enerji üretim ve dağıtım optimizasyonu',
        'Grid yönetimi ve dengeleme',
        'Sürdürülebilirlik hedefleri',
        'Regulasyon uyumluluğu'
      ],
      solutions: [
        'SCADA ve enerji yönetim sistemleri',
        'Smart grid çözümleri',
        'Enerji verimliliği analizi',
        'Yenilenebilir enerji entegrasyonu',
        'Carbon footprint tracking',
        'Tahminleme ve planlama algoritmaları'
      ],
      benefits: [
        'Enerji verimliliğinde %25 artış',
        'Operasyonel maliyetlerde %30 azalma',
        'Grid kararlılığında %40 iyileşme',
        'Sürdürülebilirlik skorunda %50 artış'
      ],
      caseStudies: [
        {
          company: 'Enerji A.Ş.',
          challenge: 'Rüzgar enerjisi üretim tahminlemesi ve grid entegrasyonu',
          solution: 'AI destekli tahminleme sistemi ve smart grid entegrasyonu',
          result: '%35 üretim verimliliği artışı'
        }
      ]
    },
    'retail': {
      icon: ShoppingCart,
      title: 'Perakende',
      subtitle: 'Perakende Sektörü Çözümleri',
      description: 'Omnichannel deneyim yaratın, stok yönetimini optimize edin ve müşteri sadakatini artırın.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      challenges: [
        'Omnichannel müşteri deneyimi',
        'Stok ve tedarik zinciri yönetimi',
        'Fiyatlandırma optimizasyonu',
        'Müşteri analitikleri'
      ],
      solutions: [
        'E-ticaret platformları',
        'POS ve mağaza yönetim sistemleri',
        'Inventory management',
        'Customer analytics ve personalization',
        'Loyalty program yönetimi',
        'Supply chain optimization'
      ],
      benefits: [
        'Satış büyümesinde %40 artış',
        'Müşteri sadakatinde %55 iyileşme',
        'Stok maliyetlerinde %30 azalma',
        'Operasyonel verimlilikte %35 artış'
      ],
      caseStudies: [
        {
          company: 'Fashion Store',
          challenge: 'Online ve offline kanalların entegrasyonu',
          solution: 'Omnichannel platform ve unified inventory',
          result: '%50 satış artışı ve %40 müşteri memnuniyeti'
        }
      ]
    }
  };

  const allSectors = Object.entries(sectors).map(([key, sector]) => ({
    key,
    ...sector
  }));

  // If no specific sector is requested, show all sectors
  if (!params.slug) {
    return (
      <div className="py-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {t('nav.sectors', language)}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sektörünüze özel dijital dönüşüm çözümleri ile iş süreçlerinizi optimize edin ve rekabet avantajı kazanın.
              </p>
            </div>
          </div>
        </section>

        {/* Sectors Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {allSectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <Card key={sector.key} className="hover-lift group border-gray-100 text-center">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{sector.title}</h3>
                      <p className="text-gray-600 mb-6">{sector.description}</p>
                      <Link 
                        href={`/sectors/${sector.key}`}
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

        {/* Stats Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Sektörel Başarılarımız</h2>
              <p className="text-xl text-gray-600">Farklı sektörlerde elde ettiğimiz başarı metrikleri</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
                <div className="text-gray-600">Sektörel Proje</div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">%45</div>
                <div className="text-gray-600">Ortalama Verimlilik Artışı</div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600">Farklı Sektör</div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">%95</div>
                <div className="text-gray-600">Müşteri Memnuniyeti</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Sektörünüze Özel Çözüm Geliştirme
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Sektörünüzün özel ihtiyaçlarını anlıyor ve size özel çözümler geliştiriyoruz.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Sektörel Danışmanlık Al
            </Button>
          </div>
        </section>

        <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      </div>
    );
  }

  // Show specific sector details
  const sector = sectors[params.slug as keyof typeof sectors];
  if (!sector) {
    return <div>Sector not found</div>;
  }

  const Icon = sector.icon;

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">{sector.title}</h1>
                  <p className="text-xl text-primary font-medium">{sector.subtitle}</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">{sector.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  Sektörel Demo Al
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">İletişime Geç</Link>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src={sector.image} 
                alt={sector.title}
                className="rounded-2xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Challenges */}
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Sektörel Zorluklar</h3>
                <div className="space-y-4">
                  {sector.challenges.map((challenge, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <p className="text-gray-700">{challenge}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Solutions */}
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Çözümlerimiz</h3>
                <div className="space-y-4">
                  {sector.solutions.map((solution, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{solution}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Elde Edilen Faydalar</h2>
            <p className="text-xl text-gray-600">Çözümlerimizle elde ettiğiniz ölçülebilir sonuçlar</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sector.benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-gray-100">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BarChart3 className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Başarı Hikayeleri</h2>
            <p className="text-xl text-gray-600">Sektörünüzden müşterilerimizin başarı hikayeleri</p>
          </div>

          <div className="space-y-8">
            {sector.caseStudies.map((caseStudy, index) => (
              <Card key={index} className="border-gray-100">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Müşteri</h4>
                      <p className="text-primary font-medium text-lg">{caseStudy.company}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Zorluk</h4>
                      <p className="text-gray-700">{caseStudy.challenge}</p>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Çözüm</h4>
                      <p className="text-gray-700">{caseStudy.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Sonuç</h4>
                      <Badge className="text-base p-2">{caseStudy.result}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {sector.title} Sektöründe Dijital Dönüşümünüzü Başlatın
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
