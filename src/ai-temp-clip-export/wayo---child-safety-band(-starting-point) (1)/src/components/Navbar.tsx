import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-40 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold tracking-tighter text-wayo-dark">
          wayo<span className="text-wayo-coral">.</span>
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-wayo-dark font-medium hover:text-wayo-coral transition-colors">Wayo Band</Link>
          <Link to="/wayo-clip" className="text-wayo-dark font-medium hover:text-wayo-coral transition-colors">Wayo Clip</Link>
        </div>
      </div>
    </nav>
  );
}
