// Contact Animation with Zdog
document.addEventListener('DOMContentLoaded', function() {
    // Check if Zdog is loaded
    if (typeof Zdog === 'undefined') {
        console.warn('Zdog not loaded');
        return;
    }

    const contactSection = document.querySelector('.contact');
    const contactForm = document.querySelector('.contact-form');
    
    // Create a canvas for Zdog
    const canvas = document.createElement('canvas');
    canvas.classList.add('contact-animation-canvas');
    canvas.width = 150;
    canvas.height = 150;
    
    // Create a container for the canvas
    const canvasContainer = document.createElement('div');
    canvasContainer.classList.add('contact-animation-container');
    Object.assign(canvasContainer.style, {
        position: 'absolute',
        top: '20px',
        right: '50px',
        width: '150px',
        height: '150px',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.8
    });
    
    canvasContainer.appendChild(canvas);
    contactForm.appendChild(canvasContainer);
    
    // Initialize Zdog illustration
    const illo = new Zdog.Illustration({
        element: canvas,
        dragRotate: true,
        rotate: { x: -0.3, y: 0.6 },
        resize: true
    });
    
    // Create mail envelope
    const envelope = new Zdog.Group({
        addTo: illo
    });
    
    // Envelope body
    new Zdog.Box({
        addTo: envelope,
        width: 50,
        height: 35,
        depth: 5,
        stroke: false,
        color: '#3498db',
        frontFace: '#2980b9',
        backFace: '#2980b9',
        leftFace: '#2980b9',
        rightFace: '#2980b9',
        bottomFace: '#2980b9'
    });
    
    // Envelope flap (like a triangular prism)
    const flap = new Zdog.Shape({
        addTo: envelope,
        path: [
            { x: -25, y: -17.5, z: 0 },
            { x: 25, y: -17.5, z: 0 },
            { x: 0, y: -35, z: 0 }
        ],
        color: '#2980b9',
        stroke: 1,
        fill: true
    });
    
    // Add a paper inside the envelope
    const paper = new Zdog.Group({
        addTo: envelope,
        translate: { y: -5, z: 3 }
    });
    
    new Zdog.Rect({
        addTo: paper,
        width: 40,
        height: 25,
        stroke: 1,
        color: '#f5f5f5',
        fill: true
    });
    
    // Add decorative lines to the paper
    for (let i = 0; i < 5; i++) {
        new Zdog.Shape({
            addTo: paper,
            path: [
                { x: -15, y: -8 + i * 5, z: 0.5 },
                { x: 15, y: -8 + i * 5, z: 0.5 }
            ],
            stroke: 1,
            color: '#ddd'
        });
    }
    
    // Add a @ symbol to represent email
    new Zdog.Shape({
        addTo: envelope,
        path: [
            { x: 0, y: 0, z: 6 }, // Start center
            // Draw @ by moving in a circle and adding the tail
            ...Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                return {
                    x: Math.cos(angle) * 8,
                    y: Math.sin(angle) * 8,
                    z: 6
                };
            }),
            { x: 8, y: 0, z: 6 }, // Connect to center
            { x: 4, y: 0, z: 6 }, // Draw tail
            { x: 12, y: 4, z: 6 }
        ],
        closed: false,
        stroke: 2.5,
        color: '#fff'
    });
    
    // Animation loop
    function animate() {
        // Rotate
        illo.rotate.y += 0.01;
        
        // Add some bounce to the envelope
        envelope.translate.y = Math.sin(Date.now() * 0.002) * 5;
        
        // Render
        illo.updateRenderGraph();
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Hover effect on contact form elements
    const formElements = contactForm.querySelectorAll('input, textarea, button');
    formElements.forEach(element => {
        element.addEventListener('focus', () => {
            gsap.to(envelope.translate, {
                y: -10,
                duration: 0.5,
                yoyo: true,
                repeat: 1
            });
            
            // Change envelope color temporarily
            envelope.children.forEach(child => {
                if (child.color) {
                    gsap.to(child, {
                        color: '#e74c3c',
                        duration: 0.5,
                        yoyo: true,
                        repeat: 1
                    });
                }
            });
        });
    });
    
    // Start animation
    animate();
    
    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            canvasContainer.style.display = 'block';
        } else {
            canvasContainer.style.display = 'none';
        }
    });
    
    observer.observe(contactSection);
}); 