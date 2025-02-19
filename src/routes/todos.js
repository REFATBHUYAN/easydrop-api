import express from 'express';
import knex from '../db/knex.js';
import authenticate from '../utils/authenticate.js';

const router = express.Router();

// Create a new todo
router.post('/', authenticate, async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const [id] = await knex('todos').insert({
      title,
      description,
      user_id: req.user.id, // Assuming user is authenticated
    });

    res.status(201).json({ message: 'Todo created', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Get all todos for a user
router.get('/', authenticate, async (req, res) => {
  try {
    const todos = await knex('todos').where({ user_id: req.user.id });
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// Get a specific todo by ID
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await knex('todos').where({ id, user_id: req.user.id }).first();

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// Update a todo
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  try {
    const updated = await knex('todos')
      .where({ id, user_id: req.user.id })
      .update({ title, description });

    if (!updated) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await knex('todos').where({ id, user_id: req.user.id }).del();

    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;
