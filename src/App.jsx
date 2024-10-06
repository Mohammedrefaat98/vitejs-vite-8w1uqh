import { useState, useEffect } from 'react';
import './App.css';
import Pill from './components/pill';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); // gives an array one is variable and another is a function
  const [suggestions, setSuggestions] = useState([]);
  // by default useState will be empty
  // 'https://dummyjson.com/users/search?q=John'
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  useEffect(() => {
    const fetchUsers = () => {
      if (searchTerm.trim() === '') {
        setSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => {
          return res.json();
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
    const updatedUsers = selectedUsers.filter(
      (selctedUser) => selctedUser.id !== user.id
    );
    setSelectedUsers(updatedUsers);

    const updatedEmails = new Set(selectedUserSet);
    updatedEmails.delete(user.email);
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {/* {pills} */}
        {selectedUsers.map((user) => {
          return (
            <Pill
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
            {suggestions?.users?.map((user) => {
              console.log('selectedUserset --->', selectedUserSet);
              return !selectedUserSet.has(user.email) ? (
                // current user which we selected
                <li key={user.email} onClick={() => handleSelectUser(user)}>
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                  />
                  <span>
                    {user.firstName} {user.lastName}
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
 