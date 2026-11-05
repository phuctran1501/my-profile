# AGENT.md

This file provides guidance to Agent Code when working with code in this repository.

## Tổng quan dự án

Trang profile cá nhân dành cho lập trình viên. Đây là trang giới thiệu bản thân của chủ dự án (GitHub: https://github.com/phuctran1501), nên nội dung (giới thiệu, kỹ năng, dự án, liên hệ) lấy từ thông tin thật trên GitHub đó.

## Tech Stack

- HTML, CSS, JavaScript (thuần)
- Tailwind CSS
- Framer animation (dùng cho hiệu ứng chuyển động), CSS thuần

## Quy tắc thiết kế

- Phong cách: mượt mà, ấn tượng nhưng hiện đại và tinh tế. Không làm rối mắt hiệu ứng.
- Không đổ bóng quá nhiều, không hiệu ứng glass, không giao diện Cyber, không bị AI slop, không gập khuông theo chuẩn thiết kế của AI.
- Thêm hiệu ứng đã mắt và sáng tạo, có thể đề xuất
- Luôn responsive, hiển thị tốt trên laptop và mobile, và tương thích nhiều trình duyệt.

## Quy tắc bắt buộc

- Bảng màu tôi ưu tiên là màu tối.
- Hỗ trợ 2 ngôn ngữ: **Anh, Việt** (nút EN / VI ). Mọi văn bản hiển thị trên giao diện phải có đủ hai phiên bản (thêm vào `js/i18n.js`), không hard-code một ngôn ngữ.

## Workflow

Sau khi code xong, luôn kiểm tra giao diện hiện tại:

1. Hiệu ứng đủ bắt mắt sáng tạo không, web có bị chậm không.
2. Có lỗi font không.
3. Có lỗi animation không.
4. Kiểm tra responsive trên laptop và mobile, cùng cả hai ngôn ngữ Anh/Việt

Note: có thể tìm kiếm thêm tham khảo
