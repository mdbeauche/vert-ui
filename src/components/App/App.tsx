import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import './css/App.css';

const App = () => {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.name}
            path={route.path}
            element={
              <ContentWrapper>
                <route.component key={new Date().getUTCMilliseconds()} />
              </ContentWrapper>
            }
          />
        ))}
      </Routes>
    </div>
  );
};

export default App;
