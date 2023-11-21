import p1img from "./p1_img.png";
import p2img from "./p2_img.png";
import p3img from "./p3_img.png";
import p4img from "./p4_img.png";
import p5img from "./p5_img.png";
import p6img from "./p6_img.png";
import p7img from "./p7_img.png";
import p8img from "./p8_img.png";
import p9img from "./p9_img.png";
import p10img from "./p10_img.png";
import p11img from "./p11_img.png";
import p12img from "./p12_img.png";


let all_product = [
  {
    id: 1,
    name: "Bánh mì cá hộp",
    category: "banhmi",
    image: p1img,
    new_price:  15000,
    detail:"Bánh Mì Cá Hộp là một món ăn tiêu biểu trong ẩm thực đường phố của Việt Nam, thường được bán tại các quán ăn và xe đẩy đường phố. Món này thường được làm từ cá hộp (canned fish), đặc biệt là cá thu hoặc cá ngừ, được kết hợp với bánh mì và một số nguyên liệu khác. Dưới đây là cách thường thấy để chuẩn bị Bánh Mì Cá Hộp: "
  },
  {
    id: 2,
    name: "Bánh mì cá rim",
    category: "banhmi",
    image: p2img,
    new_price: 12000,
    detail:"Bánh mì cá rim với nhân là cá khô rim, sợi dài và có độ dẻo dai xựt xựt, kết hợp cùng lớp vỏ bánh giòn mang lại vị ngọt mặn vô cùng ưng ý. "
  },
  {
    id: 3,
    name: "Bánh mì chà bông",
    category: "banhmi",
    image: p3img,
    new_price: 15000,
    detail:"Bánh mì chà bông là một món ăn được nhiều người yêu thích nhờ hương vị thơm béo và mằn mặn của chà bông. Bánh mì chà bông chắc chắn sẽ thu hút được rất nhiều thực khách bởi độ thơm ngon, dễ ăn và giàu dinh dưỡng. "
  },
  {
    id: 4,
    name: "Bánh mì hotdog",
    category: "banhmi",
    image: p4img,
    new_price: 15000,
    detail:"Bánh Mì Hotdog là một trong những món ăn nhanh nổi tiếng của Mỹ, với tên gọi khác là bánh mì kẹp xúc xích được đặc trưng với sốt cà chua, mayonnaise và xà lạc, tạo nên hương vị hấp dẫn khi thưởng thức. "
  },
  {
    id: 5,
    name: "Bánh mì ốp la 2 trứng",
    category: "banhmi",
    image: p5img,
    new_price: 12000,
    detail:"Bánh Mì Ốp La 2 Trứng với lớp nhân là trứng gà được chiên nóng hôi thơm béo, đặc biệt là nước sốt đậm đà ăn cùng với rau thơm. Bạn có thể yêu cầu trứng ốp la lòng đào hoặc chín đều. "
  },
  {
    id: 6,
    name: "Bánh mì thịt chả",
    category: "banhmi",
    image: p6img,
    new_price: 15000,
    detail:" Bánh Mì Thịt Chả là món ăn dân dã đặc trưng bởi hương vị thơm ngon và quen thuộc tại Anh Quân Bakery, Bánh Mì Thịt Chả chưa bao giờ là hết hạ nhiệt bởi sự tiện lợi và vị ngon trọn vẹn nó mang lại."
  },
  {
    id: 7,
    name: "Bánh mì thịt nướng",
    category: "banhmi",
    image: p7img,
    new_price: 15000,
    detail:"Bánh mì thịt nướng là món ăn quen thuộc với vỏ bánh giòn tan cùng hương vị đậm đà, dai dai ngọt ngọt từ thịt, được nhiều người ưa chuộng."
  },
  {
    id: 8,
    name: "Dasani",
    category: "nuocuong",
    image: p8img,
    new_price: 10000,
    detail:" Dasani được sản xuất từ nguồn nước ngầm, thông qua hệ thống thẩm thấu ngược và thanh trùng bằng Ozone, đảm bảo sự thuần khiết trong từng giọt nước Giúp giải khát, cung cấp nước, khoáng chất thanh lọc cơ thể"
  },
  {
    id: 9,
    name: "Milo",
    category: "nuocuong",
    image: p9img,
    new_price: 10000,
    detail:"Phù hợp Dùng cho trẻ từ 6 tuổi trở lên Thương hiệu Milo (Thụy Sĩ) Sản xuất tại Việt Nam Sữa Milo được nghiên cứu và phát triển bởi Nestlé Thuỵ Sĩ, là sự kết hợp hoàn hảo từ hương vị thơm ngon của ca cao cùng nguồn dưỡng chất từ sữa, mầm lúa mạch nguyên cám, các vitamin, khoáng chất."
  },
  {
    id: 10,
    name: "SJORA_XOAIDAO",
    category: "nuocuong",
    image: p10img,
    new_price: 10000,
    detail:" Thức Uống Trái Cây SJORA VỊ XOÀI ĐÀO được làm từ 100% trái cây tươi và được bán theo dạng thức uống chiết từ máy rót để đảm bảo trải nghiệm hương vị tuyệt vời nhất. Thức uống này là 1 sản phẩm của Công ty Nestlé Vietnam."
  },
  {
    id: 11,
    name: "Tra Chanh",
    category: "nuocuong",
    image: p11img,
    new_price: 10000,
    detail:"•	Trà chanh Nestle là một sự kết hợp hoàn hảo của tinh chất từ lá Trà tự nhiên và hương vị thơm ngon tuyệt vời từ Chanh nhằm mang đến cho bạn sự tươi mát, giải nhiệt sảng khoái và căng tràn sức sống. "
  },
  {
    id: 12,
    name: "Trà Vải",
    category: "nuocuong",
    image: p12img,
    new_price: 15000,
    detail:"•	Trà vải là một sản phẩm của Tập đoàn Nestle với sự kết hợp hoàn hảo của tinh chất từ lá Trà tự nhiên và hương vị thơm ngon tuyệt vời từ vải nhằm mang đến cho bạn sự tươi mát, giải nhiệt. "
  },
  
];

export default all_product;
