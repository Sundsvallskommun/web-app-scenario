import { FormControl, FormLabel, Textarea, TextareaProps } from '@sk-web-gui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface EditResourceTextareaProps extends Omit<TextareaProps, 'ref' | 'key'> {
  label: string;
  property: string;
  required?: boolean;
}

export const EditResourceTextarea: React.FC<EditResourceTextareaProps> = ({ label, property, required, ...rest }) => {
  const { register, watch } = useFormContext();
  const data = watch(property);
  const type = typeof data;

  return type === 'object' ?
      <></>
    : <FormControl required={required} className="w-full">
        <FormLabel>{label}</FormLabel>
        <Textarea {...register(property)} className="w-full" {...rest} />
      </FormControl>;
};
