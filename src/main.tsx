import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Desserts from "./features/desserts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Desserts />
  </StrictMode>
);
