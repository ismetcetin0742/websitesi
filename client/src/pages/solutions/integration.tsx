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
  Plug,
  CheckCircle,
  Star,
  Zap,
  Database,
  Cloud,
  Globe,
  Settings,
  ArrowRight,
  Code,
  Shield
} from 'lucide-react';

export default function Integration() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const features = [
    'REST API & SOAP Web Servisleri',
    'Real-time veri senkronizasyonu',
    'ETL süreçleri ve veri dönüşümü',
    'Mesaj kuyruklama sistemleri',
    'Database entegrasyonları',
    'Cloud platform bağlantıları',
    'Monitoring ve logging',
    'Hata yönetimi ve retry mekanizmaları'
  ];

  const integrationTypes = [
    {
      icon: Database,
      title: 'Veritabanı Entegrasyonları',
      description: 'Oracle, SQL Server, MySQL, PostgreSQL ve NoSQL veritabanları',
      technologies: ['Oracle', 'SQL Server', 'MySQL', 'MongoDB']
    },
    {
      icon: Cloud,
      title: 'Cloud Platformları',
      description: 'Amazon AWS, Microsoft Azure, Google Cloud entegrasyonları',
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Alibaba Cloud']
    },
    {
      icon: Globe,
      title: 'ERP Sistemleri',
      description: 'SAP, Oracle ERP, Microsoft Dynamics entegrasyonları',
      technologies: ['SAP', 'Oracle ERP', 'Dynamics', 'NetSuite']
    },
    {
      icon: Settings,
      title: 'Özel Sistemler',
      description: 'Legacy sistemler ve özel yazılım entegrasyonları',
      technologies: ['Legacy', 'Custom APIs', 'Mainframe', 'AS400']
    }
  ];

  const benefits = [
    'Entegrasyon süresinde %60 azalma',
    'Veri tutarlılığında %95 iyileşme',
    'Manuel veri girişinde %80 azalma',
    'Sistem performansında %40 artış'
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Plug className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Entegrasyon Çözümleri
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Sistem Entegrasyonu ve API Yönetimi
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Farklı sistemlerinizi sorunsuz bir şekilde birleştirin. ERP, CRM, veritabanları ve 
              bulut platformları arasında güvenli ve hızlı veri alışverişi sağlayın.
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
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Entegrasyon Çözümleri" 
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Integration Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Entegrasyon Türleri</h2>
            <p className="text-xl text-gray-600">Her türlü sistemi birbirine bağlayabiliyoruz</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {integrationTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {type.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="features" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="features">Özellikler</TabsTrigger>
              <TabsTrigger value="benefits">Faydalar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Teknik Özellikler</h3>
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Güvenlik & Performans</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">SSL/TLS şifreleme</span>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">OAuth 2.0 kimlik doğrulama</span>
                    </div>
                    <div className="flex items-start">
                      <Zap className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">High-performance data processing</span>
                    </div>
                    <div className="flex items-start">
                      <Zap className="w-5 h-5 text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Load balancing ve failover</span>
                    </div>
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
                        <Plug className="w-8 h-8 text-primary" />
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
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-cta text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Sistemlerinizi Entegre Edin</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Farklı sistemleriniz arasında köprü kurun ve veri silosunu ortadan kaldırın. 
            Uzmanlarımızla konuşarak entegrasyon ihtiyaçlarınızı değerlendirin.
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