import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import CampoNumero from "../campos/CampoNumero";
import { CreditCard } from "lucide-react";

interface SecaoPagamentoProps {
  submitMutation: any;
}

const SecaoPagamento: React.FC<SecaoPagamentoProps> = ({ submitMutation }) => {
  const { register, formState: { errors } } = useFormContext();

  return (
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
            min: {
              value: 50,
              message: "Valor mínimo é R$50",
            },
            max: {
              value: 1000,
              message: "Valor máximo é R$1000",
            },
          }}
          error={errors.valorSessao?.message?.toString()}
          disabled={submitMutation.isPending}
        />
      </div>
    </div>
  );
};

export default SecaoPagamento;