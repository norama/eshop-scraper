export const configCategories = {
	url: '/categories/list',
	elements: [
		{ id: 'base_page', type: 'url', name: 'Base Page', mandatory: true },
		{ id: 'category_page', type: 'url', name: 'Category Page', mandatory: true },
	
		{ id: 'category_xpath', type: 'xpath', name: 'Category XPath', mandatory: true },
		{ id: 'category_name', type: 'xpath', name: 'Category Name', mandatory: true },
		{ id: 'category_url', type: 'xpath', name: 'Category URL', mandatory: true },
		{ id: 'category_second_level_xpath', type: 'xpath', name: 'Category Second Level XPath', mandatory: false }
	]
};

export const defaultValuesCategories = {
	base_page: 'https://www.mall.cz',
	category_page: 'https://www.mall.cz/mapa-stranek',
	category_xpath: '//div[@class="grid-cell"]/ul/li[not(@class)]/a',
	category_name: './text()',
	category_url: './@href',
	category_second_level_xpath: '//nav[@id="nav-sec"]//ul[contains(@class,"nav-secondary--secondary")]/li/a'
}
