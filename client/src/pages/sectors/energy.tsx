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
  Zap,
  CheckCircle,
  TrendingUp,
  Gauge,
  Shield,
  Leaf,
  BarChart3,
  Settings,
  MapPin
} from 'lucide-react';

export default function Energy() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const solutions = [
    {
      icon: Gauge,
      title: 'Enerji İzleme ve Yönetimi',
      description: 'Gerçek zamanlı enerji tüketimi takibi ve optimizasyonu',
      features: ['Smart meter entegrasyonu', 'Tüketim analizi', 'Enerji verimliliği']
    },
    {
      icon: Shield,
      title: 'Şebeke Yönetimi',
      description: 'Elektrik dağıtım şebekelerinin izleme ve kontrolü',
      features: ['SCADA entegrasyonu', 'Arıza yönetimi', 'Preventif bakım']
    },
    {
      icon: Leaf,
      title: 'Yenilenebilir Enerji',
      description: 'Güneş, rüzgar ve diğer yenilenebilir kaynak yönetimi',
      features: ['Üretim tahmini', 'Depolama yönetimi', 'Grid entegrasyonu']
    },
    {
      icon: BarChart3,
      title: 'Enerji Ticareti',
      description: 'Enerji piyasası analizi ve ticaret platformu',
      features: ['Piyasa analizi', 'Fiyat optimizasyonu', 'Risk yönetimi']
    }
  ];

  const benefits = [
    'Enerji verimliliğinde %86 artış',
    'Operasyonel maliyetlerde %25 azalma',
    'Arıza süresinde %50 iyileşme',
    'Karbon emisyonunda %40 azalma'
  ];

  const caseStudies = [
    {
      company: 'JKL Enerji Dağıtım A.Ş.',
      challenge: 'Manuel şebeke izleme ve arıza müdahale süreçleri',
      solution: 'Akıllı şebeke yönetim sistemi ve mobil saha uygulaması',
      results: ['%45 arıza süresinde azalma', '%30 operasyonel verimlilik', '%60 hızlı müdahale']
    },
    {
      company: 'MNO Güneş Enerjisi',
      challenge: 'Güneş santrali performans izleme ve bakım planlaması',
      solution: 'IoT tabanlı izleme sistemi ve predictive maintenance',
      results: ['%25 verimlilik artışı', '%40 bakım maliyeti azalması', '%90 uptime oranı']
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Zap className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Enerji Sektörü Çözümleri
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Akıllı Enerji Yönetimi ve Dijital Dönüşüm
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Elektrik üretiminden dağıtıma, yenilenebilir enerji projelerinden enerji ticaretine 
              kadar sektörün her alanında teknoloji destekli çözümler.
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
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Enerji Sektörü" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enerji İçin Özel Çözümler</h2>
            <p className="text-xl text-gray-600">Sürdürülebilir enerji geleceğini şekillendirin</p>
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
            <p className="text-lg text-gray-600">Enerji müşterilerimizin elde ettiği ortalama iyileştirmeler</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-primary" />
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
            <p className="text-xl text-gray-600">Enerji sektöründeki referans projelerimiz</p>
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
          <h2 className="text-4xl font-bold mb-4">Enerjinizi Dijitalleştirin</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Sürdürülebilir enerji geleceğine hazır olun ve verimliliğinizi artırın. 
            Enerji sektörüne özel çözümlerle rekabet avantajı kazanın.
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
              <Link href="/contact">Enerji Uzmanlarımızla Konuşun</Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}