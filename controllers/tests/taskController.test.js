const request = require("supertest");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const taskRoutes = require("../routes/taskRoutes");

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use("/api", taskRoutes);

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Task Controller", () => {
  it("should create a new task", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Test Task",
      description: "This is a test task",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Test Task");
    expect(response.body.description).toBe("This is a test task");
  });

  it("should get all tasks", async () => {
    const response = await request(app).get("/api/tasks");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a task by ID", async () => {
    const task = await prisma.task.create({
      data: {
        title: "Test Task",
        description: "This is a test task",
      },
    });

    const response = await request(app).get(`/api/tasks/${task.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", task.id);
  });

  it("should update a task by ID", async () => {
    const task = await prisma.task.create({
      data: {
        title: "Test Task",
        description: "This is a test task",
      },
    });

    const response = await request(app).put(`/api/tasks/${task.id}`).send({
      title: "Updated Task",
      description: "This is an updated test task",
      status: "completed",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("title", "Updated Task");
    expect(response.body).toHaveProperty("status", "completed");
  });

  it("should delete a task by ID", async () => {
    const task = await prisma.task.create({
      data: {
        title: "Test Task",
        description: "This is a test task",
      },
    });

    const response = await request(app).delete(`/api/tasks/${task.id}`);

    expect(response.status).toBe(204);
  });
});
