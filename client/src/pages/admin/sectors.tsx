import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Plus, Edit, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { EditModal } from "@/components/EditModal";
import { useToast } from "@/hooks/use-toast";

// Static sectors data - in a real app this would come from the database
const sectors = [
  {
    id: "1",
    name: "İmalat Sanayi",
    nameEn: "Manufacturing",
    description: "Üretim süreçlerinizi dijitalleştirin ve verimliliği artırın",
    descriptionEn: "Digitize your production processes and increase efficiency",
    icon: "🏭",
    efficiency: "86%",
    solutions: ["E-Flow BPM", "E-Flow DMS", "Kalite Yönetimi"],
    clients: 25
  },
  {
    id: "2",
    name: "Hizmet Sektörü", 
    nameEn: "Service Sector",
    description: "Müşteri deneyimini iyileştirin ve operasyonel verimliliği artırın",
    descriptionEn: "Improve customer experience and increase operational efficiency",
    icon: "🏢",
    efficiency: "86%",
    solutions: ["E-Flow BPM", "Müşteri Yönetimi", "Rezervasyon Sistemi"],
    clients: 18
  },
  {
    id: "3",
    name: "Enerji",
    nameEn: "Energy",
    description: "Enerji operasyonlarınızı optimize edin ve sürdürülebilirliği artırın",
    descriptionEn: "Optimize your energy operations and increase sustainability", 
    icon: "⚡",
    efficiency: "86%",
    solutions: ["E-Flow BPM", "Enerji İzleme", "Bakım Yönetimi"],
    clients: 12
  },
  {
    id: "4",
    name: "Perakende",
    nameEn: "Retail",
    description: "Satış süreçlerinizi dijitalleştirin ve müşteri memnuniyetini artırın",
    descriptionEn: "Digitize your sales processes and increase customer satisfaction",
    icon: "🛍️",
    efficiency: "86%",
    solutions: ["E-Flow BPM", "Stok Yönetimi", "POS Entegrasyonu"],
    clients: 22
  }
];

export default function AdminSectors() {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<any>(null);
  const { toast } = useToast();

  const handleEdit = (sector: any) => {
    setSelectedSector(sector);
    setEditModalOpen(true);
  };

  const handleSave = (data: any) => {
    toast({
      title: "Başarılı",
      description: "Sektör bilgileri güncellendi.",
    });
  };

  const editFields = [
    { key: 'name', label: 'Sektör Adı', type: 'text' as const, required: true },
    { key: 'nameEn', label: 'Sektör Adı (İngilizce)', type: 'text' as const },
    { key: 'description', label: 'Açıklama', type: 'textarea' as const, required: true },
    { key: 'descriptionEn', label: 'Açıklama (İngilizce)', type: 'textarea' as const },
    { key: 'efficiency', label: 'Verimlilik (%)', type: 'text' as const },
    { key: 'clients', label: 'Müşteri Sayısı', type: 'number' as const },
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
          <h1 className="text-3xl font-bold">Sektörler</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {sectors.length} Sektör
          </Badge>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Sektör
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sectors.map((sector) => (
          <Card key={sector.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{sector.icon}</span>
                    <span>{sector.name}</span>
                  </CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <div>{sector.description}</div>
                      <div className="text-xs text-gray-400">{sector.descriptionEn}</div>
                    </div>
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleEdit(sector)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Düzenle
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Verimlilik</span>
                  </div>
                  <Badge variant="secondary">{sector.efficiency}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Müşteri Sayısı</span>
                  </div>
                  <Badge variant="outline">{sector.clients} Firma</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Çözümler</p>
                  <div className="flex flex-wrap gap-2">
                    {sector.solutions.map((solution, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {solution}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSector && (
        <EditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`${selectedSector.name} - Düzenle`}
          data={selectedSector}
          onSave={handleSave}
          fields={editFields}
        />
      )}
    </div>
  );
}