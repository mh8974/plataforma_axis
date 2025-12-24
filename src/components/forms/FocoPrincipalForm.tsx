import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface FocoPrincipalFormProps {
  onSubmit: (foco: string) => void;
  onBack: () => void;
  focoOptions: readonly { value: string; label: string }[];
  selectedFoco: string | undefined;
  setSelectedFoco: (foco: string | undefined) => void;
  isSubmitting: boolean;
}

const FocoPrincipalForm: React.FC<FocoPrincipalFormProps> = ({
  onSubmit,
  onBack,
  focoOptions,
  selectedFoco,
  setSelectedFoco,
  isSubmitting,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFoco) {
      alert("Por favor, selecione um foco principal.");
      return;
    }
    onSubmit(selectedFoco);
  };

  return (
    <Layout
      title="Qual seu foco principal?"
      description="Selecione seu foco principal"
    >
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {}
          <div className="text-center mb-10">
            <div className="flex justify-between items-center mb-6">
              <div></div> {}
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Em qual(is) área(as) você precisa de ajuda ?
            </h1>
            <p className="text-neutral-600">
              Você será capaz de informar mais detalhes nos próximos passos
            </p>
          </div>

          {}
          <Card className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {focoOptions.map((option) => (
                    <div
                      key={option.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedFoco === option.value
                          ? "border-primary-600 bg-primary-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      }`}
                      onClick={() => setSelectedFoco(option.value)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                            selectedFoco === option.value
                              ? "border-primary-600 bg-primary-600"
                              : "border-neutral-300"
                          }`}
                        >
                          {selectedFoco === option.value && (
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
                  disabled={isSubmitting || !selectedFoco}
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

export default FocoPrincipalForm;