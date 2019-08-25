$(function() {
	let data = [
	{
		question: "1. Hà Nội có bao nhiêu con voi?",
		optionA: "0",
		optionB: "1",
		optionC: "2",
		optionD: "3",
		key: "3"
	},
	{
		question: "2. Voi Hà Nội sống ở đâu (nếu có)?",
		optionA: "Ba Vì",
		optionB: "HN không có voi",
		optionC: "Vườn Bách Thảo",
		optionD: "Thủ Lệ",
		key: "Thủ Lệ"
	},
	{
		question: "3. So sánh về chức năng, vòi của voi tương ứng với bộ phận nào của con người?",
		optionA: "Miệng",
		optionB: "Tay",
		optionC: "Mũi",
		optionD: "Mũi + tay + môi trên",
		key: "Mũi + tay + môi trên"
	},
	{
		question: "4. Voi con biết đi sau bao lâu kể từ khi chào đời?",
		optionA: "vài phút",
		optionB: "vài giờ",
		optionC: "vài ngày",
		optionD: "vài tuần",
		key: "vài phút"
	},
	{
		question: "5. Việt Nam tính đến giữa năm 2019 đang có tất cả bao nhiêu con voi?",
		optionA: "Khoảng 100",
		optionB: "Khoảng 200",
		optionC: "Khoảng 500",
		optionD: "Khoảng 50",
		key: "Khoảng 100"
	},
	];

	$(".question").text(data[0].question);
	$(".optionA").text(data[0].optionA);
	$(".optionB").text(data[0].optionB);
	$(".optionC").text(data[0].optionC);
	$(".optionD").text(data[0].optionD);
	

	//Chuyển câu prev, next
	let i = 0;
	$(document).on('keyup', function(event) {
		if (event.key == 'ArrowDown' || event.key == 'ArrowRight') next();
	});
	$('.fa-chevron-down').on('click', next);

	$(document).on('keyup', function(event) {
		if (event.key == 'ArrowUp' || event.key == 'ArrowLeft') prev();
	});	
	$('.fa-chevron-up').on('click', prev);

	function next() {
		i++;
		//nếu đến câu cuối rồi thì lộn ngược về câu đầu
		if (i > data.length - 1) i = 0;
		$(".question").text(data[i].question);
		$(".optionA").text(data[i].optionA);
		$(".optionB").text(data[i].optionB);
		$(".optionC").text(data[i].optionC);
		$(".optionD").text(data[i].optionD);

		$(".option").removeClass('chosen');
		//chỉ bôi chosen lên những đáp án đã chọn
		$(".option").each(function(item) {
			if ($(this).text() ==  data[i].answer) $(this).addClass('chosen');
		});
	}

	function prev() {
		i--;
		//nếu về câu đầu rồi thì đảo tiếp xuống câu cuối
		if (i < 0) i = data.length - 1;

		$(".question").text(data[i].question);
		$(".optionA").text(data[i].optionA);
		$(".optionB").text(data[i].optionB);
		$(".optionC").text(data[i].optionC);
		$(".optionD").text(data[i].optionD);

		$(".option").removeClass('chosen');

		$(".option").each(function(item) {
			if ($(this).text() ==  data[i].answer) $(this).addClass('chosen');
		});
	}

	//Click chọn đáp án
	$(".option_wrap").on('click', ':not(".option_wrap")', function(event) {
		$(".option").removeClass('chosen');
		$(event.target).addClass('chosen');
		// Lưu đáp án vào array data, trong object tương ứng với câu hỏi
		data[i].answer = $(event.target).text();
		// console.log(data[i].answer);
	});

	//Check đáp án
	$(".finish").on('click', function() {
		let correct = 0;
		let txt = "";
		let allAnswered;

		for (let i = 0; i < data.length; i++) {

			if (data[i].answer == data[i].key) correct++;
			else txt += `Câu ${i+1} chưa đúng.\n`;

			//Test xem đã trả lời hết chưa
			if (data[i].answer === undefined) allAnswered = false; 
		}

		//Nếu chưa trả lời hết
		if (allAnswered === false) {
			let cf = confirm("Bạn chưa trả lời hết tất cả các câu.\nBạn có chắc muốn tính điểm?");

			if (cf == true) {
				alert(`Bạn trả lời đúng: ${correct}/${data.length} câu.\n${txt}`);
			} else return;
		//Nếu trả lời hết rồi
		} else {
			alert(`Bạn trả lời đúng: ${correct}/${data.length} câu.\n${txt}`);

			if (correct == data.length) window.location.href = "quiz-congrat.html";
		}
	});
});