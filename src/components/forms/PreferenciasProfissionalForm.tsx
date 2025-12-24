import React from "react";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface PreferenciasProfissionalFormProps {
  onSubmit: () => void;
  onBack: () => void;
  preferenciasProfissionalOptions: readonly { value: string; label: string }[];
  selectedPreferencias: string[];
  setSelectedPreferencias: (preferencias: string[]) => void;
  isSubmitting: boolean;
}

const PreferenciasProfissionalForm: React.FC<PreferenciasProfissionalFormProps> = ({
  onSubmit,
  onBack,
  preferenciasProfissionalOptions,
  selectedPreferencias,
  setSelectedPreferencias,
  isSubmitting,
}) => {
  const handlePreferenciaToggle = (value: string) => {
    
    if (value === "sem_preferencia") {
      if (selectedPreferencias.includes("sem_preferencia")) {
        setSelectedPreferencias(
          selectedPreferencias.filter((item) => item !== "sem_preferencia")
        );
      } else {
        setSelectedPreferencias(["sem_preferencia"]);
      }
    } else {
      
      if (selectedPreferencias.includes("sem_preferencia")) {
        const newSelection = selectedPreferencias.filter(
          (item) => item !== "sem_preferencia"
        );
        if (newSelection.includes(value)) {
          setSelectedPreferencias(
            newSelection.filter((item) => item !== value)
          );
        } else {
          setSelectedPreferencias([...newSelection, value]);
        }
      } else {
        
        if (selectedPreferencias.includes(value)) {
          setSelectedPreferencias(
            selectedPreferencias.filter((item) => item !== value)
          );
        } else {
          setSelectedPreferencias([...selectedPreferencias, value]);
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Layout
      title="Você busca algo em particular em seu Profissional?"
      description="Selecione o que achar importante em um Profissional"
    >
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {}
          <div className="text-center mb-10">
            <div className="flex justify-between items-center mb-6">
              <div></div> {}
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Você busca algo em particular em seu Profissional?
            </h1>
            <p className="text-neutral-600">
              Selecione o que achar importante em um Profissional
            </p>
          </div>

          {}
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {preferenciasProfissionalOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPreferencias.includes(option.value)
                          ? "border-primary-600 bg-primary-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                      onClick={() => handlePreferenciaToggle(option.value)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                            selectedPreferencias.includes(option.value)
                              ? "border-primary-600 bg-primary-600"
                              : "border-neutral-300"
                          }`}
                        >
                          {selectedPreferencias.includes(option.value) && (
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
                  disabled={isSubmitting || !selectedPreferencias.length}
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

export default PreferenciasProfissionalForm;