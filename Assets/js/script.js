// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function() {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the 'hour-x' id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.

    //variable for date tracking
    var currentDate = dayjs().format('MM-DD-YYYY');
    // var userSelection = dayjs();
    
    //variable for data saving
    var saveBtnEl = $('.saveBtn');


    //variables for toggling color theme
    var isLight = true;
    var lightThemeEl = $('.light');
    var themeToggleEl = $('#theme-toggle');

    function init() {
        setDate();
        updateTimeslot();
        getEntry();
    }

    function updateTimeslot() {
        var present = dayjs();

        $('.time-block').each(function() {
            var timeBlock = parseInt($(this).attr('id').val(), 10);

            if (timeBlock < present.hour()) {
                $(this).addClass('past');
            } else if (timeBlock === present.hour()) {
                $(this).addClass('present');
            } else {
                $(this).addClass('future');
            }
        });
    }

    //setter function to assign current date to header display
    function setDate() {
        var monthYear = dayjs();
        var monthDay = dayjs();

        $('#monthYear').text((monthYear).format('MMMM YYYY'));
        $('#monthDay').text((monthDay).format('dddd - MMM D'));
        // $('#monthDay').text((monthDay).format('dddd, ' + 'MMM'.toUpperCase() + ' D'));
    }

    //getter function to retrieve user entry from given time-block save
    function getEntry() {
        $('.time-block').each(function() {
            var tempHour = $(this).attr('id');
            var tempEntry = localStorage.getItem(currentDate + ':' + tempHour);

            if (tempEntry !== null) {
                $(this).find('.description').val(tempEntry);
            } else {
                $(this).find('.description').val('');

            }
        });
    }

    //setter function to store user entry from given time-block save
    function setEntry(hour, entry) {
        localStorage.setItem(currentDate + ':' + hour, entry);
    }

    //event listener stores calendar event on user action
    saveBtnEl.on('click', function() {
        var nearestHour = $(this).closest('.time-block').attr('id');
        var userEntry = $(this).siblings('.description').val();
        setEntry(nearestHour, userEntry);
        alert('Calendar entry has successfully saved');
    });

    //event listener toggles color theme given the current state
    themeToggleEl.on('click', function() {
        if (isLight) {
            lightThemeEl.attr('class', 'dark');
            isLight = !isLight;
            console.log(isLight);
        } else {
            lightThemeEl.attr('class', 'light');
            isLight = !isLight;
            console.log(isLight);
        }
    });

    
    init();
});