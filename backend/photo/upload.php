<?php
	/**
	* @author	Ruben Sissing
	* @webpage	www.fressh.nl
	*/
	
	// Get database connection
	require_once('../dbconnection.php');
	
	// Get post information from app
	$event_id = $_POST["eventId"];
	
	// Make random string for unique image name
	$random = md5(uniqid(rand(), true));
	
	// Upload image to server
	print_r($_FILES);
	$new_image_name = "eventimg-$random.jpg";
	move_uploaded_file($_FILES["file"]["tmp_name"], "/home/veldhpa90/domains/app.veldhovenviertfeest.nl/public_html/photo/pictures/".$new_image_name);
	
	// Add image to the database
	$sql = "INSERT INTO app_images (event_id, url)
			VALUES ('$event_id', '$new_image_name')";

	mysqli_query($db, $sql);
?>