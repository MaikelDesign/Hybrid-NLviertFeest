<?php
   print_r($_FILES);
   $new_image_name = "YEAH.jpg";
   move_uploaded_file($_FILES["file"]["tmp_name"], "/home/veldhpa90/domains/app.veldhovenviertfeest.nl/public_html/photo/pictures/".$new_image_name);
?>