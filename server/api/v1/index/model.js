const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// placeholder code to be replaced
// with your schema as needed

const indexSchema = new Schema(
  {
    id: { type: Schema.Types.ObjectId }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    strict: false
  }
);

module.exports = mongoose.model('Index', indexSchema);
