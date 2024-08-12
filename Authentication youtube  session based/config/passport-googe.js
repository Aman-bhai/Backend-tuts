const { compareSync } = require('bcrypt');
const passport = require('passport')
const UserModel = require('./database-google')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    // clientID: put client id,
    // clientSecret: put client secret,
    callbackURL:"http://localhost:5000/auth/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // console.log(accessToken, profile);
        // UserModel.findOne({ googleId: profile.id }, (err, user) => {
        //     if (err) return cb(err, null);
        //     if (!user) {
        //         let newUser = new UserModel({
        //             googleId: profile.id,
        //             name: profile.displayName
        //         })
        UserModel.findOne({ googleId: profile.id }).then((user) => {
            console.log(accessToken, profile);

            if (!user) {
                let newUser = new UserModel({
                    googleId: profile.id,
                    name: profile.displayName
                })

                newUser.save();
                return cb(null, newUser);
            } else {
                return cb(null, user)
            }
        }).catch((err) => {
            if (err) return cb(err, null);
        })
    }
));


//Persists user data inside session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(function (id, done) {
    UserModel.findById(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err)
    });
});