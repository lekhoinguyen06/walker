import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "walker-react-panel/index.css";
import "./index.css";
import App from "./App.tsx";
import { PanelToastProvider } from "walker-react-panel";
import { LandingPanel } from "./Panel.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PanelToastProvider>
      <App />
      <LandingPanel />
    </PanelToastProvider>
  </StrictMode>,
);
