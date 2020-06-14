const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email obligatorio"],
      match: [/^\S+@\S+\.\S+$/, "Dirección de correo inválida"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: String,
    passwordHash: {
      type: String,
      required: [true, "Contraseña obligatoria"],
    },
    announcements: [
      {
        type: Schema.Types.ObjectId,
        ref: "Announcement",
      },
    ],
    sector: {
      type: String,
      enum: [
        "Fontanería",
        "Carpintería",
        "Carpintería de aluminio",
        "Paletería",
        "Albañilería",
        "Electricidad",
        "Jardinería",
        "Reparación electrodomésticos",
        "Pintura",
        "Cristalería",
        "Cerrajería",
        "Otros",
      ], //AÑADIR LOS DIFERENTES SECTORES
    },
    address: String,
    city: String,
    description: String,
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

module.exports = model("User", userSchema);
