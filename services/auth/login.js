const signupSchema = require('../../models/signUpCredentials');
async function handleLoginReq(req, res) {
    try {
        const {email, password } = req.body;
        console.log(email, password);
        if (!email || !password) {
            return res.render('loginPage', { error: "All fields are required" });
        }

        const user = await signupSchema.findOne({ email: email, password: password})
        console.log(user);
        if(!user){
            return res.render('loginPage', { error: "Invalid email or password" });
        }
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.render('signUpPage', { error: "Registration failed" });
    }
}

module.exports = {
    handleLoginReq
};
