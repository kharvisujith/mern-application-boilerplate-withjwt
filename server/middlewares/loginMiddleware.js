const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

const authenticateUser = (allowedRoles) => {
  return (req, res, next) => {
    console.log("vlaue of allowed roles iss", allowedRoles);
    const headersSection = req.headers.authorization;
    console.log("value of headersection is", headersSection);
    if (!headersSection || !headersSection.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authentication failed :: Token is missing or Invalid",
      });
    }
    const token = headersSection.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    console.log(decodedToken.role, allowedRoles);
    if (!allowedRoles.includes(decodedToken.role)) {
      console.log("yessss inside htiss");
      return res
        .status(403)
        .json({ error: "Authetication failed :: forbidden" });
    }
    req.user = decodedToken;
    next();
  };
};

module.exports = authenticateUser;

// const authenticateUser = (req, res, next) => {
//   try {
//     const headersSection = req.headers.authorization;

// if (!headersSection.startsWith("Bearer ")) {
//   return res.status(401).json({
//     error: "Authentication failed :: Token is missing or Invalid",
//   });
// }
// const token = headersSection.split(" ")[1];

//     const decodedToken = jwt.verify(token, secretKey);
//     console.log("decoded token is", decodedToken);

//     // if we want to user decode values --> payload and exp form token furtern we an use
//     req.user = decodedToken;

//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .json({ message: "Authentication failed: Token has expired" });
//     }
//     return res
//       .status(401)
//       .json({ error: "Authentication failed :: Invalid token keeek" });
//   }

//};

// module.exports = authenticateUser;
