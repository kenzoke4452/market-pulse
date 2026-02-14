// frontend/src/components/Disclaimer.js

import React from 'react';

const Disclaimer = () => {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      padding: '20px',
      textAlign: 'center',
      borderTop: '1px solid #ddd',
      marginTop: '40px',
      fontSize: '14px',
      color: '#666'
    }}>
      <p>
        <strong>Disclaimer:</strong> The information provided on this platform is for informational purposes only and does not constitute financial advice, investment recommendations, or an offer to buy or sell any securities or financial instruments. All content is aggregated from public sources and may not be accurate or up-to-date. Users should conduct their own research and consult with qualified financial professionals before making any investment decisions. The platform and its creators are not responsible for any losses or damages arising from the use of this information.
      </p>
    </footer>
  );
};

export default Disclaimer;