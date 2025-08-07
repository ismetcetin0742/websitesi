import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Plus, Edit, Calendar, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { EditModal } from "@/components/EditModal";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface BlogPost {
  id: string;
  title: string | { tr: string; en: string; fr: string; ar: string; ru: string; de: string };
  content: string | { tr: string; en: string; fr: string; ar: string; ru: string; de: string };
  excerpt?: string | { tr: string; en: string; fr: string; ar: string; ru: string; de: string };
  category: string;
  publishedAt: Date | null;
}

export default function AdminBlogPosts() {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });
  const queryClient = useQueryClient();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handleSave = async (data: any) => {
    try {
      console.log('Sending blog update data:', data);
      
      // Clean the data to ensure proper serialization
      const cleanData = {
        id: data.id,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        category: data.category,
        image: data.image
      };
      
      const response = await fetch(`/api/admin/blog/${data.id}`, {
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

      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      setEditModalOpen(false);
      
      toast({
        title: "Başarılı",
        description: "Blog yazısı güncellendi.",
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

  const handleDelete = async (postId: string) => {
    if (!confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Blog yazısı silinemedi');
      }

      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      
      toast({
        title: "Başarılı",
        description: "Blog yazısı silindi.",
      });
    } catch (error) {
      console.error('Delete error:', error);
      toast({
        title: "Hata",
        description: "Blog yazısı silinirken bir hata oluştu.",
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

  const editFields = [
    { key: 'title', label: 'Başlık', type: 'text' as const, required: true },
    { key: 'category', label: 'Kategori', type: 'text' as const, required: true },
    { key: 'excerpt', label: 'Özet', type: 'textarea' as const },
    { key: 'content', label: 'İçerik', type: 'textarea' as const, required: true },
    { key: 'image', label: 'Blog Görseli', type: 'file' as const, accept: 'image/*' },
  ];

  if (isLoading) {
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
          <Link href="/admin/blog">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Blog Yönetimi
            </Button>
          </Link>
        </div>
        <Link href="/admin/blog/create">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Yeni Yazı
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Yazıları</h1>
        <p className="text-gray-600">Tüm blog yazılarını görüntüleyin ve düzenleyin</p>
      </div>

      <div className="grid gap-6">
        {blogPosts?.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{getDisplayText(post.title)}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    {post.publishedAt && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                      </div>
                    )}
                  </div>
                  {post.excerpt && (
                    <CardDescription className="line-clamp-2">
                      {getDisplayText(post.excerpt as any)}
                    </CardDescription>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Düzenle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
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

        {!blogPosts?.length && (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Henüz blog yazısı yok
              </h3>
              <p className="text-gray-600 mb-4">
                İlk blog yazınızı oluşturmak için butona tıklayın.
              </p>
              <Link href="/admin/blog/create">
                <Button>
                  <Plus className="h-4 w-4 mr-1" />
                  Yeni Yazı Oluştur
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>

      <EditModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Blog Yazısını Düzenle"
        data={selectedPost || {}}
        fields={editFields}
        onSave={handleSave}
      />
    </div>
  );
}