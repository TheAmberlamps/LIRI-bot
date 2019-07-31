# LIRI-bot
LIRIbot project for class, created using node and multiple packages.

Overview:

LIRIbot is a program that is designed to search for songs, concerts, and movies. The user chooses which of the three
options they want to search for, and then enter the name of the song, artist or movie that they want to search for.

Upon being run LIRIbot runs an inquirer.js prompt, asking the user for their name. They will be referred to by the
name entered from that point onwards, and if they enter no name they will be called "Stranger". Next they are presented
with a list of options: search for music, concerts, movies, or leave. User choices are sorted using if/else statements,
and then the user is presented with a new inquirer prompt asking them for the name of the song, artist or movie they
want to search for. Their input is then used as a search query in the particular search API required.

----------------------

Instructions for use:

 -WARNING- If you clone this project, the Spotify search will not work unless you supply your own .env file with your API keys. -WARNING- 

1. Run the program in node. You don't have to pass it any additional arguments, that's all taken care of in the program.

2. You will be asked to provide a name. Enter whatever you like, including nothing.

3. You will now be asked what you want to search for, or if you'd like to leave the program. Select an option, or select the

"leave" option and the program will say goodbye and stop running.

4. If you are searching for a song, enter its name. Spotify will then return the first song found and stop running.

5. If you are searching for concerts, enter the name of the artist you would like to see. BandsInTown will return up to 10

concerts for the artist (or an apology for not being able to find any) and stop running.

6. If you are searching for a movie, enter its title. OMDB will then return information about the film and stop running.

----------------------

Technologies used in development: Node Spotify API, Axios, OMDB API, Bands In Town API, Moment, DotEnv, Inquirer, fs.

----------------------

I am the sole developer of this app.
