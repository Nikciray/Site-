import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Screen } from "./screens/Screen/Screen";
import { Catalog } from "./screens/Catalog";
import { Booking } from "./screens/Booking";
import { Home } from "./screens/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/apartment/:id" element={<Screen />} />
          <Route path="/booking" element={<Booking />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);