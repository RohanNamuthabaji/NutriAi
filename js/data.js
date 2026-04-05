// NutriAI — Diet & Nutrition Data
// All meal plans, exercise data, macros, and tips

const DIET_DATA = {
  Vegetarian: {
    "Weight Loss": [
      { b: "Oats porridge with mixed berries + green tea", l: "Moong dal + 2 rotis + cucumber salad", d: "Palak soup + grilled paneer + small brown rice", s: "Apple or pear" },
      { b: "Idli (2) with sambar + black coffee", l: "Rajma (small bowl) + roti + tomato raita", d: "Vegetable stir-fry + dal + 1 roti", s: "Roasted chana" },
      { b: "Smoothie bowl: banana + spinach + flaxseed", l: "Chole (half cup) + 2 rotis + onion salad", d: "Mixed veg soup + steamed broccoli + quinoa", s: "Handful of almonds" },
      { b: "Upma with veggies + herbal tea", l: "Tofu bhurji + brown rice + salad", d: "Dal tadka + 1 roti + sauteed veggies", s: "Orange" },
      { b: "Greek yogurt with granola + strawberries", l: "Lentil soup + 2 rotis + spinach sabzi", d: "Besan cheela + mint chutney + salad", s: "Carrot and cucumber sticks" },
      { b: "Wheat dosa + coconut chutney", l: "Paneer tikka salad + brown rice", d: "Tomato soup + palak paneer + 1 roti", s: "Handful of walnuts" },
      { b: "Poha with peas and peanuts", l: "Mixed dal + 2 rotis + lauki sabzi", d: "Vegetable daliya + low-fat curd", s: "Pomegranate seeds" }
    ],
    "Belly Fat Reduction": [
      { b: "Warm lemon water + oats with chia seeds", l: "Brown rice + dal + bitter gourd sabzi", d: "Grilled veggies + tofu + cucumber raita", s: "Green apple" },
      { b: "Moong dal chilla + mint chutney", l: "Quinoa khichdi + yogurt", d: "Spinach soup + 1 multigrain roti + salad", s: "Handful of flaxseeds" },
      { b: "Banana smoothie (no sugar) + handful almonds", l: "Rajma + 1 roti + onion tomato salad", d: "Bottle gourd sabzi + dal + 1 roti", s: "Papaya cubes" },
      { b: "Ragi porridge + herbal tea", l: "Chole + brown rice + salad", d: "Methi dal + 1 multigrain roti + stir-fry veg", s: "Roasted pumpkin seeds" },
      { b: "2 idlis + sambar + green tea", l: "Palak paneer + 1 roti + tomato soup", d: "Tofu stir-fry + sprouts salad", s: "Pineapple slices" },
      { b: "Oats upma + black coffee", l: "Mixed vegetable curry + brown rice", d: "Lentil soup + steamed broccoli", s: "Walnuts + 2 dates" },
      { b: "Sprouts salad + herbal tea", l: "Dal + lauki + 2 rotis", d: "Veg soup + besan cheela + curd", s: "Kiwi" }
    ],
    "Fitness": [
      { b: "Paneer scramble + 2 whole wheat toast + banana", l: "Rajma + brown rice + paneer bhurji + salad", d: "Palak tofu + 2 rotis + dal", s: "Protein smoothie: milk + banana + peanut butter" },
      { b: "Masala oats + tofu scramble + OJ", l: "Chole + quinoa + raita + salad", d: "Cottage cheese sabzi + 2 rotis + lentil soup", s: "Banana + peanut butter" },
      { b: "Greek yogurt parfait + granola + mixed berries", l: "Dal makhani + brown rice + cucumber salad", d: "Tofu stir-fry + 2 rotis + mixed veg", s: "Handful of mixed nuts" },
      { b: "Protein smoothie + 2 multigrain toasts", l: "Paneer tikka + 2 rotis + salad", d: "Rajma + rice + curd + veggies", s: "Boiled sweet potato" },
      { b: "Oats pancakes + honey + banana", l: "Tofu fried rice + soup", d: "Dal + roti + palak sabzi + raita", s: "Cheese on crackers" },
      { b: "Sprouted moong salad + whole wheat toast", l: "Paneer pulao + raita + salad", d: "Chana dal + 2 rotis + roasted veggies", s: "Dates + almonds" },
      { b: "Dalia porridge with nuts + milk", l: "Mixed dal + rice + sabzi + salad", d: "Paneer curry + 2 rotis + soup", s: "Peanut butter with apple" }
    ]
  },
  "Non-Vegetarian": {
    "Weight Loss": [
      { b: "Boiled eggs (2) + brown toast + green tea", l: "Grilled chicken salad + 1 roti", d: "Fish curry (light) + small rice + salad", s: "Apple" },
      { b: "Egg white omelette + veggies + black coffee", l: "Chicken stir-fry + brown rice", d: "Grilled fish + sauteed veggies + soup", s: "Handful of almonds" },
      { b: "Oats with banana + 2 boiled eggs", l: "Tandoori chicken + salad + mint chutney", d: "Prawn curry + 1 roti + steamed veggies", s: "Orange" },
      { b: "Chicken sandwich (whole wheat) + herbal tea", l: "Fish tikka + brown rice + raita", d: "Egg soup + grilled chicken + cucumber salad", s: "Roasted chickpeas" },
      { b: "Scrambled eggs + wholegrain toast + OJ", l: "Chicken soup + 2 rotis + salad", d: "Baked fish + steamed broccoli + brown rice", s: "Greek yogurt" },
      { b: "Egg bhurji + 1 roti + green tea", l: "Grilled chicken + quinoa + salad", d: "Dal + 1 roti + stir-fried veggies", s: "Walnuts" },
      { b: "Oats + 2 boiled eggs + fruit", l: "Fish curry + brown rice + salad", d: "Chicken soup + steamed veggies + 1 roti", s: "Pomegranate" }
    ],
    "Belly Fat Reduction": [
      { b: "Warm lemon water + egg white omelette + toast", l: "Grilled chicken breast + quinoa + salad", d: "Fish soup + steamed veggies + 1 multigrain roti", s: "Cucumber and carrot sticks" },
      { b: "2 boiled eggs + apple + green tea", l: "Chicken stir-fry + brown rice", d: "Grilled fish + sauteed spinach + soup", s: "Pineapple slices" },
      { b: "Egg omelette with veggies + oats", l: "Tandoori chicken + salad + cucumber raita", d: "Prawn stir-fry + 1 roti + dal", s: "Walnuts" },
      { b: "Ragi porridge + boiled egg", l: "Fish curry (light) + 1 roti + salad", d: "Chicken soup + steamed broccoli", s: "Papaya" },
      { b: "Egg white bhurji + multigrain toast + herbal tea", l: "Grilled chicken wrap + salad", d: "Baked fish + quinoa + stir-fry veg", s: "Kiwi" },
      { b: "Smoothie: spinach + banana + boiled egg", l: "Chicken and veg soup + 2 rotis", d: "Fish tikka + mixed salad", s: "Almonds + 2 dates" },
      { b: "Oats with chia seeds + 2 boiled eggs", l: "Egg fried rice (less oil) + salad", d: "Grilled chicken + dal + 1 roti", s: "Green apple" }
    ],
    "Fitness": [
      { b: "4 eggs scrambled + 2 whole wheat toast + banana", l: "Grilled chicken breast + brown rice + dal + salad", d: "Fish curry + 2 rotis + steamed veggies + raita", s: "Protein shake + banana" },
      { b: "Egg omelette (3 eggs) + multigrain toast + OJ", l: "Chicken biryani (brown rice) + raita + salad", d: "Grilled fish + lentil soup + 2 rotis", s: "Boiled eggs + peanut butter" },
      { b: "Greek yogurt + granola + 2 boiled eggs + fruit", l: "Mutton curry (small) + rice + salad", d: "Chicken soup + grilled veggies + roti", s: "Mixed nuts + dates" },
      { b: "Protein smoothie + whole wheat toast", l: "Grilled chicken wrap + quinoa salad", d: "Prawn stir-fry + brown rice + dal", s: "Peanut butter + apple" },
      { b: "Chicken sandwich (whole wheat) + boiled egg", l: "Fish tikka + rice + raita + soup", d: "Egg curry + 2 rotis + salad", s: "Banana + almonds" },
      { b: "Oats + 2 boiled eggs + fruit", l: "Grilled fish + quinoa + stir-fried veggies", d: "Chicken curry + 2 rotis + dal", s: "Cheese + crackers" },
      { b: "Egg bhurji (3 eggs) + multigrain toast + milk", l: "Chicken fried rice (less oil) + soup", d: "Fish curry + brown rice + salad + raita", s: "Handful of nuts" }
    ]
  }
};

const EXERCISE_DATA = {
  "Weight Loss": [
    { name: "Brisk Walking", duration: "45 min/day", type: "Cardio", icon: "🚶", freq: "Daily" },
    { name: "Swimming", duration: "30 min", type: "Full Body Cardio", icon: "🏊", freq: "3×/week" },
    { name: "Cycling", duration: "30–40 min", type: "Cardio", icon: "🚲", freq: "Daily" },
    { name: "Power Yoga", duration: "30 min", type: "Flexibility + Burn", icon: "🧘", freq: "Daily" },
    { name: "Light Weight Training", duration: "30 min", type: "Strength", icon: "🏋️", freq: "3×/week" },
    { name: "HIIT Cardio", duration: "20 min", type: "High Intensity", icon: "⚡", freq: "3×/week" }
  ],
  "Belly Fat Reduction": [
    { name: "Crunches & Planks", duration: "20 min", type: "Core Strength", icon: "🔥", freq: "Daily" },
    { name: "HIIT Training", duration: "25 min", type: "High Intensity", icon: "⚡", freq: "4×/week" },
    { name: "Running / Jogging", duration: "30 min", type: "Cardio", icon: "🏃", freq: "Daily" },
    { name: "Core Yoga", duration: "30 min", type: "Core + Flexibility", icon: "🧘", freq: "Daily" },
    { name: "Cycling", duration: "40 min", type: "Cardio", icon: "🚲", freq: "Daily" },
    { name: "Leg Raises & Mountain Climbers", duration: "15 min", type: "Core Burn", icon: "🤸", freq: "Daily" }
  ],
  "Fitness": [
    { name: "Strength Training", duration: "45 min", type: "Muscle Building", icon: "🏋️", freq: "4×/week" },
    { name: "Running", duration: "30 min", type: "Cardio Endurance", icon: "🏃", freq: "3×/week" },
    { name: "Bodyweight Circuits", duration: "30 min", type: "Functional Strength", icon: "💪", freq: "Daily" },
    { name: "Swimming", duration: "30 min", type: "Full Body", icon: "🏊", freq: "2×/week" },
    { name: "Stretching & Yoga", duration: "20 min", type: "Recovery", icon: "🧘", freq: "Daily" },
    { name: "HIIT + Functional", duration: "30 min", type: "Power & Agility", icon: "⚡", freq: "3×/week" }
  ]
};

const WEEKLY_SCHEDULE = {
  "Weight Loss": ["active","active","light","active","active","light","rest"],
  "Belly Fat Reduction": ["active","active","active","light","active","active","rest"],
  "Fitness": ["active","rest","active","active","rest","active","light"]
};

const AVOID_FOODS = {
  "Weight Loss": {
    Vegetarian: ["Fried foods","White bread","Sugary drinks","Ice cream","Chips & namkeen","Refined sugar","Excess white rice","Maida items","Sweets & mithai","Excess butter/ghee","Packaged juices","Biscuits & cookies"],
    "Non-Vegetarian": ["Fried chicken","Processed meats","Burgers","Excess white rice","Sugary drinks","Deep-fried fish","Full-fat cheese","Ice cream","Packaged sauces","Alcohol","Fast food","Cream-based curries"]
  },
  "Belly Fat Reduction": {
    Vegetarian: ["Refined carbs","Soda & juices","Sweets","Fried snacks","White bread","Excess salt","Packaged foods","Trans fats","Alcohol","Heavy dairy","Late-night snacking","Artificial sweeteners"],
    "Non-Vegetarian": ["Processed meats","Fast food","Fried items","Sugary drinks","White bread","Alcohol","Heavy cream sauces","Packaged snacks","Excess red meat","Trans fats","Late night meals","Carbonated drinks"]
  },
  "Fitness": {
    Vegetarian: ["Junk food","Sugary drinks","Excess refined carbs","Deep-fried items","Artificial sweeteners","Packaged processed foods","Excessive sodium","Carbonated drinks"],
    "Non-Vegetarian": ["Processed meats","Junk food","Excess alcohol","Fried items","Sugary drinks","Artificial sweeteners","Excessive sodium","Carbonated drinks"]
  }
};

const HEALTH_TIPS = [
  { text: "Drink 8–10 glasses of water daily — hydration boosts metabolism and curbs unnecessary hunger cravings significantly." },
  { text: "Sleep 7–8 hours every night. Poor sleep disrupts hunger hormones (ghrelin & leptin), slowing fat loss." },
  { text: "Never skip breakfast. A nutritious morning meal kickstarts your metabolism for the entire day ahead." },
  { text: "Manage stress through meditation or deep breathing — cortisol is a major driver of belly fat accumulation." },
  { text: "Stay active throughout the day. Short walks between long sitting sessions add up to enormous long-term results." },
  { text: "Eat mindfully and slowly. It takes 20 minutes for your brain to register fullness — slow down to avoid overeating." }
];

const PROGRESS_HABITS = [
  "Drank 8 glasses of water",
  "Followed meal plan",
  "Completed workout",
  "Slept 7–8 hours",
  "No junk food",
  "10k steps"
];

// Activity level TDEE multipliers
const ACTIVITY_MULTIPLIERS = {
  "Sedentary": 1.2,
  "Lightly Active": 1.375,
  "Moderately Active": 1.55,
  "Very Active": 1.725
};

// Macro ratios per goal
const MACRO_RATIOS = {
  "Weight Loss":         { protein: 30, carbs: 40, fat: 30 },
  "Belly Fat Reduction": { protein: 35, carbs: 35, fat: 30 },
  "Fitness":             { protein: 35, carbs: 45, fat: 20 }
};

const DAYS_OF_WEEK = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const SHORT_DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
