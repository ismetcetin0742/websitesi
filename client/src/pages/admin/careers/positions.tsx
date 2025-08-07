import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Plus, Edit, Calendar, Trash2, MapPin, Building, Clock } from "lucide-react";
import { Link } from "wouter";
import { EditModal } from "@/components/EditModal";
import { useToast } from "@/hooks/use-toast";

interface JobPosition {
  id: string;
  title: string | { tr: string; en: string; fr: string; ar: string; ru: string; de: string };
  description: string | { tr: string; en: string; fr: string; ar: string; ru: string; de: string };
  requirements: string[];
  benefits: string[];
  department: string;
  location: string;
  type: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date | null;
}

export default function AdminJobPositions() {
  const { data: jobPositions, isLoading } = useQuery<JobPosition[]>({
    queryKey: ["/api/admin/job-positions"],
  });
  const queryClient = useQueryClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(null);
  const { toast } = useToast();

  const handleEdit = (position: JobPosition) => {
    setSelectedPosition(position);
    setEditModalOpen(true);
  };

  const handleSave = async (data: any) => {
    try {
      console.log('Sending job position update data:', data);
      
      // Clean the data to ensure proper serialization
      const cleanData = {
        id: data.id,
        title: data.title,
        description: data.description,
        requirements: Array.isArray(data.requirements) ? data.requirements : data.requirements?.split('\n').filter(Boolean) || [],
        benefits: Array.isArray(data.benefits) ? data.benefits : data.benefits?.split('\n').filter(Boolean) || [],
        department: data.department,
        location: data.location,
        type: data.type,
        isActive: data.isActive !== false
      };
      
      const response = await fetch(`/api/admin/job-positions/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Update result:', result);

      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-positions"] });
      setEditModalOpen(false);
      
      toast({
        title: "Başarılı",
        description: "İş pozisyonu güncellendi.",
      });
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Güncelleme sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (positionId: string) => {
    if (!confirm("Bu iş pozisyonunu silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/job-positions/${positionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('İş pozisyonu silinemedi');
      }

      queryClient.invalidateQueries({ queryKey: ["/api/admin/job-positions"] });
      
      toast({
        title: "Başarılı",
        description: "İş pozisyonu silindi.",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Hata",
        description: "İş pozisyonu silinirken bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  // Helper fonksiyon - çok dilli içeriği göster
  const getDisplayText = (content: string | { tr: string; en: string; fr: string; ar: string; ru: string; de: string }) => {
    if (typeof content === 'string') {
      return content;
    }
    return content.tr || content.en || Object.values(content)[0] || '';
  };

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'full-time': 'Tam Zamanlı',
      'part-time': 'Yarı Zamanlı',
      'contract': 'Sözleşmeli',
      'intern': 'Stajyer'
    };
    return types[type] || type;
  };

  const editFields = [
    { key: 'title', label: 'Pozisyon Başlığı', type: 'text' as const, required: true },
    { key: 'department', label: 'Departman', type: 'text' as const, required: true },
    { key: 'location', label: 'Lokasyon', type: 'text' as const, required: true },
    { key: 'type', label: 'Çalışma Türü', type: 'text' as const, required: true },
    { key: 'description', label: 'Açıklama', type: 'textarea' as const, required: true },
    { key: 'requirements', label: 'Gereksinimler (her satıra bir tane)', type: 'textarea' as const },
    { key: 'benefits', label: 'Faydalar (her satıra bir tane)', type: 'textarea' as const },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin/careers">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kariyer Yönetimi
            </Button>
          </Link>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/admin/careers">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kariyer Yönetimi
            </Button>
          </Link>
        </div>
        <Link href="/admin/careers/positions/create">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Yeni Pozisyon
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">İş Pozisyonları</h1>
        <p className="text-gray-600">Tüm iş pozisyonlarını görüntüleyin ve düzenleyin</p>
      </div>

      <div className="grid gap-6">
        {jobPositions?.map((position) => (
          <Card key={position.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{getDisplayText(position.title)}</CardTitle>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Badge variant="secondary">
                      <Building className="h-3 w-3 mr-1" />
                      {position.department}
                    </Badge>
                    <Badge variant="outline">
                      <MapPin className="h-3 w-3 mr-1" />
                      {position.location}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {getTypeLabel(position.type)}
                    </Badge>
                    {!position.isActive && (
                      <Badge variant="destructive">Pasif</Badge>
                    )}
                    {position.createdAt && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(position.createdAt).toLocaleDateString('tr-TR')}
                      </div>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2">
                    {getDisplayText(position.description as any)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(position)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(position.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Sil
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {!jobPositions?.length && (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Henüz iş pozisyonu yok
              </h3>
              <p className="text-gray-600 mb-4">
                İlk iş pozisyonunuzu oluşturmak için butona tıklayın.
              </p>
              <Link href="/admin/careers/positions/create">
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Yeni Pozisyon Ekle
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedPosition && (
        <EditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title="İş Pozisyonunu Düzenle"
          data={{
            ...selectedPosition,
            requirements: Array.isArray(selectedPosition.requirements) 
              ? selectedPosition.requirements.join('\n') 
              : selectedPosition.requirements,
            benefits: Array.isArray(selectedPosition.benefits) 
              ? selectedPosition.benefits.join('\n') 
              : selectedPosition.benefits,
            title: getDisplayText(selectedPosition.title),
            description: getDisplayText(selectedPosition.description)
          }}
          onSave={handleSave}
          fields={editFields}
        />
      )}
    </div>
  );
}