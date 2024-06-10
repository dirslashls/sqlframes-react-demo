import React from "react";
import { createRoot } from "react-dom/client";
import WrapperApp from "./js/WrapperApp";

createRoot(document.getElementById("root1")).render(<WrapperApp/>);
createRoot(document.getElementById("root2")).render(<WrapperApp/>);