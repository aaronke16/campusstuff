import React from 'react';
import Avatar from './Avatar';
import './ListingDetailsModal.css';

const ListingDetailsModal = ({ listing, currentUser, onClose }) => {
  if (!listing) return null;
  const isOwner = currentUser && listing.userId === currentUser.id;

  return (
    <div className="details-modal-overlay" onClick={onClose}>
      <div className="details-modal" onClick={e => e.stopPropagation()}>
        <button className="details-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="details-images">
          {listing.images && listing.images.length > 0 ? (
            listing.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Listing ${idx + 1}`} />
            ))
          ) : (
            <div className="details-no-image">No Images</div>
          )}
        </div>
        <div className="details-content">
          <h2>{listing.title}</h2>
          <div className="details-price">
            {listing.price === 0 ? 'FREE' : `$${listing.price.toFixed(2)}`}
          </div>
          <div className="details-category">Category: {listing.category}</div>
          <div className="details-condition">Condition: {listing.condition}</div>
          <p className="details-description">{listing.description}</p>
          <div className="details-seller">
            <Avatar user={{ name: listing.userName, picture: listing.userPicture }} size="medium" />
            <div className="details-seller-info">
              <div><strong>Seller:</strong> {listing.userName}</div>
              <div><strong>Email:</strong> {listing.userEmail}</div>
              <div><strong>Posted:</strong> {new Date(listing.createdAt).toLocaleString()}</div>
            </div>
          </div>
          {!isOwner && (
            <div className="details-actions">
              <button onClick={() => window.open(`mailto:${listing.userEmail}?subject=Interested in ${listing.title}`)}>
                Message Seller
              </button>
              <button onClick={() => window.open(`mailto:${listing.userEmail}?subject=Ready to Purchase ${listing.title}`)}>
                Purchase
              </button>
              {listing.price > 0 && (
                <button onClick={() => {
                  const offer = prompt('Enter your offer amount:');
                  if (offer && !isNaN(offer) && parseFloat(offer) > 0) {
                    window.open(`mailto:${listing.userEmail}?subject=Offer for ${listing.title}&body=I would like to offer $${parseFloat(offer).toFixed(2)} for your item.`);
                  }
                }}>
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

export default ListingDetailsModal;
