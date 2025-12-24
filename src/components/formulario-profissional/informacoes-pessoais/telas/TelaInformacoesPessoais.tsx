import React from "react";
import { FormProvider, Controller, UseFormReturn } from "react-hook-form";
import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CampoSelect from "@/components/formulario-profissional/campos/CampoSelect";
import CampoTextArea from "@/components/formulario-profissional/campos/CampoTextArea";
import CampoCheckbox from "@/components/formulario-profissional/campos/CampoCheckbox";
import CampoNumero from "@/components/formulario-profissional/campos/CampoNumero";
import CampoTexto from "@/components/formulario-profissional/campos/CampoTexto";
import CampoRedesSociais from "@/components/formulario-profissional/campos/CampoRedesSociais";
import CampoLGBTQ from "../campos/CampoLGBTQ";
import { InformacoesPessoaisData } from "../types";
import { estadosCivis } from "../constants";

interface TelaInformacoesPessoaisProps {
  methods: UseFormReturn<InformacoesPessoaisData>;
  onSubmit: (data: InformacoesPessoaisData) => void;
  onBack: () => void;
  errors: any;
  register: any;
  control: any;
  watchedEstadoCivil: string;
  watchedPossuiFilhos: boolean;
  watchedLgbtqFriendly: boolean;
}

const TelaInformacoesPessoais: React.FC<TelaInformacoesPessoaisProps> = ({
  methods,
  onSubmit,
  onBack,
  errors,
  register,
  control,
  watchedEstadoCivil,
  watchedPossuiFilhos,
  watchedLgbtqFriendly,
}) => {
  const { setValue, watch } = methods;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">
            Informações Pessoais Detalhadas
          </h1>
          <p className="text-neutral-600">
            Conte-nos mais sobre você para criar um perfil mais completo
          </p>
        </div>

        {}
        <Card className="p-6 sm:p-8">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Heart className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Informações Pessoais
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <div>
                    <CampoSelect
                      id="estadoCivil"
                      label="Estado Civil *"
                      options={estadosCivis}
                      placeholder="Selecione seu estado civil"
                      control={control}
                      rules={{
                        required: "Estado civil é obrigatório",
                      }}
                    />
                    {errors.estadoCivil && errors.estadoCivil.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.estadoCivil.message.toString()}
                      </p>
                    )}
                  </div>

                  {}
                  {watchedEstadoCivil && watchedEstadoCivil !== "SOLTEIRO" && (
                    <CampoNumero
                      id="anosRelacionamento"
                      label="Quantos anos de relacionamento?"
                      placeholder="5"
                      min={1}
                      max={70}
                      register={register}
                      required
                      rules={{
                        required: "Anos de relacionamento são obrigatórios",
                        setValueAs: (value: string) => {
                          if (!value) return 0;
                          return parseInt(value, 10) || 0;
                        },
                        validate: (value: string | number) => {
                          const num = Number(value);
                          if (isNaN(num)) return "Valor deve ser um número";
                          if (num < 1) return "Deve ter pelo menos 1 ano de relacionamento";
                          if (num > 70) return "Máximo de 70 anos de relacionamento";
                          return true;
                        }
                      }}
                      error={errors.anosRelacionamento?.message?.toString()}
                    />
                  )}

                  {}
                  <div className="md:col-span-2">
                    <Controller
                      name="possuiFilhos"
                      control={control}
                      render={({ field }) => (
                        <CampoCheckbox
                          id="possuiFilhos"
                          label="Tenho filho(s)"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          control={control}
                        />
                      )}
                    />
                  </div>

                  {}
                  {watchedPossuiFilhos && (
                    <>
                      <CampoNumero
                        id="quantidadeFilhos"
                        label="Quantos filhos você tem?"
                        placeholder="2"
                        min={1}
                        max={15}
                        register={register}
                        required
                        rules={{
                          required: "Quantidade de filhos é obrigatória",
                          setValueAs: (value: string) => {
                            if (!value) return 0;
                            return parseInt(value, 10) || 0;
                          },
                          validate: (value: string | number) => {
                            const num = Number(value);
                            if (isNaN(num)) return "Valor deve ser um número";
                            if (num < 1) return "Deve ter pelo menos 1 filho";
                            if (num > 15) return "Máximo de 15 filhos";
                            return true;
                          }
                        }}
                        error={errors.quantidadeFilhos?.message?.toString()}
                      />

                      <CampoTexto
                        id="idadesFilhos"
                        label="Idade(s) do(s) filho(s)"
                        placeholder="Ex: 5, 8, 12 (separado por vírgula)"
                        register={register}
                        required
                        rules={{
                          required: "Informe a(s) idade(s) do(s) filho(s)",
                          setValueAs: (value: string) => {
                            if (!value) return [];
                            if (Array.isArray(value)) return value;
                            if (typeof value === 'string') {
                              return value
                                .split(',')
                                .map((item: string) => {
                                  const num = parseInt(item.trim(), 10);
                                  return isNaN(num) ? 0 : num;
                                })
                                .filter((num: number) => num > 0);
                            }
                            return [];
                          },
                          validate: (value: number[]) => {
                            if (!value || value.length === 0) return "Informe a(s) idade(s) do(s) filho(s)";
                            const invalidAges = value.filter((age: number) => age < 0 || age > 30);
                            if (invalidAges.length > 0) return "Idades devem estar entre 0 e 30 anos";
                            return true;
                          },
                          minLength: {
                            value: 1,
                            message: "Informe a(s) idade(s) do(s) filho(s)",
                          },
                        }}
                        error={errors.idadesFilhos?.message?.toString()}
                      />

                      {}
                      <div className="md:col-span-2">
                        <Controller
                          name="filhoComDeficiencia"
                          control={control}
                          defaultValue={false}
                          render={({ field }) => (
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="filhoComDeficiencia"
                                checked={field.value || false}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                              />
                              <label
                                htmlFor="filhoComDeficiencia"
                                className="text-sm font-medium text-neutral-700 cursor-pointer"
                              >
                                Algum filho possui deficiência?
                              </label>
                            </div>
                          )}
                        />
                      </div>

                      {}
                      {watch("filhoComDeficiencia") && (
                        <div className="md:col-span-2">
                          <CampoTextArea
                            id="justificativaDeficiencia"
                            label="Conte-nos sobre, isso é relevante para o match."
                            placeholder="Descreva como a deficiência do seu filho pode ser relevante..."
                            rows={4}
                            register={register}
                            
                            
                          />
                        </div>
                      )}
                    </>
                  )}

                  {}
                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="assuntosPrediletos"
                      label="Quais seus assuntos prediletos ?"
                      placeholder="Descreva os assuntos que mais gosta de discutir com amigos..."
                      rows={3}
                      register={register}
                      
                      
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 10,
                          message: "Informe ao menos 10 caracteres sobre seus assuntos prediletos",
                        },
                      }}
                      error={errors.assuntosPrediletos?.message?.toString()}
                    />
                  </div>

                  {}
                  {[
                    { id: "hobby", label: "Você tem algum hobby ?", placeholder: "Conte-nos sobre seus hobbies e interesses pessoais...", min: 10, message: "hobbies" },
                    { id: "inspiracao", label: "Quem te inspira e porque ?", placeholder: "Descreva quem são suas inspirações e o que você admira nelas...", min: 10, message: "quem te inspira" },
                    { id: "filmesMarcantes", label: "Quais filmes marcaram sua vida ?", placeholder: "Liste filmes que tiveram impacto significativo em sua vida e por quê...", min: 10, message: "filmes marcantes" },
                    { id: "superacoes", label: "O que você já superou ao longo de sua vida ?", placeholder: "Compartilhe desafios que enfrentou e superou em sua trajetória pessoal...", min: 10, message: "suas superações" },
                    { id: "causaSangue", label: "Qual causa você defende com paixão ?", placeholder: "Descreva causas ou valores pelos quais você lutaria com toda sua convicção...", min: 10, message: "causas importantes para você" },
                    { id: "maiorMudanca", label: "Qual foi a maior mudança em sua vida ?", placeholder: "Conte sobre a mudança mais significativa que ocorreu em sua vida e como ela te afetou...", min: 10, message: "a maior mudança em sua vida" },
                    { id: "marcaDeixar", label: "Se pudesse deixar uma marca para ser levada a diante, qual seria ?", placeholder: "Qual legado você gostaria de deixar para as futuras gerações ?", min: 10, message: "a marca que gostaria de deixar" },
                  ].map((campo) => (
                    <div key={campo.id} className="md:col-span-2">
                      <CampoTextArea
                        id={campo.id}
                        label={campo.label}
                        placeholder={campo.placeholder}
                        rows={3}
                        register={register}
                        
                        
                        required
                        rules={{
                          required: "Este campo é obrigatório",
                          minLength: {
                            value: campo.min,
                            message: `Informe ao menos ${campo.min} caracteres sobre ${campo.message}`,
                          },
                        }}
                        error={errors[campo.id]?.message?.toString()}
                      />
                    </div>
                  ))}

                  {}
                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="trabalhoAntesSaudeMental"
                      label="Antes de trabalhar com saúde mental, você trabalhou com o que ? Me fale um pouco sobre"
                      placeholder="Conte-nos sobre sua trajetória profissional antes de ingressar na área de saúde mental..."
                      rows={4}
                      register={register}
                      
                      
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 20,
                          message: "Descreva com mais detalhes (mínimo 20 caracteres)",
                        },
                      }}
                      error={errors.trabalhoAntesSaudeMental?.message?.toString()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="atenderiaPorAmor"
                      label="Se não precisasse mais atender para ganhar seu sustento, qual público ou demanda você atenderia por amor?"
                      placeholder="Descreva qual público ou demanda específica você atenderia voluntariamente, por amor à profissão..."
                      rows={4}
                      register={register}
                      
                      
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 20,
                          message: "Descreva com mais detalhes (mínimo 20 caracteres)",
                        },
                      }}
                      error={errors.atenderiaPorAmor?.message?.toString()}
                    />
                  </div>
                </div>
              </div>

              {}
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  🏳️‍🌈 Faz atendimento ao público LGBTQ+
                </h3>
                <CampoLGBTQ
                  control={control}
                  register={register}
                  errors={errors}
                  watchedLgbtqFriendly={watchedLgbtqFriendly}
                />
              </div>

              {}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="button" variant="outline" onClick={onBack}>
                  Voltar
                </Button>
                <Button type="submit" size="lg" className="flex-1">
                  Continuar
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
};

export default TelaInformacoesPessoais;
