import Header from 'components/Header';
import Footer from 'components/Footer';

function AppLayout({children}) {
	return (
		<div className='app-vuleshopbee'>
			<Header />
			{children}
			<Footer />
		</div>
	);
}

export default AppLayout;
