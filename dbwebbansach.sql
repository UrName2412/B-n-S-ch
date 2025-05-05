CREATE DATABASE webbansach;

USE webbansach;

CREATE TABLE b01_nguoiDung
(
  tenNguoiDung VARCHAR(50) NOT NULL,
  matKhau VARCHAR(70) NOT NULL,
  soDienThoai VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  tinhThanh VARCHAR(50) NOT NULL,
  quanHuyen VARCHAR(50) NOT NULL,
  xa VARCHAR(50) NOT NULL,
  duong VARCHAR(50) NOT NULL,
  vaiTro BOOLEAN NOT NULL,
  trangThai BOOLEAN NOT NULL,
  PRIMARY KEY (tenNguoiDung)
);

CREATE TABLE b01_donHang
(
  maDon INT AUTO_INCREMENT NOT NULL,
  tenNguoiNhan VARCHAR(50) NOT NULL,
  soDienThoai VARCHAR(50) NOT NULL,
  ngayTao DATE NOT NULL,
  tinhThanh VARCHAR(50) NOT NULL,
  quanHuyen VARCHAR(50) NOT NULL,
  xa VARCHAR(50) NOT NULL,
  duong VARCHAR(50) NOT NULL,
  tongTien INT NOT NULL,
  tinhTrang VARCHAR(50) NOT NULL,
  ghiChu VARCHAR(200) NOT NULL,
  tenNguoiDung VARCHAR(50) NOT NULL,
  PRIMARY KEY (maDon),
  FOREIGN KEY (tenNguoiDung) REFERENCES b01_nguoiDung(tenNguoiDung)
);

CREATE TABLE b01_theLoai
(
  maTheLoai INT AUTO_INCREMENT NOT NULL,
  tenTheLoai VARCHAR(50) NOT NULL,
  PRIMARY KEY (maTheLoai)
);

CREATE TABLE b01_nhaXuatBan
(
  maNhaXuatBan INT AUTO_INCREMENT NOT NULL,
  tenNhaXuatBan VARCHAR(50) NOT NULL,
  PRIMARY KEY (maNhaXuatBan)
);

CREATE TABLE b01_sanPham
(
  maSach INT AUTO_INCREMENT NOT NULL,
  hinhAnh VARCHAR(50) NOT NULL,
  tenSach VARCHAR(50) NOT NULL,
  tacGia VARCHAR(50) NOT NULL,
  maTheLoai INT NOT NULL,
  maNhaXuatBan INT NOT NULL,
  giaBan INT NOT NULL,
  soTrang INT NOT NULL,
  moTa VARCHAR(8000) NOT NULL,
  trangThai BOOLEAN NOT NULL,
  daBan BOOLEAN NOT NULL,
  PRIMARY KEY (maSach),
  FOREIGN KEY (maNhaXuatBan) REFERENCES b01_nhaXuatBan(maNhaXuatBan),
  FOREIGN KEY (maTheLoai) REFERENCES b01_theLoai(maTheLoai)
);

CREATE TABLE b01_chiTietHoaDon
(
  maSach INT NOT NULL,
  maDon INT NOT NULL,
  giaBan INT NOT NULL,
  soLuong INT NOT NULL,
  PRIMARY KEY (maSach, maDon),
  FOREIGN KEY (maSach) REFERENCES b01_sanPham(maSach),
  FOREIGN KEY (maDon) REFERENCES b01_donHang(maDon)
);

INSERT INTO b01_nhaXuatBan (tenNhaXuatBan) VALUES
('Hội Nhà Văn'),
('Trẻ'),
('Nhã Nam'),
('Dân Trí'),
('Tổng hợp TPHCM'),
('Lao Động'),
('Thanh Niên'),
('Thế Giới'),
('Văn Học');

INSERT INTO b01_theLoai (tenTheLoai) VALUES
('Văn học'),
('Tiểu thuyết'),
('Truyện ngắn'),
('Thơ ca'),
('Khoa học viễn tưởng'),
('Kinh tế'),
('Chính trị - Xã hội'),
('Triết học'),
('Lịch sử'),
('Tâm lý học'),
('Tôn giáo - Tâm linh'),
('Khoa học - Công nghệ'),
('Giáo dục - Học tập'),
('Y học - Sức khỏe'),
('Thiếu nhi'),
('Truyện tranh'),
('Kỹ năng sống'),
('Hướng nghiệp'),
('Nghệ thuật'),
('Thể thao - Giải trí');

INSERT INTO b01_sanPham (hinhAnh, tenSach, tacGia, maTheLoai, maNhaXuatBan, giaBan, soTrang, moTa, trangThai, daBan) VALUES
('nhungngaythoau.jpg', 'Những Ngày Thơ Ấu', 'Nguyên Hồng', 1, 1, 89000, 250, 'Một tác phẩm văn học nổi tiếng về tuổi thơ.', 1, 0),
('demenphieuluuky.jpg', 'Dế Mèn Phiêu Lưu Ký', 'Tô Hoài', 15, 2, 75000, 190, 'Cuốn sách dành cho thiếu nhi với hình ảnh chú dế thông minh.', 1, 0),
('toithayhoavangtrencoxanh.jpg', 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh', 'Nguyễn Nhật Ánh', 1, 2, 105000, 300, 'Một câu chuyện cảm động về tuổi thơ.', 1, 0),
('sapiensluocsuloainguoi.jpg', 'Sapiens: Lược Sử Loài Người', 'Yuval Noah Harari', 9, 3, 220000, 450, 'Cuốn sách bàn về sự phát triển của loài người.', 1, 0),
('chientranhvahoabinh.jpg', 'Chiến Tranh Và Hòa Bình', 'Lev Tolstoy', 2, 4, 250000, 1200, 'Tác phẩm tiểu thuyết kinh điển về chiến tranh.', 1, 0),
('bimatcuanaoko.jpg', 'Bí Mật Của Naoko', 'Higashino Keigo', 2, 3, 130000, 350, 'Một câu chuyện đầy bí ẩn và cảm động.', 1, 0),
('thanthoaihylap.jpg', 'Thần Thoại Hy Lạp', 'Edith Hamilton', 9, 5, 180000, 500, 'Tổng hợp những câu chuyện thần thoại nổi tiếng.', 1, 0),
('tamlyhocdamdong.jpg', 'Tâm Lý Học Đám Đông', 'Gustave Le Bon', 10, 6, 95000, 210, 'Nghiên cứu về tâm lý của các nhóm người.', 1, 0),
('laptrinhpythoncoban.jpg', 'Lập Trình Python Cơ Bản', 'Nguyễn Văn A', 12, 7, 150000, 400, 'Cuốn sách hướng dẫn lập trình Python cho người mới.', 1, 0),
('dacnhantam.jpg', 'Đắc Nhân Tâm', 'Dale Carnegie', 17, 8, 99000, 300, 'Sách kỹ năng sống giúp bạn thành công.', 1, 0),
('truyenkieu.jpg', 'Truyện Kiều', 'Nguyễn Du', 1, 1, 86000, 325, 'Tác phẩm văn học nổi tiếng của Việt Nam.', 1, 0),
('biancuavutru.jpg', 'Bí Ẩn Của Vũ Trụ', 'Stephen Hawking', 12, 3, 320000, 450, 'Khám phá về vũ trụ và khoa học hiện đại.', 1, 0),
('bogia.jpg', 'Bố Già', 'Mario Puzo', 2, 4, 180000, 500, 'Tác phẩm kinh điển về thế giới mafia.', 1, 0),
('chipheo.jpg', 'Chí Phèo', 'Nam Cao', 3, 1, 75000, 120, 'Truyện ngắn phản ánh hiện thực xã hội.', 1, 0),
('nhagiakim1.jpg', 'Nhà Giả Kim', 'Paulo Coelho', 1, 2, 140000, 300, 'Cuốn sách triết lý về cuộc đời và số phận.', 1, 0),
('luocsuthoigian.jpg', 'Lược Sử Thời Gian', 'Stephen Hawking', 12, 3, 200000, 350, 'Giới thiệu về vật lý học và vũ trụ.', 1, 0),
('song24giomotngay.jpg', 'Sống 24 Giờ Một Ngày', 'Arnold Bennett', 17, 4, 86000, 210, 'Cuốn sách giúp bạn quản lý thời gian hiệu quả.', 1, 0),
('hanhtrinhvephuongdong.jpg', 'Hành Trình Về Phương Đông', 'Baird T. Spalding', 11, 8, 92000, 280, 'Khám phá tâm linh và những triết lý phương Đông.', 1, 0),
('doingandungngudai.jpg', 'Đời Ngắn Đừng Ngủ Dài', 'Robin Sharma', 17, 6, 125000, 270, 'Cuốn sách truyền cảm hứng để sống tốt hơn.', 1, 0),
('lamgiaukhongkho.jpg', 'Làm Giàu Không Khó', 'Napoleon Hill', 6, 5, 175000, 350, 'Cuốn sách hướng dẫn làm giàu từ tư duy.', 1, 0),
('bianvegiacmo.jpg', 'Bí Ẩn Về Giấc Mơ', 'Sigmund Freud', 10, 7, 195000, 400, 'Lý giải tâm lý học về giấc mơ và vô thức.', 1, 0),
('baythoiquenhieuqua.jpg', 'Bảy Thói Quen Hiệu Quả', 'Stephen R. Covey', 17, 2, 145000, 420, 'Sách kỹ năng sống giúp bạn thành công.', 1, 0),
('laptrinhjavascriptcoban.jpg', 'Lập Trình JavaScript Cơ Bản', 'Nguyễn Văn B', 12, 3, 135000, 350, 'Hướng dẫn lập trình JavaScript cơ bản.', 1, 0),
('vothuong.jpg', 'Vô Thường', 'Thích Nhất Hạnh', 11, 8, 87000, 250, 'Vô Thường (Tái Bản) VÔ THƯỜNG là góc nhìn đầy nhân văn của vị bác sĩ hàng ngày chứng kiến những mảnh đời chấp chới giữa hai bờ sinh tử. Con người ta sinh ra, bàn tay nắm chặt. Con người ta chết đi, hay tay buông thõng, được mất bại thành bỗng chốc hoá hư không. “Hy sinh vì người khác luôn cho hương thơm bay ngược chiều gió. Gánh nặng vì tình yêu luôn song hành cùng sức mạnh vô song. Bất cứ gỗ đá nào chạm phải tình yêu đều trở nên bao dung mềm mại. Tôi thấy lòng mình bỗng chật. Những gì trước đây tôi cho là đúng, bây giờ tôi đâm nghi ngờ. Những gì trước đây tôi luôn theo đuổi, giành giật để có, bây giờ thấy chẳng còn quan trọng nữa. Những tay thét ra lửa, những tay sừng sỏ mà tôi từng kính nể, bỗng dưng tôi thấy họ bình thường. Họ cố gắng dùng đôi bàntay chứng tỏ mình, khuếch trương mình, những cái họ có được chỉ là thứ trơ trẽn. Họ không bình yên trên vật chất họ có được. Họ khoác những chiếc áo sang trọng, tay đeo đầy những kim cương, xịt toàn nước hoa hảo hạng, nhưng không bao giờ có mùi hương thanh tao, dịu ngọt, toả lan khắp bầu trời. Tôi bị ám ảnh, vì trong tôi hoài thai một lối sống. Tôi muốn thoát khỏi bàn tay của chính mình. Tôi là người tìm kiếm bàn tay đẹp. Bàn tay biết dang ra, biết sẻ chia là bàn tay đẹp. Bàn tay biết nắm lấy tay người bất hạnh hơn mình để cùng bước là bàn tay đẹp. Bàn tay biết nâng niu, gìn giữ cái đẹp, cái chân, cái thiện, là bàn tay đẹp. Và hàng ngàn định nghĩa về bàn tay đẹp khác. Có bàn tay cầm nắm rất nhiều, có thể điều khiển người khác. Có bàn tay xoè ra ăn xin từng đồng lẻ bố thí. Có bàn tay khéo léo làm nên những tuyệt tác nghệ thuật. Có bàn tay vụng về chỉ làm đổ vỡ mọi thứ khi chạm vào. Có bàn tay cho đi. Có bàn tay giữ lại. Nhưng khi về với đất, bàn tay nào cũng rỗng. Rỗng tuyệt đối. Vậy sao không ướp hương cho đôi tay mình, tôi tự hỏi lòng như thế. Có hàng ngàn cách ướp hương, ướp hương thánh thiện, âm thầm, khiêm cung, bé nhỏ, mà hương thơm lại bay vượt mọi không gian. Khi sinh ra, tay tôi nắm chặt. Khi chết đi tay tôi buông thõng. Từ nắm chặt đến buông thõng, một hành trình dài đầy nụ cười hạnh phúc và nước mắt đau thương.”', 1, 0),
('thientaibentraikedienbenphai.jpg', 'Thiên Tài Bên Trái, Kẻ Điên Bên Phải', 'Ngô Thừa Ân', 10, 6, 125000, 380, 'Tâm lý học về những bộ não thiên tài.', 1, 0),
('damnghilon.jpg', 'Dám Nghĩ Lớn', 'David J. Schwartz', 17, 5, 135000, 320, 'Cuốn sách truyền cảm hứng mạnh mẽ để vươn xa.', 1, 0),
('conduonghoigiao.jpg', 'Con Đường Hồi Giáo', 'Nguyễn Phương Mai', 11, 3, 115000, 280, 'Tìm hiểu về Hồi giáo và văn hóa Trung Đông.', 1, 0),
('kheoannoisecoduocthienha.jpg', 'Khéo Ăn Nói Sẽ Có Được Thiên Hạ', 'Trác Nhã', 17, 7, 89000, 250, 'Hướng dẫn giao tiếp hiệu quả và thuyết phục.', 1, 0),
('biquyettaytrangthanhtrieuphu.jpg', 'Bí Quyết Tay Trắng Thành Triệu Phú', 'Adam Khoo', 6, 6, 190000, 370, 'Cuốn sách chia sẻ cách làm giàu từ con số 0.', 1, 0),
('nguoigiauconhatthanhbabylon.jpg', 'Người Giàu Có Nhất Thành Babylon', 'George S. Clason', 6, 4, 98000, 300, 'Cẩm nang tài chính giúp bạn quản lý tiền bạc.', 1, 0),
('thientaivasugiaoductusom.jpg', 'Thiên Tài Và Sự Giáo Dục Từ Sớm', 'Glenn Doman', 13, 2, 140000, 400, 'Phương pháp giáo dục sớm cho trẻ.', 1, 0),
('caphecungtony.jpg', 'Cà Phê Cùng Tony', 'Tony Buổi Sáng', 18, 8, 105000, 320, 'Cuốn sách truyền cảm hứng cho giới trẻ.', 1, 0),
('muonkiepnhansinh.jpg', 'Muôn Kiếp Nhân Sinh', 'Nguyên Phong', 11, 3, 150000, 360, 'Sách tâm linh về nhân quả và luân hồi.', 1, 0),
('tuduynhanhvacham.jpg', 'Tư Duy Nhanh Và Chậm', 'Daniel Kahneman', 10, 5, 220000, 500, 'Lý giải cách con người suy nghĩ và ra quyết định.', 1, 0),
('nhungbaihoccuocsong.jpg', 'Những Bài Học Cuộc Sống', 'Hal Urban', 17, 6, 97000, 300, 'Những bài học quý giá giúp bạn sống tốt hơn.', 1, 0),
('lamchugiongnoi.jpg', 'Làm Chủ Giọng Nói', 'Roger Love', 17, 7, 95000, 220, 'Bí quyết sử dụng giọng nói để thành công.', 1, 0),
('philytri.jpg', 'Phi Lý Trí', 'Dan Ariely', 10, 2, 135000, 380, 'Khám phá hành vi phi lý trí của con người.', 1, 0),
('trenduongbang.jpg', 'Trên Đường Băng', 'Tony Buổi Sáng', 18, 8, 108000, 320, 'Sách truyền cảm hứng giúp bạn vươn xa.', 1, 0),
('luathapdan.jpg', 'Luật Hấp Dẫn', 'Rhonda Byrne', 17, 5, 145000, 400, 'Cẩm nang giúp bạn thu hút thành công.', 1, 0),
('chienluocdaiduongxanh.jpg', 'Chiến Lược Đại Dương Xanh', 'W. Chan Kim', 6, 4, 175000, 420, 'Bí quyết tạo nên thị trường không cạnh tranh.', 1, 0),
('lambanvoihinhbong.jpg', 'Làm Bạn Với Hình Bóng', 'Osho', 11, 3, 99000, 310, 'Sách tâm linh giúp bạn hiểu rõ bản thân.', 1, 0),
('baybuoctoimuahe.jpg', 'Bảy Bước Tới Mùa Hè', 'Nguyễn Nhật Ánh', 15, 2, 98000, 280, 'Câu chuyện tuổi thơ đầy kỷ niệm.', 1, 0),
('nhagiakim.jpg', 'Nhà Giả Kim', 'Paulo Coelho', 1, 3, 140000, 300, 'Cuốn sách triết lý về cuộc đời và số phận.', 1, 0),
('thegioiphang.jpg', 'Thế Giới Phẳng', 'Thomas L. Friedman', 6, 7, 170000, 450, 'Cuốn sách về toàn cầu hóa và kinh tế.', 1, 0),
('chunghiakhacky.jpg', 'Chủ Nghĩa Khắc Kỷ', 'Ryan Holiday', 10, 4, 125000, 350, 'Triết lý sống giúp bạn mạnh mẽ hơn.', 1, 0),
('thienngaden.jpg', 'Thiên Nga Đen', 'Nassim Nicholas Taleb', 6, 6, 230000, 490, 'Cuốn sách về những sự kiện bất ngờ.', 1, 0),
('cuocsongkhonggioihan.jpg', 'Cuộc Sống Không Giới Hạn', 'Nick Vujicic', 17, 8, 99000, 320, 'Câu chuyện truyền cảm hứng từ Nick Vujicic.', 1, 0),
('khongbaogiolathatbaitatcalathuthach.jpg', 'Không Bao Giờ Là Thất Bại, Tất Cả Là Thử Thách', 'Chung Ju Yung', 6, 5, 145000, 400, 'Hành trình xây dựng Hyundai.', 1, 0),
('21baihoctheky21.jpg', '21 Bài Học Cho Thế Kỷ 21', 'Yuval Noah Harari', 10, 3, 210000, 450, 'Những thách thức và cơ hội trong thế kỷ 21.', 1, 0),
('bonaokechuyen.jpg', 'Bộ Não Kể Chuyện', 'Lisa Cron', 10, 7, 145000, 350, 'Tại sao con người bị hấp dẫn bởi câu chuyện.', 1, 0),
('doanhnghieptheky21.jpg', 'Doanh Nghiệp Của Thế Kỷ 21', 'Robert T.Kiyosaki', 6, 2, 85000, 260, 'Doanh Nghiệp Thế Kỷ 21 của Robert T. Kiyosaki là cuốn sách giúp khai sáng tư duy cho những ai muốn khởi nghiệp và làm giàu. Trong tác phẩm này, Kiyosaki giải thích lý do vì sao chúng ta nên tạo dựng doanh nghiệp của riêng mình, từ việc thay đổi mô hình kinh doanh, tư duy làm giàu đúng đắn đến cách tìm kiếm phương tiện xây dựng doanh nghiệp phù hợp. Cuốn sách cũng chia sẻ cách phát triển doanh nghiệp và bản thân, với những lời khuyên bổ ích về MLM và Network Marketing. Bất cứ ai cũng có thể áp dụng thành công mà không cần tài năng thiên bẩm.', 1, 0),
('loithutoimoicuasatthukinhte.jpg', 'Lời Thú Tội Mới Của Một Sát Thủ Kinh Tế', 'John Perkins', 6, 4, 172000, 516, 'Lời Thú Tội Mới Của Một Sát Thủ Kinh Tế là tự truyện của John Perkins, một cựu sát thủ kinh tế người Mỹ. Với nhiệm vụ lừa đảo các quốc gia hàng tỷ USD, ông đã từng là công cụ đắc lực của các tập đoàn lớn. Cuốn sách này lần đầu ra mắt tại Việt Nam năm 2006 và đã nằm trong danh sách bán chạy của Thời báo New York hơn 70 tuần, được dịch ra hơn 32 ngôn ngữ. John Perkins chia sẻ câu chuyện chuyển mình từ một người trung thành với hệ thống trở thành người bảo vệ cho quyền lợi của những người bị áp bức. Được tuyển dụng bí mật bởi Cơ quan An ninh quốc gia Mỹ, ông đã thực hiện các chính sách phục vụ lợi ích của chủ nghĩa tập đoàn Mỹ ở nhiều quốc gia chiến lược. Cuốn sách này vạch trần các âm mưu quốc tế, những vụ tham nhũng và các hoạt động của các tập đoàn lớn, đang gây hậu quả nghiêm trọng cho xã hội hiện đại.', 1, 0),
('tutotdenvidai.jpg', 'Từ Tốt Đến Vĩ Đại', 'Jim Collins', 6, 2, 95000, 484, 'Từ Tốt Đến Vĩ Đại của Jim Collins là một tác phẩm kinh điển trong quản trị doanh nghiệp, được xếp hạng trong số 20 cuốn sách có ảnh hưởng nhất thế giới về quản trị trong hai thập kỷ qua theo đánh giá của Tạp chí Forbes. Cuốn sách cung cấp một mô hình chuyển đổi để nâng cấp một công ty từ mức bình thường hay tốt lên tầm vĩ đại. Jim Collins và nhóm nghiên cứu của ông đã xem xét 1.435 công ty, tìm ra những công ty đã cải thiện đáng kể hiệu suất theo thời gian. Họ phát hiện ra những yếu tố chung, thách thức nhiều quan niệm thông thường về thành công. Quá trình chuyển đổi từ tốt đến vĩ đại không cần giám đốc điều hành nổi tiếng, công nghệ mới, hay chiến lược kinh doanh phức tạp. Thay vào đó, các công ty vĩ đại tập trung vào một nền văn hóa doanh nghiệp mạnh mẽ, thúc đẩy kỷ luật trong suy nghĩ và hành động. Cuốn sách cũng cung cấp một lộ trình rõ ràng để đạt được sự xuất sắc mà mọi tổ chức đều có thể tham khảo. Đọc Từ Tốt Đến Vĩ Đại sẽ chỉ cho bạn cách biến một công ty từ bình thường thành vĩ đại thông qua kỷ luật và sự đột phá. Các nhà quản lý và giám đốc điều hành sẽ thấy đây là một cuốn sách không thể thiếu và sẽ đọc đi đọc lại nhiều lần.', 1, 0),
('onggiavabienca.jpg', 'Ông Già Và Biển Cả', 'Ernest Hemingway', 1, 9, 40000, 133, 'Tác phẩm này được viết theo thể loại truyện viễn tưởng và được nhiều người đọc biết đến với nguyên lý “tảng băng trôi” với lý thuyết là một phần nổi - bảy phần chìm. Câu chuyện xoay quanh về cuộc đối đầu không cân sức giữa ông lão đánh cá và con cá hung dữ giữa biển khơi. Ernest Hemingway được biết đến là tiểu thuyết gia người Mỹ, một nhà báo và là nhà viết truyện ngắn. Sau nhiều cống hiến đến ngành văn học thế giới, Hemingway đã cho ra rất nhiều các tác phẩm nổi tiếng để lại tiếng vang trong suốt thời gian dài như Giã từ vũ khí, Chuông nguyện hồn ai và trong số đó nổi tiếng hơn cả là Ông già và biển cả, với giải Nobel văn học 1954. Ông già và biển cả là tác phẩm mang giá trị tri thức vượt thời gian, bên cạnh những triết lý sâu sắc trong câu chuyện mà phải đọc để cảm nhận được hết, quyển sách còn cho thấy được những nỗ lực phi thường của con người trước thiên nhiên qua hình ảnh ông lão đánh cá và con cá hung tợn.', 1, 0),
('hoangtube.jpg', 'Hoàng Tử Bé', 'Antoine De Saint-Exupery', 1, 1, 45000, 102, 'Antoine de Saint-Exupéry 29 tháng 6, 1900, tại Lyon, Pháp, ông là một nhà văn và phi công nổi tiếng đương thời. Qua nhiều cống hiến cho nền văn học thế giới, Antoine de Saint-Exupéry đã có cho mình nhiều giải thưởng danh giá như Giải thưởng lớn cho Tiểu thuyết của Viện Hàn Lâm Pháp, Giải thưởng Sách quốc gia Mỹ cho thể loại Phi hư cấu,... Khi đọc quyển sách này bạn sẽ có được những phút giây thư giãn vô cùng, sách được viết theo cốt truyện đơn giản, đáng yêu, nhẹ nhàng. Nhưng qua đó bạn cũng sẽ có những phút giây chiêm nghiệm những thông điệp sâu sắc mà tác giả muốn gửi gắm.', 1, 0),
('sodo.jpg', 'Số Đỏ', 'Vũ Trọng Phụng', 1, 9, 55000, 256, 'Số đỏ là tác phẩm văn học đình đám của Việt Nam mà bạn không nên bỏ qua, tác phẩm truyện dài 20 chương xoay quanh nhân vật Xuân tóc đỏ với rất nhiều tình huống may mắn giúp hắn được gia nhập vào xã hội thượng lưu lúc bấy giờ.', 1, 0),
('donquiote.jpg', 'Don Quixote', 'Miguel De Cervantes', 1, 9, 135000, 564, 'Nội dung của tác phẩm lấy bối cảnh về xã hội Tây Ban Nha với rất nhiều con người thuộc nhiều tầng lớp khác nhau trong xã hội. Thế nhưng những nhân vật trong câu chuyện này dù là ai, xuất thân từ đâu hay làm công việc gì cũng đều hướng đến việc phục tùng và nghe lời của nhân vật chính trong tác phẩm này đó là Don Quixote - một quý tộc giàu có và ông giám mã.', 1, 0),
('battredongxanh.jpg', 'Bắt Trẻ Đồng Xanh', 'J. D. Salinger', 1, 9, 69000, 360, 'Tác phẩm kể lại câu chuyện của nhân vật chính, Holden Caulfield, trong những ngày cậu ở thành phố New York sau khi bị đuổi học khỏi trường dự bị đại học Pencey Prep. Holden không thích cái gì cả, cậu chỉ muốn đứng trên mép vực của một cánh đồng bao la, để trông chừng lũ trẻ con đang chơi đùa. Holden chán ghét mọi thứ, cậu lan man, lảm nhảm hàng giờ về những thói hư, tật xấu, những trò giả dối tầm thường mà người đời đang diễn cho nhau xem.', 1, 0);