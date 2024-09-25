import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/DatePicker"; // Importando o DatePicker

interface InputConfig {
  name: string;
  label: string;
  type?: string;
}

interface FormProps {
  url: string;
  inputs: InputConfig[];
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const Form: React.FC<FormProps> = ({ url, inputs, onSuccess, onError }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [inputName]: value }));
  };

  const handleDateChange = (date: Date | undefined, inputName: string) => {
    setFormData((prev) => ({
      ...prev,
      [inputName]: date ? date.toISOString() : "", // Transformando a data em string
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(url, formData);
      console.log(response)
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      if (onError) {
        onError(error);
        console.log(error)
      } 
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {inputs.map((input, index) => (
          <div key={index} className="flex-1 min-w-[200px] space-y-1">
            <Label>{input.label}</Label>
            {input.type === "date" ? (
              <DatePicker
                selectedDate={
                  formData[input.name]
                    ? new Date(formData[input.name]) // Convertendo a string ISO para um objeto Date
                    : undefined
                }
                onDateChange={(date) => handleDateChange(date, input.name)}
              />
            ) : (
              <Input
                type={input.type || "text"}
                name={input.name}
                placeholder={input.label}
                value={formData[input.name] || ""}
                onChange={(e) => handleInputChange(e, input.name)}
                disabled={loading}
                className={`${loading ? "pointer-events-none opacity-50" : ""}`}
              />
            )}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4" disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </Button>
    </form>
  );
};

export default Form;
