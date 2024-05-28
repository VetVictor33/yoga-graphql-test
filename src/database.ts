import mongoose from "mongoose";

const Schema = mongoose.Schema;

const peopleSchema = new Schema({
  first: { type: String },
  last: { type: String },
});

export const People = mongoose.model("people", peopleSchema);
