import React from "react";
import SecaoDisponibilidadeShared from "@/components/shared/SecaoDisponibilidade";

interface SecaoDisponibilidadeProps {
  submitMutation: any;
}

const SecaoDisponibilidade: React.FC<SecaoDisponibilidadeProps> = ({ submitMutation }) => {
  return (
    <SecaoDisponibilidadeShared 
      submitMutation={submitMutation}
      diasFieldName="diasAtendimento"
      horariosFieldName="horariosAtendimento"
      diasLabel="Dias de Atendimento *"
      horariosLabel="Horários de Atendimento *"
    />
  );
};

export default SecaoDisponibilidade;