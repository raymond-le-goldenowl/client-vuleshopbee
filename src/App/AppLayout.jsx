import Header from 'components/Header';
import React from 'react';

function AppLayout({children}) {
	return (
		<div className='app-vuleshopbee'>
			<Header />
			{children}
		</div>
	);
}

export default AppLayout;
