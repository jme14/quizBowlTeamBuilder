
document.getElementById("csvSubmitter").addEventListener("click", onSubmit);

class AllTeams
{
    team = [];

    constructor(teamArray)
    {
        this.team = teamArray;

    }

 
    removePrintedData()
    {
        const diver = document.getElementById("teamSection");
        diver.innerHTML="";
    }
    printToScreen()
    {
        this.removePrintedData();
        this.makeAllTables();

        console.log("when i calc it it's "+this.calculateAverageTeamScore());


        for ( let i = 0 ; i < this.team.length ; i++)
        // for all the teams, insert the players into the tables 
        {
            let thisTeam = this.team[i];
            const teamHeader = document.getElementById("teamHeader"+i);

            teamHeader.innerHTML = teamHeader.innerHTML+"  "+thisTeam.Id+"  "+thisTeam.teamScore;


            const table = document.getElementById("table"+i);

            console.log("thisTeam length is "+thisTeam.player.length);
        
            for ( let j = 0 ; j < this.team[i].player.length ; j++)
            {
                //make new row for each player 
                let thisPlayer = this.team[i].player[j];

                const playerRow = document.createElement("tr");

                const playerLabel = document.createElement("td");
                playerLabel.className = "teamTableData";

                const textNode = document.createTextNode(thisPlayer.name);
                console.log("thisPlayer.name is "+thisPlayer.name);

                playerLabel.appendChild(textNode);
                playerRow.appendChild(playerLabel);

                for ( let k = 0 ; k < 10 ; k++)
                {
                    const statData = document.createElement("td");
                    statData.className = "teamTableData";

                    const textNode = document.createTextNode(thisPlayer.stat[k]);

                    statData.appendChild(textNode);
                    playerRow.appendChild(statData);
                }

               table.appendChild(playerRow);
            }

            const SSarray = thisTeam.superScore;


            const superScore = document.createElement("tr");
            const superScoreName = document.createElement("td");
            superScoreName.className = "teamTableData";

            const SSName = document.createTextNode("SuperScore");
            superScoreName.appendChild(SSName);
            superScore.appendChild(superScoreName);

            for ( let m = 0 ; m < 10 ; m++)
            {
                const superStat = document.createElement("td");
                superStat.className = "teamTableData";

                const statText = document.createTextNode(SSarray.stat[m]);

                superStat.appendChild(statText);
                superScore.appendChild(superStat);
            }

            table.appendChild(superScore);


        }
    }

    makeAllTables()
    {
        console.log("In table make!");

        const statNameList = [
            "Literature",
            "Fine Arts",
            "Geography",
            "History",
            "Mythology",
            "Philosophy",
            "Religion",
            "Science",
            "Social Science",
            "Pop Culture"
        ];

        const allTeamInfo = document.createElement("h3");
        const aTItext = document.createTextNode("Information");
        allTeamInfo.appendChild(aTItext);

        const allTeamInfoParagraph = document.createElement("p");
        allTeamInfoParagraph.appendChild(document.createTextNode(this.calculateAverageTeamScore()));

        const teamSection = document.getElementById("teamSection");

        teamSection.appendChild(allTeamInfoParagraph);
        teamSection.appendChild(allTeamInfo);

        for ( let i = 0 ; i < this.team.length ; i++)
        //for all the teams...
        {
            const table = document.createElement("table");
            table.className = "teamTable";
            table.id = "table"+i;

            const lableRow = document.createElement("tr");

            const nameLabel = document.createElement("td");
            nameLabel.className = "teamTable";

            const textNode = document.createTextNode("Name");
            nameLabel.appendChild(textNode);
            lableRow.appendChild(nameLabel);

            for ( let  j = 0 ; j < 10 ; j++)
            //for all the stats, provide the names 
            {
                const statLabel = document.createElement("td");
                statLabel.className = "teamTable";
                const textNode = document.createTextNode(statNameList[j]);
                statLabel.appendChild(textNode);
                lableRow.appendChild(statLabel);
            }

            table.appendChild(lableRow);


            const section = document.getElementById("teamSection");
            //the above gets the div 

            const teamTitle = document.createElement("h2");
            teamTitle.id= "teamHeader"+(i);
            teamTitle.className = "teamTable";
            const teamText = document.createTextNode(" Team "+(i+1));
            teamTitle.appendChild(teamText);

            section.appendChild(teamTitle);
            section.appendChild(table);

            const breaker = document.createElement("br");
            section.appendChild(breaker);

            const information = document.createElement("h4");
            section.appendChild(information);

            const breaker2 = document.createElement("br");
            section.appendChild(breaker2);



        }

    }
    calculateAverageTeamScore()
    {
        let aTC = 0;

        for ( let i = 0 ; i < this.team.length ; i++)
        {
            aTC = (+this.team[i].teamScore) + (+aTC);
        }
        aTC = aTC/this.team.length;

        return aTC;
    }

    shuffle()
    {
        console.log("ENTERING SHUFFLER");
        let playerShuffler = new Array();

        for (let i = 0 ; i < this.team.length ; i++)
        {
            for ( let j = 0 ; j < this.team[i].player.length ; j++)
            {
                let currentPlayer = this.team[i].player[j];

                playerShuffler.push(currentPlayer);
            }
        }

        //now playerShuffler should be an array of players 

        randomizePlayerArray(playerShuffler);

        let runCounter  = 0;
        for (let i = 0 ; i < this.team.length ; i++)
        {
            for ( let j = 0 ; j < this.team[i].player.length ; j++)
            {
                this.team[i].player[j] = playerShuffler[runCounter];
                runCounter++;
            }
            this.team[i].update();
        }

    }

    logAllTeams()
    {
        for ( let i = 0 ; i < this.team.length ; i++)
        {
            this.team[i].logData();
        }
    }
    
    //optimize 

    optimize()
    {
        let max = 0;

        for ( let i = 0 ; i < 1000 ; i++)
        {
            this.shuffle();
            this.calculateAverageTeamScore();
            if ( this.calculateAverageTeamScore() > max ) 
            {
                max = this.calculateAverageTeamScore();
            }
        }

        let mTeamFound = new AllTeams(this.team);

        for ( let i = 0 ; mTeamFound.calculateAverageTeamScore() != max ; i++ ) 
        {
            this.shuffle();
            this.calculateAverageTeamScore();
            mTeamFound = new AllTeams(this.team);
        }

        console.log("The highest average found is "+max);
        console.log("The aTS is (in optimize) "+mTeamFound.calculateAverageTeamScore());
        console.log("Yet when I calculate it its "+mTeamFound.calculateAverageTeamScore());
        console.log("Yet when I calculate it again its "+mTeamFound.calculateAverageTeamScore());

       

        mTeamFound.logAllTeams();
        console.log("Is the above team better?");

        return mTeamFound;
    }
    //return average team score 


}
class Team
{
    name; //like, team1
    Id; //like, ABOZ, BEFL
    player = []; //array of players 
    superScore = [];
    teamScore;

    constructor(teamNumber, players)
    {
        this.name="team"+teamNumber;
        this.player = players;
        this.Id = "";

       
        this.calculateId();
        this.calculateSuperTeamScore();
       
    }
    update()
    {
        this.calculateId();
        this.calculateSuperTeamScore();
    }
    calculateId()
    {
        this.Id = "";
        for ( let i = 0 ; i < this.player.length ; i++)
        {
            this.Id = this.Id+this.player[i].code[1];
        }
    }
    calculateSuperTeamScore()
    {
        let superScoreData = [];
        superScoreData[0] = "SuperScore";

        let averageMax = 0;

        for ( let i = 0 ; i < 10 ; i++)
        {
            let maxStat = 0;

            for ( let j = 0 ; j < this.player.length ; j++)
            {
                if( this.player[j].stat[i] > maxStat )
                {
                    maxStat = this.player[j].stat[i];
                }
            }

            superScoreData[i+1]=maxStat;

            averageMax = (+averageMax) + (+maxStat);
        }

        averageMax = averageMax/10;

        this.superScore = new Row(superScoreData);
        this.teamScore = averageMax;
    }

    logData()
    {
        console.log("Logging data now");
        for ( let i = 0 ; i < this.player.length ; i++)
        {
            console.log(this.player[i].name);
            console.log(this.player[i].stat);
        }
        console.log(this.superScore.name);
        console.log(this.superScore.stat);
        
    }

}

class Row 
{
    name;
    stat = [];

    constructor(data)
    {
        this.name = data[0];

        this.stat = [ data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10] ];

    }

}

class Player extends Row
{
    code;
    constructor(data)
    {
        super(data);
        this.code = data[11];
    }

}



//the following shuffles a player array 
function randomizePlayerArray(oldPlayerArray)
{
    let index = 0;
    let playerArray = [];

    let currentIndex=oldPlayerArray.length;
    
    for ( let i = 0 ; i < oldPlayerArray.length ; i++)
    {
        index = Math.floor(Math.random()*currentIndex);

        let holder = oldPlayerArray[index];
        oldPlayerArray[index] = oldPlayerArray[currentIndex-1];
        oldPlayerArray[currentIndex-1] = holder;

        currentIndex--;
    }
    return oldPlayerArray;
}
//this creates the formatting for all the tables required
function tableMake(playerArray)
{
    console.log("In table make!");

    const statNameList = [
        "Literature",
        "Fine Arts",
        "Geography",
        "History",
        "Mythology",
        "Philosophy",
        "Religion",
        "Science",
        "Social Science",
        "Pop Culture"
    ];

    playerArray = randomizePlayerArray(playerArray);

    for ( let i = 0 ; i < Math.ceil(playerArray.length/4) ; i++)
    {
        const table = document.createElement("table");
        table.className = "teamTable";
        table.id = "table"+i;

        const lableRow = document.createElement("tr");

        const nameLabel = document.createElement("td");
        nameLabel.className = "teamTableData";
        const textNode = document.createTextNode("Name");
        nameLabel.appendChild(textNode);
        lableRow.appendChild(nameLabel);

        for ( let  j = 0 ; j < 10 ; j++)
        {
            const statLabel = document.createElement("td");
            statLabel.className = "teamTableData";
            const textNode = document.createTextNode(statNameList[j]);
            statLabel.appendChild(textNode);
            lableRow.appendChild(statLabel);
        }

        table.appendChild(lableRow);
        const section = document.getElementById("teamSection");

        const teamTitle = document.createElement("h2");
        const teamText = document.createTextNode(" Team "+(i+1));
        teamTitle.appendChild(teamText);

        section.appendChild(teamTitle);
        section.appendChild(table);

        const breaker = document.createElement("br");
        section.appendChild(breaker);

    }

}

//this adds players to teams in the order in which they exist in player array
function teamMake(playerArray)
{
    let teamCount = Math.ceil(playerArray.length/4);

    for ( let i = 0 ; i < playerArray.length ; i++)
    {
        const newRow = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.className = "teamTableData";

        const nameCellText = document.createTextNode(playerArray[i].name + "  " + playerArray[i].code);
        nameCell.appendChild(nameCellText);
        newRow.appendChild(nameCell);

        for ( let j = 0; j < 10 ; j++)
        {
            const statCell = document.createElement("td");
            statCell.className = "teamTableData";

            const statCellNumber = document.createTextNode(playerArray[i].stat[j]);
            statCell.appendChild(statCellNumber);
            newRow.appendChild(statCell);
        }

        const properTable = document.getElementById("table"+(i%teamCount));
        properTable.appendChild(newRow);
    }
}

//this puts a player array into teams without manipulating html elements
function teamThink(playerArray)
{
    let teamCount = Math.ceil(playerArray.length/4);

    let playerArrayArray = [];

    for ( let  i = 0 ; i < playerArray.length ; i++ )
    {
        if ( Math.floor(i/teamCount) == 0)
        {
            playerArrayArray[i] = new Array();
        }
        playerArrayArray[i%teamCount].push(playerArray[i]);
    }

    let teamArray = [];
    for ( let i = 0 ; i < playerArrayArray.length ; i++)
    {
        teamArray[i] = new Team(i, playerArrayArray[i]);

    }

    let AT = new AllTeams(teamArray);


    return AT;
}


//action once file is submitted 
function onSubmit()
{
    const file = document.getElementById("teamFile").files[0];

    const fr = new FileReader();

    fr.readAsText(file);

    fr.onload = function () 
    {
        console.log("Success!");
        let playerArray = csvReader(fr.result);
      
        let AT = teamThink(playerArray);

        AT = AT.optimize();

        console.log("in load...");
        console.log("AT teamScore is "+AT.calculateAverageTeamScore());
        console.log("Yet when I calc it's "+AT.calculateAverageTeamScore());

        AT.printToScreen();

        let butty = document.getElementById("csvSubmitter");    
        butty.removeEventListener("click", onSubmit);
        butty.addEventListener("click", function() {
            onResubmit(AT);
        });
        
    }
    fr.onerror = function() 
    {
        console.log("Error!");
        console.log(fr.error);
    }
}

function onResubmit(AT)
{
    AT = AT.optimize();
    console.log("in resubmit it's "+AT.calculateAverageTeamScore());
    AT.printToScreen();
}

//reading the csv file provided 
function csvReader(fileContent)
{
    console.log(fileContent);

    const lineArray = fileContent.split('\n');
    //each line is now in this array 

    let playerArray = [];
    for ( let i = 1 ; i < lineArray.length ; i++)
    {
        const splitLine = lineArray[i].split(",");
        //splitLine is an array of strings containing 
        splitLine.push("("+getLetterFromNumber(i)+")");

        const newPlayer = new Player(splitLine);
        playerArray.push(newPlayer);
    }

    return playerArray;
}

function getLetterFromNumber(number)
{
    let letter = String.fromCharCode(number+64);

    return letter;
}
