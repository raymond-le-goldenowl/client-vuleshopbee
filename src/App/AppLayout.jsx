import Header from 'components/Header';

function AppLayout({children}) {
	return (
		<div className='app-vuleshopbee'>
			<Header />
			{children}
		</div>
	);
}

export default AppLayout;
