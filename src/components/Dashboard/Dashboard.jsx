import { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import Home from "../../pages/Home/Home";
import './Dashboard.css';
import Footer from '../../pages/Footer/Footer';
import { action, thriller, horror, drama } from "../../assets/assets/assets.js";
import Nav from '../../pages/nav/nav.jsx';

// Debounce function to limit how often a function can be called
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const allMovies = [...action, ...thriller, ...horror, ...drama];

  useEffect(() => {
    const results = allMovies.filter(movie => {
      const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredMovies(results);
  }, [searchTerm, selectedCategory, allMovies]);

  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  return (
    <>
      <Home />
      <Nav onThemeToggle={toggleTheme} isActive={isDarkTheme} />
      <div className={`main-container ${isDarkTheme ? 'dark-theme' : ''}`}>
        <div className="homepage-title">
          <h3>Top Movies Recommendation</h3>
          <p className='suggestion'>Top Movies Suggestion</p>
          <input
            type="text"
            className="search-movies"
            placeholder="Search for movies..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option value="All">All</option>
            <option value="Action">Action</option>
            <option value="Thriller">Thriller</option>
            <option value="Horror">Horror</option>
            <option value="Drama">Drama</option>
          </select>
        </div>

        <main>
          <div className="image-container">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="movie-card">
                <LazyLoad height={200} offset={100}>
                  <img src={movie.img} alt={movie.name} />
                </LazyLoad>
                <p className='title'>{movie.name}</p>
                <p className='hero'>{movie.hero}</p>
                <p className='year'>{movie.year}</p>
                <p className='info'>More Info</p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
