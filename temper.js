import { createContext, useState, useEffect } from 'react';
const context = createContext(null);
export default function UserProvider({ children }) {
  // The useState() hook defines a state variable.
  const [userData, setUserData] = useState(null);
  // The useEffect() hook registers a function to run after render.
  useEffect(() => {
    fetch('/api/v1/whoami')        // Ask the server for user data.
      .then(response => response.json()) // Get the response as JSON
      .then(data => {                    // When data arrives...
        setUserData({                    // set our state variable.
          username: data.username,
          isAuthenticated: data.is_authenticated,
          timezone: data.timezone,
          gravatarUrl: data.gravatar_url
        });
      });
  }, []);  // This empty array means the effect will only run once.
  // On the first render userData will have the default value null.
  // But after that render, the effect function will run and will
  // start a fetch of the real user data. When the data arrives, it
  // will be passed to setUserData(), which changes state and
  // triggers a new render. On this second render, we'll have real
  // user data to provide to any consumers. (And the effect will not
  // run again.)
  return (
    <context.Provider value={userData}>
      {children}
    </context.Provider>
  );
}
UserProvider.context = context;