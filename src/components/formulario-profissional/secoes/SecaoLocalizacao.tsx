import React from "react";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import CampoTexto from "../campos/CampoTexto";
import CampoSelect from "../campos/CampoSelect";
import { MapPin } from "lucide-react";

interface SecaoLocalizacaoProps {
  submitMutation: any;
}

const SecaoLocalizacao: React.FC<SecaoLocalizacaoProps> = ({ submitMutation }) => {
  const { register, control, formState: { errors } } = useFormContext();
  
  
  const modalidadeAtendimento = useWatch({
    control,
    name: "modalidadeAtendimento"
  });
  
  
  const modalidadesAtendimento = [
    { value: "presencial", label: "Presencial" },
    { value: "online", label: "Online" },
    { value: "hibrido", label: "Híbrido (Presencial e Online)" },
  ];

  
  const mostrarCamposEndereco = modalidadeAtendimento === "presencial" || modalidadeAtendimento === "hibrido";

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <MapPin className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900">
          Localização
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <CampoSelect
            id="modalidadeAtendimento"
            label="Modalidade de Atendimento *"
            options={modalidadesAtendimento}
            placeholder="Selecione a modalidade"
            disabled={submitMutation.isPending}
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

        {mostrarCamposEndereco && (
          <>
            <div>
              <CampoTexto
                id="localizacaoProfissional"
                label="Localização da Clínica"
                placeholder="Cidade, Estado"
                register={register}
                required
                error={errors.localizacaoProfissional?.message?.toString()}
                disabled={submitMutation.isPending}
              />
            </div>
            
            <div>
              <CampoTexto
                id="rua"
                label="Rua"
                placeholder="Nome da rua"
                register={register}
                required
                error={errors.rua?.message?.toString()}
                disabled={submitMutation.isPending}
              />
            </div>
            
            <div>
              <CampoTexto
                id="numero"
                label="Número"
                placeholder="Número do endereço"
                register={register}
                required
                error={errors.numero?.message?.toString()}
                disabled={submitMutation.isPending}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SecaoLocalizacao;