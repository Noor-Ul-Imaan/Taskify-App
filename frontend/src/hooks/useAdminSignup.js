import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useAdminSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (adminDetails) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:5000/admin/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminDetails),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // Save the admin to local storage
      localStorage.setItem('admin', JSON.stringify(json));

      // Update the auth context
      dispatch({ type: 'LOGIN', payload: json });

      // Update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
