import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/home/todo">Todo List</Link>
      <Link to="/home/calculator">Calculator</Link>
    </nav>
  );
}
