import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrders} from 'containers/Order/orderSlice';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Container} from '@mui/material';
import Header from 'components/Header';
import {Link} from 'react-router-dom';

function OrderHistory() {
	const dispatch = useDispatch();

	const {orders} = useSelector(state => state.order);

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

	const columns = [
		{field: 'id', headerName: 'ID', width: 290},
		{field: 'receiver', headerName: 'Người nhận', width: 190},
		{field: 'total', headerName: 'Số lượng', width: 100, type: 'number'},
		{field: 'amount', headerName: 'Tổng tiền', type: 'number', width: 150},
		{
			field: 'created_at',
			headerName: 'Thời gian tạo',
			type: 'dateTime',
			width: 220,
			renderCell: cellValue =>
				new Date(cellValue.value).toLocaleString('en-GB', {timeZone: 'UTC'}),
		},
		{
			field: 'detail',
			headerName: '',
			width: 220,
			renderCell: cellValue => (
				<Link to={`/order/${cellValue?.row?.id}`}>Chi tiết</Link>
			),
		},
	];

	return (
		<div className='app-vuleshopbee'>
			<Header />
			<Container maxWidth='lg' sx={{marginTop: 2}}>
				<Box style={{height: 400, width: '100%'}}>
					<DataGrid
						rows={orders}
						columns={columns}
						pageSize={5}
						rowsPerPageOptions={[5]}
					/>
				</Box>
			</Container>
		</div>
	);
}

export default OrderHistory;
