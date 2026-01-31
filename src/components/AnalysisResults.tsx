import React, { useState } from 'react';
import { SwingAnalysis, FeedbackItem } from '../types';

interface AnalysisResultsProps {
  analysis: SwingAnalysis;
  onNewRecording: () => void;
}

type TabType = 'overview' | 'setup' | 'grip' | 'swing' | 'improvements';

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysis,
  onNewRecording
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'score-excellent';
    if (score >= 65) return 'score-good';
    if (score >= 50) return 'score-fair';
    return 'score-needs-work';
  };

  const getStatusIcon = (status: FeedbackItem['status']) => {
    switch (status) {
      case 'good':
        return (
          <svg viewBox="0 0 24 24" className="status-icon status-good">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
        );
      case 'needs-work':
        return (
          <svg viewBox="0 0 24 24" className="status-icon status-warning">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="currentColor"/>
          </svg>
        );
      case 'critical':
        return (
          <svg viewBox="0 0 24 24" className="status-icon status-critical">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
          </svg>
        );
    }
  };

  const renderFeedbackCard = (title: string, item: FeedbackItem) => (
    <div className={`feedback-card feedback-${item.status}`}>
      <div className="feedback-header">
        {getStatusIcon(item.status)}
        <h4>{title}</h4>
      </div>
      <p className="feedback-text">{item.feedback}</p>
      <div className="feedback-tip">
        <strong>Tip:</strong> {item.tip}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="overview-section">
      <div className="overall-score-card">
        <div className={`score-circle ${getScoreColor(analysis.overallScore)}`}>
          <span className="score-value">{analysis.overallScore}</span>
          <span className="score-label">Overall</span>
        </div>
      </div>

      <div className="score-breakdown">
        <h3>Score Breakdown</h3>
        <div className="score-grid">
          {[
            { label: 'Setup', score: analysis.setup.score },
            { label: 'Grip', score: analysis.grip.score },
            { label: 'Backswing', score: analysis.backswing.score },
            { label: 'Downswing', score: analysis.downswing.score },
            { label: 'Impact', score: analysis.impact.score },
            { label: 'Follow Through', score: analysis.followThrough.score }
          ].map(item => (
            <div key={item.label} className="score-item">
              <span className="score-item-label">{item.label}</span>
              <div className="score-bar-container">
                <div
                  className={`score-bar ${getScoreColor(item.score)}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
              <span className="score-item-value">{item.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSetup = () => (
    <div className="analysis-section">
      <div className="section-header">
        <h3>Setup Analysis</h3>
        <span className={`section-score ${getScoreColor(analysis.setup.score)}`}>
          {analysis.setup.score}/100
        </span>
      </div>
      <div className="feedback-grid">
        {renderFeedbackCard('Stance', analysis.setup.stance)}
        {renderFeedbackCard('Alignment', analysis.setup.alignment)}
        {renderFeedbackCard('Ball Position', analysis.setup.ballPosition)}
        {renderFeedbackCard('Posture', analysis.setup.posture)}
      </div>
    </div>
  );

  const renderGrip = () => (
    <div className="analysis-section">
      <div className="section-header">
        <h3>Grip Analysis</h3>
        <span className={`section-score ${getScoreColor(analysis.grip.score)}`}>
          {analysis.grip.score}/100
        </span>
      </div>
      <div className="feedback-grid">
        {renderFeedbackCard('Grip Type', analysis.grip.gripType)}
        {renderFeedbackCard('Pressure', analysis.grip.pressure)}
        {renderFeedbackCard('Hand Position', analysis.grip.handPosition)}
        {renderFeedbackCard('Wrist Angle', analysis.grip.wristAngle)}
      </div>
    </div>
  );

  const renderSwing = () => (
    <div className="analysis-section">
      <div className="swing-phases">
        {[
          { title: 'Backswing', data: analysis.backswing },
          { title: 'Downswing', data: analysis.downswing },
          { title: 'Impact', data: analysis.impact },
          { title: 'Follow Through', data: analysis.followThrough }
        ].map(phase => (
          <div key={phase.title} className="phase-card">
            <div className="phase-header">
              <h4>{phase.title}</h4>
              <span className={`phase-score ${getScoreColor(phase.data.score)}`}>
                {phase.data.score}
              </span>
            </div>
            <p className="phase-feedback">{phase.data.feedback}</p>
            <ul className="phase-points">
              {phase.data.keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderImprovements = () => (
    <div className="improvements-section">
      <h3>Areas for Improvement</h3>
      <div className="improvements-list">
        {analysis.improvements.map((improvement, idx) => (
          <div key={idx} className={`improvement-card priority-${improvement.priority}`}>
            <div className="improvement-header">
              <span className={`priority-badge priority-${improvement.priority}`}>
                {improvement.priority.toUpperCase()} PRIORITY
              </span>
              <h4>{improvement.area}</h4>
            </div>
            <p className="improvement-description">{improvement.description}</p>
            <div className="improvement-drills">
              <h5>Practice Drills:</h5>
              <ul>
                {improvement.drills.map((drill, drillIdx) => (
                  <li key={drillIdx}>{drill}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="analysis-results">
      <div className="results-header">
        <h2>Swing Analysis Complete</h2>
        <button onClick={onNewRecording} className="btn btn-secondary">
          Record New Swing
        </button>
      </div>

      <div className="tabs">
        {(['overview', 'setup', 'grip', 'swing', 'improvements'] as TabType[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'setup' && renderSetup()}
        {activeTab === 'grip' && renderGrip()}
        {activeTab === 'swing' && renderSwing()}
        {activeTab === 'improvements' && renderImprovements()}
      </div>
    </div>
  );
};
