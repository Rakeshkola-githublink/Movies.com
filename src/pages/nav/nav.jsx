import './Nav.css';

const Nav = ({ onThemeToggle, isActive }) => {
  return (
    <div className="nav">
      <p>Sign In</p>
      <div
        className={`theme ${isActive ? 'active' : ''}`}
        onClick={onThemeToggle}
        role="button"
        aria-label="Toggle theme"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onThemeToggle()}
      >
        <span></span>
      </div>
    </div>
  );
}

export default Nav;
