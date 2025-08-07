import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import { useQuery } from '@tanstack/react-query';
import type { TeamMember, AboutContent, CompanyValue, CompanyStats } from '@shared/schema';
import {
  Target,
  Eye,
  Users,
  Award,
  Globe,
  Lightbulb,
  Loader2
} from 'lucide-react';

export default function About() {
  const { language } = useLanguage();

  // Fetch team members from API
  const { data: teamMembers = [], isLoading: teamLoading } = useQuery<TeamMember[]>({
    queryKey: ['/api/team'],
  });

  // Fetch about content from API
  const { data: aboutContent = [], isLoading: contentLoading } = useQuery<AboutContent[]>({
    queryKey: ['/api/about-content'],
  });

  // Fetch company values from API
  const { data: companyValues = [], isLoading: valuesLoading } = useQuery<CompanyValue[]>({
    queryKey: ['/api/company-values'],
  });

  // Fetch company stats from API
  const { data: companyStats, isLoading: statsLoading } = useQuery<CompanyStats>({
    queryKey: ['/api/company-stats'],
  });

  // Helper function to get content by section
  const getContentBySection = (section: string) => {
    return aboutContent.find(content => content.section === section);
  };

  // Get icon component by name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Target': return Target;
      case 'Lightbulb': return Lightbulb;
      case 'Users': return Users;
      case 'Award': return Award;
      case 'Globe': return Globe;
      default: return Target;
    }
  };

  if (contentLoading || valuesLoading || statsLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
            <p className="text-lg text-gray-600">İçerik yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  const aboutSection = getContentBySection('about');

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {aboutSection?.title || t('nav.about', language)}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {aboutSection?.content || "15 yılı aşkın deneyimimizle, işletmelerin dijital dönüşüm yolculuğunda güvenilir teknoloji partneri olarak yer alıyoruz."}
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
                  <h2 className="text-3xl font-bold text-gray-900">
                    {getContentBySection('mission')?.title || 'Misyonumuz'}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {getContentBySection('mission')?.content || 
                    'İşletmelerin dijital dönüşüm süreçlerinde güvenilir teknoloji partneri olarak, iş süreçlerini optimize eden, verimliliği artıran ve rekabet avantajı sağlayan yenilikçi çözümler sunmaktır. Müşterilerimizin başarısına odaklanarak, kaliteli yazılım çözümleri ve sürekli destek hizmeti sağlarız.'
                  }
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-blue-500 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    {getContentBySection('vision')?.title || 'Vizyonumuz'}
                  </h2>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {getContentBySection('vision')?.content || 
                    "Türkiye'nin önde gelen dijital dönüşüm çözümleri sağlayıcısı olarak, işletmelerin küresel rekabette öne çıkmasını sağlamak. Teknolojinin gücünü kullanarak sürdürülebilir büyüme ve yenilikçi iş modelleri yaratmak, dijital çağda liderlik eden kuruluşlar yetiştirmektir."
                  }
                </p>
              </CardContent>
            </Card>
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

          {teamLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span className="text-gray-600">Takım üyeleri yükleniyor...</span>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {teamMembers.filter(member => member.isActive).map((member) => (
                <Card key={member.id} className="hover-lift text-center">
                  <CardContent className="p-8">
                    <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Users className="w-16 h-16 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-1">{member.position}</p>
                    {member.positionEn && (
                      <p className="text-gray-500 text-sm mb-4">{member.positionEn}</p>
                    )}
                    {member.email && (
                      <p className="text-gray-600 text-sm">{member.email}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {getContentBySection('values')?.title || 'Değerlerimiz'}
            </h2>
            <p className="text-xl text-gray-600">
              {getContentBySection('values')?.content || 'Çalışma prensiplerimizi şekillendiren temel değerler'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyValues.map((value) => {
              const Icon = getIconComponent(value.iconName);
              return (
                <Card key={value.id} className="hover-lift border-gray-100">
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
              <div className="text-5xl font-bold mb-2">{companyStats?.experienceYears || 15}+</div>
              <div className="text-xl opacity-90">Yıl Deneyim</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">{companyStats?.completedProjects || 500}+</div>
              <div className="text-xl opacity-90">Başarılı Proje</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">{companyStats?.happyCustomers || 100}+</div>
              <div className="text-xl opacity-90">Mutlu Müşteri</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">{companyStats?.teamSize || 50}+</div>
              <div className="text-xl opacity-90">Uzman Takım</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
