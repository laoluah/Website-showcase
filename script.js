document.addEventListener('DOMContentLoaded', function() {
    // Initialize current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navigation menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger animation
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Tab functionality for portfolio section
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Clone audio cards for category tabs
    function populateCategoryTabs() {
        const allTab = document.getElementById('tab-all');
        const audioCards = allTab.querySelectorAll('.audio-card');
        
        audioCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const categoryTab = document.getElementById(`tab-${category}`);
            
            if (categoryTab) {
                // Create audio grid if it doesn't exist
                let audioGrid = categoryTab.querySelector('.audio-grid');
                if (!audioGrid) {
                    audioGrid = document.createElement('div');
                    audioGrid.className = 'audio-grid';
                    categoryTab.appendChild(audioGrid);
                }
                
                // Clone the card
                const clonedCard = card.cloneNode(true);
                audioGrid.appendChild(clonedCard);
                
                // Initialize the audio player for the cloned card
                initializeAudioPlayer(clonedCard.querySelector('.audio-player'));
            }
        });
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
    
    // Waitlist form submission
    const waitlistForm = document.getElementById('waitlist-form');
    const waitlistSuccess = document.getElementById('waitlist-success');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            let isValid = true;
            
            if (name === '') {
                document.getElementById('name-error').textContent = 'Please enter your name';
                isValid = false;
            }
            
            if (email === '') {
                document.getElementById('email-error').textContent = 'Please enter your email';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitButton = waitlistForm.querySelector('button[type="submit"]');
                const submitText = submitButton.querySelector('.submit-text');
                const loader = submitButton.querySelector('.loader');
                
                submitText.classList.add('hidden');
                loader.classList.remove('hidden');
                
                // Simulate form submission (in a real app, this would be an API call)
                setTimeout(() => {
                    waitlistForm.classList.add('hidden');
                    waitlistSuccess.classList.remove('hidden');
                    
                    // Reset form
                    waitlistForm.reset();
                    
                    // Reset button state
                    submitText.classList.remove('hidden');
                    loader.classList.add('hidden');
                }, 1500);
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Intersection Observer for scroll animations
    const observeElements = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    setTimeout(() => {
                        entry.target.classList.add(className);
                    }, delay);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Observe timeline cards
    observeElements(document.querySelectorAll('.timeline-card'), 'visible');
    
    // Observe skill cards
    observeElements(document.querySelectorAll('.skill-card'), 'visible');
    
    // Observe contact cards
    observeElements(document.querySelectorAll('.contact-card'), 'visible');
    
    // Audio player functionality
    function initializeAudioPlayer(playerElement) {
        if (!playerElement) return;
        
        const audioSrc = playerElement.getAttribute('data-src');
        const title = playerElement.getAttribute('data-title');
        const playButton = playerElement.querySelector('.play-button');
        const progressContainer = playerElement.querySelector('.progress-container');
        const progressBar = playerElement.querySelector('.progress-bar');
        const timeDisplay = playerElement.querySelector('.time');
        const volumeButton = playerElement.querySelector('.volume-button');
        const volumeSlider = playerElement.querySelector('.volume-slider');
        const volumeProgress = playerElement.querySelector('.volume-progress');
        
        // Create audio element
        const audio = new Audio(audioSrc);
        let isPlaying = false;
        let isMuted = false;
        
        // Update play button icon
        function updatePlayButton() {
            if (isPlaying) {
                playButton.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                playButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        }
        
        // Format time in MM:SS format
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        
        // Update progress bar and time display
        function updateProgress() {
            const duration = audio.duration || 0;
            const currentTime = audio.currentTime || 0;
            const progress = (currentTime / duration) * 100;
            
            progressBar.style.width = `${progress}%`;
            timeDisplay.textContent = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        }
        
        // Toggle play/pause
        playButton.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
            } else {
                // Pause all other audio players first
                document.querySelectorAll('.audio-player').forEach(player => {
                    const playerAudio = player.querySelector('audio');
                    const playerButton = player.querySelector('.play-button');
                    
                    if (playerAudio && playerAudio !== audio && !playerAudio.paused) {
                        playerAudio.pause();
                        playerButton.innerHTML = '<i class="fas fa-play"></i>';
                    }
                });
                
                audio.play();
            }
            
            isPlaying = !isPlaying;
            updatePlayButton();
        });
        
        // Set progress on click
        progressContainer.addEventListener('click', function(e) {
            const boundingRect = progressContainer.getBoundingClientRect();
            const clickPosition = e.clientX - boundingRect.left;
            const containerWidth = boundingRect.width;
            const seekPercentage = clickPosition / containerWidth;
            
            if (audio.duration) {
                audio.currentTime = audio.duration * seekPercentage;
                updateProgress();
            }
        });
        
        // Toggle mute/unmute
        volumeButton.addEventListener('click', function() {
            isMuted = !isMuted;
            audio.muted = isMuted;
            
            if (isMuted) {
                volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
                volumeProgress.style.width = '0%';
            } else {
                volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
                volumeProgress.style.width = `${audio.volume * 100}%`;
            }
        });
        
        // Set volume on click
        volumeSlider.addEventListener('click', function(e) {
            const boundingRect = volumeSlider.getBoundingClientRect();
            const clickPosition = e.clientX - boundingRect.left;
            const containerWidth = boundingRect.width;
            const volumePercentage = clickPosition / containerWidth;
            
            audio.volume = volumePercentage;
            volumeProgress.style.width = `${volumePercentage * 100}%`;
            
            if (volumePercentage > 0 && isMuted) {
                isMuted = false;
                audio.muted = false;
                volumeButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else if (volumePercentage === 0) {
                isMuted = true;
                audio.muted = true;
                volumeButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
        
        // Update progress as audio plays
        audio.addEventListener('timeupdate', updateProgress);
        
        // Reset when audio ends
        audio.addEventListener('ended', function() {
            isPlaying = false;
            updatePlayButton();
            audio.currentTime = 0;
            updateProgress();
        });
        
        // Initialize audio metadata
        audio.addEventListener('loadedmetadata', function() {
            updateProgress();
        });
        
        // Append audio element to player
        playerElement.appendChild(audio);
        
        // Hide audio element
        audio.style.display = 'none';
    }
    
    // Initialize all audio players
    document.querySelectorAll('.audio-player').forEach(player => {
        initializeAudioPlayer(player);
    });
    
    // Populate category tabs after initializing audio players
    populateCategoryTabs();
    
    // Handle navigation highlight on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Update navigation highlight based on scroll position
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Shrink navigation on scroll
        const navigation = document.getElementById('main-nav');
        if (scrollPosition > 50) {
            navigation.style.padding = '0.5rem 0';
        } else {
            navigation.style.padding = '1rem 0';
        }
    });
});