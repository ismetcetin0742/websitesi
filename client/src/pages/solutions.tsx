import { useState } from 'react';
import { Link, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
  CheckCircle,
  Star,
  Users,
  Zap,
  Lock,
  Globe
} from 'lucide-react';

export default function Solutions() {
  const params = useParams();
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const solutions = {
    'eflow-bpm': {
      icon: ChartGantt,
      title: 'e-Flow BPM',
      subtitle: 'İş Süreçleri Yönetimi',
      description: 'Kurumsal iş süreçlerinizi modelleyin, otomatikleştirin ve sürekli optimize edin. Tam entegre BPM çözümü ile verimliliğinizi maksimize edin.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Görsel süreç tasarım editörü',
        'Otomatik iş akışı yönetimi',
        'Gerçek zamanlı süreç izleme',
        'Performans analiz raporları',
        'Rol bazlı yetkilendirme',
        'Mobil onay sistemi',
        'API entegrasyonu',
        'SLA yönetimi'
      ],
      benefits: [
        'Süreç verimliliğinde %40 artış',
        'Manuel işlem hatalarında %80 azalma',
        'Onay sürelerinde %60 kısalma',
        'Operasyonel maliyetlerde %30 tasarruf'
      ],
      whyUs: [
        'Türkçe dil desteği ve yerel müşteri hizmetleri',
        '15+ yıllık BPM deneyimi',
        'Mevcut sistemlerle kolay entegrasyon',
        '7/24 teknik destek'
      ]
    },
    'document-management': {
      icon: FileText,
      title: 'Döküman Yönetim Sistemi',
      subtitle: 'Dijital Belge Yönetimi',
      description: 'Kurumsal belgelerinizi güvenle dijital ortamda saklayın, kategorize edin ve paylaşın. KVKK uyumlu güvenlik önlemleri ile.',
      image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Merkezi döküman deposu',
        'Versiyon kontrol sistemi',
        'Meta veri yönetimi',
        'Arama ve filtreleme',
        'Yetkilendirme kontrolü',
        'E-imza entegrasyonu',
        'Backup ve arşivleme',
        'OCR metin tanıma'
      ],
      benefits: [
        'Döküman arama süresinde %70 azalma',
        'Depolama maliyetlerinde %50 tasarruf',
        'Güvenlik seviyesinde %90 artış',
        'Erişim hızında %80 iyileşme'
      ],
      whyUs: [
        'KVKK ve ISO 27001 uyumlu güvenlik',
        'Kolay kullanımlı arayüz',
        'Mevcut sistemlerle entegrasyon',
        'Bulut ve on-premise seçenekleri'
      ]
    },
    'integration': {
      icon: Plug,
      title: 'Entegrasyon Çözümleri',
      subtitle: 'Sistem Entegrasyonu',
      description: 'Mevcut sistemlerinizi birbirine bağlayın. ERP, CRM, WhatsApp Business API ve diğer platformları sorunsuz entegre edin.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'REST API geliştirme',
        'SOAP web servisleri',
        'Database entegrasyonu',
        'WhatsApp Business API',
        'LOGO ERP entegrasyonu',
        'E-fatura/E-arşiv',
        'Real-time data sync',
        'Error handling & logging'
      ],
      benefits: [
        'Manuel veri girişinde %95 azalma',
        'Sistem verimliliğinde %60 artış',
        'Hata oranlarında %85 düşüş',
        'İşlem süresinde %50 kısalma'
      ],
      whyUs: [
        'Geniş platform desteği',
        'Özelleştirilebilir çözümler',
        'Güvenli veri transferi',
        'Sürekli izleme ve bakım'
      ]
    },
    'business-intelligence': {
      icon: TrendingUp,
      title: 'İş Zekası & Raporlama',
      subtitle: 'Veri Analizi ve Raporlama',
      description: 'Verilerinizi anlamlı bilgilere dönüştürün. Gerçek zamanlı dashboard\'lar ve detaylı raporlarla stratejik kararlar alın.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Interaktif dashboard\'lar',
        'Otomatik rapor oluşturma',
        'KPI takip sistemi',
        'Drill-down analiz',
        'Mobil raporlama',
        'Scheduled reports',
        'Data visualization',
        'Predictive analytics'
      ],
      benefits: [
        'Karar alma süresinde %70 hızlanma',
        'Veri doğruluğunda %95 iyileşme',
        'Operasyonel görünürlükte %80 artış',
        'Maliyet optimizasyonunda %25 tasarruf'
      ],
      whyUs: [
        'Kullanıcı dostu arayüz',
        'Gerçek zamanlı veri işleme',
        'Mobil uyumlu raporlar',
        'Özelleştirilebilir KPI\'lar'
      ]
    },
    'mobile': {
      icon: Smartphone,
      title: 'Mobil Çözümler',
      subtitle: 'Mobil Uygulama Geliştirme',
      description: 'İş süreçlerinize her yerden erişim sağlayın. iOS ve Android platformlarında native ve hybrid uygulama geliştirme.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'Native iOS/Android apps',
        'Cross-platform development',
        'Offline çalışma desteği',
        'Push notification',
        'Biometric authentication',
        'GPS entegrasyonu',
        'Camera & QR scanner',
        'Responsive web design'
      ],
      benefits: [
        'Mobil erişimde %100 artış',
        'Kullanıcı memnuniyetinde %85 iyileşme',
        'İş süreç hızında %45 artış',
        'Operasyonel esneklikte %90 artış'
      ],
      whyUs: [
        'Cross-platform development',
        'Modern UI/UX tasarım',
        'Güvenli veri senkronizasyonu',
        'App store optimizasyonu'
      ]
    },
    'security': {
      icon: Shield,
      title: 'Güvenlik & Uyumluluk',
      subtitle: 'Siber Güvenlik Çözümleri',
      description: 'KVKK, ISO 27001 uyumlu güvenlik çözümleri ile kurumsal verilerinizi koruyun. Penetrasyon testleri ve güvenlik denetimleri.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      features: [
        'KVKK uyumluluk danışmanlığı',
        'ISO 27001 sertifikasyon',
        'Penetrasyon testleri',
        'Güvenlik denetimleri',
        'Veri şifreleme',
        'Access control',
        'Security monitoring',
        'Incident response'
      ],
      benefits: [
        'Güvenlik seviyesinde %95 artış',
        'Veri ihlali riskinde %90 azalma',
        'Uyumluluk skorunda %100 başarı',
        'Güvenlik maliyetlerinde %40 optimizasyon'
      ],
      whyUs: [
        'KVKK uzman kadro',
        'ISO 27001 sertifikalı süreçler',
        'Sürekli güvenlik izleme',
        '24/7 incident response'
      ]
    }
  };

  const allSolutions = Object.entries(solutions).map(([key, solution]) => ({
    key,
    ...solution
  }));

  // If no specific solution is requested, show all solutions
  if (!params.slug) {
    return (
      <div className="py-12">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Ürünler & Çözümler
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                İşletmenizin ihtiyaçlarına özel tasarlanmış, kanıtlanmış dijital çözümler ile rekabet avantajı kazanın.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allSolutions.map((solution) => {
                const Icon = solution.icon;
                return (
                  <Card key={solution.key} className="hover-lift group border-gray-100">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                      <p className="text-primary font-medium mb-4">{solution.subtitle}</p>
                      <p className="text-gray-600 mb-6">{solution.description}</p>
                      <Link 
                        href={`/solutions/${solution.key}`}
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

        {/* CTA Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hangi Çözümün Size Uygun Olduğunu Keşfedin
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Uzmanlarımızla ücretsiz danışmanlık alın ve işletmeniz için en uygun çözümü belirleyin.
            </p>
            <Button 
              size="lg" 
              onClick={() => setIsDemoModalOpen(true)}
            >
              Ücretsiz Danışmanlık Al
            </Button>
          </div>
        </section>

        <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      </div>
    );
  }

  // Show specific solution details
  const solution = solutions[params.slug as keyof typeof solutions];
  if (!solution) {
    return <div>Solution not found</div>;
  }

  const Icon = solution.icon;

  const faqs = [
    {
      question: 'Implementasyon süresi ne kadar?',
      answer: 'Proje büyüklüğüne göre değişmekle birlikte, ortalama 4-12 hafta arasında tamamlanmaktadır.'
    },
    {
      question: 'Mevcut sistemlerimizle entegre olabilir mi?',
      answer: 'Evet, modern API\'lar ve entegrasyon teknolojileri kullanarak mevcut sistemlerinizle sorunsuz entegrasyon sağlıyoruz.'
    },
    {
      question: 'Eğitim ve destek hizmeti var mı?',
      answer: 'Kapsamlı kullanıcı eğitimleri ve 7/24 teknik destek hizmeti sunuyoruz.'
    },
    {
      question: 'Güvenlik standartları nelerdir?',
      answer: 'ISO 27001, KVKK uyumlu güvenlik protokolleri ve düzenli güvenlik denetimleri uyguluyoruz.'
    }
  ];

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
                  <h1 className="text-4xl font-bold text-gray-900">{solution.title}</h1>
                  <p className="text-xl text-primary font-medium">{solution.subtitle}</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-8">{solution.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => setIsDemoModalOpen(true)}
                >
                  Demo Talep Et
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/contact">İletişime Geç</Link>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src={solution.image} 
                alt={solution.title}
                className="rounded-2xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Solution Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="features" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="features">Özellikler</TabsTrigger>
              <TabsTrigger value="benefits">Avantajlar</TabsTrigger>
              <TabsTrigger value="why-us">Neden Biz?</TabsTrigger>
              <TabsTrigger value="faq">S.S.S.</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Temel Özellikler</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {solution.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Sağladığı Avantajlar</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {solution.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Star className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-gray-700 font-medium">{benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="why-us" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Neden Algotrom?</h3>
                  <div className="space-y-6">
                    {solution.whyUs.map((reason, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-gray-700">{reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Sıkça Sorulan Sorular</h3>
                  <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            {solution.title} ile Başlamaya Hazır mısınız?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Uzmanlarımızla görüşerek ücretsiz demo alın ve çözümümüzü yakından inceleyin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Demo Talep Et
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">İletişime Geç</Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
