import { useState } from 'react';
import { Link } from 'wouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Building2, Save, Plus, Trash2 } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface MultilingualContent {
  tr: string;
  en: string;
  fr: string;
  ar: string;
  ru: string;
  de: string;
}

interface SectorContent {
  id: string;
  sectorKey: string;
  title: MultilingualContent;
  description: MultilingualContent;
  solutions: MultilingualContent;
  benefits: MultilingualContent;
  efficiencyRate: number;
  features: string[];
  successStories: MultilingualContent;
  integrations: string[];
  createdAt: string;
  updatedAt: string;
}

const LANGUAGES = [
  { code: 'tr', name: 'Türkçe' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' },
  { code: 'ru', name: 'Русский' },
  { code: 'de', name: 'Deutsch' }
];

const defaultContent: Partial<SectorContent> = {
  sectorKey: 'banking',
  title: {
    tr: 'Bankacılık & Finans Çözümleri',
    en: 'Banking & Finance Solutions',
    fr: 'Solutions Bancaires et Financières',
    ar: 'حلول البنوك والتمويل',
    ru: 'Банковские и финансовые решения',
    de: 'Bank- und Finanzlösungen'
  },
  description: {
    tr: 'Bankacılık sektörü için özelleştirilmiş BPM ve DMS çözümleri',
    en: 'Specialized BPM and DMS solutions for banking sector',
    fr: 'Solutions BPM et DMS spécialisées pour le secteur bancaire',
    ar: 'حلول BPM و DMS متخصصة لقطاع البنوك',
    ru: 'Специализированные решения BPM и DMS для банковского сектора',
    de: 'Spezialisierte BPM- und DMS-Lösungen für den Bankensektor'
  },
  solutions: {
    tr: 'Kredi süreçleri, risk yönetimi, müşteri onboarding',
    en: 'Credit processes, risk management, customer onboarding',
    fr: 'Processus de crédit, gestion des risques, intégration client',
    ar: 'عمليات الائتمان، إدارة المخاطر، تأهيل العملاء',
    ru: 'Кредитные процессы, управление рисками, привлечение клиентов',
    de: 'Kreditprozesse, Risikomanagement, Kundenakquise'
  },
  benefits: {
    tr: 'Hızlı kredi onayı, azaltılmış operasyonel risk, gelişmiş müşteri deneyimi',
    en: 'Fast credit approval, reduced operational risk, improved customer experience',
    fr: 'Approbation de crédit rapide, risque opérationnel réduit, expérience client améliorée',
    ar: 'الموافقة السريعة على الائتمان، تقليل المخاطر التشغيلية، تحسين تجربة العملاء',
    ru: 'Быстрое одобрение кредита, снижение операционных рисков, улучшенный клиентский опыт',
    de: 'Schnelle Kreditgenehmigung, reduziertes operationelles Risiko, verbesserte Kundenerfahrung'
  },
  efficiencyRate: 86,
  features: ['Otomatik kredi skorlama', 'Dijital doküman yönetimi', 'Compliance raporlaması'],
  successStories: {
    tr: 'Türkiye\'nin önde gelen özel bankalarından biri kredi süreçlerini %50 hızlandırdı',
    en: 'One of Turkey\'s leading private banks accelerated credit processes by 50%',
    fr: 'Une des principales banques privées de Turquie a accéléré les processus de crédit de 50%',
    ar: 'أحد البنوك الخاصة الرائدة في تركيا سرّع عمليات الائتمان بنسبة 50%',
    ru: 'Один из ведущих частных банков Турции ускорил кредитные процессы на 50%',
    de: 'Eine der führenden Privatbanken der Türkei beschleunigte Kreditprozesse um 50%'
  },
  integrations: ['Core Banking', 'Swift', 'Risk Management Systems']
};

export default function BankingSectorManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeLanguage, setActiveLanguage] = useState('tr');

  const { data: content, isLoading } = useQuery({
    queryKey: ['/api/admin/sectors/banking'],
  });

  const [formData, setFormData] = useState<Partial<SectorContent>>(defaultContent);

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<SectorContent>) => {
      return apiRequest('/api/admin/sectors/banking', {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Başarılı",
        description: "Bankacılık sektörü içerikleri güncellendi",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/sectors'] });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "İçerik kaydedilirken bir hata oluştu",
        variant: "destructive",
      });
    },
  });

  const updateMultilingualField = (field: keyof SectorContent, language: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field] as MultilingualContent,
        [language]: value
      }
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.map((f, i) => i === index ? value : f) || []
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const addIntegration = () => {
    setFormData(prev => ({
      ...prev,
      integrations: [...(prev.integrations || []), '']
    }));
  };

  const updateIntegration = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      integrations: prev.integrations?.map((f, i) => i === index ? value : f) || []
    }));
  };

  const removeIntegration = (index: number) => {
    setFormData(prev => ({
      ...prev,
      integrations: prev.integrations?.filter((_, i) => i !== index) || []
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/admin/sectors">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Sektörler Yönetimi
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <Building2 className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Bankacılık & Finans Çözümleri</h1>
        </div>
        <p className="text-gray-600">
          Bankacılık sektörü için özelleştirilmiş çözümlerin içeriklerini düzenleyin
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dil Seçimi</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
              <TabsList className="grid w-full grid-cols-6">
                {LANGUAGES.map((lang) => (
                  <TabsTrigger key={lang.code} value={lang.code}>
                    {lang.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {LANGUAGES.map((lang) => (
                <TabsContent key={lang.code} value={lang.code} className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Temel Bilgiler - {lang.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor={`title-${lang.code}`}>Başlık</Label>
                        <Input
                          id={`title-${lang.code}`}
                          value={formData.title?.[lang.code as keyof MultilingualContent] || ''}
                          onChange={(e) => updateMultilingualField('title', lang.code, e.target.value)}
                          placeholder="Sektör başlığı"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`description-${lang.code}`}>Açıklama</Label>
                        <Textarea
                          id={`description-${lang.code}`}
                          value={formData.description?.[lang.code as keyof MultilingualContent] || ''}
                          onChange={(e) => updateMultilingualField('description', lang.code, e.target.value)}
                          placeholder="Sektör açıklaması"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`solutions-${lang.code}`}>Çözümler</Label>
                        <Textarea
                          id={`solutions-${lang.code}`}
                          value={formData.solutions?.[lang.code as keyof MultilingualContent] || ''}
                          onChange={(e) => updateMultilingualField('solutions', lang.code, e.target.value)}
                          placeholder="Sağlanan çözümler"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`benefits-${lang.code}`}>Faydalar</Label>
                        <Textarea
                          id={`benefits-${lang.code}`}
                          value={formData.benefits?.[lang.code as keyof MultilingualContent] || ''}
                          onChange={(e) => updateMultilingualField('benefits', lang.code, e.target.value)}
                          placeholder="Sağlanan faydalar"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`success-${lang.code}`}>Başarı Hikayeleri</Label>
                        <Textarea
                          id={`success-${lang.code}`}
                          value={formData.successStories?.[lang.code as keyof MultilingualContent] || ''}
                          onChange={(e) => updateMultilingualField('successStories', lang.code, e.target.value)}
                          placeholder="Başarı hikayeleri"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Özellikler</CardTitle>
                <Button onClick={addFeature} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.features?.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Özellik açıklaması"
                  />
                  <Button
                    onClick={() => removeFeature(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Entegrasyonlar</CardTitle>
                <Button onClick={addIntegration} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Ekle
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.integrations?.map((integration, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={integration}
                    onChange={(e) => updateIntegration(index, e.target.value)}
                    placeholder="Entegrasyon sistemi"
                  />
                  <Button
                    onClick={() => removeIntegration(index)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Verimlilik Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Label htmlFor="efficiency">Verimlilik Artışı (%)</Label>
              <Input
                id="efficiency"
                type="number"
                value={formData.efficiencyRate || 86}
                onChange={(e) => setFormData(prev => ({ ...prev, efficiencyRate: parseInt(e.target.value) || 86 }))}
                className="w-24"
                min="0"
                max="100"
              />
              <span className="text-sm text-gray-600">
                Şu anki değer: %{formData.efficiencyRate || 86}
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            onClick={() => saveMutation.mutate(formData)}
            disabled={saveMutation.isPending}
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
          </Button>
        </div>
      </div>
    </div>
  );
}