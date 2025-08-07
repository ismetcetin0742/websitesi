import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Edit, 
  Users, 
  Heart, 
  Coffee, 
  Award, 
  TrendingUp, 
  Globe, 
  BookOpen, 
  Lightbulb, 
  Target,
  Upload,
  Plus,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'wouter';
import type { CareerContent, CareerBenefit } from '@shared/schema';

const contentUpdateSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir'),
  description: z.string().optional(),
});

const benefitSchema = z.object({
  type: z.enum(['value', 'benefit']),
  title: z.string().min(1, 'Başlık gereklidir'),
  description: z.string().min(1, 'Açıklama gereklidir'),
  iconName: z.string().min(1, 'İkon gereklidir'),
  displayOrder: z.number().min(0, 'Sıra numarası 0 veya daha büyük olmalıdır'),
  isActive: z.boolean(),
});

type ContentUpdateForm = z.infer<typeof contentUpdateSchema>;
type BenefitForm = z.infer<typeof benefitSchema>;

const iconOptions = [
  { value: 'Users', label: 'Kullanıcılar', icon: Users },
  { value: 'Heart', label: 'Kalp', icon: Heart },
  { value: 'Coffee', label: 'Kahve', icon: Coffee },
  { value: 'Award', label: 'Ödül', icon: Award },
  { value: 'TrendingUp', label: 'Trend Yukarı', icon: TrendingUp },
  { value: 'Globe', label: 'Dünya', icon: Globe },
  { value: 'BookOpen', label: 'Açık Kitap', icon: BookOpen },
  { value: 'Lightbulb', label: 'Ampul', icon: Lightbulb },
  { value: 'Target', label: 'Hedef', icon: Target },
  { value: 'Upload', label: 'Yükleme', icon: Upload },
];

export default function CareerContentManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedContent, setSelectedContent] = useState<CareerContent | null>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<CareerBenefit | null>(null);
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [isBenefitDialogOpen, setIsBenefitDialogOpen] = useState(false);

  // Fetch career content
  const { data: careerContent = [] } = useQuery<CareerContent[]>({
    queryKey: ['/api/career-content'],
  });

  // Fetch career benefits
  const { data: careerBenefits = [] } = useQuery<CareerBenefit[]>({
    queryKey: ['/api/career-benefits'],
  });

  const contentForm = useForm<ContentUpdateForm>({
    resolver: zodResolver(contentUpdateSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const benefitForm = useForm<BenefitForm>({
    resolver: zodResolver(benefitSchema),
    defaultValues: {
      type: 'value',
      title: '',
      description: '',
      iconName: 'Users',
      displayOrder: 0,
      isActive: true,
    },
  });

  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async (data: { section: string; updates: ContentUpdateForm }) => {
      return apiRequest(`/api/admin/career-content/${data.section}`, {
        method: 'PUT',
        body: JSON.stringify(data.updates),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/career-content'] });
      setIsContentDialogOpen(false);
      contentForm.reset();
      toast({
        title: 'Başarılı',
        description: 'İçerik güncellendi',
      });
    },
    onError: (error) => {
      toast({
        title: 'Hata',
        description: error instanceof Error ? error.message : 'İçerik güncellenirken hata oluştu',
        variant: 'destructive',
      });
    },
  });

  // Create/update benefit mutation
  const saveBenefitMutation = useMutation({
    mutationFn: async (data: { benefit: BenefitForm; isEdit: boolean; id?: string }) => {
      if (data.isEdit && data.id) {
        return apiRequest(`/api/admin/career-benefits/${data.id}`, {
          method: 'PUT',
          body: JSON.stringify(data.benefit),
        });
      } else {
        return apiRequest('/api/admin/career-benefits', {
          method: 'POST',
          body: JSON.stringify(data.benefit),
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/career-benefits'] });
      setIsBenefitDialogOpen(false);
      benefitForm.reset();
      setSelectedBenefit(null);
      toast({
        title: 'Başarılı',
        description: selectedBenefit ? 'Özellik güncellendi' : 'Özellik eklendi',
      });
    },
    onError: (error) => {
      toast({
        title: 'Hata',
        description: error instanceof Error ? error.message : 'İşlem başarısız',
        variant: 'destructive',
      });
    },
  });

  // Delete benefit mutation
  const deleteBenefitMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/admin/career-benefits/${id}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/career-benefits'] });
      toast({
        title: 'Başarılı',
        description: 'Özellik silindi',
      });
    },
    onError: (error) => {
      toast({
        title: 'Hata',
        description: error instanceof Error ? error.message : 'Silme işlemi başarısız',
        variant: 'destructive',
      });
    },
  });

  const openContentDialog = (content: CareerContent) => {
    setSelectedContent(content);
    contentForm.reset({
      title: content.title,
      description: content.description || '',
    });
    setIsContentDialogOpen(true);
  };

  const openBenefitDialog = (benefit?: CareerBenefit) => {
    setSelectedBenefit(benefit || null);
    if (benefit) {
      benefitForm.reset({
        type: benefit.type as 'value' | 'benefit',
        title: benefit.title,
        description: benefit.description,
        iconName: benefit.iconName,
        displayOrder: benefit.displayOrder,
        isActive: benefit.isActive,
      });
    } else {
      benefitForm.reset({
        type: 'value',
        title: '',
        description: '',
        iconName: 'Users',
        displayOrder: 0,
        isActive: true,
      });
    }
    setIsBenefitDialogOpen(true);
  };

  const onSubmitContent = (data: ContentUpdateForm) => {
    if (!selectedContent) return;
    updateContentMutation.mutate({ section: selectedContent.section, updates: data });
  };

  const onSubmitBenefit = (data: BenefitForm) => {
    saveBenefitMutation.mutate({
      benefit: data,
      isEdit: !!selectedBenefit,
      id: selectedBenefit?.id,
    });
  };

  const handleDeleteBenefit = (id: string) => {
    if (window.confirm('Bu özelliği silmek istediğinizden emin misiniz?')) {
      deleteBenefitMutation.mutate(id);
    }
  };

  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName);
    return iconOption ? iconOption.icon : Users;
  };

  const companyValues = careerBenefits.filter(b => b.type === 'value');
  const benefits = careerBenefits.filter(b => b.type === 'benefit');

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/careers">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kariyer İçerik Yönetimi</h1>
            <p className="text-gray-600 mt-2">
              Kariyer sayfasının içeriklerini ve özelliklerini yönetin
            </p>
          </div>
        </div>
      </div>

      {/* Career Content Sections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Sayfa İçerikleri</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {careerContent.map((content) => (
            <Card key={content.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    {content.section === 'hero' && 'Ana Başlık'}
                    {content.section === 'values-title' && 'Değerler Bölümü'}
                    {content.section === 'cta' && 'Çağrı Bölümü'}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openContentDialog(content)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">{content.title}</h3>
                {content.description && (
                  <p className="text-sm text-gray-600 line-clamp-3">{content.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Values */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Şirket Değerleri</h2>
          <Button onClick={() => openBenefitDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Değer Ekle
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {companyValues.map((value) => {
            const IconComponent = getIconComponent(value.iconName);
            return (
              <Card key={value.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openBenefitDialog(value)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteBenefit(value.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Sıra: {value.displayOrder} | {value.isActive ? 'Aktif' : 'Pasif'}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Çalışan Faydaları</h2>
          <Button onClick={() => {
            benefitForm.setValue('type', 'benefit');
            openBenefitDialog();
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Fayda Ekle
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const IconComponent = getIconComponent(benefit.iconName);
            return (
              <Card key={benefit.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openBenefitDialog(benefit)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteBenefit(benefit.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Sıra: {benefit.displayOrder} | {benefit.isActive ? 'Aktif' : 'Pasif'}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Content Edit Dialog */}
      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>İçerik Düzenle</DialogTitle>
          </DialogHeader>
          <Form {...contentForm}>
            <form onSubmit={contentForm.handleSubmit(onSubmitContent)} className="space-y-4">
              <FormField
                control={contentForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={contentForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsContentDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  disabled={updateContentMutation.isPending}
                >
                  {updateContentMutation.isPending ? 'Güncelleniyor...' : 'Güncelle'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Benefit Edit Dialog */}
      <Dialog open={isBenefitDialogOpen} onOpenChange={setIsBenefitDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedBenefit ? 'Özellik Düzenle' : 'Yeni Özellik Ekle'}
            </DialogTitle>
          </DialogHeader>
          <Form {...benefitForm}>
            <form onSubmit={benefitForm.handleSubmit(onSubmitBenefit)} className="space-y-4">
              <FormField
                control={benefitForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tür</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full p-2 border rounded-md">
                        <option value="value">Şirket Değeri</option>
                        <option value="benefit">Çalışan Faydası</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={benefitForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Başlık</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={benefitForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Açıklama</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={benefitForm.control}
                name="iconName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İkon</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full p-2 border rounded-md">
                        {iconOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={benefitForm.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sıra Numarası</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={benefitForm.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-y-0 pt-8">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="mr-2"
                        />
                      </FormControl>
                      <FormLabel>Aktif</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsBenefitDialogOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  disabled={saveBenefitMutation.isPending}
                >
                  {saveBenefitMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}