function showOnLoad(element) {
    if (element) {
        requestAnimationFrame(() => element.classList.add("show"));
    }
}
showOnLoad(document.getElementById("heroTitle"));
showOnLoad(document.getElementById("hero-text"));
showOnLoad(document.querySelector(".eyebrow-hero"));


const navbarContainer = document.querySelector('.navbar .container-fluid');

function navbarcolor(scroll) {
  if (scroll >= 500) {
    navbarContainer.style.backgroundColor = '#1259fc';
  } else {
    navbarContainer.style.backgroundColor = 'rgba(8, 24, 38, .62)';
  }
}

window.addEventListener('scroll', () => navbarcolor(window.scrollY), { passive: true });
navbarcolor(window.scrollY);

      const currentSlide = document.querySelector('.current-slide');
      const totalSlides = document.querySelector('.total-slides');
      const progressTrack = document.querySelector('.progress-track');
      const progressFill = document.querySelector('.progress-fill');
      const slides = Array.from(document.querySelectorAll('.swiper-slide'));
      const slideCount = slides.length;
      let swiper;

      slides.forEach((slide) => {
        const duplicate = slide.cloneNode(true);
        duplicate.setAttribute('aria-hidden', 'true');
        slide.parentElement.appendChild(duplicate);
      });

      

      function updateSlideCount(swiper) {
        const slideNumber = (swiper.realIndex % slideCount) + 1;
        const progress = slideNumber / slideCount;
        currentSlide.textContent = String(slideNumber).padStart(2, '0');
        progressFill.style.transform = `scaleX(${progress})`;
        progressTrack.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      }
var carousel = function carousel() {
      swiper = new Swiper('.mySwiper', {
        centeredSlides: true,
        // Keep enough slides visible for loop mode with four destinations.
        slidesPerView: 1.5,
        loop: true,
        spaceBetween: 20,
        speed: 700,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          900: {
            slidesPerView: 2,
          },
        },
        on: {
          init(swiper) {
            updateSlideCount(swiper);
          },
          slideChange(swiper) {
            updateSlideCount(swiper);
          },
        },
      })};

      carousel();

const packageModal = document.getElementById("packageModal");

packageModal.addEventListener("show.bs.modal", (event) => {
  const packageCard = event.relatedTarget.closest(".package-card");
  document.getElementById("packageModalTitle").textContent =
    packageCard.querySelector(".package-title").textContent;
  document.getElementById("packageModalDuration").textContent =
    packageCard.querySelector(".package-durasi").textContent;
  document.getElementById("packageModalDescription").textContent =
    packageCard.querySelector(".package-description").textContent.trim();
  document.getElementById("packageModalDetail").textContent =
    packageCard.dataset.detail;
  document.getElementById("packageModalPrice").textContent =
    packageCard.querySelector(".package-harga").textContent;
});

const formBooking = document.getElementById("formBooking");
const bookingModal = document.getElementById("exampleModal");
const invoiceModal = document.getElementById("hasilbooking");
const tombolBookingPaket = document.getElementById("openBookingButton");

const inputNama = document.getElementById("nama");
const inputPaket = document.getElementById("paket");
const inputJumlah = document.getElementById("jumlah");
const inputDate = document.getElementById("berangkat");
const pesanError = document.getElementById("pesanError");

const outNama = document.getElementById("outNama");
const outPaket = document.getElementById("outPaket");
const outBerangkat = document.getElementById("outBerangkat");
const outDurasi = document.getElementById("outDurasi");
const outPeserta = document.getElementById("outPeserta");
const outHarga = document.getElementById("outHarga");
const outTotal = document.getElementById("outTotal");

tombolBookingPaket.addEventListener("click", function () {
  inputPaket.value = document.getElementById("packageModalTitle").textContent.trim();
  pesanError.classList.add("d-none");
  pesanError.replaceChildren();

  packageModal.addEventListener("hidden.bs.modal", function () {
    bootstrap.Modal.getOrCreateInstance(bookingModal).show();
  }, { once: true });

  bootstrap.Modal.getOrCreateInstance(packageModal).hide();
});

const dataPaket = {
  "Bali Escape": { durasi: "3 Hari 2 Malam", harga: 2450000 },
  "Bromo Sunrise Trip": { durasi: "2 Hari 1 Malam", harga: 1350000 },
  "Raja Ampat Discovery": { durasi: "4 Hari 3 Malam", harga: 5750000 },
  "Labuan Bajo Explorer": { durasi: "3 Hari 2 Malam", harga: 3950000 }
};

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function formatTanggal(value) {
  const [tahun, bulan, hari] = value.split("-").map(Number);
  const tanggal = new Date(tahun, bulan - 1, hari);
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function getTanggalHariIni() {
  const hariIni = new Date();
  const offset = hariIni.getTimezoneOffset();
  return new Date(hariIni.getTime() - offset * 60 * 1000).toISOString().split("T")[0];
}

inputDate.min = getTanggalHariIni();

formBooking.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = inputNama.value.trim();
  const paket = inputPaket.value;
  const jumlah = Number(inputJumlah.value);
  const tanggal = inputDate.value;
  const daftarError = [];
  let firstInvalidField = null;

  if (nama === "") {
    daftarError.push("Nama pemesan wajib diisi.");
    firstInvalidField = firstInvalidField || inputNama;
  } else if (nama.length < 3) {
    daftarError.push("Nama pemesan minimal 3 karakter.");
    firstInvalidField = firstInvalidField || inputNama;
  }

  if (paket === "") {
    daftarError.push("Paket wajib dipilih.");
    firstInvalidField = firstInvalidField || inputPaket;
  }

  if (inputJumlah.value === "") {
    daftarError.push("Jumlah orang wajib diisi.");
    firstInvalidField = firstInvalidField || inputJumlah;
  } else if (!Number.isInteger(jumlah) || jumlah < 1) {
    daftarError.push("Jumlah orang harus bilangan bulat minimal 1.");
    firstInvalidField = firstInvalidField || inputJumlah;
  } else if (jumlah > 20) {
    daftarError.push("Jumlah orang tidak boleh lebih dari 20.");
    firstInvalidField = firstInvalidField || inputJumlah;
  }

  if (tanggal === "") {
    daftarError.push("Tanggal berangkat wajib diisi.");
    firstInvalidField = firstInvalidField || inputDate;
  } else if (tanggal < getTanggalHariIni()) {
    daftarError.push("Tanggal berangkat tidak boleh sebelum hari ini.");
    firstInvalidField = firstInvalidField || inputDate;
  }

  if (daftarError.length > 0) {
    const errorList = document.createElement("ul");
    errorList.className = "mb-0";
    daftarError.forEach(function (message) {
      const item = document.createElement("li");
      item.textContent = message;
      errorList.append(item);
    });
    pesanError.replaceChildren(errorList);
    pesanError.classList.remove("d-none");
    firstInvalidField.focus();
    return;
  }

  const detail = dataPaket[paket];
  const total = detail.harga * jumlah;

  outNama.textContent = nama;
  outPaket.textContent = paket;
  outBerangkat.textContent = formatTanggal(tanggal);
  outDurasi.textContent = detail.durasi;
  outPeserta.textContent = jumlah + " orang";
  outHarga.textContent = formatRupiah(detail.harga);
  outTotal.textContent = formatRupiah(total);

  pesanError.classList.add("d-none");
  pesanError.replaceChildren();
  bookingModal.addEventListener("hidden.bs.modal", function () {
    bootstrap.Modal.getOrCreateInstance(invoiceModal).show();
  }, { once: true });
  bootstrap.Modal.getOrCreateInstance(bookingModal).hide();
});
