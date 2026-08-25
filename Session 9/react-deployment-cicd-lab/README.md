# React Deployment & CI/CD Lab

This is a simple React + Vite project for the deployment assignment. It is intentionally separate from a capstone project.

## 1. Netlify deployment

### Local test
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```

The production folder is `dist`.

### Netlify
Option A: Connect the GitHub repository to Netlify.
- Build command: `npm run build`
- Publish directory: `dist`

Option B: Use Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
netlify init
npm run build
netlify deploy --prod --dir=dist
```

After deployment, verify that the homepage says **React Deployment Test**.

> The live URL must be generated from your own Netlify account. This project cannot create or claim a live URL for you.

## 2. Firebase Hosting

Install Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
```

Build the React app:
```bash
npm run build
```

Initialize Hosting:
```bash
firebase init hosting
```

When asked for the public directory, enter:
```text
dist
```

If Firebase asks whether this is a single-page app, choose **Yes**.

The included `firebase.json` already uses:
- `public: dist`
- rewrite `**` → `/index.html`

Deploy:
```bash
firebase deploy
```

Then open the Hosting URL and verify the root URL loads the React app without a 404.

## 3. Custom domain on Netlify or Vercel

Use a domain/subdomain that you actually own or control.

### Netlify
1. Open your site in Netlify.
2. Go to Domain management.
3. Add your custom domain.
4. Follow the DNS records Netlify provides.
5. Wait for DNS propagation.
6. Verify HTTPS and open the domain.

### Vercel
1. Import/deploy the project on Vercel.
2. Open Project Settings → Domains.
3. Add your domain/subdomain.
4. Add the DNS record shown by Vercel.
5. Wait for DNS propagation.
6. Open the domain and verify the app.

Do not use made-up domains or fake verification results in the assignment report.

## 4. CI/CD explanation

CI/CD stands for Continuous Integration and Continuous Delivery/Deployment. It automates parts of the software workflow such as testing, building, and releasing code. For React apps, a CI/CD pipeline can run tests and create a production build whenever code is pushed. It can also automatically deploy successful builds to Netlify, Vercel, or another hosting service.

Two benefits:
1. Automatic testing/builds reduce manual deployment mistakes.
2. Automatic deployments make future updates faster and repeatable.

## 5. ChatGPT/Copilot guide

### Prompt to paste
"Give me a step-by-step guide for deploying a React + Vite app to Netlify. Include the build command, publish directory, SPA routing configuration, and how to verify the deployment."

### Example AI-generated guide
1. Run `npm install`.
2. Run `npm run build`.
3. Confirm that a `dist` folder is created.
4. Create or log in to a Netlify account.
5. Import the GitHub repository or deploy the `dist` folder.
6. Set the build command to `npm run build`.
7. Set the publish directory to `dist`.
8. For SPA routing, add a redirect from `/*` to `/index.html` with status `200`.
9. Deploy the site.
10. Open the generated Netlify URL and verify the homepage.

### Expected-issue note
If a step does not work, record the actual error and what fixed it. Do not claim an issue occurred if it did not.

## Submission report template

- Netlify live URL: __________________________
- Homepage text verified: React Deployment Test
- Firebase Hosting URL: ______________________
- Firebase root route verified: Yes / No
- Custom domain: _____________________________
- Custom domain verified: Yes / No
- CI/CD explanation: included above
- Two CI/CD benefits: included above
- AI prompt: included above
- AI guide: included above
- Step that failed: ___________________________
- How it was fixed: ___________________________
