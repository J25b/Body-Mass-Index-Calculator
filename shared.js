// Shared constants and helpers used across index.html, checkin.html, results.html

const CATEGORY_COLORS_LIGHT = {
  'Underweight': '#5B7C99',
  'Normal weight': '#6B8F4E',
  'Overweight': '#C99A3C',
  'Obese': '#9B3B32'
};
const CATEGORY_COLORS_DARK = {
  'Underweight': '#82A6CC',
  'Normal weight': '#8FBE72',
  'Overweight': '#E0B15C',
  'Obese': '#C25C4E'
};
function getCategoryColor(cat) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const map = isDark ? CATEGORY_COLORS_DARK : CATEGORY_COLORS_LIGHT;
  return map[cat] || (isDark ? '#BFB49F' : '#6B6355');
}

const THEME_KEY = 'bodyiqTheme';
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  syncThemeToggleButton();
  if (typeof onThemeChanged === 'function') onThemeChanged(next);
}
function syncThemeToggleButton() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  btn.textContent = theme === 'dark' ? '\u2600\uFE0F Light' : '\uD83C\uDF19 Dark';
}

const KG_PER_LB = 0.453592;
const CM_PER_IN = 2.54;
const ACTIVITY_MULTIPLIER = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
const LABELS = {
  sedentary: 'I mostly sit or stay in one place all day',
  light: 'I move around a little here and there',
  moderate: "I'm fairly active most days",
  active: "I'm on the move constantly",
  lose: 'I want to lose weight',
  gain: 'I want to gain weight',
  maintain: 'I want to stay around where I am',
  improve: 'I just want to feel healthier overall',
  healthy: 'I eat pretty healthy, most of the time',
  mixed: "It's a mix \u2014 some healthy, some not",
  processed: 'Mostly fast food or processed meals',
  never: 'Rarely or never',
  '1-2': 'A day or two a week',
  '3-5': 'A solid few days a week',
  daily: 'Pretty much every day',
  less6: 'Not much \u2014 under 6 hours',
  '6-8': 'A decent amount \u2014 6 to 8 hours',
  more8: 'Plenty \u2014 more than 8 hours'
};

const MEASUREMENT_KEY = 'bodyiqMeasurement';
const ASSESSMENT_KEY = 'bodyiqAssessment';
const HISTORY_KEY = 'bmiTapeHistory';
const MAX_HISTORY = 5;

function saveMeasurement(data) {
  try { localStorage.setItem(MEASUREMENT_KEY, JSON.stringify(data)); } catch (e) {}
}
function loadMeasurement() {
  try { return JSON.parse(localStorage.getItem(MEASUREMENT_KEY)); } catch (e) { return null; }
}
function saveAssessment(data) {
  try { localStorage.setItem(ASSESSMENT_KEY, JSON.stringify(data)); } catch (e) {}
}
function loadAssessment() {
  try { return JSON.parse(localStorage.getItem(ASSESSMENT_KEY)); } catch (e) { return null; }
}
function clearAssessment() {
  try { localStorage.removeItem(ASSESSMENT_KEY); } catch (e) {}
}
function clearFlow() {
  try {
    localStorage.removeItem(MEASUREMENT_KEY);
    localStorage.removeItem(ASSESSMENT_KEY);
  } catch (e) {}
}

function nutritionText(eating, goal) {
  let base;
  if (eating === 'processed') base = "Try swapping one processed meal a day for something home-cooked \u2014 small, steady swaps tend to add up more than big overhauls.";
  else if (eating === 'mixed') base = "You're already mixing healthy and less-healthy choices \u2014 leaning a little more toward vegetables, lean protein, and whole grains could help you feel steadier through the day.";
  else base = "Your eating habits already sound solid \u2014 keep prioritizing variety and portion balance rather than cutting foods out.";

  let goalNote;
  if (goal === 'lose') goalNote = " Since you're aiming to lose weight, keeping meals protein-rich and easing off sugary drinks tends to help the most.";
  else if (goal === 'gain') goalNote = " Since you're aiming to gain weight, an extra nutrient-dense snack or two between meals can help without feeling forced.";
  else if (goal === 'maintain') goalNote = " Since you're aiming to maintain, consistency matters more here than perfection.";
  else goalNote = " For overall health, think in terms of adding good things in rather than just cutting things out.";

  return base + goalNote;
}

function activityText(exercise, goal) {
  let base;
  if (exercise === 'never') base = "Even a 10\u201315 minute walk a few times a week is a solid place to start \u2014 you don't need a gym to begin moving more.";
  else if (exercise === '1-2') base = "You're already building the habit \u2014 adding just one more day a week could help you notice more progress.";
  else if (exercise === '3-5') base = "You're doing well \u2014 mixing in strength training a couple of times a week can complement what you're already doing.";
  else base = "You're highly active \u2014 just make sure you're building in real rest days so your body can recover.";

  let goalNote;
  if (goal === 'lose') goalNote = " A mix of cardio and light strength work tends to support weight loss best over time.";
  else if (goal === 'gain') goalNote = " Focus on strength training with gradual increases in weight or reps to support healthy gain.";
  else goalNote = " Keep doing what feels sustainable \u2014 consistency beats intensity here.";

  return base + goalNote;
}

function sleepText(sleep) {
  if (sleep === 'less6') return "You're getting under 6 hours most nights \u2014 sleep plays a big role in appetite, energy, and recovery, so even 30\u201345 extra minutes can make a noticeable difference.";
  if (sleep === '6-8') return "You're in a solid range \u2014 protecting that routine, especially a consistent bedtime, will keep it working for you.";
  return "You're getting plenty of rest \u2014 it's worth checking that the sleep actually feels restful, not just long.";
}

function hydrationText(activity) {
  if (activity === 'active') return "Aim for roughly 2.5\u20133.5 liters of water a day \u2014 a bit more on days you're sweating a lot.";
  return "Aim for roughly 2\u20132.5 liters of water a day, and a little more on hot or active days.";
}

function lifestyleText(goal) {
  if (goal === 'lose') return "Small, steady changes tend to stick far better than drastic ones. Aim for gradual progress you can actually maintain, not perfection.";
  if (goal === 'gain') return "Building weight takes patience \u2014 track progress over weeks, not days, and don't be discouraged by normal day-to-day fluctuation.";
  if (goal === 'maintain') return "You're already close to where you want to be \u2014 the small, consistent habits you're keeping now are exactly what keeps it that way.";
  return "Overall health is bigger than any single number. Sleep, movement, food, and stress all play a part, so improving any one of them counts.";
}

// ---- Wellness Score & Wellness Snapshot ----

function computeWellnessScores(measurement, assessment) {
  const weightMap = { 'Normal weight': 95, 'Overweight': 65, 'Underweight': 65, 'Obese': 45 };
  const activityLevelMap = { sedentary: 40, light: 60, moderate: 80, active: 100 };
  const exerciseMap = { never: 30, '1-2': 55, '3-5': 80, daily: 100 };
  const nutritionMap = { healthy: 95, mixed: 65, processed: 40 };
  const sleepMap = { less6: 50, '6-8': 95, more8: 85 };

  const weight = weightMap[measurement.category] != null ? weightMap[measurement.category] : 70;
  const activityLevelScore = activityLevelMap[assessment.activity] != null ? activityLevelMap[assessment.activity] : 60;
  const exerciseScore = exerciseMap[assessment.exercise] != null ? exerciseMap[assessment.exercise] : 60;
  const activity = Math.round((activityLevelScore + exerciseScore) / 2);
  const nutrition = nutritionMap[assessment.eating] != null ? nutritionMap[assessment.eating] : 65;
  const sleep = sleepMap[assessment.sleep] != null ? sleepMap[assessment.sleep] : 70;

  const overall = Math.round(
    weight * 0.25 + activityLevelScore * 0.20 + exerciseScore * 0.20 + nutrition * 0.20 + sleep * 0.15
  );

  let status;
  if (overall >= 85) status = 'Excellent';
  else if (overall >= 70) status = 'Good';
  else if (overall >= 55) status = 'Fair';
  else status = 'Needs Improvement';

  return { weight: weight, activity: activity, nutrition: nutrition, sleep: sleep, overall: overall, status: status };
}

function wellnessInsight(scores) {
  const dims = [
    { label: 'Weight Status', value: scores.weight },
    { label: 'Physical Activity', value: scores.activity },
    { label: 'Nutrition', value: scores.nutrition },
    { label: 'Sleep', value: scores.sleep }
  ];
  const strongest = dims.reduce(function (a, b) { return b.value > a.value ? b : a; });
  const weakest = dims.reduce(function (a, b) { return b.value < a.value ? b : a; });

  const strongestText = 'Your strongest area right now is <strong>' + strongest.label + '</strong>.';
  const improvementText = strongest.label === weakest.label
    ? "You're holding remarkably steady across the board \u2014 nice consistency."
    : 'There\u2019s room to grow in <strong>' + weakest.label + '</strong> \u2014 even small, steady changes here could make a real difference.';

  return strongestText + ' ' + improvementText;
}

function wellnessStatusClass(status) {
  if (status === 'Excellent') return 'excellent';
  if (status === 'Good') return 'good';
  if (status === 'Fair') return 'fair';
  return 'needs';
}

function wellnessExplanation(scores) {
  const dims = [
    { label: 'your weight status', value: scores.weight },
    { label: 'physical activity', value: scores.activity },
    { label: 'nutrition', value: scores.nutrition },
    { label: 'sleep', value: scores.sleep }
  ];
  const sorted = dims.slice().sort(function (a, b) { return b.value - a.value; });
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  let opener;
  if (scores.overall >= 85) opener = "You're in a really strong place overall \u2014 ";
  else if (scores.overall >= 70) opener = "You're doing well overall, with a solid foundation \u2014 ";
  else if (scores.overall >= 55) opener = "You've got a fair foundation with some clear opportunities \u2014 ";
  else opener = "There's real opportunity here, and that's a good thing \u2014 it means small changes can move the needle \u2014 ";

  return opener + best.label + " looks like a real strength for you right now. If you're looking for where to focus next, " + worst.label + " could be the gentlest place to start \u2014 nothing drastic, just small and steady.";
}

function buildWellnessWheelSVG(scores) {
  const labels = ['Weight Status', 'Physical Activity', 'Nutrition', 'Sleep', 'Overall Wellness'];
  const values = [scores.weight, scores.activity, scores.nutrition, scores.sleep, scores.overall];
  const size = 240, center = size / 2, maxR = 78;
  const angleStep = (2 * Math.PI) / 5;
  const startAngle = -Math.PI / 2;

  function pointFor(i, r) {
    const angle = startAngle + i * angleStep;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  let svg = '<svg viewBox="0 0 ' + size + ' ' + size + '" width="100%" height="100%" style="max-width:230px;display:block;">';

  [0.25, 0.5, 0.75, 1].forEach(function (frac) {
    const pts = [];
    for (let i = 0; i < 5; i++) { const p = pointFor(i, maxR * frac); pts.push(p[0] + ',' + p[1]); }
    svg += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="var(--divider)" stroke-width="1" />';
  });

  for (let i = 0; i < 5; i++) {
    const p = pointFor(i, maxR);
    svg += '<line x1="' + center + '" y1="' + center + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="var(--divider)" stroke-width="1" />';
  }

  const dataPts = [];
  for (let i = 0; i < 5; i++) {
    const r = maxR * (Math.max(0, Math.min(100, values[i])) / 100);
    const p = pointFor(i, r);
    dataPts.push(p[0] + ',' + p[1]);
  }
  svg += '<polygon points="' + dataPts.join(' ') + '" fill="var(--brass)" fill-opacity="0.30" stroke="var(--thread)" stroke-width="2" stroke-linejoin="round" />';

  for (let i = 0; i < 5; i++) {
    const r = maxR * (Math.max(0, Math.min(100, values[i])) / 100);
    const p = pointFor(i, r);
    svg += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.5" fill="var(--thread)" />';
  }

  for (let i = 0; i < 5; i++) {
    const p = pointFor(i, maxR + 20);
    const anchor = Math.abs(p[0] - center) < 6 ? 'middle' : (p[0] > center ? 'start' : 'end');
    svg += '<text x="' + p[0] + '" y="' + p[1] + '" text-anchor="' + anchor + '" dominant-baseline="middle" font-size="9.5" font-family="Karla, sans-serif" font-weight="700" fill="var(--ink-soft)">' + labels[i] + '</text>';
  }

  svg += '</svg>';
  return svg;
}

function buildBodyReflection(measurement, assessment, scores) {
  const first = (measurement.name || '').trim().split(' ')[0];

  const dims = [
    { label: 'weight status', value: scores.weight },
    { label: 'physical activity', value: scores.activity },
    { label: 'nutrition', value: scores.nutrition },
    { label: 'sleep', value: scores.sleep }
  ];
  const sorted = dims.slice().sort(function (a, b) { return b.value - a.value; });
  const strongest = sorted[0].label;
  const gentlest = sorted[sorted.length - 1].label;

  const goalPhraseMap = {
    lose: 'working toward losing some weight',
    gain: 'working toward gaining some weight',
    maintain: 'focused on staying right where you are',
    improve: 'focused on feeling healthier overall'
  };
  const goalPhrase = goalPhraseMap[assessment.goal] || 'thinking about your overall health';

  const p1 = (first ? first + ", h" : "H") + "ere's where things stand today: your BMI landed in the " +
    measurement.category.toLowerCase() + " range, and your overall wellness score came out to " + scores.overall +
    " out of 100 \u2014 which puts you in the \u201c" + scores.status + "\u201d range. That number isn't a grade; it's just " +
    "a snapshot of one moment, built from your measurements and how you answered a few questions about your day-to-day life.";

  const p2 = "You told us you're " + goalPhrase + ", and looking at your habits, " + strongest +
    " stands out as a real strength right now \u2014 that's worth recognizing. If there's one place that could use a " +
    "little more attention, it's " + gentlest + ". Not a big overhaul, just small, steady adjustments over time.";

  const p3 = "Long-term health isn't built in a single day, and it isn't built through perfection either \u2014 it's built " +
    "through habits you can actually keep up with. Whatever you do next, let it be something sustainable, not something " +
    "drastic. You're allowed to take this one small step at a time.";

  return [p1, p2, p3];
}
