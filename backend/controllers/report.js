const ReportModel = require("../models/report");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");



const createReport = async (req, res) => {
  const userID = req.headers["user-id"]; // Corrected accessing headers
  console.log(userID);
  const baId = userID;

   const {
    name, phone, user_id, present, location
   } = req.body


  //   validation
  if ((!name, !phone, !user_id, !present, !location)) {
    throw new BadRequestError("Please fill all the required fill");
  }

  const jobs = await ReportModel.create(
    {
      ba: baId,
      name,
      phone,
      user_id,
      present,
      location
    }
  );

  if (!jobs) {
    throw new UnauthenticatedError("Invalid entries");
  }

  res.status(StatusCodes.CREATED).json({ jobs });
};


module.exports = createReport;
