//-----------------------------------------------------------------------------------first we define the variables for global use
var user_bat,computer_bat;           // user_bat and computer_bat defines the location of each respectively
                                     // user_bat sticks to the left edge of the screen, computer_bat sticks to the right
                                     // these contains the location of the central pixel, the width can be calculated from this
                                     // the values can be set by the user
var user_bat_size, computer_bat_size;// user_bat and computer_bat defines the location of each respectively
                                     // user_bat sticks to the left edge of the screen, computer_bat sticks to the right
                                     // these contains the location of the central pixel, the width can be calculated from this
                                     // the values can be set by the user
var angle_set_user;                  // holds the angle set for delivery
var angle_unit;                      // this holds the value for one degree of angle
var unit;                            // this holds the value for one unit distance, this is proportional to the size of the bat
var leap;                            // this holds the number of steps the bat would jump. each step is one unit
var user_bat_top,computer_bat_top;   // these holds the pixel where the bats end, from the top ; goes on for bottom in next line
var user_bat_bottom,computer_bat_bottom;
var y_resolution, x_resolution;      // these define the vertical and horizontal resolution of the gamebox respectively
var bat_protrusion;                  // this determines how much a bat protrudes into the screen
var score;                           // this keeps track of the score
var maximum_ball_size;               // this is the maximum threshold for the size of the ball
var minimum_ball_size;               // this is the minimum threshold for the size of the ball
var maximum_bat_size;                // this is the maximum threshold for the size of the bat
var minimum_bat_size;                // this is the minimum threshold for the size of the bat
var frame_refresh_time;              // this holds the frame refresh time for the videobox in milliseconds
// now for setting the formula to calculare the ball's current path
var current_angle;                   // y=mx+c needs the inputs
var current_y_start;
var current_x_start;

var ball_geometry_left;              // locating the edges of the ball
var ball_geometry_right;             // locating the edges of the ball
var ball_geometry_top;               // locating the edges of the ball
var ball_geometry_bottom;            // locating the edges of the ball
var ball_location_y;                 // this holds the current location of the ball in the y-axis
var ball_location_x;                 // this holds the current location of the ball in the x-axis
var ball_radius;                     // this holds the radius of the ball
var ball_threshold_left;             // holds the left threshold for the ball   || if ball touches threshold, it bounces
var ball_threshold_right;            // holds the right threshold for the ball  || if ball touches threshold, it bounces
var ball_threshold_top;              // holds the top threshold for the ball    || if ball touches threshold, it bounces
var ball_threshold_bottom;           // holds the bottom threshold for the ball || if ball touches threshold, it bounces
var direction;                       // this keeps in survey whether the ball is going in forward direction or coming back
var lift_direction;                  // this keeps in survey whether the ball is going upward or downward

var starting_shot;                   // this keeps in record whether the shot is the first one or not
var user_lost;                       // notices if the corresponding player has lost the game or not
var computer_lost;                   // notices if the corresponding player has lost the game or not

var user_navigate_allow;             // to ensure that neigher the user nor the computer can jump in between frames
var computer_navigate_allow;         // to ensure that neigher the user nor the computer can jump in between frames

// the following two are needed for repetitiona nd timekeeping for functions
//                                                                         display()
//                                                                         calculate_trajectory_basic_straight_interval()
var display_interval;
var calculate_trajectory_basic_straight_interval;

var message;                         // this bears the message to be displayed
var angle_display;                   // this is the angle displayed via the visualizer
                                     // the convention for angles is different from the concept used here
                                     // that is the reason we need a buffer for translation and this is it
var game_on;                         // this keeps record whether the game has started or not
                                     // utility for the artificial intelligence

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------now we enter the deafult values to the variable
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

y_resolution = 25;
x_resolution = 50;
frame_refresh_time = 100;// this bears the number of milliseconds after which videobox shall be refreshed

ball_radius = 0;

user_bat = 10;          // location of the bats
computer_bat = 10;      // location of the bats

user_bat_size = 5;      // this needs to be an even number, always
computer_bat_size = 5;  // this needs to be an even number, always

/*            ANATOMY OF A BAT                                     ooo ^
                                                                   ooo |
                                                                   ooo |
                                        user_bat or computer_bat-> ooo  user_bat_size or computer_bat_size
                                                                   ooo |
                                                                   ooo |
                                                                   ooo v
                                                                  |<->|
                                                              bat_protrusion
*/

bat_protrusion = 2;
user_bat_top = user_bat - (user_bat_size / 2);                  // formula
user_bat_bottom = user_bat + (user_bat_size / 2);               // formula
computer_bat_top =  computer_bat - (computer_bat_size / 2);     // formula
computer_bat_bottom = computer_bat + (computer_bat_size / 2);   // formula
minimum_bat_size = 1;
maximum_bat_size = 10;

maximum_ball_size = user_bat_size;
minimum_ball_size = 1;

angle_set_user = 90;    // goes on to 180 degrees. 90 being normal to the geometry of the bat
unit = 1;               // the number of 'pixels' or rather table elements that make up one unit
angle_unit = 45;        // for each click, a difference of fifteen degrees is implemented
leap = 1;               // the number of units the bats take in one step when moving up or down
score = 0;

current_angle = angle_set_user; // the trajectory of the ball should depend on the angle, at start, same as the one set
current_y_start = 0+user_bat; // the trajectory of the ball at start should start from the location of the bat
current_x_start = 0+bat_protrusion+(ball_radius*unit) // at the start, the ball starts from the edge of the user's bat

ball_location_y = current_y_start; // initial values
ball_location_x = current_x_start; // initial values
ball_threshold_left = 0+bat_protrusion;             // pre defined formula    || bsaically holds the screen area for ball
ball_threshold_right = x_resolution-bat_protrusion; // pre defined formula    || bsaically holds the screen area for ball
ball_threshold_top = 0;                             // pre defined formula    || bsaically holds the screen area for ball
ball_threshold_bottom = y_resolution;               // pre defined formula    || bsaically holds the screen area for ball

direction = "forward";

starting_shot = true;    // by default, we consider the shot to be the starting shot, it later has to be updated

user_lost = false;       // at the start, none have lost
computer_lost = false;   // at the start, none have lost

user_navigate_allow = false;     // starting mechanism already specified, so initialized with false
computer_navigate_allow = false; // starting mechanism already specified, so initialized with false

message = "Set the position, size and angle of the bat and SHOOT !"; // the starting message
angle_display = 0; // at the start, the visualizer stays at a neutral position
game_on = false; // by deafult, like at the start, the game has not started yet

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------now we take the user's inputs
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

function increase_ball_size()
{
	// the object is to co-ordinate the functions to increase the ball's size and record it
	ball_size("increase");
	//variable_content_viewer();
	display();
}
function decrease_ball_size()
{
	// the object is to co-ordinate the functions to decrease the ball's size and record it
	ball_size("decrease");
	//variable_content_viewer();
	display();
}
function increase_user_bat_size()
{
	// the object is to co-ordinate the functions to increase the user's bat's size
	bat_size("increase", "user");
	//variable_content_viewer();
	display();
}
function decrease_user_bat_size()
{
	// the object is to co-ordinate the functions to increase the user's bat's size
	bat_size("decrease", "user");
	//variable_content_viewer();
	display();
}
function increase_computer_bat_size()
{
	// the object is to co-ordinate the functions to increase the user's bat's size
	bat_size("increase", "computer");
	//variable_content_viewer();
	display();
}
function decrease_computer_bat_size()
{
	// the object is to co-ordinate the functions to increase the user's bat's size
	bat_size("decrease", "computer");
	//variable_content_viewer();
	display();
}
function rotate_clockwise()
{
	rotate("clockwise");
	//variable_content_viewer();
}
function rotate_anticlockwise()
{
	rotate("anticlockwise");
	//variable_content_viewer();
}
// navigating facilities are coupled with display so as to coordinate with the frame rate
function user_go_up()
{
	if(starting_shot == true)
	{
		move("up", "user");
		//variable_content_viewer();
		display();
	}
	if(user_navigate_allow == true)
	{
		move("up", "user");
		//variable_content_viewer();
		user_navigate_allow = false;
	}
}
function user_go_down()
{
	if(starting_shot == true)
	{
		move("down", "user");
		//variable_content_viewer();
		display();
	}
	if(user_navigate_allow == true)
	{
		move("down", "user");
		//variable_content_viewer();
		user_navigate_allow = false;
	}
}
function computer_go_up()
{
	if(starting_shot == true)
	{
		move("up", "computer");
		//variable_content_viewer();
		display();
	}
	if(computer_navigate_allow == true)
	{
		move("up", "computer");
		//variable_content_viewer();
		computer_navigate_allow = false;
	}
}
function computer_go_down()
{
	if(starting_shot == true)
	{
		move("down", "computer");
		//variable_content_viewer();
		display();
	}
	if(computer_navigate_allow == true)
	{
		move("down", "computer");
		//variable_content_viewer();
		computer_navigate_allow = false;
	}
}

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------we need to display the variables for ease of development
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

function variable_content_viewer()
{
	// the objective of this is to allow the developer to keep track of the variables
	var output = "";
	output = output+"user bat is located at "+user_bat+" and computer bat is located at "+computer_bat;
	output = output+"<br>";
	output = output+"user bat size is "+user_bat_size+"(+1) and computer bat size is "+computer_bat_size+"(+1)";
	output = output+"<br>";
	output = output+"value for an unit is "+unit;
	output = output+"<br>";
	output = output+"protrusion of bat is "+bat_protrusion+" and radius of ball is "+ball_radius;
	output = output+"<br>";
	output = output+"the bat of the user entends from "+user_bat_top+" to "+user_bat_bottom;
	output = output+"<br>";
	output = output+"the bat of the computer entends from "+computer_bat_top+" to "+computer_bat_bottom;
	output = output+"<br>";
	output = output+"resolution in the horizontal direction is "+x_resolution+" and vertical is "+y_resolution;
	output = output+"<br>";
	output = output+"angle set for delivery is "+angle_set_user;
	output = output+"<br>";
	output = output+"The ball located at "+ball_location_y+","+ball_location_x+" is at angle "+current_angle;
	output = output+"<br>";
	output = output+"The edges of the ball are "+ball_geometry_top+" to top, "+ball_geometry_bottom+" to bottom and";
	output = output+"<br>";
	output = output+"to the left it is "+ball_geometry_left+", to right is "+ball_geometry_right;
	output = output+"<br>";
	output = output+"The ball is going "+direction;

	document.getElementById("check").innerHTML = output;
}
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------now we go on to define the display system
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

function display()
{
	// the objective of this function is to display the 'screen'
	// this is in the form of a table
	// it is in the form of a table because then it can be enhanced by css
	// the whole output is in form of a string because then it can be easily imposed on html
	/*
	    ^             the negative and positive signs are kept
	    |             like this because that's the way the computer
	    | -y (i)      prints the frame
	    |             the flow is always towards the positive
	    |     +x (j)                                          i and j represent the axes in the loops
	    o------------>
	*/
	var output = "<table id='display_table'>";                 // this is what becomes the output at the end of the program
	for(var i=0; i<y_resolution; i++)
	{
		var current_row_output = "<tr>";    // this will become the output of the i'th row
		for(var j=0; j<x_resolution; j++)
		{
			var flag = "empty";             // this holds if the particular cell is taken or not, if yes, who ?

			/* COLOR CODING
			   the user's bat is of color skyblue
			   the computer's bat is of color seagreen
			   the ball is white
			   the background is transparent
			*/

			// now we need to decide the content of this table described
			if(i>user_bat_top && i<= user_bat_bottom && j>= 0 && j< bat_protrusion)
			{
				// this defines the location for the user's bat
				// need to define as a rectangle with side of bat_protrusion
				flag = "user";
			}
			if(i>computer_bat_top && i<= computer_bat_bottom && j>= (x_resolution-bat_protrusion) && j<=x_resolution)
			{
				// this defines the location for the computer's bat
				// need to define as a rectangle with side of bat_protrusion
				flag = "computer";
			}
			locateball(); // helps in identifying the dimensional limits of the ball
			if(i>=ball_geometry_top && i<=ball_geometry_bottom && j>=ball_geometry_left && j<=ball_geometry_right)
			{
				// this defines the location for the ball
				flag = "ball";
			}
			// now we need to prepare the current row of the table
			if(flag == "user")
			{
				current_row_output = current_row_output + "<td id='gametab' style='background-color: skyblue'></td>";
			}
			if(flag == "computer")
			{
				current_row_output = current_row_output + "<td id='gametab' style='background-color: seagreen'></td>";
			}
			if(flag == "ball")
			{
				current_row_output = current_row_output + "<td id='gametab' style='background-color: white'></td>";
			}
			if(flag == "empty")
			{
				current_row_output = current_row_output + "<td id='gametab' style='background-color: transparent'></td>";
			}
		}
		// we need to end the current row and add it to the final output
		current_row_output = current_row_output + "</tr>";
		output = output + current_row_output;
	}
	// here we finish the output and write it on the screen
	output = output + "</table>";          // this ends the table
	document.getElementById("videobox").innerHTML = output;

	user_navigate_allow = true;     // to allow further movement of the bats
	computer_navigate_allow = true; // to allow further movement of the bats

	// we need to print the message
	document.getElementById("message").innerHTML = message;

	// now is the implementation of artificial intelligence for the computer's bat
	block_ball();
}

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------now we need to keep track of the ball
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

function locateball()
{
	// the objective of this function is to mark the cells displaying the ball
	// the cells are color coded as white
	// this is a single important program
	// the shape of the ball can be altered
	// for ease, in this instance, it is considered a square
	// even if it was a circle, the squares should define the limits
	// the program, therefore, remains the same
	/* GEOMETRY OF BALL

                        the central column
                                |
                    ball_radius | ball_radius
                       x unit   |    x unit
                          <---> v <--->
	                   ^  o o o o o o o  ^                      A SQUARE
	                   |  o o o o o o o  |  ball_radius x unit
	                x  |  o o o o o o o  v                      x = y :: must always be an odd number
	                   |  o o o o o o o  |<------------- the central row
	                   |  o o o o o o o  ^
	                   |  o o o o o o o  |  ball_radius x unit
	                   v  o o o o o o o  v
	                      < - - - - - >
	                            y
	*/
	ball_geometry_left = ball_location_x- (ball_radius*unit);
	ball_geometry_right = ball_location_x + (ball_radius*unit);
	ball_geometry_top = ball_location_y - (ball_radius*unit);
	ball_geometry_bottom = ball_location_y + (ball_radius*unit);
}
function calculate_trajectory_basic_straight()//***********************************EASY METHOD**********************************
{
	// the object is to calculate the trajectory
	// this updates all the variables in calculating the trajectory of the ball
	// this updates the position of the ball
	// goes with the equation for the straight line, x=my+c
	// x denotes the horizontal and y, the vertical
	// c goes on from the top of the videobox to the bottom
	// so that the c can accomodate anything, we go on from 0 to y_resolution
	// the y_resolution goes in negative way, so we need to make it y_resolution - i where i goes on from 0 to y_resolution

	/*            0   ^
	                  |  <- as we can see y_resolution goes in the negative direction
	                  |     we need to rectify it in the assesment
	                  | 
	                  |
	                  | 0             x_resolution
	   y_resolution   |___________________>
	*/

	// working with formulae is a tricky situation
	// to keep it simpler and develop the basics first, we adapt a method
	// we only allow 45 degrees, 90 degrees and 135 degrees of angles
	// this is done so that the slopes can ben kept to 1, 0 and -1
	// this helps a lot in calculations
	// IT IS HOPED THAT IN THE FUTURE, WITH FURTHER UPGRADES, THIS GAME SHALL BE ABLE TO ACCOMODATE ANY ANGLES*****************
	// THE SCENE IS SET WITH THE ANGLE INPUT SYSTEM WHICH CAN TAKE ANY ANGLE WHATSOEVER****************************************
	// We do not need equation for straight line because we are working with very specific and easy slopes
	/* if angle is 45  degrees, slope is 1
	   if angle is 90  degrees, slope is 0 << actually undefined
	   if angle is 135 degrees, slope is -1
	*/

    locateball();

    // now defining variables for updating the current coordinates
    var ball_location_x_new;
    var ball_location_y_new;
    var ball_geometry_left_new;
    var ball_geometry_right_new;
    var ball_geometry_top_new;
    var ball_geometry_bottom_new;

    /*                          x                          x     <- absurd angle, the ball is never coming in these angles
                    315  .      .      .  45               180, 0/360 are never going to happen in this game
                           .    .    .            current_angle  direction  lift_direction
                             .  .   .                      45  <- forward  | upward
                              . . .                        90  <- forward  | neutral
                  270  . . . . . . . . . . . 90            135 <- forward  | downward
                              . . .                        225 <- backward | downward
                             .  .   .                      270 <- backward | neutral
                           .    .     .                    315 <- backward | upward
                         .      .      . 
                       225      x       135
                                
    */

    // going forward

    if ( current_angle  == 45 )
    {
    	ball_location_x_new = ball_location_x + 1;
    	ball_location_y_new = ball_location_y - 1;
    	ball_geometry_left_new = ball_geometry_left + 1;
    	ball_geometry_right_new = ball_geometry_right + 1;
    	ball_geometry_top_new = ball_geometry_top - 1;
    	ball_geometry_bottom_new = ball_geometry_bottom - 1;

    	direction = "forward"; // the balls are going forward
    	lift_direction = "upward"; // means the ball is going upwards
    }
    if ( current_angle  == 90 )
    {
    	ball_location_x_new = ball_location_x + 1;
    	ball_location_y_new = ball_location_y - 0;
    	ball_geometry_left_new = ball_geometry_left + 1;
    	ball_geometry_right_new = ball_geometry_right + 1;
    	ball_geometry_top_new = ball_geometry_top - 0;
    	ball_geometry_bottom_new = ball_geometry_bottom - 0;

    	direction = "forward"; // the balls are going forward
    	lift_direction = "neutral"; // means the ball is going neither up nor down
    }
    if ( current_angle  == 135 )
    {
    	ball_location_x_new = ball_location_x + 1;
    	ball_location_y_new = ball_location_y + 1;
    	ball_geometry_left_new = ball_geometry_left + 1;
    	ball_geometry_right_new = ball_geometry_right + 1;
    	ball_geometry_top_new = ball_geometry_top + 1;
    	ball_geometry_bottom_new = ball_geometry_bottom + 1;

    	direction = "forward"; // the balls are going forward
    	lift_direction = "downward"; // means the ball is going downward
    }

    // going backward

    if ( current_angle  == 315 )
    {
    	ball_location_x_new = ball_location_x - 1;
    	ball_location_y_new = ball_location_y - 1;
    	ball_geometry_left_new = ball_geometry_left - 1;
    	ball_geometry_right_new = ball_geometry_right - 1;
    	ball_geometry_top_new = ball_geometry_top - 1;
    	ball_geometry_bottom_new = ball_geometry_bottom - 1;

    	direction = "backward"; // the balls are going backward
    	lift_direction = "upward"; // means the ball is going upwards
    }
    if ( current_angle  == 270 )
    {
    	ball_location_x_new = ball_location_x - 1;
    	ball_location_y_new = ball_location_y - 0;
    	ball_geometry_left_new = ball_geometry_left - 1;
    	ball_geometry_right_new = ball_geometry_right - 1;
    	ball_geometry_top_new = ball_geometry_top - 0;
    	ball_geometry_bottom_new = ball_geometry_bottom - 0;

    	direction = "backward"; // the balls are going backward
    	lift_direction = "neutral"; // means the ball is going neither up nor down
    }
    if ( current_angle  == 225 )
    {
    	ball_location_x_new = ball_location_x - 1;
    	ball_location_y_new = ball_location_y + 1;
    	ball_geometry_left_new = ball_geometry_left - 1;
    	ball_geometry_right_new = ball_geometry_right - 1;
    	ball_geometry_top_new = ball_geometry_top + 1;
    	ball_geometry_bottom_new = ball_geometry_bottom + 1;

    	direction = "backward"; // the balls are going backward
    	lift_direction = "downward"; // means the ball is going downward
    }
    starting_shot = false; // once the ball moves, it can never again be the starting shot

    // now we need to update the new values to the old values
    ball_location_x = ball_location_x_new;
    ball_location_y = ball_location_y_new;
    locateball();

    var working = true; // this is to help check if it is working or not
    if(ball_geometry_top != ball_geometry_top_new)
    	working = false;
    if(ball_geometry_bottom != ball_geometry_bottom_new)
    	working = false;
    if(ball_geometry_left != ball_geometry_left_new)
    	working = false;
    if(ball_geometry_right != ball_geometry_right_new)
    	working = false;

    if(working == false)
    	console.log("The function is not working properly");

    // in case the ball bounces
    bounce_basic();

    // in case someone wins
    declare_win();
}
function bounce_basic()
{
	// this updates the required variables when the ball is supposed to bounce
	var bounce; // holds information as to which direction to bounce to

	if(ball_geometry_left <= (0+(bat_protrusion * unit)))
	{
		bounce = "left_wall";
		// we also check if the user has lost the game over here
		if(ball_geometry_top > user_bat_bottom || ball_geometry_bottom < user_bat_top)
		{
			user_lost = true;
			// this means that the bat has successfully blocked the ball
			// we need to add to the user's score
		}
		else
		{
			score++;
			show_score();
		}
	}
	if(ball_geometry_right >= (x_resolution - (bat_protrusion * unit)-unit))
	{
		bounce = "right_wall";
		// we also check if the computer has lost the game over here
		if(ball_geometry_top > computer_bat_bottom || ball_geometry_bottom < computer_bat_top)
		{
			computer_lost = true;
		}
	}
	if(ball_geometry_top <= (0+unit))
	{
		bounce = "top_wall";
	}
	if(ball_geometry_bottom >= (y_resolution-unit))
	{
		bounce = "bottom_wall";
	}
	// now we need to see what to do in which situation
	if(bounce == "left_wall")
	{
		// we need to change the angle
		// we need to update the direction and lift_direction

		// only a projectile along 315 or 225 or 270 degrees can strike the left wall
		if(current_angle == 225)
		{
			current_angle = 135;
			lift_direction = "downward";
		}
		if(current_angle == 315)
		{
			current_angle = 45;
			lift_direction = "upward";
		}
		if(current_angle == 270)
		{
			current_angle = 90;
			lift_direction = "neutral";
		}
		direction = "forward";
	}
	if(bounce == "right_wall")
	{
		// we need to change the angle
		// we need to update the direction and lift_direction

		// only a projectile along 45 or 135 or 90 degrees can strike the right wall
		if(current_angle == 45)
		{
			current_angle = 315;
			lift_direction = "upward";
		}
		if(current_angle == 135)
		{
			current_angle = 225;
			lift_direction = "downward";
		}
		if(current_angle == 90)
		{
			current_angle = 270;
			lift_direction = "neutral";
		}
		direction = "backward";
	}
	if(bounce == "top_wall")
	{
		// we need to change the angle
		// we need to update the direction and lift_direction

		// only a projectile along 315 or 45 degrees can strike the left wall
		if(current_angle == 45)
		{
			current_angle = 135;
			direction = "forward";
		}
		if(current_angle == 315)
		{
			current_angle = 225;
			direction = "backward";
		}
		lift_direction = "downward";
	}
	if(bounce == "bottom_wall")
	{
		// we need to change the angle
		// we need to update the direction and lift_direction

		// only a projectile along 225 or 135 degrees can strike the right wall
		if(current_angle == 225)
		{
			current_angle = 315;
			direction = "backward";
		}
		if(current_angle == 135)
		{
			current_angle = 45;
			direction = "forward";
		}
		lift_direction = "upward";
	}
}

//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------now we go on to define the controls
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------

function move(direction,gamer)
{
	// this takes in two strings : up or down || user or computer
	// this returns nothing since it works on globally defined variables
	// whoever the function is ran for, the position of the bat goes up
	// the position of the bat goes up or down by one unit
	// the selection for unit depends upon the size of the bat
	// since the set of 'pixels' start from zero at top due to use of table and array, to go up we deduct and add for up

	if(direction == "up" && gamer == "user")
	{
		// we shall move the user's bat an unit*leap higher if possible
		// first we need to check if it is possible at all
		if(user_bat_top >= (0+(unit*leap)))
		{
			// in this case we can move it
			user_bat = user_bat - (unit*leap);
			user_bat_top = user_bat_top - (unit*leap);
			user_bat_bottom = user_bat_bottom - (unit*leap);
		}
	}
	if(direction == "down" && gamer == "user")
	{
		// we shall move the user's bat an unit*leap lower if possible
		// first we need to check if it is possible at all
		if(user_bat_bottom < (y_resolution-(unit*leap))) // the count starts from zero
		{
			// in this case we can move it
			user_bat = user_bat + (unit*leap);
			user_bat_top = user_bat_top + (unit*leap);
			user_bat_bottom = user_bat_bottom + (unit*leap);
		}
	}
	if(direction == "up" && gamer == "computer")
	{
		// we shall move the computer's bat an unit*leap higher if possible
		// first we need to check if it is possible at all
		if(computer_bat_top >= (0+(unit*leap)))
		{
			// in this case we can move it
			computer_bat = computer_bat - (unit*leap);
			computer_bat_top = computer_bat_top - (unit*leap);
			computer_bat_bottom = computer_bat_bottom - (unit*leap);
		}
	}
	if(direction == "down" && gamer == "computer")
	{
		// we shall move the computer's bat an unit*leap lower if possible
		// first we need to check if it is possible at all
		if(computer_bat_bottom < (y_resolution-(unit*leap))) // the count starts from zero
		{
			// in this case we can move it
			computer_bat = computer_bat + (unit*leap);
			computer_bat_top = computer_bat_top + (unit*leap);
			computer_bat_bottom = computer_bat_bottom + (unit*leap);
		}
	}

	// we now need to adjust the initial location of the ball too according to the user's bat
	if(starting_shot == true)
	{
		ball_location_y = user_bat;
		locateball();
	}
}
function rotate(direction)
{
	// this takes in only one input, a string: clockwise or anticlockwise
	// this returns nothing since it updates upon globally defined variables
	// the size of the ball goes up or down by one unit
	// the position of the bat, however, remains the same

	// though during progression, any angle can be taken, while setting up the angle, the limits are 0 to 180
	// this is to elaborately specify the direction of the projection of the ball
	// we use 1 - 179 degree range so that we do not need to deal with absurd critical situations of 0 and 180

	if(direction == "clockwise" && angle_set_user <= (179-angle_unit))
	{
		angle_set_user = angle_set_user + angle_unit;
		current_angle = angle_set_user;
		angle_display = angle_display + 45;
	}
	if(direction == "anticlockwise" && angle_set_user >= (1+angle_unit))
	{
		angle_set_user = angle_set_user - angle_unit;
		current_angle = angle_set_user;
		angle_display = angle_display- 45;
	}
	locateball();
	calculate_trajectory_basic_straight();
	// now we need to set the arrow for visual aid according to the direction
	document.getElementById("angle_visualizer").style.transform = "rotate("+angle_display+"deg)";
}
function ball_size(size)
{
	// this only takes one input, a string: increase or decrease
	// this updates the radius of the ball in the game
	// the position of the bat, however, remains the same
	if(size == "increase" && ball_radius <= (maximum_ball_size-unit))
	{
		// we need to check if the ball is reaching threshold or not
		// we need to know if the ball is touching any edge or not
		if(ball_geometry_top > ball_threshold_top && ball_geometry_bottom < (ball_threshold_bottom-1))
		{
			if(ball_geometry_right < (ball_threshold_right-(unit*2)))
			{
				// we deduct unit*2 from the right threshold because upon every increase, the ball goes 2*units on side
				ball_location_x = ball_location_x + unit;
				ball_radius = ball_radius + unit;
			}
		}
	}
	if(size == "decrease" && ball_radius >= (minimum_ball_size+unit))
	{
		// we need not check about any threshold as the size is shrinking
		ball_location_x = ball_location_x - unit;
		ball_radius = ball_radius - unit;
	}
}
function bat_size(size, gamer)
{
	// this takes in two inputs, two strings: increase or decrease || user or computer
	// this returns nothing as it works upon the globally declared variables
	// the size of the bat or the ball is changed using this function
	if(size == "increase" && gamer == "user")
	{
		//increase the user's bat's size if possible
		//increase with two times the unit, always because the bat should spread both ways
		if(user_bat_size <= (maximum_bat_size - (2*unit)))
		{
			// we need to check the upper and lower positions of the bat
			// we can not allow the bat to overflow from the gaming portion
			if(user_bat_top >= (0+unit) && user_bat_bottom < (y_resolution-unit))
			{
				// we do not multiply two for the thresholds because both these get checked
				// if increasing, the bat is increasing one unit each size
				// we also update the bat's edges over here
				user_bat_size = user_bat_size + (2*unit);
				user_bat_top = user_bat_top - (1*unit);
				user_bat_bottom = user_bat_bottom + (1*unit);
			}
		}
	}
	if(size == "decrease" && gamer == "user")
	{
		// we need to decrease the bat's size if possible
		// there is no need to check the threshold limits for decreasong the size
		if(user_bat_size >= (minimum_bat_size+(2*unit)))
		{
			// we need to update the bat size and the edges of the bat
			user_bat_size = user_bat_size - (2*unit);
			user_bat_top = user_bat_top + (1*unit);
			user_bat_bottom = user_bat_bottom - (1*unit);
		}
	}
	if(size == "increase" && gamer == "computer")
	{
		//increase the computer's bat's size if possible
		//increase with two times the unit, always because the bat should spread both ways
		if(computer_bat_size <= (maximum_bat_size - (2*unit)))
		{
			// we need to check the upper and lower positions of the bat
			// we can not allow the bat to overflow from the gaming portion
			if(computer_bat_top >= (0+unit) && computer_bat_bottom < (y_resolution-unit))
			{
				// we do not multiply two for the thresholds because both these get checked
				// if increasing, the bat is increasing one unit each size
				// we also update the bat's edges over here
				computer_bat_size = computer_bat_size + (2*unit);
				computer_bat_top = computer_bat_top - (1*unit);
				computer_bat_bottom = computer_bat_bottom + (1*unit);
			}
		}
	}
	if(size == "decrease" && gamer == "computer")
	{
		// we need to decrease the bat's size if possible
		// there is no need to check the threshold limits for decreasong the size
		if(computer_bat_size >= (minimum_bat_size+(2*unit)))
		{
			// we need to update the bat size and the edges of the bat
			computer_bat_size = computer_bat_size - (2*unit);
			computer_bat_top = computer_bat_top + (1*unit);
			computer_bat_bottom = computer_bat_bottom - (1*unit);
		}
	}
}
function show_score()
{
	// the object of the function is to display the score on the screen
	// this takes in no input and gives no output
	// this simply reads the data from a globally defined variable

	document.getElementById("score").innerHTML = score;
}

//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//--------------------------The basic structure is more or less complete, now we go on to setting up the frame rendering
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

function shoot()
{
	// this takes on from the moment when the shoot button is pressed
	// the display system needs to be configured
	display_interval = setInterval(display,frame_refresh_time);
	calculate_trajectory_basic_straight_interval = setInterval(calculate_trajectory_basic_straight,frame_refresh_time);
	game_on = true; // we need to declare that the game has begun
}
function declare_win()
{
	// this simply sets the frame refreshing time to so long that the frame looks frozen
	var flag = false;
	var message = "";
	if(user_lost == true)
	{
		flag = true;
		message = "The Computer wins";
	}
	if(computer_lost == true)
	{
		flag = true;
		message = "The User wins";
	}
	if(flag == true)
	{
		document.getElementById("message").innerHTML = message;
		clearInterval(display_interval);
		clearInterval(calculate_trajectory_basic_straight_interval);
	}	
}

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------The other associate functions for a smooth operation of the project
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

function starting_shot_style_ammendment()
{
	// this updates the style of the elements when the first shot is shot
	message = "Hit the ball with the center of your bat !";
	document.getElementById("bat_size").style.display = "none";
	document.getElementById("ball_size").style.display = "none";
	document.getElementById("hit").style.display = "none";
	document.getElementById("anticlockwise").style.display = "none";
	document.getElementById("clockwise").style.display = "none";
	document.getElementById("angle_visualizer").style.display = "none";
}

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------now we describe the intelligence of the computer's bat

// we break the operation into two distinct stages
//                   1. pre-blocking
//                   2. post-blocking
// now it needs a function to know when it is it's turn and then another for coordinated activity
function block_ball()
{
	// we aim at keeping the organisation and activities very natural and hence the system works for itself
	if(game_on == true)
	{
		// it only seeks to block the ball after the game has begun
		know_my_turn();
	}
}
var previous_location_x = ball_radius + bat_protrusion;
var previous_location_y = user_bat;
function know_my_turn()
{
	present_location_x = ball_location_x;
	present_location_y = ball_location_y;
	if(direction == "forward")
	{
		// this is the pre-blocking period
		// this is the time we align the bat to block the ball
		// first we need to learn where the ball is about to hit using trigonometry
		// we need to make assumption where the ball is supposed to hit on the right wall
		/*                                           


		    we use the concept             |\
		    of tangent                   x1| \y1
		    the angle remaining constant   |  \
		    @ be the angle,                |...\<------ we take this as example, we know x1 and z1
		    we work with tan @             | z1 \
		    tan is perpendicular/base    x2|     \y2               they have the same angle !
		    z be perpendicular, x be base  |......\<--- we solve this, we need to solve this z2, we know x2
		                                   |  z2   \
		          z1   x1
		          -- = -- ( = tan @)    << this be the equation the system should work upon
		          z2   x2
		*/
		// we need the forecast for the y-location
		var tangent = (present_location_x-previous_location_x) / (present_location_y-previous_location_y);
		// now comes the condition where the y doesnt change at all, in case of horizontal game
		var target_location_y = Math.ceil(x_resolution / tangent);
		// in that case, we manually need to set the target location value
		if(present_location_y == previous_location_y)
			target_location_y = ball_location_y;
		if(target_location_y > computer_bat)
		{
			// this means we need to go down
			computer_go_down();
		}
		if(target_location_y < computer_bat)
		{
			// this means we need to go up
			computer_go_up();
		}
	}
	if(direction == "backward")
	{
		// we need not bother calculating trajectory in this case
		// this is the post blocking period
		// we aim at getting to the center of the platform for easy navigation to any corner in the next ball
		// we need to reach an optimum
		var target = Math.ceil(y_resolution/2);
		if(target > computer_bat)
		{
			// this means we need to go further down
			computer_go_down();
		}
		if(target < computer_bat)
		{
			// this means we need to go further up
			computer_go_up();
		}
	}
	// here we are updating the values
	previous_location_y = present_location_y;
	previous_location_x = present_location_x;
	// console.log("Previous location was "+previous_location_x+","+previous_location_y);
	// console.log("Present location is "+present_location_x+","+present_location_y);
}
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

//*********************************************************************************************************************
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//-----------------------------now we go on to the system as a whole, the buttons to navigate though the entire project
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
//*********************************************************************************************************************

function open_gamebox()
{
	// the purpose is to bring the user to the gaming interface from the welcomepage
	document.getElementById("introduction").style.display = "none";
	document.getElementById("gamebox").style.display = "block";
}