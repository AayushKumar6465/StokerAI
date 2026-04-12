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
  const [isLoadingAuth, setIsLoadingAuth] = useState(!!localStorage.getItem('token'));

  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        setIsLoadingAuth(true);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const { data } = await axios.get('/api/user/data');
          if (data.success) {
            setUser(data.user);
            await fetchChats();
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          handleLogout();
        } finally {
          setIsLoadingAuth(false);
        }
      } else {
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setIsLoadingAuth(false);
      }
    };

    initializeAuth();
  }, [token]);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setChats([]);
    delete axios.defaults.headers.common['Authorization'];
  };

  const login = (newToken, newUser) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser);
    fetchChats();
    navigate('/chat');
  };

  const logout = () => {
    handleLogout();
    navigate('/auth');
  };

  return (
    <AppContext.Provider value={{
      user, setUser,
      token, setToken,
      chats, setChats,
      selectedChatId, setSelectedChatId,
      isLoadingAuth,
      fetchChats,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
