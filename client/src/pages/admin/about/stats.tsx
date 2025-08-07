import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { CompanyStats } from "@shared/schema";
import { Pencil, BarChart3, Users, Briefcase, Calendar } from "lucide-react";

interface StatsModalProps {
  stats: CompanyStats | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

function StatsModal({ stats, onClose, onSave }: StatsModalProps) {
  const [formData, setFormData] = useState({
    experienceYears: stats?.experienceYears || 15,
    completedProjects: stats?.completedProjects || 500,
    happyCustomers: stats?.happyCustomers || 100,
    teamSize: stats?.teamSize || 50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Şirket İstatistiklerini Düzenle</CardTitle>
          <CardDescription>
            Hakkımızda sayfasında gösterilen sayısal veriler
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="experienceYears">Deneyim Yılı</Label>
              <Input
                id="experienceYears"
                type="number"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) })}
                min="1"
                required
              />
            </div>

            <div>
              <Label htmlFor="completedProjects">Tamamlanan Proje Sayısı</Label>
              <Input
                id="completedProjects"
                type="number"
                value={formData.completedProjects}
                onChange={(e) => setFormData({ ...formData, completedProjects: parseInt(e.target.value) })}
                min="0"
                required
              />
            </div>

            <div>
              <Label htmlFor="happyCustomers">Mutlu Müşteri Sayısı</Label>
              <Input
                id="happyCustomers"
                type="number"
                value={formData.happyCustomers}
                onChange={(e) => setFormData({ ...formData, happyCustomers: parseInt(e.target.value) })}
                min="0"
                required
              />
            </div>

            <div>
              <Label htmlFor="teamSize">Takım Üyesi Sayısı</Label>
              <Input
                id="teamSize"
                type="number"
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: parseInt(e.target.value) })}
                min="1"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                İptal
              </Button>
              <Button type="submit">
                Güncelle
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AboutStatsPage() {
  const { toast } = useToast();
  const [showModal, setShowModal] = useState(false);

  const { data: companyStats, isLoading } = useQuery<CompanyStats>({
    queryKey: ["/api/admin/company-stats"],
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest("/api/admin/company-stats", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/company-stats"] });
      queryClient.invalidateQueries({ queryKey: ["/api/company-stats"] });
      setShowModal(false);
      toast({
        title: "Başarılı",
        description: "İstatistikler güncellendi",
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

  const handleSave = (data: any) => {
    updateMutation.mutate(data);
  };

  const statsCards = [
    {
      title: "Deneyim",
      value: `${companyStats?.experienceYears || 15}+`,
      subtitle: "Yıl",
      icon: <Calendar className="w-8 h-8" />,
      color: "bg-blue-500"
    },
    {
      title: "Başarılı Proje",
      value: `${companyStats?.completedProjects || 500}+`,
      subtitle: "Tamamlandı",
      icon: <Briefcase className="w-8 h-8" />,
      color: "bg-green-500"
    },
    {
      title: "Mutlu Müşteri",
      value: `${companyStats?.happyCustomers || 100}+`,
      subtitle: "Memnun",
      icon: <Users className="w-8 h-8" />,
      color: "bg-purple-500"
    },
    {
      title: "Uzman Takım",
      value: `${companyStats?.teamSize || 50}+`,
      subtitle: "Üye",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "bg-orange-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
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
          <h1 className="text-3xl font-bold text-gray-900">Şirket İstatistikleri</h1>
          <p className="text-gray-600">Hakkımızda sayfasında gösterilen sayısal veriler</p>
        </div>
        <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
          <Pencil className="w-4 h-4" />
          Düzenle
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xl text-gray-700 font-medium">{stat.title}</div>
              <div className="text-sm text-gray-500">{stat.subtitle}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>İstatistik Açıklaması</CardTitle>
          <CardDescription>
            Bu sayılar Hakkımızda sayfasının sonunda gösterilir ve şirketin büyüklüğünü ve deneyimini vurgular.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <p><strong>Deneyim Yılı:</strong> Şirketin kuruluşundan bu yana geçen süre</p>
            <p><strong>Başarılı Proje:</strong> Tamamlanan toplam proje sayısı</p>
            <p><strong>Mutlu Müşteri:</strong> Hizmet verilen toplam müşteri sayısı</p>
            <p><strong>Uzman Takım:</strong> Şirketteki toplam çalışan sayısı</p>
          </div>
        </CardContent>
      </Card>

      {showModal && (
        <StatsModal
          stats={companyStats || null}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}