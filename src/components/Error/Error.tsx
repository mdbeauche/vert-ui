import React, { FC, useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

type ErrorProps = {
  error: string;
  location: string;
};

const Error: FC<ErrorProps> = ({ error, location }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    console.log(`Failed to load ${location.toString()}: ${error}`);
  }, [error, location]);

  if (countdown <= 0) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Error</h1>
      <h2>Failed to load {location.toString()}:</h2>
      <pre>{error}</pre>
      <br />
      <h2>Redirecting in {countdown}...</h2>
      <br />
      <Link to="/">
        <button type="button">Return to Home</button>
      </Link>
    </div>
  );
};

export default Error;
