import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import {
  Users,
  MapPin,
  Clock,
  Briefcase,
  Heart,
  Coffee,
  Award,
  TrendingUp,
  Globe,
  BookOpen,
  Lightbulb,
  Target
} from 'lucide-react';

const jobApplicationSchema = z.object({
  position: z.string().min(2, 'Pozisyon seçimi gereklidir'),
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().optional(),
  coverLetter: z.string().min(10, 'Ön yazı en az 10 karakter olmalıdır'),
});

type JobApplicationForm = z.infer<typeof jobApplicationSchema>;

export default function Career() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  const form = useForm<JobApplicationForm>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      position: '',
      name: '',
      email: '',
      phone: '',
      coverLetter: '',
    },
  });

  const jobApplicationMutation = useMutation({
    mutationFn: async (data: JobApplicationForm) => {
      return apiRequest('POST', '/api/career/apply', data);
    },
    onSuccess: () => {
      toast({
        title: 'Başvurunuz Alındı!',
        description: 'Başvurunuz başarıyla gönderildi. En kısa zamanda size dönüş yapacağız.',
      });
      form.reset();
      setSelectedPosition(null);
      queryClient.invalidateQueries({ queryKey: ['/api/career/applications'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: JobApplicationForm) => {
    jobApplicationMutation.mutate(data);
  };

  const openPositions = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Yazılım Geliştirme',
      location: 'İstanbul',
      type: 'Tam Zamanlı',
      experience: '5+ yıl',
      description: 'React, TypeScript ve modern frontend teknolojileri ile kullanıcı deneyimi odaklı uygulamalar geliştiren deneyimli frontend developer arıyoruz.',
      requirements: [
        '5+ yıl frontend geliştirme deneyimi',
        'React, TypeScript, JavaScript uzmanlığı',
        'Modern CSS framework\'leri (Tailwind, Styled Components)',
        'REST API entegrasyonu deneyimi',
        'Git, webpack gibi araçlarda yetkinlik'
      ],
      benefits: [
        'Rekabetçi maaş',
        'Esnek çalışma saatleri',
        'Remote çalışma imkanı',
        'Sağlık sigortası',
        'Eğitim ve konferans desteği'
      ]
    },
    {
      id: 2,
      title: 'Backend Developer (.NET)',
      department: 'Yazılım Geliştirme',
      location: 'İstanbul',
      type: 'Tam Zamanlı',
      experience: '3+ yıl',
      description: '.NET Core, C# ve veritabanı teknolojileri ile kurumsal uygulamalar geliştiren backend developer arıyoruz.',
      requirements: [
        '3+ yıl .NET/C# geliştirme deneyimi',
        'ASP.NET Core, Web API uzmanlığı',
        'SQL Server, Entity Framework',
        'Microservices mimarisi bilgisi',
        'Azure/AWS cloud deneyimi'
      ],
      benefits: [
        'Rekabetçi maaş',
        'Performans primi',
        'Teknoloji eğitimleri',
        'Sağlık sigortası',
        'Kariyer gelişim programı'
      ]
    },
    {
      id: 3,
      title: 'Business Analyst',
      department: 'İş Analizi',
      location: 'İstanbul / Remote',
      type: 'Tam Zamanlı',
      experience: '2+ yıl',
      description: 'İş süreçlerini analiz eden ve dijital çözümler için gereksinim belirleyen business analyst arıyoruz.',
      requirements: [
        '2+ yıl business analyst deneyimi',
        'İş süreçleri analizi ve modelleme',
        'UML, BPMN gibi metodolojiler',
        'SQL ve veri analizi bilgisi',
        'İngilizce iletişim yetisi'
      ],
      benefits: [
        'Rekabetçi maaş',
        'Esnek çalışma',
        'Müşteri ziyaretleri',
        'Sağlık sigortası',
        'Sertifikasyon desteği'
      ]
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Altyapı',
      location: 'İstanbul',
      type: 'Tam Zamanlı',
      experience: '4+ yıl',
      description: 'CI/CD pipeline\'ları ve cloud altyapısını yöneten deneyimli DevOps engineer arıyoruz.',
      requirements: [
        '4+ yıl DevOps/SysAdmin deneyimi',
        'Docker, Kubernetes uzmanlığı',
        'Azure/AWS cloud platformları',
        'CI/CD araçları (Jenkins, GitLab)',
        'Infrastructure as Code (Terraform)'
      ],
      benefits: [
        'Yüksek maaş',
        'On-call ek ödemeleri',
        'Teknoloji konferansları',
        'Sağlık sigortası',
        'Sertifikasyon desteği'
      ]
    }
  ];

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

      {/* Company Culture */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Neden Algotrom?</h2>
            <p className="text-xl text-gray-600">
              İş yaşamınızı daha anlamlı kılacak bir kültürün parçası olun
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {companyValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center border-gray-100">
                  <CardContent className="p-8">
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

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Açık Pozisyonlar</h2>
            <p className="text-xl text-gray-600">
              Takımımıza katılmak için aşağıdaki pozisyonları inceleyebilirsiniz
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position) => (
              <Card key={position.id} className="border-gray-100">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-3 mb-4">
                        <Badge variant="secondary">{position.department}</Badge>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{position.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{position.type}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="w-4 h-4 mr-1" />
                          <span className="text-sm">{position.experience}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        setSelectedPosition(position.title);
                        form.setValue('position', position.title);
                      }}
                      className="mt-4 lg:mt-0"
                    >
                      Başvur
                    </Button>
                  </div>

                  <p className="text-gray-700 mb-6">{position.description}</p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Aranan Özellikler</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Sunduklarımız</h4>
                      <ul className="space-y-2">
                        {position.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {selectedPosition && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Başvuru Formu</h3>
                    <p className="text-gray-600">
                      <strong>{selectedPosition}</strong> pozisyonu için başvuru yapıyorsunuz
                    </p>
                  </div>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ad Soyad *</FormLabel>
                            <FormControl>
                              <Input placeholder="Adınız ve soyadınız" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-posta *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="ornek@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="(5xx) xxx xx xx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ön Yazı *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Kendinizi tanıtın, neden bu pozisyon için uygun olduğunuzu açıklayın..." 
                                rows={6}
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          type="submit" 
                          className="flex-1" 
                          disabled={jobApplicationMutation.isPending}
                        >
                          {jobApplicationMutation.isPending ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => {
                            setSelectedPosition(null);
                            form.reset();
                          }}
                        >
                          İptal
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Aradığınız Pozisyon Burada Yok mu?
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
