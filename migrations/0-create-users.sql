CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  eid TEXT UNIQUE,
  cryptedpassword TEXT,
  salt TEXT
  firstName TEXT,
  lastName TEXT,
  email TEXT
);
