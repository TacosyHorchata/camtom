import React, { useState } from 'react';
import FormSinglePage from './FormSinglePage';
import Dashboard from './Dashboard';

import "./styleoverlay.css"

function OverlayComponent({ onClose, isOverlayVisible }) {
    return (
        <div className={`overlay ${isOverlayVisible ? 'visible' : 'hidden'}`} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div className="overlay-content" style={{ maxHeight: '100vh',width:'100wv',overflowY: 'auto' }}>
              <FormSinglePage />
              <button onClick={onClose}>Cerrar superposición</button>
            </div>
          </div>
    );
}

export default function ContainerComponent() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const showOverlay = () => {
    setIsOverlayVisible(true);
  };

  const hideOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div className="container">
      <button onClick={showOverlay}>Mostrar superposición</button>

      <Dashboard />

      {isOverlayVisible && <OverlayComponent onClose={hideOverlay} isOverlayVisible={isOverlayVisible} />}
    </div>
  );
}