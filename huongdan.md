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

Frontend là giao diện web mà bạn sẽ tương tác.

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
2.  Mở trình duyệt và truy cập vào URL mà `live-server` đã cung cấp.
3.  Dán một liên kết video Bilibili vào ô nhập liệu và nhấp vào nút "Download".

Ứng dụng sẽ gửi yêu cầu đến backend của bạn, backend sẽ lấy thông tin video và trả về cho frontend để hiển thị.
