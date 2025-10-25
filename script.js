document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation bar style change on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Hero Slider Logic
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    if (slider && slides.length > 0) {
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        let currentIndex = 0;
        const totalSlides = slides.length;
        let slideInterval; 

        function updateSlider() {
            slider.style.transform = `translateX(-${(100 / totalSlides) * currentIndex}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }

        function prevSlide() {
             currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        function startSlideShow() {
            stopSlideShow(); 
            slideInterval = setInterval(nextSlide, 5000);
        }

        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        nextBtn.addEventListener('click', () => {
            stopSlideShow();
            nextSlide();
            // Optional: Start again after manual interaction with delay
            // setTimeout(startSlideShow, 10000); 
        });

        prevBtn.addEventListener('click', () => {
            stopSlideShow();
            prevSlide();
             // Optional: Start again after manual interaction with delay
            // setTimeout(startSlideShow, 10000);
        });

        startSlideShow(); 
    }

    // 3. Animate sections on scroll
    const sections = document.querySelectorAll('.content-section');
    
    // Add 'animated-item' class to elements that need animation
    sections.forEach(section => {
         // --- PERUBAHAN DI SINI: Tambahkan '.dokumentasi-grid img' ---
         const itemsToAnimate = section.querySelectorAll('.profil-container, .feature-row, .card, .vs, .intro-canva-container > *, .tutorial-step, .template-item, .galeri-grid img, .apresiasi-container, .dokumentasi-grid img');
         itemsToAnimate.forEach(item => item.classList.add('animated-item'));
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Apply staggered delay to items with the class
                const animatedItems = entry.target.querySelectorAll('.animated-item');
                animatedItems.forEach((item, index) => {
                    item.style.setProperty('--i', index);
                });

                observer.unobserve(entry.target); // Unobserve after animation runs once
            }
        });
    }, {
        threshold: 0.1 // Adjust threshold if needed
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // 4. Gallery Modal (Lightbox)
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    // --- PERUBAHAN DI SINI: Gabungkan gambar galeri dan dokumentasi ---
    const allGalleryImages = document.querySelectorAll(".galeri-grid img, .dokumentasi-grid img");
    const closeModal = document.querySelector(".close");

    if(modal && modalImg && captionText && allGalleryImages.length > 0 && closeModal) { // Check elemen ada
        allGalleryImages.forEach(img => { // Gunakan allGalleryImages
            img.onclick = function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                captionText.innerHTML = this.alt; // Tampilkan alt text sebagai caption
            }
        });

        closeModal.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } else {
        console.error("Gallery modal elements not found or no images to display!");
    }
});