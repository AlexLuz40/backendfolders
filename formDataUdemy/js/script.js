/* eslint-disable no-undef */
window.addEventListener('DOMContentLoaded', () => {
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');
  
	function hideTabsContent() {
		tabsContent.forEach(item => {
			// item.style.display = 'none'; //  эта функция будет скрывать табы(вкладки) из  зоны видимости при помощи стилей
			item.classList.add('hide');//  при помощи класса
			item.classList.remove('show', 'fade'); //  при помощи класса 
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active'); // 
		});
	}

	// function showTabsContent(i) {  // это  первый способ ни много устарел но актуален(т.е. простой способ без параметра по умолчанию)
	//   tabsContent[i].style.display = 'block';
	//   tabs[i].classList.add('tabheader__item_active');
	// }

	// hideTabsContent();
	// showTabsContent(0);

	function showTabsContent(i = 0) { // новая возможности давать значение по умолчанию(т.е. если мы в вызове функции не укажем параметр то по умолчанию будет равен 0 (i = 0))
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');

		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabsContent();
	showTabsContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target; // чтобы часто не писать эту конструкцию

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) { // target - элемент на который кликнул пользователь, и если этот эелемент совпал с item  нашего перебераемого спискаб то вызываются 2 функци
					hideTabsContent();
					showTabsContent(i);
				}
			});
		}
	});

	//  создание обратного счетчика

	const deadLine = '2023-08-01';
  
	function getTimeRemaining(endTime){
		let days, hours, minutes, seconds;
		const dayOff = Date.parse(endTime) - Date.parse(new Date());

		if (dayOff < 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(dayOff / (1000 * 60 * 60 * 24)) ,
			hours = Math.floor((dayOff / (1000 * 60 * 60) % 24)),
			minutes =  Math.floor((dayOff / 1000 / 60) % 60),
			seconds =  Math.floor((dayOff / 1000) % 60);
		}

    
		return {
			'total': dayOff,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	function setClock(selector, endTime) {
		const timer = document.querySelector(selector);
		// eslint-disable-next-line no-undef
		days = timer.querySelector('#days'),
		// eslint-disable-next-line no-undef
		hours = timer.querySelector('#hours'),
		// eslint-disable-next-line no-undef
		minutes = timer.querySelector('#minutes'),
		// eslint-disable-next-line no-undef
		seconds = timer.querySelector('#seconds'),
		// eslint-disable-next-line no-undef
		timeInterval = setInterval(updateClock, 1000);
    
		updateClock();
		function updateClock() {
			const dayOff = getTimeRemaining(endTime);

			days.innerHTML = getZero(dayOff.days);
			hours.innerHTML = getZero(dayOff.hours);
			minutes.innerHTML = getZero(dayOff.minutes);
			seconds.innerHTML = getZero(dayOff.seconds);

			if (dayOff.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadLine);

	// Modal(модальное окно)

	const modalTrigger = document.querySelectorAll('[data-modal]'),// элементы(кнопки в нашем примере) с дата атрибутом, создаем псевдомассив
		modal = document.querySelector('.modal'),
		modalCloseBtn = document.querySelector('[data-close]');
	// функция которая вызывает модальное окно
	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';//это свойство запрещает прокручивать страницу
		clearInterval(modalTimerId);
	}
	//а это событие которое вызывает модальное окно
	modalTrigger.forEach(elem => {
		elem.addEventListener('click', openModal);// навешиваем событие на каждую кнопку
	});
	// функция которая закрывает модальное окно
	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}
	modalCloseBtn.addEventListener('click', closeModal);
	// при нажатии на область вне модального окна , оно(модальное окно) будет закрыто
	modal.addEventListener('click', (event) => {
		if (event.target === modal) { //????
			closeModal();
		}
	});
	//  при нажатии кнопки escape  мы закроем модальное окно при условии(что будет нажата кнопка escape и модальное окно имеет класс show(т.е. будет вызвано модальное окно))
	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) { //????
			closeModal();
		}
	});

	const modalTimerId = setInterval(openModal, 15000); // включаем сет интервал, который будет вызывать модальное окно через 5сек(в нашем примере), но т.к. мы указываем выше clearInterval  при вызове модального окна, то оно сработает 1 раз (либо через 5 секунд если клиент сам не вызовет это модальное окно)
	// при прокрутки страницы вниз до самого конца будет вызвана модальное окно
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}  
	window.addEventListener('scroll', showModalByScroll);

	// Используем классы для карточек  урок 79 и добавляем урок 80(который будет добавлять классы в виде rest оператора)

	class MenuCard {
		constructor(src, alt, title, descr,price, parentSelector, ...classes) {  // ...classes - rest оператор (80 урок)
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;  //  цена в долларах например
			this.classes = classes; // урок 80  тут мы добавляем класс
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;  //  1$ =  27 укр.гривень
			this.changeToUAH(); // используем метод сразу
		}

		changeToUAH() {
			return this.price = this.transfer * this.price; // полчучаем цену в гривнах, которая потом перезаписывается уже в this.price = price; 
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length == 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				// this.classes.forEach((className) => {  // это длинная запись
				//   element.classList.add(className);
				// });
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
      `;
			this.parent.append(element);
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg', //  src
		'vegy',              //  alt
		'Меню "Фитнес"',     //  title
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', //  descr
		9,                   //  price 
		'.menu .container',  //  parentSelector
		'menu__item',        //  ...classes (rest оператор)
		'newClass'           //  ...classes (rest оператор)
	).render(); // это сокращенная форма, можно было так  const div = new MenuCard(); div.render();

	new MenuCard(
		'img/tabs/elite.jpg',  //  src
		'elite',               //  alt
		'Меню “Премиум”',      //  title
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',  //  descr
		14,                    //  price
		'.menu .container',    //  parentSelector
		//тут я удалил класс для того чтобы увидеть как сработало наше условие если класс не был добавлен(условие строка 280 - 288)          //  ...classes (rest оператор)
	).render();

	new MenuCard(
		'img/tabs/post.jpg',   //  src
		'post',                //  alt
		'Меню "Постное"',      //  title
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',  //  descr
		21,                    //  price
		'.menu .container',    //  parentSelector
		'menu__item'           //  ...classes (rest оператор)
	).render();


	// Forms

	const forms = document.querySelectorAll('form');

	const message = { //  сoздаем себе список ответов сервера клиенту для того чтобы ему было понятно что происходит
		loading: 'img/form/spinner.svg', // перевод 'загрузка'
		success: 'Thank you! We will contact you soon', // успех: Спасибо мы с вами свяжимся в ближайшее время
		failure: 'Something went wrong...' // сбой: что то пошло ни так...
	};
	forms.forEach(item => { // т.к. у нас в проекте форм много(больше одной), то мы должны подвезять нашу ф-цию postData() для каждой из них
		postData(item);
	});
	function postData(form) {   // form - данные от пользователя(если я правильно понял)
		form.addEventListener('submit', (e) => {  // событие submit будет срабатывать тогда, когда мы будем пытаться отрправить форму
			e.preventDefault();   //  отменяем стандартное пведение браузера(т.е. он не будет перегружаться)

			const statusMessage = document.createElement('img');//  создаем блок который будет появляться динамически(т.е. будет окно например с сообщением или картинка да что угодно)
			statusMessage.src = message.loading; // добавляем нашу картинку пока сервер грузится
			statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
			form.insertAdjacentElement('afterend', statusMessage); // а с помощью этой команды мы спинер(картинку) или текст добавляем к нашей форме(форма с данными)
      
			const formData = new FormData(form); //  FormData(form)- это специальный объект, который позволяет нам с определенной формы быстро сформировать все данные которые заполнил пользователь     обязательно в HTML  верстке ДОЛЖЕН БЫТЬ атрибут name

			fetch('server.php', {
				method: 'POST',
				body: formData
			}).then(data => data.text()) // чтобы понять какой ответ приходит от сервера нам нужно этот ответ модифицировать (т.к. это ни JSON, то мы используем - data => data.text()- превращаем ответ сервера в текст)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);         
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();// очищает форму(от введенных данных)
				});
		}); 
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal(); //??

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
    <div class="modal__content">
      <div class="modal__close" data-close>×</div>
      <div class="modal__title">${message}</div>
    </div>
    `;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove(); //  через 2000мсек будем удалять thanksModal
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 2000);
	}
});







