import React, { useCallback, useState } from 'react';
import useMount from 'react-use/lib/useMount';
import styles from './NavBottom.module.css';

type Link = {
  label: string;
  location: string;
};

const NavBottom = () => {
  const [ip, setIp] = useState('');
  const [links, setLinks] = useState<Link[]>([]);
  const [fields, setFields] = useState<Link[]>([]);
  const openLocation = useCallback(
    (link: Link) => () => {
      link.location && window.open(link.location, '_blank');
    },
    []
  );
  useMount(() => {
    const fetchLocation = async () => {
      const resp = await fetch('https://api.ipify.org/?format=json');
      const data = await resp.json();
      setIp(data.ip);
    };
    fetchLocation();
  });
  useMount(() => {
    const data: Link[] = [
      {
        label: 'Advertising',
        location: 'https://www.google.com/intl/en_us/ads/',
      },
      {
        label: 'Business',
        location: 'https://www.google.com/services/',
      },
      {
        label: 'About',
        location: 'https://about.google/',
      },
      {
        label: 'How Search works',
        location: 'https://google.com/search/howsearchworks/',
      },
    ];
    setLinks(data);
  });
  useMount(() => {
    const data: Link[] = [
      { label: 'Privacy', location: 'https://policies.google.com/privacy' },
      { label: 'Terms', location: 'https://policies.google.com/terms' },
    ];
    setFields(data);
  });

  return (
    <div className={styles.NavBottom}>
      <div className={styles.ip}>{ip}</div>
      <div className={styles.links}>
        <div className={styles.left}>
          {links.map((link) => (
            <div
              key={link.label}
              className={styles.link}
              onClick={openLocation(link)}
            >
              {link.label}
            </div>
          ))}
        </div>
        <div className={styles.right}>
          {fields.map((field) => (
            <div
              key={field.label}
              className={styles.link}
              onClick={openLocation(field)}
            >
              {field.label}
            </div>
          ))}
          <div className={styles.link}>Settings</div>
        </div>
      </div>
    </div>
  );
};

export default NavBottom;
