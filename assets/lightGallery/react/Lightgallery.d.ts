import * as React from 'react';
import { LightGallerySettings } from '../lg-settings';
export interface LightGalleryProps extends Partial<LightGallerySettings> {
    className?: string;
    children?: any;
}
declare const LG: React.FC<LightGalleryProps>;
export default LG;
