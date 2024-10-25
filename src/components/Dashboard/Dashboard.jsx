import { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';
import Home from "../../pages/Home/Home";
import  './Dashboard.css';
import Footer from '../../pages/Footer/Footer';
import { action, thriller, horror, drama } from "../../assets/assets/assets.js";

// Debounce function
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

  // Combine all movies into a single array
  const allMovies = [...action, ...thriller, ...horror, ...drama];

  // Effect to filter movies based on search term and selected category
  useEffect(() => {
    const results = allMovies.filter(movie => {
      const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || movie.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredMovies(results);
  }, [searchTerm, selectedCategory]);

  // Debounced search handler
  const handleSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  return (
    <>
      <Home />
      <div className="main-container">
        <div className="homepage-title">
          <h3>Top Movies Recommendation</h3>
          <p className='suggestion'>Top Movies Suggestion</p>
          <input
            type="text"
            className="search-movies"
            placeholder="Search for movies..."
            onChange={(e) => handleSearch(e.target.value)} // Use debounced search handler
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
