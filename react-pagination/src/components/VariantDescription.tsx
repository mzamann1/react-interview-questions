import React from 'react';
import { PaginationVariant } from '../types/index';

const variantDescriptions: Record<PaginationVariant, string> = {
    default: 'Classic pagination style with borders and subtle hover effects',
    rounded: 'Circular buttons with smooth animations',
    buttons: 'Elevated buttons with shadow effects',
    modern: 'Clean, flat design with bold active states',
    minimal: 'Subtle styling with color accents',
    outlined: 'Border-focused design with clear active states',
    compact: 'Space-efficient design for smaller interfaces',
    simple: 'Minimalist design with just prev/next controls'
};

interface VariantDescriptionProps {
    variant: PaginationVariant;
}

const VariantDescription: React.FC<VariantDescriptionProps> = ({ variant }) => (
    <p className="variant-description">
        {variantDescriptions[variant]}
    </p>
);

export default VariantDescription;