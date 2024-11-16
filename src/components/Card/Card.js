
import React from 'react';
import './Card.css';

const Card = ({ ticket, user, statusIcon, priorityIcon, grouping, hideUser }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-id">{ticket.id}</div>
        {!hideUser && user && (
          <div className="user-avatar">
            <div className="avatar">
              {user.name.charAt(0).toUpperCase()}
              <span 
                className="availability-indicator" 
                style={{ background: user.available ? '#00FF00' : '#999999' }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="card-title">
        {grouping !== 'status' && (
          <img src={statusIcon} alt="" className="status-icon" />
        )}
        <span>{ticket.title}</span>
      </div>
      <div className="card-tags">
        {grouping !== 'priority' && (
          <div className="priority-tag">
            <img src={priorityIcon} alt="" className="priority-icon" />
          </div>
        )}
        <div className="feature-tag">
          <div className="dot"></div>
          <span className="tag-text">{ticket.tag[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;