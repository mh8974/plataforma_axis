import React from "react";
import InformacoesBasicas from "@/components/shared/InformacoesBasicas";

interface SecaoInformacoesBasicasProps {
  submitMutation: any;
}

const SecaoInformacoesBasicas: React.FC<SecaoInformacoesBasicasProps> = ({
  submitMutation,
}) => {
  return (
    <InformacoesBasicas
      submitMutation={submitMutation}
      required={true}
      cpfRequired={true}
      showCpf={true}
      showPassword={true}
      showConfirmPassword={true}
    />
  );
};

export default SecaoInformacoesBasicas;
