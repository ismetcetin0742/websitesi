import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
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
  Settings
} from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
});

type ContactForm = z.infer<typeof contactSchema>;

interface ContactContent {
  id: string;
  section: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ContactInfo {
  id: string;
  type: string;
  title: string;
  content: string[];
  iconName: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguage();

  // Fetch dynamic contact content
  const { data: contactContent } = useQuery<ContactContent[]>({
    queryKey: ['/api/contact-content'],
  });

  // Fetch dynamic contact info
  const { data: contactInfo } = useQuery<ContactInfo[]>({
    queryKey: ['/api/contact-info'],
  });

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
    mutationFn: (data: ContactForm) => apiRequest('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    onSuccess: () => {
      toast({
        title: 'Mesajınız gönderildi!',
        description: 'En kısa sürede size dönüş yapacağız.',
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: 'Hata!',
        description: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: ContactForm) => {
    contactMutation.mutate(data);
  };

  const getContentBySection = (section: string) => {
    return contactContent?.find(c => c.section === section);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin': return MapPin;
      case 'Phone': return Phone;
      case 'Mail': return Mail;
      case 'Clock': return Clock;
      default: return Settings;
    }
  };

  // Get dynamic content or fallback
  const heroContent = getContentBySection('hero');
  const formTitleContent = getContentBySection('form-title');
  
  // Use dynamic contact info or fallback to static
  const activeContactInfo = contactInfo?.filter(info => info.isActive) || [];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {heroContent?.title || t('nav.contact', language)}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {heroContent?.description || 'Sorularınız, projeleriniz veya iş birliği teklifleriniz için bizimle iletişime geçin. Uzman ekibimiz size yardımcı olmaktan mutluluk duyar.'}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Contact Information Cards */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  İletişim Bilgilerimiz
                </h2>
                <p className="text-lg text-gray-600">
                  Bize aşağıdaki iletişim kanallarından ulaşabilirsiniz.
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {activeContactInfo.map((info) => {
                  const IconComponent = getIcon(info.iconName);
                  return (
                    <Card key={info.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                          <IconComponent className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.content.map((line, index) => (
                            <p key={index} className="text-gray-600">
                              {line}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Contact Form and Map Section */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-lg">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {formTitleContent?.title || 'Bize Mesaj Gönderin'}
                  </h2>
                  <p className="text-gray-600">
                    {formTitleContent?.description || 'Aşağıdaki formu doldurarak bize ulaşabilirsiniz. 24 saat içinde size dönüş yapacağız.'}
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
                            <Input 
                              placeholder="Adınız ve soyadınız" 
                              {...field} 
                              className="border-gray-300 focus:border-blue-500"
                            />
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
                            <Input 
                              placeholder="Telefon numaranız" 
                              {...field} 
                              className="border-gray-300 focus:border-blue-500"
                            />
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
                            <Input 
                              type="email" 
                              placeholder="E-posta adresiniz" 
                              {...field} 
                              className="border-gray-300 focus:border-blue-500"
                            />
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
                          <FormLabel>Mesajınız *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Mesajınızı buraya yazınız..." 
                              rows={6}
                              {...field} 
                              className="border-gray-300 focus:border-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={contactMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
                    >
                      {contactMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Gönderiliyor...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Mesaj Gönder
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Map Section */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
                <div className="h-96 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.6568436842!2d29.126783815!3d41.019107379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac84c3e0d3b1f%3A0x8a3d1e2c3a2b1c1d!2sAlgotrom%20Yaz%C4%B1l%C4%B1m%20Ve%20Teknoloji%2C%20Barbaros%20Mh.%2C%20Begonya%20Sk.%20No%3A1%2C%2034746%20Ata%C5%9Fehir%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1735795678901!5m2!1str!2str&markers=color:red%7Clabel:Algotrom%7C41.019107379,29.126783815"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Algotrom Yazılım Ve Teknoloji - Barbaros Mahallesi, Begonya Sokak No:1, Ataşehir"
                  ></iframe>
                </div>
                <div className="p-4">
                  <Button 
                    onClick={() => window.open('https://maps.app.goo.gl/uZzZrFV61pR3h5xdA', '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Harita'da Aç
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}