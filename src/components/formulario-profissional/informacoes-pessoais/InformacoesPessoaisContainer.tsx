import React from "react";
import Layout from "@/components/layout/Layout";
import { useInformacoesPessoais } from "./hooks/useInformacoesPessoais";
import TelaSucesso from "./telas/TelaSucesso";
import TelaDadosPessoais from "./telas/TelaDadosPessoais";
import TelaInformacoesPessoais from "./telas/TelaInformacoesPessoais";
import TelaLocalizacaoDisponibilidade from "./telas/TelaLocalizacaoDisponibilidade";

const InformacoesPessoaisContainer: React.FC = () => {
  const {
    
    submitSuccess,
    tela,

    
    methods,
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    errors,

    
    watchedEstadoCivil,
    watchedPossuiFilhos,
    watchedModalidadeAtendimento,
    watchedDiaReuniao,
    watchedLgbtqFriendly,

    
    onBackFromSegundaTela,
    onBackFromTerceiraTela,

    
    onSubmitTela1,
    onSubmitTela2,
    onSubmitFinal,
  } = useInformacoesPessoais();

  
  let content;
  if (submitSuccess) {
    content = <TelaSucesso />;
  } else if (tela === 1) {
    content = (
      <TelaDadosPessoais
        methods={methods}
        onSubmit={onSubmitTela1}
        errors={errors}
        register={register}
        setValue={setValue}
        control={control}
      />
    );
  } else if (tela === 2) {
    content = (
      <TelaInformacoesPessoais
        methods={methods}
        onSubmit={onSubmitTela2}
        onBack={onBackFromSegundaTela}
        errors={errors}
        register={register}
        control={control}
        watchedEstadoCivil={watchedEstadoCivil}
        watchedPossuiFilhos={watchedPossuiFilhos}
        watchedLgbtqFriendly={watchedLgbtqFriendly}
      />
    );
  } else if (tela === 3) {
    content = (
      <TelaLocalizacaoDisponibilidade
        methods={methods}
        onSubmit={onSubmitFinal}
        onBack={onBackFromTerceiraTela}
        errors={errors}
        register={register}
        setValue={setValue}
        control={control}
        watchedModalidadeAtendimento={watchedModalidadeAtendimento}
        watchedDiaReuniao={watchedDiaReuniao}
      />
    );
  }

  return (
    <Layout>
      {content}
    </Layout>
  );
};

export default InformacoesPessoaisContainer;