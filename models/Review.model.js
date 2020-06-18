const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    announcement: {
      type: Schema.Types.ObjectId,
      ref: "Announcement",
    },
    description: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);
