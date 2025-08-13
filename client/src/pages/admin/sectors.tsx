import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ArrowLeft, Plus, Edit, Trash2, Save, X, TrendingUp } from "lucide-react";
import { 
  Building2, 
  Heart, 
  ShoppingCart, 
  GraduationCap, 
  Car, 
  Plane, 
  Home,
  HardHat,
  Briefcase
} from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

// Sector icons mapping
const sectorIcons = {
  banking: Building2,
  healthcare: Heart,
  retail: ShoppingCart,
  education: GraduationCap,
  automotive: Car,
  aviation: Plane,
  realestate: Home,
  manufacturing: HardHat,
  insurance: Briefcase,
  default: Building2,
};

// Create empty multilingual content structure
const createEmptyMultilingualContent = () => ({
  tr: '',
  en: '',
  fr: '',
  ar: '',
  ru: '',
  de: ''
});

export default function AdminSectors() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSector, setEditingSector] = useState<any>(null);

  // Form fields
  const [sectorKey, setSectorKey] = useState('');
  const [titleTr, setTitleTr] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [titleFr, setTitleFr] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [titleDe, setTitleDe] = useState('');
  
  const [descTr, setDescTr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descFr, setDescFr] = useState('');
  const [descAr, setDescAr] = useState('');
  const [descRu, setDescRu] = useState('');
  const [descDe, setDescDe] = useState('');
  
  const [solTr, setSolTr] = useState('');
  const [solEn, setSolEn] = useState('');
  const [solFr, setSolFr] = useState('');
  const [solAr, setSolAr] = useState('');
  const [solRu, setSolRu] = useState('');
  const [solDe, setSolDe] = useState('');
  
  const [benTr, setBenTr] = useState('');
  const [benEn, setBenEn] = useState('');
  const [benFr, setBenFr] = useState('');
  const [benAr, setBenAr] = useState('');
  const [benRu, setBenRu] = useState('');
  const [benDe, setBenDe] = useState('');
  
  const [sucTr, setSucTr] = useState('');
  const [sucEn, setSucEn] = useState('');
  const [sucFr, setSucFr] = useState('');
  const [sucAr, setSucAr] = useState('');
  const [sucRu, setSucRu] = useState('');
  const [sucDe, setSucDe] = useState('');
  
  const [efficiencyRate, setEfficiencyRate] = useState(86);
  const [isActive, setIsActive] = useState(true);

  // Fetch sectors
  const { data: sectors, isLoading } = useQuery({
    queryKey: ['/api/admin/sectors'],
  });

  // Create sector mutation
  const createSectorMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('/api/admin/sectors', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/sectors'] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast({
        title: "Başarılı",
        description: "Sektör başarıyla oluşturuldu",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Sektör oluşturulamadı",
        variant: "destructive",
      });
    },
  });

  // Update sector mutation
  const updateSectorMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest(`/api/admin/sectors/${editingSector?.sectorKey}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/sectors'] });
      setIsEditDialogOpen(false);
      setEditingSector(null);
      resetForm();
      toast({
        title: "Başarılı",
        description: "Sektör başarıyla güncellendi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Sektör güncellenemedi",
        variant: "destructive",
      });
    },
  });

  // Delete sector mutation
  const deleteSectorMutation = useMutation({
    mutationFn: async (sectorKey: string) => {
      return await apiRequest(`/api/admin/sectors/${sectorKey}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/sectors'] });
      toast({
        title: "Başarılı",
        description: "Sektör başarıyla silindi",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Hata",
        description: error.message || "Sektör silinemedi",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setSectorKey('');
    setTitleTr(''); setTitleEn(''); setTitleFr(''); setTitleAr(''); setTitleRu(''); setTitleDe('');
    setDescTr(''); setDescEn(''); setDescFr(''); setDescAr(''); setDescRu(''); setDescDe('');
    setSolTr(''); setSolEn(''); setSolFr(''); setSolAr(''); setSolRu(''); setSolDe('');
    setBenTr(''); setBenEn(''); setBenFr(''); setBenAr(''); setBenRu(''); setBenDe('');
    setSucTr(''); setSucEn(''); setSucFr(''); setSucAr(''); setSucRu(''); setSucDe('');
    setEfficiencyRate(86);
    setIsActive(true);
  };

  const handleEdit = (sector: any) => {
    setEditingSector(sector);
    setSectorKey(sector.sectorKey);
    setTitleTr(sector.title?.tr || ''); setTitleEn(sector.title?.en || ''); setTitleFr(sector.title?.fr || '');
    setTitleAr(sector.title?.ar || ''); setTitleRu(sector.title?.ru || ''); setTitleDe(sector.title?.de || '');
    setDescTr(sector.description?.tr || ''); setDescEn(sector.description?.en || ''); setDescFr(sector.description?.fr || '');
    setDescAr(sector.description?.ar || ''); setDescRu(sector.description?.ru || ''); setDescDe(sector.description?.de || '');
    setSolTr(sector.solutions?.tr || ''); setSolEn(sector.solutions?.en || ''); setSolFr(sector.solutions?.fr || '');
    setSolAr(sector.solutions?.ar || ''); setSolRu(sector.solutions?.ru || ''); setSolDe(sector.solutions?.de || '');
    setBenTr(sector.benefits?.tr || ''); setBenEn(sector.benefits?.en || ''); setBenFr(sector.benefits?.fr || '');
    setBenAr(sector.benefits?.ar || ''); setBenRu(sector.benefits?.ru || ''); setBenDe(sector.benefits?.de || '');
    setSucTr(sector.successStories?.tr || ''); setSucEn(sector.successStories?.en || ''); setSucFr(sector.successStories?.fr || '');
    setSucAr(sector.successStories?.ar || ''); setSucRu(sector.successStories?.ru || ''); setSucDe(sector.successStories?.de || '');
    setEfficiencyRate(sector.efficiencyRate);
    setIsActive(sector.isActive);
    setIsEditDialogOpen(true);
  };

  const handleSubmit = () => {
    const formData = {
      sectorKey,
      title: { tr: titleTr, en: titleEn, fr: titleFr, ar: titleAr, ru: titleRu, de: titleDe },
      description: { tr: descTr, en: descEn, fr: descFr, ar: descAr, ru: descRu, de: descDe },
      solutions: { tr: solTr, en: solEn, fr: solFr, ar: solAr, ru: solRu, de: solDe },
      benefits: { tr: benTr, en: benEn, fr: benFr, ar: benAr, ru: benRu, de: benDe },
      successStories: { tr: sucTr, en: sucEn, fr: sucFr, ar: sucAr, ru: sucRu, de: sucDe },
      efficiencyRate,
      isActive
    };

    if (editingSector) {
      updateSectorMutation.mutate(formData);
    } else {
      createSectorMutation.mutate(formData);
    }
  };

  const SectorForm = () => (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto">
      {/* Basic Info */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="sectorKey">Sektör Anahtarı</Label>
          <input
            id="sectorKey"
            value={sectorKey}
            onChange={(e) => setSectorKey(e.target.value)}
            placeholder="banking, healthcare, retail..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="efficiencyRate">Verimlilik Oranı (%)</Label>
            <input
              id="efficiencyRate"
              type="number"
              value={efficiencyRate}
              onChange={(e) => setEfficiencyRate(Number(e.target.value))}
              min="0"
              max="100"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          
          <div className="flex items-center space-x-2 pt-6">
            <input
              id="isActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded"
            />
            <Label htmlFor="isActive">Aktif</Label>
          </div>
        </div>
      </div>

      {/* Title Fields */}
      <div className="space-y-4">
        <h4 className="font-semibold">Başlık (Tüm Diller)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>TR</Label>
            <input value={titleTr} onChange={(e) => setTitleTr(e.target.value)} placeholder="Türkçe başlık" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>EN</Label>
            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} placeholder="English title" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>FR</Label>
            <input value={titleFr} onChange={(e) => setTitleFr(e.target.value)} placeholder="Titre français" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>AR</Label>
            <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="عنوان عربي" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>RU</Label>
            <input value={titleRu} onChange={(e) => setTitleRu(e.target.value)} placeholder="Русский заголовок" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>DE</Label>
            <input value={titleDe} onChange={(e) => setTitleDe(e.target.value)} placeholder="Deutscher Titel" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
        </div>
      </div>

      {/* Description Fields */}
      <div className="space-y-4">
        <h4 className="font-semibold">Açıklama (Tüm Diller)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>TR</Label>
            <textarea value={descTr} onChange={(e) => setDescTr(e.target.value)} placeholder="Türkçe açıklama" rows={3} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>EN</Label>
            <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} placeholder="English description" rows={3} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>FR</Label>
            <textarea value={descFr} onChange={(e) => setDescFr(e.target.value)} placeholder="Description française" rows={3} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>AR</Label>
            <textarea value={descAr} onChange={(e) => setDescAr(e.target.value)} placeholder="وصف عربي" rows={3} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>RU</Label>
            <textarea value={descRu} onChange={(e) => setDescRu(e.target.value)} placeholder="Русское описание" rows={3} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>DE</Label>
            <textarea value={descDe} onChange={(e) => setDescDe(e.target.value)} placeholder="Deutsche Beschreibung" rows={3} className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
        </div>
      </div>

      {/* Solutions Fields */}
      <div className="space-y-4">
        <h4 className="font-semibold">Çözümler (Tüm Diller)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>TR</Label>
            <textarea value={solTr} onChange={(e) => setSolTr(e.target.value)} placeholder="• Çözüm 1&#10;• Çözüm 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>EN</Label>
            <textarea value={solEn} onChange={(e) => setSolEn(e.target.value)} placeholder="• Solution 1&#10;• Solution 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>FR</Label>
            <textarea value={solFr} onChange={(e) => setSolFr(e.target.value)} placeholder="• Solution 1&#10;• Solution 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>AR</Label>
            <textarea value={solAr} onChange={(e) => setSolAr(e.target.value)} placeholder="• حل 1&#10;• حل 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>RU</Label>
            <textarea value={solRu} onChange={(e) => setSolRu(e.target.value)} placeholder="• Решение 1&#10;• Решение 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>DE</Label>
            <textarea value={solDe} onChange={(e) => setSolDe(e.target.value)} placeholder="• Lösung 1&#10;• Lösung 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
        </div>
      </div>

      {/* Benefits Fields */}
      <div className="space-y-4">
        <h4 className="font-semibold">Faydalar (Tüm Diller)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>TR</Label>
            <textarea value={benTr} onChange={(e) => setBenTr(e.target.value)} placeholder="• Fayda 1&#10;• Fayda 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>EN</Label>
            <textarea value={benEn} onChange={(e) => setBenEn(e.target.value)} placeholder="• Benefit 1&#10;• Benefit 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>FR</Label>
            <textarea value={benFr} onChange={(e) => setBenFr(e.target.value)} placeholder="• Avantage 1&#10;• Avantage 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>AR</Label>
            <textarea value={benAr} onChange={(e) => setBenAr(e.target.value)} placeholder="• فائدة 1&#10;• فائدة 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>RU</Label>
            <textarea value={benRu} onChange={(e) => setBenRu(e.target.value)} placeholder="• Преимущество 1&#10;• Преимущество 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>DE</Label>
            <textarea value={benDe} onChange={(e) => setBenDe(e.target.value)} placeholder="• Vorteil 1&#10;• Vorteil 2" rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
        </div>
      </div>

      {/* Success Stories Fields */}
      <div className="space-y-4">
        <h4 className="font-semibold">Başarı Hikayeleri (Tüm Diller)</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>TR</Label>
            <textarea value={sucTr} onChange={(e) => setSucTr(e.target.value)} placeholder="Başarı hikayesi..." rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>EN</Label>
            <textarea value={sucEn} onChange={(e) => setSucEn(e.target.value)} placeholder="Success story..." rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>FR</Label>
            <textarea value={sucFr} onChange={(e) => setSucFr(e.target.value)} placeholder="Histoire de succès..." rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>AR</Label>
            <textarea value={sucAr} onChange={(e) => setSucAr(e.target.value)} placeholder="قصة نجاح..." rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>RU</Label>
            <textarea value={sucRu} onChange={(e) => setSucRu(e.target.value)} placeholder="История успеха..." rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
          <div>
            <Label>DE</Label>
            <textarea value={sucDe} onChange={(e) => setSucDe(e.target.value)} placeholder="Erfolgsgeschichte..." rows={4} className="flex min-h-[96px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri
          </Button>
        </Link>

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
      
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sektör Yönetimi</h1>
        <p className="text-gray-600">Sektörel çözümlerinizi yönetin</p>
      </div>

      {/* Sectors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors && Array.isArray(sectors) && sectors.map((sector: any) => {
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
                          "{sector.title?.tr}" sektörünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>İptal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteSectorMutation.mutate(sector.sectorKey)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Sil
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

      {sectors && Array.isArray(sectors) && sectors.length === 0 && (
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