const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');

const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

//save selected movie index and price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice)
}

// update total and count

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

//Get data from localstorage to populateUI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// movie select event
movieSelect.addEventListener('change', el => {
    ticketPrice = +el.target.value;
    setMovieData(el.target.selectedIndex, el.target.value);
    updateSelectedCount(); 
})



//seat click event
container.addEventListener('click', el => {
  if (el.target.classList.contains('seat') &&
  !el.target.classList.contains('occupied')
  ) {
     el.target.classList.toggle('selected')   
     updateSelectedCount();
  }
});

updateSelectedCount();








