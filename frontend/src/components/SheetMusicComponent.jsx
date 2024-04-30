import React, { useEffect, useState } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const SheetMusicComponent = ({ xml }) => {
  const [osmd, setOsmd] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const div = document.createElement('div');
    const osmdInstance = new OpenSheetMusicDisplay(div, {
      // options here (optional)
    });
    setOsmd(osmdInstance);
    osmdInstance.load(xml).then(() => {
      osmdInstance.render();
      setLoading(false);
    });
  }, [xml]);

  return (
    <div>
      {loading ? <div>Loading...</div> : <div ref={el => el && el.appendChild(osmd.container)} />}
    </div>
  );
};

export default SheetMusicComponent;