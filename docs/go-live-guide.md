# MG Headhunting (MGH) — Platform Go-Live & Launch Guide

**Target Live Domain**: `https://www.mgheadhunting.co.uk` (Apex: `mgheadhunting.co.uk`)  
**Hosting Infrastructure**: Netlify Edge CDN  
**Content Engine**: Contentful Headless CMS (Space: `hssdcxeme8fc`)  
**Audience**: Technical Administrator / Lead Developer executing launch with client credentials  

---

## Executive Overview

This playbook details the exact, step-by-step procedure to transition the MG Headhunting digital platform from its current staging environment (`mgheadhunting.netlify.app`) to live production on `www.mgheadhunting.co.uk`.

---

## Phase 1: DNS & Domain Setup (Registrar)

Using the client's domain registrar credentials (e.g. GoDaddy, Namecheap, 123 Reg, Cloudflare, Google Domains):

### 1. Configure DNS Records

Navigate to the **DNS Management / Zone Editor** for `mgheadhunting.co.uk`:

| Record Type | Host / Name | Target / Value | TTL | Note |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (or blank) | `75.2.60.5` | 3600 (or Automatic) | Netlify Load Balancer Apex IP |
| **CNAME** | `www` | `mgheadhunting.netlify.app.` | 3600 (or Automatic) | Points `www` subdomain to Netlify CDN |

> [!NOTE]
> If existing `@` or `www` `A` or `CNAME` records point to an old parking page or temporary host, remove or update them to the values above. Do not alter MX records (email services like Microsoft 365 or Google Workspace must remain untouched).

### 2. Verify DNS Propagation

From your terminal, verify the records resolve correctly:
```bash
dig www.mgheadhunting.co.uk CNAME +short
# Expected output: mgheadhunting.netlify.app.

dig mgheadhunting.co.uk A +short
# Expected output: 75.2.60.5
```

---

## Phase 2: Netlify Custom Domain & SSL Configuration

Using the client or project credentials on [Netlify](https://app.netlify.com/):

### 1. Add Custom Domain

1. Open the **`mgheadhunting`** site overview in Netlify.
2. Go to **Site configuration** > **Domain management** > **Custom domains**.
3. Click **Add a domain** and enter `www.mgheadhunting.co.uk`.
4. Netlify will prompt to add both `www.mgheadhunting.co.uk` and `mgheadhunting.co.uk`. Select **Yes, add domain**.
5. Set `www.mgheadhunting.co.uk` as the **Primary domain** (Netlify will automatically redirect apex `mgheadhunting.co.uk` to `www.mgheadhunting.co.uk` with a 301 permanent redirect).

### 2. Provision SSL / TLS Certificate

1. In **Domain management** > **HTTPS**, click **Verify DNS configuration**.
2. Once Netlify verifies the DNS records, click **Provision certificate** (Let's Encrypt).
3. Verify that **Force HTTPS** is enabled.

---

## Phase 3: Production Environment Variables in Netlify

In the Netlify dashboard under **Site configuration** > **Environment variables**:

1. Ensure the following production variables are set:

| Variable | Recommended Production Value | Purpose |
| :--- | :--- | :--- |
| `SITE_ENV` | `production` | Switches Next.js from staging dynamic mode to high-performance static ISR |
| `NEXT_PUBLIC_SITE_ENV` | `production` | Ensures client-side analytics and components know it is live production |
| `NEXT_PUBLIC_SITE_URL` | `https://www.mgheadhunting.co.uk` | Canonical URLs, sitemap, OpenGraph tags, and SEO |
| `NEXT_PUBLIC_CONTENTFUL_SPACE_ID` | `hssdcxeme8fc` | Contentful Space ID |
| `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` | *(Client CDA Token)* | Content Delivery API read token |
| `CONTENTFUL_MANAGEMENT_TOKEN` | *(Client CMA Token)* | Optional: for running automated CMS patches |

2. Trigger a fresh deployment: **Deploys** > **Trigger deploy** > **Deploy site**.

---

## Phase 4: Contentful CMS Production Checklist

In the [Contentful App](https://app.contentful.com/) (Space `hssdcxeme8fc`, Environment `master`):

### 1. Review & Publish Draft Entries

1. Filter the Content list by **Status: Draft** and **Status: Changed**.
2. For any entries the client has edited, click **Publish changes**.
3. Ensure the `siteSettings` and `homepage` entries are published.

### 2. Optional: Run Surgical Contentful Patch Script

If you have the client's `CONTENTFUL_MANAGEMENT_TOKEN` configured in your `.env.local`:
```bash
npm run contentful:patch
```
*This script is 100% non-destructive: it safely updates only `siteSettings.navLinks` and the disclosure protocol heading without overwriting any custom text or articles.*

---

## Phase 5: Netlify Forms & Lead Notification Setup

In the Netlify dashboard:

1. Go to **Site configuration** > **Forms** > **Form notifications**.
2. For the form **`initiate-search-mandate`**:
   - Add email notification to `mgoldsmith@mgheadhunting.co.uk` (or the client's designated intake inbox).
   - Set subject line: `[MG Headhunting] New Confidential Mandate Briefing`.
3. Submit a test briefing on the live site to confirm email receipt and lead capture.

---

## Phase 6: Post-Launch Quality Assurance (QA) Checklist

Verify the live production URL (`https://www.mgheadhunting.co.uk`):

- [ ] **Header Navigation**:
  - Desktop: Wordmark displays cleanly; links include Specialisms, The Difference, Search Process, Market Intelligence; **no 'About' or 'About Mark Goldsmith' link**.
  - Mobile Drawer: Opens cleanly; no 'About' link; direct email & contact button visible.
- [ ] **Call to Action & Intake Modal**:
  - Clicking any "Start the Conversation" button opens modal titled **"Initiate Confidential Conversation"**.
  - **No "Sector Specialism Focus"** dropdown is present.
  - Dropdown titled **"Function Required"** contains:
    - `C-Suite / MD`
    - `Sales / Commercial`
    - `Finance`
    - `Operations / Technical`
    - `HR`
    - `Other`
  - Submitting a test mandate shows confirmation with selected Function Required.
- [ ] **Bottom Footer Section**:
  - The disclosure box heading displays **"Assignment Disclosure Protocol"**.
  - Direct telephone (`07570 740490`) and email (`mgoldsmith@mgheadhunting.co.uk`) links dial/open correctly.
  - Mark Goldsmith seated photo renders sharply.
  - Privacy policy link routes to `/privacy`.
- [ ] **Security & SEO**:
  - HTTPS padlock is green and valid.
  - `https://www.mgheadhunting.co.uk/robots.txt` and `https://www.mgheadhunting.co.uk/sitemap.xml` resolve.
  - Google Analytics / GTM tags fire upon cookie consent.
