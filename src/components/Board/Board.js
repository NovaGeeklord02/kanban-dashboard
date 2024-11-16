import React from "react";
import "./Board.css";
import Card from "../Card/Card";
import Slider from "../Slider/Slider";

import addIcon from "../../assets/add.png";
import dotsIcon from "../../assets/3-dot-menu.png";
import backlogIcon from "../../assets/Backlog.png";
import todoIcon from "../../assets/To-do.png";
import inProgressIcon from "../../assets/in-progress.png";
import doneIcon from "../../assets/Done.png";
import cancelledIcon from "../../assets/Cancelled.png";
import urgentIcon from "../../assets/SVG-Urgent-Priority-colour.png";
import highIcon from "../../assets/Img-High-Priority.png";
import mediumIcon from "../../assets/Img-Medium-Priority.png";
import lowIcon from "../../assets/Img-Low-Priority.png";
import noPriorityIcon from "../../assets/No-priority.png";

const statusIcons = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Cancelled: cancelledIcon,
};

const priorityInfo = {
  4: { icon: urgentIcon, label: "Urgent" },
  3: { icon: highIcon, label: "High" },
  2: { icon: mediumIcon, label: "Medium" },
  1: { icon: lowIcon, label: "Low" },
  0: { icon: noPriorityIcon, label: "No Priority" },
};

const Board = ({ tickets, users, grouping, sorting }) => {
  const getUserAvailabilityDisplay = (userName) => {
    const user = users.find(u => u.name === userName);
    return (
      <div className="user-avatar-header">
        <div className="avatar">
          {userName.charAt(0).toUpperCase()}
          <span 
            className="availability-indicator" 
            style={{ background: user?.available ? '#00FF00' : '#999999' }}
          />
        </div>
      </div>
    );
  };

  const groupTickets = () => {
    let grouped = {};

    switch (grouping) {
      case "status":
        grouped = {
          Backlog: [],
          Todo: [],
          "In progress": [],
          Done: [],
          Cancelled: [],
        };
        tickets.forEach((ticket) => {
          if (grouped[ticket.status]) {
            grouped[ticket.status].push(ticket);
          }
        });
        break;

      case "priority":
        grouped = {
          Urgent: [],
          High: [],
          Medium: [],
          Low: [],
          "No Priority": [],
        };
        tickets.forEach((ticket) => {
          const priority = priorityInfo[ticket.priority].label;
          if (!grouped[priority]) grouped[priority] = [];
          grouped[priority].push(ticket);
        });
        break;

      case "user":
        users.forEach((user) => {
          grouped[user.name] = [];
        });
        tickets.forEach((ticket) => {
          const user = users.find((u) => u.id === ticket.userId);
          if (user && grouped[user.name]) {
            grouped[user.name].push(ticket);
          }
        });
        break;

      default:
        break;
    }

    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (sorting === "priority") {
          return b.priority - a.priority;
        }
        return a.title.localeCompare(b.title);
      });
    });

    return grouped;
  };

  const renderColumns = () => {
    const groups = groupTickets();
    return Object.entries(groups).map(([groupKey, groupTickets]) => (
      <div key={groupKey} className="status-column">
        <div className="column-header">
          <div className="header-left">
            {grouping === 'user' ? (
              <>
                {getUserAvailabilityDisplay(groupKey)}
                <span className="group-name">{groupKey}</span>
              </>
            ) : (
              <>
                <img
                  src={
                    grouping === "priority"
                      ? priorityInfo[groupTickets[0]?.priority]?.icon
                      : statusIcons[groupKey]
                  }
                  alt={groupKey}
                  className="status-icon"
                />
                <span className="group-name">{groupKey}</span>
              </>
            )}
            <span className="ticket-count">{groupTickets.length}</span>
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <img src={addIcon} alt="add" />
            </button>
            <button className="icon-button">
              <img src={dotsIcon} alt="menu" />
            </button>
          </div>
        </div>
        <div className="column-tickets">
          {groupTickets.map((ticket) => (
            <Card
              key={ticket.id}
              ticket={ticket}
              user={users.find((u) => u.id === ticket.userId)}
              statusIcon={statusIcons[ticket.status]}
              priorityIcon={priorityInfo[ticket.priority].icon}
              grouping={grouping}
              hideUser={grouping === 'user'}
            />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="board">
      <Slider>
        {renderColumns()}
      </Slider>
    </div>
  );
};

export default Board;