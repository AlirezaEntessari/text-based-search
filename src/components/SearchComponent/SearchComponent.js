import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [searchType, setSearchType] = useState('job-to-resume');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5002/api/matching-name', { searchType, query });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error performing search:', error);
    }
  };

  return (
    <div>
      <h1>Search</h1>
      <div>
        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
          <option value="job-to-resume">Job to Resume (MongoDB)</option>
          <option value="resume-to-job">Resume to Job (MongoDB)</option>
          <option value="job-to-resume-postgres">Job to Resume (Postgres)</option>
          <option value="resume-to-job-postgres">Resume to Job (Postgres)</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Results</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{JSON.stringify(result)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
