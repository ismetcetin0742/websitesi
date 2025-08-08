import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { ArrowLeft, Save, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'wouter';
import type { HomepageSolution } from '@shared/schema';

interface SolutionOrderItem {
  id: string;
  title: string;
  currentOrder: number;
  newOrder: number;
}

export default function AdminHomepageSolutionsOrder() {
  const [orderChanges, setOrderChanges] = useState<Record<string, number>>({});
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: solutions = [], isLoading } = useQuery<HomepageSolution[]>({
    queryKey: ['/api/admin/homepage-solutions'],
  });

  const updateOrderMutation = useMutation({
    mutationFn: async (orders: Record<string, number>) => {
      const updatePromises = Object.entries(orders).map(([id, displayOrder]) =>
        apiRequest(`/api/admin/homepage-solutions/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ displayOrder }),
          headers: { 'Content-Type': 'application/json' }
        })
      );
      return Promise.all(updatePromises);
    },
    onSuccess: () => {
      toast({ title: "Başarılı", description: "Çözümler sıralaması güncellendi" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/homepage-solutions'] });
      setOrderChanges({});
    },
    onError: () => {
      toast({ title: "Hata", description: "Sıralama güncellenemedi", variant: "destructive" });
    }
  });

  const handleOrderChange = (id: string, newOrder: number) => {
    setOrderChanges(prev => ({
      ...prev,
      [id]: newOrder
    }));
  };

  const moveUp = (id: string, currentOrder: number) => {
    if (currentOrder > 1) {
      handleOrderChange(id, currentOrder - 1);
    }
  };

  const moveDown = (id: string, currentOrder: number) => {
    const maxOrder = solutions.length;
    if (currentOrder < maxOrder) {
      handleOrderChange(id, currentOrder + 1);
    }
  };

  const handleSave = () => {
    if (Object.keys(orderChanges).length > 0) {
      updateOrderMutation.mutate(orderChanges);
    }
  };

  const getDisplayOrder = (solution: HomepageSolution) => {
    return orderChanges[solution.id] ?? solution.displayOrder ?? 0;
  };

  const sortedSolutions = [...solutions].sort((a, b) => getDisplayOrder(a) - getDisplayOrder(b));

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/homepage">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Geri
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Çözümler Sıralaması</h1>
          <p className="text-gray-600">
            Ana sayfadaki çözümler bölümünün gösterim sırasını düzenleyin
          </p>
          <p className="text-sm text-blue-600 mt-1">
            Not: İçerik düzenlemesi için ayrı "Ürünler & Çözümler" yönetim bölümü kullanılacak
          </p>
        </div>
        {Object.keys(orderChanges).length > 0 && (
          <Button onClick={handleSave} disabled={updateOrderMutation.isPending}>
            <Save className="h-4 w-4 mr-2" />
            Değişiklikleri Kaydet
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {sortedSolutions.map((solution, index) => {
          const currentOrder = getDisplayOrder(solution);
          const hasChanges = orderChanges[solution.id] !== undefined;
          
          return (
            <Card key={solution.id} className={hasChanges ? 'border-blue-500 bg-blue-50' : ''}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-gray-400 min-w-[3rem]">
                        #{currentOrder}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          {typeof solution.title === 'object' ? solution.title.tr : solution.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {typeof solution.description === 'object' ? solution.description.tr : solution.description}
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Link: {solution.link}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveUp(solution.id, currentOrder)}
                        disabled={currentOrder <= 1}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => moveDown(solution.id, currentOrder)}
                        disabled={currentOrder >= solutions.length}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="w-20">
                      <Label htmlFor={`order-${solution.id}`} className="text-xs">
                        Sıra
                      </Label>
                      <Input
                        id={`order-${solution.id}`}
                        type="number"
                        min="1"
                        max={solutions.length}
                        value={currentOrder}
                        onChange={(e) => handleOrderChange(solution.id, parseInt(e.target.value) || 1)}
                        className="text-center"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {Object.keys(orderChanges).length > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Bekleyen Değişiklikler:</strong> {Object.keys(orderChanges).length} öğenin sıralaması değiştirildi.
            Değişiklikleri kaydetmek için "Değişiklikleri Kaydet" butonuna tıklayın.
          </p>
        </div>
      )}
    </div>
  );
}