=============================================================================
VALOR M&A ENGINE — CLOUDFLARE PAGES DEPLOYMENT PROMPT
Claude Opus 4.6 (Thinking) | Google Antigravity
"Courage Meets Capital"
=============================================================================

YOU ARE DEPLOYING: VALOR M&A Engine to Cloudflare Pages.

The engine is a React 19 + Vite 6 single-page application that has passed
83/83 automated financial tests and is fully ready for production deployment.

Your job is to:
  1. Verify the production build is clean and error-free
  2. Configure all necessary deployment files correctly
  3. Push the final code to GitHub
  4. Configure Cloudflare Pages build settings
  5. Verify the live deployment is working correctly

DO NOT modify any financial calculation files. Do not touch:
  src/hooks/useMergerCalculations.js
  src/hooks/useSynergyCalculations.js
  src/hooks/useLBOCalculations.js
  src/context/DealContext.jsx
  src/constants/egyptParams.js

These files contain verified financial formulas. They must not be changed.

=============================================================================
SECTION 1: PROJECT DETAILS
=============================================================================

Project Name:        VALOR M&A Engine
Framework:           React 19 + Vite 6
Package Manager:     npm
Build Command:       npm run build
Output Directory:    dist
Node Version:        18 (minimum) — REQUIRED for React 19 + Vite 6
GitHub Repo Name:    valor-ma-engine
Cloudflare URL:      valor-ma-engine.pages.dev
Branch:              main

=============================================================================
SECTION 2: PRE-DEPLOYMENT CHECKLIST — RUN THESE FIRST
=============================================================================

Before touching GitHub or Cloudflare, verify the following in the terminal:

STEP 2A — Clean install:

  cd [project root — wherever package.json lives]
  rm -rf node_modules
  npm install

  Expected: No errors. node_modules/ is recreated cleanly.
  If you see peer dependency warnings for React 19: this is normal.
  If you see ERROR or FAILED: stop and fix the dependency before continuing.

STEP 2B — Run production build:

  npm run build

  Expected output:
    ✓ built in [X]s
    dist/index.html
    dist/assets/index-[hash].js
    dist/assets/index-[hash].css
    dist/favicon.svg (if present in public/)

  Zero errors allowed. Zero.
  If Vite reports any error: fix it before proceeding.

  Common errors to fix if they appear:
    - "Cannot find module X" → run: npm install X
    - "Tailwind config error" → check tailwind.config.js syntax
    - "JSX transform error" → verify vite.config.js has React plugin

STEP 2C — Verify dist/ folder contents:

  List the dist/ directory and confirm it contains:
    dist/index.html          ← Must exist
    dist/assets/             ← Must contain .js and .css files
    dist/favicon.svg         ← Must exist (VALOR favicon)

  If dist/index.html is missing: the build failed silently. Re-run build.

STEP 2D — Check index.html favicon and title:

  Open dist/index.html and verify it contains:
    <title>VALOR M&A Engine</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

  If title is wrong (e.g., "Vite App" or old engine name):
    Open the SOURCE index.html (not in dist/) and fix it there.
    Then re-run npm run build.

=============================================================================
SECTION 3: CONFIGURE VITE FOR CLOUDFLARE PAGES
=============================================================================

Cloudflare Pages serves files from the dist/ folder at the root URL.
Vite must be configured correctly so that:
  - All asset paths are relative (not absolute)
  - React Router (if used) falls back to index.html on any route
  - No hardcoded localhost URLs exist in the build

STEP 3A — Verify vite.config.js:

  Open vite.config.js and confirm it contains the following.
  If any of these are missing or wrong, fix them:

  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            recharts: ['recharts'],
          }
        }
      }
    },
    server: {
      port: 5173,
    }
  })

  KEY SETTINGS EXPLAINED:
    base: '/'         → Tells Vite all assets load from root URL
    sourcemap: false  → Smaller files, no source exposure in production
    manualChunks      → Splits vendor libraries for faster loading

STEP 3B — Create _redirects file for SPA routing:

  Cloudflare Pages does not automatically handle single-page app routing.
  Without this file, any direct URL (e.g., valor-ma-engine.pages.dev/merger)
  will return a 404 error.

  Create the file: public/_redirects

  Content — exactly one line:
  /*    /index.html   200

  This tells Cloudflare: "For any URL, serve index.html with 200 status."
  This allows React's client-side router to handle all navigation.

  After creating this file, re-run:
    npm run build

  Verify dist/_redirects exists in the output.

STEP 3C — Create .nvmrc file (Node version lock):

  Create the file: .nvmrc

  Content — exactly one line:
  18

  This tells Cloudflare Pages to use Node 18 when building.

=============================================================================
SECTION 4: PREPARE GITHUB REPOSITORY
=============================================================================

STEP 4A — Check if .gitignore is correct:

  Verify .gitignore exists and contains AT MINIMUM:
    node_modules/
    dist/
    .env
    .env.local
    .DS_Store
    *.log

  If .gitignore is missing: create it with the content above.

  IMPORTANT: dist/ must be in .gitignore.
  We do NOT commit the build output to GitHub.
  Cloudflare Pages will build it fresh from source.

STEP 4B — Create the GitHub repository:

  Option A — If not yet on GitHub:
    Go to github.com → New repository
    Repository name: valor-ma-engine
    Visibility: Private (recommended for financial tools)
    Do NOT add README, .gitignore, or license (we already have these)
    Click "Create repository"

  Option B — If repository already exists:
    Skip to Step 4C.

STEP 4C — Initialize Git and push:

  Run these commands in the project root:

  git init
  git add .
  git commit -m "VALOR M&A Engine v1.0.0 - Production Ready

  - 83/83 automated tests passing
  - All 9 modules implemented
  - Egypt-specific parameters (CBE, FRA, ECA, Labor Law)
  - Valor Shield mark logo + favicon
  - Cloudflare Pages deployment config"

  git branch -M main
  git remote add origin https://github.com/YOUR_GITHUB_USERNAME/valor-ma-engine.git
  git push -u origin main

  Replace YOUR_GITHUB_USERNAME with your actual GitHub username.

  Expected: "Branch 'main' set up to track remote branch 'main' from 'origin'."

  If git push fails with "remote already exists":
    git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/valor-ma-engine.git
    git push -u origin main

  If git push fails with authentication error:
    Use a GitHub Personal Access Token instead of password.
    Go to: github.com → Settings → Developer settings → Personal access tokens
    Generate token with "repo" scope.
    Use token as the password when prompted.

STEP 4D — Verify GitHub:

  Go to github.com/YOUR_USERNAME/valor-ma-engine
  Confirm you can see:
    src/ folder
    public/ folder with favicon.svg and _redirects
    package.json
    vite.config.js
    .nvmrc
    index.html (NOT in a subfolder — at root level)

  If index.html is NOT at root level: Vite build is misconfigured.

=============================================================================
SECTION 5: CLOUDFLARE PAGES SETUP
=============================================================================

STEP 5A — Log in to Cloudflare:

  Go to: https://dash.cloudflare.com
  Log in with your Cloudflare account.
  If you don't have an account: sign up free at cloudflare.com

STEP 5B — Create new Pages project:

  In the Cloudflare dashboard:
    1. Click "Pages" in the left sidebar
    2. Click "Create a project"
    3. Click "Connect to Git"
    4. Authorize Cloudflare to access your GitHub account
       (click "Add account" if it's not connected yet)
    5. Find and select: valor-ma-engine
    6. Click "Begin setup"

STEP 5C — Configure build settings (CRITICAL — enter EXACTLY):

  Project name:              valor-ma-engine
  Production branch:         main
  Framework preset:          None  ← Select "None", NOT "Vite"
  Build command:             npm run build
  Build output directory:    dist
  Root directory:            /  ← Leave as default (slash)

  DO NOT select "Vite" from the framework preset dropdown.
  The Vite preset sometimes overrides settings incorrectly.
  Setting "None" and entering the commands manually is safer.

STEP 5D — Set environment variables:

  Still on the same setup page, scroll to "Environment variables":

  Click "Add variable" and enter:
    Variable name:   NODE_VERSION
    Value:           18

  This is REQUIRED. Without it, Cloudflare may use Node 16 or 20,
  which can cause build failures with React 19.

  Click "Save and Deploy"

STEP 5E — Watch the build log:

  Cloudflare will now:
    1. Clone your GitHub repository
    2. Install Node 18
    3. Run npm install
    4. Run npm run build
    5. Deploy dist/ to its global CDN

  Click "View build" to watch the live log.

  A successful build log will end with:
    ✓ Build Complete
    ✓ Deployed to valor-ma-engine.pages.dev

  BUILD FAILURE TROUBLESHOOTING:

  Error: "Cannot find module 'react'"
    Fix: In Cloudflare dashboard → Settings → Environment Variables
    Add: NPM_FLAGS = --legacy-peer-deps
    Then retry deployment.

  Error: "Node version incompatible"
    Fix: Verify NODE_VERSION = 18 is set in environment variables.
    Also verify .nvmrc file contains "18".

  Error: "Build output directory not found"
    Fix: Verify Build output directory is set to "dist" (not "build").

  Error: "Tailwind CSS not generating styles"
    Fix: Add BUILD_FLAGS environment variable = NODE_ENV=production

  Error: "Failed to install packages"
    Fix: Check package.json for any packages with incorrect version numbers.

=============================================================================
SECTION 6: POST-DEPLOYMENT VERIFICATION
=============================================================================

Once Cloudflare shows "Deployed", open:
  https://valor-ma-engine.pages.dev

Run each check below. If any fail, follow the fix instructions.

CHECK 1 — VALOR Logo (no swords):
  Expected: Shield mark + VALOR wordmark in gold
  Fix if failed: Re-apply the logo fix from the VALOR_EngineCheck_FixPrompt
                 then git add . && git commit && git push

CHECK 2 — Browser tab favicon:
  Expected: Small dark background with gold shield+V mark
  Expected tab title: "VALOR M&A Engine"
  Fix if failed: Verify public/favicon.svg exists and index.html
                 links to it correctly, then redeploy

CHECK 3 — Command Center loads:
  Expected: Dashboard with 6 KPI cards showing "—" (empty state)
  Subtitle: "Configure your transaction parameters to begin analysis."
  Fix if failed: Check browser console for JavaScript errors

CHECK 4 — Currency toggle:
  Click "EGP" in the top right corner.
  Expected: Switches to "USD" display
  Click again. Expected: Returns to "EGP"
  Fix if failed: Check DealContext.jsx currency reducer action

CHECK 5 — FX rate is editable:
  Expected: FX: 49.50 shown in navbar, clickable/editable
  Fix if failed: Check Navbar.jsx FX rate input handler

CHECK 6 — Merger Model opens:
  Click "Merger Model" in sidebar.
  Expected: Acquirer and Target input sections load
  Enter any number in "Revenue LTM" field.
  Expected: Value is accepted without error
  Fix if failed: Check MergerModel.jsx and InputField.jsx

CHECK 7 — Quick calculation test:
  In Merger Model, enter:
    Acquirer Shares Outstanding: 1000
    Acquirer Share Price: 10.00
    Target Shares Outstanding: 100
    Target Share Price: 20.00
    Offer Price Per Share: 25.00
    Cash %: 100
    Stock %: 0
  Expected outputs:
    Purchase Price: EGP 2,500M
    Premium Paid: 25.00%
  Fix if failed: Financial calculation is broken — do not deploy.
                 Check useMergerCalculations.js urgently.

CHECK 8 — PDF Dispatch:
  Click "Dispatch PDF" in the sidebar.
  Click the generate/download button.
  Expected: A PDF downloads named "VALOR_Deal_Memorandum_[date].pdf"
  Expected: PDF has VALOR header, gold branding, deal sections
  Fix if failed: Check DispatchPDF.jsx — jsPDF + html2canvas issue
  Note: PDF export may be slow on first run (html2canvas takes time).
        Wait at least 10 seconds before declaring it failed.

CHECK 9 — Mobile responsiveness:
  On the live URL, open browser DevTools → responsive mode.
  Check at 375px (iPhone SE) and 768px (iPad).
  Expected: Command Center and Merger Model are readable.
  Note: Full mobile optimization is Phase 2. Just confirm it doesn't
        break completely at mobile widths.

CHECK 10 — No console errors:
  Open browser DevTools → Console tab.
  Reload the page.
  Expected: Zero red errors.
  Yellow warnings about React 19 strict mode or recharts prop types
  are acceptable — these are library warnings, not your bugs.
  Fix if there are red errors: Address each one before user launch.

=============================================================================
SECTION 7: AUTOMATIC REDEPLOYMENT (CONTINUOUS DEPLOYMENT)
=============================================================================

After the initial setup, every future code change deploys automatically:

  # Make your changes to the code
  git add .
  git commit -m "Description of your change"
  git push origin main

  Cloudflare Pages detects the push and automatically:
    1. Rebuilds the project
    2. Deploys the new version
    3. Makes it live at valor-ma-engine.pages.dev

  Build time: approximately 1–3 minutes.
  The old version remains live until the new build completes.
  No downtime during redeployment.

  To check deployment status:
    Go to dash.cloudflare.com → Pages → valor-ma-engine → Deployments tab

=============================================================================
SECTION 8: CUSTOM DOMAIN (OPTIONAL — DO THIS AFTER INITIAL DEPLOYMENT)
=============================================================================

If you want valor.finance or valorengine.com instead of pages.dev URL:

  In Cloudflare Pages → Your project → Custom domains → "Set up a custom domain"
  Enter your domain: valor.finance (or whichever you own)
  Follow the DNS configuration steps shown.

  If your domain is registered at Cloudflare:
    DNS records update automatically.

  If your domain is at another registrar (GoDaddy, Namecheap, etc.):
    You'll need to add a CNAME record pointing to valor-ma-engine.pages.dev
    At your domain registrar's DNS settings.

  SSL/HTTPS is automatic — Cloudflare handles certificates for free.

=============================================================================
SECTION 9: FINAL DEPLOYMENT SUMMARY
=============================================================================

Summarize completion by confirming each item:

  □ Production build: npm run build → zero errors
  □ dist/index.html exists with correct title and favicon link
  □ public/_redirects created with: /*  /index.html  200
  □ .nvmrc created with: 18
  □ .gitignore includes node_modules/ and dist/
  □ Code pushed to GitHub: github.com/USERNAME/valor-ma-engine
  □ Cloudflare Pages project created: valor-ma-engine
  □ Build settings: command=npm run build, output=dist, preset=None
  □ Environment variable set: NODE_VERSION=18
  □ First deployment succeeded — no build errors
  □ Live URL working: https://valor-ma-engine.pages.dev
  □ All 10 post-deployment checks passed
  □ No red console errors on live URL

  LIVE URL: https://valor-ma-engine.pages.dev

  When all boxes are checked:
  VALOR M&A Engine is live and ready for use.

=============================================================================
END OF DEPLOYMENT PROMPT
VALOR M&A ENGINE | "Courage Meets Capital"
=============================================================================
