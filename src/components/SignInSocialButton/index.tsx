import React, { ReactChildren } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { SvgProps } from 'react-native-svg';

import {
  Button,
  Title,
  ImageButton
} from './styles';

interface Props extends RectButtonProps{
  svg: React.FC<SvgProps>;
  title: string;
}

export function SignInSocialButton({
  title,
  svg: Svg,
  ...rest
}: Props) {
  return (
    <Button {...rest}>
      <ImageButton>
        <Svg/>
      </ImageButton>
      <Title>
        {title}
      </Title>
    </Button>
  );
}
