# 🌿 NutriAI — AI-Powered Smart Diet Planner

> A fully personalized, science-backed diet planning web application built with HTML, CSS & JavaScript.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-green?style=for-the-badge)](https://YOUR-USERNAME.github.io/nutriai)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-blue?style=for-the-badge)](https://pages.github.com)

---

## ✨ Features

### Core Features
- 🥗 **7-Day Personalised Diet Plan** — Tailored to your goal and food preference (Vegetarian / Non-Vegetarian)
- 📊 **BMI Analysis** — Instant Body Mass Index calculation with visual bar indicator
- 🔥 **TDEE Calculator** — Mifflin-St Jeor formula for accurate daily calorie needs
- 🏃 **Exercise Recommendations** — Goal-specific workouts with frequency and duration
- 🚫 **Foods to Avoid** — Personalised list based on goal and preference
- 💡 **Health Tips** — 6 science-backed daily habits

### Advanced Features
- 💧 **Daily Water Tracker** — Track hydration with visual bottle animation and daily log
- 📈 **Macro Breakdown** — Protein, carbs and fat targets in grams per day
- 📅 **Weekly Progress Checklist** — Track 6 daily habits across 7 days
- 💾 **Persistent Storage** — Plans saved to localStorage, accessible anytime
- ⬇️ **Download Plan** — Export your full plan as a formatted `.txt` file
- 🔗 **Share Plan** — Native share API with clipboard fallback
- 🌙 **Dark Mode** — Full dark theme with persistent preference
- 📱 **Fully Responsive** — Works on mobile, tablet and desktop

---

## 🚀 Live Demo

👉 **[https://YOUR-USERNAME.github.io/nutriai](https://YOUR-USERNAME.github.io/nutriai)**

---

## 📁 Project Structure

```
nutriai/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (dark mode, responsive)
├── js/
│   ├── data.js         # Diet plans, exercise data, tips
│   └── app.js          # All application logic
├── assets/
│   └── favicon.svg     # App favicon
└── README.md           # This file
```

---

## 🛠️ Setup & Deployment

### Option 1 — GitHub Pages (Recommended)

1. **Fork or clone** this repository
   ```bash
   git clone https://github.com/YOUR-USERNAME/nutriai.git
   ```

2. **Push to GitHub**
   ```bash
   cd nutriai
   git init
   git add .
   git commit -m "Initial commit: NutriAI Diet Planner"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/nutriai.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repo → **Settings** → **Pages**
   - Under **Source**, select `Deploy from a branch`
   - Select `main` branch → `/ (root)` folder
   - Click **Save**
   - Your site will be live at `https://YOUR-USERNAME.github.io/nutriai`

### Option 2 — Local Development

Simply open `index.html` in any modern browser — no build tools or server required.

---

## 🏗️ Technologies Used

| Technology | Purpose |
|-----------|---------|
| HTML5 | Structure & semantics |
| CSS3 | Styling, animations, dark mode |
| Vanilla JavaScript | All logic, calculations, storage |
| Google Fonts | Playfair Display + Plus Jakarta Sans |
| localStorage | Persistent plan storage |

---

## 📐 How It Works

1. **User fills the form** — Age, weight, height, goal, food preference, activity level
2. **BMI is calculated** — Using the standard formula: weight(kg) / height(m)²
3. **TDEE is calculated** — Mifflin-St Jeor BMR × Activity multiplier
4. **Plan is generated** — Matched from curated database of 42 unique day plans
5. **Results displayed** — BMI card, calories, macros, 7-day plan, exercises, tips
6. **Plan auto-saved** — Stored in localStorage, viewable in Saved Plans tab

---

## 🎨 Design Highlights

- **Typography** — Playfair Display (headings) + Plus Jakarta Sans (body)
- **Color Palette** — Forest green primary, teal accent, amber highlights
- **Animations** — Floating hero orbs, counter animations, accordion days, loading progress
- **Dark Mode** — Full CSS variable-based dark theme
- **Responsive** — Mobile-first, works on all screen sizes

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

Built for academic project submission.  
Powered by **NutriAI** · *Eat Smart, Live Vibrant*

---

> ⚠️ **Disclaimer**: NutriAI is for informational purposes only. Always consult a registered dietitian or healthcare professional before making significant dietary changes.
