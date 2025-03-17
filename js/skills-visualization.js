// Skills Visualization with Three.js and GSAP
document.addEventListener('DOMContentLoaded', function() {
    // Check if Three.js and GSAP are loaded
    if (typeof THREE === 'undefined' || typeof gsap === 'undefined') {
        console.warn('Three.js or GSAP not loaded');
        return;
    }

    const skillsSection = document.querySelector('.skills');
    
    // Create a container for the 3D visualization
    const skillsContainer = document.createElement('div');
    skillsContainer.classList.add('skills-3d-container');
    Object.assign(skillsContainer.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '50%',
        zIndex: 0,
        pointerEvents: 'none'
    });
    
    skillsSection.appendChild(skillsContainer);
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, skillsContainer.clientWidth / skillsContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(skillsContainer.clientWidth, skillsContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    
    skillsContainer.appendChild(renderer.domElement);
    
    // Define skills with colors matching tech logos
    const skills = [
        { name: 'PHP', level: 0.9, color: '#8993be' },
        { name: 'MySQL', level: 0.85, color: '#00758f' },
        { name: 'JavaScript', level: 0.8, color: '#f7df1e' },
        { name: 'Laravel', level: 0.75, color: '#ff2d20' },
        { name: 'Magento', level: 0.7, color: '#f26322' }
    ];
    
    // Create hexagonal prisms for skills
    const skillObjects = [];
    const skillGroup = new THREE.Group();
    
    skills.forEach((skill, index) => {
        // Create hexagonal geometry
        const geometry = new THREE.CylinderGeometry(skill.level * 0.5, skill.level * 0.5, 0.2, 6);
        
        // Create material with skill color
        const material = new THREE.MeshPhongMaterial({ 
            color: skill.color,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });
        
        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        
        // Position in a circle around the center
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 2;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        
        // Start below view
        mesh.position.y = -5;
        
        // Rotate to lay flat
        mesh.rotation.x = Math.PI / 2;
        
        // Add label for skill
        const skillName = skill.name;
        
        // Add to scene and track
        skillGroup.add(mesh);
        skillObjects.push({
            mesh: mesh,
            name: skillName,
            initialAngle: angle
        });
    });
    
    scene.add(skillGroup);
    
    // Add lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);
    
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Position camera
    camera.position.y = 1;
    camera.position.z = 5;
    
    // Animation variables
    let isAnimating = false;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = skillsContainer.clientWidth / skillsContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(skillsContainer.clientWidth, skillsContainer.clientHeight);
    });
    
    // Mouse interaction
    let mouseX = 0;
    
    window.addEventListener('mousemove', (event) => {
        // Only track horizontal mouse movement
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the entire skill group based on mouse position
        if (isAnimating) {
            skillGroup.rotation.y += 0.005;
            skillGroup.rotation.y += (mouseX * 0.5 - skillGroup.rotation.y) * 0.02;
            
            // Add subtle floating animation to each hex
            skillObjects.forEach((skillObj, index) => {
                skillObj.mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
            });
        }
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Intersection Observer to trigger animations when section is visible
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            if (!isAnimating) {
                isAnimating = true;
                
                // Animate skills coming into view
                skillObjects.forEach((skillObj, index) => {
                    gsap.to(skillObj.mesh.position, {
                        y: 0,
                        duration: 1.5,
                        delay: index * 0.2,
                        ease: "elastic.out(1, 0.5)",
                        onComplete: function() {
                            // Add rotation animation after it rises up
                            gsap.to(skillObj.mesh.rotation, {
                                z: Math.PI * 2,
                                duration: 1.5,
                                repeat: -1,
                                ease: "none"
                            });
                        }
                    });
                });
            }
            
            skillsContainer.style.display = 'block';
        } else {
            isAnimating = false;
            skillsContainer.style.display = 'none';
        }
    }, {
        threshold: 0.2
    });
    
    observer.observe(skillsSection);
}); 