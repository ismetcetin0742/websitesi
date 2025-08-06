import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Users,
  Heart,
  Coffee,
  Award,
  TrendingUp,
  Globe,
  BookOpen,
  Lightbulb,
  Target
} from 'lucide-react';

export default function Career() {
  const companyValues = [
    {
      icon: Users,
      title: 'Takım Ruhu',
      description: 'Birlikte çalışmayı seven, bilgiyi paylaşan ve ortak hedeflere odaklanan bir ekip.'
    },
    {
      icon: Lightbulb,
      title: 'İnovasyon',
      description: 'Sürekli öğrenme, gelişim ve yenilikçi çözümler üretme kültürü.'
    },
    {
      icon: Target,
      title: 'Müşteri Odaklılık',
      description: 'Müşteri memnuniyetini ön planda tutan, kaliteli çözümler üreten anlayış.'
    },
    {
      icon: Heart,
      title: 'İş-Yaşam Dengesi',
      description: 'Çalışanların kişisel gelişimine önem veren, esnek çalışma imkanları.'
    }
  ];

  const benefits = [
    { icon: Coffee, title: 'Esnek Çalışma', description: 'Hybrid ve remote çalışma imkanları' },
    { icon: BookOpen, title: 'Eğitim Desteği', description: 'Kurs, sertifikasyon ve konferans destekleri' },
    { icon: Award, title: 'Performans Primi', description: 'Başarı odaklı ek ödeme sistemi' },
    { icon: TrendingUp, title: 'Kariyer Gelişimi', description: 'Mentörlük ve kariyer planlama programları' },
    { icon: Globe, title: 'Teknoloji Odaklı', description: 'En güncel teknolojilerle çalışma fırsatı' },
    { icon: Users, title: 'Takım Etkinlikleri', description: 'Düzenli takım building ve sosyal aktiviteler' }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Kariyer Fırsatları
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Teknoloji tutkunu, yenilikçi ve gelişime açık ekip arkadaşları arıyoruz. 
              Birlikte geleceğin teknolojilerini şekillendirelim.
            </p>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-xl text-gray-600">
              Algotrom'da çalışmanın anlamı
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="border-gray-100 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Bizimle Çalışmak İster misiniz?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            CV'nizi bize gönderin, uygun pozisyon açıldığında size haber verelim. 
            Her zaman yetenekli kişilerle tanışmaktan mutluluk duyarız.
          </p>
          <Button size="lg" variant="secondary">
            CV Gönder
          </Button>
        </div>
      </section>
    </div>
  );
}