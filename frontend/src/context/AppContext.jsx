import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

axios.defaults.baseURL = 'http://localhost:3000';

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserData();
      fetchChats();
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get('/api/user/data');
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchChats = async () => {
    try {
      const { data } = await axios.get('/api/chat/get');
      if (data.success) {
        setChats(data.chats);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
    fetchChats();
    navigate('/chat');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setChats([]);
    navigate('/auth');
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      token, setToken,
      chats, setChats,
      selectedChatId, setSelectedChatId,
      fetchUserData,
      fetchChats,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
