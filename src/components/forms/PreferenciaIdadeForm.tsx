import React from "react";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface PreferenciaIdadeFormProps {
  onSubmit: () => void;
  onBack: () => void;
  selectedIdades: string[];
  setSelectedIdades: (idades: string[]) => void;
  isSubmitting: boolean;
}

const PreferenciaIdadeForm: React.FC<PreferenciaIdadeFormProps> = ({
  onSubmit,
  onBack,
  selectedIdades,
  setSelectedIdades,
  isSubmitting,
}) => {
  const handleIdadeToggle = (value: string) => {
    
    if (value === "sem_preferencia") {
      if (selectedIdades.includes("sem_preferencia")) {
        setSelectedIdades(
          selectedIdades.filter((item) => item !== "sem_preferencia")
        );
      } else {
        setSelectedIdades(["sem_preferencia"]);
      }
    } else {
      
      if (selectedIdades.includes("sem_preferencia")) {
        const newSelection = selectedIdades.filter(
          (item) => item !== "sem_preferencia"
        );
        if (newSelection.includes(value)) {
          setSelectedIdades(
            newSelection.filter((item) => item !== value)
          );
        } else {
          setSelectedIdades([...newSelection, value]);
        }
      } else {
        
        if (selectedIdades.includes(value)) {
          setSelectedIdades(
            selectedIdades.filter((item) => item !== value)
          );
        } else {
          setSelectedIdades([...selectedIdades, value]);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIdades.length === 0) {
      alert("Por favor, selecione pelo menos uma faixa etária ou 'Eu não tenho preferência'.");
      return;
    }
    onSubmit();
  };

  return (
    <Layout
      title="Selecione a idade preferida de seu psicólogo"
      description="Selecione pelo menos 1"
    >
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {}
          <div className="text-center mb-10">
            <div className="flex justify-between items-center mb-6">
              <div></div> {}
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Selecione a idade preferida de seu psicólogo
            </h1>
            <p className="text-neutral-600">
              Selecione pelo menos 1
            </p>
          </div>

          {}
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: "20-29", label: "20-29" },
                    { value: "30-39", label: "30-39" },
                    { value: "40-49", label: "40-49" },
                    { value: "50-59", label: "50-59" },
                    { value: "60+", label: "60+" },
                    { value: "sem_preferencia", label: "Eu não tenho preferência" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedIdades.includes(option.value)
                          ? "border-primary-600 bg-primary-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                      onClick={() => handleIdadeToggle(option.value)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                            selectedIdades.includes(option.value)
                              ? "border-primary-600 bg-primary-600"
                              : "border-neutral-300"
                          }`}
                        >
                          {selectedIdades.includes(option.value) && (
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className="font-medium text-neutral-900">
                          {option.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {}
              <div className="pt-6 flex justify-between">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onBack}
                  className="flex items-center gap-2"
                  type="button"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 ml-4"
                  disabled={isSubmitting || !selectedIdades.length}
                >
                  {isSubmitting ? "Enviando..." : "Continuar"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PreferenciaIdadeForm;