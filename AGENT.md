# AGENT.md

This file provides guidance to Agent Code when working with code in this repository.

## Tổng quan dự án

Trang profile cá nhân dành cho lập trình viên PHUC TRAN (`phuctran1501`, GitHub: https://github.com/phuctran1501). Mọi nội dung (giới thiệu, kỹ năng, dự án `NewsHub`, `CTU-Scheduler`, `SmartHire`, `Nimdora`, liên hệ) sử dụng thông tin thật từ chủ dự án.

## Tech Stack

- **Vite + React 19 + TypeScript (Strict)**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Motion (`motion/react`)** cho physics transitions và Filmstrip overview
- **Lucide React** (`strokeWidth={1.5}`), **cmdk** (`Ctrl+K` / `⌘K`), **Sonner** (notifications)
- **WebGL / HTML5 Canvas** cho đồ họa tương tác thuần Trắng–Đen

## Quy tắc thiết kế ("MONOLITH" Borderless Exhibition)

- **Kiến trúc trình diễn toàn khung hình:** Không cuộn dọc trang truyền thống; chuyển cảnh 3D giữa 5 Chương (`MONOLITH`, `WORKS`, `SIGNAL`, `ALGORITHMS`, `FINALE`) bằng kéo ngang, cuộn chuột, phím `←`/`→` và chế độ `Filmstrip (G)`.
- **100% Trắng & Đen thuần khiết (Mặc định Light Mode):** Chỉ sử dụng thang xám trung tính (`#ffffff` nền, `#000000` mực in) kèm nút đảo cực (`Invert`). Tuyệt đối không dùng màu sắc khác, không glassmorphism, không đổ bóng dày, không AI slop, không emoji.
- **Không đường viền bọc item (Zero Item Borders):** Không đóng khung viền quanh dự án, nút hay thẻ thông số; phân cấp bằng kích thước typography, khoảng trắng âm (negative space) và đảo cực Đen/Trắng.
- **Responsive:** Hoạt động mượt mà trên Desktop và Mobile.

## Quy tắc bắt buộc

- Song ngữ **Việt / Anh** hoàn chỉnh (`src/i18n/vi.ts` và `src/i18n/en.ts`, kiểm tra đầy đủ key bằng TypeScript `Record<TranslationKey, string>`).

## Workflow kiểm tra

Sau khi chỉnh sửa, luôn chạy:

1. `npm run typecheck`
2. `npm run build`
3. Kiểm tra hiển thị Light Mode thuần Trắng/Đen, responsive Desktop/Mobile và cả hai ngôn ngữ VI/EN.
