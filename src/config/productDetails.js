export const configProductDetails = {
	url: '/products/parse_preview',
	title: 'Product Details',
	elements: [
		{ id: 'name', type: 'xpath', name: 'Name', mandatory: true },
		{ id: 'price_with_vat', type: 'xpath', name: 'Product with VAT', mandatory: false },
		{ id: 'availability', type: 'xpath', name: 'Availability', mandatory: false },
		{ id: 'image', type: 'xpath', name: 'Image', mandatory: false },
		{ id: 'shop_code', type: 'xpath', name: 'Shop Code', mandatory: false },
		{ id: 'manufacturer', type: 'xpath', name: 'Manufacturer', mandatory: false },
		{ id: 'price_without_discount', type: 'xpath', name: 'Price Without Discount', mandatory: false }
	]
};

export const defaultValuesProductDetails = {
	name: '//h1[@itemprop="name"]',
	price_with_vat: '//p[contains(@class, "pro-price-wraper")]/b',
	availability: '//a[contains(@class, "con-text--availability")]',
	image: '//div[contains(@class, "gall-master")]//img',
	shop_code: '//b[@data-sel="catalog-number"]',
	manufacturer: '//span[contains(@class, "brand-info")]//b',
	price_without_discount: '//span[contains(@class, "base-price")]//del',
}