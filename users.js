const users = [
    { _id: 1, name: "ros", email: "ros@hotmail.com", password: "ros12345" },
];
  
function validateUser(username, password) {
    const user = users.find((user) => {
        return user.name === username && user.password === password;
    });

    return user;
}

module.exports = { validateUser };