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
  setProfileData: (data: ProfileData | null) => void;
  loading: boolean;
  fetchProfileData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/profile/get`);
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <UserContext.Provider value={{ profileData, setProfileData, loading, fetchProfileData }}>
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