const userService = require("../services/userService");
const emailService = require("../services/emailService");
const path = require("path");

const registerFunction = async (req, res) => {
  const { email, pass, name, mssv, phone } = req.body;
  if (!email || !pass || !name || !mssv || !phone) {
    return res.status(500).json({
      errCode: 1,
      message: "Vui lòng nhập đầy đủ thông tin đăng ký",
    });
  } //check null
  if (!isValidEmail(email)) {
    return res.status(500).json({
      errCode: 2,
      message: "Email không đúng định dạng",
    });
  } //check valid email
  if (pass.length <= 5) {
    return res.status(500).json({
      errCode: 3,
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    });
  } //check password >= 6 chars
  if (mssv.length <= 9) {
    return res.status(500).json({
      errCode: 4,
      message: "Mã số sinh viên không đúng định dạng, phải có 10 số",
    });
  } //check mssv >= 10 chars
  if (!validateVietnamesePhoneNumber(phone)) {
    return res.status(500).json({
      errCode: 5,
      message: "Số điện thoại không đúng định dạng, phải có 10 số",
    });
  } //check vn phone number, 10 chars with regex
  let isEmailExist = await userService.checkEmail(email);
  let isPhoneExist = await userService.checkPhone(phone);
  let isMSSVExist = await userService.checkMSSV(mssv);
  if (isEmailExist) {
    return res.status(500).json({
      errCode: 6,
      message: "Email đã tồn tại",
    });
  } //check email exist
  if (isPhoneExist) {
    return res.status(500).json({
      errCode: 7,
      message: "Số điện thoại đã tồn tại",
    });
  } //check phone exist
  if (isMSSVExist) {
    return res.status(500).json({
      errCode: 8,
      message: "Mã số sinh viên đã tồn tại",
    });
  } //check mssv exist (maybe remove, if remove then remove unique in model)
  let check = await userService.Register(req.body);
  console.log(check);
  if (check.errCode == 0) {
    return res.status(200).json({
      errCode: 0,
      message: "Tạo tài khoản thành công",
    });
  } else {
    return res.status(500).json({
      errCode: 500,
      message: "Lỗi server",
    });
  }
}; //đăng ký

const isValidEmail = (email) => {
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}; //kiểm tra email
const validateVietnamesePhoneNumber = (phoneNumber) => {
  // 09 03 01
  const vietnamesePhoneNumberRegex =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

  return vietnamesePhoneNumberRegex.test(phoneNumber);
}; //kiểm tra sdt

const handleGetProductImage = async (req, res) => {
  // const imageName = req.body.imageName
  // app.use('/api/images', express.static(path.join(__dirname, 'public/images')));
  const imageName = req.query.imageName;
  if (!imageName) {
    return res.status(400).json({ error: "Image name is required." });
  }
  res.sendFile(path.join(__dirname, "../../public/images", imageName));
}; //send image to frontend

const handleTestEmail = async (req, res) => {
  const send = await emailService.testEmail();
  if (send) {
    return res.status(400).json({
      errCode: 0,
      message: "Email send",
    });
  } else {
    return res.status(500).json({
      errCode: 1,
      message: "Email send fail",
    });
  }
};

module.exports = {
  // checkSession,
  registerFunction,
  handleGetProductImage,

  handleTestEmail,
};
