(() => {
  // Must capture currentScript here at IIFE scope — it is null inside any
  // deferred callback (DOMContentLoaded, setTimeout, etc.).
  const scriptSrc = document.currentScript ? document.currentScript.src : null;

  document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.homepage-featured-example');
    if (!section) return;

    const titleLink    = document.getElementById('homepage-featured-example-link');
    const description  = document.getElementById('homepage-featured-example-description');
    const image        = document.getElementById('homepage-featured-example-image');
    const mediaLink    = document.querySelector('.homepage-featured-example__media');
    const reroll       = document.getElementById('homepage-featured-example-reroll');

    if (!titleLink || !description || !image || !mediaLink || !reroll) return;

    // Resolve the JSON file relative to this script's own URL so it works at
    // any deploy sub-path.  Fall back to a predictable root-relative path.
    const dataUrl = scriptSrc
      ? new URL('featured_examples.json', scriptSrc).toString()
      : '_static/featured_examples.json';

    let examples = [];
    let currentHref = titleLink.getAttribute('href');

    const applyExample = (example) => {
      titleLink.textContent = example.title;
      titleLink.href        = example.href;
      description.textContent = example.description;
      image.src             = example.image;
      image.alt             = example.alt;
      mediaLink.href        = example.href;
      currentHref           = example.href;
    };

    const chooseExample = () => {
      if (!examples.length) return;
      const candidates = examples.filter((ex) => ex.href !== currentHref);
      const pool = candidates.length ? candidates : examples;
      applyExample(pool[Math.floor(Math.random() * pool.length)]);
    };

    reroll.addEventListener('click', chooseExample);

    fetch(dataUrl)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (!Array.isArray(data) || !data.length) { reroll.hidden = true; return; }
        examples = data;
        chooseExample();
      })
      .catch(() => { reroll.hidden = true; });
  });
})();
