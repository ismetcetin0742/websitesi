import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
  fields: Array<{
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'email' | 'number' | 'file';
    required?: boolean;
    accept?: string;
  }>;
}

export function EditModal({ isOpen, onClose, title, data, onSave, fields }: EditModalProps) {
  const [formData, setFormData] = useState(data);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Update form data when data prop changes
  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          image: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper function to extract string value from potentially multilingual content
  const getFieldValue = (key: string) => {
    const value = formData[key];
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object' && value !== null) {
      return value.tr || value.en || Object.values(value)[0] || '';
    }
    return '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {title}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            Aşağıdaki alanları düzenleyip kaydedebilirsiniz.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.key}
                  value={getFieldValue(field.key)}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              ) : field.type === 'file' ? (
                <div className="space-y-2">
                  <Input
                    id={field.key}
                    type="file"
                    accept={field.accept || "image/*"}
                    onChange={handleImageSelect}
                  />
                  {(imagePreview || formData.image) && (
                    <div className="mt-2">
                      <img
                        src={imagePreview || formData.image}
                        alt="Görsel önizleme"
                        className="max-w-xs h-32 object-cover rounded border"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <Input
                  id={field.key}
                  type={field.type}
                  value={getFieldValue(field.key)}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            İptal
          </Button>
          <Button onClick={handleSave}>
            Kaydet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}