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
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/i18n';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Users,
  Building
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: 'Mesajınız Gönderildi!',
        description: 'En kısa zamanda size dönüş yapacağız.',
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.message || 'Bir hata oluştu. Lütfen tekrar deneyiniz.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adres',
      content: [
        'Maslak Mahallesi, Büyükdere Cad.',
        'No: 123, Kat: 8',
        '34485 Sarıyer/İstanbul'
      ]
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: [
        '+90 212 XXX XX XX',
        '+90 212 XXX XX XX (Fax)'
      ]
    },
    {
      icon: Mail,
      title: 'E-posta',
      content: [
        'info@algotrom.com.tr',
        'destek@algotrom.com.tr',
        'kariyer@algotrom.com.tr'
      ]
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      content: [
        'Pazartesi - Cuma: 09:00 - 18:00',
        'Cumartesi: 09:00 - 14:00',
        'Pazar: Kapalı'
      ]
    }
  ];

  const departments = [
    {
      icon: Users,
      title: 'Satış Danışmanlığı',
      description: 'Ürün ve çözümlerimiz hakkında bilgi almak için',
      contact: 'satis@algotrom.com.tr',
      phone: '+90 212 XXX XX 01'
    },
    {
      icon: Headphones,
      title: 'Teknik Destek',
      description: 'Mevcut ürünlerinizle ilgili teknik destek için',
      contact: 'destek@algotrom.com.tr',
      phone: '+90 212 XXX XX 02'
    },
    {
      icon: Building,
      title: 'Kurumsal İşbirlikleri',
      description: 'İş ortaklıkları ve kurumsal projeler için',
      contact: 'kurumsal@algotrom.com.tr',
      phone: '+90 212 XXX XX 03'
    }
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('nav.contact', language)}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Sorularınız, projeleriniz veya iş birliği teklifleriniz için bizimle iletişime geçin. 
              Uzman ekibimiz size yardımcı olmaktan mutluluk duyar.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center border-gray-100">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.content.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-gray-600">{line}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Departments */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Departmanlarımız</h2>
            <p className="text-lg text-gray-600">İhtiyacınıza göre doğru departmanla iletişime geçin</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <Card key={index} className="hover-lift border-gray-100">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{dept.title}</h3>
                    <p className="text-gray-600 mb-4">{dept.description}</p>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium text-primary">{dept.contact}</p>
                      <p className="text-gray-600">{dept.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      <MessageSquare className="w-8 h-8 text-primary inline-block mr-3" />
                      Bize Mesaj Gönderin
                    </h3>
                    <p className="text-gray-600">
                      Aşağıdaki formu doldurarak bize ulaşabilirsiniz. 
                      24 saat içinde size dönüş yapacağız.
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
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mesaj *</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Mesajınızı buraya yazın..." 
                                rows={6}
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
                        disabled={contactMutation.isPending}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {contactMutation.isPending ? 'Gönderiliyor...' : 'Mesajı Gönder'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div>
              <Card className="h-full">
                <CardContent className="p-0 h-full min-h-[600px]">
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-gray-700 mb-2">
                        Google Maps Entegrasyonu
                      </h4>
                      <p className="text-gray-600 mb-4">
                        Ofisimizin konumunu görmek için haritayı kullanın
                      </p>
                      <div className="text-sm text-gray-500">
                        <p>Maslak Mahallesi, Büyükdere Cad.</p>
                        <p>No: 123, Kat: 8</p>
                        <p>34485 Sarıyer/İstanbul</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Diğer İletişim Yolları</h2>
            <p className="text-lg text-gray-600">
              Size en uygun iletişim kanalını seçin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-gray-100">
              <CardContent className="p-8">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Telefon Desteği</h3>
                <p className="text-gray-600 mb-4">
                  Acil durumlar için telefon ile anında destek alın
                </p>
                <Button variant="outline">
                  Hemen Ara
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-100">
              <CardContent className="p-8">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">WhatsApp Destek</h3>
                <p className="text-gray-600 mb-4">
                  WhatsApp üzerinden hızlı mesajlaşma desteği
                </p>
                <Button variant="outline">
                  WhatsApp'ta Yaz
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-gray-100">
              <CardContent className="p-8">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">E-posta Desteği</h3>
                <p className="text-gray-600 mb-4">
                  Detaylı sorular için e-posta ile iletişim
                </p>
                <Button variant="outline">
                  E-posta Gönder
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sıkça Sorulan Sorular</h2>
            <p className="text-lg text-gray-600">
              En çok merak edilen konulara hızlı yanıtlar
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Demo talep etmek ücretsiz mi?',
                answer: 'Evet, ürün demolarımız tamamen ücretsizdir. Uzmanlarımız size ürünlerimizi detaylı olarak tanıtır.'
              },
              {
                question: 'Implementasyon süresi ne kadar?',
                answer: 'Proje büyüklüğüne göre değişmekle birlikte, ortalama 4-12 hafta arasında tamamlanmaktadır.'
              },
              {
                question: 'Teknik destek hizmeti var mı?',
                answer: 'Evet, 7/24 teknik destek hizmeti sunuyoruz. Telefon, e-posta ve uzaktan erişim ile destek alabilirsiniz.'
              },
              {
                question: 'Mevcut sistemlerimizle entegre olabilir mi?',
                answer: 'Evet, çözümlerimiz mevcut ERP, CRM ve diğer sistemlerle sorunsuz entegre olabilir.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border-gray-100">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h4>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
