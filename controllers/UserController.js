import User from "../models/user.js";

// Create a new user
export const createUser = async (req, res) => {
  const { uid, username, email } = req.body;

  if (!uid || !username || !email) {
    return res.status(400).json({ error: "uid, username, and email are required" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ uid }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User with this UID or email already exists" });
    }

    const user = new User({ uid, username, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing user by UID
export const updateUser = async (req, res) => {
  const { uid } = req.params;
  const { username, email } = req.body;

  if (!username && !email) {
    return res.status(400).json({ error: "At least one field (username or email) is required to update" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { ...(username && { username }), ...(email && { email }) },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single user by UID
export const getUserByUID = async (req, res) => {
  const { uid } = req.params;

  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
