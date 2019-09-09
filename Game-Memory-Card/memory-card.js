$(function() {
	setTimeout(function() {
		$('#begin').get(0).play();
	}, 500);
	
	let pokemons = [
		{photo: "https://pokemonletsgo.pokemon.com/assets/img/common/char-pikachu.png", name: "pikachu"},
		{photo: "photos/navann.jpg", name: "Navann"},
		{photo: "photos/panda.jpg", name: "panda"},
		{photo: "photos/dog.jpeg", name: "dog"},
		{photo: "photos/cat.jpg", name: "cat"},
		{photo: "photos/rabbit.jpg", name: "rabbit"}
	];

	//Double array
	pokemons.forEach( function(element, index) {
		pokemons.push(element);
	});

	//Shuffle array (code tham khảo trên stackoverflow)
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

		  // Pick a remaining element...
		  randomIndex = Math.floor(Math.random() * currentIndex);
		  currentIndex -= 1;
		  // And swap it with the current element.
		  temporaryValue = array[currentIndex];
		  array[currentIndex] = array[randomIndex];
		  array[randomIndex] = temporaryValue;
		}

  		return array;
	}

	// Shuffle cards 
	pokemons = shuffle(pokemons);

	// Render content
	pokemons.forEach( function(element, index) {
		$('.container').append(`
			<div class="scene scene--card c${index}">
				<div class="card">
					<div class="card__face card__face--front">
						<img src="https://vignette.wikia.nocookie.net/yugioh/images/e/e5/Back-EN.png/revision/latest?cb=20100726082133" class="card-img">
					</div>
					<div class="card__face card__face--back">
						<img src="${element.photo}" alt="${element.name}">
					</div>
				</div>
			</div>
		`);
		
	});

	// Click button Start
	$('.start').on('click', function(event) {
		//Play sound "Go"
		$('#go').get(0).play();

		// Fadeout button Start
		$(this).fadeOut('fast');

		// Time-bar starts to run
		$('.progress').css('animation', 'run 30s linear');

		// Thời gian là 30s
		let time = 30;
		let countdown = setInterval(fnc, 1000);
		function fnc() {
			// Nếu hết thời gian và chưa hoàn thành
			if (time == 1 && points != pokemons.length / 2) {
				// Khoá lật card, làm mờ
				$('.win').css({'z-index': '0', 'background-color': '#00000069'});
				$('.card').attr('class', 'card is-flipped');


				// Hiện thông báo
				$('.win h1').text('Hết thời gian! Game over.').show().css({
					'animation': 'fadeInUp 0.5s',
					'background-color': '#e4e4e4'
				});

				// Play sound
				$('#lose').get(0).play();

				// Ngừng tính giờ
				clearInterval(countdown);
			}
			time--;
			// console.log(time);
		}



		// Click vào card

		// $elems để lưu data khi card được lật
		let $elems = $();
		let points = 0;
		$('.card').on('click', function() {
			// Nếu đang ngửa sẵn rồi thì không lưu
			if ($(this).is('.is-flipped')) $elems = $();
			// Otherwise, thêm vào $elems
			else $elems = $elems.add($(this));
			
			// Flip card if clicked
			$(this).toggleClass('is-flipped');
			
			// Khi $elems đủ 2 phần tử, bắt đầu xét
			if ($elems.length == 2) {
				// Trong thời gian xét, khoá lật tất cả các card
				$('.card').css('pointer-events', 'none');
				
				// Lấy alt mỗi card 
				let alt1 = $elems[0].querySelector('.card__face--back img').alt;
				let alt2 = $elems[1].querySelector('.card__face--back img').alt;

				// Cộng điểm luôn nếu giống nhau
				if (alt1 == alt2) points++;

				// Sau 0.6s, mới chạy effect/sound
				setTimeout(function() {
					// Nếu giống nhau,
					if (alt1 == alt2) {
						//Play sound
						$('#correct').get(0).play();

						// Hide 2 card đó
						$elems.hide();
					} 
					// Otherwise, úp 2 card đó lại
					else $elems.removeClass('is-flipped');

					// Reset lại $elems về ban đầu
					$elems = $();

					// Mở lật card lại cho tất cả
					$('.card').css('pointer-events', 'auto');

					// Nếu đạt điểm tối đa,
					if (points == pokemons.length / 2) {
						// Hiện thông báo
						$('.win h1').show().css('animation', 'fadeInUp 0.5s');

						// Play sound "win"
						$('#win').get(0).play();

						// Ngừng tính giờ
						clearInterval(countdown);

						// Ngừng chạy time-bar
						$('.progress').css('animation-play-state', 'paused');
					}
				}, 600);
			}
		});
	});
});