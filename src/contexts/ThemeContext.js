import React, { createContext } from "react";

const themes = {
  light: {
    text: "#000",
    foreground: "#000000",
    main: "#1f618d",
    background: "#fff",
  },
  dark: {
    text: "#ddd",
    main: "#1C2833",
    darkermain: "#17202A",
    background: "#212F3D",
  },
};

export const ThemeContext = createContext(themes.light);
