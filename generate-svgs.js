const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'assets', 'github');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Common SVG components
const neonGradient = `
    <linearGradient id="neon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <linearGradient id="neon-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.3" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
`;

const fontFamily = `font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"`;

function createTitleSvg(filename, text) {
    const width = 800;
    const height = 80;
    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>${neonGradient}</defs>
        <text x="0" y="55" fill="url(#neon)" font-size="32" font-weight="bold" ${fontFamily} letter-spacing="2">${text}</text>
        <rect x="0" y="70" width="100" height="4" fill="url(#neon)" rx="2" />
        <rect x="0" y="70" width="100" height="4" fill="url(#neon)" rx="2" filter="url(#glow)" />
    </svg>`;
    fs.writeFileSync(path.join(outDir, filename), svg);
}

function createNameGradientSvg() {
    const svg = `<svg width="500" height="80" viewBox="0 0 500 80" xmlns="http://www.w3.org/2000/svg">
        <defs>${neonGradient}</defs>
        <text x="0" y="60" fill="url(#neon)" font-size="52" font-weight="900" ${fontFamily}>I'm Surendra Kumar M</text>
    </svg>`;
    fs.writeFileSync(path.join(outDir, 'name-gradient.svg'), svg);
}

function createRoleBadgeSvg() {
    const svg = `<svg width="350" height="46" viewBox="0 0 350 46" xmlns="http://www.w3.org/2000/svg">
        <defs>${neonGradient}</defs>
        <rect x="2" y="2" width="346" height="42" rx="21" fill="#161b22" stroke="url(#neon)" stroke-width="2" />
        <text x="175" y="29" fill="#c9d1d9" font-size="16" font-weight="600" text-anchor="middle" ${fontFamily}>React Native / Frontend Developer</text>
    </svg>`;
    fs.writeFileSync(path.join(outDir, 'role-badge.svg'), svg);
}

function createTechStackSvg() {
    const width = 800;
    const height = 440;
    const cards = [
        { title: "Frontend", x: 0, y: 0, items: ["React.js", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5 / CSS3"] },
        { title: "Mobile", x: 275, y: 0, items: ["React Native", "Expo", "Expo Router", "React Navigation", "Emotion"] },
        { title: "State Management", x: 550, y: 0, items: ["Redux Toolkit", "RTK Query", "Redux Persist", "AsyncStorage"] },
        { title: "APIs & Backend", x: 0, y: 220, items: ["Node.js", "Express.js", "Axios", "REST APIs", "Django REST APIs"] },
        { title: "Integrations", x: 275, y: 220, items: ["Firebase / FCM", "Stripe", "Socket.IO", "Vision Camera", "ML Kit", "WebView", "Text-to-Speech"] },
        { title: "Tools", x: 550, y: 220, items: ["Git", "GitHub", "GitLab", "Bitbucket", "Jira", "VS Code", "SonarQube", "APPtim"] }
    ];

    let cardsSvg = '';
    for (const card of cards) {
        cardsSvg += `<g transform="translate(${card.x}, ${card.y})">
            <rect width="240" height="200" rx="12" fill="#161b22" stroke="url(#neon-subtle)" stroke-width="1.5" />
            <text x="20" y="35" fill="#58a6ff" font-size="16" font-weight="bold" ${fontFamily}>${card.title}</text>
            <rect x="20" y="48" width="40" height="2" fill="url(#neon)" />
            `;
        let itemY = 75;
        for (const item of card.items) {
            cardsSvg += `<circle cx="25" cy="${itemY - 5}" r="3" fill="#8b5cf6" />`;
            cardsSvg += `<text x="38" y="${itemY}" fill="#c9d1d9" font-size="14" ${fontFamily}>${item}</text>`;
            itemY += 22;
        }
        cardsSvg += `</g>`;
    }

    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>${neonGradient}</defs>
        ${cardsSvg}
    </svg>`;
    fs.writeFileSync(path.join(outDir, 'tech-stack.svg'), svg);
}

function createProjectCardSvg(filename, title, descLines, features, tags, isPrivate, link1, link2) {
    const width = 800;
    const height = 240;
    
    let featuresHtml = '';
    let fY = 100;
    let col = 0;
    for (const f of features) {
        let fX = 30 + (col * 240);
        featuresHtml += `<circle cx="${fX + 5}" cy="${fY - 4}" r="3" fill="#3b82f6" />`;
        featuresHtml += `<text x="${fX + 15}" y="${fY}" fill="#8b949e" font-size="13" ${fontFamily}>${f}</text>`;
        fY += 22;
        if (fY > 150) {
            fY = 100;
            col++;
        }
    }

    let tagsHtml = '';
    let tX = 30;
    for (const tag of tags) {
        tagsHtml += `<rect x="${tX}" y="175" width="${tag.length * 8 + 16}" height="24" rx="12" fill="#21262d" />`;
        tagsHtml += `<text x="${tX + (tag.length * 8 + 16)/2}" y="192" fill="#c9d1d9" font-size="12" font-weight="500" text-anchor="middle" ${fontFamily}>${tag}</text>`;
        tX += (tag.length * 8 + 16) + 8;
    }

    let privateBadge = isPrivate ? `<rect x="680" y="25" width="90" height="24" rx="12" fill="#21262d" stroke="#8b5cf6" stroke-width="1" />
        <text x="725" y="42" fill="#c9d1d9" font-size="12" font-weight="600" text-anchor="middle" ${fontFamily}>Private</text>` : '';

    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>${neonGradient}</defs>
        <rect x="2" y="2" width="796" height="236" rx="16" fill="#161b22" stroke="url(#neon-subtle)" stroke-width="2" />
        
        <text x="30" y="45" fill="#58a6ff" font-size="22" font-weight="bold" ${fontFamily}>${title}</text>
        ${privateBadge}
        
        <text x="30" y="72" fill="#c9d1d9" font-size="15" ${fontFamily}>${descLines}</text>
        
        ${featuresHtml}
        ${tagsHtml}
    </svg>`;
    
    fs.writeFileSync(path.join(outDir, filename), svg);
}

function createHighlightsSvg() {
    const width = 800;
    const height = 260;
    const cards = [
        { title: "Cross-Platform", desc: "Android & iOS development", x: 0, y: 0 },
        { title: "Reusable Architecture", desc: "Components, custom hooks, shared business logic", x: 410, y: 0 },
        { title: "Native Integrations", desc: "Firebase, Stripe, Vision Camera, Socket.IO, etc.", x: 0, y: 90 },
        { title: "Performance", desc: "90+ FPS ESG Framework optimization", x: 410, y: 90 },
        { title: "Production Engineering", desc: "Debugging, QA collaboration, release validation", x: 0, y: 180 },
        { title: "Monorepo", desc: "Shared web/mobile architecture", x: 410, y: 180 }
    ];

    let cardsSvg = '';
    for (const card of cards) {
        cardsSvg += `<g transform="translate(${card.x}, ${card.y})">
            <rect width="390" height="70" rx="10" fill="#161b22" stroke="#30363d" stroke-width="1" />
            <!-- glow line left -->
            <rect x="0" y="15" width="4" height="40" rx="2" fill="url(#neon)" />
            <text x="20" y="32" fill="#58a6ff" font-size="16" font-weight="bold" ${fontFamily}>${card.title}</text>
            <text x="20" y="52" fill="#8b949e" font-size="14" ${fontFamily}>${card.desc}</text>
        </g>`;
    }

    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>${neonGradient}</defs>
        ${cardsSvg}
    </svg>`;
    fs.writeFileSync(path.join(outDir, 'engineering-highlights.svg'), svg);
}

function createQuoteSvg() {
    const width = 800;
    const height = 100;
    const svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>${neonGradient}</defs>
        <rect x="0" y="0" width="${width}" height="${height}" rx="12" fill="transparent" />
        <text x="400" y="45" fill="#c9d1d9" font-size="18" font-style="italic" text-anchor="middle" ${fontFamily}>"Building products that create real value through clean code,</text>
        <text x="400" y="75" fill="#c9d1d9" font-size="18" font-style="italic" text-anchor="middle" ${fontFamily}>scalable architecture, and continuous learning."</text>
    </svg>`;
    fs.writeFileSync(path.join(outDir, 'quote.svg'), svg);
}


createTitleSvg('title-tech.svg', 'TECH STACK');
createTitleSvg('title-projects.svg', 'FEATURED PROJECTS');
createTitleSvg('title-highlights.svg', 'ENGINEERING HIGHLIGHTS');
createTitleSvg('title-stats.svg', 'GITHUB ACTIVITY');
createTitleSvg('title-connect.svg', 'CONNECT WITH ME');

createNameGradientSvg();
createRoleBadgeSvg();
createTechStackSvg();
createHighlightsSvg();
createQuoteSvg();

createProjectCardSvg('project-natter.svg', 
    'Natter — Secure Real-Time Messaging',
    'Full-stack real-time messaging platform with Node.js & Socket.IO.',
    ['Authentication', 'Real-time messaging', 'Online presence', 'Typing indicators', 'Read receipts', 'Unread notifications', 'Image sharing', 'Google Sign-In', 'AES-256-GCM encrypted storage'],
    ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO'],
    false
);

createProjectCardSvg('project-shopsphere.svg', 
    'ShopSphere — E-Commerce Mobile App',
    'Cross-platform e-commerce mobile application built with React Native & Expo.',
    ['Authentication', 'Product discovery', 'Cart & Wishlist', 'Stripe payments', 'Barcode scanning', 'Real-time chat', 'Redux state', 'Expo Router navigation'],
    ['React Native', 'Expo', 'TypeScript', 'Redux Toolkit', 'RTK Query'],
    false
);

createProjectCardSvg('project-mutual-funds.svg', 
    'Mutual Funds Platform (Professional)',
    'Production web and mobile ecosystem built with a monorepo architecture.',
    ['Reusable components', 'Shared business logic', 'CMS-driven content', 'REST API integration', 'Android/iOS app', 'Deep linking', 'Text-to-Speech', 'Accessibility', '90+ FPS optimization'],
    ['React Native', 'Next.js', 'TypeScript', 'Monorepo', 'Expo'],
    true
);

console.log('SVGs generated successfully.');
