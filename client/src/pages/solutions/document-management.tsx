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
  FileText,
  CheckCircle,
  Star,
  Users,
  Shield,
  Search,
  Cloud,
  Lock,
  Archive,
  Share
} from 'lucide-react';

export default function DocumentManagement() {
  const { language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const features = [
    'Merkezi döküman deposu',
    'Versiyon kontrol sistemi',
    'Meta veri yönetimi',
    'Arama ve filtreleme',
    'Yetkilendirme kontrolü',
    'E-imza entegrasyonu',
    'Backup ve arşivleme',
    'Mobil erişim'
  ];

  const benefits = [
    'Belge arama süresinde %70 azalma',
    'Depolama maliyetlerinde %50 tasarruf',
    'Güvenlik ihlallerinde %90 azalma',
    'Uyumluluk süreçlerinde %60 iyileşme'
  ];

  const modules = [
    {
      icon: Cloud,
      title: 'Bulut Depolama',
      description: 'Güvenli ve ölçeklenebilir bulut tabanlı döküman deposu'
    },
    {
      icon: Search,
      title: 'Akıllı Arama',
      description: 'OCR ve AI destekli içerik arama teknolojisi'
    },
    {
      icon: Lock,
      title: 'Güvenlik',
      description: 'End-to-end şifreleme ve erişim kontrolü'
    },
    {
      icon: Archive,
      title: 'Arşivleme',
      description: 'Otomatik yaşam döngüsü yönetimi ve arşivleme'
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              E-Flow DMS
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Döküman Yönetim Sistemi
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Kurumsal belgelerinizi güvenle dijital ortamda saklayın, kategorize edin ve paylaşın. 
              KVKK uyumlu güvenlik önlemleri ile tam kontrol.
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
              src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="E-Flow DMS" 
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Uyumluluk & Güvenlik</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">KVKK uyumlu veri koruması</span>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">ISO 27001 güvenlik standartları</span>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">E-imza kanunu uyumluluğu</span>
                    </div>
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Audit trail ve izlenebilirlik</span>
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
                        <FileText className="w-8 h-8 text-primary" />
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
          <h2 className="text-4xl font-bold mb-4">Döküman Yönetiminizi Dijitalleştirin</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Belgelerinizi güvenle dijital ortama taşıyın ve verimliliğinizi artırın. 
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