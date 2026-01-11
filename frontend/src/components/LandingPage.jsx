import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentModal from './AppointmentModal';
import PaymentModal from './PaymentModal';

const LandingPage = ({ user }) => {
    const [ads, setAds] = useState([]);
    const [offers, setOffers] = useState([]);
    const [myCoupons, setMyCoupons] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [showAppointment, setShowAppointment] = useState(false);

    const fetchAds = async () => {
        try {
            const res = await axios.get('/api/user/advertisements');
            if (res.data.success) setAds(res.data.advertisements);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchOffers = async () => {
        try {
            const res = await axios.get('/api/user/coupon-offers');
            if (res.data.success) setOffers(res.data.offers);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchMyCoupons = async () => {
        try {
            const res = await axios.get(`/api/user/my-coupons/${user._id}`);
            if (res.data.success) setMyCoupons(res.data.coupons);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAds();
        fetchOffers();
        if (user) {
            fetchMyCoupons();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleBuyClick = (offer) => {
        if (!user) {
            alert("Please login to purchase coupons.");
            // eslint-disable-next-line no-global-assign, no-native-reassign
            window.location = "/login";
            return;
        }
        setSelectedOffer(offer);
    };

    const onPaymentComplete = async () => {
        if (!selectedOffer || !user) return;
        try {
            await axios.post('/api/user/purchase-coupon', {
                customerId: user._id, customerName: user.name, offerId: selectedOffer._id
            });
            setSelectedOffer(null);
            fetchMyCoupons();
        } catch (err) {
            alert(err.response?.data?.message || "Error processing request");
        }
    };

    return (
        <div className="landing-page">

            {/* 1. Hero Section - The "Femine" Arch Look */}
            <section id="home" className="hero-section container">
                <div className="hero-content">
                    <span className="subtitle">Natural & Organic</span>
                    {user && (
                        <h1 className="hero-title"> Hello Miss. <span className="some-text">{user.name.charAt(0).toUpperCase()}</span>{user.name.slice(1)}</h1>
                    )}
                    {!user && (<h1>Reveal the Beauty<br /><span className="text-gradient">You Already Own</span></h1>)}
                    <p>Experience the finest herbal treatments designed to enhance your natural beauty and inner peace. Let us transform you.</p>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => document.getElementById('offers').scrollIntoView()}>Get Offers</button>
                    </div>
                </div>
                <div className="hero-image-wrapper">
                    <div className="arch-mask float">
                        <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop" alt="Beauty Model" />
                    </div>
                    {/* Decorative Elements */}
                    <div className="decor-star star-1">✦</div>
                    <div className="decor-star star-2">✦</div>
                    <div className="decor-circle"></div>
                </div>
            </section>

            {/* 2. Coupons/Offers - (Functional Requirement) - MOVED HERE */}
            <section id="offers" className="section container">
                <h2>Exclusive Packages</h2>
                {user && myCoupons.length > 0 && (
                    <div className="my-coupons-wrapper">
                        <h3>My Coupon History</h3>
                        <div className="coupon-grid">
                            {myCoupons.map(coupon => {
                                const remaining = coupon.totalFacials - coupon.facialsUsed;
                                const isCompleted = remaining === 0 && coupon.status === 'confirmed';
                                const isPending = coupon.status === 'pending';

                                return (
                                    <div key={coupon._id} className={`active-coupon ${coupon.status} ${isCompleted ? 'completed' : ''}`}>
                                        <div className="coupon-left">
                                            <h4>{coupon.offerId?.title}</h4>
                                            <div className={`status-badge ${coupon.status}`}>
                                                {isPending ? 'Under Verification' : isCompleted ? 'Completed' : 'Active'}
                                            </div>
                                        </div>
                                        <div className="coupon-right">
                                            <div className="usage">Used: {coupon.facialsUsed}/{coupon.totalFacials}</div>
                                            {!isPending && !isCompleted && (
                                                <div className="remaining">Remaining: {remaining}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <div className="offers-list">
                    {offers.map(offer => {
                        const existingCoupon = user && myCoupons.find(c =>
                            c.offerId?._id === offer._id || c.offerId === offer._id
                        );

                        let buttonContent;
                        if (existingCoupon) {
                            if (existingCoupon.status === 'pending') {
                                buttonContent = <span className="status-text pending">Under Verification</span>;
                            } else if (existingCoupon.status === 'confirmed') {
                                buttonContent = <span className="status-text confirmed">Purchased ✓</span>;
                            } else {
                                buttonContent = <span className="status-text">{existingCoupon.status}</span>;
                            }
                        } else {
                            buttonContent = <button className="btn-white-pill" onClick={() => handleBuyClick(offer)}>Purchase</button>;
                        }

                        return (
                            <div key={offer._id} className="offer-ticket">
                                <div className="ticket-content">
                                    <h3>{offer.title}</h3>
                                    <p>{offer.description}</p>
                                    <ul className="features">
                                        {offer.features?.map((f, i) => <li key={i}>✓ {f}</li>)}
                                    </ul>
                                </div>
                                <div className="ticket-action">
                                    <div className="price">₹{offer.price}</div>
                                    {buttonContent}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 3. Services - "We Can Help Transform You" Grid */}
            <section id="services" className="section container">
                <div className="section-header text-center">
                    <h2>We Can Help Transform You</h2>
                    <p className="section-sub">Discover our range of premium herbal services</p>
                </div>

                <div className="services-grid">
                    {/* Hardcoded 4 main services to match reference layout */}
                    <div className="service-card gradient-1">
                        {/* <div className="icon">💆‍♀️</div> */}
                        <h3>Facial Therapy</h3>
                        <p>Rejuvenate your skin with our herbal packs.</p>
                        <a href="#offers" className="link-arrow">Learn More ➝</a>
                    </div>
                    <div className="service-card gradient-2">
                        {/* <div className="icon">💇‍♀️</div> */}
                        <h3>Hair Styling</h3>
                        <p>Modern cuts and organic coloring.</p>
                        <a href="#offers" className="link-arrow">Learn More ➝</a>
                    </div>
                    <div className="service-card gradient-3">
                        {/* <div className="icon">💅</div> */}
                        <h3>Nail Art</h3>
                        <p>Manicure & Pedicure with eco-friendly polish.</p>
                        <a href="#offers" className="link-arrow">Learn More ➝</a>
                    </div>
                    <div className="service-card gradient-4">
                        {/* <div className="icon">🧘‍♀️</div> */}
                        <h3>Body Spa</h3>
                        <p>Relaxing massages for total stress relief.</p>
                        <a href="#offers" className="link-arrow">Learn More ➝</a>
                    </div>
                </div>
            </section>

            {/* 4. Welcome/Stats Section - "Welcome to Femine" style - MOVED DOWN */}
            <section id="about" className="section bg-peach-light">
                <div className="container split-layout">
                    <div className="about-image-stack">
                        <div className="blob-mask">
                            <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1920&auto=format&fit=crop" alt="Spa Treatment" />
                        </div>
                        <div className="floating-badge">
                            <span className="badge-num">10+</span>
                            <span className="badge-text">Years Exp</span>
                        </div>
                    </div>
                    <div className="about-content">
                        <h2>At Sudha Herbal Beauty Parlour</h2>
                        <p>We are dedicated to providing the best herbal beauty services.We ensure you get a personalized experience that rejuvenates your body and mind.</p>

                        <div className="stats-row">
                            <div className="stat-card pill-pink">
                                <span className="stat-num">8</span>
                                <span className="stat-label">Specialises</span>
                            </div>
                            <div className="stat-card pill-peach">
                                <span className="stat-num">100+</span>
                                <span className="stat-label">Happy Clients</span>
                            </div>
                            <div className="stat-card pill-cream">
                                <span className="stat-num">28</span>
                                <span className="stat-label">Certificates</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Expertise/Progress Section - "Proving Our Expertise" */}
            <section id="expertise" className="section bg-cream-dark">
                <div className="container split-layout reverse">
                    <div className="expertise-content">
                        <h2>Proving Our Expertise</h2>
                        <p>My skilled professionals are trained in the latest techniques.</p>

                        <div className="progress-bars">
                            <div className="p-bar">
                                <div className="p-info"><span>Facials</span><span>93%</span></div>
                                <div className="p-track"><div className="p-fill" style={{ width: '95%' }}></div></div>
                            </div>
                            <div className="p-bar">
                                <div className="p-info"><span>Hair Care</span><span>88%</span></div>
                                <div className="p-track"><div className="p-fill" style={{ width: '88%' }}></div></div>
                            </div>
                            <div className="p-bar">
                                <div className="p-info"><span>Bridal Makeup</span><span>92%</span></div>
                                <div className="p-track"><div className="p-fill" style={{ width: '92%' }}></div></div>
                            </div>
                        </div>

                        <button className="btn-primary mt-4" onClick={() => setShowAppointment(true)}>Book Appointment</button>
                    </div>
                    <div className="expertise-image">
                        <div className="blob-bg"></div>
                        <img src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=1920&auto=format&fit=crop" className="float" alt="Expert" />
                    </div>
                </div>
            </section>



            {selectedOffer && (
                <PaymentModal
                    offer={selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                    onComplete={onPaymentComplete}
                />
            )}

            {showAppointment && (
                <AppointmentModal onClose={() => setShowAppointment(false)} />
            )}

            <style jsx>{`
            .some-text{ font-family: 'Allura', cursive; font-size: 8rem; }
            .hero-content .hero-title{ font-size: 3rem; font-weight: 600; }
                .section { padding: 4rem 1rem; }
                .container { max-width: 1200px; margin: 0 auto; }
                .text-center { text-align: center; }
                .subtitle { letter-spacing: 2px; text-transform: uppercase; color: var(--primary-coral); font-weight: 600; font-size: 0.9rem; }
                .bg-peach-light { background: linear-gradient(180deg, var(--white) 0%, #FFF5E6 100%); }
                .bg-cream-dark { background: #F9F5F0; }
                .mt-4 { margin-top: 2rem; }
                
                /* Hero */
                .hero-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-height: 90vh;
                    padding-top: 80px;
                }
                .hero-content { flex: 1; padding-right: 2rem; }
                .hero-content h1 { font-size: 4rem; margin: 1rem 0; line-height: 1.1; }
                .hero-actions { display: flex; gap: 1.5rem; align-items: center; margin-top: 2rem; }
                .btn-primary{ color: white;}
                .btn-play { background: none; display: flex; align-items: center; gap: 10px; font-weight: 600; color: var(--accent-maroon); }
                .play-icon { width: 40px; height: 40px; background: var(--primary-blush); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; }
                
                .hero-image-wrapper { flex: 1; position: relative; display: flex; justify-content: flex-end; }
                .arch-mask {
                    width: 450px; height: 600px;
                    border-radius: 250px 250px 20px 20px;
                    overflow: hidden;
                    box-shadow: 20px 20px 0px var(--primary-blush);
                }
                .arch-mask img { width: 100%; height: 100%; object-fit: cover; }
                
                /* Decor */
                .decor-star { position: absolute; color: var(--accent-maroon); font-size: 2rem; animation: spin 4s linear infinite; }
                .star-1 { top: 0; left: 20%; }
                .star-2 { bottom: 10%; right: -10%; }
                .decor-circle { position: absolute; bottom: 50px; left: -50px; width: 100px; height: 100px; background: var(--primary-peach); border-radius: 50%; z-index: -1; opacity: 0.5; }
                
                /* Split Layout */
                .split-layout { display: flex; align-items: center; gap: 4rem; }
                .split-layout.reverse { flex-direction: row-reverse; }
                .about-image-stack { flex: 1; position: relative; }
                .blob-mask {
                    width: 100%; height: 450px;
                    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                    overflow: hidden;
                }
                .blob-mask img { width: 100%; height: 100%; object-fit: cover; }
                .about-content, .expertise-content { flex: 1; }
                
                /* Stats */
                .floating-badge {
                    position: absolute; bottom: 40px; right: 20px;
                    background: white; padding: 1rem 2rem;
                    border-radius: 50px;
                    box-shadow: var(--shadow-soft);
                    text-align: center;
                }
                .badge-num { display: block; font-size: 1.5rem; font-weight: 700; color: var(--primary-coral); }
                .stats-row { display: flex; gap: 1rem; margin-top: 2rem; }
                .stat-card {
                    padding: 1.5rem; border-radius: 20px; text-align: center; flex: 1;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }
                .pill-pink { background: #FFF0F5; }
                .pill-peach { background: #FFF5E6; }
                .pill-cream { background: #FFFFFF; border: 1px solid #FFE5B4; }
                .stat-num { display: block; font-size: 2rem; font-family: var(--font-serif); color: var(--accent-maroon); font-weight: 700; }
                
                /* Services Grid */
                .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; }
                .service-card {
                    padding: 2.5rem 1.5rem; border-radius: 30px; text-align: center; transition: 0.3s;
                }
                .gradient-1 { background: linear-gradient(135deg, #FFF6F6 0%, #FFFAFA 100%); }
                .gradient-2 { background: linear-gradient(135deg, #FEFCF5 0%, #FFF9E6 100%); }
                .gradient-3 { background: linear-gradient(135deg, #FDF5E6 0%, #FFF5EE 100%); }
                .gradient-4 { background: linear-gradient(135deg, #F0FFF4 0%, #F5FFFFA 100%); }
                .service-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-hover); }
                .icon { font-size: 3rem; margin-bottom: 1rem; display: block; }
                .link-arrow { color: var(--accent-maroon); font-weight: 600; text-decoration: none; margin-top: 1rem; display: inline-block; }
                
                /* Expertise */
                .p-bar { margin-bottom: 1.5rem; }
                .p-info { display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-brown); }
                .p-track { width: 100%; height: 8px; background: #E0E0E0; border-radius: 4px; overflow: hidden; }
                .p-fill { height: 100%; background: linear-gradient(90deg, var(--primary-peach), var(--primary-coral)); border-radius: 4px; }
                .blob-bg {
                    position: absolute; width: 100%; height: 100%;
                    background: var(--primary-blush);
                    opacity: 0.2;
                    border-radius: 53% 47% 52% 48% / 36% 43% 57% 64%;
                    z-index: -1;
                    transform: scale(1.1);
                }
                .expertise-image { position: relative; display: flex; justify-content: center; }
                .expertise-image img { width: 350px; height: 500px; border-radius: 150px; object-fit: cover; }

                /* Offers Ticket */
                .offers-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 2rem; }
                .offer-ticket {
                    display: flex; background: white; border-radius: 20px; overflow: hidden;
                    box-shadow: var(--shadow-soft);
                    border: 1px solid var(--primary-peach);
                }
                .ticket-content { flex: 2; padding: 2rem; }
                .ticket-action {
                    flex: 1; background: var(--primary-coral); color: white;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    padding: 1rem; text-align: center;
                }
                .price { font-size: 2rem; font-family: var(--font-serif); font-weight: 700; margin-bottom: 0.5rem; }
                .btn-white-pill { background: white; color: var(--primary-coral); padding: 8px 20px; border-radius: 30px; font-weight: 600; font-size: 0.9rem; }
                .features { list-style: none; margin-top: 1rem; color: var(--text-light); }
                
                /* Responsive */
                .pending-text { font-weight: 600; color: white; display: inline-block; background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 10px; font-size: 0.9rem; }
                .btn-white-pill.disabled { opacity: 0.7; cursor: not-allowed; }
                
                /* Status Text Styles */
                .status-text { font-weight: 600; color: white; display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 0.85rem; }
                .status-text.pending { background: rgba(255, 193, 7, 0.3); }
                .status-text.confirmed { background: rgba(40, 167, 69, 0.3); }
                
                /* Coupon History Styles */
                .my-coupons-wrapper { margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #FFF5E6 0%, #FFFAF0 100%); border-radius: 20px; }
                .my-coupons-wrapper h3 { margin-bottom: 1rem; color: var(--accent-maroon); }
                .coupon-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }
                .active-coupon { display: flex; justify-content: space-between; align-items: center; background: white; padding: 1rem 1.5rem; border-radius: 15px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); border-left: 4px solid var(--primary-coral); }
                .active-coupon.pending { border-left-color: #FFC107; background: #FFFBF0; }
                .active-coupon.confirmed { border-left-color: #28a745; }
                .active-coupon.completed { border-left-color: #6c757d; opacity: 0.8; }
                .coupon-left h4 { margin: 0 0 0.5rem 0; font-size: 1rem; color: var(--text-brown); }
                .status-badge { display: inline-block; padding: 4px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; }
                .status-badge.pending { background: #FFF3CD; color: #856404; }
                .status-badge.confirmed { background: #D4EDDA; color: #155724; }
                .coupon-right { text-align: right; }
                .usage { font-weight: 600; color: var(--text-brown); }
                .remaining { font-size: 0.85rem; color: var(--primary-coral); margin-top: 4px; }

                @media (max-width: 900px) {
                    .hero-section { flex-direction: column; text-align: center; padding-top: 120px; text-align: center; }
                    .hero-content { padding-right: 0; margin-bottom: 3rem; }
                    .hero-actions { justify-content: center; }
                    .hero-image-wrapper { justify-content: center; width: 100%; }
                    .arch-mask { width: 100%; max-width: 350px; height: 450px; }
                    
                    .split-layout, .split-layout.reverse { flex-direction: column; gap: 2rem; }
                    .about-image-stack, .expertise-image { width: 100%; max-width: 400px; margin: 0 auto; }
                    .blob-mask { height: 300px; }
                    .offer-ticket { flex-direction: column; }
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
