<?php

set_error_handler(static function (int $severity, string $message, string $file, int $line): never {
    throw new ErrorException($message, 0, $severity, $file, $line);
});
require dirname(__DIR__) . '/PHPMailer/Exception.php';
require dirname(__DIR__) . '/PHPMailer/PHPMailer.php';
require dirname(__DIR__) . '/PHPMailer/SMTP.php';
$mail = new PHPMailer\PHPMailer\PHPMailer(true);
$mail->isSMTP();
$mail->CharSet = 'UTF-8';
$mail->setFrom('sender@example.test', 'Fixture');
$mail->addAddress('recipient@example.test');
$mail->Subject = 'PHP85 fixture';
$mail->msgHTML('<table><tr><td>PHP85 fixture</td></tr></table>');
if (!$mail->preSend() || !str_contains($mail->getSentMIMEMessage(), 'PHP85 fixture')) {
    throw new RuntimeException('MIME generation failed');
}
$process = proc_open([PHP_BINARY, '-d', 'error_reporting=32767', '-r',
    'set_error_handler(static function($n,$m){throw new RuntimeException($m);}); require ' . var_export(dirname(__DIR__) . '/mail.php', true) . ';'],
    [1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes);
$output = stream_get_contents($pipes[1]);
$errors = stream_get_contents($pipes[2]);
fclose($pipes[1]);
fclose($pipes[2]);
if (proc_close($process) !== 0 || $errors !== '' || (json_decode($output, true)['success'] ?? null) !== 0) {
    throw new RuntimeException('Empty form validation failed: ' . $errors);
}
echo "PASS: PHPMailer MIME generation and empty form rejection, no delivery\n";
