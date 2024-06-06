import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import Private from "./pages/Private.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import { Button, Box } from "@chakra-ui/react";

function App() {
  const { session, logout } = useSupabaseAuth();

  return (
    <Router>
      <Box p={4} display="flex" justifyContent="flex-end">
        {session ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button as="a" href="/login">Login</Button>
        )}
      </Box>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={session ? <Private /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;