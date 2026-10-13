const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
  registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fields = [
      document.getElementById('fullName'),
      document.getElementById('address'),
      document.getElementById('email'),
      document.getElementById('password'),
      document.getElementById('course'),
      document.getElementById('college'),
    ];

    const allFilled = fields.every((field) => field.value.trim() !== '');
    const agreement = document.getElementById('agreement');
    const email = document.getElementById('email').value.trim();

    if (!allFilled) {
      alert('Please complete all required fields before submitting.');
      return;
    }

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!agreement.checked) {
      alert('You must agree to the information before continuing.');
      return;
    }

    alert('Registration successful!');
    registrationForm.reset();
  });
}

const emailValidationForm = document.getElementById('emailValidationForm');
const emailMessage = document.getElementById('emailMessage');
const emailInput = document.getElementById('emailInput');

if (emailValidationForm) {
  emailValidationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = emailInput.value.trim();

    if (!value) {
      emailMessage.textContent = 'Email tidak boleh kosong.';
      emailMessage.className = 'message error';
      return;
    }

    if (!emailPattern.test(value)) {
      emailMessage.textContent = 'Email tidak valid!';
      emailMessage.className = 'message error';
      return;
    }

    emailMessage.textContent = 'Email valid!';
    emailMessage.className = 'message success';
  });
}

const postalData = {
  'Jawa Timur': {
    'Surabaya': {
      'Wonokromo': '60243',
      'Sukolilo': '60111',
      'Genteng': '60275'
    },
    'Malang': {
      'Klojen': '65111',
      'Lowokwaru': '65141',
      'Blimbing': '65127'
    }
  },
  'Jawa Tengah': {
    'Semarang': {
      'Candisari': '50252',
      'Tembalang': '50275',
      'Mijen': '50215'
    },
    'Solo': {
      'Pasar Kliwon': '57116',
      'Banjarsari': '57138',
      'Laweyan': '57141'
    }
  },
  'DKI Jakarta': {
    'Jakarta Selatan': {
      'Kebayoran Baru': '12180',
      'Pasar Minggu': '12520',
      'Cilandak': '12430'
    },
    'Jakarta Barat': {
      'Grogol Petamburan': '11440',
      'Kembangan': '11610',
      'Cengkareng': '11730'
    }
  }
};

const provinceSelect = document.getElementById('provinsi');
const citySelect = document.getElementById('kota');
const districtSelect = document.getElementById('kecamatan');
const postcodeInput = document.getElementById('kodepos');
const postcodeResult = document.getElementById('postcodeResult');
const searchButton = document.getElementById('searchPostalCode');

if (provinceSelect) {
  const provinces = Object.keys(postalData);
  provinces.forEach((province) => {
    const option = document.createElement('option');
    option.value = province;
    option.textContent = province;
    provinceSelect.appendChild(option);
  });

  provinceSelect.addEventListener('change', () => {
    const province = provinceSelect.value;
    citySelect.innerHTML = '<option value="">Pilih Kota/Kabupaten</option>';
    districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
    postcodeInput.value = '';
    postcodeResult.innerHTML = '<p>Hasil pencarian kode pos akan muncul di sini.</p>';

    if (!province) return;

    Object.keys(postalData[province]).forEach((city) => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  });

  citySelect.addEventListener('change', () => {
    const province = provinceSelect.value;
    const city = citySelect.value;
    districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
    postcodeInput.value = '';
    postcodeResult.innerHTML = '<p>Hasil pencarian kode pos akan muncul di sini.</p>';

    if (!province || !city) return;

    Object.keys(postalData[province][city]).forEach((district) => {
      const option = document.createElement('option');
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  });

  districtSelect.addEventListener('change', () => {
    const province = provinceSelect.value;
    const city = citySelect.value;
    const district = districtSelect.value;
    postcodeInput.value = '';

    if (!province || !city || !district) return;

    const code = postalData[province][city][district];
    postcodeInput.value = code;
    postcodeResult.innerHTML = `<p><strong>Hasil pencarian:</strong> ${district}, ${city}, ${province} memiliki kode pos <strong>${code}</strong>.</p>`;
  });

  searchButton.addEventListener('click', () => {
    const province = provinceSelect.value;
    const city = citySelect.value;
    const district = districtSelect.value;

    if (!province || !city || !district) {
      postcodeResult.innerHTML = '<p>Silakan pilih provinsi, kota, dan kecamatan terlebih dahulu.</p>';
      return;
    }

    const code = postalData[province][city][district];
    postcodeInput.value = code;
    postcodeResult.innerHTML = `<p><strong>Hasil pencarian:</strong> ${district}, ${city}, ${province} memiliki kode pos <strong>${code}</strong>.</p>`;
  });
}
