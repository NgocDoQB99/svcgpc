
document.addEventListener('DOMContentLoaded', () => {

    // --- Particle Effects Initialization ---
    tsParticles.load('tsparticles', {
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: 'repulse',
                },
                resize: true,
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: '#a32a2a',
            },
            links: {
                color: '#a32a2a',
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            collisions: {
                enable: true,
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: {
                    default: 'bounce',
                },
                random: false,
                speed: 1.5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: 'circle',
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    });

    // --- Header Slideshow ---
    const slideshowImages = document.querySelectorAll('.header-slideshow img');
    let currentImageIndex = 0;
    if (slideshowImages.length > 0) {
        setInterval(() => {
            slideshowImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
            slideshowImages[currentImageIndex].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    // --- Rotating Text in Top Bar ---
    const rotatingText = document.getElementById('rotating-text');
    const texts = [
        "Nhóm Sinh viên công giáo phú cường",
        "Chào mừng các bạn tân sinh viên",
        "Đức Tin - Tri Thức - Phục Vụ"
    ];
    let textIndex = 0;
    if(rotatingText) {
        setInterval(() => {
            rotatingText.style.opacity = 0;
            setTimeout(() => {
                textIndex = (textIndex + 1) % texts.length;
                rotatingText.textContent = texts[textIndex];
                rotatingText.style.opacity = 1;
            }, 500); // Fade transition time
        }, 4000); // Time each text is displayed
    }

    // --- YouTube Music Player ---
    const musicToggleButton = document.getElementById('music-toggle');
    let player;
    let isPlayerReady = false;
    let isMusicPlaying = false;

    const videoId = '4D42s1W2Y6I'; // Default YouTube Video ID

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: {
                'playsinline': 1,
                'autoplay': 0,
                'controls': 0,
                'loop': 1,
                'playlist': videoId 
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        isPlayerReady = true;
    }

    function onPlayerStateChange(event) {
        isMusicPlaying = event.data == YT.PlayerState.PLAYING;
        musicToggleButton.classList.toggle('active', isMusicPlaying);
    }

    if (document.getElementById('player')) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }
    

    if (musicToggleButton) {
        musicToggleButton.addEventListener('click', () => {
            if (!isPlayerReady) return;
            isMusicPlaying ? player.pauseVideo() : player.playVideo();
        });
    }
});
