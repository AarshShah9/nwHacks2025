import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../constants/api';

interface ProfileData {
  name: string;
  exp: number;
  allergies: string[];
  diseases: string[];
  restrictions: string[];
}

interface UserContextType {
  profileData: ProfileData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/profile/get`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }
      const data = await response.json();
      setProfileData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      console.error('Error fetching profile data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const value = {
    profileData,
    loading,
    error,
    refetch: fetchProfileData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 