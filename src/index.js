import React from "react";
import { createRoot } from "react-dom/client";
import App, { ChartApp } from "@/js/App.tsx";
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")).render(<App/>);
createRoot(document.getElementById("chart")).render(<ChartApp />);
