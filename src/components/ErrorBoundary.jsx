import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center w-full h-full bg-background dark:bg-dark-background">
          <h1 className="text-2xl font-accent tracking-wider font-semibold text-red dark:text-dark-red">
            Something went wrong.
          </h1>
          <p className="font-sans tracking-wider text-text dark:text-dark-text">Please try refreshing the page or come back later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}