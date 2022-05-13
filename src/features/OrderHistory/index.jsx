import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Container} from '@mui/material';
import {useEffect} from 'react';
import {getOrders} from 'features/Order/orderSlice';

function OrderHistory() {
	const dispatch = useDispatch();
	const {orders} = useSelector(state => state.order);
	useEffect(() => {
		dispatch(getOrders());
	}, []);
	// remade column to display correct data.
	const columns = [
		{field: 'id', headerName: 'ID', width: 290},
		{field: 'receiver', headerName: 'Người nhận', width: 190},
		{field: 'total', headerName: 'Số lượng', width: 100, type: 'number'},
		{field: 'amount', headerName: 'Tổng tiền', type: 'number', width: 150},
		{
			field: 'status',
			headerName: 'Trạng thái',
			type: 'boolean',
			width: 150,
			renderCell: cellValue => {
				return cellValue.row.deleted_at
					? 'Đã hủy hóa đơn'
					: cellValue.value
					? 'Đã thanh toán'
					: 'Chưa thanh toán';
			},
		},
		{
			field: 'created_at',
			headerName: 'Thời gian tạo',
			type: 'dateTime',
			width: 220,
			// format datatime
			renderCell: cellValue =>
				new Date(cellValue.value).toLocaleString('en-GB', {timeZone: 'UTC'}),
		},
		{
			field: 'detail',
			headerName: 'Xem chi tiết',
			width: 220,
			// create a link detail of data
			renderCell: cellValue => (
				<Link to={`/account/order/${cellValue?.row?.id}`}>Chi tiết</Link>
			),
		},
	];

	return (
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
	);
}

export default OrderHistory;
