// Three.js Interactive Background for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    const heroSection = document.querySelector('.hero');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    
    // Create a container for the canvas and append it to the hero section
    const threeContainer = document.createElement('div');
    threeContainer.classList.add('three-bg-container');
    Object.assign(threeContainer.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
    });
    
    threeContainer.appendChild(renderer.domElement);
    heroSection.insertBefore(threeContainer, heroSection.firstChild);
    
    // Create particle system for a tech/code themed background
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for(let i = 0; i < particlesCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 10;     // x
        posArray[i+1] = (Math.random() - 0.5) * 10;   // y
        posArray[i+2] = (Math.random() - 0.5) * 10;   // z
        scaleArray[i/3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        sizeAttenuation: true,
        color: new THREE.Color('#3498db'),
        transparent: true,
        opacity: 0.8
    });
    
    // Create particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    // Position camera
    camera.position.z = 3;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Create animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Smooth mouse tracking
        targetX = mouseX * 0.1;
        targetY = mouseY * 0.1;
        
        // Rotate particle system
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        // React to mouse position
        particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.02;
        particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.02;
        
        // Render scene
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Listen for section visibility
    const observer = new IntersectionObserver((entries) => {
        // Only render when visible in viewport
        if (entries[0].isIntersecting) {
            threeContainer.style.display = 'block';
        } else {
            threeContainer.style.display = 'none';
        }
    });
    
    observer.observe(heroSection);
}); 