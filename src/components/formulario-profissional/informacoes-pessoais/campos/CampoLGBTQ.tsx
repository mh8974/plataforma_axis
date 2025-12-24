import React from 'react';
import { Controller, Control, UseFormRegister, FieldErrors } from 'react-hook-form';
import Checkbox from '@/components/ui/Checkbox';
import Input from '@/components/ui/Input';
import { InformacoesPessoaisData } from '../types';

interface CampoLGBTQProps {
  control: Control<InformacoesPessoaisData>;
  register: UseFormRegister<InformacoesPessoaisData>;
  errors: FieldErrors<InformacoesPessoaisData>;
  watchedLgbtqFriendly: boolean;
}

const CampoLGBTQ: React.FC<CampoLGBTQProps> = ({
  control,
  register,
  errors,
  watchedLgbtqFriendly,
}) => {
  return (
    <div className="space-y-4">
      {}
      <Controller
        name="lgbtqFriendly"
        control={control}
        render={({ field }) => (
          <Checkbox
            id="lgbtqFriendly"
            label="Atendo pacientes com identidade LGBTQ+"
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
          />
        )}
      />

      {}
      {watchedLgbtqFriendly && (
        <div className="ml-6 animate-in fade-in duration-200">
          <label
            htmlFor="experienciaCasosLgbtq"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Anos de experiência atendendo este grupo
          </label>
          <Input
            id="experienciaCasosLgbtq"
            type="number"
            placeholder="Ex: 5"
            min="0"
            max="50"
            {...register('experienciaCasosLgbtq', {
              required: watchedLgbtqFriendly
                ? 'Informe os anos de experiência com este grupo'
                : false,
              min: {
                value: 0,
                message: 'Experiência não pode ser negativa',
              },
              max: {
                value: 50,
                message: 'Valor máximo: 50 anos',
              },
            })}
            error={errors.experienciaCasosLgbtq?.message}
          />
        </div>
      )}
    </div>
  );
};

export default CampoLGBTQ;
