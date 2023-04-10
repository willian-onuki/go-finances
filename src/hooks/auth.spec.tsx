import { AuthProvider, useAuth } from './auth';
import { act, renderHook } from '@testing-library/react-hooks';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-auth-session');

fetchMock.enableMocks();

const userTest = {
  id: '123',
  email: 'test@example.com',
  name: 'Test User',
  photo: 'userPicture',
};

describe('Auth Hook', () => {
  beforeEach(async () => {
    await AsyncStorage.removeItem('@gofinances:user');
  });

  it('should be able to sign in with google account existing', async () => {
    const mockedGoogleSigIn = jest.mocked(startAsync as any);

    mockedGoogleSigIn.mockResolvedValueOnce({
      type: 'success',
      params: {
        access_token: 123,
      },
    });

    fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });

  it('user should NOT connect if cancel authentication with Google', async () => {
    const mockedGoogleSigIn = jest.mocked(startAsync as any);

    mockedGoogleSigIn.mockResolvedValueOnce({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});
