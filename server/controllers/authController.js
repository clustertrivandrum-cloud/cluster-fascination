const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const validator = require("validator");
const sanitizeHtml = require("sanitize-html");

module.exports.signup = async (req, res) => {
  //  console.log(req.body)
   const {
      username, 
      password,
      email,
      phone,  
   } = req.body;
   console.log("sam-",username, 
    password,
    email,
    phone)

   try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      // await User.create({
      //    username,
      //    password: encryptedPassword,
      //    email,
      //    phone,
      // });
      const newUser = new User({
         username,
         password: encryptedPassword,
         phone,
         email,
       });
    
       await newUser.save();

      // const accessToken = jwt.sign(
      //    { _id: userExists._id },
      //    process.env.JWT_ACCESS_SECRET,
      //    {
      //       expiresIn: process.env.JWT_ACCESS_EXPIRY,
      //    }
      // );

      // const refreshToken = jwt.sign(
      //    { _id: userExists._id },
      //    process.env.JWT_REFRESH_SECRET,
      //    {
      //       expiresIn: process.env.JWT_REFRESH_EXPIRY,
      //    }
      // );

      // console.log({ accessToken, refreshToken });
      const { password: _, ...userWithoutPassword } = newUser.toObject();
      return res.status(200).json({
         message: "Registration successfull",
         data: { userWithoutPassword,signupStatus:true } 

         // data: { token: { accessToken, refreshToken }, newUser } 
      });
   } catch (error) {
      console.log('err',error)
      return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
   }
};

// module.exports.signin = async (req, res) => {
//    const { email, password } = req.body; 
//    console.log('req',req.body)

//    try {
//       const pipeline = [
//          { 
//             $match: {
//                $or: [
//                   { username: email },
//                   { email: email },
//                   { phone: email },
//                ],
//             },
//          },
//          {
//             $project: {
//                _id: 1,
//                username: 1,
//                email: 1,
//                phone: 1,
//                password: 1,
//                is_admin: 1,
//                is_verified: 1,
//                profile: 1,
//                cart: 1,
//                wishlist: 1,
//                wallet: 1,
//             },
//          },
//       ];

//       await userSchema
//          .aggregate(pipeline)
//          .exec()
//          .then((users) => {
//             if (users.length === 0) {
//                console.log("User not found");
//                return res.status(404).json({ message: "user not found" })
//             } else {
//                const user = users[0];
//                bcrypt.compare(password, user.password, (err, result) => {
//                   if (err) {
//                      console.error("Password comparison error:", err);
//                      return res.status(500).json({ message: err?.message })
//                   } else if (result) {
//                      const accessToken = jwt.sign(
//                         { _id: user._id },
//                         process.env.JWT_ACCESS_SECRET,
//                         {
//                            expiresIn: process.env.JWT_ACCESS_EXPIRY,
//                         }
//                      );

//                      const refreshToken = jwt.sign(
//                         { _id: user._id },
//                         process.env.JWT_REFRESH_SECRET,
//                         {
//                            expiresIn: process.env.JWT_REFRESH_EXPIRY,
//                         }
//                      );
//                      delete user.password;
//                      return res.status(200).json({
//                         message: "login successfull",
//                         data: { token: { accessToken, refreshToken }, user }
//                      });
//                   } else {
//                      console.log(result);
//                      console.log("Incorrect password");
//                      return res.status(404).json({ message: "Incorrect password" })
//                   }
//                });
//             }
//          });
//    } catch (error) {
//       return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
//    }
// };


// Input validation and sanitization
const validateLoginInput = (email, password) => {
  const errors = [];
  
  // Email validation
  if (!email || !email.trim()) {
    errors.push("Email is required");
  } else if (!validator.isEmail(email.trim())) {
    errors.push("Please provide a valid email address");
  }
  
  // Password validation
  if (!password || !password.trim()) {
    errors.push("Password is required");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  return errors;
};

// Rate limiting for login attempts
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports.signin = async (req, res) => {
  try {
    const { password, email } = req.body;
    
    // Input validation
    const validationErrors = validateLoginInput(email, password);
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: validationErrors.join(", ") 
      });
    }
    
    // Sanitize inputs
    const sanitizedEmail = sanitizeHtml(email.trim().toLowerCase());
    const sanitizedPassword = sanitizeHtml(password);
    
    // Find the user by email
    const existingUser = await User.findOne({ email: sanitizedEmail });
    
    if (!existingUser) {
      // Log failed attempt (without sensitive info)
      console.log(`Failed login attempt for email: ${sanitizedEmail} - User not found`);
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }
    
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(sanitizedPassword, existingUser.password);
    
    if (!passwordMatch) {
      // Log failed attempt (without sensitive info)
      console.log(`Failed login attempt for email: ${sanitizedEmail} - Invalid password`);
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }
    
    // Check if user account is verified
    if (!existingUser.is_verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email address before logging in"
      });
    }
    
    // Generate the access token
    const accessToken = jwt.sign(
      { 
        _id: existingUser._id,
        email: existingUser.email,
        is_admin: existingUser.is_admin
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m",
      }
    );
    
    // Generate the refresh token
    const refreshToken = jwt.sign(
      { 
        _id: existingUser._id,
        type: "refresh"
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d",
      }
    );
    
    // Log successful login (without sensitive info)
    console.log(`Successful login for user: ${existingUser._id}`);
    
    // Remove password from user object
    const userWithoutPassword = { ...existingUser.toObject() };
    delete userWithoutPassword.password;
    
    // Respond with the user data and tokens
    res.status(200).json({
      proceed: true,
      success: true,
      data: { 
        token: { accessToken, refreshToken }, 
        user: userWithoutPassword 
      },
      message: "Login successful",
    });
    
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error" 
    });
  }
};


module.exports.getCurrentUser = async (req, res) => {
   try {
      const _id = req.decoded._id;
      console.log('idd,',_id)
      const currentUser = await User.findOne({ _id });
      console.log('crnt user ',currentUser)
      if (!currentUser) {
         return res.status(400).json({ message: 'user does not exists' })
      }
      return res.status(200).json({ data: currentUser, message: 'user details fetched successfully' })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ message: err?.message ?? 'Something went wrong' })
   }
}