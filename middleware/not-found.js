import { StatusCodes } from 'http-status-codes';

// catch-all invalid route handler
const notFound = (req, res) => res.status(StatusCodes.NOT_FOUND).json({ message: 'Route does not exist' });

export default notFound;
