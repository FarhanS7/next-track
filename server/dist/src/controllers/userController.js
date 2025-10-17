import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
/**
 * @desc Get all users
 */
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: `Error retrieving users: ${error.message}`,
        });
    }
};
/**
 * @desc Get a single user by cognitoId
 * @route GET /api/users/:cognitoId
 */
export const getUser = async (req, res) => {
    const { cognitoId } = req.params;
    // ✅ Guard: handle missing parameter
    if (!cognitoId) {
        res.status(400).json({ message: "Missing cognitoId parameter" });
        return;
    }
    try {
        const user = await prisma.user.findUnique({
            where: { cognitoId },
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({
            message: `Error retrieving user: ${error.message}`,
        });
    }
};
/**
 * @desc Create a new user
 * @route POST /api/users
 */
export const postUser = async (req, res) => {
    try {
        const { username, cognitoId, profilePictureUrl = "i1.jpg", teamId = 1, } = req.body;
        // ✅ Validate required fields
        if (!username || !cognitoId) {
            res.status(400).json({
                message: "Missing required fields: username and cognitoId",
            });
            return;
        }
        const newUser = await prisma.user.create({
            data: {
                username,
                cognitoId,
                profilePictureUrl,
                teamId,
            },
        });
        res.json({
            message: "User created successfully",
            newUser,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error creating user: ${error.message}`,
        });
    }
};
//# sourceMappingURL=userController.js.map