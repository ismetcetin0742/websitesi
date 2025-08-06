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
  MessageSquare
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
        'Barbaros Mah. Begonya Sok.',
        'Nidakule Ataşehir Batı No: 1 İç Kapı No: 2',
        'ATAŞEHİR / İSTANBUL'
      ]
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: [
        '+90 545 514 74 02'
      ]
    },
    {
      icon: Mail,
      title: 'E-posta',
      content: [
        'info@algotrom.com.tr',
        'destek@algotrom.com.tr'
      ]
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      content: [
        'Hafta İçi',
        '09:00 - 18:00',
        'Cumartesi',
        '09:00 - 14:00',
        'Pazar Kapalı'
      ]
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
                  <div className="w-full h-full rounded-lg overflow-hidden">
                    <iframe 
                      src="https://maps.google.com/maps?q=Barbaros+Mah.+Begonya+Sok.+Nidakule+Ata%C5%9Fehir+Bat%C4%B1+No:+1+%C4%B0%C3%A7+Kap%C4%B1+No:+2+ATA%C5%9EEH%C4%B0R+%C4%B0STANBUL&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0, minHeight: '600px' }}
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Algotrom Ofis Konumu"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <a 
                      href="https://maps.app.goo.gl/agAi999NKUb6V9i57" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                    >
                      <MapPin className="w-5 h-5 mr-2" />
                      Google Maps'te Aç
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>




    </div>
  );
}
