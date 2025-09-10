import React from 'react';
import Avatar from './Avatar';
import './ListingCard.css';

const ListingCard = ({ listing, currentUser, onDelete, onViewDetails }) => {
  const isOwner = currentUser && listing.userId === currentUser.id;
  
  const formatPrice = (price) => {
    // Round to 2 decimal places to avoid floating point precision issues
    const roundedPrice = Math.round(price * 100) / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(roundedPrice);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const handleContactSeller = () => {
    const subject = encodeURIComponent(`Interested in: ${listing.title}`);
    const body = encodeURIComponent(`Hi ${listing.userName},\n\nI'm interested in your listing "${listing.title}" on CampusFash. Is it still available?\n\nThanks!`);
    window.open(`mailto:${listing.userEmail}?subject=${subject}&body=${body}`);
  };

  const handlePurchase = () => {
    const subject = encodeURIComponent(`Ready to Purchase: ${listing.title}`);
    const body = encodeURIComponent(`Hi ${listing.userName},\n\nI would like to purchase your item "${listing.title}" listed for ${listing.price === 0 ? 'FREE' : formatPrice(listing.price)} on CampusFash.\n\nPlease let me know how we can arrange the transaction.\n\nThanks!`);
    window.open(`mailto:${listing.userEmail}?subject=${subject}&body=${body}`);
  };

  const handleMakeOffer = () => {
    const offerAmount = prompt(`Make an offer for "${listing.title}":\nCurrent price: ${listing.price === 0 ? 'FREE' : formatPrice(listing.price)}`, '');
    if (offerAmount && !isNaN(offerAmount) && parseFloat(offerAmount) > 0) {
      const subject = encodeURIComponent(`Offer for: ${listing.title}`);
      const body = encodeURIComponent(`Hi ${listing.userName},\n\nI would like to make an offer of $${parseFloat(offerAmount).toFixed(2)} for your item "${listing.title}" (listed at ${listing.price === 0 ? 'FREE' : formatPrice(listing.price)}) on CampusFash.\n\nPlease let me know if you're interested in this offer.\n\nThanks!`);
      window.open(`mailto:${listing.userEmail}?subject=${subject}&body=${body}`);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      onDelete(listing.id);
    }
  };

  return (
    <div className="listing-card" onClick={onViewDetails}>
      {/* Image Section */}
      <div className="listing-image">
        {listing.images && listing.images.length > 0 ? (
          <img src={listing.images[0]} alt={listing.title} />
        ) : (
          <div className="no-image">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21,15 16,10 5,21"></polyline>
            </svg>
            <span>No Image</span>
          </div>
        )}
        
        {/* Price Badge */}
        <div className="price-badge">
          {listing.price === 0 ? 'FREE' : formatPrice(listing.price)}
        </div>
        
        {/* Category Badge */}
        <div className="category-badge">
          {listing.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="listing-content">
        <h3 className="listing-title">{listing.title}</h3>
        <p className="listing-description">{listing.description}</p>
        
        {/* Condition */}
        <div className="listing-condition">
          <span className={`condition-badge ${listing.condition}`}>
            {listing.condition}
          </span>
        </div>

        {/* Seller Info - Only show for non-owners */}
        {!isOwner && (
          <div className="seller-info">
            <Avatar user={{
              name: listing.userName,
              picture: listing.userPicture
            }} size="small" />
            <div className="seller-details">
              <span className="seller-name">{listing.userName}</span>
              <span className="listing-date">{formatDate(listing.createdAt)}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="listing-actions">
          {isOwner ? (
            <div className="owner-actions">
              <button className="edit-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
                Edit
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="3,6 5,6 21,6"></polyline>
                  <path d="M19,6V20a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6M8,6V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2V6"></path>
                </svg>
                Delete
              </button>
            </div>
          ) : (
            <div className="buyer-actions">
              <div className="action-row">
                <button className="purchase-btn" onClick={handlePurchase}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  {listing.price === 0 ? 'Get Item' : 'Purchase'}
                </button>
                <button className="message-btn" onClick={handleContactSeller}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Message
                </button>
              </div>
              {listing.price > 0 && (
                <button className="offer-btn" onClick={handleMakeOffer}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="23"></line>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  Make Offer
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
