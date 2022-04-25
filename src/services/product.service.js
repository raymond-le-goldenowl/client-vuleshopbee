import viettel15gb from 'assets/images/viettel-15gb.png';
import viettel8gb from 'assets/images/viettel-8gb.png';

class ProductService {
	async getListProduct() {
		return await [
			{
				id: 'viettel15gb-123af-asdf-2312',
				name: 'Gói nạp data viettel 15GB (30 ngày)',
				model: 'data-vt15gb',
				original_price: 200000,
				price: 170000,
				slug: 'goi-nap-data-viettel-15gb',
				image: viettel15gb,
				tutorial: `<div style='background-color: #e3e1e1;border: 1px solid #8c8989;padding: 1rem 1.25rem;border-radius: 0.375rem;'><p>Sản phẩm n&agrave;y kh&ocirc;ng được &aacute;p dụng chương tr&igrave;nh ưu đ&atilde;i VIP/Đại l&yacute;</p></div>`,
				description: `<h1 style="font-family:Roboto Condensed,sans-serif; font-size:24px; font-weight:700; line-height:1.5">C&acirc;u hỏi thường gặp (Q&amp;A)</h1><h3 style="font-family:Roboto Condensed,sans-serif; font-size:16px; font-weight:700; line-height:1.5">1.&nbsp;C&uacute; ph&aacute;p kiểm tra data sau khi mua g&oacute;i nạp Data&nbsp;Viettel?</h3><p>Để kiểm tra data, bạn nhắn tin KTTK gửi 191</p>`,
				platform: '',
				status: 'Còn hàng',
				sale_of: 15,
				variant_id: 11649,
				variant_title: 'Gói nạp Data Viettel 15GB ( 30 ngày )',
				variant_text: 'Chọn gói cước',
				additional_information: null,
				amount: 100,
				created_at: Date.now(),
				updated_at: Date.now(),
				deleted_at: Date.now(),
				category: 'viettel',
				discounts: [],
				tags: ['viettel'],
			},
			{
				id: 'viettel8gb-123af-asdf-2311',
				name: 'Gói nạp data viettel 8GB (30 ngày)',
				model: 'data-vt15gb',
				original_price: 125000,
				price: 106000,
				slug: 'goi-nap-data-viettel-8gb',
				image: viettel8gb,
				tutorial: `<div style='background-color: #e3e1e1;border: 1px solid #8c8989;padding: 1rem 1.25rem;border-radius: 0.375rem;'><p>Sản phẩm n&agrave;y kh&ocirc;ng được &aacute;p dụng chương tr&igrave;nh ưu đ&atilde;i VIP/Đại l&yacute;</p></div>`,
				description: `<h1 style="font-family:Roboto Condensed,sans-serif; font-size:24px; font-weight:700; line-height:1.5">C&acirc;u hỏi thường gặp (Q&amp;A)</h1><h3 style="font-family:Roboto Condensed,sans-serif; font-size:16px; font-weight:700; line-height:1.5">1.&nbsp;C&uacute; ph&aacute;p kiểm tra data sau khi mua g&oacute;i nạp Data&nbsp;Viettel?</h3><p>Để kiểm tra data, bạn nhắn tin KTTK gửi 191</p>`,
				platform: '',
				status: 'Còn hàng',
				sale_of: 15,
				variant_id: 11649,
				variant_title: 'Gói nạp Data Viettel 8GB ( 30 ngày )',
				variant_text: 'Chọn gói cước',
				additional_information: null,
				amount: 127,
				created_at: Date.now(),
				updated_at: Date.now(),
				deleted_at: Date.now(),
				category: 'viettel',
				discounts: [],
				tags: ['viettel'],
			},
		];
	}

	async getProductDetail(productId) {
		const products = await this.getListProduct();
		return await products.find(product => product.id === productId);
	}

	async getProductDetailByVariantId(productVariantId) {
		const products = await this.getListProduct();
		return await products.find(
			product => product.variant_id === productVariantId,
		);
	}
}

export default new ProductService();
