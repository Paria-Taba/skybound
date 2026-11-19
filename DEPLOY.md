# Publish SKYBOUND on GitHub Pages

1. Push the deployment workflow, .gitignore and updated RealmPreview.jsx to main.
2. In https://github.com/Paria-Taba/skybound/settings/pages select **GitHub Actions** under **Build and deployment > Source**.
3. Open **Actions > Deploy SKYBOUND to GitHub Pages**. A push to main starts it automatically; use **Run workflow** if Pages was enabled after the push.
4. Wait for the deployment to complete. The expected URL is https://paria-taba.github.io/skybound/ . The URL is not live merely because these files exist locally.

The workflow runs npm ci and builds the current source into dist using the base path returned by GitHub Pages. It deploys the fresh build, rather than the previously committed dist directory. Both the game and realm-preview.html are included. Images and audio keep their original quality.

.gitignore prevents new dependency/build files being added. It does not remove files already tracked in Git. Existing tracked node_modules and dist can be cleaned from Git separately; that is not required to publish using this workflow.

Local verification: npm run build -- --base=/skybound/ --outDir dist-pages-check

Official guides:
- https://vite.dev/guide/static-deploy#github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages


## Custom domain: skybound.pariyatech.se

1. Settings > Pages > Source: GitHub Actions.
2. Custom domain: skybound.pariyatech.se, then Save.
3. At the DNS provider for pariyatech.se create CNAME host skybound, target paria-taba.github.io (no scheme or /skybound path).
4. Commit/push the updated workflow. Configure Pages now supplies base_path before build, so custom domains build with / and the default repository URL builds with /skybound/ automatically.
5. After DNS verification and certificate provisioning, enable Enforce HTTPS. No CNAME file is required for this custom Actions workflow.

Official reference: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
