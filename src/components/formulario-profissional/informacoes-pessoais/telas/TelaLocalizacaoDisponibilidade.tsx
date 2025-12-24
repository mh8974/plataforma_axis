import React, { useState, useEffect } from "react";
import { FormProvider, Controller, UseFormReturn } from "react-hook-form";
import { MapPin, CreditCard, Calendar, Shield, DollarSign } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import CampoTexto from "@/components/formulario-profissional/campos/CampoTexto";
import CampoTextArea from "@/components/formulario-profissional/campos/CampoTextArea";
import CampoNumero from "@/components/formulario-profissional/campos/CampoNumero";
import CampoCheckbox from "@/components/formulario-profissional/campos/CampoCheckbox";
import CampoCheckboxGroup from "@/components/formulario-profissional/campos/CampoCheckboxGroup";
import SecaoDisponibilidade from "@/components/shared/SecaoDisponibilidade";
import { InformacoesPessoaisData } from "../types";
import { diasSemana, horarios, modalidadesAtendimento, faixasEtarias, metodosPagamento } from "../constants";
import Input from "@/components/ui/Input";
import { applyCepMask, validateCep } from "@/utils/mascaras";

interface TelaLocalizacaoDisponibilidadeProps {
  methods: UseFormReturn<InformacoesPessoaisData>;
  onSubmit: (data: InformacoesPessoaisData) => void;
  onBack: () => void;
  errors: any;
  register: any;
  setValue: any;
  control: any;
  watchedModalidadeAtendimento: string;
  watchedDiaReuniao: string;
}

const TelaLocalizacaoDisponibilidade: React.FC<TelaLocalizacaoDisponibilidadeProps> = ({
  methods,
  onSubmit,
  onBack,
  errors,
  register,
  setValue,
  control,
  watchedModalidadeAtendimento,
  watchedDiaReuniao,
}) => {
  const { watch } = methods;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">
            Disponibilidade e Pagamento
          </h1>
          <p className="text-neutral-600">
            Configure sua disponibilidade e finalize seu cadastro
          </p>
        </div>

        {}
        <Card className="p-6 sm:p-8">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
              {}
              <SecaoDisponibilidade
                title="Disponibilidade"
                diasFieldName="diasAtendimento"
                horariosFieldName="horariosAtendimento"
                diasLabel="Dias de Atendimento *"
                horariosLabel="Horários de Atendimento *"
              />

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Pagamento
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CampoNumero
                    id="valorSessao"
                    label="Valor da Sessão (R$)"
                    placeholder="150"
                    step={10}
                    min={50}
                    max={1000}
                    register={register}
                    required
                    rules={{
                      required: "Valor da sessão é obrigatório",
                      setValueAs: (value: string) => {
                        if (!value) return 0;
                        return parseFloat(value) || 0;
                      },
                      validate: (value: string | number) => {
                        const num = Number(value);
                        if (isNaN(num)) return "Valor deve ser um número";
                        if (num < 50) return "Valor mínimo é R$50";
                        if (num > 1000) return "Valor máximo é R$1000";
                        return true;
                      }
                    }}
                    error={errors.valorSessao?.message?.toString()}
                  />
                </div>

                {}
                {watch("valorSessao") !== undefined && 
                 watch("valorSessao") !== null &&
                 watch("valorSessao") !== "" &&
                 Number(watch("valorSessao")) >= 50 &&
                 Number(watch("valorSessao")) <= 1000 && (
                  <div className="mt-6 md:col-span-2">
                    <CampoTextArea
                      id="justificativaValorSessao"
                      label="Você acha justo o valor que cobra ? Justifique..."
                      placeholder="Explique por que concorda com este valor..."
                      rows={4}
                      register={register}
                      rules={{
                        minLength: {
                          value: 10,
                          message: "A justificativa deve ter pelo menos 10 caracteres",
                        },
                      }}
                      error={errors.justificativaValorSessao?.message?.toString()}
                    />
                  </div>
                )}
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Reunião
                  </h2>
                </div>

                <p className="text-neutral-600 mb-6">
                  Selecione um dia e horário para nossa reunião
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Dia da Reunião *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {diasSemana.map((dia) => (
                        <Controller
                          key={dia.value}
                          name="diaReuniao"
                          control={control}
                          rules={{
                            required: "Selecione um dia para a reunião",
                          }}
                          render={({ field }) => (
                            <button
                              type="button"
                              onClick={() => {
                                if (field.value === dia.value) {
                                  field.onChange("");
                                  setValue("horarioReuniao", "");
                                } else {
                                  field.onChange(dia.value);
                                  setValue("horarioReuniao", "");
                                }
                              }}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                field.value === dia.value
                                  ? "bg-primary-600 text-white"
                                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                              }`}
                            >
                              {dia.label}
                            </button>
                          )}
                        />
                      ))}
                    </div>
                    {errors.diaReuniao && errors.diaReuniao.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.diaReuniao.message.toString()}
                      </p>
                    )}
                  </div>

                  {watchedDiaReuniao && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-3">
                        Horário da Reunião *
                      </label>

                      <div className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium text-neutral-900">
                            {diasSemana.find((d) => d.value === watchedDiaReuniao)?.label || watchedDiaReuniao}
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                          {horarios.map((horario) => (
                            <Controller
                              key={`${watchedDiaReuniao}-${horario}`}
                              name="horarioReuniao"
                              control={control}
                              rules={{
                                required: "Selecione um horário para a reunião",
                              }}
                              render={({ field }) => (
                                <button
                                  type="button"
                                  onClick={() => {
                                    field.onChange(horario);
                                  }}
                                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    field.value === horario
                                      ? "bg-primary-600 text-white"
                                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                  }`}
                                >
                                  {horario}
                                </button>
                              )}
                            />
                          ))}
                        </div>
                        {errors.horarioReuniao && errors.horarioReuniao.message && (
                          <p className="text-red-600 text-sm mt-2">
                            {errors.horarioReuniao.message.toString()}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Valores e Convênios
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <Controller
                    name="faixaEtariaAtendimento"
                    control={control}
                    rules={{
                      validate: (value) =>
                        (value && value.length > 0) || "Selecione pelo menos uma faixa etária",
                    }}
                    render={({ field }) => {
                      const todasSelecionado = field.value?.includes("TODAS") || false;

                      const handleCheckboxChange = (faixaValue: string, checked: boolean) => {
                        if (faixaValue === "TODAS") {
                          if (checked) {
                            const todasFaixas = faixasEtarias.map(f => f.value);
                            field.onChange(todasFaixas);
                          } else {
                            field.onChange([]);
                          }
                        } else {
                          const newValue = checked
                            ? [...(field.value || []), faixaValue]
                            : (field.value || []).filter((v: string) => v !== faixaValue && v !== "TODAS");
                          field.onChange(newValue);
                        }
                      };

                      return (
                        <div className="md:col-span-2 space-y-2">
                          <label className="block text-sm font-medium text-neutral-700">
                            Faixa Etária Atendida *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 border border-neutral-300 rounded-lg">
                            {faixasEtarias.map((faixa) => {
                              const isChecked = field.value?.includes(faixa.value) || false;
                              const isDisabled = todasSelecionado && faixa.value !== "TODAS";

                              return (
                                <div key={faixa.value} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`faixa-${faixa.value}`}
                                    value={faixa.value}
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onChange={(e) => handleCheckboxChange(faixa.value, e.target.checked)}
                                    className={`h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 ${
                                      isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                                  />
                                  <label
                                    htmlFor={`faixa-${faixa.value}`}
                                    className={`ml-2 block text-sm ${
                                      isDisabled ? "text-neutral-400 cursor-not-allowed" : "text-neutral-700 cursor-pointer"
                                    }`}
                                  >
                                    {faixa.label}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          {errors.faixaEtariaAtendimento && errors.faixaEtariaAtendimento.message && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.faixaEtariaAtendimento.message.toString()}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />

                  {}
                  <Controller
                    name="metodosPagamento"
                    control={control}
                    rules={{
                      required: "Selecione pelo menos uma forma de pagamento",
                      validate: (value) =>
                        (value && value.length > 0) || "Selecione pelo menos uma forma de pagamento",
                    }}
                    render={({ field }) => {
                      
                      const todosSelecionado = field.value?.includes("TODOS") || false;

                      
                      const handleCheckboxChange = (metodoValue: string, checked: boolean) => {
                        if (metodoValue === "TODOS") {
                          if (checked) {
                            
                            const todosMetodos = metodosPagamento.map(m => m.value);
                            field.onChange(todosMetodos);
                          } else {
                            
                            field.onChange([]);
                          }
                        } else {
                          
                          const newValue = checked
                            ? [...(field.value || []), metodoValue]
                            : (field.value || []).filter((v: string) => v !== metodoValue && v !== "TODOS");
                          field.onChange(newValue);
                        }
                      };

                      return (
                        <div className="md:col-span-2 space-y-2">
                          <label className="block text-sm font-medium text-neutral-700">
                            Formas de Pagamento *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 border border-neutral-300 rounded-lg">
                            {metodosPagamento.map((metodo) => (
                              <div key={metodo.value} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`metodo-${metodo.value}`}
                                  value={metodo.value}
                                  checked={
                                    field.value?.includes(metodo.value) ||
                                    (metodo.value !== "TODOS" && todosSelecionado)
                                  }
                                  disabled={metodo.value !== "TODOS" && todosSelecionado}
                                  onChange={(e) => handleCheckboxChange(metodo.value, e.target.checked)}
                                  className={`h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 ${
                                    (metodo.value !== "TODOS" && todosSelecionado) ? "opacity-50 cursor-not-allowed" : ""
                                  }`}
                                />
                                <label
                                  htmlFor={`metodo-${metodo.value}`}
                                  className={`ml-2 block text-sm ${
                                    (metodo.value !== "TODOS" && todosSelecionado)
                                      ? "text-neutral-400"
                                      : "text-neutral-700"
                                  }`}
                                >
                                  {metodo.label}
                                </label>
                              </div>
                            ))}
                          </div>
                          {errors.metodosPagamento && errors.metodosPagamento.message && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.metodosPagamento.message.toString()}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />

                  {}
                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="politicaCancelamento"
                      label="Política de Cancelamento"
                      placeholder="Descreva sua política de cancelamento de sessões..."
                      rows={3}
                      register={register}
                    />
                  </div>

                  {}
                  <div className="md:col-span-2">
                    <Controller
                      name="aceitaConvenio"
                      control={control}
                      render={({ field }) => (
                        <CampoCheckbox
                          id="aceitaConvenio"
                          label="Faz reembolso de convênio ?"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          control={control}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Termos e Condições
                  </h2>
                </div>

                <div className="space-y-4">
                  <Controller
                    name="aceitaTermos"
                    control={control}
                    rules={{
                      required: "Você deve aceitar os termos e condições",
                    }}
                    render={({ field }) => (
                      <div className="flex items-start">
                        <input
                          id="aceitaTermos"
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                        />
                        <label htmlFor="aceitaTermos" className="ml-3 text-sm text-neutral-700">
                          Li e aceito os{" "}
                          <a href="/termos" className="text-primary-600 hover:text-primary-700">
                            Termos de Uso
                          </a>{" "}
                          e a{" "}
                          <a href="/privacidade" className="text-primary-600 hover:text-primary-700">
                            Política de Privacidade
                          </a>{" "}
                          *
                        </label>
                      </div>
                    )}
                  />
                  {errors.aceitaTermos && errors.aceitaTermos.message && (
                    <p className="text-red-600 text-sm">
                      {errors.aceitaTermos.message.toString()}
                    </p>
                  )}
                </div>
              </div>

              {}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="button" variant="outline" onClick={onBack}>
                  Voltar
                </Button>
                <Button type="submit" size="lg" className="flex-1">
                  Finalizar Cadastro
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
};

export default TelaLocalizacaoDisponibilidade;