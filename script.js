document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.booking-form form');
    const displayArea = document.getElementById('display-area');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting in the traditional way
  
      // Get the values from the input fields
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const timeForCall = document.getElementById('time-for-call').value;
  
      // Create a booking object
      const booking = { name, email, phone, timeForCall };
  
      // Retrieve the existing bookings from local storage
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  
      // Add the new booking to the array
      bookings.push(booking);
  
      // Save the updated array back to local storage
      localStorage.setItem('bookings', JSON.stringify(bookings));
  
      // Display the updated bookings list
      displayBookings();
  
      // Optionally, clear the form
      form.reset();
    });
  
    // Function to display all bookings from local storage
    function displayBookings() {
      // Retrieve the bookings from local storage
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  
      // Build HTML to display each booking
      const bookingsHtml = bookings.map((booking, index) => {
        return `
          <div class="booking-entry">
            <p><strong>Booking #${index + 1}</strong></p>
            <p>Name: ${booking.name}</p>
            <p>Email: ${booking.email}</p>
            <p>Phone: ${booking.phone}</p>
            <p>Time for Call: ${booking.timeForCall}</p>
          </div>
        `;
      }).join('');
  
      // Update the display area with the bookings HTML
      displayArea.innerHTML = bookingsHtml;
    }
  
    // Call this function on page load to display the bookings if they exist in local storage
    displayBookings();
  });