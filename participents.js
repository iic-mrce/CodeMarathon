$(document).ready(function() {
    $('#participantsTable').hide();
    $.getJSON('./assets/participants.json', function (participantsData) {
        let participantRows = [];
        participantsData.forEach(participant => {
            participantRows.push({
                name: capitalizeWords(participant.Name),
                htno: participant.htno,
                college: participant.college,
                year: participant.year,
                branch: participant.branch,
                totalScore: participant.totalScore // Ensure this field exists if sorting by it
            });
        });
        participantRows.sort((a, b) => b.totalScore - a.totalScore);
        
        let serialNo = 1; // Initialize serial number
        
        participantRows.forEach(participant => {
            const row = `
            <tr>
                <td>${serialNo++}</td> <!-- Serial Number -->
                <td>${participant.htno}</td>
                <td>${participant.name}</td>
                <td>${participant.college}</td>
                <td>${participant.year}</td>
                <td>${participant.branch}</td>
            </tr>
        `;
            $('#participantsTable tbody').append(row);
        });
        
        $('#participantsTable').fadeIn();
    }).fail(function() {
        console.error('Error loading JSON files.');
    });
});

function capitalizeWords(str) {
    return str.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}
