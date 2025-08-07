import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

const createJobPositionSchema = z.object({
  title: z.string().min(1, "Pozisyon başlığı gereklidir"),
  description: z.string().min(1, "Açıklama gereklidir"),
  requirements: z.string().min(1, "Gereksinimler gereklidir"),
  benefits: z.string().min(1, "Faydalar gereklidir"),
  department: z.string().min(1, "Departman gereklidir"),
  location: z.string().min(1, "Lokasyon gereklidir"),
  type: z.string().min(1, "Çalışma türü gereklidir"),
  isActive: z.boolean().default(true),
  displayOrder: z.number().default(0),
});

type CreateJobPositionData = z.infer<typeof createJobPositionSchema>;

export default function CreateJobPosition() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateJobPositionData>({
    resolver: zodResolver(createJobPositionSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      benefits: "",
      department: "",
      location: "",
      type: "full-time",
      isActive: true,
      displayOrder: 0,
    },
  });

  const onSubmit = async (data: CreateJobPositionData) => {
    setIsSubmitting(true);
    try {
      const submitData = {
        title: { tr: data.title },
        description: { tr: data.description },
        requirements: data.requirements.split('\n').filter(req => req.trim() !== ''),
        benefits: data.benefits.split('\n').filter(benefit => benefit.trim() !== ''),
        department: data.department,
        location: data.location,
        type: data.type,
        isActive: data.isActive,
        displayOrder: data.displayOrder,
      };

      const response = await fetch('/api/admin/job-positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'İş pozisyonu oluşturulamadı');
      }

      toast({
        title: "Başarılı",
        description: "İş pozisyonu başarıyla oluşturuldu.",
      });

      setLocation('/admin/careers/positions');
    } catch (error) {
      console.error('Error creating job position:', error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "İş pozisyonu oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/careers/positions">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            İş Pozisyonları
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Yeni İş Pozisyonu</h1>
        <p className="text-gray-600">Yeni iş pozisyonu oluşturun</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Pozisyon Bilgileri</CardTitle>
          <CardDescription>
            Aşağıdaki formu doldurarak yeni iş pozisyonu oluşturun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pozisyon Başlığı</FormLabel>
                    <FormControl>
                      <Input placeholder="Örn: Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departman</FormLabel>
                      <FormControl>
                        <Input placeholder="Örn: Yazılım Geliştirme" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lokasyon</FormLabel>
                      <FormControl>
                        <Input placeholder="Örn: İstanbul, Türkiye" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Çalışma Türü</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Çalışma türünü seçin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">Tam Zamanlı</SelectItem>
                          <SelectItem value="part-time">Yarı Zamanlı</SelectItem>
                          <SelectItem value="contract">Sözleşmeli</SelectItem>
                          <SelectItem value="intern">Stajyer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sıralama</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0" 
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pozisyon Açıklaması</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Pozisyon hakkında detaylı açıklama..."
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gereksinimler</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Her satıra bir gereksinim yazın..."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faydalar</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Her satıra bir fayda yazın..."
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Aktif Pozisyon</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Bu pozisyon aktif olarak yayınlansın mı?
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Pozisyonu Oluştur
                    </>
                  )}
                </Button>
                <Link href="/admin/careers/positions">
                  <Button variant="outline" type="button">
                    İptal
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}