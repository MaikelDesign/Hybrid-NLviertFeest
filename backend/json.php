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
		        
		        // Event type
		        if ($row['multiple_days'] == 0) {
			        $multiple_days = false;
		        } else {
			        $multiple_days = true;
		        }
		        
		        // Event details
		        $row_array['multiple_days'] = $multiple_days;
		        $row_array['timestamp_b'] = $row['timestamp_b'];
		        $row_array['timestamp_e'] = $row['timestamp_e'];

		        if ($row['endtime'] == 0) {
			        $$event_endtime = false;
		        } else {
			        $event_endtime = true;
		        }
		        $row_array['endtime'] = $event_endtime;
		        
		        $row_array['description'] = $row['description'];
		        $row_array['genre'] = $row['genre'];
		        $row_array['min_age'] = $row['min_age'];
		        $row_array['dresscode'] = $row['dresscode'];
		        $row_array['facebook'] = $row['facebook'];
				
				// Child items: Location
				$partner_id = $row['idnr_partner'];
				$sql_partner = "SELECT * FROM partners WHERE `idnr` = '$partner_id'";
				$result_partner = mysqli_query($db, $sql_partner);
				
				$row_partner = mysqli_fetch_array($result_partner, MYSQL_ASSOC);
				
				$row_array_location['partner_id'] = $partner_id;
				
				if ($partner_id == 0) {
					$row_array_location['name'] = $row['location'];
					$row_array_location['address'] = $row['address'];
					$row_array_location['zipcode'] = $row['zipcode'];
					$row_array_location['place'] = $row['place'];
					
					$row_array['location_details'] = $row_array_location;
				} else {
					$row_array_location['name'] = $row_partner['name'];
					$row_array_location['address'] = $row_partner['address'];
					$row_array_location['zipcode'] = $row_partner['zipcode'];
					$row_array_location['place'] = $row_partner['place'];
					$row_array_location['website'] = $row_partner['website'];
					$row_array_location['twitter'] = $row_partner['twitter'];
					$row_array_location['facebook'] = $row_partner['facebook'];
					$row_array_location['description'] = $row_partner['description'];
					$row_array_location['visiting_hours'] = $row_partner['visiting_hours'];
					
					$row_array['location_details'] = $row_array_location;
				}
				
				$row_array_location = [];
				
				// Get images from event
				$sql_image = "SELECT * FROM images WHERE `idnr_event` = '$event_id'";
				$result_image = mysqli_query($db, $sql_image);
				
				$image_urls = array();
				
				while ($row_image = mysqli_fetch_array($result_image, MYSQL_ASSOC)) {
					$row_array_image = 'http://www.veldhovenviertfeest.nl/' . $row_image['filename_time'];
					array_push($image_urls, $row_array_image);
					$image_urls['$row_array_image'];
				}
				$row_array['images'] = $image_urls;
				
				// Event tickets
				if ($row['tickets'] == 0) {
					$ticket_option = false;
		        } else {
			        $ticket_option = true;
		        
					$row_array_ticket['url'] = $row['ticketlink'];
					$row_array_ticket['tp_early'] = $row['tp_early'];
					$row_array_ticket['tp_regular'] = $row['tp_regular'];
					$row_array_ticket['tp_door'] = $row['tp_door'];
					
					$row_array['ticket_info'] = $row_array_ticket;
		        }
		        
		        $row_array['ticket_option'] = $ticket_option;
				
		        // Push the values in the array
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