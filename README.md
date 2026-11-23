# Website UNPER — Project UTS Pemrograman Internet

**Pembuat:** Imanuel Tanu Senjaya · **NIM:** 2403010143 · **Kelas:** F

## Menjalankan website
1. Ekstrak folder project.
2. Buka folder `Website_UNPER`.
3. Jalankan `index.html` dengan browser modern. Tidak diperlukan instalasi atau server backend untuk fitur statis.

## Struktur
- `index.html` — beranda.
- `profil_imanuel.html`, `struktur_imanuel.html`, `visi_misi_imanuel.html` — informasi institusi.
- `fakultas_imanuel.html`, `prodi_imanuel.html` — informasi akademik.
- `layanan_imanuel.html`, `pmb_imanuel.html`, `bem_imanuel.html` — layanan dan kemahasiswaan.
- `hubungi_imanuel.html` — kontak dan formulir pesan.
- `style_imanuel.css` — seluruh gaya visual.
- `script_imanuel.js` — navigasi, pencarian, progres baca, animasi, dan validasi formulir.
- `assets/` — logo dan foto kampus.

## Fitur
- 10 halaman dengan navigasi konsisten dan breadcrumb.
- Desain responsif untuk desktop, tablet, dan ponsel.
- Pencarian lintas halaman (tombol Cari atau tombol `/`), termasuk navigasi keyboard dan dialog yang dapat ditutup dengan Escape.
- Menu mobile, indikator progres baca, tombol kembali ke atas.
- FAQ interaktif pada halaman PMB.
- Formulir kontak dengan validasi, penghitung karakter, dan `mailto:`. Formulir membuka aplikasi email; tidak menyimpan pesan ke server.
- Aksesibilitas dasar: skip link, label formulir, fokus keyboard, dan dukungan reduced motion.

## Ketentuan penamaan UTS
Selector class dan ID menggunakan awalan `imanuel_`.

## Catatan publikasi
Website belum otomatis dipublikasikan. Untuk hosting, unggah isi folder `Website_UNPER` ke GitHub Pages atau Netlify. Setelah aktif, masukkan URL publik yang sebenarnya ke laporan. Pastikan informasi akademik/jadwal terbaru diverifikasi melalui situs resmi UNPER.

## Checklist sebelum pengumpulan
- Uji semua tautan dari setiap halaman pada browser.
- Uji menu mobile, pencarian (termasuk tombol `/` dan Escape), FAQ, dan formulir kontak.
- Formulir `mailto:` hanya menyiapkan email; pengiriman perlu dikonfirmasi di aplikasi email.
- Publikasikan folder ini ke GitHub Pages/Netlify, lalu cantumkan URL aktif di laporan.
- Verifikasi kembali data akademik dan informasi PMB pada kanal resmi UNPER.


## Music Corner
Website menyertakan dua pilihan lagu melalui pemutar resmi YouTube (mode privacy-enhanced `youtube-nocookie.com`). Pengunjung memilih lagu, lalu memulai pemutaran melalui player. Autoplay tidak dipaksakan saat halaman dibuka. Pemutar muncul di seluruh halaman; jika pengunjung berpindah halaman, browser memuat ulang halaman sehingga pemutaran dapat terhenti dan perlu dimulai kembali. Ketersediaan embed mengikuti pengaturan pemilik video dan kebijakan YouTube.


## Penting: menjalankan Music Corner tanpa Error 153
YouTube mensyaratkan HTTP Referer untuk pemutar sematan. Jika halaman dibuka langsung dengan alamat `file://` (klik ganda `index.html`), browser tidak mengirim HTTP Referer sehingga YouTube dapat menampilkan Error 153. Ini bukan kerusakan lagu atau JavaScript.

**Jangan buka HTML dengan klik ganda untuk menguji musik.** Jalankan website melalui server lokal:
1. Buka folder `Website_UNPER` di Terminal/Command Prompt.
2. Jalankan `python -m http.server 8000`.
3. Buka `http://localhost:8000` di browser.
4. Buka `index.html`, lalu tekan Play pada pemutar YouTube.

Alternatif untuk pengujian akhir: unggah folder `Website_UNPER` ke hosting HTTPS seperti GitHub Pages atau Netlify, lalu buka URL hosting. File HTML sudah menetapkan `Referrer-Policy: strict-origin-when-cross-origin` pada meta tag dan iframe. Jika video tertentu tetap tidak bisa diputar, periksa apakah pemilik video mengizinkan embedding; gunakan tautan **Buka lagu di YouTube** sebagai alternatif.
