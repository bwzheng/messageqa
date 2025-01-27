var isEmailValid = function (db, email, callback) {
    db.appUsers.findOne({
        email: email
    }, function (err, user) {
        if (!user) {
          db.therapistUsers.findOne({
              email: email
          }, function (err, user) {
              callback(user);
          });
        } else {
          callback(user);
        }
    });
};

module.exports.validate = function (req, res, db, callback) {
    // if the request doesnt have a header with email, reject the request
    if (!req.params.token) {

        res.writeHead(403, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(JSON.stringify({
            error: "You are not authorized to access this application",
            message: "An Email is required as part of the header"
        }));
    };

    isEmailValid(db, req.params.token, function (user) {
        if (!user) {
          console.log("hello worldd");
            res.writeHead(403, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify({
                error: "You are not authorized to access this application",
                message: "Invalid User Email"
            }));
        } else {
            callback(user);
        }
    });
};
