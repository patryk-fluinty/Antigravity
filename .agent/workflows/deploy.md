---
description: How to deploy the Fluinty CRM to Vercel
---

# Deploying to Vercel

Vercel is the easiest way to deploy Vite + React applications.

## Prerequisites
- A [Vercel account](https://vercel.com/signup).
- The `vercel` CLI installed (optional, but recommended).

## Method 1: Using the Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   Run the following command in your project root:
   ```bash
   vercel
   ```
   - Follow the prompts (accept defaults for most).
   - For "Which scope do you want to deploy to?", choose your account.
   - For "Link to existing project?", choose "No".
   - For "Project Name", use `fluinty-crm` or similar.
   - **IMPORTANT**: When asked "Want to modify these settings?", say **No** initially. We will add env vars next.

4. **Set Environment Variables**:
   Once the project is created, you need to add your Supabase credentials so the production app can access the database.
   
   Run:
   ```bash
   vercel env add VITE_SUPABASE_URL
   ```
   (Paste your URL when prompted, choose `Production`, `Preview`, and `Development`)

   Run:
   ```bash
   vercel env add VITE_SUPABASE_ANON_KEY
   ```
   (Paste your Key when prompted)

5. **Redeploy**:
   To make the changes take effect:
   ```bash
   vercel --prod
   ```

## Method 2: Using the Vercel Dashboard (Git Integration)

1. Push your code to a GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository.
4. In the **Configure Project** step:
   - Expand **Environment Variables**.
   - Add `VITE_SUPABASE_URL` and your value.
   - Add `VITE_SUPABASE_ANON_KEY` and your value.
5. Click **Deploy**.

Your app will be live at `https://your-project-name.vercel.app`!
