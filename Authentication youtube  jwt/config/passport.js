const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const UserModel = require('./database')
const passport = require('passport')

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Random string';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload.id)

    UserModel.findById(jwt_payload.id ).then((user) => {

        if (user) {
            console.log(user)
            return done(null, user);
        } else {
            console.log("user")
            return done(null, false);
            // or you could create a new account
        }
    }).catch((err) => {
        return done(err, false);
    });
}));