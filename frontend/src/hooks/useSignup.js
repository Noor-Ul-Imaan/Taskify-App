import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (name, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5000/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
        setIsLoading(false);
        if (response.status === 400) {
          setError("Invalid email or use a stronger password with mix of capital and small character, special characters and numbers");
        } else if (response.status === 409) {
          setError("Email already in use.");
        } else {
          setError("Signup failed. Please try again.");
        }
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}