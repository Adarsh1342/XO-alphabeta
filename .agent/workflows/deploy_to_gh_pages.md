---
description: How to deploy the XO game to GitHub Pages
---

# Deploying to GitHub Pages

Follow these steps to deploy your XO game to GitHub Pages.

## Prerequisites
- You must have a GitHub account.
- You must have Git installed on your machine.

## Steps

1.  **Initialize Git (if not already done)**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Create a GitHub Repository**:
    - Go to [GitHub.com](https://github.com) and create a new repository.
    - Name it whatever you like (e.g., `xo-game`).

3.  **Link Local Repo to GitHub**:
    - Copy the commands provided by GitHub after creating the repo. They will look like this:
    ```bash
    git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
    git branch -M main
    git push -u origin main
    ```

4.  **Update Configuration**:
    - Open `vite.config.js`.
    - Replace `<REPO_NAME>` with the name of your repository (e.g., `xo-game`).
    ```javascript
    export default defineConfig({
      plugins: [react()],
      base: '/xo-game/', // Example
    })
    ```

5.  **Deploy**:
    - Run the deployment script:
    ```bash
    npm run deploy
    ```

6.  **Verify**:
    - Go to your GitHub repository settings -> Pages.
    - You should see your deployed site link (e.g., `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`).
