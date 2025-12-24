import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Clock } from "lucide-react";
import Checkbox from "@/components/ui/Checkbox";
import { DIAS_SEMANA, HORARIOS_ATENDIMENTO } from "@/constants/formularios";

interface SecaoDisponibilidadeProps {
  submitMutation?: any;
  title?: string;
  diasFieldName?: string;
  horariosFieldName?: string;
  diasLabel?: string;
  horariosLabel?: string;
  showFlexibilidadeHorarios?: boolean;
  flexibilidadeFieldName?: string;
}

const SecaoDisponibilidade: React.FC<SecaoDisponibilidadeProps> = ({
  submitMutation,
  title = "Disponibilidade",
  diasFieldName = "diasAtendimento",
  horariosFieldName = "horariosAtendimento",
  diasLabel = "Dias de Atendimento *",
  horariosLabel = "Horários de Atendimento *",
  showFlexibilidadeHorarios = false,
  flexibilidadeFieldName = "flexibilidadeHorarios"
}) => {
  const { control, formState: { errors }, watch, setValue, register } = useFormContext();
  
  const watchedDias = watch(diasFieldName);
  const [diaSelecionado, setDiaSelecionado] = useState<string | null>(null);
  
  
  const handleDiaClick = (dia: string) => {
    if (diaSelecionado === dia) {
      
      setDiaSelecionado(null);
    } else {
      
      setDiaSelecionado(dia);
    }
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Clock className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900">
          {title}
        </h2>
      </div>

      <div className="space-y-6">
        {showFlexibilidadeHorarios && (
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register(flexibilidadeFieldName)}
                disabled={submitMutation?.isPending}
                className="rounded border-neutral-300"
              />
              <span className="text-sm text-neutral-700">
                Tenho flexibilidade para ajustar horários conforme necessidade
              </span>
            </label>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            {diasLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {DIAS_SEMANA.map((dia) => (
              <div key={dia.value} className="flex items-center">
                <Controller
                  name={diasFieldName}
                  control={control}
                  rules={{
                    required: "Selecione pelo menos um dia disponível",
                  }}
                  render={({ field }) => (
                    <Checkbox
                      id={`dia-${dia.value}`}
                      label={dia.label}
                      checked={field.value?.includes(dia.value)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), dia.value]
                          : (field.value || []).filter(
                              (v: string) => v !== dia.value
                            );
                        field.onChange(newValue);
                        
                        
                        if (!checked) {
                          setValue(`${horariosFieldName}.${dia.value}`, []);
                          
                          
                          if (diaSelecionado === dia.value) {
                            setDiaSelecionado(null);
                          }
                        } 
                        
                        else if (checked && !diaSelecionado) {
                          setDiaSelecionado(dia.value);
                        }
                      }}
                      disabled={submitMutation?.isPending}
                    />
                  )}
                />
              </div>
            ))}
            {errors[diasFieldName] && (
              <p className="text-red-600 text-sm col-span-full">
                {errors[diasFieldName]?.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {watchedDias && watchedDias.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              {horariosLabel}
            </label>
            
            {}
            <div className="mb-4">
              <p className="text-sm text-neutral-600 mb-2">Selecione um dia para definir os horários:</p>
              <div className="flex flex-wrap gap-2">
                {DIAS_SEMANA
                  .filter((dia) => watchedDias.includes(dia.value))
                  .map((dia) => {
                    const diaLabel = dia.label;
                    return (
                      <button
                        key={`btn-${dia.value}`}
                        type="button"
                        onClick={() => handleDiaClick(dia.value)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          diaSelecionado === dia.value
                            ? "bg-primary-600 text-white"
                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        }`}
                      >
                        {diaLabel}
                      </button>
                    );
                  })}
              </div>
            </div>
            
            {}
            {diaSelecionado && (
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-neutral-900">
                    {DIAS_SEMANA.find((d) => d.value === diaSelecionado)?.label || diaSelecionado}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setDiaSelecionado(null)}
                    className="text-sm text-neutral-500 hover:text-neutral-700"
                  >
                    Fechar
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {}
                  {HORARIOS_ATENDIMENTO.map((horario) => (
                    <Controller
                      key={`${diaSelecionado}-${horario}`}
                      name={`${horariosFieldName}.${diaSelecionado}`}
                      control={control}
                      render={({ field }) => {
                        const currentValue = field.value || [];
                        return (
                          <Checkbox
                            id={`horario-${diaSelecionado}-${horario}`}
                            label={horario}
                            checked={currentValue.includes(horario)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...currentValue, horario]
                                : currentValue.filter(
                                    (h: string) => h !== horario
                                  );
                              field.onChange(newValue);
                            }}
                            disabled={submitMutation?.isPending}
                          />
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SecaoDisponibilidade;