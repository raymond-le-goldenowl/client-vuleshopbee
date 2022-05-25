import {Fragment} from 'react';
import {Divider} from '@mui/material';

import FooterCopyright from './FooterCopyright';
import FooterContactSection from './FooterContactSection';
import FooterSubcribeSection from './FooterSubcribeSection';
import FooterCategoriesSection from './FooterCategoriesSection';
import FooterIconBoxesSection from './FooterIconBoxesSection';

export default function Footer() {
	return (
		<Fragment>
			{/* Footer subcribe section */}
			<FooterSubcribeSection />
			{/* Footer Iconboxes section */}
			<FooterIconBoxesSection />
			<Divider />
			{/* Footer categories section */}
			<FooterCategoriesSection column={5} />
			{/* Footer contact section */}
			<FooterContactSection />
			<Divider />
			<FooterCopyright />
		</Fragment>
	);
}
