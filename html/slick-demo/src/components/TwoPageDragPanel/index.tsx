import './index.scss';
import React from 'react';
interface TwoPageDragPanelProps {
  items: React.JSX.Element[];
}

const TwoPageDragPanel: React.FC<TwoPageDragPanelProps> = ({ items }) => {
  return <>{items}</>;
};

export default TwoPageDragPanel;
