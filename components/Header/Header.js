class Header{

	render() {

		const productsStore = localStorageUtil.getProducts()
		let htmlCatalog = ``

		let sum = 0

		productsStore.forEach(({id, counter, title, image, descr, price, available,}) => {


			CATALOG.forEach( e => {
				if(id == e.id){
					title = e.title
					image = e.image
					descr = e.descr
					price = e.price
					let sumItem = price * counter
					sum +=sumItem
				}
			})

			htmlCatalog += `
			<li data-id="${id}" class="header-element">
			<img class="header-element__image" src="${image}" alt="alt" />
			<span class="header-element__name">${title}</span>
			<span class="header-element__quantity">${counter}</span>
			<span class="header-element__close">&#10006;</span>
			</li>
			`



		})


		const html = `
		<div class="header-container">
		<div class="header-items">
		<ul class="header-list">
		${htmlCatalog}
		</ul>
		</div>
		<div class="header-sum">
		<span>Итог</span>
		<div class="header-howmach">${sum.toLocaleString()}</div>
		<div class="header-button">Заказать</div>
		</div>
		</div>
		`


		ROOT_HEADER.innerHTML = html
	}
	close(){
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
	}

	const headerPage = new Header()


	headerPage.close()
	headerPage.render()

