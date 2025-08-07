import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Edit, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';
import { apiRequest } from '@/lib/queryClient';

const contactContentSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir'),
  description: z.string().optional(),
});

type ContactContentForm = z.infer<typeof contactContentSchema>;

interface ContactContent {
  id: string;
  section: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminContactContent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContactContent | null>(null);

  const { data: contactContent, isLoading } = useQuery<ContactContent[]>({
    queryKey: ['/api/contact-content'],
  });

  const form = useForm<ContactContentForm>({
    resolver: zodResolver(contactContentSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ContactContentForm & { section: string }) => {
      return apiRequest('PUT', `/api/admin/contact-content/${data.section}`, {
        title: data.title,
        description: data.description,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Başarılı',
        description: 'İçerik başarıyla güncellendi.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contact-content'] });
      setEditModalOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.message || 'Güncelleme sırasında bir hata oluştu.',
        variant: 'destructive',
      });
    },
  });

  const handleEdit = (content: ContactContent) => {
    setSelectedContent(content);
    form.reset({
      title: content.title,
      description: content.description || '',
    });
    setEditModalOpen(true);
  };

  const onSubmit = (data: ContactContentForm) => {
    if (selectedContent) {
      updateMutation.mutate({
        ...data,
        section: selectedContent.section,
      });
    }
  };

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'hero':
        return 'Ana Başlık';
      case 'form-title':
        return 'Form Başlığı';
      default:
        return section;
    }
  };

  const getSectionDescription = (section: string) => {
    switch (section) {
      case 'hero':
        return 'İletişim sayfasının ana başlık ve açıklama metni';
      case 'form-title':
        return 'İletişim formunun başlık ve açıklama metni';
      default:
        return 'İçerik bölümü';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/contact">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">İletişim İçerik Yönetimi</h1>
            <p className="text-gray-600 mt-2">
              İletişim sayfasının başlık ve açıklama metinlerini yönetin
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {contactContent?.map((content) => (
          <Card key={content.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    {getSectionTitle(content.section)}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {getSectionDescription(content.section)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(content)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">Başlık:</h4>
                  <p className="text-gray-600">{content.title}</p>
                </div>
                {content.description && (
                  <div>
                    <h4 className="font-medium text-gray-900">Açıklama:</h4>
                    <p className="text-gray-600">{content.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedContent ? getSectionTitle(selectedContent.section) : ''} Düzenle
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input placeholder="Başlık giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama (İsteğe bağlı)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Açıklama giriniz" 
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditModalOpen(false)}
                >
                  İptal
                </Button>
                <Button 
                  type="submit" 
                  disabled={updateMutation.isPending}
                >
                  {updateMutation.isPending ? 'Güncelleniyor...' : 'Güncelle'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}