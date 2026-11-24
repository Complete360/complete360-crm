// [SYS.17] Subtask Builder v1.5
// v1.5: MADS added. 'SET MADS Tech' gets an Ad Creatives subtask for Hannah, created in Scheduled, on NEW and RENEWAL cards.
//       Templates can now set status (default 'to_do'; 'doing' = Scheduled) and assignee (default = card owner).
//       Called from [CS.MADS] Hook A (Opportunity Found branch).
// v1.4: Quarterly also on RENEWAL ACR cards (Initial stays new-orders only); skip Completed/Cancelled cards;
//       red alert card to Jared when something goes wrong or no SET/ACR card is found.
// v1.3: LSB added. Products live: GBPM, LSB, PLAT.
// v1.2: 'Initial Prospect Report' on SET CSR (one time, due now); 'Quarterly Prospect Report' on ACR CSR (rescheduled by hand every 90 days).
// v1.1: subtask title includes the CID.
// Called with Add to Workflow from [CS.GBPM], [CS.LSB], [CS.PLAT], [CS.MADS]: Hook A after the order is found (SET card just created),
// Hook B after the ACR cards are created (new-order AND renewal branches).
// It does not need to know which hook called it: it looks at THIS contact's cards created in the last 24 hours
// and reads [SET] or [ACR] from each title. Cards that already have the subtask are skipped.
// HTTP: GHL Custom Code has no fetch(); use customRequest.post(fullUrl, { data, headers }).
const LOCATION = '1pBjHBEIsKGbwvAUTY9u';
const BASE = 'https://services.leadconnectorhq.com';
const token = inputData.token;
const contactId = inputData.contactId;
const companyName = String(inputData.companyName || '').trim();
const contactCid = String(inputData.cid || '').trim();
const LIST_IDS = ['6acfea8aaecbdc823cb57b71', '6aa121b936c0c8cf7861a342']; // Projects, General Tasks (ACR cards)
const ALERT_LIST = '6aa121b936c0c8cf7861a342'; // General Tasks
const ALERT_ASSIGNEE = 'DQPlifx0eU5JDGYyHzsM'; // Jared
const HANNAH = 'e3L8ilv2a0kFgvaUkETZ';
const DAY = 864e5;
const WINDOW_HOURS = 24; // only cards created in the last 24 hours get subtasks

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---- TEMPLATES ----
// Key = 'CARD CODE ROLE' from the card title, e.g. '✅ [SET] GBPM CSR | Client | 127487' -> 'SET GBPM CSR'.
// due: 'now' = due right away; 'now+3' = 3 days out; 'purchase+90' = 90 days after this order's SET card was created (order confirmed).
// newOnly: true = skip RENEWAL cards. status: list status key (default 'to_do'; 'doing' = Scheduled). assignee: user id (default = card owner).
const withCid = (label, client, cid) => label + ' | ' + client + (cid ? ' | ' + cid : '');

const INITIAL_PROSPECT = {
  title: (client, cid) => withCid('Initial Prospect Report', client, cid),
  due: 'now',
  newOnly: true,
  body: client => '<p><strong>📊 INITIAL PROSPECT REPORT (one time)</strong><br />This is the baseline report for this new customer. It only needs to be done once.</p><p></p>' +
    '<p><strong>To complete it:</strong></p>' +
    '<ul><li><p>Run the prospect report</p></li>' +
    '<li><p>Download it and upload it to this customer\'s contact record with the date in the file name, like: <strong>Prospect Report - ' + esc(client) + ' - YYYY-MM-DD</strong></p></li>' +
    '<li><p>Mark this subtask <strong>Completed</strong></p></li></ul>' +
    '<p>When the build is done, a <strong>Quarterly Prospect Report</strong> subtask is added to the ACR card automatically, due 90 days after the order was confirmed.</p>'
};

const QUARTERLY_PROSPECT = {
  title: (client, cid) => withCid('Quarterly Prospect Report', client, cid),
  due: 'purchase+90',
  newOnly: false,
  body: (client, isRenewal) => '<p><strong>🔁 QUARTERLY PROSPECT REPORT (recurring)</strong><br />Run a fresh prospect report every 90 days for as long as this service is active, and compare it to the previous one.</p><p></p>' +
    (isRenewal ? '<p><strong>♻️ Renewal:</strong> if the previous term\'s Quarterly Prospect Report subtask is still open, mark it <strong>Completed</strong> so only this one stays active.</p><p></p>' : '') +
    '<p><strong>Each quarter:</strong></p>' +
    '<ul><li><p>Run the prospect report</p></li>' +
    '<li><p>Download it and upload it to this customer\'s contact record with the date in the file name, like: <strong>Prospect Report - ' + esc(client) + ' - YYYY-MM-DD</strong></p></li>' +
    '<li><p>Comment on the ACR card: <strong>"REPORT RUN [date]"</strong> with a one-line comparison to the previous report</p></li>' +
    '<li><p><strong>Reschedule this subtask 90 days out.</strong> Don\'t mark it Completed.</p></li></ul>' +
    '<p>Only mark it <strong>Completed</strong> when the service ends (cancelled or not renewed).</p>'
};

const AD_CREATIVES = {
  title: (client, cid) => withCid('Ad Creatives', client, cid),
  due: 'now+3',
  newOnly: false,
  status: 'doing', // Scheduled
  assignee: HANNAH,
  body: (client, isRenewal) => '<p><strong>🎨 AD CREATIVES' + (isRenewal ? ' (RENEWAL REFRESH)' : '') + '</strong><br />' +
    (isRenewal ?
      'This client renewed. Replace tired creative with fresh images, video, and copy for the new term.' :
      'Creatives for this client\'s new Meta Ads campaign.') + '</p><p></p>' +
    '<p><strong>Start when</strong> you get the "form is in" email or Luis @mentions you that the assets are in. Until then this stays Scheduled.</p>' +
    '<ul><li><p>Set this subtask to In Progress when you start</p></li>' +
    '<li><p>At least two ad variations, sized for feed and stories, using the client\'s own photos first</p></li>' +
    '<li><p>Upload the finished files to ' + esc(client) + '\'s contact record</p></li>' +
    '<li><p>Leave a contact note @mentioning Gabriel that the creatives are delivered</p></li>' +
    '<li><p>Mark this subtask <strong>Completed</strong></p></li></ul>'
};

const TEMPLATES = {
  'SET GBPM CSR': [INITIAL_PROSPECT],
  'SET LSB CSR': [INITIAL_PROSPECT],
  'SET PLAT CSR': [INITIAL_PROSPECT],
  'ACR GBPM CSR': [QUARTERLY_PROSPECT],
  'ACR LSB CSR': [QUARTERLY_PROSPECT],
  'ACR PLAT CSR': [QUARTERLY_PROSPECT],
  'SET MADS Tech': [AD_CREATIVES]
};

const headers = {
  Authorization: 'Bearer ' + token,
  Version: '2021-07-28',
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

function errText(e) {
  if (e === undefined) return 'threw undefined';
  if (e === null) return 'threw null';
  if (typeof e !== 'object') return String(e).slice(0, 250);
  if (e.response) return 'HTTP ' + e.response.status + ' ' + JSON.stringify(e.response.data).slice(0, 200);
  if (e.message) return e.message;
  try {
    return JSON.stringify(e).slice(0, 250);
  } catch (x) {
    return String(e);
  }
}
async function post(path, body) {
  const res = await customRequest.post(BASE + path + (path.includes('?') ? '&' : '?') + 'locationId=' + LOCATION, {
    data: body,
    headers
  });
  return res && res.data !== undefined ? res.data : res;
}

function parse(title) {
  const m = String(title || '').match(/\[(SET|ACR)\]\s+([A-Z0-9]+)\s+(\w+)\s*\|\s*(.*?)\s*\|\s*([^|]+?)\s*$/);
  return m ? {
    type: m[1],
    code: m[2],
    role: m[3],
    client: m[4],
    orderId: m[5]
  } : null;
}

function isClosed(p) {
  const s = String(p.status || '').toLowerCase();
  const g = String(p.statusGroup || '').toLowerCase();
  return g === 'closed' || s === 'completed' || s === 'cancelled' || p.completed === 1 || p.completed === true;
}

async function main() {
  if (!token) throw new Error('No token on the Custom Code step');
  if (!contactId) throw new Error('No contactId');
  if (!companyName) throw new Error('Contact has no company name, so its cards cannot be found');
  const search = await post('/projects/tasks/search', {
    limit: 100,
    listIds: LIST_IDS,
    query: companyName.slice(0, 75),
    subtaskViewMode: 'expanded'
  });
  const tasks = ((search && search.tasks) || []).filter(t => (t.relations || []).some(r => r.objectKey === 'contact' && r.recordId === contactId));

  // Purchase date per order = when its SET card was created (ORD.01 confirmed the order or the renewal).
  const purchased = {};
  for (const t of tasks) {
    const c = parse((t.properties || {}).title);
    if (c && c.type === 'SET') {
      const at = Date.parse(t.createdAt);
      if (!purchased[c.orderId] || at < purchased[c.orderId]) purchased[c.orderId] = at;
    }
  }

  const now = Date.now();
  const result = {
    cardsOnContact: tasks.length,
    recentCsrCards: 0, // recent cards that have a template (CSR cards, plus MADS Tech)
    matched: 0,
    created: [],
    skipped: [],
    errors: []
  };
  for (const t of tasks) {
    const p = t.properties || {};
    const c = parse(p.title);
    if (!c) continue;
    const key = c.type + ' ' + c.code + ' ' + c.role;
    const tpl = TEMPLATES[key];
    if (!tpl) continue;
    if (now - Date.parse(t.createdAt) > WINDOW_HOURS * 3600e3) continue;
    result.recentCsrCards++;
    if (isClosed(p)) {
      result.skipped.push(key + ' ' + c.orderId + ': card is closed');
      continue;
    }
    const isRenewal = String(p.body || '').includes('<strong>RENEWAL</strong>');
    const cid = String(p.cid || contactCid || '').trim();
    const existing = (t.subtasks || []).map(s => ((s.properties || {}).title || s.title || '').trim());
    for (const st of tpl) {
      if (st.newOnly && isRenewal) {
        result.skipped.push(key + ' ' + c.orderId + ': renewal (new orders only)');
        continue;
      }
      result.matched++;
      const title = st.title(c.client, cid);
      if (existing.includes(title)) {
        result.skipped.push(key + ' ' + c.orderId + ': already has ' + title);
        continue;
      }
      let due = now;
      if (st.due === 'now+3') due = now + 3 * DAY;
      if (st.due === 'purchase+90') {
        const base = purchased[c.orderId] || Date.parse(t.createdAt);
        due = Math.max(base + 90 * DAY, now + DAY);
      }
      const payload = {
        title,
        dueDate: new Date(due).toISOString(),
        parentTaskId: t.id,
        status: st.status || 'to_do',
        contactId
      };
      if (st.body) payload.body = st.body(c.client, isRenewal);
      if (st.assignee) payload.assignees = [st.assignee];
      else if (t.assignees && t.assignees.length) payload.assignees = [t.assignees[0]];
      try {
        await post('/projects/lists/' + p.primaryListId + '/tasks', payload);
        result.created.push(key + ' ' + c.orderId + ': ' + title + ' (due ' + payload.dueDate.slice(0, 10) + ')');
      } catch (e) {
        result.errors.push(key + ' ' + c.orderId + ': ' + errText(e));
      }
    }
  }
  return result;
}

// Red alert card to Jared in General Tasks. Best effort: if the token itself is broken this cannot be created either.
async function alertCard(reason, detail) {
  try {
    const who = companyName || 'Unknown company';
    await post('/projects/lists/' + ALERT_LIST + '/tasks', {
      title: '⚠️ [SYS] Subtask Builder failed | ' + who + (contactCid ? ' | ' + contactCid : ''),
      body: '<p><strong>⚠️ TEMPLATE SUBTASK NOT CREATED</strong><br />' + esc(reason) + '</p><p></p>' +
        '<p><strong>Details:</strong> ' + esc(String(detail || '').slice(0, 800)) + '</p><p></p>' +
        '<p><strong>To fix:</strong> correct the cause, then add this contact to [SYS.17] Subtask Builder within 24 hours of the card being created, or add the subtask (Prospect Report or Ad Creatives) by hand. Mark this card Completed when done.</p><p></p>' +
        '<p><em>Created by: [SYS.17] Subtask Builder</em></p>',
      dueDate: new Date(Date.now() + 3600e3).toISOString(),
      status: 'to_do',
      assignees: [ALERT_ASSIGNEE],
      contactId
    });
    return true;
  } catch (e) {
    return false;
  }
}

let out;
try {
  const r = await main();
  let alerted = false;
  if (r.errors.length) {
    alerted = await alertCard('Some subtasks could not be created.', r.errors.join(' | '));
  } else if (r.recentCsrCards === 0) {
    alerted = await alertCard('No card with a subtask template (SET/ACR CSR for GBPM, LSB or PLAT, or SET MADS Tech) was found on this contact from the last 24 hours, so no subtask was added.', 'Cards found on contact: ' + r.cardsOnContact + '. Check that the card exists, is linked to this contact, and that its title follows the [SET]/[ACR] CODE ROLE | Client | Order format.');
  }
  out = {
    status: r.errors.length ? 'partial' : (r.recentCsrCards === 0 ? 'no_cards' : 'ok'),
    created: r.created.length,
    alerted,
    detail: JSON.stringify(r)
  };
} catch (e) {
  const msg = errText(e);
  const alerted = await alertCard('The Subtask Builder stopped with an error.', msg);
  out = {
    status: 'error',
    created: 0,
    alerted,
    detail: msg
  };
}
return out;
