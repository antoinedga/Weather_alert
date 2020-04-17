const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const HourSchema = new Schema({
  hours: {
    type: [Number],
    required: true
  },
  user_id : {
    type: Schema.Types.ObjectId,
    required: true
  }

});
module.exports = User = mongoose.model("hours", HourSchema);