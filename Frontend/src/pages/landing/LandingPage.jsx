import {
  ArrowDown,
  ArrowRight,
  Brain,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Gift,
  Leaf,
  MapPin,
  Recycle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";
import "./LandingPage.css";

const categories = [
  {
    icon: "🍎",
    title: "Food & Bakery",
    text: "Surplus and products approaching expiry.",
  },
  {
    icon: "📚",
    title: "Books & Stationery",
    text: "Books, notes and stationery waiting for another reader.",
  },
  {
    icon: "👕",
    title: "Clothing",
    text: "Unused and pre-loved clothing.",
  },
  {
    icon: "💻",
    title: "Electronics",
    text: "Devices and accessories still ready to be used.",
  },
  {
    icon: "🧴",
    title: "Personal Care",
    text: "Sealed and usable personal care products.",
  },
  {
    icon: "🏠",
    title: "Home & Living",
    text: "Useful household products looking for a new home.",
  },
  {
    icon: "🐶",
    title: "Pet Supplies",
    text: "Food, accessories and supplies for pets.",
  },
  {
    icon: "🌱",
    title: "Garden & Sports",
    text: "Gardening, fitness and lifestyle equipment.",
  },
];

const aiFeatures = [
  {
    icon: CircleDollarSign,
    title: "Dynamic Pricing",
    text: "AI recommends suitable prices using condition, demand and expiry timeline.",
  },
  {
    icon: Clock3,
    title: "Expiry Intelligence",
    text: "Helps sellers identify products approaching expiry and decide what to do next.",
  },
  {
    icon: Users,
    title: "Smart Matching",
    text: "Connects products with relevant buyers and verified organizations.",
  },
  {
    icon: MapPin,
    title: "Hyperlocal Discovery",
    text: "Makes nearby opportunities easier to discover while supporting local commerce.",
  },
];

export default function LandingPage() {
  return (
    <div className="circlo-page">

      {/* ================= NAVBAR ================= */}

      <header className="circlo-nav">
        <div className="circlo-container nav-inner">

          <Link to="/" className="circlo-logo">
            <span className="logo-mark">
              <Recycle size={20} />
            </span>
            <span>Circlo</span>
          </Link>

          <nav className="main-nav">
            <a href="#why">Why Circlo</a>
            <a href="#categories">Categories</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#ai">AI</a>
            <a href="#ngo">NGO</a>
          </nav>

          <div className="nav-actions">
            <Link to="/login" className="nav-login">
              Login
            </Link>

            <Link to="/login" className="nav-cta">
              Get Started
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </header>


      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="world-hero">

          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="circlo-container hero-grid">

            <div className="hero-content">

              <div className="eyebrow">
                <span className="pulse-dot" />
                AI-POWERED CIRCULAR MARKETPLACE
              </div>

              <h1>
                What if unused
                <span>didn't mean unneeded?</span>
              </h1>

              <p className="hero-story">
                That book sitting untouched on your shelf.
                That extra stock in your store.
                That product approaching its expiry date.
              </p>

              <p className="hero-description">
  <span className="hero-description-brand">Circlo</span>{" "}
  connects these products with the people, businesses,
  and verified organizations that can give them their
  next opportunity.
</p>

              <div className="hero-buttons">

                <Link to="/login" className="primary-button">
                  Explore Circlo
                  <ArrowRight size={17} />
                </Link>

                <a
                  href="#how-it-works"
                  className="secondary-button"
                >
                  See how it works
                  <ArrowDown size={16} />
                </a>

              </div>

              

            </div>


            {/* ================= BUILDING WORLD ================= */}

            <div className="market-world">

              <div className="world-grid" />

              <div className="world-light world-light-one" />
              <div className="world-light world-light-two" />

              <div className="orbit orbit-large" />
              <div className="orbit orbit-small" />


              {/* MAIN AI BUILDING */}

              <div className="ai-building">

                <div className="building-glow" />

                <div className="building-roof" />

                <div className="building-body">

                  <div className="building-window-row">
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="building-window-row">
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="building-window-row">
                    <i />
                    <i />
                    <i />
                  </div>

                </div>

                <div className="building-sign">
                  AI
                </div>

              </div>


              {/* SELLER */}

              <div className="mini-building seller-building">

                <div className="building-label">
                  SELLER
                </div>

                <div className="mini-roof" />

                <div className="mini-body">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <Store size={15} />

              </div>


              {/* BUYER */}

              <div className="mini-building buyer-building">

                <div className="building-label">
                  BUYER
                </div>

                <div className="mini-roof" />

                <div className="mini-body">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <ShoppingBag size={15} />

              </div>


              {/* NGO */}

              <div className="mini-building ngo-building">

                <div className="building-label">
                  VERIFIED NGO
                </div>

                <div className="mini-roof" />

                <div className="mini-body">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>

                <ShieldCheck size={15} />

              </div>


              {/* NATURE */}

              <div className="nature-island">

                <div className="tree tree-one">
                  <span />
                </div>

                <div className="tree tree-two">
                  <span />
                </div>

                <div className="tree tree-three">
                  <span />
                </div>

              </div>


              {/* PRODUCTS */}

              <div className="moving-product product-one">
                📦
              </div>

              <div className="moving-product product-two">
                📚
              </div>

              <div className="moving-product product-three">
                👕
              </div>

              <div className="moving-product product-four">
                🧴
              </div>


              <span className="route-dot route-one" />
              <span className="route-dot route-two" />
              <span className="route-dot route-three" />


              

            </div>

          </div>

          

        </section>


        {/* =====================================================
            WHY CIRCLO + STATS
        ===================================================== */}

        <section
          id="why"
          className="section why-section"
        >

          <div className="circlo-container">

            <div className="why-heading">

              <div>
                <span className="section-kicker">
                  WHY THIS MATTERS
                </span>

                <h2>
                  Useful products are
                  <em>everywhere.</em>
                </h2>
              </div>

              <p>
                Every day, perfectly usable products become
                overlooked because they are excess, unused,
                approaching expiry or simply no longer needed
                by their current owner.
              </p>

            </div>


            {/* GLOBAL STATS */}

            <div className="global-stats">

              <div className="stat-card">

                <span className="stat-source">
                  GLOBAL FOOD SYSTEM
                </span>

                <strong>
                  1.05<span>B</span>
                </strong>

                <h3>
                  tonnes of food
                </h3>

                <p>
                  were wasted globally in 2022.
                </p>

                <div className="stat-line" />

                <small>
                  UNEP • 2024 report
                </small>

              </div>


              <div className="stat-card">

                <span className="stat-source">
                  GLOBAL ELECTRONICS
                </span>

                <strong>
                  62<span>M</span>
                </strong>

                <h3>
                  tonnes of e-waste
                </h3>

                <p>
                  were generated worldwide in 2022.
                </p>

                <div className="stat-line" />

                <small>
                  ITU / UNITAR • 2024
                </small>

              </div>


              <div className="stat-card">

                <span className="stat-source">
                  RESOURCE OUTLOOK
                </span>

                <strong>
                  60<span>%</span>
                </strong>

                <h3>
                  potential increase
                </h3>

                <p>
                  in global resource extraction by 2060
                  without major changes.
                </p>

                <div className="stat-line" />

                <small>
                  UNEP • Global Resources Outlook
                </small>

              </div>

            </div>


            <div className="stats-message">

              <Leaf size={22} />

              <p>
                The opportunity is not only about what we consume.
                It is about <strong>how long useful products can
                continue creating value.</strong>
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            CATEGORIES
        ===================================================== */}

        <section
          id="categories"
          className="section categories-section"
        >

          <div className="circlo-container">

            <div className="category-heading">

              <div>

                <span className="section-kicker">
                  THE CIRCLO MARKETPLACE
                </span>

                <h2>
                  From pantry shelves
                  <em>to bookshelves.</em>
                </h2>

              </div>

              <p>
                Circlo brings different product categories into
                one connected ecosystem — making useful products
                easier to discover, purchase, redistribute or donate.
              </p>

            </div>


            <div className="categories-grid">

  <article className="category-card category-featured">
    <span className="category-number">01</span>

    <div className="category-icon">🍎</div>

    <div className="category-text">
      <h3>Food & Bakery</h3>
      <p>Surplus food and products approaching expiry.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">02</span>

    <div className="category-icon">📚</div>

    <div className="category-text">
      <h3>Books & Stationery</h3>
      <p>Books, notes and stationery waiting for another reader.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">03</span>

    <div className="category-icon">👕</div>

    <div className="category-text">
      <h3>Clothing</h3>
      <p>Unused and pre-loved clothing.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">04</span>

    <div className="category-icon">💻</div>

    <div className="category-text">
      <h3>Electronics</h3>
      <p>Devices and accessories still ready to be used.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">05</span>

    <div className="category-icon">🧴</div>

    <div className="category-text">
      <h3>Personal Care</h3>
      <p>Sealed and usable personal care products.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">06</span>

    <div className="category-icon">🏠</div>

    <div className="category-text">
      <h3>Home & Living</h3>
      <p>Useful household products looking for a new home.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">07</span>

    <div className="category-icon">🐾</div>

    <div className="category-text">
      <h3>Pet Supplies</h3>
      <p>Food, accessories and supplies for pets.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">08</span>

    <div className="category-icon">🛒</div>

    <div className="category-text">
      <h3>Groceries</h3>
      <p>Everyday essentials and useful grocery products.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">09</span>

    <div className="category-icon">🌱</div>

    <div className="category-text">
      <h3>Garden & Sports</h3>
      <p>Gardening, fitness and lifestyle equipment.</p>
    </div>
  </article>


  <article className="category-card">
    <span className="category-number">10</span>

    <div className="category-icon category-plus">+</div>

    <div className="category-text">
      <h3>Others</h3>
      <p>More useful products across everyday categories.</p>
    </div>
  </article>

</div>

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section className="how-it-works" id="how-it-works">

  <div className="how-header">
    <span className="section-kicker">HOW CIRCLO WORKS</span>

    <h2>
      One product.
      <br />
      <span>Four simple steps.</span>
    </h2>
  </div>


  <div className="roadmap">

    {/* SVG ROAD */}
    <svg
      className="roadmap-path"
      viewBox="0 0 1200 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="roadmap-base"
        d="
          M 80 350
          C 220 350, 250 120, 420 120
          C 600 120, 590 390, 760 390
          C 920 390, 900 120, 1120 120
        "
      />

      <path
        className="roadmap-flow"
        d="
          M 80 350
          C 220 350, 250 120, 420 120
          C 600 120, 590 390, 760 390
          C 920 390, 900 120, 1120 120
        "
      />
    </svg>


    {/* STEP 01 */}
    <div className="roadmap-step step-1">

      <span className="step-number">01</span>

      <div className="step-node">
        <span>♧</span>
      </div>

      <div className="step-content">
        <h3>LIST</h3>

        <p>
          Add product details, quantity,
          condition and relevant information.
        </p>
      </div>

    </div>


    {/* STEP 02 */}
    <div className="roadmap-step step-2">

      <span className="step-number">02</span>

      <div className="step-node">
        <span>✦</span>
      </div>

      <div className="step-content">
        <h3>AI ANALYSES</h3>

        <p>
          Circlo evaluates product signals,
          demand and timing.
        </p>
      </div>

    </div>


    {/* STEP 03 */}
    <div className="roadmap-step step-3">

      <span className="step-number">03</span>

      <div className="step-node">
        <span>♧</span>
      </div>

      <div className="step-content">
        <h3>MATCH</h3>

        <p>
          Connect with suitable buyers
          or verified organizations.
        </p>
      </div>

    </div>


    {/* STEP 04 */}
    <div className="roadmap-step step-4">

      <span className="step-number">04</span>

      <div className="step-node">
        <span>↻</span>
      </div>

      <div className="step-content">
        <h3>NEXT USE</h3>

        <p>
          Buy, sell or donate — giving
          the product another opportunity.
        </p>
      </div>

    </div>

  </div>

</section>


        {/* =====================================================
            AI + MARKETPLACE
        ===================================================== */}

        <section
          id="ai"
          className="section ai-section"
        >

          <div className="circlo-container">

            <div className="ai-heading">

              <span className="section-kicker">
                INTELLIGENCE LAYER
              </span>

              <h2>
                The intelligence behind
                <em>every opportunity.</em>
              </h2>

            </div>


            <div className="ai-main-grid">


              {/* AI FEATURES */}

              <div className="ai-features">

                {aiFeatures.map((feature, index) => {

                  const Icon = feature.icon;

                  return (

                    <div
                      className="ai-feature"
                      key={feature.title}
                    >

                      <div className="ai-feature-number">
                        0{index + 1}
                      </div>

                      <div className="ai-feature-icon">
                        <Icon size={20} />
                      </div>

                      <div>

                        <h3>
                          {feature.title}
                        </h3>

                        <p>
                          {feature.text}
                        </p>

                      </div>

                    </div>

                  );

                })}

              </div>


              {/* AI VISUAL */}

              <div className="ai-interface">

                <div className="interface-header">

                  <span>
                    CIRCLO AI
                  </span>

                  <span className="live-status">
                    <i />
                    LIVE ANALYSIS
                  </span>

                </div>


                <div className="interface-body">

                  <div className="scan-product">
                    📦
                  </div>

                  <div className="scan-ring scan-ring-one" />
                  <div className="scan-ring scan-ring-two" />

                  <div className="scan-beam" />

                  <div className="scan-data data-one">
                    CONDITION
                    <strong>GOOD</strong>
                  </div>

                  <div className="scan-data data-two">
                    DEMAND
                    <strong>HIGH</strong>
                  </div>

                  <div className="scan-data data-three">
                    LOCATION
                    <strong>NEARBY</strong>
                  </div>

                </div>


                <div className="ai-recommendation">

                  <Sparkles size={18} />

                  <div>
                    <span>
                      AI RECOMMENDATION
                    </span>

                    <strong>
                      OFFER AT ₹159
                    </strong>
                  </div>

                  <ArrowRight size={17} />

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            NGO
        ===================================================== */}

        <section
          id="ngo"
          className="ngo-section"
        >

          <div className="circlo-container">

            <div className="ngo-grid">

              <div className="ngo-copy">

                <span className="section-kicker light-kicker">
                  VERIFIED NGO PATHWAY
                </span>

                <h2>
                  Not every product
                  needs a buyer.
                  <em>
                    Some need a community.
                  </em>
                </h2>

                <p>
                  Eligible products can move into Circlo's
                  donation pathway, where verified NGOs can
                  claim them completely free of charge for
                  community needs.
                </p>


                <div className="ngo-points">

                  <div>
                    <ShieldCheck size={20} />
                    <span>
                      NGOs are verified before accessing
                      the donation pathway.
                    </span>
                  </div>

                  <div>
                    <Gift size={20} />
                    <span>
                      Eligible products can be claimed
                      at no cost.
                    </span>
                  </div>

                  <div>
                    <CheckCircle2 size={20} />
                    <span>
                      Claims remain visible and trackable.
                    </span>
                  </div>

                </div>


                <Link
                  to="/login"
                  className="light-button"
                >
                  Join as an NGO
                  <ArrowRight size={16} />
                </Link>

              </div>


              {/* NGO VISUAL */}

              <div className="ngo-visual">

                <div className="ngo-road" />


                <div className="ngo-node seller-node">

                  <Store />

                  <span>
                    SELLER
                  </span>

                </div>


                <div className="ngo-node circlo-node">

                  <Recycle />

                  <span>
                    CIRCLO
                  </span>

                </div>


                <div className="ngo-node verified-node">

                  <ShieldCheck />

                  <span>
                    VERIFIED NGO
                  </span>

                </div>


                <div className="ngo-package">
                  📦
                </div>


                <div className="free-claim">
                  <Gift size={14} />
                  FREE CLAIM
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="final-section">

          <div className="circlo-container">

            <div className="final-content">

              <span className="section-kicker light-kicker">
                THE NEXT OPPORTUNITY
              </span>

              <h2>
                What if "unused"
                <em>
                  was just waiting for the right person?
                </em>
              </h2>

              <p>
                Circlo connects products with their next
                opportunity — through buying, selling,
                redistribution and verified donation.
              </p>


              <div className="final-actions">

                <Link
                  to="/login"
                  className="final-button"
                >
                  Enter Circlo
                  <ArrowRight size={18} />
                </Link>

              </div>

              <div className="final-values">

                <span>
                  <ShoppingBag size={15} />
                  BUY
                </span>

                <span>
                  <Store size={15} />
                  SELL
                </span>

                <span>
                  <Gift size={15} />
                  DONATE
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="circlo-footer">

        <div className="circlo-container footer-inner">

          <Link to="/" className="circlo-logo">

            <span className="logo-mark">
              <Recycle size={19} />
            </span>

            Circlo

          </Link>

          <span>
            AI-POWERED CIRCULAR MARKETPLACE
          </span>

          <span>
            © 2026 Circlo
          </span>

        </div>

      </footer>

    </div>
  );
}