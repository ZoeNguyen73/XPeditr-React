import React from "react";
import { Link } from "react-router-dom";

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

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center w-screen h-screen bg-background dark:bg-dark-background">
          <h1 className="text-2xl font-accent tracking-wider font-semibold text-red dark:text-dark-red">
            Something went wrong.
          </h1>
          <p className="font-sans tracking-wider text-text dark:text-dark-text">
            We're sorry — an unexpected error occurred. Please try refreshing the page or come back later.
          </p>

          <button
            onClick={this.handleReload}
            className="bg-bg-blue dark:bg-dark-bg-blue hover:bg-blue-700 text-blue dark:text-dark-blue font-sans tracking-wider font-semibold py-2 px-4 rounded"
          >
            Refresh the page
          </button>

          {/* <Link
            to="/"
            className="bg-gray-600 hover:bg-gray-700 text-white font-sans font-semibold py-2 px-4 rounded"
          >
            Go to Homepage
          </Link> */}

        </div>
      );
    }

    return this.props.children;
  }
}