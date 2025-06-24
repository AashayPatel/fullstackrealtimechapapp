import jwt from 'jsonwebtoken';

export const generateToken = (userID, res) => {
//   console.log("generateToken called with userID:", userID); // ADD THIS
//   console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET); // ADD THIS
  
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

//   console.log("Token created:", token.substring(0, 20) + "..."); // ADD THIS (partial token for security)

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false,                
    sameSite: "lax",              
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });

//   console.log("Cookie set with options:", {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     maxAge: 7 * 24 * 60 * 60 * 1000
//   }); // ADD THIS

  return token;
};
