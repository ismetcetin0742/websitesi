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
  Factory,
  CheckCircle,
  TrendingUp,
  Cog,
  BarChart3,
  Users,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

export default function Manufacturing() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const solutions = [
    {
      icon: Cog,
      title: 'Üretim Süreç Yönetimi',
      description: 'Üretim hatlarının planlanması, takibi ve optimizasyonu',
      features: ['Üretim planlama', 'Kalite kontrol', 'Makine bakım yönetimi']
    },
    {
      icon: BarChart3,
      title: 'Performans İzleme',
      description: 'Real-time üretim verilerinin analizi ve raporlaması',
      features: ['OEE hesaplama', 'Downtime analizi', 'Verimlilik raporları']
    },
    {
      icon: Users,
      title: 'İnsan Kaynakları',
      description: 'Vardiya yönetimi ve personel performans takibi',
      features: ['Vardiya planlama', 'Skill matrix', 'Eğitim yönetimi']
    },
    {
      icon: Shield,
      title: 'Kalite Yönetimi',
      description: 'ISO standartları uyumlu kalite süreçleri',
      features: ['Kalite kontrol', 'NCR yönetimi', 'Sertifikasyon takibi']
    }
  ];

  const benefits = [
    'Üretim verimliliğinde %35 artış',
    'Kalite maliyetlerinde %45 azalma',
    'Planlama süresinde %50 iyileşme',
    'Stok seviyelerinde %30 optimizasyon'
  ];

  const caseStudies = [
    {
      company: 'ABC Otomotiv A.Ş.',
      challenge: 'Manuel üretim planlama ve takip süreçleri',
      solution: 'e-Flow BPM ile entegre üretim yönetim sistemi',
      results: ['%40 verimlilik artışı', '%25 maliyet azalması', '%60 hızlı raporlama']
    },
    {
      company: 'XYZ Tekstil San.',
      challenge: 'Kalite kontrol süreçlerinin dijitalleştirilmesi',
      solution: 'Mobil kalite kontrol uygulaması ve dashboard',
      results: ['%50 hata azalması', '%30 kontrol süresi tasarrufu', '%90 izlenebilirlik']
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Factory className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Üretim Sektörü Çözümleri
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Endüstri 4.0 ile Akıllı Üretim
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Üretim süreçlerinizi dijitalleştirin, verimliliği artırın ve Endüstri 4.0'a hazır olun. 
              Otomotivden tekstile, gıdadan makineye kadar tüm üretim sektörlerinde deneyimli çözümler.
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
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Üretim Sektörü" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Üretim İçin Özel Çözümler</h2>
            <p className="text-xl text-gray-600">Üretim süreçlerinizi optimize edecek modüler çözümler</p>
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
            <p className="text-lg text-gray-600">Üretim müşterilerimizin elde ettiği ortalama iyileştirmeler</p>
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
            <p className="text-xl text-gray-600">Üretim sektöründeki referans projelerimiz</p>
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
          <h2 className="text-4xl font-bold mb-4">Üretiminizi Dijitalleştirin</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Endüstri 4.0'a hazır olun ve rekabet avantajınızı artırın. 
            Üretim süreçlerinize özel çözümlerle tanışın.
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
              <Link href="/contact">Üretim Uzmanlarımızla Konuşun</Link>
            </Button>
          </div>
        </div>
      </section>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}