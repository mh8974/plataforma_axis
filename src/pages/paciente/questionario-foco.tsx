import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Card from "@/components/ui/Card";
import FocoPrincipalForm from "@/components/forms/FocoPrincipalForm";
import AreasEspeciaisForm from "@/components/forms/AreasEspeciaisForm";
import { FOCO_PRINCIPAL_OPTIONS } from "@/constants/formularios";
import { useAuth } from "@/hooks/useAuth";
import apiService from "@/services/api";
import authService from "@/services/authService";
import { useQuestionarioFoco } from "@/hooks/useQuestionarioFoco";

const QuestionarioFocoPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showFocoPrincipal, setShowFocoPrincipal] = useState(true);
  const [showAreasEspeciais, setShowAreasEspeciais] = useState(false);
  const [selectedFoco, setSelectedFoco] = useState<string | undefined>(undefined);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [progressoRecuperado, setProgressoRecuperado] = useState(false);

  
  const { salvarProgresso, recuperarProgresso } = useQuestionarioFoco();

  
  const isFluxoCadastro = typeof window !== 'undefined' && sessionStorage.getItem('usuarioId') !== null;

  
  useEffect(() => {
    if (!authLoading && !isFluxoCadastro) {
      
      if (!isAuthenticated || !user) {
        router.push('/login');
        return;
      }
      if (user.tipo !== 'PACIENTE') {
        router.push('/login');
        return;
      }
    }
  }, [isAuthenticated, authLoading, user, router, isFluxoCadastro]);

  
  if (!isFluxoCadastro && (authLoading || !isAuthenticated || !user || user.tipo !== 'PACIENTE')) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </Layout>
    );
  }

  
  useEffect(() => {
    const recuperar = async () => {
      
      const usuarioId = user?.id || (typeof window !== 'undefined' ? sessionStorage.getItem('usuarioId') : null);

      if (!usuarioId) {
        return;
      }

      
      const isFluxoContinuo = sessionStorage.getItem('fluxoContinuo') === 'true';

      try {
        const dados = await recuperarProgresso();

        if (dados) {
          
          if (dados.focoPrincipal) {
            setSelectedFoco(dados.focoPrincipal);
          }
          if (dados.areasEspeciais && dados.areasEspeciais.length > 0) {
            setSelectedAreas(dados.areasEspeciais);
          }

          

          
          if (!isFluxoContinuo) {
            alert('Dados anteriores recuperados! Você pode continuar de onde parou.');
          }
        } else {
          
          const sessionData = sessionStorage.getItem('questionarioFoco');
          if (sessionData) {
            const parsedData = JSON.parse(sessionData);
            if (parsedData.focoPrincipal) setSelectedFoco(parsedData.focoPrincipal);
            if (parsedData.areasEspeciais) setSelectedAreas(parsedData.areasEspeciais);
            
          }
        }
      } catch (error) {
        
      } finally {
        setProgressoRecuperado(true);

        
        if (isFluxoContinuo) {
          sessionStorage.removeItem('fluxoContinuo');
        }
      }
    };

    if (!progressoRecuperado) {
      recuperar();
    }
  }, [progressoRecuperado, recuperarProgresso, router]);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [
    showFocoPrincipal,
    showAreasEspeciais,
    submitSuccess,
  ]);

  const focoPrincipalMutation = useMutation({
    mutationFn: async (data: any) => {
      try {
        
        const usuarioId = user?.id || (typeof window !== 'undefined' ? parseInt(sessionStorage.getItem('usuarioId') || '0') : 0);

        if (!usuarioId) {
          throw new Error("ID do usuário não encontrado. Por favor, faça login novamente.");
        }

        
        const questionarioCompleto = {
          usuarioId: usuarioId,
          ...data,
        };

        
        const result = await apiService.completarQuestionarioPaciente(questionarioCompleto);
        return result;
      } catch (error) {
        
        throw error;
      }
    },
    onSuccess: () => {
      setSubmitSuccess(true);

      
      setTimeout(() => {
        
        authService.clearCadastroData();

        
        sessionStorage.setItem('fluxoContinuo', 'true');

        router.push("/paciente/questionario-paciente");
      }, 3000);
    },
    onError: (error: any) => {
      
      alert(error.response?.data?.message || "Erro ao completar questionário. Tente novamente.");
    },
  });

  const onBackFromFocoPrincipal = () => {
    
    router.push("/paciente/cadastro");
  };

  const onSubmitFocoPrincipal = async (foco: string) => {
    if (!foco) {
      alert("Por favor, selecione um foco principal.");
      return;
    }

    setSelectedFoco(foco);

    
    await salvarProgresso({
      focoPrincipal: foco,
      areasEspeciais: selectedAreas,
    });

    setShowFocoPrincipal(false);
    setShowAreasEspeciais(true);
  };

  const onBackFromAreasEspeciais = () => {
    setShowAreasEspeciais(false);
    setShowFocoPrincipal(true);
  };

  const onSubmitAreasEspeciais = async (areas: string[]) => {
    setSelectedAreas(areas);

    if (areas.length === 0) {
      alert("Por favor, selecione pelo menos uma área especial.");
      return;
    }

    
    await salvarProgresso({
      focoPrincipal: selectedFoco,
      areasEspeciais: areas,
    });

    
    finalizeSubmission();
  };

  const finalizeSubmission = () => {
    
    const dadosQuestionario = {
      focoPrincipal: selectedFoco,
      areasEspeciais: selectedAreas,
    };

    
    

    
    sessionStorage.setItem('questionarioFoco', JSON.stringify(dadosQuestionario));

    
    setSubmitSuccess(true);

    
    setTimeout(() => {
      sessionStorage.setItem('fluxoContinuo', 'true');

      router.push("/paciente/questionario-paciente");
    }, 2000);
  };

  if (submitSuccess) {
    return (
      <Layout
        title="Foco da terapia definido!"
        description="Seu foco terapêutico foi registrado"
      >
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Aguarde um momento !
              </h2>
              <p className="text-neutral-600 mb-6">
                Redirecionando para completar seu perfil...
              </p>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full animate-pulse"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  if (showAreasEspeciais) {
    return (
      <AreasEspeciaisForm
        onSubmit={onSubmitAreasEspeciais}
        onBack={onBackFromAreasEspeciais}
        focoPrincipal={selectedFoco || ""}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
        isSubmitting={focoPrincipalMutation.isPending}
      />
    );
  }

  if (showFocoPrincipal) {
    return (
      <FocoPrincipalForm
        onSubmit={onSubmitFocoPrincipal}
        onBack={onBackFromFocoPrincipal}
        focoOptions={FOCO_PRINCIPAL_OPTIONS}
        selectedFoco={selectedFoco}
        setSelectedFoco={setSelectedFoco}
        isSubmitting={focoPrincipalMutation.isPending}
      />
    );
  }

  return null;
};

export default QuestionarioFocoPage;
