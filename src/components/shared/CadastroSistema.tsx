import React, { useState } from "react";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import apiService from "@/services/api";


import InformacoesBasicas from "@/components/shared/InformacoesBasicas";
import SecaoTermos from "@/components/shared/SecaoTermos";


interface CadastroSistemaData {
  
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  telefone: string;
  ddi: string;
  cpf: string;

  
  aceitaTermos: boolean;
}

const CadastroSistema: React.FC = () => {
  const router = useRouter();
  const [submitSuccess, setSubmitSuccess] = useState(false);

  
  const isProfissional = router.pathname.includes('/profissional');
  const isPaciente = router.pathname.includes('/paciente');

  const methods = useForm<CadastroSistemaData>({
    defaultValues: {
      nomeCompleto: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      telefone: "",
      ddi: "+55",
      cpf: "",
      aceitaTermos: false,
    },
    mode: "onChange", 
  });

  const { handleSubmit } = methods;

  
  const onSubmit = async (data: CadastroSistemaData) => {
    try {
      submitMutation.mutate(data);
    } catch (error) {
      
    }
  };

  const submitMutation = useMutation({
    mutationFn: async (data: CadastroSistemaData) => {
      
      const dataToSubmit = {
        ...data,
        cpf: data.cpf.replace(/\D/g, ""),
        telefone: data.telefone.replace(/\D/g, ""),
      };

      try {
        
        const result = isProfissional
          ? await apiService.criarUsuarioProfissional(dataToSubmit)
          : await apiService.criarUsuarioPaciente(dataToSubmit);

        
        return {
          ...result,
          originalCpf: dataToSubmit.cpf,
          email: data.email,
          senha: data.senha
        };
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      setSubmitSuccess(true);

      
      
      if (data.id) {
        sessionStorage.setItem('usuarioId', data.id.toString());
      }

      
      if (data.originalCpf) {
        sessionStorage.setItem('userCpf', data.originalCpf);
      }

      
      if (isPaciente && data.email && data.senha) {
        sessionStorage.setItem('userEmail', data.email);
        sessionStorage.setItem('userPassword', data.senha);
      }

      
      setTimeout(() => {
        if (isProfissional) {
          router.push("/profissional/informacoes-pessoais");
        } else {
          router.push("/paciente/questionario-foco");
        }
      }, 3000);
    },
    onError: (error: any) => {
      
      let errorMessage = "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.";

      if (error?.response?.data) {
        const errorData = error.response.data;

        
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }

        
        if (errorMessage.toLowerCase().includes('email já cadastrado') ||
            errorMessage.toLowerCase().includes('email já está cadastrado')) {
          errorMessage = "Este email já está cadastrado no sistema. Por favor, faça login ou use outro email.";
        } else if (errorMessage.toLowerCase().includes('cpf já cadastrado') ||
                   errorMessage.toLowerCase().includes('cpf já está cadastrado')) {
          errorMessage = "Este CPF já está cadastrado no sistema. Por favor, verifique seus dados.";
        } else if (errorMessage.toLowerCase().includes('senha')) {
          errorMessage = "Erro relacionado à senha. Verifique se ela atende aos requisitos.";
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    },
  });

  if (submitSuccess) {
    return (
      <Layout
        title="Cadastro criado com sucesso!"
        description="Seu cadastro foi criado"
      >
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Cadastro criado com sucesso!
              </h2>
              <p className="text-neutral-600 mb-6">
                Estamos redirecionando você para continuar seu cadastro...
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

  return (
    <Layout
      title="Cadastro no Sistema"
      description="Insira as informações básicas para o cadastro no sistema"
    >
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Cadastro no Sistema
            </h1>
            <p className="text-neutral-600">
              Insira as informações básicas para o cadastro no sistema
            </p>
          </div>

          {}
          <Card className="p-6 sm:p-8">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {}
                <InformacoesBasicas
                  submitMutation={submitMutation}
                  required={true}
                  cpfRequired={true}
                  showCpf={true}
                  showPassword={true}
                  showConfirmPassword={true}
                />

                {}
                <SecaoTermos
                  submitMutation={submitMutation}
                />

                {}
                <div className="pt-6">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending
                      ? "Enviando..."
                      : "Finalizar Cadastro"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CadastroSistema;
