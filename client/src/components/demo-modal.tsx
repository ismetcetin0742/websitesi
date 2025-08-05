import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useLanguage } from './language-provider';
import { t } from '@/lib/i18n';

const demoRequestSchema = z.object({
  name: z.string().min(2, 'Ad soyad en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  company: z.string().min(2, 'Şirket adı en az 2 karakter olmalıdır'),
  message: z.string().optional(),
});

type DemoRequestForm = z.infer<typeof demoRequestSchema>;

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<DemoRequestForm>({
    resolver: zodResolver(demoRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const demoRequestMutation = useMutation({
    mutationFn: async (data: DemoRequestForm) => {
      return apiRequest('POST', '/api/demo-request', data);
    },
    onSuccess: () => {
      toast({
        title: 'Teşekkürler!',
        description: 'Demo talebiniz alındı. En kısa zamanda size dönüş yapacağız.',
      });
      form.reset();
      onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {t('nav.demoRequest', language)}
          </h3>
          <p className="text-gray-600">
            Uzmanlarımızla görüşün ve ücretsiz demo alın
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesaj</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="İhtiyaçlarınız ve sorularınız..." 
                      rows={3}
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
              disabled={demoRequestMutation.isPending}
            >
              {demoRequestMutation.isPending ? 'Gönderiliyor...' : t('nav.demoRequest', language)}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
