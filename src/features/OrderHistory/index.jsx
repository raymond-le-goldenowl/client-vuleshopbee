import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {DataGrid} from '@mui/x-data-grid';
import {Box, Container} from '@mui/material';

function OrderHistory() {
	const {orders} = useSelector(state => state.order);

	// remade column to display correct data.
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
			// format datatime
			renderCell: cellValue =>
				new Date(cellValue.value).toLocaleString('en-GB', {timeZone: 'UTC'}),
		},
		{
			field: 'detail',
			headerName: '',
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
