
document.addEventListener('DOMContentLoaded', () => {
    // --- CACHED DOM ELEMENTS ---
    const registerForm = document.getElementById('register-form');
    const studentInfoSection = document.getElementById('student-info');
    const submitBtn = document.querySelector('.submit-btn');
    const formStatus = document.getElementById('form-status');
    
    const listToggleButton = document.getElementById('list-toggle-btn');
    const memberListContainer = document.getElementById('member-list-container');

    // --- CONFIG ---
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwaTZoEY0GfiB6Q_prHkH7HMAxD_YSqeA2cHZBfWbYrtLRut6-d-qzb1paSpW9xFSUY/exec';

    // --- FUNCTIONS ---

    const formatDate = (dateString) => {
        if (!dateString || !dateString.includes('-')) {
            return dateString || 'N/A';
        }
        try {
            const datePart = dateString.split('T')[0];
            const [year, month, day] = datePart.split('-');
            return `${day}/${month}/${year}`;
        } catch (error) {
            console.error("Could not format date:", dateString, error);
            return dateString; 
        }
    };

    const showStatusMessage = (message, isError = false) => {
        formStatus.textContent = message;
        formStatus.className = 'form-status-message';
        formStatus.classList.add(isError ? 'error' : 'success', 'visible');
        setTimeout(() => formStatus.classList.remove('visible'), 5000);
    };

    const toggleStudentInfo = () => {
        const selectedType = registerForm.querySelector('input[name="user-type"]:checked')?.value;
        studentInfoSection.classList.toggle('hidden', selectedType !== 'student');
    };

    const fetchAndDisplayList = async () => {
        memberListContainer.innerHTML = '<div class="loading-spinner"></div><p class="list-status-message">Đang tải danh sách...</p>';
        memberListContainer.classList.remove('hidden');
        listToggleButton.textContent = 'Đang tải...';
        listToggleButton.disabled = true;

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL);
            const result = await response.json();
            if (result.status === 'success') {
                renderMemberList(result.data);
            } else {
                memberListContainer.innerHTML = `<p class="list-status-message error">Không thể tải danh sách. Lỗi: ${result.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching member list:', error);
            memberListContainer.innerHTML = '<p class="list-status-message error">Đã có lỗi xảy ra khi kết nối.</p>';
        } finally {
            listToggleButton.textContent = 'Ẩn Danh Sách';
            listToggleButton.disabled = false;
        }
    };

    /**
     * Renders the list of members into a table, wrapped in a div for scrolling.
     * @param {Array} members The array of member objects.
     */
    const renderMemberList = (members) => {
        if (!members || members.length === 0) {
            memberListContainer.innerHTML = '<p class="list-status-message">Chưa có ai đăng ký.</p>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'member-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Tên Thánh & Họ Tên</th>
                    <th>Ngày Sinh</th>
                    <th>Quê Quán</th>
                    <th>Đối Tượng</th>
                </tr>
            </thead>
            <tbody>
                ${members.map(member => `
                    <tr>
                        <td>${member.fullName || 'N/A'}</td>
                        <td>${formatDate(member.dob)}</td>
                        <td>${member.hometown || 'N/A'}</td>
                        <td>${member.userType === 'student' ? 'Sinh viên' : 'Người đi làm'}</td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        
        // Create a wrapper for the table to enable horizontal scrolling
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-wrapper';
        tableWrapper.appendChild(table);

        memberListContainer.innerHTML = ''; 
        memberListContainer.appendChild(tableWrapper); // Append the wrapper instead of the table directly
    };

    // --- EVENT LISTENERS ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Đang gửi...';
            submitBtn.disabled = true;
            formStatus.classList.remove('visible');

            const formData = new FormData(registerForm);
            const data = {
                fullName: formData.get('full-name'),
                dob: formData.get('dob'),
                address: formData.get('address'),
                hometown: formData.get('hometown'),
                phone: formData.get('phone'),
                userType: formData.get('user-type'),
                studentYear: formData.get('user-type') === 'student' ? formData.get('student-year') : '',
                university: formData.get('user-type') === 'student' ? formData.get('university') : '',
            };

            try {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors', 
                    redirect: 'follow',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(data),
                });
                showStatusMessage('Đăng ký thành công! Cảm ơn bạn.');
                registerForm.reset();
                toggleStudentInfo();
            } catch (error) {
                console.error('Error submitting form:', error);
                showStatusMessage('Lỗi kết nối. Vui lòng thử lại sau.', true);
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });

        const userTypeRadios = registerForm.querySelectorAll('input[name="user-type"]');
        userTypeRadios.forEach(radio => radio.addEventListener('change', toggleStudentInfo));
        toggleStudentInfo();
    }

    if (listToggleButton) {
        listToggleButton.addEventListener('click', () => {
            const isHidden = memberListContainer.classList.contains('hidden');
            if (isHidden) {
                fetchAndDisplayList();
            } else {
                memberListContainer.classList.add('hidden');
                listToggleButton.textContent = 'Xem Danh Sách Đã Đăng Ký';
            }
        });
    }
});
