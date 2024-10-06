import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // gives an array one is variable and another is a function
  const [suggestions, setSuggestions] = useState([]);
  // by default useState will be empty
  const [count, setCount] = useState(0);
  // 'https://dummyjson.com/users/search?q=John'
  const [slectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === '') {
        setSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => {
          res.json();
        })
        .then((data) => setSuggestions(data))
        .catch((err) => {
          console.log('error', err);
        });
    };
    fetchUsers();
  }, [searchTerm]);

  // going to be fired when serach dom changes

  const handleSelectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchTerm('');
    setSuggestions([]);
    // to close the suugestion
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = slectedUsers.filter(
      (selctedUser) => slectedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* {pills} */}
        {slectedUsers.map((user) => {
          return (
            <pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        {/* {input field with search suggestions} */}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a user..."
          />
          <ul className="suggestions-list">
            {suggestions?.users?.map((user, index) => {
              console.log('slectedUserSet --->', selectedUserSet);
              return selectedUserSet.has(user.email) ? (
                // current user which we selected
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>
                    ${user.firstName} ${user.lastName}
                  </span>
                </li>
              ) : (
                <></>
              );
            })}
          </ul>
          {/* {Search suggestions} */}
        </div>
      </div>
    </div>
  );
}

export default App;
