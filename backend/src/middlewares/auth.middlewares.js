import jwt from "jsonwebtoken";


// AUTHENTICATION MIDDLEWARE
export const protect = (req, res, next) => {
    try {

        // Get token from Authorization header
        const authHeader = req.headers.authorization;


        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided. Access denied."
            });
        }


        // Format: Bearer TOKEN
        const token = authHeader.split(" ")[1];


        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format."
            });
        }


        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        // Attach user information to request
        req.user = decoded;


        console.log("Authenticated user:", req.user);


        next();


    } catch (error) {

        console.error("Auth middleware error:", error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};


// ROLE AUTHORIZATION
export const authorize = (...allowedRoles) => {
    return (req, res, next) => {

        console.log("User role:", req.user?.role);
        console.log("Allowed roles:", allowedRoles);


        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied. You do not have permission."
            });
        }


        next();
    };
};