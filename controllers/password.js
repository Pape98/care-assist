const User = require('../models/User');

// Mailer
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('6QwjHw9RTDyAa2Nzrh51lQ');


// Generate token (userSchema) and send email 
exports.recover = (req, res) => {
    //Generate and set password reset token
    console.log(req.body);
    User.findOne({email: req.body.email})
        .then(user => {
            user.generatePasswordReset();

            // Save the updated user object
            user.save()
                .then(user => {
                    // send email
                    let link = "http://" + req.headers.host + "/users/reset/" + user.resetPasswordToken;
                    const mailOptions = {
                        to: user.email,
                        from: 'careassisthelp@gmail.com',
                        subject: "CareAssist password reset",
                        text: `Hi ${user.username} \n 
                                Please click on the following link ${link} to reset your password. \n\n`,
                    };

                    sgMail.send(mailOptions, (error, result) => {
                        if (error) return res.status(500).json({message: error.message});

                        res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'});
                    });
                })
                .catch(err => res.status(500).json({message: err.message}));
        })
        .catch(err => 
            res.status(500).json({message: err.message})
        );
    
    
};