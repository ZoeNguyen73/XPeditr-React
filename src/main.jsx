import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import { ErrorBoundary } from "./components/ErrorBoundary.jsx"

// Poppins weights
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/600.css"; // SemiBold
import "@fontsource/poppins/700.css"; // Bold
import "@fontsource/poppins/300-italic.css";
import "@fontsource/poppins/600-italic.css";
import "@fontsource/poppins/700-italic.css";

// Fredoka weights
import "@fontsource/fredoka/300.css";
import "@fontsource/fredoka/600.css";
import "@fontsource/fredoka/700.css";
// import "@fontsource/fredoka/300-italic.css";
// import "@fontsource/fredoka/600-italic.css";
// import "@fontsource/fredoka/700-italic.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
