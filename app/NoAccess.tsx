// pages/access-denied.tsx

import React from 'react';
import styles from './NoAccess.module.css'
import Link from 'next/link';

const NoAccess: React.FC = () => {
  return (
    <div className={styles.container}>
      <p className={styles.errormessage}>Access Denied</p>
      <p>
        You don't have permission to access this page. Please contact the administrator for assistance.
      </p>
      <Link href="/" className={styles.backlink}>
        Go back to home
      </Link>
    </div>
  );
};

export default NoAccess;

