<?php
	/**
	* @author	Ruben Sissing
	* @webpage	www.fressh.nl
	*
	* this page generate the json file from the database
	*/
	
	// set page type
	header('content-type: application/json; charset=utf-8');
	
	// Nvf domains
	$domain_veldhoven = "a:1:{i:0;s:2:\"22\";}";
	$domain_rommelgat = "a:2:{i:0;s:2:\"23\";i:1;s:2:\"22\";}";
	
	// Timestamp
	$timestamp_now_plus = strtotime("-3 hours");
	
	// include database connection
	include_once 'dbconnection.php';
	
	// check if there is insert a key in the url
	if (isset($_GET['key']) && !empty($_GET['key'])) {
		// check if api key exist in the database
		$api = $_GET['key'];
		$checkAPI = mysqli_query($db, "SELECT api FROM apikey WHERE `api` = '$api'");
	    if ($checkAPI && mysqli_num_rows($checkAPI) > 0) {
		    //Replace * in the query with the column names.
		    $sql = "SELECT * FROM events WHERE `timestamp_e` >= '$timestamp_now_plus' AND `idnr_domain` = '$domain_veldhoven' OR '$domain_rommelgat' ORDER BY `timestamp_b` ASC";
		    $result = mysqli_query($db, $sql);    
		    
		    //Create an array
		    $json_response = array();
		    
		    while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
		        $row_array['id'] = $row['idnr'];
		        $event_id = $row['idnr'];
		        $row_array['name'] = $row['name'];
		        $row_array['timestamp_b'] = $row['timestamp_b'];
		        $row_array['timestamp_e'] = $row['timestamp_e'];
		        $row_array['description'] = $row['description'];
		        $row_array['facebook'] = $row['facebook'];
				
				// Child items: Location
				// TODO: connect with partner
				$row_array_location['company'] = $row['idnr_partner'];
				if ($row['address'] == "") {
					$row_array_location['address'] = "empty";
					$row_array_location['zipcode'] = "empty";
					$row_array_location['place'] = "empty";
				} else {
					$row_array_location['address'] = $row['address'];
					$row_array_location['zipcode'] = $row['zipcode'];
					$row_array_location['place'] = $row['place'];
				}
				$row_array['location_details'] = $row_array_location;
				// Get images from event
				$sql_image = "SELECT * FROM images WHERE `idnr_event` = '$event_id'";
				$result_image = mysqli_query($db, $sql_image);
				
				//Creat an array
				$image_urls = array();
				
				while ($row_image = mysqli_fetch_array($result_image, MYSQL_ASSOC)) {
					$row_array_image = $row_image['filename_time'];
					array_push($image_urls, $row_array_image);
					$image_urls['$row_array_image'];
					//echo "$row_image['filename_time']";
				}
				$row_array['images'] = $image_urls;
				
				
		        //push the values in the array
		        array_push($json_response,$row_array);
		    }
		    echo "{ \"events\" : ";
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