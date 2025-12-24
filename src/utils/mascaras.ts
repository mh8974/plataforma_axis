
export const FORMATOS_TELEFONE = {
  BRASIL: { digitos: 11, mascara: "(00) 00000-0000", regex: /^\(\d{2}\) \d{4,5}-\d{4}$/, exemplo: "(00) 00000-0000 ou (00) 0000-0000" },
  EUA_CANADA: { digitos: 10, mascara: "(000) 000-0000", regex: /^\(\d{3}\) \d{3}-\d{4}$/, exemplo: "(000) 000-0000" },
  UK: { digitos: 11, mascara: "0000 000 0000", regex: /^\d{4} \d{3} \d{4}$/, exemplo: "0000 000 0000" },
  JAPAO: { digitos: 10, mascara: "00-0000-0000", regex: /^\d{2}-\d{4}-\d{4}$/, exemplo: "00-0000-0000" },
  CHINA: { digitos: 11, mascara: "000-0000-0000", regex: /^\d{3}-\d{4}-\d{4}$/, exemplo: "000-0000-0000" },
  RUSSIA: { digitos: 10, mascara: "(000) 000-00-00", regex: /^\(\d{3}\) \d{3}-\d{2}-\d{2}$/, exemplo: "(000) 000-00-00" },
  INDIA: { digitos: 10, mascara: "0000-000-0000", regex: /^\d{4}-\d{3}-\d{4}$/, exemplo: "0000-000-0000" },
  AUSTRALIA: { digitos: 10, mascara: "00 0000 0000", regex: /^\d{2} \d{4} \d{4}$/, exemplo: "00 0000 0000" },
  INTERNACIONAL: { digitos: 11, mascara: "+00 000 000 000", regex: /^\+\d{2} \d{3} \d{3} \d{3}$/, exemplo: "+00 000 000 000" },
  EUROPA: { digitos: 12, mascara: "00 00 00 00 00 00", regex: /^\d{2} \d{2} \d{2} \d{2} \d{2} \d{2}$/, exemplo: "00 00 00 00 00 00" }
} as const;


export const DDI_FORMATO_MAP: Record<string, keyof typeof FORMATOS_TELEFONE> = {
  "55": "BRASIL",
  "1": "EUA_CANADA",
  "44": "UK",
  "33": "EUROPA", 
  "49": "EUROPA", 
  "39": "EUROPA", 
  "34": "EUROPA", 
  "31": "EUROPA", 
  "32": "EUROPA", 
  "41": "EUROPA", 
  "46": "EUROPA", 
  "47": "EUROPA", 
  "45": "EUROPA", 
  "358": "EUROPA", 
  "353": "EUROPA", 
  "351": "EUROPA", 
  "43": "EUROPA", 
  "30": "EUROPA", 
  "81": "JAPAO",
  "86": "CHINA",
  "7": "RUSSIA",
  "91": "INDIA",
  "61": "AUSTRALIA",
  
  "27": "INTERNACIONAL", 
  "234": "INTERNACIONAL", 
  "20": "INTERNACIONAL", 
  "92": "INTERNACIONAL", 
  "880": "INTERNACIONAL", 
  "212": "INTERNACIONAL", 
  "966": "INTERNACIONAL", 
  "971": "INTERNACIONAL", 
  "62": "INTERNACIONAL", 
  "63": "INTERNACIONAL", 
  "60": "INTERNACIONAL", 
  "66": "INTERNACIONAL", 
  "84": "INTERNACIONAL", 
  "82": "INTERNACIONAL", 
  "65": "INTERNACIONAL", 
  "90": "INTERNACIONAL", 
  "972": "INTERNACIONAL", 
} as const;


export const applyCpfMask = (value: string): string => {
  if (!value) return value;
  
  
  const numericValue = value.replace(/\D/g, '');
  
  
  const limitedValue = numericValue.slice(0, 11);
  
  
  if (limitedValue.length <= 3) return `${limitedValue}`;
  if (limitedValue.length <= 6) return `${limitedValue.slice(0, 3)}.${limitedValue.slice(3)}`;
  if (limitedValue.length <= 9) return `${limitedValue.slice(0, 3)}.${limitedValue.slice(3, 6)}.${limitedValue.slice(6)}`;
  return `${limitedValue.slice(0, 3)}.${limitedValue.slice(3, 6)}.${limitedValue.slice(6, 9)}-${limitedValue.slice(9, 11)}`;
};


export const applyTelefoneDinamicoMask = (
  value: string,
  formato: keyof typeof FORMATOS_TELEFONE
): string => {
  if (!value) return value;

  
  const numericValue = value.replace(/\D/g, "");

  
  const config = FORMATOS_TELEFONE[formato];
  if (!config) return value;

  
  const limitedValue = numericValue.slice(0, config.digitos);

  
  switch (formato) {
    case "BRASIL":
      if (limitedValue.length <= 2) return `(${limitedValue}`;

      
      const terceiroDigito = limitedValue.charAt(2);
      const isCelular = terceiroDigito === '9';

      if (isCelular) {
        
        if (limitedValue.length <= 7)
          return `(${limitedValue.slice(0, 2)}) ${limitedValue.slice(2)}`;
        return `(${limitedValue.slice(0, 2)}) ${limitedValue.slice(2, 7)}-${limitedValue.slice(7, 11)}`;
      } else {
        
        if (limitedValue.length <= 6)
          return `(${limitedValue.slice(0, 2)}) ${limitedValue.slice(2)}`;
        return `(${limitedValue.slice(0, 2)}) ${limitedValue.slice(2, 6)}-${limitedValue.slice(6, 10)}`;
      }

    case "EUA_CANADA":
      if (limitedValue.length <= 3) return `(${limitedValue}`;
      if (limitedValue.length <= 6)
        return `(${limitedValue.slice(0, 3)}) ${limitedValue.slice(3)}`;
      return `(${limitedValue.slice(0, 3)}) ${limitedValue.slice(
        3,
        6
      )}-${limitedValue.slice(6, 10)}`;

    case "UK":
      if (limitedValue.length <= 4) return limitedValue;
      if (limitedValue.length <= 7)
        return `${limitedValue.slice(0, 4)} ${limitedValue.slice(4)}`;
      return `${limitedValue.slice(0, 4)} ${limitedValue.slice(
        4,
        7
      )} ${limitedValue.slice(7, 11)}`;

    case "JAPAO":
      if (limitedValue.length <= 2) return `${limitedValue}`;
      if (limitedValue.length <= 6)
        return `${limitedValue.slice(0, 2)}-${limitedValue.slice(2)}`;
      return `${limitedValue.slice(0, 2)}-${limitedValue.slice(
        2,
        6
      )}-${limitedValue.slice(6, 10)}`;

    case "CHINA":
      if (limitedValue.length <= 3) return `${limitedValue}`;
      if (limitedValue.length <= 7)
        return `${limitedValue.slice(0, 3)}-${limitedValue.slice(3)}`;
      return `${limitedValue.slice(0, 3)}-${limitedValue.slice(
        3,
        7
      )}-${limitedValue.slice(7, 11)}`;

    case "RUSSIA":
      if (limitedValue.length <= 3) return `(${limitedValue}`;
      if (limitedValue.length <= 6)
        return `(${limitedValue.slice(0, 3)}) ${limitedValue.slice(3)}`;
      if (limitedValue.length <= 8)
        return `(${limitedValue.slice(0, 3)}) ${limitedValue.slice(
          3,
          6
        )}-${limitedValue.slice(6)}`;
      return `(${limitedValue.slice(0, 3)}) ${limitedValue.slice(
        3,
        6
      )}-${limitedValue.slice(6, 8)}-${limitedValue.slice(8, 10)}`;

    case "INDIA":
      if (limitedValue.length <= 4) return `${limitedValue}`;
      if (limitedValue.length <= 7)
        return `${limitedValue.slice(0, 4)}-${limitedValue.slice(4)}`;
      return `${limitedValue.slice(0, 4)}-${limitedValue.slice(
        4,
        7
      )}-${limitedValue.slice(7, 11)}`;

    case "AUSTRALIA":
      if (limitedValue.length <= 2) return `${limitedValue}`;
      if (limitedValue.length <= 6)
        return `${limitedValue.slice(0, 2)} ${limitedValue.slice(2)}`;
      return `${limitedValue.slice(0, 2)} ${limitedValue.slice(
        2,
        6
      )} ${limitedValue.slice(6, 10)}`;

    case "INTERNACIONAL":
      
      if (limitedValue.length <= 2) return `+${limitedValue}`;
      if (limitedValue.length <= 5)
        return `+${limitedValue.slice(0, 2)} ${limitedValue.slice(2)}`;
      if (limitedValue.length <= 8)
        return `+${limitedValue.slice(0, 2)} ${limitedValue.slice(
          2,
          5
        )} ${limitedValue.slice(5)}`;
      return `+${limitedValue.slice(0, 2)} ${limitedValue.slice(
        2,
        5
      )} ${limitedValue.slice(5, 8)} ${limitedValue.slice(8, 11)}`;

    case "EUROPA":
    default:
      const parts = [];
      for (let i = 0; i < limitedValue.length; i += 2) {
        parts.push(limitedValue.slice(i, i + 2));
      }
      return parts.join(" ");
  }
};


export const applyDdiMask = (value: string): string => {
  
  value = value.replace(/[^\d+]/g, '');
  
  if (value && !value.startsWith('+')) {
    value = '+' + value;
  }
  
  return value.slice(0, 5);
};


export const validateCpf = (cpf: string): boolean => {
  if (!cpf) return false;
  
  
  const cpfNumbers = cpf.replace(/\D/g, '');
  
  
  if (cpfNumbers.length !== 11) return false;
  
  
  if (/^(\d)\1{10}$/.test(cpfNumbers)) return false;
  
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpfNumbers.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfNumbers.charAt(9))) return false;
  
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpfNumbers.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfNumbers.charAt(10))) return false;
  
  return true;
};


export const validateDdi = (ddi: string): boolean => {
  if (!ddi) return false;
  
  const cleanDdi = ddi.replace(/^\+/, '');
  return /^\d{1,4}$/.test(cleanDdi);
};


export const applyCrpMask = (value: string): string => {
  if (!value) return value;

  
  const numericValue = value.replace(/\D/g, '');

  
  const limitedValue = numericValue.slice(0, 7);

  
  if (limitedValue.length <= 2) return limitedValue;
  return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2, 7)}`;
};


export const applyCepMask = (value: string): string => {
  if (!value) return value;
  
  
  const numericValue = value.replace(/\D/g, '');
  
  
  const limitedValue = numericValue.slice(0, 8);
  
  
  if (limitedValue.length <= 5) return limitedValue;
  return `${limitedValue.slice(0, 5)}-${limitedValue.slice(5, 8)}`;
};


export const validateCep = (cep: string): boolean => {
  
  const cepNumbers = cep.replace(/\D/g, '');

  
  if (cepNumbers.length !== 8) return false;

  return true;
};


export const validateCrp = (crp: string): boolean => {
  
  if (!crp) return true;

  
  const crpNumbers = crp.replace(/\D/g, '');

  
  if (crpNumbers.length !== 7) return false;

  
  
  const regiao = parseInt(crpNumbers.slice(0, 2));
  if (regiao < 1 || regiao > 99) return false;

  
  const numero = crpNumbers.slice(2);
  if (numero.length !== 5 || !/^\d{5}$/.test(numero)) return false;

  return true;
};