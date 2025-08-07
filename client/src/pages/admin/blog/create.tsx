import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, FileText, Upload, Image } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const blogSchema = z.object({
  title: z.string().min(1, "Başlık gereklidir"),
  category: z.string().min(1, "Kategori gereklidir"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "İçerik gereklidir"),
  imageUrl: z.string().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

export default function CreateBlogPost() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      content: "",
      imageUrl: "",
    },
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      // Resim varsa önce resmi yükle
      let imageUrl = data.imageUrl || "";
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        
        // Basit resim URL'i olarak dosya adını kullan
        imageUrl = `/images/blog/${selectedImage.name}`;
      }

      await apiRequest('/api/admin/blog', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          imageUrl,
          publishedAt: new Date().toISOString(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      toast({
        title: "Başarılı",
        description: "Blog yazısı oluşturuldu.",
      });
      setLocation("/admin/blog/posts");
    } catch (error) {
      console.error('Create error:', error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Blog yazısı oluşturulurken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/blog">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Blog Yönetimi
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Yeni Blog Yazısı</h1>
        <p className="text-gray-600">Yeni bir blog yazısı oluşturun</p>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Blog Yazısı Bilgileri
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık *</Label>
                <Input
                  id="title"
                  {...form.register("title")}
                  placeholder="Blog yazısı başlığı"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Kategori *</Label>
                <Input
                  id="category"
                  {...form.register("category")}
                  placeholder="Örn: Teknoloji, İş Süreçleri"
                />
                {form.formState.errors.category && (
                  <p className="text-sm text-red-600">
                    {form.formState.errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Özet</Label>
              <Textarea
                id="excerpt"
                {...form.register("excerpt")}
                placeholder="Blog yazısının kısa özeti (opsiyonel)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Blog Görseli</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="flex-1"
                />
                {imagePreview && (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Önizleme"
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                JPG, PNG veya WebP formatında resim yükleyebilirsiniz
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">İçerik *</Label>
              <Textarea
                id="content"
                {...form.register("content")}
                placeholder="Blog yazısının tam içeriği"
                rows={12}
                className="resize-none"
              />
              {form.formState.errors.content && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Blog Yazısını Oluştur
                  </>
                )}
              </Button>
              <Link href="/admin/blog/posts">
                <Button type="button" variant="outline">
                  İptal
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}