

export const DIAS_SEMANA = [
  { value: "SEGUNDA", label: "Segunda-feira" },
  { value: "TERCA", label: "Terça-feira" },
  { value: "QUARTA", label: "Quarta-feira" },
  { value: "QUINTA", label: "Quinta-feira" },
  { value: "SEXTA", label: "Sexta-feira" },
  { value: "SABADO", label: "Sábado" },
  { value: "DOMINGO", label: "Domingo" },
] as const;

export const HORARIOS_ATENDIMENTO = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
  "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
] as const;



export type FocoPrincipalValue =
  | "emprego_carreira"
  | "relacoes_familiares"
  | "relacionamento_amoroso"
  | "saude_mental_sintomas"
  | "trauma_adversidades"
  | "substancias_compulsoes"
  | "autoconhecimento"
  | "psiquiatria";

export interface AreaEspecialOption {
  value: string;
  label: string;
  applicableTo: FocoPrincipalValue[] | ["*"];
  primaryCategory: FocoPrincipalValue | "transversal";
}



export const FOCO_PRINCIPAL_OPTIONS = [
  { value: "emprego_carreira", label: "Trabalho/Carreira" },
  { value: "relacoes_familiares", label: "Relações Familiares" },
  { value: "relacionamento_amoroso", label: "Relacionamento Amoroso" },
  { value: "trauma_adversidades", label: "Trauma e Experiências Adversas" },
  { value: "psiquiatria", label: "Psiquiatria e Avaliação Especializada" },
  { value: "saude_mental_sintomas", label: "Saúde Mental e Sintomas Emocionais" },
  { value: "autoconhecimento", label: "Autoconhecimento e Crescimento Pessoal" },
  { value: "substancias_compulsoes", label: "Uso de Substâncias e Comportamentos Compulsivos" },


] as const;






export const AREAS_ESPECIAIS_OPTIONS: AreaEspecialOption[] = [

  
  { value: "ansiedade", label: "Ansiedade", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "depressao", label: "Depressão", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "estresse", label: "Estresse", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "ataques_panico", label: "Ataques de pânico", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "disturbios_sono", label: "Distúrbios de sono", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "agressividade_raiva", label: "Agressividade/Raiva descontrolada", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "impulsividade", label: "Impulsividade", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "preguica_procrastinacao", label: "Preguiça/Procrastinação", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },

  
  { value: "conflitos_conjugais", label: "Conflitos afetivos e/ou conjugais", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "psicoterapia_casal", label: "Psicoterapia de casal", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "dependencia_emocional", label: "Dependência emocional", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "ciume_excessivo", label: "Ciúme excessivo", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "dificuldade_relacionamentos", label: "Dificuldade em solidificar relacionamentos", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "estabelecer_limites", label: "Estabelecer limites saudáveis com os outros", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "rejeicao_abandono", label: "Rejeição/Abandono", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "medo_solidao", label: "Medo de morrer sozinho(a)", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "traicao", label: "Traição", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "disfuncoes_sexuais", label: "Sexo/Disfunções sexuais", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },
  { value: "compulsao_sexual", label: "Compulsão sexual", applicableTo: ["*"], primaryCategory: "relacionamento_amoroso" },

  
  { value: "conflitos_familiares", label: "Conflitos familiares", applicableTo: ["*"], primaryCategory: "relacoes_familiares" },
  { value: "separacao_divorcio", label: "Separação/Divórcio", applicableTo: ["*"], primaryCategory: "relacoes_familiares" },
  { value: "nulidade_matrimonial", label: "Processo de nulidade matrimonial", applicableTo: ["*"], primaryCategory: "relacoes_familiares" },
  { value: "gravidez_adaptacao", label: "Gravidez (adaptação)", applicableTo: ["*"], primaryCategory: "relacoes_familiares" },
  { value: "parentalidade", label: "Parentalidade e criação de filhos", applicableTo: ["*"], primaryCategory: "relacoes_familiares" },
  { value: "violencia_domestica", label: "Violência doméstica", applicableTo: ["*"], primaryCategory: "relacoes_familiares" },

  
  { value: "conflitos_profissionais", label: "Conflitos profissionais", applicableTo: ["*"], primaryCategory: "emprego_carreira" },
  { value: "insatisfacao_carreira", label: "Insatisfação com a carreira atual", applicableTo: ["*"], primaryCategory: "emprego_carreira" },
  { value: "equilibrio_vida_trabalho", label: "Dificuldade para equilibrar vida pessoal e profissional", applicableTo: ["*"], primaryCategory: "emprego_carreira" },
  { value: "ansiedade_performance", label: "Ansiedade de performance no trabalho", applicableTo: ["*"], primaryCategory: "emprego_carreira" },
  { value: "transicao_carreira", label: "Transição de carreira ou desemprego", applicableTo: ["*"], primaryCategory: "emprego_carreira" },

  
  { value: "autoconhecimento", label: "Autoconhecimento", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "baixa_autoestima", label: "Baixa autoestima", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "sentimentos_inadequacao", label: "Sentimentos de inadequação", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "timidez_excessiva", label: "Timidez excessiva", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "desenvolver_feminino_masculino", label: "Desenvolver o feminino/masculino", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "perfeccionismo", label: "Perfeccionismo", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "inveja_comparacao", label: "Inveja/Comparação", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "desejo_controle", label: "Desejo de controle/Manipulação", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "validacao_externa", label: "Buscar validação externa constante", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "incertezas_futuro", label: "Incertezas quanto ao presente e futuro", applicableTo: ["*"], primaryCategory: "autoconhecimento" },

  
  { value: "traumas_infancia", label: "Traumas de infância e outros", applicableTo: ["*"], primaryCategory: "trauma_adversidades" },
  { value: "luto", label: "Dificuldade em lidar com morte/luto", applicableTo: ["*"], primaryCategory: "trauma_adversidades" },
  { value: "lidar_diagnostico", label: "Lidar com diagnóstico de doença/transtorno", applicableTo: ["*"], primaryCategory: "trauma_adversidades" },
  { value: "abuso_sexual", label: "Abuso sexual", applicableTo: ["*"], primaryCategory: "trauma_adversidades" },
  { value: "conflito_religioso", label: "Conflito religioso", applicableTo: ["*"], primaryCategory: "trauma_adversidades" },
  { value: "injustica_ressentimento", label: "Lidar com sentimentos de injustiça ou ressentimento", applicableTo: ["*"], primaryCategory: "trauma_adversidades" },
  { value: "aborto", label: "Aborto", applicableTo: ["*"], primaryCategory: "trauma_adversidades" },

  
  { value: "obesidade", label: "Obesidade", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "transtornos_alimentares", label: "Transtornos alimentares", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },
  { value: "medos_fobias", label: "Medos e Fobias", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },

  
  { value: "problemas_financeiros", label: "Problemas financeiros/Endividamento", applicableTo: ["*"], primaryCategory: "substancias_compulsoes" },
  { value: "compulsao_compras", label: "Compulsão por compras", applicableTo: ["*"], primaryCategory: "substancias_compulsoes" },
  { value: "dependencia_quimica", label: "Dependência química e/ou alcoolismo", applicableTo: ["*"], primaryCategory: "substancias_compulsoes" },
  { value: "vicio_redes_jogos", label: "Dependência com redes sociais/jogos eletrônicos", applicableTo: ["*"], primaryCategory: "substancias_compulsoes" },
  { value: "pornografia_masturbacao", label: "Problemas com pornografia/masturbação", applicableTo: ["*"], primaryCategory: "substancias_compulsoes" },
  { value: "apostas_bets", label: "Problemas com apostas e bets", applicableTo: ["*"], primaryCategory: "substancias_compulsoes" },

  
  { value: "identidade_sexual", label: "Dúvidas com relação à minha sexualidade", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "crise_existencial", label: "Crise existencial/Vida sem propósito", applicableTo: ["*"], primaryCategory: "autoconhecimento" },
  { value: "ideacao_suicida", label: "Atentar contra a própria vida", applicableTo: ["*"], primaryCategory: "saude_mental_sintomas" },

  
  { value: "avaliacao_psiquiatrica", label: "Avaliação psiquiátrica/neuropsicológica", applicableTo: ["*"], primaryCategory: "psiquiatria" },
];

export const PREFERENCIAS_PROFISSIONAL_OPTIONS = [
  { value: "idade", label: "Idade" },
  { value: "genero", label: "Gênero" },
  { value: "raca_etnia", label: "Raça/Etnia" },
  { value: "religiao", label: "Religião" },
  { value: "orientacao_sexual", label: "Orientação sexual" },
  { value: "sem_preferencia", label: "Eu não tenho preferência" },
] as const;

export const PREFERENCIAS_IDADE_OPTIONS = [
  { value: "20_30", label: "20-30 anos" },
  { value: "30_40", label: "30-40 anos" },
  { value: "40_50", label: "40-50 anos" },
  { value: "50_mais", label: "50+ anos" },
  { value: "sem_preferencia", label: "Eu não tenho preferência" },
] as const;

export const TIPO_TERAPIA_OPTIONS = [
  { value: "INDIVIDUAL", label: "Individual" },
  { value: "CASAL", label: "Casal" },
  { value: "GRUPO", label: "Em Grupo" },
] as const;

export const MODALIDADE_ATENDIMENTO_OPTIONS = [
  { value: "presencial", label: "Presencial" },
  { value: "online", label: "Online" },
  { value: "hibrido", label: "Híbrido" },
] as const;

export const SEXUALIDADE_OPTIONS = [
  { value: "MASCULINO", label: "Masculino" },
  { value: "FEMININO", label: "Feminino" },
  
] as const;



export const FAIXA_SALARIAL_OPTIONS = [
  { value: "ate_3000", label: "Até R$ 3.000" },
  { value: "3000_5000", label: "R$ 3.000 - R$ 5.000" },
  { value: "5000_8000", label: "R$ 5.000 - R$ 8.000" },
  { value: "8000_10000", label: "R$ 8.000 - R$ 10.000" },
  { value: "10000_15000", label: "R$ 10.000 - R$ 15.000" },
  { value: "15000_20000", label: "R$ 15.000 - R$ 20.000" },
  { value: "acima_20000", label: "Acima de R$ 20.000" },
  { value: "sem_renda", label: "Não tenho renda" },
  { value: "prefiro_nao_informar", label: "Prefiro não informar" },
] as const;

export const FREQUENCIA_SESSOES_OPTIONS = [
  { value: "semanal", label: "Semanal (1x por semana)" },
  { value: "quinzenal", label: "Quinzenal (a cada 15 dias)" },
  { value: "mensal", label: "Mensal (1x por mês)" },
  { value: "flexivel", label: "Flexível (conforme necessidade)" },
] as const;

export const DURACAO_TRATAMENTO_OPTIONS = [
  { value: "curto_prazo", label: "Curto prazo (até 6 meses)" },
  { value: "medio_prazo", label: "Médio prazo (6 meses a 1 ano)" },
  { value: "longo_prazo", label: "Longo prazo (mais de 1 ano)" },
  { value: "indefinido", label: "Indefinido" },
] as const;

export const GENERO_TERAPEUTA_OPTIONS = [
  { value: "indiferente", label: "Indiferente" },
  { value: "feminino", label: "Feminino" },
  { value: "masculino", label: "Masculino" },
  { value: "nao_binario", label: "Não-binário" },
] as const;

export const FAIXA_ETARIA_TERAPEUTA_OPTIONS = [
  { value: "indiferente", label: "Indiferente" },
  { value: "jovem", label: "Jovem (20-35 anos)" },
  { value: "meia_idade", label: "Meia idade (36-55 anos)" },
  { value: "experiente", label: "Experiente (acima de 55 anos)" },
] as const;

export const ORIENTACAO_SEXUAL_OPTIONS = [
  { value: "heterossexual", label: "Heterossexual" },
  { value: "homossexual", label: "Homossexual" },
  { value: "bissexual", label: "Bissexual" },
  { value: "pansexual", label: "Pansexual" },
  { value: "asexual", label: "Assexual" },
  { value: "outro", label: "Outro" },
  { value: "prefiro_nao_informar", label: "Prefiro não informar" },
] as const;

export const IDENTIDADE_GENERO_OPTIONS = [
  { value: "cisgenero", label: "Cisgênero" },
  { value: "transgenero", label: "Transgênero" },
  { value: "nao_binario", label: "Não-binário" },
  { value: "genero_fluido", label: "Gênero fluido" },
  { value: "outro", label: "Outro" },
  { value: "prefiro_nao_informar", label: "Prefiro não informar" },
] as const;

export const ABORDAGEM_TERAPEUTICA_ANTERIOR_OPTIONS = [
  { value: "cognitivo_comportamental", label: "Cognitivo-Comportamental (TCC)" },
  { value: "psicanalitica", label: "Psicanalítica" },
  { value: "humanista", label: "Humanista" },
  { value: "gestalt", label: "Gestalt" },
  { value: "sistemica", label: "Sistêmica" },
  { value: "integrativa", label: "Integrativa" },
  { value: "outra", label: "Outra" },
  { value: "nao_sei", label: "Não sei informar" },
] as const;


export const ESPECIALIZACOES_OPTIONS = [
  { value: "psicologia_clinica", label: "Psicologia Clínica" },
  { value: "psicoterapia_cognitivo_comportamental", label: "Psicoterapia Cognitivo-Comportamental" },
  { value: "psicanalise", label: "Psicanálise" },
  { value: "terapia_familiar", label: "Terapia Familiar" },
  { value: "terapia_casal", label: "Terapia de Casal" },
  { value: "psicologia_infantil", label: "Psicologia Infantil" },
  { value: "psicologia_adolescente", label: "Psicologia do Adolescente" },
  { value: "neuropsicologia", label: "Neuropsicologia" },
  { value: "psicologia_positiva", label: "Psicologia Positiva" },
  { value: "terapia_gestalt", label: "Terapia Gestalt" },
  { value: "terapia_humanista", label: "Terapia Humanista" },
  { value: "terapia_sistemica", label: "Terapia Sistêmica" },
] as const;

export const ABORDAGEM_TERAPEUTICA_OPTIONS = [
  { value: "cognitivo_comportamental", label: "Cognitivo-Comportamental" },
  { value: "psicanalitica", label: "Psicanalítica" },
  { value: "humanista", label: "Humanista" },
  { value: "gestalt", label: "Gestalt" },
  { value: "sistemica", label: "Sistêmica" },
  { value: "integrativa", label: "Integrativa" },
] as const;



export const ESCOLARIDADE_OPTIONS = [
  { value: "FUNDAMENTAL_INCOMPLETO", label: "Ensino Fundamental Incompleto" },
  { value: "FUNDAMENTAL_COMPLETO", label: "Ensino Fundamental Completo" },
  { value: "MEDIO_INCOMPLETO", label: "Ensino Médio Incompleto" },
  { value: "MEDIO_COMPLETO", label: "Ensino Médio Completo" },
  { value: "SUPERIOR_INCOMPLETO", label: "Ensino Superior Incompleto" },
  { value: "SUPERIOR_COMPLETO", label: "Ensino Superior Completo" },
  { value: "POS_GRADUACAO", label: "Pós-Graduação" },
  { value: "MESTRADO", label: "Mestrado" },
  { value: "DOUTORADO", label: "Doutorado" },
] as const;

export const MORA_COM_OPTIONS = [
  { value: "SOZINHO", label: "Sozinho(a)" },
  { value: "PAIS", label: "Pais" },
  { value: "PARCEIRO", label: "Parceiro(a)" },
  { value: "FAMILIA", label: "Conjuge/Filhos" },
  { value: "PARENTES", label: "Parentes" },
  { value: "AMIGOS", label: "Amigo(s)" },
  { value: "OUTROS", label: "Outros" },
];


export const VALIDATION_PATTERNS = {
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
  CRP: /^\d{2}\/\d{5,6}$/,
  TELEFONE_BRASIL: /^\(\d{2}\) \d{4,5}-\d{4}$/,
  CEP: /^\d{5}-\d{3}$/,
  DDI: /^\+\d{1,4}$/,
  SENHA_FORTE: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
} as const;


export const VALIDATION_MESSAGES = {
  REQUIRED: 'Este campo é obrigatório',
  EMAIL_INVALID: 'Email inválido',
  CPF_INVALID: 'CPF inválido',
  CRP_INVALID: 'CRP inválido (formato: 00/00000)',
  TELEFONE_INVALID: 'Telefone inválido (formato: (00) 00000-0000 ou (00) 0000-0000)',
  CEP_INVALID: 'CEP inválido (formato: 00000-000)',
  DDI_INVALID: 'DDI inválido (formato: +55)',
  SENHA_WEAK: 'Senha deve conter ao menos uma letra minúscula, maiúscula e um número',
  SENHA_MIN_LENGTH: 'Senha deve ter pelo menos 8 caracteres',
  SENHAS_NAO_COINCIDEM: 'As senhas não coincidem',
  NOME_MIN_LENGTH: 'Nome deve ter pelo menos 3 caracteres',
  IDADE_MIN: 'Idade mínima é 18 anos',
  IDADE_MAX: 'Idade máxima é 120 anos',
  ANO_FORMACAO_MIN: 'Ano de formação deve ser no mínimo 1950',
  ANO_FORMACAO_MAX: 'Ano de formação não pode ser no futuro',
  VALOR_SESSAO_MIN: 'Valor da sessão deve ser no mínimo R$ 50,00',
  VALOR_SESSAO_MAX: 'Valor da sessão deve ser no máximo R$ 500,00',
} as const;


export const FORM_CONFIG = {
  DEBOUNCE_DELAY: 300,
  AUTO_SAVE_DELAY: 2000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, 
  ACCEPTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ACCEPTED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
} as const;