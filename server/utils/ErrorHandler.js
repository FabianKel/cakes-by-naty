// ErrorHandler.js
class ErrorHandler {
    static handleError(err, res) {
      console.error(err); //Para debugear
  

      if (err.type === 'database') {
        res.status(500).json({ error: 'Database Error', details: err.message });
      } else if (err.type === 'validation') {
        res.status(400).json({ error: 'Validation Error', details: err.message });
      } else if (err.type === 'not_found') {
        res.status(404).json({ error: 'Resource Not Found', details: err.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error', details: err.message });
      }
    }
  }
  
  module.exports = ErrorHandler;
  