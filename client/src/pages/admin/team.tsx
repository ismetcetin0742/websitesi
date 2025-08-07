import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Plus, Edit, User } from "lucide-react";
import { Link } from "wouter";
import { EditModal } from "@/components/EditModal";
import { useToast } from "@/hooks/use-toast";

// Static team data - in a real app this would come from the database
const teamMembers = [
  {
    id: "1",
    name: "Yıldırım Özyakışır",
    position: "Proje Yöneticisi",
    positionEn: "Project Manager",
    email: "yildirim@algotrom.com.tr",
    image: null
  },
  {
    id: "2", 
    name: "İsmet Çetin",
    position: "Proje Yöneticisi",
    positionEn: "Project Manager",
    email: "ismet@algotrom.com.tr",
    image: null
  },
  {
    id: "3",
    name: "Sedef Nihal",
    position: "Finans Yöneticisi", 
    positionEn: "Finance Manager",
    email: "sedef@algotrom.com.tr",
    image: null
  }
];

export default function AdminTeam() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const { toast } = useToast();

  const handleEdit = (member: any) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    // Here you would normally save to database
    toast({
      title: "Başarılı",
      description: "Takım üyesi bilgileri güncellendi.",
    });
  };

  const editFields = [
    { key: 'name', label: 'Ad Soyad', type: 'text' as const, required: true },
    { key: 'position', label: 'Pozisyon (Türkçe)', type: 'text' as const, required: true },
    { key: 'positionEn', label: 'Pozisyon (İngilizce)', type: 'text' as const },
    { key: 'email', label: 'E-posta', type: 'email' as const },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Takım Üyeleri</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {teamMembers.length} Üye
          </Badge>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Üye
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {teamMembers.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Henüz hiç takım üyesi yok.</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                İlk Üyeyi Ekle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>{member.name}</span>
                      </CardTitle>
                      <CardDescription>
                        <div className="space-y-1">
                          <div>{member.position}</div>
                          <div className="text-xs text-gray-400">{member.positionEn}</div>
                        </div>
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Düzenle
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">E-posta</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                    {!member.image && (
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <p className="text-sm text-amber-700">Profil fotoğrafı yok</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedMember && (
        <EditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`${selectedMember.name} - Düzenle`}
          data={selectedMember}
          onSave={handleSave}
          fields={editFields}
        />
      )}
    </div>
  );
}