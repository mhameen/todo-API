import express from "express";

const app = express();

const db = {
  todos: [],
};

app.use(express.json());

app.get('/todos', (req, res) => {
  res.status(200).json({
    data: {
      todos: db.todos,
    },
  });
});

app.post('/todo', (req, res) => {
  const { text } = req.body;
  const todo = {
    id: db.todos.length + 1,
    text,
  };
  db.todos.push(todo);

  res.status(200).json({
    data: {
      message: "todo added succesfully",
    },
  });
});

app.delete('/todo/:id', (req, res) => {
  const { id } = req.params;

  const todo = db.todos.find((todo) => todo.id == id);
  if (!todo) {
    res.status(404).json({
      data: {
        message: "Id not found",
      },
    });
  }
  const index = db.todos.indexOf(todo);
  db.todos.splice(index, 1);
  res.status(200).json({
    data: {
      message: "todo deleted done",
    },
  });
});

app.listen(3000, () => {
  console.log("the port is running at 3000");
});
