import { STATUS_CODES } from '../constants.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case STATUS_CODES.BAD_REQUEST:
      res.json({
        title: 'Validation Failed',
        message: err.message,
        statusCode,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.UNAUTHORIZED:
      res.json({
        title: 'UNAUTHORIZED',
        message: err.message,
        statusCode,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.FORBIDDEN:
      res.json({
        title: 'FORBIDDEN',
        message: err.message,
        statusCode,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.NOT_FOUND:
      res.json({
        title: 'Not Found',
        message: err.message,
        statusCode,
        stackTrace: err.stack,
      });
      break;
    case STATUS_CODES.SERVER_ERROR:
      res.json({
        title: 'Internal Server Error',
        message: err.message,
        statusCode,
        stackTrace: err.stack,
      });
    default:
      console.log('All good');
      break;
  }
};

export default errorHandler;
