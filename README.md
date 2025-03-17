# Jaydeep Raj - Web Developer Portfolio

A modern, responsive portfolio website for Jaydeep Raj, a Web Developer specializing in PHP, MySQLi, JavaScript, Magento 2, and Laravel.

## Features

- Clean, modern, and responsive design
- Mobile-friendly with a hamburger menu for smaller screens
- Smooth scrolling navigation
- Interactive sections showcasing skills, experience, projects, and education
- Contact form with validation
- Optimized for performance and SEO
- Interactive 3D elements using modern JavaScript libraries:
  - Three.js particle background in the hero section
  - GSAP-animated 3D skill visualization
  - Babylon.js interactive project showcase
  - Zdog animated contact form decoration

## Technologies Used

- HTML5
- CSS3 (with modern features like CSS Variables, Flexbox, and Grid)
- JavaScript (ES6+)
- Font Awesome for icons
- Google Fonts (Poppins)
- 3D JavaScript Libraries:
  - Three.js - WebGL-based 3D library
  - Babylon.js - 3D game and rendering engine
  - GSAP - Animation library
  - Zdog - Pseudo-3D engine for canvas
  - React Three Fiber - React renderer for Three.js
  - A-Frame - Web framework for virtual reality
  - PixiJS - 2D WebGL renderer
  - Cannon.js - 3D physics engine

## File Structure

```
├── index.html            # Main HTML file
├── css/
│   └── style.css         # Main stylesheet
├── js/
│   ├── script.js         # Core JavaScript functionality
│   ├── three-background.js    # Three.js hero background
│   ├── skills-visualization.js # 3D skills visualization
│   ├── project-showcase.js    # Babylon.js project showcase
│   └── contact-animation.js   # Zdog contact animation
└── images/               # Directory for images
```

## How to Use

1. Clone or download this repository
2. Open `index.html` in your browser to view the portfolio
3. Customize the content, colors, and layout as needed

## Customization Guide

### Changing Colors

The color scheme can be easily modified by editing the CSS variables in the `:root` selector in `css/style.css`:

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --accent-color: #e74c3c;
    --light-color: #f5f5f5;
    --dark-color: #333;
    --text-color: #555;
    --border-color: #ddd;
    --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}
```

### Adding Projects

To add new projects, copy and modify the existing project card structure in the "Projects" section of `index.html`:

```html
<div class="project-card">
    <div class="project-header">
        <h3>🔹 Project Title</h3>
        <div class="project-tags">
            <span>Tag 1</span>
            <span>Tag 2</span>
            <span>Tag 3</span>
        </div>
    </div>
    <div class="project-body">
        <p>Project description goes here...</p>
    </div>
    <div class="project-footer">
        <a href="#" class="btn project-btn">View Project</a>
    </div>
</div>
```

### Adding Profile Image

To replace the placeholder icon with an actual profile image:

1. Add your image to the `images` directory
2. Modify the hero section in `index.html`:

```html
<div class="hero-image">
    <img src="images/your-profile-image.jpg" alt="Jaydeep Raj">
</div>
```

## Browser Compatibility

This portfolio is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

This project is available for personal and commercial use.

## Author

- Jaydeep Raj
- Email: jaydeeprajtech@gmail.com 

## Performance Considerations

### 3D Elements and Performance

The portfolio includes several 3D elements that enhance the user experience. To ensure optimal performance:

1. All 3D renderings are paused when not in the viewport using Intersection Observer
2. Lower-end devices will still function properly as the 3D elements are non-critical overlays
3. Most animations are hardware-accelerated for smooth performance
4. The library files are loaded from CDNs with appropriate caching

If you notice performance issues on lower-end devices, you can disable specific 3D elements by commenting out their script tags in the index.html file. 