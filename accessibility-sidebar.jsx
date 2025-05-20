// Create the accessibility component
const AccessibilitySidebar = () => {
  // State for panel visibility and settings
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 16, y: 100 });
  const [startPos, setStartPos] = React.useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = React.useState(false);

  // Accessibility states
  const [fontSize, setFontSize] = React.useState(0); // 0: normal, 1: larger, 2: largest
  const [highContrast, setHighContrast] = React.useState(false);
  const [lineHeight, setLineHeight] = React.useState(0); // 0: normal, 1: larger, 2: largest
  const [isReading, setIsReading] = React.useState(false);

  // Check for mobile devices
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Set up listener for window resize
    window.addEventListener('resize', checkMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle font size changes
  const handleFontSizeChange = () => {
    const newSize = (fontSize + 1) % 3;
    setFontSize(newSize);

    // Remove existing classes
    document.body.classList.remove('font-size-larger', 'font-size-largest');

    // Add appropriate class
    if (newSize === 1) {
      document.body.classList.add('font-size-larger');
    } else if (newSize === 2) {
      document.body.classList.add('font-size-largest');
    }
  };

  // Handle contrast toggle
  const handleContrastToggle = () => {
    const newState = !highContrast;
    setHighContrast(newState);

    if (newState) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  // Handle line height changes
  const handleLineHeightChange = () => {
    const newHeight = (lineHeight + 1) % 3;
    setLineHeight(newHeight);

    // Remove existing classes
    document.body.classList.remove('line-height-larger', 'line-height-largest');

    // Add appropriate class
    if (newHeight === 1) {
      document.body.classList.add('line-height-larger');
    } else if (newHeight === 2) {
      document.body.classList.add('line-height-largest');
    }
  };

  // Handle text-to-speech
  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert('Browserul dvs. nu suportă citirea cu voce tare');
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      // Get all the text from the main content
      const contentArea = document.querySelector('.content-area');
      if (!contentArea) return;

      // Get text content from main elements, excluding navigation and controls
      const textContent = Array.from(contentArea.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6'))
        .filter(el => !el.closest('.toc') && !el.closest('.content-nav') && !el.closest('.accessibility-sidebar'))
        .map(el => el.textContent)
        .join('. ');

      // Split into manageable chunks
      const chunks = textContent.match(/.{1,1000}(?:\.|\?|!|$)/g) || [];

      let utterances = chunks.map(chunk => {
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = 'ro-RO';
        return utterance;
      });

      // Start reading
      let currentIndex = 0;

      const speakNext = () => {
        if (currentIndex < utterances.length) {
          const currentUtterance = utterances[currentIndex];

          currentUtterance.onend = () => {
            currentIndex++;
            if (currentIndex < utterances.length && isReading) {
              setTimeout(speakNext, 500); // Small pause between chunks
            } else if (currentIndex >= utterances.length) {
              setIsReading(false);
            }
          };

          window.speechSynthesis.speak(currentUtterance);
        }
      };

      setIsReading(true);

      // Cancel any previous reading
      window.speechSynthesis.cancel();
      speakNext();
    }
  };

  // Handle panel dragging
  const handleMouseDown = (e) => {
    if (isMobile) return; // No dragging on mobile

    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });

    // Prevent text selection during drag
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    // Calculate new position with bounds checking
    const newX = Math.max(0, Math.min(window.innerWidth - 60, e.clientX - startPos.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 60, e.clientY - startPos.y));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Set up mouse event listeners for dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Reset position when switching between mobile and desktop
  React.useEffect(() => {
    if (isMobile) {
      setPosition({ x: 16, y: window.innerHeight - 80 });
    } else {
      setPosition({ x: 16, y: 100 });
    }
  }, [isMobile]);

  // Handle keyboard accessibility
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Create a consistent icon styling function
  const iconStyle = {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // For larger icons (like the main menu toggle)
  const largeIconStyle = {
    ...iconStyle,
    width: '24px',
    height: '24px'
  };

  return (
    <React.Fragment>
      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.4; }
            50% { opacity: 1; }
            100% { opacity: 0.4; }
          }

          @media (prefers-reduced-motion: reduce) {
            .accessibility-sidebar {
              transition: none !important;
            }

            @keyframes pulse {
              0%, 50%, 100% { opacity: 1; }
            }
          }

          .a11y-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
          }

          .a11y-icon.large {
            width: 24px;
            height: 24px;
          }
        `}
      </style>

      <div
        className={`accessibility-sidebar ${isPanelOpen ? 'expanded' : 'collapsed'} ${isMobile ? 'mobile' : 'desktop'}`}
        style={{
          position: 'fixed',
          top: isMobile ? 'auto' : `${position.y}px`,
          left: isMobile ? 'auto' : `${position.x}px`,
          bottom: isMobile ? '20px' : 'auto',
          right: isMobile ? '20px' : 'auto',
          zIndex: 9999,
          transition: 'all 0.3s ease',
          background: highContrast ? '#000' : 'white',
          color: highContrast ? '#fff' : '#333',
          border: `2px solid ${highContrast ? '#fff' : '#2196F3'}`,
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: isPanelOpen ? '16px' : '8px',
          width: isPanelOpen ? (isMobile ? '280px' : '280px') : '56px',
          maxWidth: '90vw',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          cursor: isDragging ? 'grabbing' : 'auto'
        }}
      >
        {/* Panel Header */}
        <div
          className="accessibility-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
            cursor: isMobile ? 'auto' : 'grab',
            padding: '4px'
          }}
          onMouseDown={handleMouseDown}
          role="presentation"
        >
          {isPanelOpen && (
            <div className="title" style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="a11y-icon">
                <i className="fas fa-gear" aria-hidden="true"></i>
              </div>
              <span>Accesibilitate</span>
            </div>
          )}

          <button
            aria-label={isPanelOpen ? "Închide panoul de accesibilitate" : "Deschide panoul de accesibilitate"}
            title={isPanelOpen ? "Închide panoul" : "Opțiuni de accesibilitate"}
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: highContrast ? '#fff' : '#2196F3',
              marginLeft: isPanelOpen ? '0' : 'auto',
              marginRight: isPanelOpen ? '0' : 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onKeyDown={(e) => handleKeyDown(e, () => setIsPanelOpen(!isPanelOpen))}
          >
            {isPanelOpen ? (
              <div className="a11y-icon large">
                <i className="fas fa-compress" aria-hidden="true"></i>
              </div>
            ) : (
              <div className="a11y-icon large">
                <i className="fas fa-gear" aria-hidden="true"></i>
              </div>
            )}
          </button>

          {!isMobile && isPanelOpen && (
            <button
              aria-label="Mută panoul de accesibilitate"
              title="Mută panoul (Trage pentru a muta)"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'grab',
                padding: '4px',
                color: highContrast ? '#fff' : '#666',
                display: 'flex'
              }}
            >
              <div className="a11y-icon">
                <i className="fas fa-arrows-up-down-left-right" aria-hidden="true"></i>
              </div>
            </button>
          )}
        </div>

        {/* Control Buttons - Only visible when panel is expanded */}
        {isPanelOpen && (
          <div
            className="control-buttons"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
            role="group"
            aria-label="Controale de accesibilitate"
          >
            {/* Font Size Control */}
            <button
              aria-label={`Mărime text: ${fontSize === 0 ? 'normal' : fontSize === 1 ? 'mare' : 'foarte mare'}`}
              aria-pressed={fontSize > 0}
              className={`control-button ${fontSize > 0 ? 'active' : ''}`}
              onClick={handleFontSizeChange}
              onKeyDown={(e) => handleKeyDown(e, handleFontSizeChange)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: fontSize > 0 ? (highContrast ? '#fff' : '#e3f2fd') : (highContrast ? '#333' : '#f5f5f5'),
                color: fontSize > 0 ? (highContrast ? '#000' : '#2196F3') : (highContrast ? '#fff' : '#333'),
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: fontSize > 0 ? 'bold' : 'normal',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="a11y-icon">
                <i className="fas fa-font" aria-hidden="true"></i>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>Mărime text</span>
                <small style={{ fontSize: '12px', opacity: '0.8' }}>
                  {fontSize === 0 ? 'Normal' : fontSize === 1 ? 'Mare' : 'Foarte mare'}
                </small>
              </div>
            </button>

            {/* Contrast Control */}
            <button
              aria-label={`Contrast: ${highContrast ? 'ridicat' : 'normal'}`}
              aria-pressed={highContrast}
              className={`control-button ${highContrast ? 'active' : ''}`}
              onClick={handleContrastToggle}
              onKeyDown={(e) => handleKeyDown(e, handleContrastToggle)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: highContrast ? (highContrast ? '#fff' : '#e3f2fd') : (highContrast ? '#333' : '#f5f5f5'),
                color: highContrast ? (highContrast ? '#000' : '#2196F3') : (highContrast ? '#fff' : '#333'),
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: highContrast ? 'bold' : 'normal',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="a11y-icon">
                <i className={highContrast ? "fas fa-sun" : "fas fa-moon"} aria-hidden="true"></i>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>Contrast</span>
                <small style={{ fontSize: '12px', opacity: '0.8' }}>
                  {highContrast ? 'Ridicat' : 'Normal'}
                </small>
              </div>
            </button>

            {/* Line Height Control */}
            <button
              aria-label={`Spațiu între rânduri: ${lineHeight === 0 ? 'normal' : lineHeight === 1 ? 'mare' : 'foarte mare'}`}
              aria-pressed={lineHeight > 0}
              className={`control-button ${lineHeight > 0 ? 'active' : ''}`}
              onClick={handleLineHeightChange}
              onKeyDown={(e) => handleKeyDown(e, handleLineHeightChange)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: lineHeight > 0 ? (highContrast ? '#fff' : '#e3f2fd') : (highContrast ? '#333' : '#f5f5f5'),
                color: lineHeight > 0 ? (highContrast ? '#000' : '#2196F3') : (highContrast ? '#fff' : '#333'),
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: lineHeight > 0 ? 'bold' : 'normal',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="a11y-icon">
                <i className="fas fa-align-justify" aria-hidden="true"></i>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>Spațiu între rânduri</span>
                <small style={{ fontSize: '12px', opacity: '0.8' }}>
                  {lineHeight === 0 ? 'Normal' : lineHeight === 1 ? 'Mare' : 'Foarte mare'}
                </small>
              </div>
            </button>

            {/* Text-to-Speech Control */}
            <button
              aria-label={isReading ? "Oprește citirea" : "Citește cu voce tare"}
              aria-pressed={isReading}
              className={`control-button ${isReading ? 'active' : ''}`}
              onClick={handleReadAloud}
              onKeyDown={(e) => handleKeyDown(e, handleReadAloud)}
              disabled={!('speechSynthesis' in window)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: isReading ? (highContrast ? '#fff' : '#e3f2fd') : (highContrast ? '#333' : '#f5f5f5'),
                color: isReading ? (highContrast ? '#000' : '#2196F3') : (highContrast ? '#fff' : '#333'),
                cursor: 'speechSynthesis' in window ? 'pointer' : 'not-allowed',
                textAlign: 'left',
                fontWeight: isReading ? 'bold' : 'normal',
                opacity: 'speechSynthesis' in window ? 1 : 0.7,
                transition: 'all 0.2s ease'
              }}
            >
              <div className="a11y-icon">
                <i className={isReading ? "fas fa-volume-mute" : "fas fa-volume-high"} aria-hidden="true"></i>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span>{isReading ? "Oprește citirea" : "Citește cu voce tare"}</span>
                <small style={{ fontSize: '12px', opacity: '0.8' }}>
                  {'speechSynthesis' in window ? (isReading ? 'Activ' : 'Inactiv') : 'Indisponibil'}
                </small>
              </div>
            </button>

            {/* Reset All Settings */}
            <button
              aria-label="Resetează toate setările"
              className="control-button reset"
              onClick={() => {
                // Reset all settings
                setFontSize(0);
                setHighContrast(false);
                setLineHeight(0);
                if (isReading) {
                  window.speechSynthesis.cancel();
                  setIsReading(false);
                }

                // Remove all classes
                document.body.classList.remove(
                  'font-size-larger',
                  'font-size-largest',
                  'high-contrast',
                  'line-height-larger',
                  'line-height-largest'
                );
              }}
              onKeyDown={(e) => handleKeyDown(e, () => {
                setFontSize(0);
                setHighContrast(false);
                setLineHeight(0);
                if (isReading) {
                  window.speechSynthesis.cancel();
                  setIsReading(false);
                }
                document.body.classList.remove(
                  'font-size-larger',
                  'font-size-largest',
                  'high-contrast',
                  'line-height-larger',
                  'line-height-largest'
                );
              })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                border: 'none',
                background: highContrast ? '#444' : '#f5f5f5',
                color: highContrast ? '#fff' : '#666',
                cursor: 'pointer',
                textAlign: 'left',
                marginTop: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              <div className="a11y-icon">
                <i className="fas fa-undo" aria-hidden="true"></i>
              </div>
              <span>Resetează setările</span>
            </button>
          </div>
        )}

        {/* Collapsed state status indicators */}
        {!isPanelOpen && (
          <div
            className="status-indicators"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              marginTop: '8px'
            }}
          >
            {fontSize > 0 && (
              <div
                aria-hidden="true"
                title="Mărime text mărită"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: highContrast ? '#fff' : '#2196F3'
                }}
              />
            )}

            {highContrast && (
              <div
                aria-hidden="true"
                title="Contrast ridicat activat"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: highContrast ? '#fff' : '#2196F3'
                }}
              />
            )}

            {lineHeight > 0 && (
              <div
                aria-hidden="true"
                title="Spațiu între rânduri mărit"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: highContrast ? '#fff' : '#2196F3'
                }}
              />
            )}

            {isReading && (
              <div
                aria-hidden="true"
                title="Citire vocală activă"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: highContrast ? '#fff' : '#2196F3',
                  animation: 'pulse 1.5s infinite'
                }}
              />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};