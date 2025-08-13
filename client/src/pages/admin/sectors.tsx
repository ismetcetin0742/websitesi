import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Edit,
  Trash2,
  Building2,
  Factory,
  ShoppingCart,
  Settings,
  Zap,
  Truck,
  TrendingUp,
  Save,
  X
} from 'lucide-react';

// Multi-language content helper
const createEmptyMultilingualContent = () => ({
  tr: '',
  en: '',
  fr: '',
  ar: '',
  ru: '',
  de: ''
});

// Sector icon mapping
const sectorIcons = {
  banking: Building2,
  manufacturing: Factory,
  retail: ShoppingCart,
  service: Settings,
  energy: Zap,
  logistics: Truck,
  default: Building2
};

export default function AdminSectors() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSector, setEditingSector] = useState<any>(null);

  // Form state for new/edit sector
  const [formData, setFormData] = useState({
    sectorKey: '',
    title: createEmptyMultilingualContent(),
    description: createEmptyMultilingualContent(),
    solutions: createEmptyMultilingualContent(),
    benefits: createEmptyMultilingualContent(),
    successStories: createEmptyMultilingualContent(),
    efficiencyRate: 86,
    isActive: true
  });

  // Fetch sectors
  const { data: sectors, isLoading } = useQuery({
    queryKey: ['/api/admin/sectors'],
    staleTime: 5 * 60 * 1000,
  });

  // Create sector mutation
  const createSectorMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('/api/admin/sectors', {
        method: 'POST',
        body: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/sectors'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sectors'] });
      toast({
        title: "Başarılı",
        description: "Yeni sektör başarıyla eklendi.",
      });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Sektör eklenirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });

  // Update sector mutation
  const updateSectorMutation = useMutation({
    mutationFn: async ({ sectorKey, data }: { sectorKey: string; data: any }) => {
      return apiRequest(`/api/admin/sectors/${sectorKey}`, {
        method: 'PUT',
        body: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/sectors'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sectors'] });
      toast({
        title: "Başarılı",
        description: "Sektör başarıyla güncellendi.",
      });
      setIsEditDialogOpen(false);
      setEditingSector(null);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Sektör güncellenirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });

  // Delete sector mutation
  const deleteSectorMutation = useMutation({
    mutationFn: async (sectorKey: string) => {
      return apiRequest(`/api/admin/sectors/${sectorKey}`, {
        method: 'DELETE'
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/sectors'] });
      queryClient.invalidateQueries({ queryKey: ['/api/sectors'] });
      toast({
        title: "Başarılı",
        description: "Sektör başarıyla silindi.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Sektör silinirken bir hata oluştu.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      sectorKey: '',
      title: createEmptyMultilingualContent(),
      description: createEmptyMultilingualContent(),
      solutions: createEmptyMultilingualContent(),
      benefits: createEmptyMultilingualContent(),
      successStories: createEmptyMultilingualContent(),
      efficiencyRate: 86,
      isActive: true
    });
  };

  const handleEdit = (sector: any) => {
    setEditingSector(sector);
    setFormData({
      sectorKey: sector.sectorKey,
      title: sector.title,
      description: sector.description,
      solutions: sector.solutions,
      benefits: sector.benefits,
      successStories: sector.successStories,
      efficiencyRate: sector.efficiencyRate,
      isActive: sector.isActive
    });
    setIsEditDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.sectorKey.trim()) {
      toast({
        title: "Hata",
        description: "Sektör anahtarı gereklidir.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.title.tr.trim()) {
      toast({
        title: "Hata",
        description: "Türkçe başlık gereklidir.",
        variant: "destructive",
      });
      return;
    }

    if (editingSector) {
      updateSectorMutation.mutate({
        sectorKey: editingSector.sectorKey,
        data: formData
      });
    } else {
      createSectorMutation.mutate(formData);
    }
  };

  const updateMultilingualField = (field: string, language: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...(prev[field as keyof typeof prev] as any),
        [language]: value
      }
    }));
  };

  // Create refs for all inputs
  const inputRefs = useRef<{[key: string]: HTMLInputElement | HTMLTextAreaElement}>({});

  const SectorForm = () => (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="sectorKey">Sektör Anahtarı (İngilizce, küçük harf)</Label>
          <Input
            id="sectorKey"
            value={formData.sectorKey}
            onChange={(e) => setFormData(prev => ({ ...prev, sectorKey: e.target.value.toLowerCase() }))}
            placeholder="banking, manufacturing, retail..."
            disabled={!!editingSector}
          />
        </div>
        
        <div>
          <Label htmlFor="efficiencyRate">Verimlilik Oranı (%)</Label>
          <Input
            id="efficiencyRate"
            type="number"
            value={formData.efficiencyRate}
            onChange={(e) => setFormData(prev => ({ ...prev, efficiencyRate: parseInt(e.target.value) || 86 }))}
            min="1"
            max="100"
          />
        </div>
      </div>

      {/* Multilingual Title */}
      <div className="space-y-4">
        <h4 className="font-semibold">Başlık (Tüm Diller)</h4>
        {Object.entries(formData.title).map(([lang, value]) => (
          <div key={`title-${lang}-${editingSector?.sectorKey || 'new'}`}>
            <Label htmlFor={`title-${lang}`}>{lang.toUpperCase()}</Label>
            <input
              ref={(el) => { if (el) inputRefs.current[`title-${lang}`] = el; }}
              id={`title-${lang}`}
              defaultValue={value || ''}
              onInput={(e) => updateMultilingualField('title', lang, (e.target as HTMLInputElement).value)}
              placeholder={`${lang.toUpperCase()} başlık`}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        ))}
      </div>

      {/* Multilingual Description */}
      <div className="space-y-4">
        <h4 className="font-semibold">Açıklama (Tüm Diller)</h4>
        {Object.entries(formData.description).map(([lang, value]) => (
          <div key={`desc-${lang}-${editingSector?.sectorKey || 'new'}`}>
            <Label htmlFor={`description-${lang}`}>{lang.toUpperCase()}</Label>
            <textarea
              ref={(el) => { if (el) inputRefs.current[`description-${lang}`] = el; }}
              id={`description-${lang}`}
              defaultValue={value || ''}
              onInput={(e) => updateMultilingualField('description', lang, (e.target as HTMLTextAreaElement).value)}
              placeholder={`${lang.toUpperCase()} açıklama`}
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        ))}
      </div>

      {/* Multilingual Solutions */}
      <div className="space-y-4">
        <h4 className="font-semibold">Çözümler (Tüm Diller)</h4>
        {Object.entries(formData.solutions).map(([lang, value]) => (
          <div key={`sol-${lang}-${editingSector?.sectorKey || 'new'}`}>
            <Label htmlFor={`solutions-${lang}`}>{lang.toUpperCase()}</Label>
            <textarea
              ref={(el) => { if (el) inputRefs.current[`solutions-${lang}`] = el; }}
              id={`solutions-${lang}`}
              defaultValue={value || ''}
              onInput={(e) => updateMultilingualField('solutions', lang, (e.target as HTMLTextAreaElement).value)}
              placeholder={`${lang.toUpperCase()} çözümler (• ile başlayın)`}
              rows={5}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        ))}
      </div>

      {/* Multilingual Benefits */}
      <div className="space-y-4">
        <h4 className="font-semibold">Faydalar (Tüm Diller)</h4>
        {Object.entries(formData.benefits).map(([lang, value]) => (
          <div key={`ben-${lang}-${editingSector?.sectorKey || 'new'}`}>
            <Label htmlFor={`benefits-${lang}`}>{lang.toUpperCase()}</Label>
            <textarea
              ref={(el) => { if (el) inputRefs.current[`benefits-${lang}`] = el; }}
              id={`benefits-${lang}`}
              defaultValue={value || ''}
              onInput={(e) => updateMultilingualField('benefits', lang, (e.target as HTMLTextAreaElement).value)}
              placeholder={`${lang.toUpperCase()} faydalar (• ile başlayın)`}
              rows={4}
              className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        ))}
      </div>

      {/* Multilingual Success Stories */}
      <div className="space-y-4">
        <h4 className="font-semibold">Başarı Hikayeleri (Tüm Diller)</h4>
        {Object.entries(formData.successStories).map(([lang, value]) => (
          <div key={`suc-${lang}-${editingSector?.sectorKey || 'new'}`}>
            <Label htmlFor={`successStories-${lang}`}>{lang.toUpperCase()}</Label>
            <textarea
              ref={(el) => { if (el) inputRefs.current[`successStories-${lang}`] = el; }}
              id={`successStories-${lang}`}
              defaultValue={value || ''}
              onInput={(e) => updateMultilingualField('successStories', lang, (e.target as HTMLTextAreaElement).value)}
              placeholder={`${lang.toUpperCase()} başarı hikayesi`}
              rows={4}
              className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="flex items-center"
          >
            ← Geri
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sektör Yönetimi</h1>
            <p className="text-gray-600">Sektörel çözümlerinizi yönetin</p>
          </div>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Sektör Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Yeni Sektör Ekle</DialogTitle>
            </DialogHeader>
            <SectorForm />
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={createSectorMutation.isPending}
              >
                <Save className="mr-2 h-4 w-4" />
                {createSectorMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                <X className="mr-2 h-4 w-4" />
                İptal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sectors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors?.map((sector: any) => {
          const IconComponent = sectorIcons[sector.sectorKey as keyof typeof sectorIcons] || sectorIcons.default;
          
          return (
            <Card key={sector.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{sector.title?.tr || 'Başlık Yok'}</CardTitle>
                      <Badge variant="secondary">{sector.sectorKey}</Badge>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    %{sector.efficiencyRate}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {sector.description?.tr || 'Açıklama yok'}
                </p>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(sector)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Sil
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Sektörü Sil</AlertDialogTitle>
                        <AlertDialogDescription>
                          "{sector.title?.tr}" sektörünü silmek istediğinizden emin misiniz? 
                          Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700"
                          onClick={() => deleteSectorMutation.mutate(sector.sectorKey)}
                          disabled={deleteSectorMutation.isPending}
                        >
                          {deleteSectorMutation.isPending ? 'Siliniyor...' : 'Sil'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Sektör Düzenle: {editingSector?.title?.tr}</DialogTitle>
          </DialogHeader>
          <SectorForm />
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={updateSectorMutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {updateSectorMutation.isPending ? 'Güncelleniyor...' : 'Güncelle'}
            </Button>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setEditingSector(null);
              resetForm();
            }}>
              <X className="mr-2 h-4 w-4" />
              İptal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {sectors?.length === 0 && (
        <div className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz sektör yok</h3>
          <p className="text-gray-600 mb-4">İlk sektörünüzü ekleyerek başlayın</p>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            İlk Sektörü Ekle
          </Button>
        </div>
      )}
    </div>
  );
}