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
  Headphones,
  CheckCircle,
  TrendingUp,
  Users,
  MessageCircle,
  Clock,
  Star,
  BarChart3,
  Heart
} from 'lucide-react';

export default function Service() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const solutions = [
    {
      icon: MessageCircle,
      title: 'Müşteri Hizmetleri Yönetimi',
      description: 'Çok kanallı müşteri destek süreçlerinin yönetimi',
      features: ['Ticket yönetimi', 'SLA takibi', 'Müşteri geçmişi']
    },
    {
      icon: Users,
      title: 'CRM Entegrasyonu',
      description: 'Müşteri ilişkileri yönetimi ve satış süreçleri',
      features: ['Lead yönetimi', 'Satış pipeline', 'Müşteri segmentasyonu']
    },
    {
      icon: BarChart3,
      title: 'Performans Analizi',
      description: 'Hizmet kalitesi ve müşteri memnuniyeti ölçümü',
      features: ['NPS analizi', 'Agent performansı', 'Müşteri geri bildirimi']
    },
    {
      icon: Clock,
      title: 'Randevu & Planlama',
      description: 'Online randevu sistemi ve kaynak planlaması',
      features: ['Online rezervasyon', 'Kaynak optimizasyonu', 'Otomatik hatırlatma']
    }
  ];

  const benefits = [
    'Müşteri memnuniyetinde %45 artış',
    'Çözüm süresinde %60 azalma',
    'Agent verimliliğinde %35 iyileşme',
    'Operasyonel maliyetlerde %25 tasarruf'
  ];

  const caseStudies = [
    {
      company: 'DEF Sigorta A.Ş.',
      challenge: 'Çok kanallı müşteri hizmetlerinin entegrasyonu',
      solution: 'Omnichannel müşteri hizmetleri platformu',
      results: ['%50 memnuniyet artışı', '%40 yanıt süresi azalması', '%30 verimlilik artışı']
    },
    {
      company: 'GHI Sağlık Merkezi',
      challenge: 'Randevu sistemi ve hasta takip süreçleri',
      solution: 'Dijital hasta yönetim sistemi',
      results: ['%65 online randevu oranı', '%45 bekleme süresi azalması', '%80 hasta memnuniyeti']
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Headphones className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Hizmet Sektörü Çözümleri
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Müşteri Deneyimini Mükemmelleştirin
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Müşteri hizmetlerinden sağlığa, eğitimden finansa kadar hizmet sektörünün 
              her alanında müşteri memnuniyetini artıran dijital çözümler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setIsDemoModalOpen(true)}>
                Sektörel Demo İsteyin
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">Uzmanlarımızla Konuşun</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Image */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Hizmet Sektörü" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hizmet İçin Özel Çözümler</h2>
            <p className="text-xl text-gray-600">Müşteri deneyimini geliştiren modüler yaklaşım</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    <div className="space-y-2">
                      {solution.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kanıtlanmış Sonuçlar</h2>
            <p className="text-lg text-gray-600">Hizmet müşterilerimizin elde ettiği ortalama iyileştirmeler</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {benefit.split(' ')[0]}
                  </div>
                  <p className="text-gray-600">{benefit.split(' ').slice(1).join(' ')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Başarı Hikayeleri</h2>
            <p className="text-xl text-gray-600">Hizmet sektöründeki referans projelerimiz</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{study.company}</h3>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Meydan Okuma:</h4>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Çözüm:</h4>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Sonuçlar:</h4>
                    <div className="space-y-1">
                      {study.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-cta text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Müşteri Deneyiminizi Geliştirin</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Hizmet kalitesini artırın ve müşteri memnuniyetini maksimuma çıkarın. 
            Sektörünüze özel çözümlerle fark yaratın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => setIsDemoModalOpen(true)}
            >
              Sektörel Demo Talep Edin
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link href="/contact">Hizmet Uzmanlarımızla Konuşun</Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}