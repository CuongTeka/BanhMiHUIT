import React from "react";
import "./Adver.css";
import icon1 from "../Assets/ICON1.png";
import icon2 from "../Assets/ICON2.png";
import icon3 from "../Assets/ICON3.png";
import icon4 from "../Assets/ICON4.png";
const Adver = () => {
  return (
    <div className="Adver">
      <div className="Ad_Col_container">
        <div className="Ad_Col-inner">
          <div className="wrapper">
            <div className="icon_ontop insight-icon-boxes">
              <div className="insight-icon-boxes--icon">
                <img src={icon1} alt="" />
              </div>
              <div className="insight-icon-boxes--inner">
                <div className="insight-icon-boxes-title">VỎ BÁNH CAO CẤP</div>
                <div className="insight-icon-boxes-content">Vỏ bánh từ bột mì cao cấp, ruột đặc nặng gấp 2 lần bánh thông thường</div>    
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Ad_Col_container">
        <div className="Ad_Col-inner">
          <div className="wrapper">
            <div className="icon_ontop insight-icon-boxes">
              <div className="insight-icon-boxes--icon">
                <img src={icon2} alt="" />
              </div>
              <div className="insight-icon-boxes--inner">
                <div className="insight-icon-boxes-title">THỰC ĐƠN PHONG PHÚ</div>
                <div className="insight-icon-boxes-content">Nguyên liệu tươi mới chế biến và sử dụng trong ngày, cân bằng dinh dưỡng</div>    
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Ad_Col_container">
        <div className="Ad_Col-inner">
          <div className="wrapper">
            <div className="icon_ontop insight-icon-boxes">
              <div className="insight-icon-boxes--icon">
                <img src={icon3} alt="" />
              </div>
              <div className="insight-icon-boxes--inner">
                <div className="insight-icon-boxes-title">NƯỚC XỐT ĐỘC ĐÁO</div>
                <div className="insight-icon-boxes-content">Được chế biến theo công thức và bí quyết riêng, độc đáo, hài hòa.</div>    
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Ad_Col_container">
        <div className="Ad_Col-inner">
          <div className="wrapper">
            <div className="icon_ontop insight-icon-boxes">
              <div className="insight-icon-boxes--icon">
                <img src={icon4} alt="" />
              </div>
              <div className="insight-icon-boxes--inner">
                <div className="insight-icon-boxes-title">ĐỒ UỐNG THEO MÙA</div>
                <div className="insight-icon-boxes-content">Nước trái cây ngọt lành hương vị miền nhiệt đới, chọn lọc theo mùa.</div>    
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Adver;
