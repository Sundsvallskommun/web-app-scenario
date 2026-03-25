import { FormControl, FormErrorMessage, FormLabel, Input, Switch } from '@sk-web-gui/react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type InputProps = React.ComponentPropsWithoutRef<typeof Input.Component>;

interface EditResourceInputProps extends Omit<InputProps, 'ref' | 'key'> {
  label: string;
  property: string;
  required?: boolean;
}

export const EditResourceInput: React.FC<EditResourceInputProps> = ({ label, property, required, ...rest }) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const data = watch(property);
  const type = typeof data;
  const registration = type === 'number' ? register(property, { valueAsNumber: true }) : register(property);
  const errorMessage = errors?.[property]?.message;

  return type === 'object' ? (
    <></>
  ) : (
    <FormControl required={required} className="w-full">
      {type === 'boolean' ? (
        <Switch {...register(property)} {...rest} color="gronsta" data-cy={`edit-${property}`}>
          {label}
        </Switch>
      ) : (
        <>
          <FormLabel>{label}</FormLabel>
          <Input type={type === 'number' ? 'number' : 'text'} {...registration} {...rest} data-cy={`edit-${property}`} />
          {typeof errorMessage === 'string' && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
        </>
      )}
    </FormControl>
  );
};
