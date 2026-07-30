// Body IQ — dynamic content fetching (announcement banner, PDF footer
// override). Reads only status = 'published' rows, enforced by Supabase
// Row Level Security on the content_items table — this file structurally
// cannot see draft or disabled content, regardless of what it asks for.
//
// Uses the same Supabase project/credentials as analytics.js. If you've
// already configured those there, copy the same two values here.

(function () {
  var SUPABASE_URL = 'https://stebrrcpglrjdvalubxj.supabase.co/rest/v1/';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZWJycmNwZ2xyamR2YWx1YnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0MTU2OTgsImV4cCI6MjEwMDk5MTY5OH0.YrdFFOH3P9WdW-qh9a6DFvi9k8rqnhpcHcOK35Cwd-4';

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

  function fetchPublishedAnnouncement() {
    if (!client) return Promise.resolve(null);
    return client
      .from('content_items')
      .select('body')
      .eq('type', 'announcement')
      .eq('status', 'published')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(function (res) {
        return (res.data && res.data.body) ? res.data.body : null;
      })
      .catch(function () { return null; });
  }

  function fetchPdfFooterText() {
    if (!client) return Promise.resolve(null);
    return client
      .from('content_items')
      .select('body')
      .eq('type', 'pdf_footer')
      .eq('status', 'published')
      .limit(1)
      .maybeSingle()
      .then(function (res) {
        return (res.data && res.data.body) ? res.data.body : null;
      })
      .catch(function () { return null; });
  }

  function fetchMaintenanceMode() {
    if (!client) return Promise.resolve(false);
    return client
      .from('app_settings')
      .select('value')
      .eq('key', 'maintenance_mode')
      .maybeSingle()
      .then(function (res) {
        return !!(res.data && res.data.value === true);
      })
      .catch(function () { return false; });
  }

  window.BodyIQContent = {
    fetchPublishedAnnouncement: fetchPublishedAnnouncement,
    fetchPdfFooterText: fetchPdfFooterText,
    fetchMaintenanceMode: fetchMaintenanceMode
  };
})();
