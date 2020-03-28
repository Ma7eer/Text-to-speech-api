export const getMessage = (req, res) => {
  res.status(200).json({ message: 'Hello World' });
};
