import React, { ReactNode } from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../../global/theme';

interface Props {
  children: ReactNode;
}

const Providers: React.FC<Props> = ({children}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

describe('Input Form Component', () => {
  it('must have specific border color when active', () => {
    const {getByTestId} = render(
      <Input
        testID='input-email'
        placeholder='email'
        keyboardType='email-address'
        active
      />,
      {
        wrapper: Providers
      }
    );

    const inputComponent = getByTestId('input-email');

    expect(inputComponent.props.style[0].borderColor).toEqual(theme.colors.attention);
    expect(inputComponent.props.style[0].borderWidth).toEqual(3);

  });
});
