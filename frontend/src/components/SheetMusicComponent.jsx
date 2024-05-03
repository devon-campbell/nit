import React, { useEffect, useState, useRef } from 'react';
import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay';

const SheetMusicComponent = ({ xml }) => {
  const [osmd, setOsmd] = useState(null);
  const [loading, setLoading] = useState(true);
  const osmdContainerRef = useRef(null);

  useEffect(() => {
    const loadOsmdInstance = async () => {
      const div = osmdContainerRef.current;
      const osmdInstance = new OpenSheetMusicDisplay(div, {
        drawPartNames: false, // Don't display part and score names
      });

      setOsmd(osmdInstance);

      try {
        await osmdInstance.load(xml);
        osmdInstance.render();
        setLoading(false);
      } catch (error) {
        console.error("Error loading the music XML: ", error);
        setLoading(false);
      }
    };

    if (xml) {
      loadOsmdInstance();
    }
  }, [xml]);

  return (
    <div ref={osmdContainerRef}>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default SheetMusicComponent;
