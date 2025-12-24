import React from "react";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { AREAS_ESPECIAIS_OPTIONS, FocoPrincipalValue } from "@/constants/formularios";

interface AreasEspeciaisFormProps {
  onSubmit: (areas: string[]) => void;
  onBack: () => void;
  focoPrincipal: string;
  selectedAreas: string[];
  setSelectedAreas: (areas: string[]) => void;
  isSubmitting: boolean;
}

const AreasEspeciaisForm: React.FC<AreasEspeciaisFormProps> = ({
  onSubmit,
  onBack,
  focoPrincipal,
  selectedAreas,
  setSelectedAreas,
  isSubmitting,
}) => {
  
  const opcoesDisponiveis = React.useMemo(() => {
    if (!focoPrincipal) return AREAS_ESPECIAIS_OPTIONS;

    return AREAS_ESPECIAIS_OPTIONS.filter(opcao => {
      
      if (opcao.applicableTo[0] === "*") return true;

      
      return (opcao.applicableTo as FocoPrincipalValue[]).includes(focoPrincipal as FocoPrincipalValue);
    });
  }, [focoPrincipal]);

  const handleAreaToggle = (value: string) => {
    if (selectedAreas.includes(value)) {
      setSelectedAreas(selectedAreas.filter((item) => item !== value));
    } else {
      if (selectedAreas.length < 10) {
        setSelectedAreas([...selectedAreas, value]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedAreas);
  };

  return (
    <Layout
      title="Qual(ais) motivo(os) te trouxeram até aqui ?"
      description="Selecione até 10 áreas"
    >
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {}
          <div className="text-center mb-10">
            <div className="flex justify-between items-center mb-6">
              <div></div> {}
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Qual(ais) motivo(os) te trouxeram até aqui ?
            </h1>
            <p className="text-neutral-600">
              Você pode selecionar até 10 opções
            </p>
          </div>

          {}
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {opcoesDisponiveis.map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedAreas.includes(option.value)
                          ? "border-primary-600 bg-primary-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                      onClick={() => handleAreaToggle(option.value)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                            selectedAreas.includes(option.value)
                              ? "border-primary-600 bg-primary-600"
                              : "border-neutral-300"
                          }`}
                        >
                          {selectedAreas.includes(option.value) && (
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
                {selectedAreas.length > 0 && (
                  <div className="text-sm text-neutral-600">
                    Selecionados: {selectedAreas.length}/10
                  </div>
                )}
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
                  disabled={isSubmitting || !selectedAreas.length}
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

export default AreasEspeciaisForm;