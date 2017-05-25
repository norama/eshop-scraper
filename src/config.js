const config = {
	elements: [
		{ id: 'baseURL', type: 'url', name: 'Base URL', mandatory: true },
		{ id: 'categoriesURL', type: 'url', name: 'Categories URL', mandatory: true },
	
		{ id: 'productURL', type: 'xpath', name: 'Product URL', mandatory: true },
		{ id: 'productName', type: 'xpath', name: 'Product Name', mandatory: true },
		{ id: 'productPrice', type: 'xpath', name: 'Product Price', mandatory: false }
	]
};

export default config;