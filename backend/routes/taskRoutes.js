const express = require("express");
const router = express.Router();

const{
    getTasks,
    createTask,
    UpdateTask,
    deleteTask,
    toggleTask
} = require("../controllers/taskController");

router.get("/",getTasks);
router.post("/",createTask);
router.put("/:id", UpdateTask);
router.delete("/:id",deleteTask);
router.patch("/:id/toggle",toggleTask);

module.exports = router;