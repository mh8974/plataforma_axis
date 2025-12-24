import React, { useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import CampoCheckbox from "../formulario-profissional/campos/CampoCheckbox";
import Button from "@/components/ui/Button";
import { Shield } from "lucide-react";
import { getTermosUso, getPoliticaPrivacidade } from "@/services/lgpdService";

interface SecaoTermosProps {
  submitMutation?: any;
  title?: string;
  fieldName?: string;
  required?: boolean;
  showReceberEmails?: boolean;
  termosDescricao?: string;
  termosRota?: string;
  politicaRota?: string;
}

const SecaoTermos: React.FC<SecaoTermosProps> = ({
  submitMutation,
  title = "Termos e Condições",
  fieldName = "aceitaTermos",
  required = true,
  showReceberEmails = false,
  termosDescricao = "Termos de Uso e Política de Privacidade",
  termosRota,
  politicaRota
}) => {
  const { control, formState: { errors } } = useFormContext();
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [canCloseTerms, setCanCloseTerms] = useState(false);
  const [termosContent, setTermosContent] = useState<string>("");
  const [isLoadingTermos, setIsLoadingTermos] = useState(false);
  const [termsError, setTermsError] = useState<string | null>(null);

  
  useEffect(() => {
    if (showTermsModal && !termosContent) {
      const fetchTermos = async () => {
        setIsLoadingTermos(true);
        setTermsError(null);

        try {
          
          const [termos, politica] = await Promise.all([
            getTermosUso(),
            getPoliticaPrivacidade()
          ]);

          
          const fullContent = `${termos}\n\n${'='.repeat(80)}\n\n${politica}`;
          setTermosContent(fullContent);
        } catch (error) {
          
          setTermsError('Não foi possível carregar os termos. Por favor, tente novamente.');
        } finally {
          setIsLoadingTermos(false);
        }
      };

      fetchTermos();
    }
  }, [showTermsModal, termosContent]);

  
  useEffect(() => {
    if (showTermsModal && termosContent) {
      
      const timer = setTimeout(() => {
        const contentElement = document.querySelector('.terms-content');
        if (contentElement) {
          
          const { scrollHeight, clientHeight } = contentElement;
          if (scrollHeight <= clientHeight) {
            setCanCloseTerms(true);
          } else {
            setCanCloseTerms(false); 
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [showTermsModal, termosContent]);

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Shield className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        <Controller
          name={fieldName}
          control={control}
          rules={
            required ? {
              required: "Você deve aceitar os termos e condições",
            } : {}
          }
          render={({ field }) => {
            const handleCloseModal = () => {
              setShowTermsModal(false);
              
              field.onChange(true);
            };

            return (
              <>
                <CampoCheckbox
                  id={fieldName}
                  label={
                    <span>
                      Li e aceito os{" "}
                      {termosRota ? (
                        <a
                          href={termosRota}
                          className="text-primary-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Termos de Uso
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowTermsModal(true);
                            setCanCloseTerms(false);
                          }}
                          className="text-primary-600 hover:underline"
                        >
                          Termos de Uso
                        </button>
                      )}{" "}
                      e a{" "}
                      {politicaRota ? (
                        <a
                          href={politicaRota}
                          className="text-primary-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Política de Privacidade
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowTermsModal(true);
                            setCanCloseTerms(false);
                          }}
                          className="text-primary-600 hover:underline"
                        >
                          Política de Privacidade
                        </button>
                      )}{" "}
                      {required && "*"}
                    </span>
                  }
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    if (checked && !termosRota && !politicaRota) {
                      
                      setShowTermsModal(true);
                      setCanCloseTerms(false);
                    } else {
                      
                      field.onChange(checked);
                    }
                  }}
                  disabled={submitMutation?.isPending}
                  control={control}
                />

                {}
                {showTermsModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                      <div className="p-6 border-b border-neutral-200">
                        <h3 className="text-xl font-bold text-neutral-900">
                          {termosDescricao}
                        </h3>
                      </div>
                      <div
                        className="p-6 overflow-y-auto flex-grow terms-content"
                        onScroll={(e) => {
                          const target = e.target as HTMLDivElement;
                          const { scrollTop, scrollHeight, clientHeight } = target;
                          if (scrollHeight - scrollTop - clientHeight < 5) {
                            setCanCloseTerms(true);
                          }
                        }}
                      >
                        {isLoadingTermos ? (
                          <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                            <p className="ml-4 text-neutral-600">Carregando termos...</p>
                          </div>
                        ) : termsError ? (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700">{termsError}</p>
                            <button
                              onClick={() => {
                                setTermosContent("");
                                setShowTermsModal(true);
                              }}
                              className="mt-3 text-primary-600 hover:underline text-sm"
                            >
                              Tentar novamente
                            </button>
                          </div>
                        ) : (
                          <pre className="text-neutral-700 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {termosContent}
                          </pre>
                        )}
                      </div>
                      <div className="p-6 border-t border-neutral-200">
                        <Button
                          onClick={handleCloseModal}
                          className="w-full"
                          disabled={!canCloseTerms && !termsError && !isLoadingTermos}
                        >
                          {isLoadingTermos ? "Carregando..." :
                           termsError ? "Fechar" :
                           canCloseTerms ? "Aceitar e Fechar" : "Leia todos os termos para continuar"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          }}
        />
        {errors[fieldName] && errors[fieldName]?.message && (
          <p className="text-red-600 text-sm">
            {errors[fieldName]?.message?.toString()}
          </p>
        )}

        {showReceberEmails && (
          <Controller
            name="receberEmails"
            control={control}
            render={({ field }) => (
              <div className="flex items-start mt-4">
                <input
                  id="receberEmails"
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  disabled={submitMutation?.isPending}
                />
                <label
                  htmlFor="receberEmails"
                  className="ml-3 text-sm text-neutral-700"
                >
                  Desejo receber emails com dicas de bem-estar e novidades
                  da plataforma
                </label>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default SecaoTermos;