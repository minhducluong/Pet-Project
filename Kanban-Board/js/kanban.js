$(function() {
// Drag function

	$( "#sortable1, #sortable2, #sortable3" ).sortable({
		connectWith: ".connectedSortable",
		placeholder: "ui-state-highlight"
	}).disableSelection();


// Delete function

	$('.fa-trash-alt').on('click', function(event) {
		$(this).parent().hide(400);
	});


// "Add new" function

    // Click to add new card
    $('.add').on('click', function() {
    	$(this).hide();
    	$(this).siblings('.new-input').show();

    	// Gain focus
    	$('textarea').focus();
    });

    // Click to dismiss
    $('.fa-times').on('click', function() {
    	// clear textarea
    	$(this).parent().siblings('textarea').val('');
    	$('.add').show();
    	$('.new-input').hide();
    });

    // When click "Add Card"
    $('.add-card').on('click', function() {addCard($(this))});

    function addCard(thisObj) {
    	// Get the input
    	let input = thisObj.parent().siblings('textarea').val().trim();

    	// Add to DOM a new li
    	if (input != '') thisObj.parents('.new-input').siblings('ul').append(`
    		<li class="ui-state-default ui-sortable-handle">
    		<span>${input}</span>
    		<i class="fas fa-trash-alt"></i>
    		<i class="fas fa-edit"></i>
    		</li>
    		`);

    	// Reset textarea + Gain focus
    	$('textarea').val('').focus();

    	// Bind event to new trash icon
    	$('.fa-trash-alt').on('click', function(event) {
				$(this).parent().hide(400);
			});
			// Bind event to new edit icon
			$('.fa-edit').on('click', edit);
		}

    // Bind "Enter" event
    $('textarea').on('keypress', function(event) {
    	if (event.key == 'Enter') {
    		event.preventDefault();
    		addCard($(this).next().find('.add-card'));
			}
		});


// Edit function
	
	$('.fa-edit').on('click', edit);

	function edit() {
		// Always highlight the input if click edit icon
		$(this).siblings('input').select();

		// Edit only if there is no input at the beginning
		if ($(this).siblings('input').length == 0) {
			// Get current content
			let content = $(this).siblings('span').text();

			// Delete old text
			$(this).siblings('span').text('');

			// Add <input> to edit
			$(this).parent().append(`<input id="he" type="text" value="${content}"></input>`);

			// Gain focus
			$(this).siblings('input').select();

			// When press Enter, 
			$(this).siblings('input').on('keyup', function(event) {

				if (event.key == 'Enter') {
					// Get new content
					let newContent = $(this).val().trim();

					if (newContent != '') {
						//Restore the <span> with newContent
						$(this).siblings('span').text(newContent);

						// Remove <input>
						$(this).remove();
					}

					if (newContent == '') $(this).val('');
				}
			});	

			// Dismiss when blur the input
			$(this).siblings('input').on('blur', function() {
				$(this).siblings('span').text(content);
				$(this).remove();
			});
		}
	};

// Dismiss when blur input
	$(document).mouseup(function(e) {
		let container = $(".new-input");
	    // if the target of the click isn't the container nor a descendant of the container
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	$('.new-input').hide();
	    	$('.add').show();
	    }
	});
});