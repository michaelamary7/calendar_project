import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import './App.css';
import EventCalendar from './components/eventcalendar';
import LoginForm from './components/loginform';

function App() {
  // Specify the type for the useState hook
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // Set isLoggedIn based on whether the token exists
  }, []);

  // Type the handleLogin function to expect a string parameter
  const handleLogin = (token: string) => {
    // Store token in localStorage and update isLoggedIn state
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear token from localStorage and update isLoggedIn state
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <header>
        <h1></h1>
      </header>

      <main>
        {isLoggedIn ? (
          <>
            <EventCalendar /> {/* Calendar component */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </main>

      <footer>
        <p></p>
      </footer>
    </div>
  );
}

export default App;
