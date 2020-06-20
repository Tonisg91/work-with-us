const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    professionalId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
