import React from 'react';
import styles from './Marquee.module.css';
//import './Marquee.css'; // Import the CSS file for styling

const Marquee = () => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeContent}>
      .ندعوكم للمشاركة في رحلة مباركة لأداء مناسك العمرة في بيت الله الحرام 
      .للاطلاع على تفاصيل الرحلة المرجو زيارة الرابط اعلاه
      </div>
    </div>
  );
};

export default Marquee;