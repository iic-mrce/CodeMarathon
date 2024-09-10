$(document).ready(function() {
    $('#participantsTable').hide();
        $.getJSON('./assets/participants.json', function (participantsData) {
        let participantRows = [];
        participantsData.forEach(participant => {
            participantRows.push({
                name: capitalizeWords(participant.name),
                htno: participant.htno,
                college: participant.college,
                year: participant.year,
                branch: participant.branch
            });
        });
        participantRows.sort((a, b) => b.totalScore - a.totalScore);
        participantRows.forEach(participant => {
            const row = `
            <tr>
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
