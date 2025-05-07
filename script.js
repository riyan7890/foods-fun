document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Menu filtering
    const filterButtons = document.querySelectorAll('.btn-filter');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // Dietary filters
    const dietaryCheckboxes = document.querySelectorAll('.dietary-filters input[type="checkbox"]');
    
    dietaryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedDietary = Array.from(dietaryCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            
            menuItems.forEach(item => {
                const itemDietary = item.getAttribute('data-dietary') || '';
                const itemDietaryList = itemDietary.split(' ');
                
                if (selectedDietary.length === 0 || selectedDietary.some(diet => itemDietaryList.includes(diet))) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // Gallery slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slider-item');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        slides.forEach(slide => slide.style.display = 'none');
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        slides[index].style.display = 'block';
        thumbnails[index].classList.add('active');
        currentSlide = index;
    }
    
    document.querySelector('.slider-nav.prev').addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });
    
    document.querySelector('.slider-nav.next').addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });
    
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide change
    let slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);
    
    // Pause on hover
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    galleryContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 5000);
    });
    
   

    // Chat widget
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWidget = document.querySelector('.chat-widget');
    const chatClose = document.querySelector('.chat-close');
    const chatBody = document.querySelector('.chat-body');
    const chatSend = document.querySelector('.chat-send');
    const chatInput = document.querySelector('.chat-input input');
    const chatMessages = document.querySelector('.chat-messages');
    
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('active');
        chatBody.style.display = chatBody.style.display === 'block' ? 'none' : 'block';
    });
    
    chatClose.addEventListener('click', function() {
        chatWidget.classList.remove('active');
        chatBody.style.display = 'none';
    });
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message user';
            userMessage.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMessage);
            
            // Clear input
            chatInput.value = '';
            
            // Scroll to bottom
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Simulate bot response after delay
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                const botMessage = document.createElement('div');
                botMessage.className = 'chat-message bot';
                botMessage.innerHTML = `<p>${botResponse}</p>`;
                chatMessages.appendChild(botMessage);
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    }
    
    function getBotResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('menu') || lowerMessage.includes('food')) {
            return "Our menu features a variety of dishes including starters, main courses, desserts, and drinks. You can view our full menu on the website or ask about specific dietary requirements.";
        } else if (lowerMessage.includes('reservation') || lowerMessage.includes('book') || lowerMessage.includes('table')) {
            return "You can make a reservation through our online booking system on the website or by calling us at +1 (555) 123-4567. For parties larger than 8, please call us directly.";
        } else if (lowerMessage.includes('hours') || lowerMessage.includes('open')) {
            return "We're open Monday to Friday from 11am to 10pm, and Saturday to Sunday from 10am to 11pm.";
        } else if (lowerMessage.includes('location') || lowerMessage.includes('address')) {
            return "We're located at 123 Gourmet Street, Foodie City. You can find us on the map at the bottom of our website.";
        } else if (lowerMessage.includes('delivery') || lowerMessage.includes('takeaway')) {
            return "We offer both takeaway and delivery services through our partners. Delivery times may vary depending on your location.";
        } else {
            return "Thank you for your message! How can I assist you today? You can ask about our menu, reservations, opening hours, or location.";
        }
    }

    // Form submissions
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would send this data to your server
        alert('Your table has been booked successfully! We look forward to serving you.');
        this.reset();
    });
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your review! We appreciate your feedback.');
        this.reset();
        // Close modal
        bootstrap.Modal.getInstance(document.getElementById('reviewModal')).hide();
    });

    // Language selector functionality (simplified)
    document.getElementById('language-select').addEventListener('change', function() {
        const language = this.value;
        // In a real application, you would load translations or redirect to a language-specific page
        alert(`Language changed to ${language}. In a real application, this would load the appropriate translations.`);
    });

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});













document.addEventListener('DOMContentLoaded', function() {
    // Slider Functionality
    const sliderTrack = document.querySelector('.reviews-slider-track');
    const dots = document.querySelectorAll('.slider-dot');
    const reviewItems = document.querySelectorAll('.review-item');
    let currentIndex = 0;
    
    function updateSlider() {
        const itemWidth = reviewItems[0].clientWidth;
        sliderTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-index'));
            updateSlider();
        });
    });
    
    // Auto-slide (optional)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % reviewItems.length;
        updateSlider();
    }, 5000);
    
    // Star Rating in Modal
    const stars = document.querySelectorAll('.modal .review-rating .fa-star');
    const ratingInput = document.getElementById('reviewRating');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            ratingInput.value = rating;
            
            stars.forEach((s, index) => {
                s.classList.toggle('fas', index < rating);
                s.classList.toggle('far', index >= rating);
            });
        });
    });
    
    // Form Submission (demo)
    document.getElementById('submitReview').addEventListener('click', function() {
        alert('Thank you for your review!');
        const modal = bootstrap.Modal.getInstance(document.getElementById('reviewModal'));
        modal.hide();
    });
});
