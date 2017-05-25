export const configProducts = {
	url: '/products/list_preview',
	title: 'Products',
	elements: [
		{ id: 'next_page', type: 'xpath', name: 'Next Page', mandatory: true },
		{ id: 'product_url', type: 'xpath', name: 'Product URL', mandatory: true }
	]
};

export const defaultValuesProducts = {
	next_page: '//a[contains(@class, "nav-pagin-item--next")]/@href',
	product_url: '//a[@class="lst-product-item-media"]/@href'
}