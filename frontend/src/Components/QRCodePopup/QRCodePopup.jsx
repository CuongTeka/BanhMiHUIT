import React from 'react'

const QRCodePopup = () => {
  return (
    <div className="qrcode-popup">
      <img
        src={
          paymentMethod === "VnPay"
            ? "link đến hình ảnh QR Code cho VnPay"
            : "link đến hình ảnh QR Code cho MoMo"
        }
        alt={paymentMethod === "VnPay" ? "VnPay QR Code" : "MoMo QR Code"}
        className="qrcode-image"
      />
      <button onClick={() => setShowQRCodePopup(false)}>Đóng</button>
    </div>
  )
}

export default QRCodePopup