const signUpSchema = require('../models/signUpCredentials');

async function handleSignUpReq(req, res) {
    try {
        const { name, email, password } = req.body;
        
        if (!email || !password || !name) {
            return res.render('signUpPage', { error: "All fields are required" });
        }

        const user = await signUpSchema.create({
            name,
            email,
            password
        });

        res.render('/');
    } catch (err) {
        res.render('signUpPage', { error: "Registration failed" });
    }
}

module.exports = {
    handleSignUpReq
};