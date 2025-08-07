import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Plus, Edit, Workflow } from "lucide-react";
import { Link } from "wouter";

// Static solutions data - in a real app this would come from the database
const solutions = [
  {
    id: "1",
    name: "E-Flow BPM",
    nameEn: "E-Flow BPM",
    description: "İş Süreçleri Yönetimi - Kurumsal iş süreçlerinizi dijitalleştirin ve optimize edin",
    descriptionEn: "Business Process Management - Digitize and optimize your corporate business processes",
    category: "İş Süreçleri",
    efficiency: "86%",
    features: ["Süreç Tasarlama", "İş Akışı Yönetimi", "Performans İzleme", "Entegrasyon"]
  },
  {
    id: "2",
    name: "E-Flow DMS", 
    nameEn: "E-Flow DMS",
    description: "Döküman Yönetim Sistemi - Belgelerinizi güvenli şekilde saklayın ve yönetin",
    descriptionEn: "Document Management System - Store and manage your documents securely",
    category: "Döküman Yönetimi",
    efficiency: "86%",
    features: ["Döküman Saklama", "Versiyon Kontrolü", "Güvenlik", "Arama"]
  },
  {
    id: "3",
    name: "Entegrasyon Çözümleri",
    nameEn: "Integration Solutions", 
    description: "Mevcut sistemlerinizi birbirine bağlayın ve veri akışını optimize edin",
    descriptionEn: "Connect your existing systems and optimize data flow",
    category: "Entegrasyon",
    efficiency: "86%",
    features: ["API Entegrasyonu", "Veri Senkronizasyonu", "Sistem Bağlantısı", "Gerçek Zamanlı"]
  }
];

export default function AdminSolutions() {
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
          <h1 className="text-3xl font-bold">Çözümler</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {solutions.length} Çözüm
          </Badge>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Çözüm
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {solutions.map((solution) => (
          <Card key={solution.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>{solution.name}</span>
                    <Badge variant="outline">{solution.category}</Badge>
                  </CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <div>{solution.description}</div>
                      <div className="text-xs text-gray-400">{solution.descriptionEn}</div>
                    </div>
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">
                    <Workflow className="h-3 w-3 mr-1" />
                    {solution.efficiency} Verimlilik
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Düzenle
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Özellikler</p>
                  <div className="flex flex-wrap gap-2">
                    {solution.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}