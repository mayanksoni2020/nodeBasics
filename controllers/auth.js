exports.getLoginPage = (req, res, next) => {
    // const loggedIn = req.get("Cookie").split('=')[1] == "true";
    const loggedIn = req.session.isLoggedIn;
    res.render('login', {
        title: "Login",
        path: "/login",
        isAuthenticated: loggedIn,
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    // res.setHeader("Set-Cookie", "isLoggedIn=true;");        // Max-Age = 10; HttpOnly or Secure;
    res.redirect("/");
};

exports.logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) throw err;
        console.log("Logged Out");
    });
    res.redirect("/");
};