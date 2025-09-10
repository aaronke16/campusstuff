import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import UserMenu from './UserMenu';
import ListingCard from './ListingCard';
import CreateListing from './CreateListing';
import ListingDetailsModal from './ListingDetailsModal';
import './Marketplace.css';

const Marketplace = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Items', icon: '📦' },
    { id: 'furniture', label: 'Furniture', icon: '🪑' },
    { id: 'appliances', label: 'Appliances', icon: '🔌' },
    { id: 'electronics', label: 'Electronics', icon: '💻' },
    { id: 'textbooks', label: 'Textbooks', icon: '📚' },
    { id: 'clothing', label: 'Clothing', icon: '👕' },
    { id: 'sports', label: 'Sports & Rec', icon: '⚽' },
    { id: 'other', label: 'Other', icon: '🎯' }
  ];

  // Load listings from localStorage on component mount
  useEffect(() => {
    const savedListings = localStorage.getItem('campusfash_listings');
    if (savedListings) {
      const parsedListings = JSON.parse(savedListings);
      setListings(parsedListings);
      setFilteredListings(parsedListings);
    }
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = listings;

    // Filter by category
    if (activeFilter !== 'all') {
      filtered = filtered.filter(listing => listing.category === activeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by most recent
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredListings(filtered);
  }, [listings, activeFilter, searchTerm]);

  // Add new listing
  const handleAddListing = (newListing) => {
    const listing = {
      ...newListing,
      id: Date.now().toString(),
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
      userPicture: user.picture,
      createdAt: new Date().toISOString()
    };

    const updatedListings = [listing, ...listings];
    setListings(updatedListings);
    localStorage.setItem('campusfash_listings', JSON.stringify(updatedListings));
    setShowCreateModal(false);
  };

  // Delete listing (only if user owns it)
  const handleDeleteListing = (listingId) => {
    const listing = listings.find(l => l.id === listingId);
    if (listing && listing.userId === user.id) {
      const updatedListings = listings.filter(l => l.id !== listingId);
      setListings(updatedListings);
      localStorage.setItem('campusfash_listings', JSON.stringify(updatedListings));
    }
  };

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
  };

  const handleCloseModal = () => {
    setSelectedListing(null);
  };

  return (
    <div className="marketplace-container">
      <header className="marketplace-header">
        <div className="header-content">
          <div className="header-left">
            <h1>CampusFash Marketplace</h1>
            <p>Buy and sell items with fellow students</p>
          </div>
          <UserMenu />
        </div>
      </header>

      <main className="marketplace-main">
        {/* Search and Create Section */}
        <div className="marketplace-controls">
          <div className="search-section">
            <div className="search-bar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <button 
            className="create-listing-btn"
            onClick={() => setShowCreateModal(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Post Listing
          </button>
        </div>

        {/* Category Filter Buttons */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.label}
              {category.id === 'all' && (
                <span className="filter-count">({listings.length})</span>
              )}
              {category.id !== 'all' && (
                <span className="filter-count">
                  ({listings.filter(l => l.category === category.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        <div className="listings-section">
          {filteredListings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No listings found</h3>
              <p>
                {activeFilter === 'all' 
                  ? "Be the first to post a listing!" 
                  : `No ${categories.find(c => c.id === activeFilter)?.label?.toLowerCase()} listings yet.`
                }
              </p>
              <button 
                className="create-listing-btn"
                onClick={() => setShowCreateModal(true)}
              >
                Create First Listing
              </button>
            </div>
          ) : (
            <div className="listings-grid">
              {filteredListings.map(listing => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  currentUser={user}
                  onDelete={handleDeleteListing}
                  onViewDetails={() => handleViewDetails(listing)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <CreateListing
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleAddListing}
          categories={categories.filter(c => c.id !== 'all')}
        />
      )}

      {/* Listing Details Modal */}
      {selectedListing && (
        <ListingDetailsModal
          listing={selectedListing}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Marketplace;
