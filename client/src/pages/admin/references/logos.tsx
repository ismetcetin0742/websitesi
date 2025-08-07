import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { PartnerLogo } from "@shared/schema";
import { Plus, Pencil, Trash2, Image, Building } from "lucide-react";

interface LogoModalProps {
  logo: PartnerLogo | null;
  onClose: () => void;
  onSave: (data: any) => void;
  isCreate?: boolean;
}

function LogoModal({ logo, onClose, onSave, isCreate = false }: LogoModalProps) {
  const [formData, setFormData] = useState({
    companyName: logo?.companyName || "",
    logoUrl: logo?.logoUrl || "",
    displayOrder: logo?.displayOrder || 0,
    isActive: logo?.isActive !== false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isCreate ? "Yeni Logo Ekle" : "Logo Düzenle"}</CardTitle>
          <CardDescription>
            Partner şirket logosu bilgilerini girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="companyName">Şirket Adı</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="Şirket adı"
                required
              />
            </div>

            <div>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                placeholder="https://example.com/logo.png"
                required
              />
            </div>

            <div>
              <Label htmlFor="displayOrder">Sıralama</Label>
              <Input
                id="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                min="0"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="isActive">Aktif</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                İptal
              </Button>
              <Button type="submit">
                {isCreate ? "Ekle" : "Güncelle"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PartnerLogosPage() {
  const { toast } = useToast();
  const [selectedLogo, setSelectedLogo] = useState<PartnerLogo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const { data: partnerLogos = [], isLoading } = useQuery<PartnerLogo[]>({
    queryKey: ["/api/admin/partner-logos"],
  });

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest("/api/admin/partner-logos", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/partner-logos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/partner-logos"] });
      setShowModal(false);
      setSelectedLogo(null);
      toast({
        title: "Başarılı",
        description: "Logo eklendi",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Logo eklenirken hata oluştu",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest(`/api/admin/partner-logos/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/partner-logos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/partner-logos"] });
      setShowModal(false);
      setSelectedLogo(null);
      toast({
        title: "Başarılı",
        description: "Logo güncellendi",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Güncelleme sırasında hata oluştu",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/admin/partner-logos/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/partner-logos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/partner-logos"] });
      toast({
        title: "Başarılı",
        description: "Logo silindi",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Silme sırasında hata oluştu",
        variant: "destructive",
      });
    },
  });

  const handleCreate = () => {
    setSelectedLogo(null);
    setIsCreate(true);
    setShowModal(true);
  };

  const handleEdit = (logo: PartnerLogo) => {
    setSelectedLogo(logo);
    setIsCreate(false);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu logoyu silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSave = (data: any) => {
    if (isCreate) {
      createMutation.mutate(data);
    } else if (selectedLogo) {
      updateMutation.mutate({ id: selectedLogo.id, data });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Logoları</h1>
          <p className="text-gray-600">
            Güvenilen Çözüm Ortağınız bölümündeki logoları yönetin
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Logo Ekle
        </Button>
      </div>

      {partnerLogos.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz logo eklenmemiş</h3>
            <p className="text-gray-600 mb-4">
              İlk partner logonuzu ekleyerek başlayın
            </p>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Logo Ekle
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerLogos.map((logo) => (
            <Card key={logo.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <div className="w-full h-20 bg-gray-50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                  {logo.logoUrl ? (
                    <img
                      src={logo.logoUrl}
                      alt={logo.companyName}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x60/E5E7EB/9CA3AF?text=LOGO';
                      }}
                    />
                  ) : (
                    <Building className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <CardTitle className="text-lg">{logo.companyName}</CardTitle>
                <CardDescription>
                  Sıra: {logo.displayOrder} • {logo.isActive ? 'Aktif' : 'Pasif'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(logo)}
                    disabled={updateMutation.isPending}
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(logo.id)}
                    disabled={deleteMutation.isPending}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <LogoModal
          logo={selectedLogo}
          onClose={() => {
            setShowModal(false);
            setSelectedLogo(null);
            setIsCreate(false);
          }}
          onSave={handleSave}
          isCreate={isCreate}
        />
      )}
    </div>
  );
}