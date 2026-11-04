'use strict';
(function () {
  const link = document.getElementById('launch');
  const status = document.getElementById('status');
  const instructions = document.getElementById('instructions');
  const raw = window.CHY_VOLUNTEER_EXEC_URL;
  let destination;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:' ||
        url.hostname !== 'script.google.com' ||
        !/^\/macros\/s\/[^/]+\/exec\/?$/.test(url.pathname) ||
        url.searchParams.get('view') !== 'volunteer' ||
        [...url.searchParams.keys()].some(k => k !== 'view') ||
        url.hash) throw Error('Destination invalide');
    destination = url.href;
  } catch (_) {
    status.textContent = "Lien Bénévole non configuré. Installation et ouverture indisponibles pour l'instant.";
    return;
  }
  link.href = destination;
  link.removeAttribute('aria-disabled');
  status.textContent = "Vous pouvez ouvrir l'espace bénévole.";
  const installed = window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;
  if (installed) {
    instructions.hidden = true;
    status.textContent = "Ouverture de l'espace bénévole…";
    // Navigation de premier niveau, jamais iframe. Safari peut quitter le mode autonome
    // en franchissant l'origine GitHub Pages : validation sur appareil réel indispensable.
    window.location.replace(destination);
  }
}());
