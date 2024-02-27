import { MongoError } from 'mongodb';

// Duplicate Error Handler
export const duplicateErrorHandler = (err) => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `field value:${value} aleady exist. please use another`;
    return  (message);
  };
  
  // Cast Error Handler
  export const castErrorHandler = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return message;
  };

  export const errorHandler = (res, err) => {
    if ((err as MongoError).name === "CastError") {
      const message = `Invalid ${err.path}: ${err.value}.`;
      return res.status(400).json({
        success: false,
        message: message
      });
    }
    else if ((err as MongoError).code === 11000) {
      const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
      const message = `field value:${value} aleady exist. please use another`;
      return res.status(400).json({
        success: false,
        message: message
      });
    }
  }