<?php
	/**
	* @author	Ruben Sissing
	* @webpage	www.fressh.nl
	*/
	
	// Set the group ID
	$groupID = 1;
	
	// Get database connection
	require_once('../dbconnection.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html"; charset="utf-8" />
		<title>Dashboard: Zoek je slim - Groep: <?php echo "$groupID"; ?></title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	</head>
	<body>
		<div class="container">
			<div class="row">
				<?php
					// Connect to the database and get the temperature value
/*
					$sql_koudwarm = "SELECT * FROM `koudwarm` WHERE `id` = '" . $groupID . "'";
					$result = mysqli_query($db, $sql_koudwarm);
					if (!$result) exit("The query did not succeded");
					else {
					    while ($row = mysqli_fetch_array($result)) {
					        $temp = $row['value'];
					    }
					}
*/
					
					// Connect to the database and update the temperature value
/*
					if (isset($_POST['temp'])) { 
					    $sql_koudwarm = "UPDATE `koudwarm` SET `value` = '" . $_POST['temp'] . "' WHERE `id` = '" . $groupID . "'";
						$result = mysqli_query($db, $sql_koudwarm);
						$temp = $_POST['temp'];
					}
*/
					
					// Remove all pictures with groupID
					if (isset($_POST['delete'])) {
						?>
						<script>
						    if (confirm("Weet je zeker dat je alle foto's wilt verwijderen?") == true) {
						        <?php
									$mask = "pictures/user-$groupID-*.jpg";
									array_map('unlink', glob($mask));
								?>
						    }
						</script>
						<?php
						$mask = "pictures/user-$groupID-*.jpg";
						array_map('unlink', glob($mask));
					}
				?>
				
				<h1>Dashboard: Nederland viert Feest</h1>
				
				<h3>Gemaakte foto's</h3>
				<form method="post">
					<a href="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" class="btn btn-success" style="margin-bottom: 10px;">Vernieuw foto's</a>
					<input type="submit" class="btn btn-danger" style="margin-bottom: 10px;" name="delete" value="Verwijder foto's">
				</form>
				<div style="float: left;">
					<?php
						// Show all the pictures of the same groupID
						$dirname = "pictures/";
						$images = glob($dirname."user-$groupID-*.jpg");
						foreach($images as $image) {
						echo '<img height="300" style="float: left; margin: 3px" src="' . $image . '" />';
						}
					?>
				</div>
			</div>
		</div>
	</body>
</html>