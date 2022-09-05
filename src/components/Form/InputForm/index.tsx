import React from 'react';
import { TextInputProps } from 'react-native';
import { Input } from '../Input';

import { Control, Controller } from 'react-hook-form';
import { Container, Error } from './styles';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string | undefined;
}

export function InputForm({ control, name, error, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
