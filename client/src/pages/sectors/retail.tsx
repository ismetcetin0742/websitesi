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
  ShoppingCart,
  CheckCircle,
  TrendingUp,
  Package,
  Users,
  BarChart3,
  Smartphone,
  Tag,
  CreditCard
} from 'lucide-react';

export default function Retail() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const solutions = [
    {
      icon: Package,
      title: 'Stok ve Envanter Yönetimi',
      description: 'Gerçek zamanlı stok takibi ve otomatik sipariş sistemi',
      features: ['Stok seviye uyarıları', 'Otomatik sipariş', 'ABC analizi']
    },
    {
      icon: Users,
      title: 'Müşteri Sadakat Programı',
      description: 'CRM entegreli müşteri sadakat ve ödül sistemi',
      features: ['Puan sistemi', 'Kişisel kampanyalar', 'Müşteri segmentasyonu']
    },
    {
      icon: BarChart3,
      title: 'Satış Analizi ve Raporlama',
      description: 'İleri düzey satış analitiği ve trend analizi',
      features: ['Satış trendleri', 'Karlılık analizi', 'Tahmin modelleri']
    },
    {
      icon: Smartphone,
      title: 'Omnichannel Deneyim',
      description: 'Online ve offline kanalların entegre yönetimi',
      features: ['Unified commerce', 'Click & collect', 'Cross-channel stok']
    }
  ];

  const benefits = [
    'Satış cirolarında %35 artış',
    'Stok maliyetlerinde %25 azalma',
    'Müşteri memnuniyetinde %45 iyileşme',
    'Operasyonel verimlilikte %30 artış'
  ];

  const caseStudies = [
    {
      company: 'PQR Moda Mağazaları',
      challenge: 'Çok mağazalı stok yönetimi ve omnichannel deneyim',
      solution: 'Entegre retail yönetim sistemi ve mobil POS çözümü',
      results: ['%40 stok devir hızı artışı', '%30 satış artışı', '%50 müşteri memnuniyeti']
    },
    {
      company: 'STU Süpermarket Zinciri',
      challenge: 'Müşteri sadakat programı ve kişisel kampanya yönetimi',
      solution: 'AI destekli CRM ve kişiselleştirilmiş kampanya platformu',
      results: ['%55 müşteri geri dönüş oranı', '%25 sepet büyüklüğü artışı', '%60 kampanya etkinliği']
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Perakende Sektörü Çözümleri
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Akıllı Perakende ve Omnichannel Deneyim
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Modern perakende dünyasında rekabet avantajı sağlayın. Stok yönetiminden 
              müşteri deneyimine, analitiğinden omnichannel çözümlere kadar kapsamlı destek.
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
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Perakende Sektörü" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perakende İçin Özel Çözümler</h2>
            <p className="text-xl text-gray-600">Müşteri deneyimini geliştiren akıllı çözümler</p>
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
            <p className="text-lg text-gray-600">Perakende müşterilerimizin elde ettiği ortalama iyileştirmeler</p>
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
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Başarı Hikayeleri</h2>
            <p className="text-xl text-gray-600">Perakende sektöründeki referans projelerimiz</p>
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
          <h2 className="text-4xl font-bold mb-4">Perakende Geleceğinizi Şekillendirin</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Modern müşteri beklentilerini karşılayın ve omnichannel deneyimle öne çıkın. 
            Perakende sektörüne özel çözümlerle satışlarınızı artırın.
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
              <Link href="/contact">Perakende Uzmanlarımızla Konuşun</Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}