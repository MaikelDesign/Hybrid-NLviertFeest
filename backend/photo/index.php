<?php
	/**
	* @author	Ruben Sissing
	* @webpage	www.fressh.nl
	*/
	
	// Get database connection
	require_once('../dbconnection.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html"; charset="utf-8" />
		<title>Backend: Nederland viert Feest</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" media="screen" href="http://cdnjs.cloudflare.com/ajax/libs/fancybox/1.3.4/jquery.fancybox-1.3.4.css" />
	</head>
	<body>
		<div class="container">
			<div class="row">
				
				<h1>Backend: Nederland viert Feest</h1>
				
				<h3>Picture timeline</h3>
				<?php
				if (isset($_POST['delete'])) {
					$sql_remove = "SELECT * FROM app_images WHERE `id` = " . $_GET['id'];
				    $result_remove = mysqli_query($db, $sql_remove);
				    $row_remove = mysqli_fetch_array($result_remove, MYSQL_ASSOC);
						?>
						<script>
						    if (confirm("Are you sure to remove this picture?") == true) {
						        <?php
									$mask = "pictures/" . $row_remove['url'];
									array_map('unlink', glob($mask));
								?>
						    }
						</script>
						<?php
						$mask = "pictures/user-$groupID-*.jpg";
						array_map('unlink', glob($mask));
						
						$sql_remove_sql = "DELETE FROM app_images WHERE `id` = " . $_GET['id'];
						$result_remove_sql = mysqli_query($db, $sql_remove_sql);
						
					}
				?>
				<a href="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" class="btn btn-success" style="margin-bottom: 10px;">Refresh timeline</a>
				<table class="table table-hover">
					<thead>
						<th>#id</th>
						<th>Evenement</th>
						<th>Image</th>
						<th>Delete image</th>
					</thead>
					<?php
						$sql = "SELECT * FROM app_images ORDER BY `id` DESC";
					    $result = mysqli_query($db, $sql);
					    
					    while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
						    $sql_event_name = "SELECT * FROM events WHERE `idnr` = " . $row['event_id'];
							$result_event_name = mysqli_query($db, $sql_event_name);
							$row_event = mysqli_fetch_array($result_event_name, MYSQL_ASSOC);
						    
					        echo "<tr>";
					        echo "<th>" . $row['id'] . "</th>";
					        echo "<td>" . $row_event['name'] . "</td>";
					        echo "<td><img src='pictures/" . $row['url'] .  "' class='fancybox' title='" . $row_event['name'] . "' width='200px' /></td>";
					        echo "<td><form action='index.php?id=" . $row['id'] . "' method='post'><input type='submit' class='btn btn-danger' style='margin-bottom: 10px;' name='delete' value='DELETE'></form></td>";
					        echo "</tr>";
					    }
					?>
				</table>
			</div>
		</div>
		<script type="text/javascript" src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script type="text/javascript" src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/fancybox/1.3.4/jquery.fancybox-1.3.4.pack.min.js"></script>
		<script type="text/javascript">
		    $(function($){
		        var addToAll = false;
		        var gallery = true;
		        var titlePosition = 'inside';
		        $(addToAll ? 'img' : 'img.fancybox').each(function(){
		            var $this = $(this);
		            var title = $this.attr('title');
		            var src = $this.attr('data-big') || $this.attr('src');
		            var a = $('<a href="#" class="fancybox"></a>').attr('href', src).attr('title', title);
		            $this.wrap(a);
		        });
		        if (gallery)
		            $('a.fancybox').attr('rel', 'fancyboxgallery');
		        $('a.fancybox').fancybox({
		            titlePosition: titlePosition
		        });
		    });
		    $.noConflict();
		</script>
	</body>
</html>