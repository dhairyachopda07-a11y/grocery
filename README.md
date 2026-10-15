# FreshBasket — Online Grocery Store

FreshBasket is a modern, responsive, full-featured online grocery storefront designed specifically for Indian households. Built with React, TypeScript, and Tailwind CSS, it features authentic Indian grocery products, realistic INR pricing, 2-hour express delivery options, a persistent cart, an interactive demo checkout, and a complete editorial section with 12 comprehensive food and nutrition guides.

---

## 🌟 Key Features

### 1. Storefront & Catalog
- **35+ Authentic Indian Grocery Products**: Farm-fresh Robusta bananas, Kolar tomatoes, Nashik onions, Royal aged Sharbati basmati rice, stone-ground whole wheat atta, unpolished Toor & Moong dals, Amul toned milk, malai paneer, farm eggs, Salem turmeric, Cold-pressed mustard oil, and Ratnagiri Alphonso mangoes.
- **8 Distinct Grocery Aisles**:
  1. Fresh Fruits & Vegetables
  2. Dairy, Paneer & Eggs
  3. Atta, Rice, Dal & Grains
  4. Spices, Masalas & Cooking Oils
  5. Snacks & Packaged Foods
  6. Beverages, Chai & Juices
  7. Bakery, Breads & Breakfast
  8. Organic & Healthy Foods
- **Real-Time Live Search**: Instant product suggestions dropdown matching titles, Hindi names, and tags.
- **Dynamic Filtering & Sorting**: Filter by category, today's deals, seasonal picks, max price range (₹30–₹500), and sort by popularity, price, discount, or customer rating.
- **Product Inspection Modal**: High-resolution photography, shelf life, storage instructions, origin details, and nutritional highlights.

### 2. Shopping & Cart Experience
- **Persistent Cart & Wishlist**: Stored in `localStorage` across page reloads.
- **Free Delivery Progress Indicator**: Visual progress bar toward the ₹499 free delivery threshold.
- **Coupon System**: Support for promotional coupons (`FRESH100` for ₹100 off, `WELCOME50` for ₹50 off, `HEALTH10` for 10% off).
- **Location Selector**: Delivery hub selection across Bengaluru, Mumbai, Delhi NCR, Hyderabad, and Pune.

### 3. Demo Checkout Flow
- **Indian Recipient Validation**: 10-digit mobile number and 6-digit PIN code validation.
- **Delivery Slots**: 2-Hour Express Delivery, Early Morning (7–10 AM), Afternoon (1–4 PM), and Evening (6–9 PM).
- **Payment Modes**: Pay on Delivery (Cash/UPI at doorstep) and Demo Netbanking.
- **Order Confirmation Receipt**: Unique order ID generation (`FB-XXXXXX`), confetti animation, itemized breakdown, and receipt summary.
- *Notice*: As a demo application, no real payment credentials or financial transactions are collected or processed.

### 4. FreshBasket Journal (12 Complete Articles)
1. **10 Essential Grocery Items Every Indian Kitchen Should Have**
2. **How to Keep Fruits and Vegetables Fresh for Longer: Storage Science**
3. **A Beginner's Guide to Healthy Grocery Shopping: Build a Balanced Basket**
4. **Seasonal Fruits in India: What to Buy and When for Peak Nutrition**
5. **How to Plan a Weekly Grocery Budget: Realistic Indian Household Guide**
6. **Organic vs. Conventional Produce: What Should You Know in India?**
7. **7 Easy Indian Breakfast Ideas Using Everyday Groceries in 20 Minutes**
8. **Understanding Food Labels Before You Buy: Decode Nutrition Panels**
9. **Smart Grocery Shopping Tips for Busy Families: Reclaim Your Weekends**
10. **How to Reduce Food Waste at Home: The FIFO Method & Scrap Cooking**
11. **Pantry Organization: How to Store Rice, Pulses, Flour, and Spices**
12. **Easy Healthy Snacks You Can Make with Everyday Ingredients in 10 Minutes**

Every article includes unique metadata, real photographic imagery, reading time, author attribution, practical kitchen rules, key takeaways, related grocery category shortcuts, and social sharing links.

### 5. Quick Indian Recipes & 1-Click Bundles
- Step-by-step methods for Kanda Batata Poha, Homestyle Dal Tadka, Spiced Paneer Bhurji, and Monsoon Masala Chai.
- **"Add All Ingredients to Basket"** button that batches every fresh item needed for the recipe directly into the cart.

### 6. SEO, Accessibility & Performance
- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, and `<footer>`.
- **JSON-LD Structured Data**: Embedded Schema.org `GroceryStore` markup.
- **Sitemap & Robots Viewer**: In-app inspection modal for `sitemap.xml` and `robots.txt`.
- **Accessible Typography**: Styled with Google's *Plus Jakarta Sans* font and tabular figures (`tabular-nums`) for prices.
- **Zero Broken Images**: Resilient `ImageWithFallback` component with `referrerPolicy="no-referrer"` and graceful fallback containers.

---

## 🚀 Development & Local Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository and navigate to the project directory
git clone <repository-url>
cd freshbasket

# Install dependencies
npm install

# Start the Vite development server (runs on port 3000)
npm run dev
```

The application will be live at `http://localhost:3000`.

---

## 📦 Production Build & Vercel Deployment

### Build for Production
```bash
npm run build
```
This compiles TypeScript, bundles all assets with Vite, and generates the optimized production build inside the `dist/` directory.

### Deploying to Vercel

FreshBasket is a standard React + Vite SPA. No special plugins or custom agent extensions are required.

#### Option A: Deploy via Vercel CLI (Terminal)
1. In your project root, run:
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts:
   - **Set up and deploy?** → `Y`
   - **Which scope?** → Select your Vercel account
   - **Link to existing project?** → `N` (or `Y` if already created)
   - **Project name?** → `freshbasket` (or press Enter)
   - **Directory located?** → `./` (press Enter)
   - **Want to modify settings?** → `N` (Vercel automatically reads `vercel.json`)
3. For production deployment:
   ```bash
   npx vercel --prod
   ```

#### Option B: Deploy via GitHub / GitLab / Bitbucket (Recommended)
1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure Vercel deployment"
   git push origin main
   ```
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel automatically detects the framework:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**. Vercel will build and assign your production URL.

#### Single Page Application (SPA) Routing & Refreshes
A pre-configured `vercel.json` file is included in the project root:
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This rewrite rule ensures that refreshing any deep URL (e.g., `/shop`, `/categories`, `/blog/...`) cleanly returns `/index.html` without 404 errors.

---

## 🔒 Security & Demo Data Disclaimer
- This storefront is a demonstration e-commerce implementation.
- All product ratings, contact phone numbers (`1800-419-BASKET`), and customer testimonials are clearly identified sample demonstration data.
- No real payment gateways are connected; no customer credit cards or sensitive financial details are requested or stored.
