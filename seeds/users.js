var User = require('../models/User');
var bcrypt = require('bcryptjs');

var user = {
  first_name: 'Demo',
  last_name: 'User',
  email: 'demo@user.com',
  password: 'demouser',
  admin: true,
};

function seedUser() {
  var newUser = new User(user);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      // Assign user password as hashed password
      newUser.password = hash;
      // Insert user into DB
      newUser
        .save()
        .then(user => {
          // Redirect to login page
          console.log('New user successfully added.');
          console.log(user);
        })
        .catch(err => console.log(err));
    });
  });
}

exports.seedUser = seedUser;
