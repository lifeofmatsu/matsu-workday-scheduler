// starter code provided by Xandromus and team with the UCSD Coding Bootcamp.

$(() => {
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
        timeBlockEl.each(function() {
            var present = dayjs().hour();
            var temp = $(this).attr('id').replace('hour-', ''); //eg, 'hour-15' becomes '15'
            var timeSlot = parseInt(temp, 10); //eg., parses string '15' into int '15'; expects base 10

            //add time classes to time-block divs
            if (timeSlot < present) {  
                $(this).addClass('past');
            } else if (timeSlot > present) {
                $(this).addClass('future');
            } else {
                $(this).addClass('present');
            }
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
    saveBtnEl.on('click', (e) => {
        var nearestHour = $(e.currentTarget).closest(timeBlockEl).attr('id');
        var userEntry = $(e.currentTarget).siblings('.description').val();

        setEntry(nearestHour, userEntry);
        alert('Calendar entry has successfully saved');
    });

    //event listener toggles color theme given the current state
    themeToggleEl.on('click', () => {
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