# Kushal — B.E CSE Student & Developer Portfolio

A modern, responsive, glass-minimalist and pixel-art-inspired personal developer portfolio website for **Kushal** (B.E CSE Student), showcasing foundational software projects, core technical skills (HTML, CSS, JavaScript, React, Python, Git & GitHub), interactive AI chat assistant, and contact form.

---

## 🌟 Live Demo & Profiles

* **GitHub Profile**: [https://github.com/kushaldkush29-web](https://github.com/kushaldkush29-web)
* **LinkedIn Network**: [https://www.linkedin.com/in/kushal-d-bb5b8a397](https://www.linkedin.com/in/kushal-d-bb5b8a397)

---

## 🛠️ Technologies Used

* **Frontend Structure**: Semantic HTML5 (Header, Nav, Main, Sections, Articles, Aside, Footer)
* **Styling**: Vanilla CSS3 (Custom Properties / CSS Variables, Flexbox, CSS Grid, Pixel-Art HUD borders, CRT Scanline & Ambient Canvas effects)
* **Scripting & Logic**: Vanilla JavaScript (ES6+, DOM Manipulation, Web Audio API Sound Synthesizer, IntersectionObserver Scrollspy, Form Validation)
* **Typography**: Google Fonts (`Press Start 2P`, `VT323`, `Chakra Petch`, `Space Grotesk`)
* **Core Skill Focus**: HTML5, CSS3, JavaScript, React, Python, Git & GitHub

---

## 📁 Project Structure

```
kush/
├── index.html              # Main semantic HTML structure
├── css/
│   └── style.css           # Modular stylesheet with themes & animations
├── js/
│   └── script.js           # Interactive controller, sound FX, AI chat & validation
├── assets/
│   ├── avatar.jpg          # Kushal's developer profile image
│   ├── project1.jpg        # Neural Link AI Telemetry screenshot
│   ├── project2.jpg        # Cybernetic City Simulation screenshot
│   └── project3.jpg        # Quantum Crypto Ledger screenshot
├── style.css               # Root fallback stylesheet
├── app.js                  # Root fallback script
└── README.md               # Documentation & deployment guide
```

---

## 🚀 Local Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kushaldkush29-web/portfolio.git
   cd portfolio
   ```

2. **Run locally**:
   * Double-click `index.html` to open it in any web browser, or
   * Use VS Code *Live Server* extension, or
   * Run a simple local server:
     ```bash
     # Using Python
     python -m http.server 3000
     
     # Or using Node.js / npx
     npx serve .
     ```
   * Open `http://localhost:3000` in your browser.

---

## ⚙️ Customization Guide

### 1. Updating the YouTube Video Showcase
In `index.html`, locate the `<!-- ==================== 7. EMBEDDED YOUTUBE VIDEO SECTION ==================== -->` section (around line 340):
```html
<iframe 
  class="youtube-iframe"
  src="https://www.youtube-nocookie.com/embed/YOUR_YOUTUBE_VIDEO_ID?rel=0&modestbranding=1" 
  title="Kushal Developer Portfolio Video Showcase" 
  allowfullscreen>
</iframe>
```
Replace `YOUR_YOUTUBE_VIDEO_ID` with your own YouTube video ID (e.g. `dQw4w9WgXcQ`).

### 2. Updating Projects Data
Project cards in `index.html` link directly to modal view data defined in `js/script.js` (inside `const projectData` around line 200). You can easily edit titles, descriptions, tags, and GitHub URLs.

### 3. Updating Testimonials
In `index.html`, locate the `#testimonials` section to replace the clearly marked placeholder cards with your real peer or client recommendations.

### 4. Connecting a Live AI Chat Backend
The interactive AI chat currently runs a client-side simulation. To connect a live LLM (OpenAI, Gemini, Anthropic):
1. Create a secure serverless endpoint (e.g., Next.js API route `/api/chat`, Cloudflare Worker, or AWS Lambda).
2. Store your API Key securely in server environment variables (**NEVER expose API keys in frontend JavaScript**).
3. In `js/script.js` inside `handleUserMessage()`, send a `fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message }) })` and render the streamed response.

### 5. Connecting a Form Email Service (e.g., Resend / Formspree)
In `index.html`, you can connect the form to [Formspree](https://formspree.io) by setting `action="https://formspree.io/f/YOUR_FORM_ID"` or forward submissions via a secure backend endpoint using [Resend](https://resend.com).

---

## 🌐 GitHub Pages Deployment Guide

This portfolio is 100% static and optimized for zero-configuration deployment on **GitHub Pages**:

1. Push your files to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Kushal Developer Portfolio"
   git branch -M main
   git remote add origin https://github.com/kushaldkush29-web/portfolio.git
   git push -u origin main
   ```

2. Enable GitHub Pages:
   * Go to **Settings** > **Pages** in your repository.
   * Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   * Select `main` branch and `/ (root)` folder, then click **Save**.
   * Your portfolio will be live at `https://kushaldkush29-web.github.io/portfolio/`.

---

## 🛡️ Security & Privacy Notice
* Static hosts like GitHub Pages cannot securely host secret environment variables or API keys. Any third-party AI or email integration requiring private credentials must be routed through an authenticated serverless backend.
* Footer social links are strictly limited to **GitHub** and **LinkedIn**. No Twitter/X or YouTube icons are present in the footer.

---

## 📄 License
MIT License © 2026 Kushal. Built with pride and pixel precision.
