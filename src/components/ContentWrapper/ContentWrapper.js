import React from 'react';
import Error from '../Error/Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <Error error={error.message} location={window.location} />;
    }

    const { children } = this.props;

    return children;
  }
}

const ContentWrapperInner = ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>;

const ContentWrapper = ({ children }) => <ContentWrapperInner>{children}</ContentWrapperInner>;

export default ContentWrapper;
