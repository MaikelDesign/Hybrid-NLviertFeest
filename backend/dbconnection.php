<?php
	/**
	* @author	Ruben Sissing
	* @webpage	www.fressh.nl
	*
	* make connection with the database
	*/
	
	// variable for connection with the database
	$db_host = "10.3.0.177"; // Welke server : localhost 
	$db_username = "veldhpa90_nvfapp"; // Geberuikersnaam
	$db_password = "YdDZtj2Mg"; // Wachtwoord
	$db_name = "veldhpa90_nvfapp"; // Naam van de database
	$db_error1 = "<p>ERROR: can't connect to the database</p>"; // errormessage 1
	$db_error2 = "<p>ERROR: can't select the database</p>"; // errormessage 2
	$db_error3 = "<p>ERROR: can't close the database</p>"; // errormessage 3
	
	// connect to the database
	$db = mysqli_connect($db_host, $db_username, $db_password, $db_name) or die($db_error1);
	
	// check the connection to the database
	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}
?>