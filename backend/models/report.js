const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema(
  {
    ba: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ba',
    },
    name: {
      type: String,
      required: [true, "Please the field can't be empty"],
    },
    phone: {
      type: Number,
      required: [true, "Please the field can't be empty"],
    },
     user_id: {
      type: Number,
      required: [true, "Please the field can't be empty"],

    },
   present: {
    type: String,
    required: [true, "Please the field can't be empty"],
   },
   location: {
    type: String,
    require: [true, "Please the field can't be empty"],
   }
  },
  { timestamps: true }
);

const ReportModel = mongoose.model("Report", ReportSchema);

module.exports = ReportModel;
