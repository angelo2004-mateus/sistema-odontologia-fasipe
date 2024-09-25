import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import React, { useState } from "react";
import { DatePicker } from "@/components/DatePicker";

interface AttributeConfig {
  name: string;
  type?: string; 
  label: string; 
}

interface DialogDetailViewProps {
  data: Record<string, any>;
  name: string;
  attributes: AttributeConfig[]; // Array de configurações dos inputs
  footerChildren?: React.ReactNode;
  isOpen: boolean;
  disabled: boolean;
  onClose: () => void;
}

const DialogDetailView: React.FC<DialogDetailViewProps> = ({
  data,
  name,
  attributes,
  footerChildren,
  isOpen,
  onClose,
  disabled,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(data);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    attrName: string
  ) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [attrName]: value, // Usando 'name' como chave no estado
    }));
  };

  const handleDateChange = (date: Date | undefined, attrName: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [attrName]: date ? date.toISOString() : undefined,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-lg shadow-lg p-6">
        <DialogTitle className="text-xl font-bold">Detalhes {name}</DialogTitle>
        <DialogDescription className="mt-4">
          <div className={`flex flex-wrap gap-4`}>
            {attributes.map((attr, i) => (
              <div key={i} className="flex-1 min-w-[200px] space-y-1">
                <Label>{attr.label}</Label>
                {attr.type === "date" ? (
                  <DatePicker
                    selectedDate={
                      formData[attr.name]
                        ? new Date(formData[attr.name] as string)
                        : undefined
                    }
                    onDateChange={(date) => handleDateChange(date, attr.name)}
                  />
                ) : (
                  <Input
                    value={formData[attr.name]?.toString() || ""}
                    type={attr.type || "text"}
                    onChange={(e) => handleInputChange(e, attr.name)}
                    disabled={disabled}
                    className={`${disabled ? "pointer-events-none" : ""}`}
                    placeholder={
                      attr.name.charAt(0).toUpperCase() + attr.name.slice(1)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </DialogDescription>
        <DialogFooter>{footerChildren}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDetailView;
