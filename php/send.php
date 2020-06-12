<?php

$feedback = array();
$feedback[error] = "";

use PHPMailer\PHPMailer\PHPMailer;
include_once '../PHPMailer-master/src/PHPMailer.php';

if (!isset($_POST['name'])
|| !isset($_POST['email'])
|| !isset($_POST['message'])) {
	$feedback[error] = "Missing input";
} else {
	$name = $_POST['name'];
	$email = $_POST['name'];
	$message = $_POST['name'];

	$ema = new PHPMailer();
	$ema-> setFrom('support@eharmonogram.pl');
	$ema-> addAddress('support@eharmonogram.pl', 'PencilFluff');
	$ema->Subject = "New Message";
	$ema->isHTML(true);
	$ema->Body = "<b>".$name."</b> with email: ".$email."<br>left a message:<br>".$message;

	if($ema-> send()) {
		$ema2 = new PHPMailer();
		$ema2-> setFrom('support@eharmonogram.pl');
		$ema2-> addAddress($email, $name);
		$ema2->Subject = "Thank you for your message";
		$ema2->isHTML(true);
		$ema2->Body = "Hello $name!<br>
		<br>
		Thank you for your message. Expect an email from our team in the upcoming days.
		<br>
		Have a wonderful day!<br><br>
		PencilFluff Team";
		if($ema2-> send()) {
			$feedback[error] = ""; // everything worked
		} else {
			$feedback[error] = "Something's wrong with your email";
		}
	} else {
		$feedback[error] = "Error while sending your message";
	}
}

echo json_encode($feedback);

?>