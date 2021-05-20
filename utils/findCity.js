const findCity = (plateNumber) => {
    switch (plateNumber.substring(0,2)) {
        case "11":
            return "Cao Bằng"
        case "12":
            return "Lạng Sơn"
        case "14":
            return "Quảng Ninh"
        
        case "15":
            return "Hải Phòng"
        case "16":
            return "Hải Phòng"
        case "17":
            return "Thái Bình"
        case "18":
            return "Nam Định"
        case "19":
            return "Phú Thọ"
        case "20":
            return "Thái Nguyên"
        case "21":
            return "Yên Bái"
        case "22":
            return "Tuyên Quang"
        case "23":
            return "Hà Giang"
        case "24":
            return "Lào Cai"
        case "25":
            return "Lai Châu"
        case "26":
            return "Sơn La"
        case "27":
            return "Điện Biên"
        case "28":
            return "Hòa Bình"
        case "29":
        case "30":
        case "31":
        case "32":
        case "33":
        case "40":
            return "Hà Nội"
        case "34":
            return "Hải Dương"
        case "35":
            return "Ninh Bình"
        case "36":
            return "Thanh Hóa"
        case "37":
            return "Nghệ An"
        case "38":
            return "Hà Tĩnh"
        case "43":
            return "Đà Nẵng"
        case "47":
            return "ĐắkLak"
        case "48":
            return "Đắc Nông"
        case "49":
            return "Lâm Đồng"
        case "50":
        case "51":
        case "52":
        case "53":
        case "54":
        case "55":
        case "56":
        case "57":
        case "58":
        case "59":
        case "41":
            return "Hồ Chí Minh"
        case "39":
        case "60":
            return "Đồng Nai"
        case "61":
            return "Hà Tĩnh"
        case "62":
            return "Long An"
        case "63":
            return "Tiền Giang"
        case "64":
            return "Vĩnh Long"
        case "65":
            return "Cần Thơ"
        case "66":
            return "Đồng Tháp"
        case "67":
            return "An Giang"
        case "68":
            return "Kiên Giang"
        case "69":
            return "Cà Mau"
        case "70":
            return "Tây Ninh"
        case "71":
            return "Bến Tre"
        case "72":
            return "Vũng Tàu"
        case "73":
            return "Quảng Bình"
        case "74":
            return "Quảng Trị"
        case "75":
            return "Huế"
        case "76":
            return "Quảng Ngãi"
        case "77":
            return "Bình Định"
        case "78":
            return "Phú Yên"
        case "79":
            return "Khánh Hòa"
        case "80":
            return "Cơ quan nhà nước"
        case "81":
            return "Gia Lai"
        case "82":
            return "Kon Tum"
        case "83":
            return "Sóc Trăng"
        case "84":
            return "Trà Vinh"
        case "85":
            return "Ninh Thuận"
        case "86":
            return "Bình Thuận"
        case "88":
            return "Vĩnh Phúc"
        case "89":
            return "Hưng Yên"
        case "90":
            return "Hà Nam"
        case "92":
            return "Quảng Nam"
        case "93":
            return "Bình Phước"
        case "94":
            return "Bạc Liêu"
        case "95":
            return "Hậu Giang"
        case "97":
            return "Bắc Cạn"
        case "98":
            return "Bắc Giang"
        case "99":
            return "Bắc Ninh"
        default:
            return "Invalid Plate Number"
    }
}
export default findCity;