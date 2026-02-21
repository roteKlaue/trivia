import BrowseGalleryRoundedIcon from '@mui/icons-material/BrowseGalleryRounded';
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded';
import FavoriteIcon from '@mui/icons-material/FavoriteRounded';
import Skull from '../main/Skull';

type PageId = 'overview' | 'timed' | 'lives' | 'hardcore';

export type PageDef = {
    id: PageId;
    label: string;
    element: React.ReactNode;
    icon: React.ReactNode;
};

export const pageDefs: Omit<PageDef, 'element'>[] = [
    { id: 'overview', label: 'Help', icon: <HelpCenterRoundedIcon /> },
    { id: 'timed', label: 'Timer', icon: <BrowseGalleryRoundedIcon /> },
    { id: 'lives', label: 'Lives', icon: <FavoriteIcon /> },
    { id: 'hardcore', label: 'Hardcore', icon: <Skull /> },
];
