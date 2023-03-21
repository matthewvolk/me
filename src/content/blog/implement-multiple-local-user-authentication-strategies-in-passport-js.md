---
title: Implement Multiple Local User Authentication Strategies in Passport.js
description:
  A tutorial describing how to implement more than one local user authentication strategy using
  Node.js, Express.js, and Passport.js.
published: Aug 07, 2018
updated: Jun 09, 2020
---

## Introduction

User authentication is complicated.

Writing user authentication from scratch is even more complicated. You’ll need to make complex
security considerations that can delay progress on your Node.js application.

The good news is that the npm package [Passport.js](https://github.com/jaredhanson/passport)
abstracts a good amount of this complication away from us, empowering us to create solutions for
user authentication that are modular, maintainable, and extensible — however the Passport
[documentation](http://www.passportjs.org/docs/authenticate/) is less than helpful. It gives great
explanation of the API, but skips over very useful module extensibility features.

This article serves to demonstrate one capability offered by Passport.js which is not explicitly
outlined in the documentation: **Authenticate multiple _local_ user types with multiple _local_
strategies. Each strategy will be using different user models with different user roles, while at
the same time utilizing Passport's native serialization methods to authenticate and authorize user
sessions.**

## Creating Local Strategies for Two User Types

Although it isn't required, Passport.js's <kbd>passport.use();</kbd> method does take one optional
parameter that is not mentioned in the [documentation](http://www.passportjs.org/docs/configure/):

```js
  /**
  * @param {string} strategyName
  * @param {LocalStrategy} LocalStrategy
  */
passport.use([ strategy-name,] new LocalStrategy);
```

The <kbd>passport.use</kbd> method is similar to Express's <kbd>app.use</kbd> in that it mounts a
specified strategy to the Passport object, which is called when the route handler callback invokes
the <kbd>authenticate();</kbd> method (e.g., <kbd>app.get( "/path",
passport.authenticate('strategyName') );</kbd>).

So, you can add many different _named_ strategies to your app's Passport object to be used in other
parts of your application, and Passport is programmed to validate requests using those strategies
anytime you want via the <kbd>authenticate();</kbd> method.

In a typical application that only needs one type of user authentication, you would see something
like:

```js
const passport = require("passport");
require("./config/passport")(passport);
```

```js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    // logic that checks the request's data against the application database
    // for an existing username, if no username exists, create
    // and save it to the database along with a hashed
    // version of the password
  });
}
```

```js
const express = require("express");
const passport = require("passport");

app.post(
  "/login",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);
```

In the <kbd>app.js</kbd> file, we are importing the passport object, and then passing it as an
argument into our <kbd>config/passport.js</kbd> file which will initialize the specified strategies
in the app's Passport object.

In order to change the code above so that you can use multiple local strategies, is to add a

<kbd>passport.use</kbd> method with names of the strategies we want to include. I
have included an example below:

```js
const passport = require("passport");
require("./config/passport")(passport);
```

```js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    // Include logic that searches the application database
    // for an existing username, if no username exists, create
    // and save it to the database along with a hashed
    // version of the password
  });

  passport.use('local-otherUser-signup', new LocalStrategy({
    // Include logic that searches the application database
    // for an existing username, if no username exists, create
    // and save it to the database along with a hashed
    // version of the password
  });
}
```

```js
const express = require("express");
const passport = require("passport");

app.post('/signup-1', passport.authenticate('local-signup', { ... });
app.post('/signup-2', passport.authenticate('local-otherUser-signup', { ... });
```

If you'd like more detail and examples than what is provided above,
[issue #50](https://github.com/jaredhanson/passport/issues/50) from the Passport.js repository on
GitHub shows Jared Hanson explaining the same concept.

## Extending <kbd>passport.serializeUser();</kbd> and <kbd>passport.deserializeUser();</kbd>

Once you've completed the steps above, you won't yet be able to use the named local authentication
strategies from the config/passport.js file that you created above, and your application is likely
crashing silently.

The next step is to extend the Passport serialization methods with a function that both checks which
Passport strategy was used to generate that client, and then generates a unique code to serialize
that user with so that they can be deserialized with each request thereafter.

Before moving on, take a look at the serialization methods in the
[documentation](http://www.passportjs.org/docs/configure/). The user ID (you provide as the second
argument of the "done" function in the <kbd>serializeUser</kbd> method) is saved in the session and
is later used to retrieve the whole object via the deserializeUser function. serializeUser
determines, which data of the user object should be stored in the session. The result of the

<kbd>serializeUser</kbd> method is attached to the session as
<kbd>req.session.passport.user ={}</kbd>. The first argument of <kbd>
  deserializeUser
</kbd> corresponds to the key of the user object that was given to the done function
(see 1.). So your whole object is retrieved with help of that key.

If you do not make your user ID unique across each user Model, your <kbd>serializeUser</kbd>
function will not know which database to query to retrieve the user you are trying to deserialize.

There are a few ways to fix this, but I included a session ID constructor below:

```js
const LocalStrategy = require('passport-local').Strategy;
const Guest = require('../models/guest');
const Resident = require('../models/resident');

function SessionConstructor(userId, userGroup, details) {
  this.userId = userId;
  this.userGroup = userGroup;
  this.details = details;
}

module.exports = function(passport) {

  passport.serializeUser(function (userObject, done) {
    // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    let userGroup = "model1";
    let userPrototype =  Object.getPrototypeOf(userObject);

    if (userPrototype === Model1.prototype) {
      userGroup = "model1";
    } else if (userPrototype === Resident.prototype) {
      userGroup = "model2";
    }

    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);
  });

  passport.deserializeUser(function (sessionConstructor, done) {

    if (sessionConstructor.userGroup == 'model1') {
      Model1.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    } else if (sessionConstructor.userGroup == 'model2') {
      Model2.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    }

  });

  passport.use( ... );

}
```