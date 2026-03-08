import { useState, useCallback } from 'react';
import './index.css';

/* ═══════════════════════════════════
   CONSTANTS & DATA
═══════════════════════════════════ */
const LOGO    = '/assets/logo.png';
const BG_GIF  = '/assets/bg.gif';

const S = {
  gold:    '#D4A017',
  gold2:   '#F5C518',
  orange:  '#C8720A',
  text:    '#F5EDD5',
  glass:   'rgba(10,7,1,0.72)',
  border:  'rgba(212,160,23,0.28)',
  gradBtn: 'linear-gradient(135deg,#D4A017,#C8720A)',
};

const NAV_ITEMS = [
  { id:'home',    icon:'🏠', label:'Home'       },
  { id:'rates',   icon:'📊', label:'Gold Rates' },
  { id:'shop',    icon:'💎', label:'Shop'       },
  { id:'payment', icon:'💳', label:'Payment'    },
  { id:'about',   icon:'📋', label:'About'      },
  { id:'member',  icon:'⭐', label:'Membership' },
];

const RATES = [
  { karat:'22K', name:'Gold Rate',   icon:'🥇', rows:[['1 gram','₹5,500'],['8 grams (Tola)','₹44,000'],['1 kg','₹55,00,000'],['1 Tag Weight','₹550']] },
  { karat:'24K', name:'Gold (Pure)', icon:'💛', rows:[['1 gram','₹6,000'],['8 grams (Tola)','₹48,000'],['1 kg','₹60,00,000'],['1 Tag Weight','₹600']] },
  { karat:'Silver', name:'Silver Rate', icon:'🥈', rows:[['1 gram','₹75'],['100 grams','₹7,500'],['1 kg','₹75,000'],['1 Tag Weight','₹7.5']] },
];

const CATEGORIES = [
  { id:'all',      label:'All',      icon:'✨' },
  { id:'necklace', label:'Necklace', icon:'📿' },
  { id:'rings',    label:'Rings',    icon:'💍' },
  { id:'earrings', label:'Earrings', icon:'👂' },
  { id:'bangles',  label:'Bangles',  icon:'⌚' },
  { id:'chains',   label:'Chains',   icon:'🔗' },
];

const PRODUCTS = [
  { id:1, cat:'necklace', icon:'📿', karat:'22K', name:'Gold Necklace Set',       meta:'22K · 18.5g · BIS Hallmark', price:'₹1,01,750' },
  { id:2, cat:'rings',    icon:'💍', karat:'18K', name:'Diamond Solitaire Ring',  meta:'18K Rose Gold · 5.2g',       price:'₹65,000'   },
  { id:3, cat:'earrings', icon:'👂', karat:'22K', name:'Jhumka Earrings',         meta:'22K · 8.0g · Traditional',   price:'₹44,000'   },
  { id:4, cat:'bangles',  icon:'⌚', karat:'22K', name:'Gold Bangles Set',         meta:'22K · 22g pair',             price:'₹1,21,000' },
  { id:5, cat:'chains',   icon:'🔗', karat:'24K', name:'Box Chain Necklace',       meta:'24K · 12g · 18 inch',        price:'₹72,000'   },
  { id:6, cat:'rings',    icon:'💎', karat:'22K', name:'Bridal Ring Set',          meta:'22K · 15g · Set of 2',       price:'₹82,500'   },
];

const PAY_OPTS = [
  { icon:'💳', label:'Paytm',            sub:'Pay via Paytm wallet or UPI' },
  { icon:'💵', label:'Cash',             sub:'Pay in cash at store'        },
  { icon:'📱', label:'PhonePe',          sub:'Pay via PhonePe UPI'         },
  { icon:'🚚', label:'Cash on Delivery', sub:'Pay when order arrives'      },
];

const TICKER = ['🥇 22K Gold · ₹5,500/g','💛 24K Gold (Pure) · ₹6,000/g','🥈 Silver · ₹75/g','💎 Platinum · ₹3,200/g'];

/* ═══════════════════════════════════
   REUSABLE COMPONENTS
═══════════════════════════════════ */

/* Circle Logo */
function CircleLogo({ size = 50 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `2px solid ${S.gold}`, flexShrink: 0,
      overflow: 'hidden',
      background: 'radial-gradient(circle,#2a1a02,#0a0600)',
      boxShadow: `0 0 0 3px rgba(212,160,23,0.2), 0 0 20px rgba(212,160,23,0.5)`,
    }}>
      <img src={LOGO} alt="PK Gold" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
    </div>
  );
}

/* Gold Button */
function GoldBtn({ children, onClick, style = {}, ghost = false, full = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: ghost ? 'transparent' : S.gradBtn,
        border: ghost ? `1.5px solid ${S.gold}` : 'none',
        color: ghost ? S.gold : '#fff',
        padding: '11px 26px', borderRadius: 8,
        fontFamily: 'Nunito, sans-serif',
        fontSize: 12, letterSpacing: '1.5px',
        textTransform: 'uppercase', fontWeight: 700,
        cursor: 'pointer', display: 'inline-flex',
        alignItems: 'center', gap: 8,
        boxShadow: ghost ? 'none' : '0 6px 20px rgba(212,160,23,0.35)',
        width: full ? '100%' : 'auto',
        justifyContent: full ? 'center' : 'flex-start',
        transform: hov ? 'translateY(-2px)' : '',
        transition: 'all .3s',
        ...style,
      }}>
      {children}
    </button>
  );
}

/* Glass Card */
function GlassCard({ children, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: S.glass, backdropFilter: 'blur(24px)',
        border: `1px solid ${hov ? S.gold : S.border}`,
        borderRadius: 10, transition: 'all .35s',
        transform: hov ? 'translateY(-4px)' : '',
        ...style,
      }}>
      {children}
    </div>
  );
}

/* Section Label */
function SLabel({ children }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:8,
      fontSize:9, letterSpacing:'5px', textTransform:'uppercase',
      color: S.gold, marginBottom:10 }}>
      <span style={{ width:20, height:1, background:S.gold, display:'inline-block' }} />
      {children}
    </div>
  );
}

/* Section Title */
function STitle({ children }) {
  return (
    <h2 style={{ fontFamily:"'Playfair Display',serif",
      fontSize:'clamp(26px,3.5vw,44px)', fontWeight:700,
      lineHeight:1.1, marginBottom:12 }}>
      {children}
    </h2>
  );
}

/* Live Badge */
function LiveBadge() {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:5,
      marginBottom:14,
      background:'rgba(0,200,100,0.1)', border:'1px solid rgba(0,200,100,0.25)',
      borderRadius:20, padding:'3px 10px', fontSize:9,
      letterSpacing:'2px', color:'#4cde8c', textTransform:'uppercase' }}>
      <span style={{ width:5, height:5, borderRadius:'50%',
        background:'#4cde8c', display:'inline-block',
        animation:'blink 1.5s infinite' }} />
      Live
    </div>
  );
}

/* Form Field */
function FormField({ label, type, placeholder, style = {} }) {
  return (
    <div style={{ marginBottom:10, ...style }}>
      <label style={{ display:'block', fontSize:9, letterSpacing:'2px',
        textTransform:'uppercase', color:'rgba(245,237,213,0.4)', marginBottom:5 }}>
        {label}
      </label>
      <input
        type={type} placeholder={placeholder}
        style={{ width:'100%', background:'rgba(4,2,0,0.6)',
          border:'1.5px solid rgba(212,160,23,0.2)',
          color: S.text, padding:'11px 13px',
          fontFamily:'Nunito,sans-serif', fontSize:13,
          borderRadius:8, outline:'none' }} />
    </div>
  );
}

/* ═══════════════════════════════════
   PAGE: HOME
═══════════════════════════════════ */
function HomePage({ go }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      textAlign:'center', padding:'88px 24px 60px' }}>

      {/* Live badge */}
      <div style={{ display:'inline-flex', alignItems:'center', gap:10,
        background:'rgba(212,160,23,0.12)', border:'1px solid rgba(212,160,23,0.35)',
        borderRadius:30, padding:'6px 18px', fontSize:10,
        letterSpacing:'4px', textTransform:'uppercase',
        color: S.gold, marginBottom:24 }}>
        <span style={{ width:6, height:6, borderRadius:'50%',
          background: S.gold2, animation:'blink 1.5s infinite',
          display:'inline-block' }} />
        Live Gold Rates Updated Daily
      </div>

      {/* Floating circle logo */}
      <div style={{ marginBottom:22, animation:'float 4s ease-in-out infinite' }}>
        <div style={{ width:130, height:130, borderRadius:'50%',
          border:`3px solid ${S.gold}`,
          boxShadow:`0 0 0 6px rgba(212,160,23,0.15), 0 0 40px rgba(212,160,23,0.6)`,
          overflow:'hidden',
          background:'radial-gradient(circle,#2a1a02,#0a0600)' }}>
          <img src={LOGO} alt="PK Gold" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
        </div>
      </div>

      {/* Headline */}
      <h1 style={{ fontFamily:"'Playfair Display',serif",
        fontSize:'clamp(48px,8.5vw,100px)', fontWeight:900,
        lineHeight:.92, color:'#fff',
        textShadow:'0 4px 40px rgba(0,0,0,0.6)', marginBottom:12 }}>
        Welcome to<br />
        <span style={{ background:`linear-gradient(135deg,${S.gold2},${S.gold},${S.orange})`,
          WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
          backgroundClip:'text' }}>
          PK Gold
        </span>
      </h1>

      <p style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:'italic',
        fontSize:20, color:'rgba(245,237,213,0.75)', marginBottom:36 }}>
        Crafted with purity. Worn with pride.
      </p>

      <div style={{ display:'flex', gap:14, justifyContent:'center',
        flexWrap:'wrap', marginBottom:52 }}>
        <GoldBtn onClick={() => go('shop')}>💎 Explore Collection</GoldBtn>
        <GoldBtn onClick={() => go('rates')} ghost>📊 View Gold Rates</GoldBtn>
      </div>

      {/* Stats */}
      <div style={{ display:'flex', gap:48, justifyContent:'center', flexWrap:'wrap',
        borderTop:'1px solid rgba(212,160,23,0.2)', paddingTop:32 }}>
        {[['22K','Gold Available'],['500+','Designs'],['BIS','Hallmarked'],['100%','Authentic']].map(([n,l]) => (
          <div key={l} style={{ textAlign:'center' }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28,
              fontWeight:700, color: S.gold }}>{n}</div>
            <div style={{ fontSize:10, letterSpacing:'2px', textTransform:'uppercase',
              color:'rgba(245,237,213,0.45)', marginTop:2 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   PAGE: GOLD RATES
═══════════════════════════════════ */
function RatesPage({ go }) {
  return (
    <div style={{ padding:'44px 52px 40px' }}>
      <SLabel>Live Market Rates</SLabel>
      <STitle>Today's <em style={{ color:S.gold, fontStyle:'normal' }}>Gold & Silver</em> Rates</STitle>
      <p style={{ color:'rgba(245,237,213,0.6)', fontSize:14, lineHeight:1.9,
        maxWidth:520, marginBottom:32 }}>
        Transparent daily rates — buy at fair market value, always.
      </p>

      <div style={{ display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:18 }}>
        {RATES.map(r => (
          <GlassCard key={r.karat} style={{ padding:26, position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
              background:`linear-gradient(90deg,${S.gold},${S.orange})` }} />
            <LiveBadge />
            <div style={{ display:'flex', justifyContent:'space-between',
              alignItems:'center', marginBottom:18 }}>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26,
                  fontWeight:700, color: S.gold }}>{r.karat}</div>
                <div style={{ fontSize:10, letterSpacing:'3px', textTransform:'uppercase',
                  color:'rgba(245,237,213,0.4)', marginTop:2 }}>{r.name}</div>
              </div>
              <div style={{ fontSize:32, opacity:.8 }}>{r.icon}</div>
            </div>
            {r.rows.map(([lbl, val]) => (
              <div key={lbl} style={{ display:'flex', justifyContent:'space-between',
                alignItems:'center', padding:'7px 0',
                borderBottom:'1px solid rgba(212,160,23,0.08)', fontSize:13 }}>
                <span style={{ color:'rgba(245,237,213,0.5)' }}>{lbl}</span>
                <span style={{ fontWeight:700 }}>{val}</span>
              </div>
            ))}
          </GlassCard>
        ))}
      </div>

      <div style={{ textAlign:'center', marginTop:32 }}>
        <GoldBtn onClick={() => go('shop')}>💎 Shop Now →</GoldBtn>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   PAGE: SHOP
═══════════════════════════════════ */
function ShopPage({ go }) {
  const [cat, setCat]   = useState('all');
  const [added, setAdded] = useState({});

  const filtered = PRODUCTS.filter(p => cat === 'all' || p.cat === cat);

  const handleAdd = (id) => {
    setAdded(a => ({ ...a, [id]: true }));
    setTimeout(() => setAdded(a => ({ ...a, [id]: false })), 1500);
  };

  return (
    <div style={{ padding:'44px 52px 40px' }}>
      <SLabel>Our Collection</SLabel>
      <STitle>Browse <em style={{ color:S.gold, fontStyle:'normal' }}>Categories</em></STitle>

      {/* Category chips */}
      <div style={{ display:'flex', gap:12, marginTop:28, flexWrap:'wrap' }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            style={{
              display:'flex', alignItems:'center', gap:8,
              padding:'10px 20px', borderRadius:30, cursor:'pointer',
              background: cat === c.id ? 'rgba(212,160,23,0.12)' : S.glass,
              backdropFilter:'blur(20px)',
              border: `1px solid ${cat === c.id ? S.gold : S.border}`,
              color: cat === c.id ? S.gold : S.text,
              fontSize:12, fontWeight:600,
              fontFamily:'Nunito,sans-serif', transition:'all .3s',
            }}>
            <span style={{ fontSize:16 }}>{c.icon}</span>{c.label}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{ display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',
        gap:16, marginTop:28 }}>
        {filtered.map(p => (
          <GlassCard key={p.id} style={{ overflow:'hidden' }}>
            <div style={{ width:'100%', aspectRatio:'1', display:'flex',
              alignItems:'center', justifyContent:'center', fontSize:64,
              background:'linear-gradient(135deg,rgba(212,160,23,0.06),rgba(200,114,10,0.04))',
              position:'relative' }}>
              {p.icon}
              <span style={{ position:'absolute', top:10, right:10,
                background: S.gradBtn, color:'#fff', fontSize:9,
                letterSpacing:'1px', textTransform:'uppercase',
                padding:'3px 8px', borderRadius:4, fontWeight:700 }}>
                {p.karat}
              </span>
            </div>
            <div style={{ padding:'14px 16px 16px' }}>
              <div style={{ fontFamily:"'Playfair Display',serif",
                fontSize:15, marginBottom:3 }}>{p.name}</div>
              <div style={{ fontSize:11, color:'rgba(245,237,213,0.4)' }}>{p.meta}</div>
              <div style={{ display:'flex', justifyContent:'space-between',
                alignItems:'center', marginTop:12 }}>
                <span style={{ fontWeight:700, color: S.gold, fontSize:15 }}>{p.price}</span>
                <button onClick={() => handleAdd(p.id)}
                  style={{ width:30, height:30, borderRadius:'50%',
                    background: added[p.id]
                      ? 'linear-gradient(135deg,#2d9e5a,#1a7a40)'
                      : S.gradBtn,
                    border:'none', color:'#fff', fontSize:16,
                    cursor:'pointer', display:'flex',
                    alignItems:'center', justifyContent:'center',
                    transition:'all .3s' }}>
                  {added[p.id] ? '✓' : '+'}
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div style={{ textAlign:'center', marginTop:36 }}>
        <GoldBtn onClick={() => go('payment')}>🛒 Proceed to Buy</GoldBtn>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   PAGE: PAYMENT
═══════════════════════════════════ */
function PaymentPage() {
  const [sel, setSel] = useState(0);

  return (
    <div style={{ padding:'44px 52px 40px' }}>
      <SLabel>Secure Checkout</SLabel>
      <STitle>Payment <em style={{ color:S.gold, fontStyle:'normal' }}>Details</em></STitle>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
        gap:40, marginTop:32, alignItems:'start' }}>

        {/* Left: Payment Options */}
        <div>
          <p style={{ color:'rgba(245,237,213,0.6)', fontSize:14, lineHeight:1.9 }}>
            Choose your preferred payment method. All transactions are 100% secure.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:24 }}>
            {PAY_OPTS.map((opt, i) => (
              <div key={i} onClick={() => setSel(i)}
                style={{ display:'flex', alignItems:'center', gap:14,
                  cursor:'pointer', padding:'14px 18px', borderRadius:10,
                  background: sel===i ? 'rgba(212,160,23,0.09)' : S.glass,
                  backdropFilter:'blur(20px)',
                  border: `1.5px solid ${sel===i ? S.gold : S.border}`,
                  transition:'all .3s' }}>
                <div style={{ width:18, height:18, borderRadius:'50%',
                  border:`2px solid ${S.gold}`, flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {sel===i && <div style={{ width:8, height:8, borderRadius:'50%',
                    background: S.gold }} />}
                </div>
                <span style={{ fontSize:22 }}>{opt.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:700 }}>{opt.label}</div>
                  <div style={{ fontSize:11, color:'rgba(245,237,213,0.4)', marginTop:2 }}>{opt.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <GoldBtn full style={{ marginTop:20, padding:14 }}>✅ Submit Order</GoldBtn>
        </div>

        {/* Right: QR + Bill */}
        <GlassCard style={{ padding:'32px 26px', textAlign:'center' }}>
          <SLabel>QR Code</SLabel>
          <p style={{ fontSize:12, color:'rgba(245,237,213,0.4)', marginBottom:18 }}>
            Scan to pay instantly
          </p>
          <div style={{ width:180, height:180, background:'#fff', borderRadius:10,
            padding:10, margin:'0 auto 14px',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="158" height="158" viewBox="0 0 158 158">
              <rect x="6"   y="6"   width="42" height="42" rx="3" fill="none" stroke="#111" strokeWidth="5"/>
              <rect x="15"  y="15"  width="24" height="24" fill="#111"/>
              <rect x="110" y="6"   width="42" height="42" rx="3" fill="none" stroke="#111" strokeWidth="5"/>
              <rect x="119" y="15"  width="24" height="24" fill="#111"/>
              <rect x="6"   y="110" width="42" height="42" rx="3" fill="none" stroke="#111" strokeWidth="5"/>
              <rect x="15"  y="119" width="24" height="24" fill="#111"/>
              {[[62,6],[72,6],[62,15],[72,25],[62,34],[72,44],[62,62],[72,72],[62,82],[72,92],[62,110],[72,120],[62,130],[72,140],
                [90,62],[100,62],[110,62],[120,62],[130,62],[140,62],[90,72],[110,72],[130,72],[90,82],[100,82],[120,82],[140,82],
                [90,92],[110,92],[130,92],[90,102],[100,102],[140,102],[90,110],[110,110],[100,120],[120,120],[140,120],
                [90,130],[100,130],[130,130]].map(([x,y],i) => (
                <rect key={i} x={x} y={y} width="7" height="7" fill="#111"/>
              ))}
              <circle cx="79" cy="79" r="9" fill="#D4A017"/>
            </svg>
          </div>
          <div style={{ fontSize:12, color:S.gold, letterSpacing:'1px', marginBottom:20 }}>
            📲 UPNO 9876543210
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse',
            fontSize:12, textAlign:'left' }}>
            <thead>
              <tr>{['Item','Qty','Price'].map(h => (
                <th key={h} style={{ fontSize:9, letterSpacing:'2px',
                  textTransform:'uppercase', color:'rgba(245,237,213,0.35)',
                  padding:'7px 4px', borderBottom:'1px solid rgba(212,160,23,0.15)' }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {[['Gold Necklace Set','1','₹1,01,750'],['Making Charge','—','₹5,000']].map(([a,b,c]) => (
                <tr key={a}>{[a,b,c].map((v,i) => (
                  <td key={i} style={{ padding:'8px 4px',
                    borderBottom:'1px solid rgba(212,160,23,0.07)' }}>{v}</td>
                ))}</tr>
              ))}
              <tr>{['Total','','₹1,06,750'].map((v,i) => (
                <td key={i} style={{ padding:'8px 4px',
                  color:S.gold, fontWeight:700, fontSize:13 }}>{v}</td>
              ))}</tr>
            </tbody>
          </table>
          <GoldBtn full style={{ marginTop:18 }}>🧾 Generate Bill</GoldBtn>
        </GlassCard>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   PAGE: ABOUT
═══════════════════════════════════ */
function AboutPage({ go, openModal }) {
  return (
    <div style={{ padding:'44px 52px 40px' }}>
      <SLabel>Who We Are</SLabel>
      <STitle>About <em style={{ color:S.gold, fontStyle:'normal' }}>PK Gold</em></STitle>

      <div style={{ display:'grid',
        gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',
        gap:18, marginTop:28 }}>
        {[
          { icon:'🏆', title:'About Us',
            body:'Welcome to PK Gold store! We deliver high-quality, authentic gold jewellery at fair market prices. Our expert craftsmen ensure every piece meets the highest standards of purity and design.' },
          { icon:'📞', title:'Contact Us', body:null },
          { icon:'❓', title:'Help & Support',
            body:'Need assistance? Our support team is available Mon–Sat, 9 AM to 8 PM. We respond within 2 hours.' },
          { icon:'⚙️', title:'Settings', body:null },
        ].map(card => (
          <GlassCard key={card.title} style={{ padding:'28px 22px' }}>
            <div style={{ fontSize:30, marginBottom:14 }}>{card.icon}</div>
            <div style={{ fontFamily:"'Playfair Display',serif",
              fontSize:18, color:S.gold, marginBottom:8 }}>{card.title}</div>
            {card.title === 'Contact Us' ? (
              <div style={{ fontSize:13, lineHeight:1.85, color:'rgba(245,237,213,0.6)' }}>
                <strong style={{ color:S.gold }}>Phone:</strong> +91 9876543210<br/><br/>
                <strong style={{ color:S.gold }}>Email:</strong> info@pkgold.com<br/><br/>
                <strong style={{ color:S.gold }}>Address:</strong> PK Gold Store, Main Market, Your City – 000000
              </div>
            ) : card.title === 'Settings' ? (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <GoldBtn ghost full onClick={openModal}>🔐 Login / Register</GoldBtn>
                <GoldBtn ghost full onClick={() => go('member')}>⭐ Join Membership</GoldBtn>
              </div>
            ) : (
              <div style={{ fontSize:13, lineHeight:1.85, color:'rgba(245,237,213,0.6)' }}>{card.body}</div>
            )}
          </GlassCard>
        ))}
      </div>

      {/* Contact Form */}
      <div style={{ marginTop:44 }}>
        <SLabel>Get in Touch</SLabel>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.2fr',
          gap:36, marginTop:16 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {[
              { icon:'📍', lbl:'Address',       val:'PK Gold Store, Main Market, Your City' },
              { icon:'📞', lbl:'Phone',         val:'+91 9876543210' },
              { icon:'✉️', lbl:'Email',         val:'info@pkgold.com' },
              { icon:'🕐', lbl:'Working Hours', val:'Mon – Sat: 9 AM – 8 PM' },
            ].map(ci => (
              <div key={ci.lbl} style={{ display:'flex', gap:13, alignItems:'flex-start' }}>
                <div style={{ width:40, height:40, flexShrink:0, borderRadius:8,
                  background: S.gradBtn, display:'flex',
                  alignItems:'center', justifyContent:'center', fontSize:17 }}>
                  {ci.icon}
                </div>
                <div>
                  <div style={{ fontSize:9, letterSpacing:'2px', textTransform:'uppercase',
                    color:'rgba(245,237,213,0.35)', marginBottom:2 }}>{ci.lbl}</div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{ci.val}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            <FormField label="Your Name"    type="text" placeholder="Enter your full name" />
            <FormField label="Phone Number" type="tel"  placeholder="+91 XXXXXXXXXX" />
            <div>
              <label style={{ display:'block', fontSize:9, letterSpacing:'2px',
                textTransform:'uppercase', color:'rgba(245,237,213,0.4)', marginBottom:5 }}>
                Your Message
              </label>
              <textarea placeholder="How can we help you today?"
                style={{ width:'100%', background:'rgba(4,2,0,0.6)',
                  border:'1.5px solid rgba(212,160,23,0.2)', color: S.text,
                  padding:'11px 13px', fontFamily:'Nunito,sans-serif',
                  fontSize:13, borderRadius:8, outline:'none',
                  minHeight:80, resize:'vertical' }} />
            </div>
            <GoldBtn full>📨 Send Message</GoldBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   PAGE: MEMBERSHIP
═══════════════════════════════════ */
function MemberPage({ openModal }) {
  return (
    <div style={{ minHeight:'calc(100vh - 130px)', display:'flex',
      alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
      <div style={{ maxWidth:580, width:'100%', textAlign:'center',
        background: S.glass, backdropFilter:'blur(28px)',
        border:'1px solid rgba(212,160,23,0.4)', borderRadius:16,
        padding:'52px 40px', boxShadow:'0 0 60px rgba(212,160,23,0.1)' }}>

        <div style={{ marginBottom:16, animation:'float 3.5s ease-in-out infinite',
          display:'flex', justifyContent:'center' }}>
          <div style={{ width:90, height:90, borderRadius:'50%',
            border:`2px solid ${S.gold}`,
            boxShadow:`0 0 0 4px rgba(212,160,23,0.15), 0 0 30px rgba(212,160,23,0.5)`,
            overflow:'hidden',
            background:'radial-gradient(circle,#2a1a02,#0a0600)' }}>
            <img src={LOGO} alt="PK Gold" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        </div>

        <h2 style={{ fontFamily:"'Playfair Display',serif",
          fontSize:28, color: S.gold, marginBottom:12 }}>
          Welcome to PK Gold!
        </h2>
        <p style={{ fontSize:14, lineHeight:1.9,
          color:'rgba(245,237,213,0.65)', marginBottom:26 }}>
          Congratulations! Join the PK Gold saving and investment family.
          Enjoy exclusive member benefits and priority access to our finest collections.
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr',
          gap:10, margin:'20px 0 28px', textAlign:'left' }}>
          {[['💰','Exclusive member rates'],['🎁','Early collection access'],
            ['🚚','Free home delivery'],['📞','Priority support']].map(([icon, lbl]) => (
            <div key={lbl} style={{ display:'flex', alignItems:'center', gap:8,
              background:'rgba(212,160,23,0.07)',
              border:'1px solid rgba(212,160,23,0.15)',
              borderRadius:8, padding:'10px 12px', fontSize:12 }}>
              <span style={{ fontSize:16 }}>{icon}</span>{lbl}
            </div>
          ))}
        </div>

        <GoldBtn onClick={openModal} full style={{ padding:'14px 40px' }}>
          ⭐ Join Now – It's Free
        </GoldBtn>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   LOGIN MODAL
═══════════════════════════════════ */
function LoginModal({ open, close }) {
  const [tab, setTab] = useState('login');
  if (!open) return null;

  return (
    <div onClick={e => e.target === e.currentTarget && close()}
      style={{ position:'fixed', inset:0, zIndex:500,
        background:'rgba(0,0,0,0.8)', backdropFilter:'blur(8px)',
        display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ background:'#0c0800',
        border:'1px solid rgba(212,160,23,0.4)',
        borderRadius:14, padding:'40px 34px',
        width:380, maxWidth:'95vw',
        animation:'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>

        {/* Modal Header */}
        <div style={{ display:'flex', alignItems:'center',
          justifyContent:'space-between', marginBottom:6 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <CircleLogo size={38} />
            <span style={{ fontFamily:"'Playfair Display',serif",
              fontSize:20, color: S.gold }}>PK Gold</span>
          </div>
          <button onClick={close}
            style={{ background:'none', border:'none',
              color:'rgba(245,237,213,0.4)', fontSize:20, cursor:'pointer' }}>✕</button>
        </div>
        <div style={{ fontSize:10, letterSpacing:'2px',
          color:'rgba(245,237,213,0.3)', textTransform:'uppercase', marginBottom:22 }}>
          Welcome to PK Gold Store
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', background:'rgba(255,255,255,0.04)',
          borderRadius:8, padding:3, marginBottom:22 }}>
          {['login','register'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex:1, textAlign:'center', padding:8,
                cursor:'pointer', fontSize:10, letterSpacing:'2px',
                textTransform:'uppercase', border:'none', borderRadius:6,
                fontFamily:'inherit', transition:'all .3s',
                background: tab===t ? 'rgba(212,160,23,0.18)' : 'transparent',
                color: tab===t ? S.gold : 'rgba(245,237,213,0.4)' }}>
              {t}
            </button>
          ))}
        </div>

        {tab === 'login' ? (
          <>
            {/* Social Buttons */}
            {[
              { bg:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)',
                icon:<svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z"/><path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/><path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>,
                text:'Sign in with Google' },
              { bg:'rgba(59,89,152,0.15)', border:'1px solid rgba(59,89,152,0.3)',
                icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
                text:'Sign in with Facebook' },
            ].map(s => (
              <button key={s.text} style={{ display:'flex', alignItems:'center',
                justifyContent:'center', gap:9, width:'100%',
                padding:11, marginBottom:8, borderRadius:8, fontSize:12,
                cursor:'pointer', background: s.bg, border: s.border,
                color: S.text, fontFamily:'inherit', fontWeight:600 }}>
                {s.icon}{s.text}
              </button>
            ))}
            <div style={{ display:'flex', alignItems:'center', gap:10, margin:'14px 0' }}>
              <div style={{ flex:1, height:1, background:'rgba(212,160,23,0.15)' }} />
              <span style={{ fontSize:10, letterSpacing:'2px',
                color:'rgba(245,237,213,0.25)' }}>or</span>
              <div style={{ flex:1, height:1, background:'rgba(212,160,23,0.15)' }} />
            </div>
            <FormField label="Email / Phone" type="text"     placeholder="Enter email or phone" />
            <FormField label="Password"      type="password" placeholder="Enter password" style={{ marginBottom:18 }} />
            <GoldBtn full style={{ padding:12 }}>🔐 Login</GoldBtn>
          </>
        ) : (
          <>
            <FormField label="Full Name" type="text"     placeholder="Your full name" />
            <FormField label="Phone"     type="tel"      placeholder="+91 XXXXXXXXXX" />
            <FormField label="Email"     type="email"    placeholder="email@example.com" />
            <FormField label="Password"  type="password" placeholder="Create password" style={{ marginBottom:18 }} />
            <GoldBtn full style={{ padding:12 }}>✅ Register</GoldBtn>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   NAVBAR
═══════════════════════════════════ */
function Navbar({ page, go, openModal, mobOpen, setMobOpen }) {
  return (
    <>
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:200,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'10px 40px', background:'rgba(6,4,0,0.85)',
        backdropFilter:'blur(20px)',
        borderBottom:`1px solid ${S.border}`,
        boxShadow:'0 2px 30px rgba(0,0,0,0.5)' }}>

        {/* Logo */}
        <div onClick={() => go('home')}
          style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
          <CircleLogo size={52} />
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif",
              fontSize:20, fontWeight:700, color: S.gold, lineHeight:1 }}>PK Gold</div>
            <div style={{ fontSize:8, letterSpacing:'3px',
              color:'rgba(245,237,213,0.45)', textTransform:'uppercase', marginTop:2 }}>
              Luxury Jewellery
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div style={{ display:'flex', gap:4 }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              style={{ padding:'8px 14px', fontSize:11,
                letterSpacing:'2px', textTransform:'uppercase',
                color: page===n.id ? S.gold : 'rgba(245,237,213,0.65)',
                cursor:'pointer', borderRadius:6, border:'none',
                background: page===n.id ? 'rgba(212,160,23,0.1)' : 'none',
                fontFamily:'inherit', display:'flex', alignItems:'center',
                gap:6, transition:'all .25s' }}>
              <span style={{ fontSize:14 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </div>

        {/* Right */}
        <div style={{ display:'flex', gap:10, alignItems:'center' }}>
          <button onClick={openModal}
            style={{ background: S.gradBtn, border:'none', color:'#fff',
              padding:'9px 20px', fontSize:11, letterSpacing:'2px',
              textTransform:'uppercase', cursor:'pointer', borderRadius:6,
              fontFamily:'inherit', fontWeight:700,
              boxShadow:'0 4px 16px rgba(212,160,23,0.35)' }}>
            🔐 Login
          </button>
          {/* Hamburger */}
          <div onClick={() => setMobOpen(v => !v)}
            style={{ display:'none', flexDirection:'column',
              gap:5, cursor:'pointer', padding:4 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ width:22, height:2,
                background: S.gold, borderRadius:2, display:'block' }} />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobOpen && (
        <div style={{ position:'fixed', top:74, left:0, right:0, zIndex:199,
          background:'rgba(6,4,0,0.97)', backdropFilter:'blur(24px)',
          borderBottom:`1px solid ${S.border}`,
          display:'flex', flexDirection:'column', padding:'12px 0' }}>
          {NAV_ITEMS.map(n => (
            <button key={n.id} onClick={() => { go(n.id); setMobOpen(false); }}
              style={{ padding:'13px 28px', fontSize:12,
                letterSpacing:'2px', textTransform:'uppercase',
                color: page===n.id ? S.gold : 'rgba(245,237,213,0.65)',
                cursor:'pointer', border:'none',
                background: page===n.id ? 'rgba(212,160,23,0.06)' : 'none',
                fontFamily:'inherit', display:'flex', alignItems:'center',
                gap:10, width:'100%', textAlign:'left' }}>
              <span style={{ fontSize:16 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════
   TICKER
═══════════════════════════════════ */
function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:200,
      background:'linear-gradient(90deg,#7a4f00,#D4A017,#D4A017,#C8720A,#7a4f00)',
      backgroundSize:'300%', animation:'tgold 5s linear infinite',
      padding:'8px 0', overflow:'hidden' }}>
      <div style={{ display:'flex', width:'max-content',
        animation:'slide 22s linear infinite' }}>
        {items.map((t, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:7,
            whiteSpace:'nowrap', fontSize:11, fontWeight:700,
            letterSpacing:'1.5px', textTransform:'uppercase',
            padding:'0 32px', color:'#fff' }}>
            {t}<span style={{ fontSize:7, opacity:.6, marginLeft:7 }}>◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   MAIN APP
═══════════════════════════════════ */
export default function PKGoldApp() {
  const [page,    setPage]    = useState('home');
  const [modal,   setModal]   = useState(false);
  const [mobOpen, setMobOpen] = useState(false);

  const go = useCallback((pg) => {
    setPage(pg);
    setMobOpen(false);
  }, []);

  const pageStyle = {
    position:'fixed', inset:0, zIndex:10,
    overflowY:'auto', overflowX:'hidden',
    paddingTop:78, paddingBottom:52,
    transition:'opacity .4s ease',
  };

  return (
    <div style={{ fontFamily:'Nunito,sans-serif', color: S.text,
      height:'100vh', overflow:'hidden' }}>

      {/* GIF Background */}
      <img src={BG_GIF} alt=""
        style={{ position:'fixed', inset:0, width:'100%', height:'100%',
          objectFit:'cover', zIndex:0,
          filter:'brightness(0.4) saturate(1.4)',
          animation:'bgZoom 20s ease-in-out infinite alternate' }} />
      <div style={{ position:'fixed', inset:0, zIndex:1,
        background:'radial-gradient(ellipse at center,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.65) 100%)' }} />
      <div style={{ position:'fixed', inset:0, zIndex:2,
        background:'linear-gradient(180deg,rgba(8,5,1,0.5) 0%,transparent 40%,transparent 60%,rgba(8,5,1,0.7) 100%)' }} />

      {/* Navbar */}
      <Navbar
        page={page} go={go}
        openModal={() => setModal(true)}
        mobOpen={mobOpen} setMobOpen={setMobOpen}
      />

      {/* Pages */}
      <div style={pageStyle}>
        {page === 'home'    && <HomePage    go={go} />}
        {page === 'rates'   && <RatesPage   go={go} />}
        {page === 'shop'    && <ShopPage    go={go} />}
        {page === 'payment' && <PaymentPage />}
        {page === 'about'   && <AboutPage   go={go} openModal={() => setModal(true)} />}
        {page === 'member'  && <MemberPage  openModal={() => setModal(true)} />}
      </div>

      {/* Ticker */}
      <Ticker />

      {/* Login Modal */}
      <LoginModal open={modal} close={() => setModal(false)} />
    </div>
  );
}
