const reservationForm = document.querySelector('#reservation-form');

const reservationList = document.querySelector('#reservation-list');

reservationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário enviado');
});

const teacherName = document.querySelector('#teacher-name').value;

const reservationDate = document.querySelector('#reservation-name').value;

const startTime = document.querySelector('#starttime').value;

const projectorModel = document.querySelector('#projectormodel').value;


if (
    teacherName === '' ||
    reservationDate === '' ||
    startTime === ''
) {
    alert('Preencha todos os campos!');
    return;
}

const currentDate = new Date().toISOString().split('T')[0];
if (reservationDate < currentDate) {
    alert('Não é permitido agendar datas passadas!');
    return;
}

const reservationDatabase = [];
const newReservation = {
    teacherName,
    reservationDate,
    startTime,
    projectorModel,
    contactInfo
}; 
     
const isReserved = reservationDatabase.some(function(reservation) {
    return (
        reservation.projectorModel === projectorModel &&
        reservation.reservationDate === reservationDate &&
        reservation.startTime === startTime
    );
});

reservationDatabase.push(newReservation);

const tableRow = document.createElement('tr');
tableRow.innerHTML = `
    <td>${teacherName}</td>
    <td>${reservationDate}</td>
    <td>${startTime}</td>
    <td>${projectorModel}</td>
    <td>${contactInfo}</td>
`;

reservationList.appendChild(tableRow);

reservationForm.reset();

localStorage.setItem(
    'reservations',
    JSON.stringify(reservationDatabase)
);

const savedReservations =
    JSON.parse(localStorage.getItem('reservations')) || [];

