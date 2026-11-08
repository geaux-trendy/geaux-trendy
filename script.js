
const notice = document.querySelector('#notice');

document.querySelectorAll('[data-category]').forEach(link =>
  link.addEventListener('click', event => {
    event.preventDefault();
    notice.textContent =
      `${link.dataset.category} products are coming soon!`;
    notice.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  })
);

document.querySelector('#search-form').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('#search').value.trim();
  notice.textContent = query
    ? `Search for “${query}” will be available when sellers start listing products.`
    : 'Enter something to search for.';
  document.querySelector('#categories').scrollIntoView({
    behavior: 'smooth'
  });
});

async function loadPublicProducts() {
  const gallery = document.getElementById('productGallery');
  const message = document.getElementById('galleryStatus');
  if (!gallery || !message) return;

  const projectUrl = 'https://ylzfeviaqwzdazgpbiry.supabase.co';
  const publicKey = 'sb_publishable_SXuCf569a5ipMKPgsRudrA_xEoz-CjE';

  message.textContent = 'Loading products...';

  try {
    const url = projectUrl +
      '/rest/v1/products' +
      '?select=id,name,price_cents,image_url,category,inventory' +
      '&is_active=eq.true' +
      '&order=created_at.desc&limit=60';

    const response = await fetch(url, {
      headers: { apikey: publicKey }
    });

    if (!response.ok) {
      throw new Error('Could not load products (' + response.status + ')');
    }

    const products = await response.json();
    gallery.replaceChildren();

    if (products.length === 0) {
      message.textContent = 'Our sellers are preparing their collections!';
      return;
    }

    products.forEach(product => {
      const soldOut = product.inventory <= 0;

      const card = document.createElement('article');
      card.style.cssText =
        'background:white;border-radius:12px;' +
        'padding:14px;box-shadow:0 2px 12px #0001;' +
        'text-align:left;';

      if (product.image_url) {
        const img = document.createElement('img');
        img.src = product.image_url;
        img.alt = product.name;
        img.loading = 'lazy';
        img.style.cssText =
          'width:100%;aspect-ratio:1;object-fit:cover;' +
          'border-radius:8px;';
        card.appendChild(img);
      }

      const name = document.createElement('h3');
      name.textContent = product.name;

      const price = document.createElement('p');
      price.textContent = (product.price_cents / 100)
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
      price.style.fontWeight = 'bold';

      const category = document.createElement('p');
      category.textContent = product.category || 'Handmade';
      category.style.color = '#795b49';

      card.append(name, price, category);

      if (soldOut) {
        const badge = document.createElement('p');
        badge.textContent = 'SOLD OUT';
        badge.style.cssText =
          'background:#22130c;color:white;' +
          'padding:9px 12px;border-radius:6px;' +
          'font-weight:bold;text-align:center;';
        card.appendChild(badge);
      } else {
        const stock = document.createElement('p');
        stock.textContent =
          product.inventory + ' available';
        stock.style.color = '#795b49';
        card.appendChild(stock);
      }

      const link = document.createElement('a');
      link.href = 'product.html?id=' +
        encodeURIComponent(product.id);
      link.style.display = 'block';
      link.style.color = 'inherit';
      link.style.textDecoration = 'none';

      link.appendChild(card);
      gallery.appendChild(link);
    });

    message.textContent = '';

  } catch (error) {
    message.textContent =
      'Products could not be loaded: ' + error.message;
  }
}

loadPublicProducts();
