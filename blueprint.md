# Blueprint: Trang Chào Mừng Động

## Tổng quan

Dự án này sẽ tạo ra một trang chào mừng (splash screen) hấp dẫn và hiện đại. Trang này sẽ hiển thị một thông điệp chào mừng trong 3 giây, sau đó tự động chuyển hướng người dùng đến một trang web bên ngoài.

## Thiết kế và Tính năng

- **Thiết kế hiện đại:** Giao diện sạch sẽ, tối giản với hiệu ứng động tinh tế.
- **Bố cục:** Nội dung được căn giữa hoàn hảo trên màn hình.
- **Thông điệp:** Một thông điệp chào mừng thân thiện và chuyên nghiệp.
- **Chuyển hướng tự động:** Tự động chuyển đến trang `https://svcgpc.pages.dev/` sau 3 giây.
- **Responsive:** Hoạt động tốt trên cả thiết bị di động và máy tính để bàn.

## Kế hoạch triển khai

1.  **Tạo Component:** Xây dựng một component React mới có tên `SplashScreen.jsx` để chứa giao diện và logic của trang chào mừng.
2.  **Thiết kế giao diện (CSS):** Tạo tệp `SplashScreen.css` để định hình phong cách cho component, bao gồm hiệu ứng động và bố cục.
3.  **Cập nhật Global Styles:** Chỉnh sửa `index.css` để thêm một phông chữ hiện đại (Poppins) và một màu nền tinh tế cho toàn bộ ứng dụng.
4.  **Tích hợp:** Cập nhật tệp `App.jsx` để hiển thị `SplashScreen` làm thành phần chính.
5.  **Triển khai Logic:** Thêm logic vào `SplashScreen.jsx` sử dụng `useEffect` và `setTimeout` để xử lý việc chuyển hướng sau 3 giây.
