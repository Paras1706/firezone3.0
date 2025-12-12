const API_URL = import.meta.env.VITE_API_URL || 'https://firezone3-backend.onrender.com/api';

if (!import.meta.env.VITE_API_URL) {
  console.warn('VITE_API_URL not set, using Render backend:', API_URL);
}

// Player API Calls
export const playerAPI = {
  async getAll() {
    const response = await fetch(`${API_URL}/players`);
    if (!response.ok) throw new Error('Failed to fetch players');
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${API_URL}/players/${id}`);
    if (!response.ok) throw new Error('Failed to fetch player');
    return response.json();
  },

  async create(player: any) {
    const response = await fetch(`${API_URL}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(player)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register player');
    }
    return response.json();
  },

  async verify(id: string) {
    const response = await fetch(`${API_URL}/players/${id}/verify`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('Failed to verify player');
    return response.json();
  },

  async delete(id: string) {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete player');
    return response.json();
  },

  async deleteMultiple(playerIds: string[]) {
    const response = await fetch(`${API_URL}/players/delete/bulk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerIds })
    });
    if (!response.ok) throw new Error('Failed to delete players');
    return response.json();
  }
};

// Match API Calls
export const matchAPI = {
  async get() {
    const response = await fetch(`${API_URL}/match`);
    if (!response.ok) throw new Error('Failed to fetch match details');
    return response.json();
  },

  async update(data: any) {
    const response = await fetch(`${API_URL}/match`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update match details');
    return response.json();
  },

  async updateField(field: string, value: any) {
    const response = await fetch(`${API_URL}/match/${field}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    });
    if (!response.ok) throw new Error('Failed to update match field');
    return response.json();
  }
};

// Admin API Calls
export const adminAPI = {
  async login(password: string) {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (!response.ok) throw new Error('Invalid admin password');
    return response.json();
  }
};
