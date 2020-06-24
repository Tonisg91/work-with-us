const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
  {
    title: {
      type: String,
    },
    messages: [String],
    announcement: {
      type: Schema.Types.ObjectId,
      ref: 'Announcement'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Chat", chatSchema);