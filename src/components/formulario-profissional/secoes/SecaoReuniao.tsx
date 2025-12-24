import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import CampoCheckbox from "../campos/CampoCheckbox";
import { Calendar } from "lucide-react";

interface SecaoReuniaoProps {
  submitMutation: any;
}

const SecaoReuniao: React.FC<SecaoReuniaoProps> = ({ submitMutation }) => {
  const { control, formState: { errors }, watch, setValue } = useFormContext();
  
  const watchedDiaReuniao = watch("diaReuniao");
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(watchedDiaReuniao || null);
  
  const diasSemana = [
    { value: "SEGUNDA", label: "Segunda-feira" },
    { value: "TERCA", label: "Terça-feira" },
    { value: "QUARTA", label: "Quarta-feira" },
    { value: "QUINTA", label: "Quinta-feira" },
    { value: "SEXTA", label: "Sexta-feira" },
    { value: "SABADO", label: "Sábado" },
    { value: "DOMINGO", label: "Domingo" },
  ];

  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  
  const handleDiaClick = (dia: string) => {
    
    if (diaSelecionado === dia) {
      setDiaSelecionado(null);
      setValue("diaReuniao", null);
      setValue("horarioReuniao", null);
    } else {
      
      setDiaSelecionado(dia);
      setValue("diaReuniao", dia);
      setValue("horarioReuniao", null);
    }
  };

  return (
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
              <button
                key={dia.value}
                type="button"
                onClick={() => handleDiaClick(dia.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  diaSelecionado === dia.value
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
                disabled={submitMutation.isPending}
              >
                {dia.label}
              </button>
            ))}
          </div>
          {!diaSelecionado && errors.diaReuniao && errors.diaReuniao.message && (
            <p className="text-red-600 text-sm mt-1">
              {errors.diaReuniao.message.toString()}
            </p>
          )}
        </div>

        {diaSelecionado && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Horário da Reunião *
            </label>
            
            <div className="border border-neutral-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-neutral-900">
                  {diasSemana.find((d) => d.value === diaSelecionado)?.label || diaSelecionado}
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {}
                {horarios.map((horario) => (
                  <Controller
                    key={`${diaSelecionado}-${horario}`}
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
                        disabled={submitMutation.isPending}
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
  );
};

export default SecaoReuniao;