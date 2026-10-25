/* Nectarbloom deck viewer — shared logic */
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (!slides.length) return;
  var counter = document.getElementById('counter');
  var bar = document.getElementById('bar');
  var i = 0;

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle('active', k === i); });
    if (counter) counter.textContent = (i + 1) + ' / ' + slides.length;
    if (bar) bar.style.width = ((i + 1) / slides.length * 100) + '%';
    if (slides[i]) slides[i].scrollTop = 0;
    var want = '#' + (i + 1);
    if (location.hash !== want) { try { history.replaceState(null, '', want); } catch (e) {} }
  }
  function prev() { show(i - 1); }
  function next() { show(i + 1); }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
    else if (e.key === 'Home') { e.preventDefault(); show(0); }
    else if (e.key === 'End') { e.preventDefault(); show(slides.length - 1); }
  });

  var p = document.getElementById('prev'), n = document.getElementById('next');
  if (p) p.addEventListener('click', prev);
  if (n) n.addEventListener('click', next);
  var pdf = document.getElementById('exportPdf');
  if (pdf) pdf.addEventListener('click', function () { window.print(); });

  window.addEventListener('hashchange', function () {
    var h = parseInt((location.hash || '').replace('#', ''), 10);
    if (h && h - 1 !== i) show(h - 1);
  });

  var start = parseInt((location.hash || '').replace('#', ''), 10);
  show(start ? start - 1 : 0);
})();
