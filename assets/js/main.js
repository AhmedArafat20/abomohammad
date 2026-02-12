// ========= CONFIG (غيّر الرقم هنا) =========
const PHONE_NUMBER = "966555185579";   // رقم الواتساب (دولي بدون +)
const DISPLAY_PHONE = "0555185579";    // رقم الاتصال المباشر


// ========= Helpers =========
function qs(sel, root = document){ return root.querySelector(sel); }
function qsa(sel, root = document){ return Array.from(root.querySelectorAll(sel)); }

function waLink(message){
  // wa.me requires digits only
  const digits = PHONE_NUMBER.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
}

function initYear(){
  const y = qs("#year");
  if(y) y.textContent = new Date().getFullYear();
}

function initNav(){
  const btn = qs(".nav-toggle");
  const nav = qs(".nav");
  if(!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // close on link click (mobile)
  qsa(".nav a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded","false");
    });
  });

  // close when click outside
  document.addEventListener("click", (e) => {
    if(!nav.classList.contains("open")) return;
    if(nav.contains(e.target) || btn.contains(e.target)) return;
    nav.classList.remove("open");
    btn.setAttribute("aria-expanded","false");
  });
}

function initReveal(){
  const els = qsa(".reveal");
  if(!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        ent.target.classList.add("show");
        io.unobserve(ent.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

function initPhoneAndWhatsapp(){
  // set phone links
  qsa("[data-phone]").forEach(a => {
    // tel works fine on mobile; on desktop it opens the default handler
    a.setAttribute("href", `tel:${DISPLAY_PHONE.replace(/\s/g,"")}`);
  });

  // set whatsapp links (generic)
  qsa("[data-wa]").forEach(a => {
    const msg = "السلام عليكم، أحتاج تأجير معدات. ممكن تسعيرة؟";
    a.setAttribute("href", waLink(msg));
  });
}

function initQuickForm(){
  const form = qs("#quickForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    const name = (fd.get("name") || "").toString().trim();
    const city = (fd.get("city") || "").toString().trim();
    const service = (fd.get("service") || "").toString().trim();
    const details = (fd.get("details") || "").toString().trim();

    const msg =
`السلام عليكم، معكم ${name}.
المدينة: ${city}
الخدمة المطلوبة: ${service}
تفاصيل: ${details || "—"}
أرجو إرسال أفضل عرض.`;

    window.open(waLink(msg), "_blank", "noopener");
  });
}

function initWaForm(){
  const form = qs("#waForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);

    const name = (fd.get("name") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().trim();
    const city = (fd.get("city") || "").toString().trim();
    const service = (fd.get("service") || "").toString().trim();
    const duration = (fd.get("duration") || "").toString().trim();
    const details = (fd.get("details") || "").toString().trim();

    const msg =
`السلام عليكم،
أنا: ${name}
رقم التواصل: ${phone || "—"}
المدينة: ${city}
الخدمة: ${service}
المدة: ${duration}
تفاصيل إضافية: ${details || "—"}

أرجو إرسال التسعيرة والمتاح.`;

    window.open(waLink(msg), "_blank", "noopener");
  });
}

// ========= Boot =========
document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initNav();
  initReveal();
  initPhoneAndWhatsapp();
  initQuickForm();
  initWaForm();
});
