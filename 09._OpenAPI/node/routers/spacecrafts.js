import { Router } from "express";
const router = Router();

const spacecrafts = [{id: 1, name: "Apollo 11"}, {id: 2, name: "Apollo 12"}];

/**
 * @openapi
 * /api/spacecrafts:
 *  parameters:
 *   - name: spacecraftsId
 *    in: path
 *  get: 
 *   description: get specific spacecraft by id
 *   responses:
 *    200:
 *     description: return specific spacecraft
 */
router.get("/api/spacecrafts/:spacecraftsId", (req, res) => {
    const spacecraftsId = req.params.spacecraftsId;
    const spacecraft = spacecrafts.find((spacecraft) => spacecraft.id === spacecraftsId);
    res.send(spacecraft);
});

export default router;