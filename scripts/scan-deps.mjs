import fs from 'fs';

// 1. Get file path from command line
const filePath = process.argv[2];
if (!filePath) {
  console.log("Usage: node scan-deps.mjs <path-to-file>");
  process.exit(1);
}

// 2. Read the file
const content = fs.readFileSync(filePath, 'utf-8');

// 3. Regex to find imports
// Matches: import ... from "package" AND const x = require("package")
const regex = /from\s+['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\)/g;
const packages = new Set();

let match;
while ((match = regex.exec(content)) !== null) {
  const dep = match[1] || match[2];
  
  // 4. Filter out local files (starting with . or /)
  if (!dep.startsWith('.') && !dep.startsWith('/')) {
    
    // 5. Handle scoped packages (e.g., @react-three/fiber -> @react-three/fiber)
    // vs deep imports (e.g., langchain/text_splitter -> langchain)
    let pkgName = dep;
    if (dep.startsWith('@')) {
      // Keep the first two parts (@scope/pkg)
      pkgName = dep.split('/').slice(0, 2).join('/');
    } else {
      // Keep only the first part (pkg)
      pkgName = dep.split('/')[0];
    }
    packages.add(pkgName);
  }
}

// 6. Print the Magic Command
console.log("\n📦 Found Dependencies:");
console.log([...packages].join('\n'));
console.log("\n🚀 Run this to install:");
console.log(`npm install ${[...packages].join(' ')}`);


// How to use it: If you want to copy src/components/ChatInterface.jsx to a new project:
// Copy the file to the new project.
// Run: node scripts/scan-deps.mjs src/components/ChatInterface.jsx
// It will output:
// 🚀 Run this to install:
// npm install framer-motion socket.io-client react