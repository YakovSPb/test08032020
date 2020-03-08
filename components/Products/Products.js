class Products {

	handleSetLocationStorage(element, id, counter) {
		const {products} = localStorageUtil.putProducts({'id': id, 'counter': counter})
	}

	render() {
		const productsStore = localStorageUtil.getProducts()
		let htmlCatalog = ``

		CATALOG.forEach(({id, title, image, descr, price, available, counter = 0}) => {
			const availableString =	available ? 'Есть в наличии' : 'Нет в наличии'



			productsStore.forEach( e => {
				if(id == e.id) {
					counter = e.counter
				}
			})


			htmlCatalog += `
			<li class="products-element">
			<span class="products-element__name">${title}</span>
			<img class="products-element__image" src="${image}" alt="alt" />
			<span class="products-element__descr">${descr}</span>
			<span class="products-element__price">${price.toLocaleString()} ₽</span>
			<span class="products-element__available">${availableString}</span>
			<div>
			<button class="products-element__btn" onclick="productsPage.handleSetLocationStorage(this, '${id}', '${counter}')">
			Добавить в корзину
			</button>
			<span class="products-element__quantity">${counter}</span>
			</div>
			</li>
			`
		})

		const html =  `
		<ul class="products-container">
		${htmlCatalog}
		</ul>
		`

		ROOT_PRODUCTS.innerHTML = html
		headerPage.render()

	}

}

const productsPage = new Products()
productsPage.render()


function close(){
	let close = document.getElementsByClassName('header-element__close')
	const productsStore = localStorageUtil.getProducts()
	for (var i = 0; i< close.length; i++) {
		close[i].addEventListener('click', function(event) {
			let elementId = event.target.parentNode.getAttribute('data-id')
			productsStore.forEach(({id}, index) => {
				if(elementId == id){
					console.log(index)
					let array = JSON.parse(localStorage.getItem('products'))
					array.splice(index, 1)
					localStorage.setItem('products', JSON.stringify(array))
					productsPage.render()
					headerPage.render()
				}

			})

		})
	}	
}

close()

