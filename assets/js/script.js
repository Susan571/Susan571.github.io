'use strict';

// Keep the news window current without inventing days for month-only dates.
function organizeNewsByAge(referenceDate) {
  const section = document.getElementById('updates');
  if (!section) return;
  const recent = section.querySelector('[data-recent-news]');
  const archive = section.querySelector('[data-news-archive]');
  const older = section.querySelector('[data-older-news]');
  if (!recent || !archive || !older) return;
  const now = referenceDate || new Date();
  const cutoff = String(now.getFullYear() - 1) + '-' + String(now.getMonth() + 1).padStart(2, '0');
  const entries = Array.from(section.querySelectorAll('.news-list > li'));
  function monthOf(entry) {
    const time = entry.querySelector('time[datetime]');
    return time ? time.getAttribute('datetime').slice(0, 7) : '';
  }
  entries.sort(function (a, b) { return monthOf(b).localeCompare(monthOf(a)); });
  entries.forEach(function (entry) {
    const month = monthOf(entry);
    if (/^\d{4}-(0[1-9]|1[0-2])$/.test(month) && month < cutoff) older.append(entry);
    else recent.append(entry);
  });
  archive.hidden = older.children.length === 0;
}

// Each page is a real HTML document; navigation works without JavaScript.
// Only deep links into native disclosures need this small enhancement.
function revealAnchorTarget(hash) {
  if (!hash || hash === '#') return null;
  let id;
  try { id = decodeURIComponent(hash.slice(1)); }
  catch { return null; }
  const target = document.getElementById(id);
  if (!target) return null;
  let parent = target.parentElement;
  while (parent) {
    if (parent.tagName === 'DETAILS') parent.open = true;
    parent = parent.parentElement;
  }
  if (target.tagName === 'DETAILS') target.open = true;
  return target;
}

function followHash() {
  const target = revealAnchorTarget(window.location.hash);
  if (target) requestAnimationFrame(function () { target.scrollIntoView(); });
}

document.addEventListener('click', function (event) {
  const link = event.target.closest('a[href^="#"]');
  if (link) revealAnchorTarget(link.getAttribute('href'));
});
window.addEventListener('hashchange', followHash);
organizeNewsByAge();
if (window.location.hash) followHash();
