import {DataGrid} from '@mui/x-data-grid';
import {Box, Container, useMediaQuery, useTheme} from '@mui/material';
import {
	getOrders,
	getOrdersForHistoryPageSelector,
} from 'features/Order/orderSlice';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styled from '@emotion/styled';

export function OrderHistoryPage() {
	const dispatch = useDispatch();
	const theme = useTheme();
	const matchesWithMd = useMediaQuery(theme.breakpoints.down('md'));

	const orders = useSelector(getOrdersForHistoryPageSelector);
	useEffect(() => {
		dispatch(getOrders());
	}, []);

	// remade column to display correct data.
	const columns = [
		{field: 'rowIndex', headerName: '#', width: 100},
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
			<Box style={{height: 600, width: '100%'}}>
				<StyledDataGrid
					className={matchesWithMd ? 'custom__table--mobile' : null}
					rows={orders}
					columns={columns}
					pageSize={8}
					rowsPerPageOptions={[8]}
				/>
			</Box>
		</Container>
	);
}

const StyledDataGrid = styled(DataGrid)`
	&.custom__table--mobile {
		& .MuiDataGrid-columnHeaders {
			display: none;
		}

		& .MuiDataGrid-virtualScroller {
			margin-top: 0 !important;
			overflow-y: auto;
			overflow-x: unset;
			& .MuiDataGrid-virtualScrollerContent {
				width: 0 !important;
				& .MuiDataGrid-virtualScrollerRenderZone {
					width: 100%;
					& .MuiDataGrid-row {
						display: flex;
						flex-direction: column;
						min-width: 70% !important;
						max-width: 100% !important;
						min-height: 100% !important;
						max-height: 100% !important;
						justify-content: space-between;

						color: #000;
						background-color: #fff;
						box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
							0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

						padding: 10px;
						border-radius: 4px;
						margin: 10px auto;

						& *[href] {
							color: #000;
							text-decoration: none;

							&:hover {
								text-decoration: underline;
							}
						}

						& .MuiDataGrid-cell {
							justify-content: flex-start;

							min-width: 100% !important;
							max-width: 100% !important;
							min-height: 100% !important;
							max-height: 100% !important;
							border-bottom: none;

							display: grid;
							grid-template-columns: 1fr 2fr;

							&::first-letter {
								text-transform: uppercase;
							}

							&[data-field='rowIndex'] {
								display: none;
							}

							&[data-field]::before {
								content: attr(data-field) ' : ';
								font-weight: 600;
							}
							/* Hide last of list "MuiDataGrid-cell" */
							&::nth-last-of-type(1) {
								display: none;
							}
							/* &[data-field='total']::before {
							content: attr(data-field) ' : ';
						}
						&[data-field='amount']::before {
							content: attr(data-field) ' : ';
						}
						&[data-field='status']::before {
							content: attr(data-field) ' : ';
						}
						&[data-field='created_at']::before {
							content: attr(data-field) ' : ';
						}
						&[data-field='detail']::before {
							content: attr(data-field) ' : ';
						} */
						}
					}
				}
			}
		}
	}
`;
