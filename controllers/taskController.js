const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await prisma.task.create({
    data: { title, description },
  });
  res.json(task);
};

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
};

// Get a single task by ID
const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(task);
};

// Update a task by ID
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const task = await prisma.task.update({
    where: { id: parseInt(id) },
    data: { title, description, status },
  });
  res.json(task);
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({
    where: { id: parseInt(id) },
  });
  res.sendStatus(204);
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
