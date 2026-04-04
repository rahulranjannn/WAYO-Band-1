import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WayoBand } from './pages/WayoBand';
import { WayoClip } from './pages/WayoClip';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WayoBand />} />
        <Route path="/wayo-clip" element={<WayoClip />} />
      </Routes>
    </BrowserRouter>
  );
}
