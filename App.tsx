import React, {useState, useEffect} from 'react';
import {WithSplashScreen} from './src/screens/SplashScreen';
import Navigation from './src/routes/Navigation/Navigation';
const App = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 2000);
  }, []);
  return (
    <WithSplashScreen isAppReady={isAppReady}>
      {/* <IntroductionScreen /> */}
      <Navigation />
    </WithSplashScreen>
  );
};

export default App;
