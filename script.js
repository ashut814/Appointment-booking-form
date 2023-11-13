document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const displayArea = document.getElementById('display-area');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const timeForCall = document.getElementById('time-for-call').value;

        const booking = { name, email, phone, timeForCall };

        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        // Clear existing content and display bookings
        displayBookings();
        form.reset();
    });

    function displayBookings() {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

        // Clear existing content before displaying bookings
        displayArea.innerHTML = '';

        const bookingsHtml = bookings.map((booking, index) => {
            return `
                <div class="booking-entry">
                    <p><strong>Booking #${index + 1}</strong></p>
                    <p>Name: ${booking.name}</p>
                    <p>Email: ${booking.email}</p>
                    <p>Phone: ${booking.phone}</p>
                    <p>Time for Call: ${booking.timeForCall}</p>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </div>
            `;
        }).join('');

        // Append new content
        displayArea.insertAdjacentHTML('beforeend', bookingsHtml);

        // Add event listeners to delete buttons
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    }

    function handleDelete(event) {
        const index = event.target.dataset.index;

        // Remove the booking from local storage
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        // Re-display bookings
        displayBookings();
    }

    // Call this function on page load to display existing bookings
    displayBookings();
});
