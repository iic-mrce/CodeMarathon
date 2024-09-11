$(document).ready(function() {
    $('#participantsTable').hide();
    // Load the participants.json, usernames.json, and user_stats.json
    $.when(
        $.getJSON('./assets/participants.json'),
        $.getJSON('./assets/usernames.json'),
        $.getJSON('./assets/user_stats.json')
    ).done(function(participantsData, usernamesData, userStatsData) {
        const participants = participantsData[0]; // Participants JSON array
        const usernames = usernamesData[0];       // Usernames JSON array
        const userStats = userStatsData[0];       // User stats JSON object
        
        // Function to find username based on htno
        function findUsername(htno) {
            const user = usernames.find(u => u.htno === htno);
            return user ? user.username : null;
        }
        
        // Function to get user stats by username
        function getUserStats(username) {
            return userStats[username] || {
                easySolved: 0,
                mediumSolved: 0,
                hardSolved: 0,
                acceptanceRate: 0
            };
        }

        // Array to hold participants along with their scores
        let participantRows = [];

        // Iterate through each participant and calculate the total score
        participants.forEach(participant => {
            const username = findUsername(participant.htno);
            const stats = getUserStats(username);
            const totalScore = stats.easySolved*1 + stats.mediumSolved*2 + stats.hardSolved*3 + stats.round2 + stats.round3;
            
            // Push an object containing the participant's details and score into the array
            participantRows.push({
                name: capitalizeWords(participant.name),
                htno: participant.htno,
                college: participant.college,
                year: participant.year,
                branch: participant.branch,
                username: username || '-',
                easySolved: stats.easySolved * 1 + stats.mediumSolved * 2 + stats.hardSolved * 3,
                mediumSolved: stats.round2,
                hardSolved: stats.round3,
                acceptanceRate: stats.acceptanceRate,
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

            const row = `
            <tr>
                <td>${participant.name}</td>
                <td>${participant.htno}</td>
                <td>${participant.college}</td>
                <td>${participant.year}</td>
                <td>${participant.branch}</td>
                <td>${participant.username}</td>
                <td>${participant.easySolved}</td>
                <td>${participant.mediumSolved}</td>
                <td>${participant.hardSolved}</td>
                <td>${participant.totalScore}</td>
            </tr>
        `;

        //     const row = `
        //     <tr>
        //         <td>${participant.name}</td>
        //         <td>${participant.htno}</td>
        //         <td>${participant.college}</td>
        //         <td>${participant.year}</td>
        //         <td>${participant.branch}</td>
        //     </tr>
        // `;
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
