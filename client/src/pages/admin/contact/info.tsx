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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus, ArrowLeft, MapPin, Phone, Mail, Clock, Settings } from 'lucide-react';
import { Link } from 'wouter';
import { apiRequest } from '@/lib/queryClient';

const contactInfoSchema = z.object({
  type: z.string().min(1, 'Tip gereklidir'),
  title: z.string().min(1, 'Başlık gereklidir'),
  content: z.string().min(1, 'İçerik gereklidir'),
  iconName: z.string().min(1, 'İkon seçimi gereklidir'),
  displayOrder: z.number().min(0),
  isActive: z.boolean(),
});

type ContactInfoForm = z.infer<typeof contactInfoSchema>;

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

const iconOptions = [
  { value: 'MapPin', label: 'Konum', icon: MapPin },
  { value: 'Phone', label: 'Telefon', icon: Phone },
  { value: 'Mail', label: 'E-posta', icon: Mail },
  { value: 'Clock', label: 'Saat', icon: Clock },
  { value: 'Settings', label: 'Ayarlar', icon: Settings },
];

const typeOptions = [
  { value: 'address', label: 'Adres' },
  { value: 'phone', label: 'Telefon' },
  { value: 'email', label: 'E-posta' },
  { value: 'hours', label: 'Çalışma Saatleri' },
  { value: 'other', label: 'Diğer' },
];

export default function AdminContactInfo() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<ContactInfo | null>(null);

  const { data: contactInfo, isLoading } = useQuery<ContactInfo[]>({
    queryKey: ['/api/contact-info'],
  });

  const form = useForm<ContactInfoForm>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      type: '',
      title: '',
      content: '',
      iconName: '',
      displayOrder: 0,
      isActive: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: ContactInfoForm) => {
      return apiRequest('POST', '/api/admin/contact-info', {
        ...data,
        content: data.content.split('\n').filter(line => line.trim() !== ''),
      });
    },
    onSuccess: () => {
      toast({
        title: 'Başarılı',
        description: 'İletişim bilgisi başarıyla oluşturuldu.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contact-info'] });
      setCreateModalOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.message || 'Oluşturma sırasında bir hata oluştu.',
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ContactInfoForm & { id: string }) => {
      return apiRequest('PUT', `/api/admin/contact-info/${data.id}`, {
        type: data.type,
        title: data.title,
        content: data.content.split('\n').filter(line => line.trim() !== ''),
        iconName: data.iconName,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Başarılı',
        description: 'İletişim bilgisi başarıyla güncellendi.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contact-info'] });
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

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/admin/contact-info/${id}`);
    },
    onSuccess: () => {
      toast({
        title: 'Başarılı',
        description: 'İletişim bilgisi başarıyla silindi.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contact-info'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Hata',
        description: error.message || 'Silme sırasında bir hata oluştu.',
        variant: 'destructive',
      });
    },
  });

  const handleEdit = (info: ContactInfo) => {
    setSelectedInfo(info);
    form.reset({
      type: info.type,
      title: info.title,
      content: info.content.join('\n'),
      iconName: info.iconName,
      displayOrder: info.displayOrder,
      isActive: info.isActive,
    });
    setEditModalOpen(true);
  };

  const handleCreate = () => {
    form.reset({
      type: '',
      title: '',
      content: '',
      iconName: '',
      displayOrder: (contactInfo?.length || 0) + 1,
      isActive: true,
    });
    setCreateModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu iletişim bilgisini silmek istediğinizden emin misiniz?')) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: ContactInfoForm) => {
    if (selectedInfo) {
      updateMutation.mutate({ ...data, id: selectedInfo.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const getIcon = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName);
    return iconOption ? iconOption.icon : Settings;
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
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">İletişim Bilgileri Yönetimi</h1>
            <p className="text-gray-600 mt-2">
              Adres, telefon, e-posta ve diğer iletişim bilgilerini yönetin
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Bilgi Ekle
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {contactInfo?.map((info) => {
          const IconComponent = getIcon(info.iconName);
          return (
            <Card key={info.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {info.title}
                        {!info.isActive && (
                          <Badge variant="secondary">Pasif</Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-gray-600">
                        {typeOptions.find(t => t.value === info.type)?.label || info.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(info)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(info.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {info.content.map((line, index) => (
                    <p key={index} className="text-gray-600">{line}</p>
                  ))}
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Sıra: {info.displayOrder}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={createModalOpen || editModalOpen} onOpenChange={(open) => {
        setCreateModalOpen(false);
        setEditModalOpen(false);
        if (!open) {
          setSelectedInfo(null);
          form.reset();
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedInfo ? 'İletişim Bilgisi Düzenle' : 'Yeni İletişim Bilgisi'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tip</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Bilgi tipini seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {typeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
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
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İçerik (Her satıra bir bilgi)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Her satıra bir bilgi yazın..." 
                        rows={6}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="iconName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İkon</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="İkon seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {iconOptions.map((option) => {
                          const IconComponent = option.icon;
                          return (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <IconComponent className="w-4 h-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sıralama</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Sıra numarası" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Aktif</FormLabel>
                      <p className="text-sm text-gray-600">
                        Bu bilgiyi sitede göster
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setCreateModalOpen(false);
                    setEditModalOpen(false);
                  }}
                >
                  İptal
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {createMutation.isPending || updateMutation.isPending 
                    ? 'Kaydediliyor...' 
                    : selectedInfo ? 'Güncelle' : 'Oluştur'
                  }
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}