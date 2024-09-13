$(document).ready(function() {
    $('#participantsTable').hide();
    // Load the participants.json, usernames.json, and user_stats.json
              $.when(
        $.getJSON('./assets/leaderboard.json'),
        $.getJSON('./assets/leaderboard.json'),
    ).done(function(participantsData) {
        const participants = participantsData[0]; // Participants JSON array


        // Array to hold participants along with their scores
        let participantRows = [];
        let serialNo = 1;
        console.log(participantRows);
        // Iterate through each participant and calculate the total score
        participants.forEach(participant => {
            // const r1 = (participant.easy || 0)*2+(participant.easy || 0)*3+(participant.hard || 0)*5;
            const r1 = 0;
            const r2 = (participant.round2 || 0);
            const r3 = (participant.round3 || 0) * 3;
            const totalScore = r1+r2+r3;
            console.log(participant);
            // Push an object containing the participant's details and score into the array
            participantRows.push({
                name: capitalizeWords(participant.Name),
                htno: participant.htno,
                college: participant.college,
                year: participant.year,
                branch: participant.branch,
                round1: r1,
                round2: r2,
                round3: r3,
                totalScore: totalScore
            });
        });

        // Sort the array based on totalScore (from highest to lowest)
        participantRows.sort((a, b) => b.totalScore - a.totalScore);

        // Now build and append rows to the table
        participantRows.forEach(participant => {
            // const row = `
            //     <tr>
            //         <td>${participant.name}</td>
            //         <td>${participant.htno}</td>
            //         <td>${participant.college}</td>
            //         <td>${participant.year}</td>
            //         <td>${participant.branch}</td>
            //         <td><a href="https://leetcode.com/u/${participant.username}/">${participant.username}</a></td>
            //         <td>${participant.easySolved}</td>
            //         <td>${participant.mediumSolved}</td>
            //         <td>${participant.hardSolved}</td>
            //         <td>${participant.acceptanceRate}</td>
            //         <td>${participant.totalScore}</td>
            //     </tr>
            // `;

        //     const row = `
        //     <tr>
        //         <td>${serialNo++}</td>
        //         <td>${participant.name}</td>
        //         <td>${participant.htno}</td>
        //         <td>${participant.college}</td>
        //         <td>${participant.year}</td>
        //         <td>${participant.branch}</td>
        //         <td>${participant.round1}</td>
        //         <td>${participant.round2}</td>
        //         <td>${participant.round3}</td>
        //         <td>${participant.totalScore}</td>
        //     </tr>
        // `;                <th><a href="certificate.html?cid=${participant.htno.toUpperCase()}">${participant.name}</a></th>



            const row = `
            <tr>
                <td>${serialNo++}</td>
                <th>${participant.name}</th>
                <td>${participant.htno}</td>
                <td>${participant.college}</td>
                <td>${participant.year}</td>
                <td>${participant.branch}</td>
                <td>${participant.round3}</td>
            </tr>
        `;
            // Append the row to the table body
            $('#participantsTable tbody').append(row);
        });
        $('#participantsTable').fadeIn();
    }).fail(function() {
        console.error('Error loading JSON files.');
    });
});

// Function to capitalize the first letter of each word
function capitalizeWords(str) {
    return str.split(' ').map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}
