async function register(req, res) {
  //!Task: register on platform
  const userDetails = req.body;
  console.log({ userDetails });
  try {
    if (!userDetails) throw Error("UserDetails is missing!");
    const { username, name, email, password } = userDetails;
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      name,
      email,
      password: passwordHash,
    });

    await newUser.save();
    res.status(201).json({ success: 201, message: "User is registered successfully!" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: 500, message: `Error in signup, ${error}` });
  }
}

async function login(req, res) {
  //!Task: login on platform
  const userDetails = req.body;

  try {
    if (!userDetails) throw Error("Login details are missing!");
    const { email, password } = userDetails;

    const user = await User.findOne({ email });
    if (!user) throw Error("User Email not exists!");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Email or Password is wrong!");

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ success: 200, token });
  } catch (error) {
    res.status(500).json({
      success: 500,
      message: `Error while login ${error}`,
    });
  }
}

module.exports = {
  register,
  login,
};
