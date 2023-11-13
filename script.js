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
        const editIndex = form.dataset.editIndex;

        if (editIndex !== undefined) {
            // If editing, replace the existing entry
            bookings[editIndex] = booking;
            form.removeAttribute('data-edit-index'); // Reset the edit state
        } else {
            // If not editing, add a new entry
            bookings.push(booking);
        }

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
                    <button class="edit-button" data-index="${index}">Edit</button>
                    <button class="delete-button" data-index="${index}">Delete</button>
                </div>
            `;
        }).join('');

        // Append new content
        displayArea.insertAdjacentHTML('beforeend', bookingsHtml);

        // Add event listeners to edit and delete buttons
        const editButtons = document.querySelectorAll('.edit-button');
        const deleteButtons = document.querySelectorAll('.delete-button');

        editButtons.forEach(button => {
            button.addEventListener('click', handleEdit);
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', handleDelete);
        });
    }

    function handleEdit(event) {
        const index = event.target.dataset.index;
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const bookingToEdit = bookings[index];

        // Populate the form with the existing data
        document.getElementById('name').value = bookingToEdit.name;
        document.getElementById('email').value = bookingToEdit.email;
        document.getElementById('phone').value = bookingToEdit.phone;
        document.getElementById('time-for-call').value = bookingToEdit.timeForCall;

        // Set the edit state on the form
        form.dataset.editIndex = index;
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
