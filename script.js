
// ===== LOADER =====
window.addEventListener('load',()=>{
  setTimeout(()=>{
    document.getElementById('loader').classList.add('done');
  },1400);
});

// ===== NAV SCROLL =====
const navEl=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  if(window.scrollY>40) navEl.classList.add('scrolled');
  else navEl.classList.remove('scrolled');
});

// ===== SCROLL TO SECTION =====
function scrollToSection(id){
  const el=document.getElementById(id);
  if(el){
    const offset=64;
    const top=el.getBoundingClientRect().top+window.pageYOffset-offset;
    window.scrollTo({top,behavior:'smooth'});
  }
}

// ===== MOBILE MENU =====
function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open')}
function closeMenu(){document.getElementById('mobileMenu').classList.remove('open')}

// ===== REVEAL ON SCROLL =====
const revealEls=document.querySelectorAll('.reveal, .reveal-stagger');
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
},{threshold:.12,rootMargin:'0px 0px -60px 0px'});
revealEls.forEach(el=>observer.observe(el));

// ===== COUNTER ANIMATION =====
function animateCount(el){
  const target=parseInt(el.dataset.count);
  const suffix=el.dataset.suffix||'';
  const duration=2000;
  const start=performance.now();
  function step(now){
    const elapsed=now-start;
    const progress=Math.min(elapsed/duration,1);
    // Ease out cubic
    const eased=1-Math.pow(1-progress,3);
    const val=Math.floor(eased*target);
    el.textContent=val+suffix;
    if(progress<1) requestAnimationFrame(step);
    else el.textContent=target+suffix;
  }
  requestAnimationFrame(step);
}
const countEls=document.querySelectorAll('[data-count]');
const countObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      animateCount(e.target);
      countObs.unobserve(e.target);
    }
  });
},{threshold:.3});
countEls.forEach(el=>countObs.observe(el));

// ===== TOAST =====
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3200);
}

// ===== SHOP LINKS =====
function openShopLink(platform){
  const links={
    amazon:'https://www.amazon.in/s?k=diraaz+tea',
    flipkart:'https://www.flipkart.com/search?q=diraaz+tea',
    jiomart:'https://www.jiomart.com/search/diraaz',
    hyperpure:'https://www.hyperpure.com',
    website:'https://www.diraaz.com',
    whatsapp:'https://wa.me/919119900243?text=Hi%2C%20I%27m%20interested%20in%20DIRAAZ%20teas!'
  };
  const url=links[platform];
  if(url) window.open(url,'_blank');
  else showToast('Coming soon! 🍵');
}

// ===== ORDER PRODUCT =====
function orderProduct(productName){
  const msg=encodeURIComponent("Hi, I'm interested in DIRAAZ *"+productName+"*. Please share details and pricing.");
  window.open('https://wa.me/919119900243?text='+msg,'_blank');
}

// ===== MODALS =====
const modals={
  shop:{tag:'Shop Online',title:'Shop DIRAAZ Teas',body:'Our teas are available on Amazon.in, Flipkart, JioMart, and directly at diraaz.com. For the fastest response, chat with us on WhatsApp!',cta:'Order on WhatsApp',action:()=>openShopLink('whatsapp')},
  fullrange:{tag:'Our Range',title:'Complete Product Range',body:'From premium CTC blends and herbal infusions to our newest medicinal range, brewed iced teas, Chai Ka Masala, desi beverages, and curated gift boxes — a cup for every moment and every need.',cta:'Order on WhatsApp',action:()=>openShopLink('whatsapp')},
  medicinalrange:{tag:'New · Launching Soon',title:'Medicinal Herbal Infusions',body:'Rooted in Ayurveda, validated by BHU-BIONEST science. Each blend addresses a specific wellness goal — immunity, digestion, stress relief, women\'s health, and respiratory support. Hand-woven in plastic-free teabags. Launching soon.',cta:'Enquire on WhatsApp',action:()=>orderProduct('Medicinal Herbal Infusions - Launch Notification')},
  partner:{tag:'Business Partnership',title:'Partner With DIRAAZ',body:'Whether you\'re a hotel, café, corporate, or distributor — we\'d love to work with you. We offer white labelling, custom blends, bulk pricing, and expert consultation. Reach us at connect@diraaz.com or WhatsApp +91 9119900243.',cta:'Chat on WhatsApp',action:()=>openShopLink('whatsapp')},
  d2c:{tag:'Home & D2C',title:'For Tea Lovers',body:'Order our premium loose leaf teas, wellness and medicinal blends, assorted gift boxes, brewed iced teas, and desi drinks — message us on WhatsApp for the best deals!',cta:'Order on WhatsApp',action:()=>openShopLink('whatsapp')},
  hospitality:{tag:'Hospitality',title:'For Hotels & Cafés',body:'Elevate your guest experience with hand-picked premium blends, white-labelled packaging, and expert tea consultation. We\'re listed on Zomato Hyperpure for seamless procurement. Contact us to discuss your requirements.',cta:'Enquire on WhatsApp',action:()=>orderProduct('Hospitality Tea Solutions')},
  institutional:{tag:'Institutional',title:'For Canteens & Corporates',body:'Economical bulk quantities, reliable monthly contracts, multiple tea grades, and direct account management. We supply corporate canteens, catering companies, and large institutions across the region.',cta:'Get Quote on WhatsApp',action:()=>orderProduct('Institutional & Corporate Tea Supply')},
  whitelabel:{tag:'Enterprise',title:'White Labelling',body:'Launch your own branded tea range with DIRAAZ. We handle sourcing, blending, quality, and packaging — you get a premium product with your brand name. Minimum order quantities apply.',cta:'Enquire on WhatsApp',action:()=>orderProduct('White Labelling Enquiry')},
  franchise:{tag:'Franchise',title:'Tea Cart Franchise',body:'Join the DIRAAZ family with our tea cart franchise model. Low investment, strong brand support, proven products, and a growing market. Ideal for first-time entrepreneurs.',cta:'Learn More on WhatsApp',action:()=>orderProduct('Tea Cart Franchise Enquiry')},
  bulk:{tag:'Bulk Orders',title:'Bulk & Contract Orders',body:'We supply bulk tea for institutions, events, and large businesses. Competitive pricing, multiple grades, and consistent quality — backed by our direct garden sourcing and certified tasting.',cta:'Get Pricing on WhatsApp',action:()=>orderProduct('Bulk Order Pricing')},
};

const productModals={
  ctc:{tag:'CTC Tea',title:'Premium CTC & Lucknow Blend',body:'Garden-fresh Assam CTC blends and our exclusive Special Lucknow Blend — rich in strength, colour, and aroma. Perfect for the bold everyday cup. Available in multiple grades for home, café, and institutional use.',cta:'Order on WhatsApp'},
  herbal:{tag:'Wellness Infusions',title:'Herbal & Flower Infusions',body:'Chamomile, Rose, Tulsi, Aparajita & more — hand-woven into our signature plastic-free teabags. Zero caffeine. 100% natural. Nature\'s pharmacy delivered as a beautiful cup.',cta:'Order on WhatsApp'},
  medicinal:{tag:'New · Medicinal',title:'Medicinal Herbal Infusions',body:'Science-backed Ayurvedic blends formulated for specific health goals — immunity (Giloy + Tulsi), respiratory health (Mulethi + Clove), stress (Ashwagandha + Brahmi), women\'s wellness (Shatavari + Hibiscus), and digestion (Saunf + Ajwain). Incubated at BHU-BIONEST.',cta:'Enquire on WhatsApp'},
  iced:{tag:'Ready to Drink',title:'Brewed Iced Teas',body:'Strawberry, Lemon & Peach. Brewed in whole leaves for real tea character, blended with natural flavours. No concentrates. No artificial additives. Served in premium 330ml glass bottles.',cta:'Order on WhatsApp'},
  masala:{tag:'Heritage Recipe',title:'Chai Ka Masala',body:'An age-old Ayurvedic home recipe reimagined with AA Grade spices. Available in Normal Spiced and Haldi Spiced variants — the latter with turmeric for immunity. Perfect for your daily chai.',cta:'Order on WhatsApp'},
  beverage:{tag:'Desi Beverages',title:'Aam Panna, Nimbu Shikanji & More',body:'Chilli Guava, Aam Panna, Jeera Masala Chaas, Nimbu Shikanji — India\'s beloved classics, crafted with care and bottled at their best. 330ml. Natural ingredients. No artificial preservatives.',cta:'Order on WhatsApp'},
  gift:{tag:'Gifting',title:'Assorted Premium Tea Box',body:'10 curated plastic-free teabags featuring Flower, Leaf & Herbal varieties. An elegant way to discover the DIRAAZ range or gift someone a luxurious tea experience. Perfect for festivals, corporate gifting, and personal gifting.',cta:'Order on WhatsApp'},
};

let currentCtaAction=null;

function openModal(key){
  const data=modals[key];if(!data)return;
  document.getElementById('modalTag').textContent=data.tag;
  document.getElementById('modalTitle').textContent=data.title;
  document.getElementById('modalBody').textContent=data.body;
  document.querySelector('#modalCta span').textContent=data.cta;
  currentCtaAction=data.action||null;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function openProductModal(key){
  const data=productModals[key];if(!data)return;
  document.getElementById('modalTag').textContent=data.tag;
  document.getElementById('modalTitle').textContent=data.title;
  document.getElementById('modalBody').textContent=data.body;
  document.querySelector('#modalCta span').textContent=data.cta;
  currentCtaAction=()=>orderProduct(data.title);
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function modalCtaAction(){if(currentCtaAction) currentCtaAction();closeModal()}
function closeModal(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow='';
}
function closeModalOnOverlay(e){if(e.target===document.getElementById('modalOverlay')) closeModal()}
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal()});

// ===== HIDE WHATSAPP LABEL AFTER A FEW SECONDS =====
setTimeout(()=>{
  const l=document.getElementById('waLabel');
  if(l) l.style.opacity='0';
  if(l) l.style.transform='translateX(20px)';
  if(l) l.style.transition='opacity .4s ease, transform .4s ease';
},5000);

// ===== HERO PARALLAX =====
const heroLeaves=document.querySelectorAll('.leaf');
let mouseX=0,mouseY=0,scrollY=0;
document.addEventListener('mousemove',e=>{
  mouseX=(e.clientX/window.innerWidth-.5)*2;
  mouseY=(e.clientY/window.innerHeight-.5)*2;
});
window.addEventListener('scroll',()=>{scrollY=window.scrollY});
function parallaxLoop(){
  if(scrollY<window.innerHeight){
    heroLeaves.forEach((leaf,i)=>{
      const depth=(i%3+1)*8;
      const sy=scrollY*.1*((i%2)?1:-1);
      leaf.style.transform=`translate(${mouseX*depth}px,${mouseY*depth - sy}px)`;
    });
  }
  requestAnimationFrame(parallaxLoop);
}
parallaxLoop();

// ===== Subtle 3D tilt on product cards =====
document.querySelectorAll('.pcard').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`translateY(-6px) perspective(900px) rotateX(${-y*3}deg) rotateY(${x*3}deg)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='';
  });
});
