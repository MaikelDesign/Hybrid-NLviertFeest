<?php
	/**
	* @author	Ruben Sissing
	* @webpage	www.fressh.nl
	*
	* this page generate the json file from the database
	*/
	
	// set page type
	header('content-type: application/json; charset=utf-8');
	
	// include database connection
	include_once '../dbconnection.php';
	
	// check if there is insert a key in the url
	if (isset($_GET['key']) && !empty($_GET['key'])) {
		// check if api key exist in the database
		$api = $_GET['key'];
		$checkAPI = mysqli_query($db, "SELECT api FROM apikey WHERE `api` = '$api'");
	    if ($checkAPI && mysqli_num_rows($checkAPI) > 0) {
		    //Replace * in the query with the column names.
		    $sql = "SELECT * FROM app_images ORDER BY `id` DESC";
		    $result = mysqli_query($db, $sql);    
		    
		    //Create an array
		    $json_response = array();
		    
		    while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
		        $row_array['id'] = $row['id'];
		        $event_id = $row['event_id'];
		        // Get name of event
				$sql_event = "SELECT * FROM events WHERE `idnr` = '$event_id'";
				$result_event = mysqli_query($db, $sql_event);
				$row_event = mysqli_fetch_array($result_event, MYSQL_ASSOC);
				$row_array['event_id'] = $event_id;
				$row_array['name'] = $row_event['name'];
				
				$row_array['url'] = "http://app.veldhovenviertfeest.nl/photo/pictures/" . $row['url'];
				
		        // Push the values in the array
		        array_push($json_response,$row_array);
		    }
		    echo "{ \"pictures\" : ";
		    echo json_encode($json_response);
		    echo "}";
	    } else {
		    // message for the user when the api key is incorrect
		    echo "The API key is incorrect!";
	    }
	} else {
		// message for user when there isn't enter ?key= to the url
		echo "You need to add ?key= at the end of the url with a valid API key.";
	}
?>