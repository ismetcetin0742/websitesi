import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Users,
  Heart,
  Coffee,
  Award,
  TrendingUp,
  Globe,
  BookOpen,
  Lightbulb,
  Target,
  Upload
} from 'lucide-react';
import type { CareerContent, CareerBenefit } from '@shared/schema';

const cvApplicationSchema = z.object({
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  cv: z.instanceof(File).refine(
    (file) => file && file.size <= 15 * 1024 * 1024,
    'CV dosyası 15MB\'dan küçük olmalıdır'
  ).refine(
    (file) => file && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(file.type),
    'Sadece PDF, DOC, DOCX ve TXT dosyaları kabul edilir'
  ),
});

type CVApplicationForm = z.infer<typeof cvApplicationSchema>;

const iconComponents: { [key: string]: any } = {
  Users,
  Heart,
  Coffee,
  Award,
  TrendingUp,
  Globe,
  BookOpen,
  Lightbulb,
  Target,
  Upload
};

export default function Career() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const form = useForm<CVApplicationForm>({
    resolver: zodResolver(cvApplicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
  });

  // Fetch career content
  const { data: careerContent = [] } = useQuery<CareerContent[]>({
    queryKey: ['/api/career-content'],
  });

  // Fetch career benefits
  const { data: careerBenefits = [] } = useQuery<CareerBenefit[]>({
    queryKey: ['/api/career-benefits'],
  });

  const onSubmit = (data: CVApplicationForm) => {
    console.log('CV Başvurusu:', data);
    // Burada CV gönderme işlemi yapılacak
    setIsDialogOpen(false);
    form.reset();
  };

  // Organize content by section
  const heroContent = careerContent.find(c => c.section === 'hero');
  const valuesTitle = careerContent.find(c => c.section === 'values-title');
  const ctaContent = careerContent.find(c => c.section === 'cta');

  // Separate values and benefits
  const companyValues = careerBenefits.filter(b => b.type === 'value' && b.isActive);
  const benefits = careerBenefits.filter(b => b.type === 'benefit' && b.isActive);

  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {heroContent?.title || 'Kariyer Fırsatları'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {heroContent?.description || 'Teknoloji tutkunu, yenilikçi ve gelişime açık ekip arkadaşları arıyoruz. Birlikte geleceğin teknolojilerini şekillendirelim.'}
            </p>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{valuesTitle?.title || 'Değerlerimiz'}</h2>
            <p className="text-xl text-gray-600">
              {valuesTitle?.description || 'Algotrom\'da çalışmanın anlamı'}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {companyValues.map((value) => {
              const IconComponent = iconComponents[value.iconName] || Users;
              return (
                <Card key={value.id} className="border-gray-100 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-primary" />
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
            {benefits.map((benefit) => {
              const IconComponent = iconComponents[benefit.iconName] || Coffee;
              return (
                <div key={benefit.id} className="flex items-start p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
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
            {ctaContent?.title || 'Bizimle Çalışmak İster misiniz?'}
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            {ctaContent?.description || 'CV\'nizi bize gönderin, uygun pozisyon açıldığında size haber verelim. Her zaman yetenekli kişilerle tanışmaktan mutluluk duyarız.'}
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="secondary">
                CV Gönder
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>CV Gönder</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad *</FormLabel>
                        <FormControl>
                          <Input placeholder="Adınız" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soyad *</FormLabel>
                        <FormControl>
                          <Input placeholder="Soyadınız" {...field} />
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
                    name="cv"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormLabel>CV Dosyası *</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) onChange(file);
                              }}
                              {...field}
                            />
                            <Upload className="w-4 h-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <p className="text-xs text-gray-500">
                          Maksimum 15MB - PDF, DOC, DOCX, TXT formatları
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1">
                      Gönder
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      İptal
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}