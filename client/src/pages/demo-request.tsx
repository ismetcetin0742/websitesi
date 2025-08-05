import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import {
  Calendar,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

const demoRequestSchema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  company: z.string().min(2, 'Şirket adı en az 2 karakter olmalıdır'),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  companySize: z.string().optional(),
  industry: z.string().optional(),
  interestedSolutions: z.array(z.string()).optional(),
  message: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

type DemoRequestForm = z.infer<typeof demoRequestSchema>;

export default function DemoRequest() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<DemoRequestForm>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      jobTitle: '',
      companySize: '',
      industry: '',
      interestedSolutions: [],
      message: '',
      preferredContactMethod: 'email',
      preferredDate: '',
      preferredTime: '',
    },
  });

  const demoRequestMutation = useMutation({
    mutationFn: async (data: DemoRequestForm) => {
      return apiRequest('POST', '/api/demo-request', data);
    },
    onSuccess: () => {
      toast({
        title: 'Demo Talebiniz Alındı!',
        description: 'En kısa zamanda size dönüş yapacağız.',
      });
      setIsSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/demo-requests'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: DemoRequestForm) => {
    demoRequestMutation.mutate(data);
  };

  const solutions = [
    { id: 'eflow-bpm', name: 'e-Flow BPM' },
    { id: 'document-management', name: 'Döküman Yönetim Sistemi' },
    { id: 'integration', name: 'Entegrasyon Çözümleri' },
    { id: 'business-intelligence', name: 'İş Zekası & Raporlama' },
    { id: 'mobile', name: 'Mobil Çözümler' },
    { id: 'security', name: 'Güvenlik & Uyumluluk' }
  ];

  const industries = [
    'Üretim',
    'Hizmet',
    'Enerji',
    'Perakende',
    'İnşaat',
    'Lojistik',
    'Finans',
    'Sağlık',
    'Eğitim',
    'Diğer'
  ];

  const companySizes = [
    '1-10 çalışan',
    '11-50 çalışan',
    '51-200 çalışan',
    '201-1000 çalışan',
    '1000+ çalışan'
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Hızlı Kurulum',
      description: '30 dakikalık demo ile ürünü detaylı inceleyebilirsiniz'
    },
    {
      icon: Users,
      title: 'Uzman Desteği',
      description: 'Deneyimli uzmanlarımız size rehberlik eder'
    },
    {
      icon: Zap,
      title: 'Özelleştirilmiş',
      description: 'İşletmenizin ihtiyaçlarına özel demo hazırlanır'
    },
    {
      icon: Shield,
      title: 'Güvenli',
      description: 'Tüm demo süreçleri güvenli ortamda gerçekleşir'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="py-12">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Demo Talebiniz Başarıyla Alındı!
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Teşekkürler! Demo talebiniz başarıyla kaydedildi. 
                Uzmanlarımız en kısa zamanda sizinle iletişime geçecek.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sonraki Adımlar:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-gray-700">24 saat içinde uzmanımız sizinle iletişime geçecek</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-gray-700">Demo tarih ve saatini birlikte belirleyeceğiz</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-gray-700">İşletmenize özel demo sunumu gerçekleştirilecek</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => setIsSubmitted(false)}>
                  Yeni Demo Talep Et
                </Button>
                <Button variant="outline" asChild>
                  <a href="/contact">İletişime Geç</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Calendar className="w-12 h-12 text-primary" />
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Ücretsiz Demo Talep Edin
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Çözümlerimizi yakından inceleyin ve işletmeniz için nasıl fayda sağlayabileceğini keşfedin. 
              Uzmanlarımız size özel bir demo sunumu hazırlayacak.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Demo Talep Formu</h2>
                  <p className="text-gray-600">
                    Aşağıdaki bilgileri doldurarak kişiselleştirilmiş demo talebinde bulunun
                  </p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Kişisel Bilgiler</h3>
                      <div className="grid md:grid-cols-2 gap-6">
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
                                <Input type="email" placeholder="ornek@sirket.com" {...field} />
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
                          name="jobTitle"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ünvan</FormLabel>
                              <FormControl>
                                <Input placeholder="Pozisyonunuz" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Company Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Şirket Bilgileri</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Şirket Adı *</FormLabel>
                              <FormControl>
                                <Input placeholder="Şirket adınız" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sektör</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sektör seçin" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {industries.map((industry) => (
                                    <SelectItem key={industry} value={industry}>
                                      {industry}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="companySize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Şirket Büyüklüğü</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Çalışan sayısı" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {companySizes.map((size) => (
                                    <SelectItem key={size} value={size}>
                                      {size}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Interested Solutions */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">İlgilendiğiniz Çözümler</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {solutions.map((solution) => (
                          <FormField
                            key={solution.id}
                            control={form.control}
                            name="interestedSolutions"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={solution.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(solution.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), solution.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== solution.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {solution.name}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Demo Preferences */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">Demo Tercihleri</h3>
                      <div className="grid md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="preferredContactMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tercih Edilen İletişim</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="İletişim yöntemi" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="email">E-posta</SelectItem>
                                  <SelectItem value="phone">Telefon</SelectItem>
                                  <SelectItem value="teams">Microsoft Teams</SelectItem>
                                  <SelectItem value="zoom">Zoom</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tercih Edilen Tarih</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="preferredTime"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tercih Edilen Saat</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Saat seçin" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="09:00">09:00</SelectItem>
                                  <SelectItem value="10:00">10:00</SelectItem>
                                  <SelectItem value="11:00">11:00</SelectItem>
                                  <SelectItem value="14:00">14:00</SelectItem>
                                  <SelectItem value="15:00">15:00</SelectItem>
                                  <SelectItem value="16:00">16:00</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Additional Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ek Mesaj</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Özel ihtiyaçlarınız, sorularınız veya demo ile ilgili beklentileriniz..." 
                              rows={4}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={demoRequestMutation.isPending}
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      {demoRequestMutation.isPending ? 'Demo Talebi Gönderiliyor...' : 'Demo Talep Et'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Acil Durumlar İçin Direkt İletişim
            </h2>
            <p className="text-lg text-gray-600">
              Hemen konuşmak istiyorsanız aşağıdaki kanallardan bize ulaşabilirsiniz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-gray-100">
              <CardContent className="p-8">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefon</h3>
                <p className="text-gray-600 mb-4">Anında görüşme için</p>
                <p className="text-primary font-semibold">+90 212 XXX XX XX</p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-100">
              <CardContent className="p-8">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">E-posta</h3>
                <p className="text-gray-600 mb-4">Detaylı sorular için</p>
                <p className="text-primary font-semibold">demo@algotrom.com.tr</p>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-100">
              <CardContent className="p-8">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">Hızlı mesajlaşma</p>
                <p className="text-primary font-semibold">+90 5XX XXX XX XX</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
