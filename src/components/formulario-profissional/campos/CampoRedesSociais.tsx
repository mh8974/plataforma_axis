import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Instagram, Linkedin, Youtube, MessageCircle, Facebook } from "lucide-react";
import CampoTexto from "./CampoTexto";

interface CampoRedesSociaisProps {
  label?: string;
  required?: boolean;
  error?: string;
}

const CampoRedesSociais: React.FC<CampoRedesSociaisProps> = ({
  label = "Redes Sociais",
  required = false,
  error,
}) => {
  const { control, formState: { errors } } = useFormContext();

  const redesSociaisFields = [
    {
      name: "redesSociais.instagram",
      label: "Instagram",
      placeholder: "@usuario ou https://instagram.com/usuario",
      icon: Instagram,
    },
    {
      name: "redesSociais.linkedin",
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/usuario",
      icon: Linkedin,
    },
    {
      name: "redesSociais.youtube",
      label: "YouTube",
      placeholder: "https://youtube.com/c/usuario",
      icon: Youtube,
    },
    {
      name: "redesSociais.tiktok",
      label: "TikTok",
      placeholder: "@usuario ou https://tiktok.com/@usuario",
      icon: MessageCircle,
    },
    {
      name: "redesSociais.facebook",
      label: "Facebook",
      placeholder: "https://facebook.com/usuario",
      icon: Facebook,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-neutral-900 mb-2">
          {label} {required && "*"}
        </h3>
        <p className="text-sm text-neutral-600 mb-4">
          Preencha as redes sociais que você utiliza profissionalmente (opcional)
        </p>
      </div>

      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {redesSociaisFields.map((field) => {
          const IconComponent = field.icon;
          return (
            <div key={field.name} className="space-y-2">
              <div className="flex items-center space-x-2 mb-2">
                <IconComponent className="w-5 h-5 text-neutral-600" />
                <label className="text-sm font-medium text-neutral-700">
                  {field.label}
                </label>
              </div>

              <Controller
                name={field.name}
                control={control}
                rules={{
                  validate: (value) => {
                    if (value && value.trim()) {
                      
                      const isValidUrl = /^https?:\/\/.+/.test(value);
                      const isValidHandle = /^@\w+/.test(value);
                      const isPlainUsername = /^\w+/.test(value);

                      if (!isValidUrl && !isValidHandle && !isPlainUsername) {
                        return `${field.label} deve ser uma URL válida, @usuario ou nome de usuário`;
                      }
                    }
                    return true;
                  }
                }}
                render={({ field: fieldInput }) => (
                  <CampoTexto
                    id={field.name}
                    label=""
                    placeholder={field.placeholder}
                    type="text"
                    value={fieldInput.value || ""}
                    onChange={fieldInput.onChange}
                  />
                )}
              />
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">i</span>
            </div>
          </div>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Dica:</p>
            <p>
              Você pode inserir URLs completas (https://...), handles (@usuario) ou apenas
              o nome de usuário. Essas informações ajudam os pacientes a conhecerem melhor
              seu trabalho e abordagem profissional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampoRedesSociais;