import React from 'react';
import { ResumeCertification } from '@/lib/resumeTypes';

interface CertificationsSectionProps {
  certifications: ResumeCertification[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  if (!certifications || certifications.length === 0) return null;

  return (
    <div className="space-y-2">
      {certifications.map((cert, index) => (
        <div key={index} className="break-inside-avoid">
          <div className="flex justify-between items-baseline mb-1">
            <h3 className="font-semibold text-gray-900">{cert.name}</h3>
            <span className="text-sm text-gray-600 whitespace-nowrap">{cert.year}</span>
          </div>
          <div className="text-sm text-gray-700">{cert.issuer}</div>
        </div>
      ))}
    </div>
  );
};
