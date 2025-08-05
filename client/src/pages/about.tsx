import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import {
  Target,
  Eye,
  Users,
  Award,
  Globe,
  Lightbulb
} from 'lucide-react';

export default function About() {
  const { language } = useLanguage();

  const timeline = [
    { year: '2009', event: 'Algotrom kuruldu. İlk BPM projeleri başladı.' },
    { year: '2012', event: 'e-Flow BPM ürünü geliştirilerek piyasaya sunuldu.' },
    { year: '2015', event: '50+ kurumsal müşteri portföyüne ulaşıldı.' },
    { year: '2018', event: 'Döküman Yönetim Sistemi ve Entegrasyon çözümleri eklendi.' },
    { year: '2020', event: 'Dijital dönüşüm hizmetlerinde uzmanlaşma.' },
    { year: '2022', event: 'İş Zekası ve Mobil çözümler portföye katıldı.' },
    { year: '2024', event: 'AI destekli süreç optimizasyonu çözümleri geliştirildi.' }
  ];

  const team = [
    {
      name: 'Ahmet Yılmaz',
      position: 'Genel Müdür',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: '15 yıllık teknoloji sektörü deneyimi. Dijital dönüşüm konusunda uzman.'
    },
    {
      name: 'Elif Demir',
      position: 'Teknik Direktör',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Yazılım geliştirme ve sistem mimarisi alanında 12 yıllık deneyim.'
    },
    {
      name: 'Mehmet Kaya',
      position: 'Proje Yöneticisi',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Kurumsal projelerin yönetimi ve müşteri ilişkilerinde uzman.'
    },
    {
      name: 'Ayşe Özkan',
      position: 'İş Analisti',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'İş süreçleri analizi ve optimizasyonu konusunda 8 yıllık deneyim.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Müşteri Odaklılık',
      description: 'Müşterilerimizin başarısını kendi başarımız olarak görür, onların hedeflerine ulaşması için çalışırız.'
    },
    {
      icon: Lightbulb,
      title: 'İnovasyon',
      description: 'Sürekli gelişim ve yenilik anlayışıyla teknolojinin son trendlerini takip ederiz.'
    },
    {
      icon: Users,
      title: 'Takım Çalışması',
      description: 'Güçlü ekip ruhu ile birlikte çalışarak en iyi sonuçları elde ederiz.'
    },
    {
      icon: Award,
      title: 'Kalite',
      description: 'Yüksek kalite standartlarında hizmet sunarak müşteri memnuniyetini önceliklendiririz.'
    },
    {
      icon: Globe,
      title: 'Sürdürülebilirlik',
      description: 'Çevreye duyarlı, sürdürülebilir teknoloji çözümleri geliştiririz.'
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('nav.about', language)}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              15 yılı aşkın deneyimimizle, işletmelerin dijital dönüşüm yolculuğunda güvenilir teknoloji partneri olarak yer alıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-primary mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Misyonumuz</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  İşletmelerin dijital dönüşüm süreçlerinde güvenilir teknoloji partneri olarak, 
                  iş süreçlerini optimize eden, verimliliği artıran ve rekabet avantajı sağlayan 
                  yenilikçi çözümler sunmaktır. Müşterilerimizin başarısına odaklanarak, 
                  kaliteli yazılım çözümleri ve sürekli destek hizmeti sağlarız.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">Vizyonumuz</h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Türkiye'nin önde gelen dijital dönüşüm çözümleri sağlayıcısı olarak, 
                  işletmelerin küresel rekabette öne çıkmasını sağlamak. Teknolojinin gücünü 
                  kullanarak sürdürülebilir büyüme ve yenilikçi iş modelleri yaratmak, 
                  dijital çağda liderlik eden kuruluşlar yetiştirmektir.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Şirket Tarihçesi</h2>
            <p className="text-xl text-gray-600">15 yıllık yolculuğumuzda önemli kilometre taşları</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary"></div>
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="hover-lift">
                      <CardContent className="p-6">
                        <Badge className="mb-3">{item.year}</Badge>
                        <p className="text-gray-700">{item.event}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Yönetim Ekibi</h2>
            <p className="text-xl text-gray-600">Deneyimli ve uzman kadromuzla tanışın</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover-lift text-center">
                <CardContent className="p-8">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-xl text-gray-600">Çalışma prensiplerimizi şekillendiren temel değerler</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover-lift border-gray-100">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-xl opacity-90">Yıl Deneyim</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-90">Başarılı Proje</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-xl opacity-90">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl opacity-90">Uzman Takım</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
