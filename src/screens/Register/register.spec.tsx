import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Register } from '.';
import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/theme';
import { NavigationContainer } from '@react-navigation/native';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  </NavigationContainer>
);

describe('Register Screen', () => {
  it('Should be open category modal when user press the category button', () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });
    const categoryModal = getByTestId('modal-category');

    const buttonCategory = getByTestId('button-category');
    fireEvent.press(buttonCategory);

    expect(categoryModal.props.visible).toBeTruthy();
  });
});
