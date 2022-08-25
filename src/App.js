import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export const AuthContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContext.Provider
        value={{ loggedIn, setLoggedIn, darkMode, setDarkMode, theme }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/jobs/:jobId"
            element={
              // <RequireAuth>
              <DetailPage />
              // </RequireAuth>
            }
          />
          <Route path="*" element={<NotFoundPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
