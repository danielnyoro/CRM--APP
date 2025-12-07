// LeadActivityLog.jsx

import React from 'react';

const mockActivities = [
  // Data from lead_communications
  { id: 1, type: 'Communication', method: 'email', date: '2025-12-04 14:30', summary: 'Sent introductory packet and pricing sheet.', agent: 'John Smith' },
  // Data from lead_followups
  { id: 2, type: 'Followup', followup_type: 'call', date: '2025-12-04 10:00', summary: 'Initial call with prospect. Neutral outcome.', agent: 'John Smith' },
  { id: 3, type: 'Communication', method: 'phone', date: '2025-12-03 16:45', summary: 'Incoming call from prospect asking about timelines.', agent: 'Lisa Jones' },
];

// Sort chronologically (most recent first)
mockActivities.sort((a, b) => new Date(b.date) - new Date(a.date));

const LeadActivityLog = () => {

  const getActivityIcon = (activity) => {
    if (activity.type === 'Communication') {
      return activity.method === 'email' ? '📧' : '📞';
    }
    return '💬';
  };

  return (
    <div className="activity-container">
      

      <h4>Activity Log for Lead #45 🗓️</h4>
      
      <ul className="timeline">
        {mockActivities.map(activity => (
          <li key={activity.id} className="timeline-item">
            <div className="icon">{getActivityIcon(activity)}</div>
            <div className="content">
              <div className="date">{new Date(activity.date).toLocaleString()}</div>
              <div className="summary">
                **{activity.type} ({activity.method || activity.followup_type})**: {activity.summary}
              </div>
              <div className="agent">Logged by: {activity.agent}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadActivityLog;