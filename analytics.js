// Body IQ — minimal anonymous usage counting.
//
// Scope: visit counts, BMI-calculation counts (by category), report-
// download counts, and assessment-completion counts (with the selected
// goal and the computed wellness score — both bucketed/summary values,
// same as the BMI category). No raw assessment answers, no device,
// browser, OS, theme, or session-duration data. The only client-side
// state this creates is one random UUID in localStorage, used solely to
// tell "new visit" from "returning visit" as a count — it is never sent
// anywhere alongside a name, measurement, or result.
//
// See the Privacy First section (results page / PDF) for the plain-language
// explanation of what this does and does not do.
//
// CONFIGURE BEFORE DEPLOYING: replace the two placeholder values below with
// your real BodyIQ HQ Supabase project's URL and anon/public key (Settings
// -> API in your Supabase project). The anon key is safe to expose in
// client code by design — Row Level Security on the `events` table is what
// actually restricts it to write-only, insert-only access. Never put your
// service_role key here.

(function () {
  var SUPABASE_URL = 'https://replace-with-your-bodyiq-hq-project.supabase.co';
  var SUPABASE_ANON_KEY = 'replace-with-your-anon-public-key';
  var SESSION_ID_KEY = 'bodyiqAnonId';

  var client = null;
  try {
    if (window.supabase && window.supabase.createClient) {
      client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: false }
      });
    }
  } catch (e) {
    client = null;
  }

  function generateUuid() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    // Fallback for older browsers without crypto.randomUUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function send(eventType, extra) {
    if (!client) return;
    var id;
    try { id = localStorage.getItem(SESSION_ID_KEY); } catch (e) { id = null; }
    if (!id) return; // trackVisit() establishes the id; nothing to attach this to otherwise
    var payload = Object.assign({ event_type: eventType, session_id: id }, extra || {});
    client.from('events').insert(payload).then(function (res) {
      if (res.error) console.warn('Analytics ping failed (non-blocking):', res.error.message);
    });
  }

  window.BodyIQAnalytics = {
    trackVisit: function () {
      if (!client) return;
      var id, isReturning;
      try {
        id = localStorage.getItem(SESSION_ID_KEY);
        isReturning = !!id;
        if (!id) {
          id = generateUuid();
          localStorage.setItem(SESSION_ID_KEY, id);
        }
      } catch (e) {
        return;
      }
      client.from('events').insert({
        event_type: 'session_start',
        session_id: id,
        is_returning: isReturning
      }).then(function (res) {
        if (res.error) console.warn('Analytics ping failed (non-blocking):', res.error.message);
      });
    },
    trackBmiCalculated: function (bmiCategory) {
      send('bmi_calculated', { bmi_category: bmiCategory });
    },
    trackReportDownloaded: function () {
      send('report_downloaded', {});
    },
    trackAssessmentCompleted: function (wellnessGoal, wellnessScore) {
      send('assessment_completed', { wellness_goal: wellnessGoal, wellness_score: wellnessScore });
    }
  };
})();
