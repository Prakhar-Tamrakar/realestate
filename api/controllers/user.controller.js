import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id) {
//    return next(errorHandler(403, "You can only update your own account!"));
//   }
//   try {
//     if (req.body.password) password = await bcryptjs.hash(req.body.password, 10);

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           password: password,
//           avatar: req.body.avatar || null,
//         },
//       },
//       { new: true }
//     );

//     const { password, ...others } = updatedUser._doc;
//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: others,
//     });
//   } catch (error) {
//     return  next(errorHandler(404, 'User not found!'));
//   }
// };

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    next(error);
  }
};