import React from "react";
import "./Aboutus.css";
const Aboutus = () => {
  return (
    <div className="aboutus">
      <div className="aboutus-wrapperr">
        <div className="aboutus-inner">
          <h2>Giới thiệu về chúng tôi</h2>
          <div className="aboutus-wrapper">
            <p>
              <em>
                <b>
                  <span style={{ color: "#339966" }}>Bánh mì Sinh viên HUIT </span>
                   - Chất lượng ngon và lành mạnh cho bữa ăn nhanh chóng và tiện
                  lợi!
                </b>
              </em>
            </p>
            <p>
              <strong><span style={{ color: "#339966" }}>  Chúng tôi hiểu rằng sinh viên cần bữa ăn ngon và lành mạnh, mà
                  còn phải nhanh chóng và tiện lợi! Chất lượng ngon và lành luôn
                  là tiêu chuẩn mà chúng tôi hướng đến, phục vụ hàng ngàn sinh
                  viên sành ăn suốt nhiều năm qua.</span>
              </strong>
            </p>
            <p>
              <em>
                <span style={{ color: "#339966" }}>
                  Để đảm bảo chất lượng, chúng tôi tuyển chọn nguyên liệu từ
                  những nhà cung cấp uy tín nhất. Rau tươi được chế biến và sử
                  dụng trong ngày để đảm bảo độ tươi ngon. Các sản phẩm nước
                  trái cây được lựa chọn kỹ càng, tuân theo mùa, để mang đến
                  hương vị tươi ngon và tự nhiên.
                </span>
              </em>
            </p>
            <p>
              <em>
                Chúng tôi luôn chú trọng đến <span style={{ color: "#339966" }}>
                  yếu tố xốt - yếu tố quan trọng tạo nên hương vị đặc trưng của
                  Bánh mì Sinh viên HUIT.
                </span>
              </em>
            </p>
            <p>
              <em>
                Sự kết hợp hoàn hảo giữa nguyên liệu tươi ngon và xốt độc đáo
                chính là lý do
                <span style={{ color: "#339966", fontWeight:"700" }}> Bánh mì Sinh viên HUIT </span>
                đến những bữa ăn cân đối dinh dưỡng, phục vụ nhu cầu về thời
                gian và tiện lợi cho sinh viên."
              </em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
