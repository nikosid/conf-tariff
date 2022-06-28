<?php

$errors = false;

if ((isset($_POST['username'])) && (!empty($_POST["username"]))) {
    $result['username'] = 'is-valid';
} else {
    $result['username'] = 'is-invalid';
	$errors = true;
}

if ((isset($_POST['email'])) && (!empty($_POST["email"]))) {
    $result['email'] = 'is-valid';
} else {
    $result['email'] = 'is-invalid';
	$errors = true;
}

if ((isset($_POST['phone'])) && (!empty($_POST["phone"]))) {
    $result['phone'] = 'is-valid';
} else {
    $result['phone'] = 'is-invalid';
}

if($errors) {
	$result['success'] = 0;
	echo json_encode($result);
	die();
} else {
	$result['success'] = 1;
	echo json_encode($result);
}

if ($_POST['name'] != '') die('spam');


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';


$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';

$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;

$mail->Host = 'ssl://smtp.jino.ru';
$mail->Port = 465;
$mail->Username = 'info@bitinvestconf.com';
$mail->Password = 'pvkqQhnum94G';

$mail->setFrom('no-reply@bitinvestconf.com', 'PRO BLOCKCHAIN CONF');	

if($_POST['mail-group'] == 'mail-group-1') {
	//почта форма партнеры
	$mail->AddAddress('natalipbm@gmail.com');
	$mail->AddAddress('gptvinccorp@gmail.com');
} else {
	//почта форма спонсоров
	$mail->AddAddress('gptvinccorp@gmail.com');
}
//почта общая
$mail->AddAddress('orenlr56@yandex.ru');

$mail->Subject = 'Заявка с сайта PRO BLOCKCHAIN CONF';

foreach ( $_POST as $key => $value ) {
	if ( $value != "") {
		$name = '';
		switch ($key) {
			case "username":
				$name = "Контактное лицо";
				break;
			case "phone":
				$name = "Telegram/WhatsApp";
				break;
			case "email":
				$name = "E-mail";
				break;
			case "form-name":
				$name = "Форма";
				break;
			default:
				$name = $key;
				break;
		}
		if($key != 'mail-group') {
			$message .= "
				" . ( ($c = !$c) ? '<tr>':'<tr style="background-color: #f8f8f8;">' ) . "
				<td style='padding: 10px; border: #e9e9e9 1px solid;width: 40%;'><b>$name</b></td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;width: 60%;'>$value</td>
			</tr>
			";
		}
		
	}
}

$body = "<table style='width: 100%;'>$message</table>";
$mail->msgHTML($body);

if ($mail->send()) {$result = "success";} 
else {$result = "error";}

