import React, { useState, useEffect } from "react";
import { FormProvider, Controller, UseFormReturn } from "react-hook-form";
import { User, Users, GraduationCap, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import CampoSelect from "@/components/formulario-profissional/campos/CampoSelect";
import CampoData from "@/components/formulario-profissional/campos/CampoData";
import CampoTextArea from "@/components/formulario-profissional/campos/CampoTextArea";
import CampoCheckbox from "@/components/formulario-profissional/campos/CampoCheckbox";
import CampoNumero from "@/components/formulario-profissional/campos/CampoNumero";
import CampoTexto from "@/components/formulario-profissional/campos/CampoTexto";
import { applyCrpMask, validateCrp, applyCepMask, validateCep } from "@/utils/mascaras";
import axios from "axios";
import { InformacoesPessoaisData } from "../types";
import { identidadesGenero, religioes, abordagensTerapeuticas, tiposTerapia, modalidadesAtendimento } from "../constants";
import CampoRedesSociais from "../../campos/CampoRedesSociais";

interface TelaDadosPessoaisProps {
  methods: UseFormReturn<InformacoesPessoaisData>;
  onSubmit: (data: InformacoesPessoaisData) => void;
  errors: any;
  register: any;
  setValue: any;
  control: any;
}

const TelaDadosPessoais: React.FC<TelaDadosPessoaisProps> = ({
  methods,
  onSubmit,
  errors,
  register,
  setValue,
  control,
}) => {
  const { watch } = methods;
  const [loadingCep, setLoadingCep] = useState(false);
  const [checkboxesSelecionados, setCheckboxesSelecionados] = useState<string[]>([]);

  
  const watchedModalidadeAtendimento = watch("modalidadeAtendimento");
  const cep = watch("cep");

  
  const abordagensPrincipais = watch("abordagensPrincipais") || [];
  const abordagensSecundarias = watch("abordagensSecundarias") || [];

  
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setCheckboxesSelecionados([...checkboxesSelecionados, value]);
    } else {
      setCheckboxesSelecionados(checkboxesSelecionados.filter(v => v !== value));
    }
  };

  const definirComoPrincipais = () => {
    if (checkboxesSelecionados.length === 0) return;

    const novasAbordagens = [...abordagensPrincipais, ...checkboxesSelecionados];
    setValue("abordagensPrincipais", novasAbordagens);
    setCheckboxesSelecionados([]);
  };

  const definirComoSecundarias = () => {
    if (checkboxesSelecionados.length === 0) return;

    const novasAbordagens = [...abordagensSecundarias, ...checkboxesSelecionados];
    setValue("abordagensSecundarias", novasAbordagens);
    setCheckboxesSelecionados([]);
  };

  const removerPrincipal = (valor: string) => {
    setValue("abordagensPrincipais", abordagensPrincipais.filter((v: string) => v !== valor));
  };

  const removerSecundaria = (valor: string) => {
    setValue("abordagensSecundarias", abordagensSecundarias.filter((v: string) => v !== valor));
  };

  
  const isAbordagemCategorizada = (value: string) => {
    return abordagensPrincipais.includes(value) || abordagensSecundarias.includes(value);
  };

  
  const mostrarCamposEndereco =
    watchedModalidadeAtendimento?.toLowerCase() === "presencial" ||
    watchedModalidadeAtendimento?.toLowerCase() === "hibrido";

  
  useEffect(() => {
    if (cep && cep.length === 8) { 
      const cleanCep = cep.replace(/\D/g, ''); 

      if (cleanCep.length === 8) { 
        const fetchCepInfo = async () => {
          setLoadingCep(true);
          try {
            const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

            if (!response.data.erro) {

              setValue("logradouro", response.data.logradouro || "");
              setValue("rua", response.data.logradouro || "");
              setValue("bairro", response.data.bairro || "");
              setValue("localidade", response.data.localidade || "");
              setValue("localizacaoProfissional", response.data.localidade || "");
              setValue("uf", response.data.uf || "");
              setValue("estado", response.data.estado || "");
            }
          } catch (error) {
            
          } finally {
            setLoadingCep(false);
          }
        };

        fetchCepInfo();
      }
    } else if (cep && cep.length === 0) {
      
      setValue("logradouro", "");
      setValue("rua", "");
      setValue("bairro", "");
      setValue("localidade", "");
      setValue("localizacaoProfissional", "");
      setValue("uf", "");
      setValue("estado", "");
    }
  }, [cep, setValue]);

  
  
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">
            Informações Pessoais
          </h1>
          <p className="text-neutral-600">
            Complete as informações pessoais do seu perfil
          </p>
        </div>

        {}
        <Card className="p-6 sm:p-8">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Dados Pessoais
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <div>
                    <label
                      htmlFor="crp"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      CRP/CRM (opcional)
                    </label>
                    <Input
                      id="crp"
                      type="text"
                      placeholder="Ex: 12/34567"
                      {...register("crp")}
                      error={errors.crp?.message?.toString()}
                    />
                  </div>

                  {}
                  <CampoData
                    id="dataNascimento"
                    label="Data de Nascimento"
                    placeholder="DD/MM/AAAA"
                    control={control}
                    required
                    rules={{
                      required: "Data de nascimento é obrigatória",
                    }}
                  />

                  {}
                  <div>
                    <CampoSelect
                      id="identidadeGenero"
                      label="Sexo *"
                      options={identidadesGenero}
                      placeholder="Selecione abaixo"
                      control={control}
                      rules={{
                        required: "Sexo é obrigatório",
                      }}
                    />
                    {errors.identidadeGenero && errors.identidadeGenero.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.identidadeGenero.message.toString()}
                      </p>
                    )}
                  </div>

                  {}
                  <div>
                    <CampoSelect
                      id="religiao"
                      label="Religião *"
                      options={religioes}
                      placeholder="Selecione sua religião"
                      control={control}
                      rules={{
                        required: "Religião é obrigatória",
                      }}
                    />
                    {errors.religiao && errors.religiao.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.religiao.message.toString()}
                      </p>
                    )}
                  </div>

                  {}
                  <div>
                    <CampoSelect
                      id="modalidadeAtendimento"
                      label="Modalidade de Atendimento *"
                      options={modalidadesAtendimento}
                      placeholder="Selecione a modalidade"
                      control={control}
                      rules={{
                        required: "Modalidade de atendimento é obrigatória",
                      }}
                    />
                    {errors.modalidadeAtendimento && errors.modalidadeAtendimento.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.modalidadeAtendimento.message.toString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {}
              {mostrarCamposEndereco && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900">
                      Localização do Consultório
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {}
                    <div>
                      <label
                        htmlFor="cep"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        CEP *
                      </label>
                      <div className="relative">
                        <Input
                          id="cep"
                          type="text"
                          placeholder="00000-000"
                          {...register("cep", {
                            required: mostrarCamposEndereco ? "CEP é obrigatório" : false,
                            pattern: {
                              value: /^\d{5}-?\d{3}$/,
                              message: "CEP inválido (formato: 00000-000)",
                            },
                            validate: validateCep,
                            setValueAs: (value: string) => {
                              if (!value) return "";
                              return value.replace(/\D/g, '');
                            }
                          })}
                          error={errors.cep?.message?.toString()}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (!inputValue) {
                              setValue("cep", "");
                            } else {
                              const maskedValue = applyCepMask(inputValue);
                              setValue("cep", maskedValue);
                            }
                          }}
                          disabled={loadingCep}
                          className={loadingCep ? "opacity-75 cursor-not-allowed" : ""}
                        />
                        {loadingCep && (
                          <div className="absolute right-3 top-3">
                            <div className="w-5 h-5 border-t-2 border-blue-600 border-solid rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <CampoTexto
                        id="localizacaoProfissional"
                        label="Cidade"
                        placeholder="Cidade"
                        register={register}
                        required={mostrarCamposEndereco}
                        rules={{
                          required: mostrarCamposEndereco ? "Cidade é obrigatória" : false,
                        }}
                        error={errors.localizacaoProfissional?.message?.toString()}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="uf"
                        label="UF"
                        placeholder="UF (ex: SP)"
                        register={register}
                        required={mostrarCamposEndereco}
                        rules={{
                          required: mostrarCamposEndereco ? "UF é obrigatória" : false,
                          minLength: {
                            value: 2,
                            message: "UF deve ter 2 dígitos",
                          },
                          maxLength: {
                            value: 2,
                            message: "UF deve ter 2 dígitos",
                          },
                          pattern: {
                            value: /^[A-Z]{2}$/,
                            message: "UF deve conter apenas 2 letras maiúsculas (ex: SP)",
                          },
                        }}
                        error={errors.uf?.message?.toString()}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="rua"
                        label="Rua"
                        placeholder="Nome da rua"
                        register={register}
                        required={mostrarCamposEndereco}
                        rules={{
                          required: mostrarCamposEndereco ? "Rua é obrigatória" : false,
                        }}
                        error={errors.rua?.message?.toString()}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="bairro"
                        label="Bairro"
                        placeholder="Nome do bairro"
                        register={register}
                        error={errors.bairro?.message?.toString()}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="numero"
                        label="Número"
                        placeholder="Número do endereço"
                        register={register}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="complemento"
                        label="Complemento"
                        placeholder="Apartamento, bloco, etc."
                        register={register}
                      />
                    </div>
                  </div>
                </div>
              )}

              {}
              <div>
                <CampoRedesSociais />
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Perfil Profissional
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <Controller
                    name="abordagensPrincipais"
                    control={control}
                    rules={{
                      validate: (value) => {
                        
                        if (!value || value.length === 0) {
                          return "Selecione pelo menos uma abordagem principal";
                        }
                        return true;
                      }
                    }}
                    render={({ field }) => (
                      <div className="space-y-2">
                        {}
                        <input
                          type="text"
                          ref={field.ref}
                          name={field.name}
                          value={field.value?.join(',') || ''}
                          onChange={() => {}}
                          tabIndex={-1}
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            opacity: 0,
                            height: 0,
                            width: 0,
                            pointerEvents: 'none'
                          }}
                        />
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-neutral-700">
                            Abordagens Terapêuticas *
                          </label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={definirComoPrincipais}
                              disabled={checkboxesSelecionados.length === 0}
                              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                checkboxesSelecionados.length === 0
                                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                  : "bg-primary-600 text-white hover:bg-primary-700"
                              }`}
                            >
                              Principais
                            </button>
                            <button
                              type="button"
                              onClick={definirComoSecundarias}
                              disabled={checkboxesSelecionados.length === 0}
                              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                checkboxesSelecionados.length === 0
                                  ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                                  : "bg-neutral-600 text-white hover:bg-neutral-700"
                              }`}
                            >
                              Secundárias
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto p-2 border border-neutral-300 rounded-lg">
                          {abordagensTerapeuticas.map((abordagem) => {
                            const isCategorizada = isAbordagemCategorizada(abordagem.value);
                            const isChecked = checkboxesSelecionados.includes(abordagem.value);

                            return (
                              <div key={abordagem.value} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`abordagem-${abordagem.value}`}
                                  value={abordagem.value}
                                  checked={isChecked}
                                  disabled={isCategorizada}
                                  onChange={(e) => handleCheckboxChange(abordagem.value, e.target.checked)}
                                  className={`h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 ${
                                    isCategorizada ? "opacity-50 cursor-not-allowed" : ""
                                  }`}
                                />
                                <label
                                  htmlFor={`abordagem-${abordagem.value}`}
                                  className={`ml-2 block text-sm ${
                                    isCategorizada ? "text-neutral-400 line-through" : "text-neutral-700"
                                  }`}
                                >
                                  {abordagem.label}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                        {errors.abordagensPrincipais && errors.abordagensPrincipais.message && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.abordagensPrincipais.message.toString()}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-neutral-700">
                      Abordagens Selecionadas
                    </label>

                    {}
                    <div className="border border-primary-300 rounded-lg p-3 bg-primary-50">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">📌</span>
                        <h3 className="text-sm font-semibold text-primary-800">Principais</h3>
                        <span className="ml-auto text-xs text-primary-600">
                          {abordagensPrincipais.length}
                        </span>
                      </div>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {abordagensPrincipais.length === 0 ? (
                          <p className="text-xs text-neutral-500 italic">
                            Nenhuma abordagem principal selecionada
                          </p>
                        ) : (
                          abordagensPrincipais.map((valor: string) => {
                            const abordagem = abordagensTerapeuticas.find(a => a.value === valor);
                            return (
                              <div key={valor} className="flex items-center justify-between bg-white rounded px-2 py-1">
                                <span className="text-xs text-neutral-700">{abordagem?.label}</span>
                                <button
                                  type="button"
                                  onClick={() => removerPrincipal(valor)}
                                  className="text-red-500 hover:text-red-700 text-xs font-bold"
                                  title="Remover"
                                >
                                  ✕
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {}
                    <div className="border border-neutral-300 rounded-lg p-3 bg-neutral-50">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">📋</span>
                        <h3 className="text-sm font-semibold text-neutral-700">Secundárias</h3>
                        <span className="ml-auto text-xs text-neutral-600">
                          {abordagensSecundarias.length}
                        </span>
                      </div>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {abordagensSecundarias.length === 0 ? (
                          <p className="text-xs text-neutral-500 italic">
                            Nenhuma abordagem secundária selecionada
                          </p>
                        ) : (
                          abordagensSecundarias.map((valor: string) => {
                            const abordagem = abordagensTerapeuticas.find(a => a.value === valor);
                            return (
                              <div key={valor} className="flex items-center justify-between bg-white rounded px-2 py-1">
                                <span className="text-xs text-neutral-700">{abordagem?.label}</span>
                                <button
                                  type="button"
                                  onClick={() => removerSecundaria(valor)}
                                  className="text-red-500 hover:text-red-700 text-xs font-bold"
                                  title="Remover"
                                >
                                  ✕
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  {}
                  <Controller
                    name="tipoTerapia"
                    control={control}
                    rules={{
                      required: "Tipo de terapia é obrigatório",
                      validate: (value) => (value && value.length > 0) || "Selecione pelo menos um tipo de terapia",
                    }}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-700">
                          Tipo de Terapia *
                        </label>
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto p-2 border border-neutral-300 rounded-lg">
                          {tiposTerapia.map((tipo) => (
                            <div key={tipo.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`tipo-${tipo.value}`}
                                value={tipo.value}
                                checked={field.value?.includes(tipo.value) || false}
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...(field.value || []), tipo.value]
                                    : (field.value || []).filter((v: string) => v !== tipo.value);
                                  field.onChange(newValue);
                                }}
                                className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                              />
                              <label
                                htmlFor={`tipo-${tipo.value}`}
                                className="ml-2 block text-sm text-neutral-700"
                              >
                                {tipo.label}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.tipoTerapia && errors.tipoTerapia.message && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.tipoTerapia.message.toString()}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {}
                  <CampoNumero
                    id="experienciaAnos"
                    label="Anos de Experiência"
                    placeholder="5"
                    min={0}
                    max={50}
                    register={register}
                    required
                    rules={{
                      required: "Anos de experiência são obrigatórios",
                      setValueAs: (value: string) => {
                        if (!value) return 0;
                        return parseInt(value, 10) || 0;
                      },
                      validate: (value: string | number) => {
                        const num = Number(value);
                        if (isNaN(num)) return "Valor deve ser um número";
                        if (num < 0) return "Anos de experiência não podem ser negativos";
                        if (num > 50) return "Máximo de 50 anos de experiência";
                        return true;
                      }
                    }}
                    error={errors.experienciaAnos?.message?.toString()}
                  />

                  {}
                  <div className="md:col-span-2 space-y-4">
                    <Controller
                      name="primeiraConsultaGratuita"
                      control={control}
                      render={({ field }) => (
                        <CampoCheckbox
                          id="primeiraConsultaGratuita"
                          label="Sessão de alinhamento gratuita"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          control={control}
                        />
                      )}
                    />
                  </div>

                  {}
                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="oQueNaoGostaAtender"
                      label="O que não gosta de atender e por quê ?"
                      placeholder="Descreva quais temas ou situações você evita atender e os motivos..."
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
                      error={errors.oQueNaoGostaAtender?.message?.toString()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="casesSucesso"
                      label="Cite 3 cases de sucesso"
                      placeholder="Descreva três casos de sucesso em sua prática profissional (mantendo sigilo e anonimato)..."
                      rows={4}
                      register={register}
                      
                      
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 50,
                          message: "Descreva com mais detalhes (mínimo 50 caracteres)",
                        },
                      }}
                      error={errors.casesSucesso?.message?.toString()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="feedbackPacientes"
                      label="O que os pacientes costumam dizer como feedback ?"
                      placeholder="Descreva os feedbacks mais comuns que recebe de seus pacientes..."
                      rows={4}
                      register={register}
                      
                      
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 30,
                          message: "Descreva com mais detalhes (mínimo 30 caracteres)",
                        },
                      }}
                      error={errors.feedbackPacientes?.message?.toString()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="demandaMaisComum"
                      label="Qual a demanda que você mais atende ?"
                      placeholder="Descreva as demandas mais comuns que você atende em sua prática..."
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
                      error={errors.demandaMaisComum?.message?.toString()}
                    />
                  </div>
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Formação
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <CampoTexto
                    id="instituicaoFormacao"
                    label="Instituição de Formação (opcional)"
                    placeholder="Nome da universidade"
                    register={register}
                    error={errors.instituicaoFormacao?.message?.toString()}
                  />

                  {}
                  <CampoNumero
                    id="anoFormacao"
                    label="Ano de Formação (opcional)"
                    placeholder="2020"
                    register={register}
                    rules={{
                      setValueAs: (value: string) => {
                        if (!value) return 0;
                        return parseInt(value, 10) || 0;
                      },
                      validate: (value: string | number) => {
                        const num = Number(value);
                        
                        if (!num || num === 0) return true;
                        const currentYear = new Date().getFullYear();
                        if (isNaN(num)) return "Valor deve ser um número";
                        if (num < 1950) return "Ano inválido";
                        if (num > currentYear) return "Ano não pode ser no futuro";
                        return true;
                      }
                    }}
                    error={errors.anoFormacao?.message?.toString()}
                  />

                  {}
                  <div className="md:col-span-2">
                    <CampoTexto
                      id="especialidades"
                      label="Especialidades"
                      placeholder="Separe por vírgulas (ex: Ansiedade, Depressão, Relacionamentos)"
                      register={register}
                      required
                      rules={{
                        required: "Especialidades são obrigatórias",
                        setValueAs: (value: string) => {
                          if (!value) return [];
                          if (Array.isArray(value)) return value;
                          if (typeof value === 'string') {
                            return value
                              .split(',')
                              .map((item: string) => item.trim())
                              .filter((item: string) => item.length > 0);
                          }
                          return [];
                        },
                        validate: (value: string[]) => {
                          if (!value || value.length === 0) return "Especialidades são obrigatórias";
                          if (value.length < 1) return "Informe pelo menos uma especialidade";
                          const shortItems = value.filter((item: string) => item.length < 3);
                          if (shortItems.length > 0) return "Cada especialidade deve ter pelo menos 3 caracteres";
                          return true;
                        },
                      }}
                      error={errors.especialidades?.message?.toString()}
                    />
                  </div>

                  {}
                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="bio"
                      label="Biografia Profissional"
                      placeholder="Conte um pouco sobre sua experiência profissional, abordagens terapêuticas e o que motiva seu trabalho..."
                      rows={4}
                      register={register}
                      required
                      rules={{
                        required: "Biografia profissional é obrigatória",
                        minLength: {
                          value: 50,
                          message: "Biografia deve ter pelo menos 50 caracteres",
                        },
                      }}
                      error={errors.bio?.message?.toString()}
                    />
                  </div>
                </div>
              </div>

              {}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                >
                  Continuar para Informações Pessoais
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
};

export default TelaDadosPessoais;
