import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player, MatchDetails } from '../types';
import { INITIAL_MATCH_DETAILS, ADMIN_PASSWORD } from '../constants';
import { playerAPI, matchAPI, adminAPI } from '../api/backend';

interface TournamentContextType {
  players: Player[];
  matchDetails: MatchDetails;
  registerPlayer: (player: Omit<Player, 'id' | 'registrationDate' | 'verified'>) => Promise<void>;
  updateMatchDetails: (details: Partial<MatchDetails>) => Promise<void>;
  verifyPlayer: (playerId: string) => Promise<void>;
  deletePlayer: (playerId: string) => Promise<void>;
  deletePlayers: (playerIds: string[]) => Promise<void>;
  isAdmin: boolean;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  loading: boolean;
  error: string | null;
}

const TournamentContext = createContext<TournamentContextType | undefined>(undefined);

export const TournamentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matchDetails, setMatchDetails] = useState<MatchDetails>(INITIAL_MATCH_DETAILS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch players
        const playersData = await playerAPI.getAll();
        setPlayers(playersData || []);

        // Fetch match details
        const matchData = await matchAPI.get();
        setMatchDetails(matchData || INITIAL_MATCH_DETAILS);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Check if backend is running.');
        
        // Fallback to localStorage
        const saved = localStorage.getItem('firezone_players');
        if (saved) setPlayers(JSON.parse(saved));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Keep localStorage in sync for fallback
  useEffect(() => {
    localStorage.setItem('firezone_players', JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem('firezone_match', JSON.stringify(matchDetails));
  }, [matchDetails]);

  const registerPlayer = async (data: Omit<Player, 'id' | 'registrationDate' | 'verified'>) => {
    try {
      setError(null);
      const newPlayer = await playerAPI.create(data);
      setPlayers(prev => [...prev, newPlayer]);
    } catch (err: any) {
      setError(err.message || 'Failed to register player');
      throw err;
    }
  };

  const updateMatchDetails = async (details: Partial<MatchDetails>) => {
    try {
      setError(null);
      const updated = await matchAPI.update(details);
      setMatchDetails(updated);
    } catch (err: any) {
      setError(err.message || 'Failed to update match details');
      throw err;
    }
  };

  const verifyPlayer = async (playerId: string) => {
    try {
      setError(null);
      const updated = await playerAPI.verify(playerId);
      setPlayers(prev => prev.map(p => p.id === updated._id ? { ...updated, id: updated._id } : p));
    } catch (err: any) {
      setError(err.message || 'Failed to verify player');
      throw err;
    }
  };

  const deletePlayer = async (playerId: string) => {
    try {
      setError(null);
      await playerAPI.delete(playerId);
      setPlayers(prev => prev.filter(p => p.id !== playerId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete player');
      throw err;
    }
  };

  const deletePlayers = async (playerIds: string[]) => {
    try {
      setError(null);
      await playerAPI.deleteMultiple(playerIds);
      setPlayers(prev => prev.filter(p => !playerIds.includes(p.id)));
    } catch (err: any) {
      setError(err.message || 'Failed to delete players');
      throw err;
    }
  };

  const loginAdmin = async (password: string) => {
    try {
      setError(null);
      await adminAPI.login(password);
      setIsAdmin(true);
      return true;
    } catch (err: any) {
      setError(err.message || 'Invalid admin password');
      setIsAdmin(false);
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setError(null);
  };

  return (
    <TournamentContext.Provider value={{
      players,
      matchDetails,
      registerPlayer,
      updateMatchDetails,
      verifyPlayer,
      deletePlayer,
      deletePlayers,
      isAdmin,
      loginAdmin,
      logoutAdmin,
      loading,
      error
    }}>
      {children}
    </TournamentContext.Provider>
  );
};

export const useTournament = () => {
  const context = useContext(TournamentContext);
  if (!context) {
    throw new Error('useTournament must be used within a TournamentProvider');
  }
  return context;
};