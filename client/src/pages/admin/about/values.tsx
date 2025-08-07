import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CompanyValue } from "@shared/schema";
import { Pencil, Trash2, Plus, Target, Lightbulb, Users, Award, Globe } from "lucide-react";

interface CompanyValueModalProps {
  value: CompanyValue | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

function CompanyValueModal({ value, onClose, onSave }: CompanyValueModalProps) {
  const [formData, setFormData] = useState({
    title: value?.title || "",
    description: value?.description || "",
    iconName: value?.iconName || "Target",
    displayOrder: value?.displayOrder || 1,
    isActive: value?.isActive !== false
  });

  const iconOptions = [
    { value: "Target", label: "Target", icon: Target },
    { value: "Lightbulb", label: "Ampul", icon: Lightbulb },
    { value: "Users", label: "Kullanıcılar", icon: Users },
    { value: "Award", label: "Ödül", icon: Award },
    { value: "Globe", label: "Dünya", icon: Globe },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{value ? "Değer Düzenle" : "Yeni Değer Ekle"}</CardTitle>
          <CardDescription>
            Şirket değerlerini yönetin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Değer başlığı"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Değer açıklaması"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="iconName">İkon</Label>
              <Select
                value={formData.iconName}
                onValueChange={(value) => setFormData({ ...formData, iconName: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="İkon seçin" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="displayOrder">Sıralama</Label>
              <Input
                id="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                min="1"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isActive">Aktif</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                İptal
              </Button>
              <Button type="submit">
                {value ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CompanyValuesPage() {
  const { toast } = useToast();
  const [editingValue, setEditingValue] = useState<CompanyValue | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: companyValues = [], isLoading } = useQuery<CompanyValue[]>({
    queryKey: ["/api/admin/company-values"],
  });

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; updates: any }) =>
      apiRequest(`/api/admin/company-values/${data.id}`, {
        method: "PUT",
        body: JSON.stringify(data.updates),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/company-values"] });
      queryClient.invalidateQueries({ queryKey: ["/api/company-values"] });
      setShowModal(false);
      setEditingValue(null);
      toast({
        title: "Başarılı",
        description: "Değer güncellendi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Güncelleme sırasında hata oluştu",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest("/api/admin/company-values", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/company-values"] });
      queryClient.invalidateQueries({ queryKey: ["/api/company-values"] });
      setShowModal(false);
      toast({
        title: "Başarılı",
        description: "Yeni değer eklendi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Ekleme sırasında hata oluştu",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest(`/api/admin/company-values/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/company-values"] });
      queryClient.invalidateQueries({ queryKey: ["/api/company-values"] });
      toast({
        title: "Başarılı",
        description: "Değer silindi",
      });
    },
    onError: (error) => {
      toast({
        title: "Hata",
        description: "Silme sırasında hata oluştu",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (value: CompanyValue) => {
    setEditingValue(value);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingValue(null);
    setShowModal(true);
  };

  const handleSave = (data: any) => {
    if (editingValue) {
      updateMutation.mutate({ id: editingValue.id, updates: data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu değeri silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Target": return Target;
      case "Lightbulb": return Lightbulb;
      case "Users": return Users;
      case "Award": return Award;
      case "Globe": return Globe;
      default: return Target;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Şirket Değerleri</h1>
          <p className="text-gray-600">Şirket değerlerini yönetin</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Yeni Değer Ekle
        </Button>
      </div>

      <div className="grid gap-4">
        {companyValues.map((value) => {
          const Icon = getIconComponent(value.iconName);
          return (
            <Card key={value.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{value.title}</h3>
                        {value.isActive ? (
                          <Badge variant="secondary">Aktif</Badge>
                        ) : (
                          <Badge variant="outline">Pasif</Badge>
                        )}
                        <Badge variant="outline">Sıra: {value.displayOrder}</Badge>
                      </div>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(value)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(value.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showModal && (
        <CompanyValueModal
          value={editingValue}
          onClose={() => {
            setShowModal(false);
            setEditingValue(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}