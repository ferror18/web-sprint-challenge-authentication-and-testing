const router = require("express").Router();
const { hashString, checkPass } = require('./services') //Services
const Users = require("./userModel.js");

router.post("/register", (req, res) => {
    const hash = hashString(req.body.password);
    Users.add({username: req.body.username, password:hash})
        .then(saved => {
            res.status(201).json({data: {id:saved.id, username:saved.username}});
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
            ``;
        });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .then(users => {
            const user = users[0];

            if (user && checkPass(password, user.password)) {
                // store the session to the database
                // produce a cookie and store the session id inside the cookie
                // send back the cookie with the session id to the client
                req.session.loggedIn = true;
                req.session.username = user.username;

                res.status(200).json({ message: "welcome!", session: req.session });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

router.get("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ message: "error logging out, please try later" });
            } else {
                res.status(204).end();
            }
        });
    } else {
        res.status(200).json({ message: "already logged out" });
    }
});

module.exports = router;