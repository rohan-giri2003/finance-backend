// Ye middleware check karega ki user ka role kya hai
exports.checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.headers.role; // Hum header se role bhejenge temporary
        
        if (!roles.includes(userRole)) {
            return res.status(403).json({ 
                message: "Access Denied: You don't have permission for this action." 
            });
        }
        next();
    };
};