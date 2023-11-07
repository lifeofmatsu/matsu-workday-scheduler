// starter code provided by Xandromus and team with the UCSD Coding Bootcamp.

$(() => {
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

    //variable for date handling
    var currentDate = dayjs();
    var timeBlockEl = $('.time-block');
    var monthYearEl = $('#monthYear');
    var monthDayEl = $('#monthDay');
    
    //variable for data storage
    var saveBtnEl = $('.saveBtn');

    //variables for toggling color theme
    var isLight = true;
    var lightThemeEl = $('.light');
    var themeToggleEl = $('#theme-toggle');

    //main function is called below
    const main = () => {
        setDate();
        renderTimeslot();
        getEntry();
    }

    //categorize time slots on calendar day into 'past', 'present', and 'future' classes
    const renderTimeslot = () => {
        var present = dayjs();

        timeBlockEl.each(function() {
            var temp = $(this).attr('id').replace('hour-', ''); //eg, 'hour-15' becomes '15'
            var timeSlot = parseInt(temp, 10); //eg., parses string '15' into int '15'; expects base 10

            if (timeSlot < present.hour()) {  
                $(this).addClass('past');
            } else if (timeSlot > present.hour()) {
                $(this).addClass('future');
            } else {
                $(this).addClass('present');
            }

            // if (currentDate.isBefore(present, 'day')) {
            //     $(this).addClass('past');
            // } else if (currentDate.isAfter(present, 'day')) {
            //     $(this).addClass('future');
            // } else { //if 'currentDate' and 'present' are the same day,
            //     //check whether the currently itterated time block is before, after, or the current hour itself.
            //     if (timeSlot < present.hour()) {  
            //         $(this).addClass('past');
            //     } else if (timeSlot > present.hour()) {
            //         $(this).addClass('future');
            //     } else {
            //         $(this).addClass('present');
            //     }
            // }
        });
    }

    //setter function to store user entry from given time-block save
    const setEntry = (hour, entry) => {
        var tempDate = currentDate.format('YYYY-MM-DD');
        localStorage.setItem(tempDate + '-' + hour, entry);
    }

    //getter function to retrieve user entry from given time-block save
    const getEntry = () => {
        timeBlockEl.each(function() {
            var tempDate = currentDate.format('YYYY-MM-DD');
            var timeSlot = $(this).attr('id');
            var tempEntry = localStorage.getItem(tempDate + '-' + timeSlot);

            if (tempEntry !== null) {
                $(this).find('.description').val(tempEntry);
            } 
        });
    }

    //setter function to assign current date to header display
    const setDate = () => {
        var monthYear = currentDate.format('MMMM YYYY');
        var monthDay = currentDate.format('dddd - MMM D');

        monthYearEl.text(monthYear);
        monthDayEl.text(monthDay.toLowerCase());
    }

    //event listener stores calendar event on user action
    saveBtnEl.on('click', function() {
        var nearestHour = $(this).closest(timeBlockEl).attr('id');
        var userEntry = $(this).siblings('.description').val();

        setEntry(nearestHour, userEntry);
        alert('Calendar entry has successfully saved');
    });

    //event listener toggles color theme given the current state
    themeToggleEl.on('click', function() {
        if (isLight) {
            lightThemeEl.attr('class', 'dark');
            isLight = !isLight;
        } else {
            lightThemeEl.attr('class', 'light');
            isLight = !isLight;
        }
    });


    main();
});