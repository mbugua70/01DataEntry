const UserModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const { ba_name, ba_phone, ba_location } = req.body;

  //   if (!name || !email || !password) {
  //     throw new BadRequestError("Please all the field must be filled");
  //   }

  const user = await UserModel.create({ ...req.body });

  const token = user.createToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user:  user.getUser(), token });
};

const getUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req;

  const user = await UserModel.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`No job with id: ${userId}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  register,
  getUser,
};
