import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DemoModal } from '@/components/demo-modal';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import {
  ChartGantt,
  CheckCircle,
  Star,
  Users,
  Zap,
  ArrowRight,
  Shield,
  TrendingUp,
  Clock,
  Settings
} from 'lucide-react';

export default function EFlowBPM() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const features = [
    'Görsel süreç tasarım editörü',
    'Otomatik iş akışı yönetimi',
    'Gerçek zamanlı süreç izleme',
    'Performans analiz raporları',
    'Rol bazlı yetkilendirme',
    'Mobil onay sistemi',
    'API entegrasyonu',
    'SLA yönetimi'
  ];

  const benefits = [
    'Süreç verimliliğinde %40 artış',
    'Manuel işlem hatalarında %80 azalma',
    'Onay sürelerinde %60 kısalma',
    'Operasyonel maliyetlerde %30 tasarruf'
  ];

  const whyUs = [
    'Türkçe dil desteği ve yerel müşteri hizmetleri',
    '15+ yıllık BPM deneyimi',
    'Mevcut sistemlerle kolay entegrasyon',
    '7/24 teknik destek'
  ];

  const modules = [
    {
      icon: Settings,
      title: 'Süreç Tasarımı',
      description: 'Drag & drop editör ile kolayca süreç modelleme'
    },
    {
      icon: Users,
      title: 'Kullanıcı Yönetimi',
      description: 'Rol bazlı yetkilendirme ve organizasyon yapısı'
    },
    {
      icon: TrendingUp,
      title: 'Performans İzleme',
      description: 'Gerçek zamanlı dashboard ve raporlama'
    },
    {
      icon: Shield,
      title: 'Güvenlik',
      description: 'ISO 27001 uyumlu güvenlik standartları'
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ChartGantt className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              e-Flow BPM
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              İş Süreçleri Yönetimi Çözümü
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Kurumsal iş süreçlerinizi modelleyin, otomatikleştirin ve sürekli optimize edin. 
              Tam entegre BPM çözümü ile verimliliğinizi maksimize edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setIsDemoModalOpen(true)}>
                Ücretsiz Demo İsteyin
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">İletişime Geçin</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="e-Flow BPM Dashboard" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="features" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Özellikler</TabsTrigger>
              <TabsTrigger value="benefits">Faydalar</TabsTrigger>
              <TabsTrigger value="modules">Modüller</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Temel Özellikler</h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Neden e-Flow BPM?</h3>
                  <div className="space-y-4">
                    {whyUs.map((reason, index) => (
                      <div key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="mt-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Kanıtlanmış Sonuçlar</h3>
                <p className="text-lg text-gray-600">Müşterilerimizin elde ettiği ortalama iyileştirmeler</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {benefit.split(' ')[0]}
                      </div>
                      <p className="text-gray-600">{benefit.split(' ').slice(1).join(' ')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="modules" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  return (
                    <Card key={index} className="hover-lift">
                      <CardContent className="p-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h4 className="text-xl font-semibold text-gray-900 mb-3">{module.title}</h4>
                        <p className="text-gray-600">{module.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-cta text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">e-Flow BPM ile Başlayın</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            İş süreçlerinizi dijitalleştirin ve verimliliğinizi artırın. 
            Uzmanlarımızla konuşarak işletmenize özel çözümü keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Demo Talep Edin
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">Satış Ekibiyle İletişime Geçin</Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}