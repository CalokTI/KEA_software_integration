import { Router } from "express";
const router = Router();

const users = [{id: 1, name: "John Doe"}, {id: 2, name: "Jane Doe"}];

/**
 * @openapi
 * /api/users:
 *   get:
 *     description: get all users
 *     responses:
 *       200:
 *         description: Returns all users
 */


router.get("/api/users", (req, res) => {
  res.send(users);
});

/**
 * @openapi
 * /api/users:
 *   post:
 *     description: create a new user
 *     responses:
 *       200:
 *         description: Returns newly created user
 */

router.post("/api/users", (req, res) => {
    const user = req.body;
    users.push(user);
    res.send({data: user});
});

export default router;
