# Hướng dẫn Cài đặt và Chạy Bilibili Video Downloader

Ứng dụng này bao gồm hai phần chính:
1.  **Backend**: Một máy chủ Python sử dụng `Flask` và `yt-dlp` để lấy thông tin video thực tế từ Bilibili.
2.  **Frontend**: Giao diện người dùng được xây dựng bằng `React` và `Tailwind CSS` để tương tác với backend.

Bạn cần chạy cả hai phần này cùng lúc để ứng dụng hoạt động đầy đủ.

---

## Yêu cầu
Trước khi bắt đầu, hãy đảm bảo bạn đã cài đặt một trong các môi trường sau:
-   [Python](https://www.python.org/downloads/) (phiên bản 3.7 trở lên)
-   [Anaconda hoặc Miniconda](https://docs.conda.io/projects/miniconda/en/latest/) (để sử dụng `conda`)
-   [Node.js](https://nodejs.org/) và `npm` (Node.js thường đi kèm với npm)

---

## Bước 1: Cài đặt và Chạy Backend (Máy chủ Python)

Backend chịu trách nhiệm xử lý logic và lấy dữ liệu từ Bilibili.

1.  **Đổi tên tệp server**:
    Trong thư mục dự án, đổi tên tệp `server.txt` thành `server.py`.

2.  **Mở Terminal hoặc Command Prompt**:
    Điều hướng đến thư mục gốc của dự án bằng terminal của bạn.
    ```bash
    cd /đường/dẫn/đến/thư/mục/dự án
    ```

3.  **Thiết lập Môi trường Python (Chọn một trong hai cách)**:

    ---
    ### Lựa chọn A: Sử dụng `venv` (Môi trường ảo mặc định của Python)

    1.  **Tạo môi trường ảo**:
        ```bash
        python -m venv venv
        ```
    2.  **Kích hoạt môi trường ảo**:
        -   Trên **Windows**: `.\venv\Scripts\activate`
        -   Trên **macOS/Linux**: `source venv/bin/activate`

    3.  **Cài đặt các gói cần thiết**:
        ```bash
        pip install Flask flask_cors yt-dlp humanize
        ```
    ---
    ### Lựa chọn B: Sử dụng `conda` (Anaconda/Miniconda)

    1.  **Tạo môi trường conda mới**:
        *Tạo một môi trường tên là `bilidownloader` với Python 3.9. Bạn có thể thay đổi tên và phiên bản nếu muốn.*
        ```bash
        conda create -n bilidownloader python=3.9 -y
        ```
    2.  **Kích hoạt môi trường conda**:
        ```bash
        conda activate bilidownloader
        ```
    3.  **Cài đặt các gói cần thiết**:
        *Sau khi kích hoạt, bạn có thể dùng `pip` để cài đặt các gói vào môi trường conda hiện tại.*
        ```bash
        pip install Flask flask_cors yt-dlp humanize
        ```
    ---

4.  **Khởi động máy chủ Backend**:
    Sau khi môi trường của bạn được kích hoạt và các gói đã được cài đặt (dù bằng `venv` hay `conda`), hãy khởi động máy chủ bằng lệnh:
    ```bash
    python server.py
    ```

    Nếu thành công, bạn sẽ thấy thông báo cho biết máy chủ đang chạy tại `http://127.0.0.1:5000`.
    **Hãy giữ cho terminal này chạy**.

---

## Bước 2: Chạy Frontend (Giao diện React)
Khuyến nghị nên sài:

    Trong terminal
    ```bash
        npm run dev
    ```

Frontend là giao diện web mà bạn sẽ tương tác.(không nên)

    1.  **Mở một Terminal MỚI**:
        **Không đóng terminal đang chạy backend**. Hãy mở một cửa sổ terminal thứ hai và cũng điều hướng đến thư mục gốc của dự án.

    2.  **Cài đặt `live-server`**:
        `live-server` là một máy chủ phát triển cục bộ đơn giản với tính năng tự động tải lại. Cài đặt nó trên toàn cục bằng `npm`.
        ```bash
        npm install -g live-server
        ```
        *Lưu ý: Trên macOS/Linux, bạn có thể cần thêm `sudo` ở đầu lệnh: `sudo npm install -g live-server`.*

    3.  **Khởi động máy chủ Frontend**:
        Trong terminal thứ hai này, chạy lệnh:
        ```bash
        live-server
        ```

        Lệnh này sẽ tự động mở một tab mới trong trình duyệt của bạn với địa chỉ `http://127.0.0.1:8080` (hoặc một cổng khác nếu 8080 đã được sử dụng).

    ---

## Bước 3: Sử dụng Ứng dụng

Bây giờ bạn đã sẵn sàng!
1.  Đảm bảo cả hai terminal (backend và frontend) đều đang chạy.
2.  Mở trình duyệt và truy cập vào URL có trên terminal cung cấp.
3.  Dán một liên kết video Bilibili vào ô nhập liệu và nhấp vào nút "Download".
* nên dùng liên kết dạng: https://www.bilibili.com/video/BV1kegUzSENu/?spm_id_from=333.1007.tianma.1-3-3.click&vd_source=53071f7a4c375c492eee1237962a7b1b
### hoặc ###
https://www.bilibili.com/video/BV14wuzzoEPb/?share_source=copy_web&vd_source=0184d1297ad1a4a3a36b75b6792b4c73

Ứng dụng sẽ gửi yêu cầu đến backend của bạn, backend sẽ lấy thông tin video và trả về cho frontend để hiển thị.

---

## Khắc phục sự cố (Troubleshooting)

### Lỗi "Access Denied", "HTTP Error 403", hoặc lỗi từ "edgesuite.net"

**Vấn đề**: Bạn nhận được một thông báo lỗi cho biết quyền truy cập bị từ chối hoặc một trang lỗi từ `edgesuite.net` (giống như Reference #132...). Điều này xảy ra vì Bilibili đã phát hiện và chặn yêu cầu từ máy chủ của bạn, vì nó trông giống như một yêu cầu tự động (bot).

**Giải pháp**: Cách hiệu quả nhất để giải quyết vấn đề này là sử dụng cookies từ trình duyệt của bạn để làm cho yêu cầu trông giống như một người dùng thực sự.

**Các bước thực hiện:**

1.  **Cài đặt Tiện ích Mở rộng cho Trình duyệt**:
    *   **Chrome**: Cài đặt tiện ích [Get cookies.txt LOCALLY](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelhbbjliilanildpfoflhodmceblm).
    *   **Firefox**: Cài đặt tiện ích [Get cookies.txt LOCALLY](https://addons.mozilla.org/en-US/firefox/addon/get-cookies-txt-locally/).

2.  **Truy cập Bilibili**:
    Mở một tab mới và truy cập vào trang chủ `https://www.bilibili.com`. Bạn không cần phải đăng nhập, chỉ cần truy cập trang là đủ để có được cookies cơ bản.

3.  **Xuất Cookies**:
    *   Nhấp vào biểu tượng của tiện ích `Get cookies.txt LOCALLY` trên thanh công cụ của trình duyệt.
    *   Một cửa sổ mới sẽ hiện ra với nội dung cookies. Nhấp vào nút **"Export"** hoặc **"Export as .txt"**.

4.  **Lưu Tệp Cookies**:
    *   Lưu tệp được tải về với tên chính xác là `cookies.txt`.
    *   **Quan trọng**: Đặt tệp `cookies.txt` này vào **cùng một thư mục** với tệp `server.py` của bạn.

5.  **Khởi động lại Máy chủ Backend**:
    *   Quay trở lại terminal đang chạy máy chủ Python.
    *   Dừng máy chủ bằng cách nhấn `Ctrl + C`.
    *   Khởi động lại máy chủ bằng lệnh: `python server.py`.

Bây giờ, máy chủ sẽ tự động sử dụng tệp `cookies.txt` cho mỗi yêu cầu, giúp vượt qua các biện pháp bảo vệ của Bilibili. Bạn không cần phải thay đổi gì ở phía frontend.
