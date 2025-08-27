// URL Google Apps Script của bạn
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxgjamFzIktRdQ_sgG1XxFrLJYg3mMCb7xmwfjgf35zgLU0L5MVZcPLz2u318SKrtB7Qg/exec";
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const result = document.getElementById("result");
  const showListBtn = document.getElementById("showListBtn");
  const listSection = document.getElementById("listSection");
  const registerList = document.getElementById("registerList");
  const roleSelect = document.getElementById("roleSelect");
  const studentFields = document.getElementById("studentFields");
  roleSelect.addEventListener("change", () => {
    studentFields.style.display = roleSelect.value === "sinhvien" ? "block" : "none";
  });
  function validateForm() {
    let isValid = true;
    let messages = [];
    form.querySelectorAll("input, select").forEach(el => el.classList.remove("error"));
    const name = document.getElementById("name");
    if (name.value.trim().length < 10) {
      isValid = false;
      messages.push("Tên Thánh - Họ và Tên phải ít nhất 10 ký tự");
      name.classList.add("error");
    }
    const birthday = document.getElementById("birthday");
    if (!birthday.value) {
      isValid = false;
      messages.push("Vui lòng nhập ngày sinh");
      birthday.classList.add("error");
    }
    const address = document.getElementById("address");
    if (address.value.trim().length < 20) {
      isValid = false;
      messages.push("Chỗ ở hiện tại phải ít nhất 20 ký tự");
      address.classList.add("error");
    }
    const hometown = document.getElementById("hometown");
    if (hometown.value.trim().length < 20) {
      isValid = false;
      messages.push("Quê quán phải ít nhất 20 ký tự");
      hometown.classList.add("error");
    }
    const phone = document.getElementById("phone");
    if (!/^[0-9]{9,10}$/.test(phone.value)) {
      isValid = false;
      messages.push("Số điện thoại chỉ chứa số (9-10 chữ số)");
      phone.classList.add("error");
    }
    if (roleSelect.value === "sinhvien") {
      const namthu = document.getElementById("namthu");
      const truong = document.getElementById("truong");
      if (!namthu.value) {
        isValid = false;
        messages.push("Vui lòng nhập năm học");
        namthu.classList.add("error");
      }
      if (truong.value.trim().length < 10) {
        isValid = false;
        messages.push("Tên trường phải ít nhất 10 ký tự");
        truong.classList.add("error");
      }
    }
    if (!isValid) {
      result.innerHTML = `<p class="error-msg">⚠️ ${messages.join("<br>")}</p>`;
    }
    return isValid;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData(form);
    result.innerHTML = "<p class='loading'>⏳ Đang gửi dữ liệu...</p>";
    fetch(SCRIPT_URL, { method: "POST", body: formData })
      .then(res => res.text())
      .then(text => {
        if (text.includes("SUCCESS")) {
          result.innerHTML = "<p class='success'>✅ Đăng ký thành công!</p>";
          form.reset();
          studentFields.style.display = "none";
        } else {
          throw new Error(text);
        }
      })
      .catch(err => {
        result.innerHTML = "<p class='error-msg'>❌ Lỗi: " + err.message + "</p>";
      });
  });
  showListBtn.addEventListener("click", function () {
    if (listSection.style.display === "none") {
      registerList.innerHTML = "<p class='loading'>⏳ Đang tải danh sách...</p>";
      fetch(SCRIPT_URL + "?action=get")
        .then(res => res.json())
        .then(data => {
          if (!Array.isArray(data) || data.length === 0) {
            registerList.innerHTML = "<p>📭 Chưa có ai đăng ký</p>";
            return;
          }
          let html = "<table><tr><th>STT</th><th>Họ tên</th><th>Ngày sinh</th><th>Quê quán</th></tr>";
          data.forEach((row, index) => {
            const name = row.name || row["Họ tên"] || "";
            const birthdayRaw = row.birthday || row["Ngày sinh"] || "";
            const hometown = row.hometown || row["Quê quán"] || "";
            let birthday = birthdayRaw;
            if (birthdayRaw && !birthdayRaw.includes("/")) {
              const d = new Date(birthdayRaw);
              if (!isNaN(d)) {
                const day = String(d.getDate()).padStart(2, "0");
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const year = d.getFullYear();
                birthday = `${day}/${month}/${year}`;
              }
            }
            html += `<tr>
              <td>${index + 1}</td>
              <td>${name}</td>
              <td>${birthday}</td>
              <td>${hometown}</td>
            </tr>`;
          });
          html += "</table>";
          registerList.innerHTML = html;
        })
        .catch(err => {
          registerList.innerHTML = "<p class='error-msg'>❌ Lỗi khi tải danh sách: " + err.message + "</p>";
        });
      listSection.style.display = "block";
      showListBtn.textContent = "🔒 Ẩn danh sách";
    } else {
      listSection.style.display = "none";
      showListBtn.textContent = "📋 Xem danh sách";
    }
  });
});
