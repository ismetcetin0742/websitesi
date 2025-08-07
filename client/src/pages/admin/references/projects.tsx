import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ReferenceProject } from "@shared/schema";
import { Plus, Pencil, Trash2, Building, Star, Calendar, Clock } from "lucide-react";

interface ProjectModalProps {
  project: ReferenceProject | null;
  onClose: () => void;
  onSave: (data: any) => void;
  isCreate?: boolean;
}

function ProjectModal({ project, onClose, onSave, isCreate = false }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    company: project?.company || "",
    sector: project?.sector || "service",
    logoUrl: project?.logoUrl || "",
    project: project?.project || "",
    description: project?.description || "",
    results: project?.results?.join('\n') || "",
    duration: project?.duration || "",
    year: project?.year || "2024",
    testimonial: project?.testimonial || "",
    displayOrder: project?.displayOrder || 0,
    isActive: project?.isActive !== false
  });

  const sectors = [
    { value: "manufacturing", label: "Üretim" },
    { value: "energy", label: "Enerji" },
    { value: "retail", label: "Perakende" },
    { value: "service", label: "Hizmet" },
    { value: "construction", label: "İnşaat" },
    { value: "logistics", label: "Lojistik" },
    { value: "finance", label: "Finans" },
    { value: "healthcare", label: "Sağlık" },
    { value: "education", label: "Eğitim" },
    { value: "automotive", label: "Otomotiv" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      results: formData.results.split('\n').filter(r => r.trim())
    };
    onSave(data);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{isCreate ? "Yeni Proje Ekle" : "Proje Düzenle"}</CardTitle>
          <CardDescription>
            Referans proje bilgilerini girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company">Şirket Adı</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="ABC Şirket A.Ş."
                  required
                />
              </div>

              <div>
                <Label htmlFor="sector">Sektör</Label>
                <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sektör seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="project">Proje Adı</Label>
              <Input
                id="project"
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                placeholder="Dijital Dönüşüm Projesi"
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
              />
            </div>

            <div>
              <Label htmlFor="description">Proje Açıklaması</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Proje detayları ve çözüm açıklaması"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="results">Sonuçlar (Her satıra bir sonuç)</Label>
              <Textarea
                id="results"
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                placeholder="%40 verimlilik artışı&#10;%30 maliyet tasarrufu&#10;%50 süre azalması"
                rows={4}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="duration">Proje Süresi</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="6 ay"
                  required
                />
              </div>

              <div>
                <Label htmlFor="year">Yıl</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024"
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
            </div>

            <div>
              <Label htmlFor="testimonial">Müşteri Yorumu</Label>
              <Textarea
                id="testimonial"
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                placeholder="Müşteri geri bildirimi"
                rows={3}
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

export default function ReferenceProjectsPage() {
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<ReferenceProject | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const { data: referenceProjects = [], isLoading } = useQuery<ReferenceProject[]>({
    queryKey: ["/api/admin/reference-projects"],
  });

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest("/api/admin/reference-projects", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reference-projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reference-projects"] });
      setShowModal(false);
      setSelectedProject(null);
      toast({
        title: "Başarılı",
        description: "Proje eklendi",
      });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Proje eklenirken hata oluştu",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest(`/api/admin/reference-projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reference-projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reference-projects"] });
      setShowModal(false);
      setSelectedProject(null);
      toast({
        title: "Başarılı",
        description: "Proje güncellendi",
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
      apiRequest(`/api/admin/reference-projects/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reference-projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/reference-projects"] });
      toast({
        title: "Başarılı",
        description: "Proje silindi",
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
    setSelectedProject(null);
    setIsCreate(true);
    setShowModal(true);
  };

  const handleEdit = (project: ReferenceProject) => {
    setSelectedProject(project);
    setIsCreate(false);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu projeyi silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleSave = (data: any) => {
    if (isCreate) {
      createMutation.mutate(data);
    } else if (selectedProject) {
      updateMutation.mutate({ id: selectedProject.id, data });
    }
  };

  const getSectorLabel = (sector: string) => {
    const sectors = {
      manufacturing: "Üretim",
      energy: "Enerji", 
      retail: "Perakende",
      service: "Hizmet",
      construction: "İnşaat",
      logistics: "Lojistik",
      finance: "Finans",
      healthcare: "Sağlık",
      education: "Eğitim",
      automotive: "Otomotiv"
    };
    return sectors[sector as keyof typeof sectors] || sector;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Referans Projeler</h1>
          <p className="text-gray-600">
            Müşteri projelerini ve başarı hikayelerini yönetin
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Proje Ekle
        </Button>
      </div>

      {referenceProjects.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Building className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz proje eklenmemiş</h3>
            <p className="text-gray-600 mb-4">
              İlk referans projenizi ekleyerek başlayın
            </p>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Proje Ekle
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {referenceProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {project.logoUrl ? (
                        <img
                          src={project.logoUrl}
                          alt={project.company}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48/E5E7EB/9CA3AF?text=LOGO';
                          }}
                        />
                      ) : (
                        <Building className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{project.company}</CardTitle>
                      <CardDescription>{project.project}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{getSectorLabel(project.sector)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    {project.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {project.year}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 mr-2" />
                    {project.results?.length || 0} sonuç
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Sıra: {project.displayOrder} • {project.isActive ? 'Aktif' : 'Pasif'}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                      disabled={updateMutation.isPending}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      disabled={deleteMutation.isPending}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            setShowModal(false);
            setSelectedProject(null);
            setIsCreate(false);
          }}
          onSave={handleSave}
          isCreate={isCreate}
        />
      )}
    </div>
  );
}