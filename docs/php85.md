# PHP 8.5 rollout

Requires the shared `cryptonews-php:8.5.12` runtime from nikosid/cryptonews#327.
Keep current URLs and directories. Do not merge/deploy before the coordinated cutover.

`PHP85_DEPLOY_ENABLED` stays unset until server acceptance. Set it only after the
shared PHP-FPM switch and this site's dependencies/form delivery have been verified.
Back up this checkout, its ignored configuration and vendor directory before updating.
Rollback restores code and vendor together with the shared PHP 7.4 configuration.

Validation: PHP 8.5 lint and `php tests/php85-smoke.php`; smoke checks use no real
email credentials or external services. Real form delivery requires a separately
agreed test recipient during server acceptance.

Bundled PHPMailer is the unmodified upstream v7.1.1 source; paths are preserved.
Keep the ignored `config.local.php` in place. SMTP and UniSender delivery remain
unchanged and are not exercised by CI.
