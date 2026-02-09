async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.top = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }
}

function setButtonState(btn, label, ms=1200){
  const prev = btn.textContent;
  btn.textContent = label;
  btn.disabled = true;
  setTimeout(()=>{ btn.textContent = prev; btn.disabled = false; }, ms);
}

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('button.copy');
  if (!btn) return;
  const targetId = btn.getAttribute('data-copy');
  const el = document.getElementById(targetId);
  if (!el) return;
  const text = el.textContent.replace(/\n+$/,'') + "\n";
  const ok = await copyText(text);
  setButtonState(btn, ok ? 'Copied' : 'Copy failed');
});
