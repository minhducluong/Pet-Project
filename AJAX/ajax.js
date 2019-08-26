$(function() {
	//Click vào "Movies" để lấy data
	$('h1').on('click', function() {
		$(this).addClass('hide');

		$.ajax({
			url: 'https://my-json-server.typicode.com/minhducluong/minhducluong.github.io/db',
			type: 'GET',
			dataType: 'json',
			beforeSend: function() {
				$('#no_result').text('Loading...');
			},
			complete: function() { //giống kiểu .always()
				$('#no_result').text('Done!').fadeOut(2000);
			},
			error: function() { //giống kiểu .fail()
				$('#no_result').text('Failed');
			},
			success: function(data) { //giống kiểu .done()
				let films = data.films;
				let results = [];
				let compare = {
					name: function(a,b) {
						if (a < b) return -1;
						else if (a > b) return 1;
						else return 0;
					},
					duration: function(a,b) {
						a = a.replace(":", "");
						b = b.replace(":", "");
						return a - b;
					},
					date: function(a,b) {
						a = new Date(a);
						b = new Date(b);
						return a - b;
					}
				}

				function renderContent(array) {
					// xoá hết cái ban đầu đi render lại
					$('tbody').empty();
					//lặp object films để đổ dữ liệu
					array.forEach( function(element) {
						$('tbody').append(`
							<tr>
								<td>${element.genre}</td>
								<td>${element.title}</td>
								<td>${element.duration}</td>
								<td>${element.date}</td>
							</tr>
						`);
					});
				}
				renderContent(films);



				//Sort - Sort cái table đang được show ngoài HTML
				$('th').on('click', function() {
					let column = $('th').index(this);
					let order = $(this).data('sort');
					let rows = $('tbody tr').toArray(); //lấy các <tr> hiện tại lưu vào 1 mảng

					if ($(this).is('.ascending') || $(this).is('.descending')) {
						$(this).toggleClass('ascending descending');
						$('tbody').append(rows.reverse());
					} else {
						$(this).siblings().attr('class', 'normal'); //Khi sort sang <th> khác thì các <th> còn lại về normal
						$(this).attr('class', 'ascending');

						rows.sort(function(a, b) {
							a = $(a).find('td').eq(column).text();
							b = $(b).find('td').eq(column).text();
							return compare[order](a,b);
						});
						//không cần $('tbody').empty()
						$('tbody').append(rows);
					}
				});


				//Search
				$('[type="search"]').on('input', function() { 
					if ($(this).val() == '') {//Luôn show hết data lên bảng khi input rỗng
						renderContent(films);
						$('#no_result').text('');
						$('th').attr('class', 'normal');
					}

					results = [];
					$('th').attr('class', 'normal');

					let input = $('[type="search"]').val().trim().toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');;
					let re = new RegExp(input, 'g'); // make RegExp to search in global (để search những thứ lặp lại nhiều lần)

					if (input == '') renderContent(films);
					else {
						films.forEach( function(film, index) {
							for (let key in film) {
								//Nếu data có chứa input
								if (film[key].toString().toLowerCase().indexOf(input) != -1) {
									results.push(film);
									break; //Với mỗi film, value của key nào chứa input thì push film đó vào array results, sau đó BREAK luôn để thoát khỏi film hiện tại, tiếp tục với film tiếp theo
								}
							}
						});
						
						// Thông báo No results
						if (!results[0]) $('#no_result').text(`No results`);
						else $('#no_result').text(``);

						renderContent(results);
						
						//Highlight search results
						$('td').each(function(index, el) {
							$(this).html($(this).html().toLowerCase().replace(re, `<mark>$&</mark>`));
						});
					}
					// console.log(results);
				});
			}
		});
	});	
});