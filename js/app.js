// NutriAI — Main Application Logic

// ── STATE ──
let currentPlan = null;
let waterCount = 0;
let waterLog = [];
let progressChecks = {};
let isDarkMode = false;

// ── STORAGE (localStorage for GitHub Pages) ──
const STORAGE_KEY = 'nutriai_plans';
const WATER_KEY = 'nutriai_water';
const THEME_KEY = 'nutriai_theme';

function getPlans() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}
function savePlans(plans) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(plans)); } catch (e) { console.warn('Storage full'); }
}
function getWaterData() {
  try {
    const d = JSON.parse(localStorage.getItem(WATER_KEY) || '{}');
    const today = new Date().toDateString();
    if (d.date !== today) return { count: 0, log: [], date: today };
    return d;
  } catch { return { count: 0, log: [], date: new Date().toDateString() }; }
}
function saveWaterData() {
  try { localStorage.setItem(WATER_KEY, JSON.stringify({ count: waterCount, log: waterLog, date: new Date().toDateString() })); } catch {}
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Theme
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark') applyTheme(true);

  // Water
  const wd = getWaterData();
  waterCount = wd.count;
  waterLog = wd.log;
  renderWaterTracker();

  // Animate counter stats
  animateCounters();

  // Pre-select moderately active
  const defaultActivity = document.querySelector('[onclick*="Moderately Active"]');
  if (defaultActivity) selectActivity(defaultActivity, 'Moderately Active');
});

// ── COUNTER ANIMATION ──
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let current = 0;
    const step = target / 20;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.round(current);
      if (current >= target) clearInterval(timer);
    }, 60);
  });
}

// ── TAB NAVIGATION ──
function switchTab(tab) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.id === 'tab-' + tab);
  });
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === 'sec-' + tab);
  });
  if (tab === 'saved') loadSavedPlans();
  if (tab === 'tracker') renderWaterTracker();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── THEME TOGGLE ──
function toggleTheme() {
  isDarkMode = !isDarkMode;
  applyTheme(isDarkMode);
}
function applyTheme(dark) {
  isDarkMode = dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : '');
  document.getElementById('themeIcon').textContent = dark ? '☀️' : '🌙';
  localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
}

// ── MOBILE MENU ──
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ── LIVE VALIDATION ──
function liveValidate(field) {
  const el = document.getElementById(field);
  const val = parseFloat(el.value);
  const ranges = { age: [10,100], weight: [20,300], height: [100,250] };
  const [min, max] = ranges[field];
  const err = document.getElementById(field + 'Err');
  if (!el.value || val < min || val > max) {
    el.classList.remove('valid'); el.classList.add('invalid');
    err.classList.add('show');
  } else {
    el.classList.remove('invalid'); el.classList.add('valid');
    err.classList.remove('show');
  }
}

// ── LIVE BMI ──
function liveBMI() {
  const w = parseFloat(document.getElementById('weight').value);
  const h = parseFloat(document.getElementById('height').value);
  const preview = document.getElementById('bmiPreview');
  if (w >= 20 && w <= 300 && h >= 100 && h <= 250) {
    const bmi = calcBMI(w, h);
    const info = getBMIInfo(bmi);
    document.getElementById('bmiPreviewVal').textContent = bmi;
    const catEl = document.getElementById('bmiPreviewCat');
    catEl.textContent = info.label;
    catEl.style.background = info.bg;
    catEl.style.color = info.color;
    preview.classList.add('visible');
  } else {
    preview.classList.remove('visible');
  }
}

// ── GOAL / PREF / ACTIVITY SELECTION ──
function selectGoal(el, val) {
  document.querySelectorAll('.goal-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('goal').value = val;
  document.getElementById('goalErr').classList.remove('show');
}
function selectPref(el, val) {
  document.querySelectorAll('.pref-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('pref').value = val;
  document.getElementById('prefErr').classList.remove('show');
}
function selectActivity(el, val) {
  document.querySelectorAll('.activity-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('activity').value = val;
}

// ── VALIDATION ──
function validate() {
  let ok = true;
  [{ id: 'age', min: 10, max: 100 }, { id: 'weight', min: 20, max: 300 }, { id: 'height', min: 100, max: 250 }].forEach(f => {
    const v = parseFloat(document.getElementById(f.id).value);
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.id + 'Err');
    if (!el.value || v < f.min || v > f.max) {
      el.classList.add('invalid'); err.classList.add('show'); ok = false;
    } else {
      el.classList.remove('invalid'); err.classList.remove('show');
    }
  });
  ['goal', 'pref'].forEach(id => {
    const v = document.getElementById(id).value;
    const err = document.getElementById(id + 'Err');
    if (!v) { err.classList.add('show'); ok = false; } else { err.classList.remove('show'); }
  });
  return ok;
}

// ── CALCULATIONS ──
function calcBMI(weight, height) {
  return parseFloat((weight / (height / 100) ** 2).toFixed(1));
}
function calcTDEE(weight, height, age, activity) {
  // Mifflin-St Jeor BMR (male default, adjusted)
  const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  const mult = ACTIVITY_MULTIPLIERS[activity] || 1.55;
  return Math.round(bmr * mult);
}
function calcWaterGoal(weight) {
  return (weight * 0.033).toFixed(1);
}
function getBMIInfo(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', bg: '#dbeafe', color: '#1d4ed8', pct: Math.max(2, ((bmi - 16) / 2.5) * 18), msg: 'You are below the healthy weight range. Focus on nutrient-dense foods and lean muscle building to reach a healthy BMI.' };
  if (bmi < 25)  return { label: 'Normal Weight', bg: '#dcfce7', color: '#15803d', pct: 18 + ((bmi - 18.5) / 6.5) * 30, msg: 'Excellent — you are within a healthy BMI range. Maintain it with balanced nutrition and consistent physical activity.' };
  if (bmi < 30)  return { label: 'Overweight', bg: '#fef3c7', color: '#92400e', pct: 48 + ((bmi - 25) / 5) * 24, msg: 'Slightly above the healthy range. Consistent exercise and mindful eating will bring you back to a healthy BMI.' };
  return { label: 'Obese', bg: '#fee2e2', color: '#b91c1c', pct: 72 + Math.min(22, ((bmi - 30) / 10) * 22), msg: 'Your BMI indicates obesity. A structured diet and exercise plan is very important. Consider consulting a healthcare professional.' };
}

// ── GENERATE ──
async function handleGenerate() {
  if (!validate()) {
    showToast('⚠️ Please fill all fields correctly');
    return;
  }
  const age      = parseInt(document.getElementById('age').value);
  const weight   = parseFloat(document.getElementById('weight').value);
  const height   = parseFloat(document.getElementById('height').value);
  const goal     = document.getElementById('goal').value;
  let  pref     = document.getElementById('pref').value;
  if(pref == "Mixed") {
    pref = "Non-Vegetarian";
  }
  const activity = document.getElementById('activity').value || 'Moderately Active';
  const bmi      = calcBMI(weight, height);
  const tdee     = calcTDEE(weight, height, age, activity);
  const water    = calcWaterGoal(weight);

  const plan = { age, weight, height, goal, pref, activity, bmi, tdee, water, ts: Date.now() };
  currentPlan = plan;

  // Show loading
  document.getElementById('formCard').style.display = 'none';
  document.getElementById('loading').style.display = 'flex';
  document.getElementById('results').style.display = 'none';

  // Animated loading steps
  const steps = [
    { text: 'Analysing your body metrics…', pct: 20 },
    { text: 'Calculating calorie needs (TDEE)…', pct: 45 },
    { text: 'Generating your 7-day meal plan…', pct: 65 },
    { text: 'Crafting exercise recommendations…', pct: 85 },
    { text: 'Finalising your personalised plan…', pct: 100 }
  ];
  let i = 0;
  const stepInterval = setInterval(() => {
    if (i < steps.length) {
      document.getElementById('loadingStep').textContent = steps[i].text;
      document.getElementById('loadingBar').style.width = steps[i].pct + '%';
      i++;
    } else {
      clearInterval(stepInterval);
    }
  }, 380);

  // Save plan
  const plans = getPlans();
  plans.unshift(plan);
  if (plans.length > 20) plans.pop(); // keep last 20
  savePlans(plans);

  setTimeout(() => {
    clearInterval(stepInterval);
    document.getElementById('loading').style.display = 'none';
    document.getElementById('results').style.display = 'flex';
    document.getElementById('results').style.flexDirection = 'column';
    document.getElementById('results').style.gap = '20px';
    renderResults(plan);
    document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
    showToast('✓ Plan generated & saved!');
  }, 2200);
}

// ── RENDER RESULTS ──
function renderResults(p) {
  // Meta
  document.getElementById('resMeta').textContent =
    `${p.goal} · ${p.pref} · Age ${p.age} · ${p.weight} kg · ${p.height} cm · ${p.activity || ''}`;

  // BMI
  const info = getBMIInfo(p.bmi);
  document.getElementById('bmiVal').textContent = p.bmi;
  const bmiCat = document.getElementById('bmiCat');
  bmiCat.textContent = info.label;
  bmiCat.style.background = info.bg;
  bmiCat.style.color = info.color;
  bmiCat.style.display = 'inline-block';
  document.getElementById('bmiMsg').textContent = info.msg;
  setTimeout(() => { document.getElementById('bmiPin').style.left = info.pct + '%'; }, 400);

  // Calories (TDEE)
  const tdee = p.tdee || calcTDEE(p.weight, p.height, p.age, p.activity || 'Moderately Active');
  let targetCal = tdee;
  if (p.goal === 'Weight Loss' || p.goal === 'Belly Fat Reduction') targetCal = tdee - 400;
  if (p.goal === 'Fitness') targetCal = tdee + 200;
  document.getElementById('calorieVal').textContent = targetCal;
  const macros = MACRO_RATIOS[p.goal];
  document.getElementById('calorieLbl').textContent = p.goal === 'Fitness' ? 'Surplus Goal' : 'Deficit Goal';
  document.getElementById('calorieMsg').textContent =
    `Your TDEE is ${tdee} kcal. Target ${targetCal} kcal/day to support your ${p.goal} goal.`;
  document.getElementById('calorieBreakdown').innerHTML =
    `<span class="cal-chip protein">Protein ${macros.protein}%</span><span class="cal-chip carbs">Carbs ${macros.carbs}%</span><span class="cal-chip fats">Fat ${macros.fat}%</span>`;

  // Water
  const water = p.water || calcWaterGoal(p.weight);
  document.getElementById('waterVal').textContent = water + 'L';
  const cups = Math.round(parseFloat(water) / 0.25);
  let cupsHtml = '';
  for (let i = 0; i < Math.min(cups, 10); i++) cupsHtml += `<div class="water-cup"></div>`;
  document.getElementById('waterCups').innerHTML = cupsHtml;

  // Diet Plan
  const days = DIET_DATA[p.pref][p.goal];
  const container = document.getElementById('daysContainer');
  container.innerHTML = '';
  days.forEach((day, i) => {
    const open = i === 0;
    const div = document.createElement('div');
    div.className = 'day-block';
    div.innerHTML = `
      <div class="day-header" onclick="toggleDay(this)">
        <span class="day-badge db-${i}">Day ${i + 1}</span>
        <span class="day-name">${DAYS_OF_WEEK[i]}</span>
        <span class="day-count">4 meals</span>
        <span class="day-arrow" style="${open ? 'transform:rotate(180deg)' : ''}">▾</span>
      </div>
      <div class="day-body${open ? ' open' : ''}">
        <div class="meal-row"><span class="meal-tag mt-b">Breakfast</span><span class="meal-val">${day.b}</span></div>
        <div class="meal-row"><span class="meal-tag mt-l">Lunch</span><span class="meal-val">${day.l}</span></div>
        <div class="meal-row"><span class="meal-tag mt-d">Dinner</span><span class="meal-val">${day.d}</span></div>
        <div class="meal-row"><span class="meal-tag mt-s">Snack</span><span class="meal-val">${day.s}</span></div>
      </div>`;
    container.appendChild(div);
  });

  // Exercise
  document.getElementById('goalLabel').textContent = p.goal;
  const exercises = EXERCISE_DATA[p.goal];
  document.getElementById('exerciseGrid').innerHTML = exercises.map(e => `
    <div class="exercise-item">
      <div class="ex-bg-icon">${e.icon}</div>
      <div class="ex-name">${e.icon} ${e.name}</div>
      <div class="ex-dur">⏱ ${e.duration} · ${e.freq}</div>
      <div class="ex-type">${e.type}</div>
    </div>`).join('');

  // Weekly Schedule
  const sched = WEEKLY_SCHEDULE[p.goal];
  document.getElementById('weeklySchedule').innerHTML = `
    <div class="ws-title">Weekly Schedule</div>
    <div class="ws-row">
      ${SHORT_DAYS.map((d, i) => `
        <div class="ws-day">
          <div class="ws-day-name">${d}</div>
          <div class="ws-indicator ws-${sched[i]}">${sched[i] === 'rest' ? 'Rest' : sched[i] === 'light' ? 'Light' : 'Train'}</div>
        </div>`).join('')}
    </div>`;

  // Macros
  const pGrams = Math.round((targetCal * macros.protein / 100) / 4);
  const cGrams = Math.round((targetCal * macros.carbs / 100) / 4);
  const fGrams = Math.round((targetCal * macros.fat / 100) / 9);
  document.getElementById('macroGrid').innerHTML = `
    <div class="macro-item macro-item-p">
      <div class="macro-percent">${macros.protein}%</div>
      <div class="macro-label">Protein</div>
      <div class="macro-grams">${pGrams}g per day</div>
      <div class="macro-bar" style="width:${macros.protein}%"></div>
    </div>
    <div class="macro-item macro-item-c">
      <div class="macro-percent">${macros.carbs}%</div>
      <div class="macro-label">Carbohydrates</div>
      <div class="macro-grams">${cGrams}g per day</div>
      <div class="macro-bar" style="width:${macros.carbs}%"></div>
    </div>
    <div class="macro-item macro-item-f">
      <div class="macro-percent">${macros.fat}%</div>
      <div class="macro-label">Healthy Fats</div>
      <div class="macro-grams">${fGrams}g per day</div>
      <div class="macro-bar" style="width:${macros.fat}%"></div>
    </div>`;

  // Avoid foods
  document.getElementById('avoidTags').innerHTML =
    AVOID_FOODS[p.goal][p.pref].map(f => `<span class="avoid-tag"><span class="avoid-x">✕</span>${f}</span>`).join('');

  // Tips
  document.getElementById('tipsGrid').innerHTML =
    HEALTH_TIPS.map((t, i) => `
      <div class="tip-card">
        <div class="tip-num">${i + 1}</div>
        <div class="tip-text">${t.text}</div>
      </div>`).join('');

  // Progress tracker
  const tracker = document.getElementById('progressTracker');
  tracker.innerHTML = `
    <div class="pt-header">
      <div class="pt-habit-label">Habit</div>
      ${SHORT_DAYS.map(d => `<div class="pt-day-label">${d}</div>`).join('')}
    </div>
    ${PROGRESS_HABITS.map((h, hi) => `
      <div class="pt-row">
        <div class="pt-habit">${h}</div>
        ${[0,1,2,3,4,5,6].map(di => {
          const key = `${hi}-${di}`;
          const checked = progressChecks[key] ? 'checked' : '';
          return `<div class="pt-check ${checked}" onclick="toggleCheck(this,'${key}')">${checked ? '✓' : ''}</div>`;
        }).join('')}
      </div>`).join('')}`;
}

// ── EXPAND/COLLAPSE ALL ──
function expandAll() {
  document.querySelectorAll('.day-body').forEach(b => b.classList.add('open'));
  document.querySelectorAll('.day-arrow').forEach(a => a.style.transform = 'rotate(180deg)');
}
function collapseAll() {
  document.querySelectorAll('.day-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.day-arrow').forEach(a => a.style.transform = '');
}
function toggleDay(hd) {
  const body = hd.nextElementSibling;
  const arr = hd.querySelector('.day-arrow');
  const open = body.classList.toggle('open');
  arr.style.transform = open ? 'rotate(180deg)' : '';
}

// ── PROGRESS TRACKER ──
function toggleCheck(el, key) {
  const isChecked = el.classList.toggle('checked');
  el.textContent = isChecked ? '✓' : '';
  progressChecks[key] = isChecked;
}

// ── RESET FORM ──
function resetForm() {
  document.getElementById('formCard').style.display = 'block';
  document.getElementById('results').style.display = 'none';
  currentPlan = null;
  document.getElementById('bmiPreview').classList.remove('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── DOWNLOAD PLAN ──
function downloadPlan() {
  if (!currentPlan) return;
  const p = currentPlan;
  const days = DIET_DATA[p.pref][p.goal];
  const exercises = EXERCISE_DATA[p.goal];
  const avoid = AVOID_FOODS[p.goal][p.pref];
  const macros = MACRO_RATIOS[p.goal];
  const info = getBMIInfo(p.bmi);
  const tdee = p.tdee || calcTDEE(p.weight, p.height, p.age, p.activity || 'Moderately Active');
  let targetCal = tdee;
  if (p.goal === 'Weight Loss' || p.goal === 'Belly Fat Reduction') targetCal = tdee - 400;
  if (p.goal === 'Fitness') targetCal = tdee + 200;

  let txt = `
╔══════════════════════════════════════════════════╗
║            NUTRIAI — PERSONALIZED DIET PLAN       ║
╚══════════════════════════════════════════════════╝

Generated: ${new Date(p.ts).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

PROFILE
──────────────────────────────────────────────────
  Age     : ${p.age} years
  Weight  : ${p.weight} kg
  Height  : ${p.height} cm
  Goal    : ${p.goal}
  Diet    : ${p.pref}
  Activity: ${p.activity || 'Moderately Active'}

BMI & METRICS
──────────────────────────────────────────────────
  BMI Score   : ${p.bmi} (${info.label})
  Daily TDEE  : ${tdee} kcal
  Target Cals : ${targetCal} kcal/day
  Macros      : Protein ${macros.protein}% | Carbs ${macros.carbs}% | Fat ${macros.fat}%
  Daily Water : ${p.water || calcWaterGoal(p.weight)} litres

══════════════════════════════════════════════════
  7-DAY DIET PLAN
══════════════════════════════════════════════════
`;
  days.forEach((day, i) => {
    txt += `\nDay ${i + 1} — ${DAYS_OF_WEEK[i]}\n${'─'.repeat(48)}\n`;
    txt += `  Breakfast : ${day.b}\n`;
    txt += `  Lunch     : ${day.l}\n`;
    txt += `  Dinner    : ${day.d}\n`;
    txt += `  Snack     : ${day.s}\n`;
  });

  txt += `\n${'═'.repeat(50)}\n  EXERCISE RECOMMENDATIONS\n${'═'.repeat(50)}\n`;
  exercises.forEach(e => { txt += `  ${e.icon}  ${e.name} — ${e.duration} · ${e.freq}\n`; });

  txt += `\n${'═'.repeat(50)}\n  FOODS TO AVOID\n${'═'.repeat(50)}\n`;
  avoid.forEach(f => { txt += `  ✕  ${f}\n`; });

  txt += `\n${'═'.repeat(50)}\n  HEALTH TIPS\n${'═'.repeat(50)}\n`;
  HEALTH_TIPS.forEach((t, i) => { txt += `  ${i + 1}. ${t.text}\n\n`; });

  txt += `\n${'─'.repeat(50)}\nDisclaimer: This plan is for informational purposes only.\nAlways consult a healthcare professional before major dietary changes.\n\nGenerated by NutriAI — Smart Diet Planner\n`;

  const blob = new Blob([txt], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `NutriAI_Plan_${new Date(p.ts).toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
  showToast('✓ Plan downloaded!');
}

// ── SHARE ──
function sharePlan() {
  if (!currentPlan) return;
  const p = currentPlan;
  const text = `I just got my personalized diet plan on NutriAI!\n🎯 Goal: ${p.goal}\n📊 BMI: ${p.bmi}\n🍽️ 7-day ${p.pref} meal plan\n\nGenerate yours free at NutriAI!`;
  if (navigator.share) {
    navigator.share({ title: 'My NutriAI Diet Plan', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => showToast('✓ Plan details copied!')).catch(() => showToast('Share: ' + text.slice(0, 60) + '…'));
  }
}

// ── SAVED PLANS ──
function loadSavedPlans() {
  const inner = document.getElementById('savedInner');
  const plans = getPlans();
  if (!plans.length) {
    inner.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><h3>No saved plans yet</h3><p>Generate your first plan and it will appear here automatically.</p></div>`;
    return;
  }
  const wrap = document.createElement('div');
  wrap.className = 'plans-list';
  plans.forEach((p, idx) => {
    const d = new Date(p.ts).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const info = getBMIInfo(p.bmi);
    const div = document.createElement('div');
    div.className = 'plan-item';
    div.innerHTML = `
      <div class="plan-row">
        <div>
          <div class="plan-goal">${p.goal}</div>
          <div class="plan-date">Saved ${d} · ${p.pref} · ${p.activity || 'Moderate'}</div>
        </div>
        <div class="plan-btns">
          <button class="pbtn" onclick='viewSavedPlan(${idx})'>View</button>
          <button class="pbtn del" onclick="deleteSavedPlan(${idx}, this)">Delete</button>
        </div>
      </div>
      <div class="plan-chips">
        <span class="pchip">Age ${p.age}</span>
        <span class="pchip">${p.weight} kg</span>
        <span class="pchip">${p.height} cm</span>
        <span class="pchip bmi" style="background:${info.bg};color:${info.color};border-color:${info.bg}">BMI ${p.bmi} · ${info.label}</span>
        <span class="pchip goal">${p.goal}</span>
      </div>`;
    wrap.appendChild(div);
  });
  inner.innerHTML = '';
  inner.appendChild(wrap);
}

function viewSavedPlan(idx) {
  const plans = getPlans();
  if (!plans[idx]) return;
  currentPlan = plans[idx];
  switchTab('generate');
  document.getElementById('formCard').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  document.getElementById('results').style.display = 'flex';
  document.getElementById('results').style.flexDirection = 'column';
  document.getElementById('results').style.gap = '20px';
  renderResults(plans[idx]);
  showToast('✓ Plan loaded!');
}

function deleteSavedPlan(idx, btn) {
  const plans = getPlans();
  plans.splice(idx, 1);
  savePlans(plans);
  btn.closest('.plan-item').remove();
  showToast('Plan deleted');
  const wrap = document.querySelector('.plans-list');
  if (wrap && !wrap.children.length) {
    document.getElementById('savedInner').innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><h3>No saved plans yet</h3><p>Generate your first plan and it will appear here automatically.</p></div>`;
  }
}

// ── WATER TRACKER ──
function renderWaterTracker() {
  const body = document.getElementById('waterTrackerBody');
  if (!body) return;
  const goal = 8;
  const pct = Math.min((waterCount / goal) * 100, 100);
  document.getElementById('waterFill').style.height = pct + '%';
  document.getElementById('waterCountLabel').textContent = `${waterCount}/${goal}`;
  document.getElementById('waterGlasses').textContent = waterCount;
  document.getElementById('waterML').textContent = `${waterCount * 250} ml consumed`;

  const statuses = ['Start drinking! 💧', 'Good start! 💧', 'Keep going! 🌊', 'Halfway there! 💪', 'Almost there! 🏆', 'Almost done! 🌟', 'Nearly there! ⭐', 'Goal reached! 🎉', 'Superhydrated! 🚀'];
  document.getElementById('waterStatus').textContent = statuses[Math.min(waterCount, 8)] || 'Superhydrated! 🚀';

  // Cups
  const cupsRow = document.getElementById('trackerCups');
  cupsRow.innerHTML = '';
  for (let i = 0; i < goal; i++) {
    const cup = document.createElement('div');
    cup.className = 'tracker-cup' + (i < waterCount ? ' full' : '');
    cup.textContent = i < waterCount ? '💧' : '';
    cupsRow.appendChild(cup);
  }

  // Log
  const logEl = document.getElementById('waterLog');
  logEl.innerHTML = `<div class="log-title">Today's log</div>`;
  if (!waterLog.length) {
    logEl.innerHTML += '<div class="log-entry"><span>No entries yet</span><span></span></div>';
  } else {
    [...waterLog].reverse().forEach(entry => {
      logEl.innerHTML += `<div class="log-entry"><span>🥤 ${entry.note}</span><span>${entry.time}</span></div>`;
    });
  }
}

function addGlass() {
  if (waterCount >= 12) { showToast('Great hydration! You\'ve had 12 glasses today!'); return; }
  waterCount++;
  waterLog.push({ note: '250ml water', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) });
  saveWaterData();
  renderWaterTracker();
  if (waterCount === 8) showToast('🎉 Daily water goal reached!');
  else showToast(`💧 Glass ${waterCount} added!`);
}

function resetWater() {
  waterCount = 0;
  waterLog = [];
  saveWaterData();
  renderWaterTracker();
  showToast('Water tracker reset');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
