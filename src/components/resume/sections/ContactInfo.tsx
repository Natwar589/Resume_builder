import React from 'react';
import { ResumeContact } from '@/lib/resumeTypes';
import { formatLink } from '@/lib/jsonUtils';

interface ContactInfoProps {
  contact: ResumeContact;
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({ 
  contact, 
  className = "flex flex-wrap justify-center gap-2 text-sm",
  itemClassName = "",
  separator = <span className="mx-1">•</span>
}) => {
  const items: React.ReactNode[] = [];

  if (contact.email) {
    items.push(
      <a key="email" href={formatLink('email', contact.email)!} className={itemClassName}>
        {contact.email}
      </a>
    );
  }
  if (contact.phone) {
    items.push(
      <a key="phone" href={formatLink('phone', contact.phone)!} className={itemClassName}>
        {contact.phone}
      </a>
    );
  }
  if (contact.location) {
    items.push(<span key="location" className={itemClassName}>{contact.location}</span>);
  }
  if (contact.linkedin) {
    items.push(
      <a key="linkedin" href={formatLink('url', contact.linkedin)!} className={itemClassName} target="_blank" rel="noreferrer">
        {contact.linkedin.replace(/^https?:\/\//, '')}
      </a>
    );
  }
  if (contact.github) {
    items.push(
      <a key="github" href={formatLink('url', contact.github)!} className={itemClassName} target="_blank" rel="noreferrer">
        {contact.github.replace(/^https?:\/\//, '')}
      </a>
    );
  }
  if (contact.portfolio) {
    items.push(
      <a key="portfolio" href={formatLink('url', contact.portfolio)!} className={itemClassName} target="_blank" rel="noreferrer">
        {contact.portfolio.replace(/^https?:\/\//, '')}
      </a>
    );
  }

  return (
    <div className={className}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index < items.length - 1 && separator}
        </React.Fragment>
      ))}
    </div>
  );
};
